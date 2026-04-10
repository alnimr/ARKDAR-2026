'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { usePoseAnalysis } from '@/lib/arena/usePoseAnalysis';
import * as ArenaEngine from '@/lib/arena/arenaEngine';
import { PoseLandmarkerResult, ObjectDetectorResult, NormalizedLandmark } from '@mediapipe/tasks-vision';
import { 
  Upload, Camera, Download, Activity, Target, 
  Save, Share2, Info, CheckCircle2 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { db, auth } from '@/lib/arena/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface MetricCardProps {
  label: string;
  value: string | number | null;
  unit?: string;
  description?: string;
  statusColor?: string;
}

interface BiomechanicalMetrics {
  torsoAngle?: number | null;
  cogBalance?: {
    verticalAngle: number;
    horizontalOffset: number;
  } | null;
}

interface PerformanceEvaluation {
  feedback?: string;
  torso?: { level: string; color: string };
  cog?: { level: string; color: string };
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, description, statusColor = 'text-white' }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl"
  >
    <div className="flex justify-between items-start mb-2">
      <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">{label}</span>
      <div className={`w-2 h-2 rounded-full ${statusColor.replace('text-', 'bg-')}`} />
    </div>
    <div className="flex items-baseline gap-1">
      <span className={`text-2xl font-bold ${statusColor}`}>{value ?? '--'}</span>
      {unit && <span className="text-white/40 text-xs">{unit}</span>}
    </div>
    {description && <p className="text-white/40 text-[10px] mt-1 leading-tight">{description}</p>}
  </motion.div>
);

export default function ArenaLab() {
  const [discipline, setDiscipline] = useState<'horseback_archery' | 'tent_pegging'>('horseback_archery');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [currentMetrics, setCurrentMetrics] = useState<BiomechanicalMetrics>({});
  const [evaluations, setEvaluations] = useState<PerformanceEvaluation>({});
  const [horseGait, setHorseGait] = useState<string>('--');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const horseHistory = useRef<{ detected: boolean; boundingBox: { originX: number, originY: number, width: number, height: number } }[]>([]);

  const { isLoaded, detectFrame } = usePoseAnalysis({
    runningMode: 'VIDEO',
    numPoses: 1,
    scoreThreshold: 0.3
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (videoSrc) URL.revokeObjectURL(videoSrc);
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    return () => {
      if (videoSrc) URL.revokeObjectURL(videoSrc);
    };
  }, [videoSrc]);

  const drawSkeleton = useCallback((ctx: CanvasRenderingContext2D, landmarks: NormalizedLandmark[]) => {
    if (!landmarks) return;
    
    // Draw connections
    ctx.strokeStyle = '#DAA520'; // Golden Rod for ARKDAR
    ctx.lineWidth = 2;
    
    const connections = [
      [11, 12], [11, 23], [12, 24], [23, 24], // Torso
      [11, 13], [13, 15], // Left Arm
      [12, 14], [14, 16], // Right Arm
      [23, 25], [25, 27], // Left Leg
      [24, 26], [26, 28]  // Right Leg
    ];

    connections.forEach(([i, j]) => {
      const start = landmarks[i];
      const end = landmarks[j];
      if (start && end) {
        ctx.beginPath();
        ctx.moveTo(start.x * ctx.canvas.width, start.y * ctx.canvas.height);
        ctx.lineTo(end.x * ctx.canvas.width, end.y * ctx.canvas.height);
        ctx.stroke();
      }
    });

    // Draw joints
    ctx.fillStyle = '#FFFFFF';
    landmarks.forEach((lm, i) => {
      if (i > 10) { // Only body joints
        ctx.beginPath();
        ctx.arc(lm.x * ctx.canvas.width, lm.y * ctx.canvas.height, 3, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
  }, []);

  const runAnalysis = useCallback(() => {
    if (!isAnalyzing || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video.readyState < 2) {
      animationFrameId.current = requestAnimationFrame(runAnalysis);
      return;
    }

    // Sync canvas dimensions with video for accurate skeleton overlay
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    const { width, height } = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const result = detectFrame(video, performance.now()) as { pose: PoseLandmarkerResult, objects: ObjectDetectorResult } | null;
    
    ctx.clearRect(0, 0, width, height);

    if (result && result.pose.landmarks && result.pose.landmarks.length > 0) {
      const landmarks = result.pose.landmarks[0];
      drawSkeleton(ctx, landmarks);

      // Biomechanical Analysis
      const cameraAngle = ArenaEngine.detectCameraAngle(landmarks);
      const torsoAngle = ArenaEngine.computeTorsoAngle(landmarks, width, height, cameraAngle);
      const cog = ArenaEngine.computeCOGBalance(landmarks, width, height);
      
      const metrics = { torsoAngle, cogBalance: cog };
      const evals = ArenaEngine.evaluateFrameMetrics(metrics, { discipline, phase: 'general', locale: 'ar' });
      
      setCurrentMetrics(metrics);
      setEvaluations(evals);

      // Horse Analysis
      if (result.objects && result.objects.detections) {
        const horse = result.objects.detections.find(d => 
          d.categories[0].categoryName === 'horse'
        );
        
        if (horse && horse.boundingBox) {
          horseHistory.current.push({ 
            detected: true, 
            boundingBox: {
              originX: horse.boundingBox.originX,
              originY: horse.boundingBox.originY,
              width: horse.boundingBox.width,
              height: horse.boundingBox.height
            }
          });
          if (horseHistory.current.length > 30) horseHistory.current.shift();
          const kinematics = ArenaEngine.analyzeHorseKinematics(horseHistory.current, 30, 'ar');
          if (kinematics) setHorseGait(kinematics.gait);
        }
      }
    }

    animationFrameId.current = requestAnimationFrame(runAnalysis);
  }, [isAnalyzing, detectFrame, drawSkeleton, discipline]);

  useEffect(() => {
    if (isAnalyzing) {
      runAnalysis();
    } else {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    }
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isAnalyzing, runAnalysis]);

  const handleSaveSession = async () => {
    if (!currentMetrics.torsoAngle) return;
    
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const sessionData = {
        userId: auth.currentUser?.uid || 'anonymous-trainee',
        timestamp: Date.now(),
        sport: discipline === 'horseback_archery' ? 'archery' : 'tentpegging',
        metrics: {
          avgTrunkAngle: currentMetrics.torsoAngle || 0,
          balanceScore: currentMetrics.cogBalance?.verticalAngle || 0,
          gaitDistribution: { [horseGait]: 1 },
          welfareAlerts: 0
        },
        summary: evaluations.feedback || 'No summary available',
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'sessions'), sessionData);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err) {
      console.error('Save Session Error:', err);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              ARKDAR Arena Lab
            </h1>
            <p className="text-white/40 mt-2 text-lg">تحليل الأداء الميكانيكي الحيوي للفرسان - المعيار الذهبي للتدريب</p>
          </div>
            <div className="flex gap-3">
              <label 
                htmlFor="video-upload"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center gap-2 transition-all cursor-pointer"
              >
                <Upload size={18} />
                <span>رفع فيديو</span>
                <input 
                  id="video-upload" 
                  type="file" 
                  accept="video/*" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                  title="Upload Video"
                />
              </label>
            <button className="px-6 py-2 bg-[#DAA520] hover:bg-[#B8860B] text-black font-bold rounded-full transition-all flex items-center gap-2">
              <Camera size={18} />
              <span>الكاميرا المباشرة</span>
            </button>
          </div>
        </div>

        {!isLoaded ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-white/10 border-dashed">
            <Activity className="w-12 h-12 text-[#DAA520] animate-pulse mb-4" />
            <p className="text-xl font-medium text-white/60">جاري تحميل نماذج الذكاء الاصطناعي...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Viewport */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="relative aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 group">
                {videoSrc ? (
                  <>
                    <video 
                      ref={videoRef} 
                      src={videoSrc} 
                      className="w-full h-full object-contain"
                      onPlay={() => setIsAnalyzing(true)}
                      onPause={() => setIsAnalyzing(false)}
                      controls
                    />
                    <canvas 
                      ref={canvasRef}
                      className="absolute inset-0 w-full h-full pointer-events-none"
                    />
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                    <Activity size={64} className="mb-4 opacity-10" />
                    <p>قم برفع فيديو أو تشغيل الكاميرا لبدء التحليل</p>
                  </div>
                )}
                
                {/* HUD Overlay */}
                {isAnalyzing && (
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold tracking-widest uppercase">Live Analysis</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <button 
                  onClick={() => setDiscipline('horseback_archery')}
                  className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-all ${discipline === 'horseback_archery' ? 'bg-[#DAA520] text-black' : 'hover:bg-white/5 text-white/60'}`}
                >
                  <Target size={20} />
                  <span className="text-xs font-bold">الرماية من الخيل</span>
                </button>
                <button 
                  onClick={() => setDiscipline('tent_pegging')}
                  className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-all ${discipline === 'tent_pegging' ? 'bg-[#DAA520] text-black' : 'hover:bg-white/5 text-white/60'}`}
                >
                  <Activity size={20} />
                  <span className="text-xs font-bold">التقاط الأوتاد</span>
                </button>
              </div>
            </div>

            {/* Analysis Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Activity className="text-[#DAA520]" size={20} />
                    لوحة البيانات
                  </h3>
                  <div className="flex gap-2">
                    <button 
                      title="Save Session"
                      onClick={handleSaveSession}
                      disabled={isSaving || !currentMetrics.torsoAngle}
                      className={`p-2 rounded-lg transition-all ${
                        saveStatus === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 
                        saveStatus === 'error' ? 'bg-red-500/20 text-red-400' :
                        isSaving ? 'animate-pulse text-white/20' : 'hover:bg-white/10 text-white/40 hover:text-white'
                      }`}
                    >
                      {saveStatus === 'success' ? <CheckCircle2 size={20} /> : <Save size={20} />}
                    </button>
                    <button 
                      title="Download Report"
                      className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors"
                    >
                      <Download size={20} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <MetricCard 
                    label="زاوية الجذع" 
                    value={currentMetrics.torsoAngle?.toFixed(1) ?? '--'} 
                    unit="°"
                    statusColor={evaluations.torso?.color}
                    description="الزاوية بين الكتف والحوض بالنسبة للعامود الفقري"
                  />
                  <MetricCard 
                    label="مشية الخيل" 
                    value={horseGait}
                    statusColor="text-white"
                    description="النمط الحركي المكتشف للحصان حالياً"
                  />
                  <MetricCard 
                    label="التوازن (COG)" 
                    value={currentMetrics.cogBalance?.verticalAngle?.toFixed(1) ?? '--'} 
                    unit="°"
                    statusColor={evaluations.cog?.color}
                    description="انحراف كتلة الجسم عن محور الركب"
                  />
                  <MetricCard 
                    label="ثبات المقعد" 
                    value="92" 
                    unit="%"
                    statusColor="text-emerald-400"
                    description="مدى امتصاص الصدمات أثناء الحركة"
                  />
                </div>

                <div className="mt-auto space-y-4">
                  <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 mb-2 text-white/60">
                      <Info size={16} className="text-[#DAA520]" />
                      <span className="text-xs font-bold uppercase tracking-widest">توجيه الذكاء الاصطناعي</span>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed italic">
                    &ldquo;{evaluations.feedback ?? "ابدأ التحليل للحصول على نصائح فورية لتحسين أدائك الرياضي."}&rdquo;
                    </p>
                  </div>

                  <button className="w-full py-4 bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                    <Share2 size={20} />
                    مشاركة التقرير مع المدرب
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
