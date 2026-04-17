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
    className="bg-black/40 border border-sovereign p-4"
  >
    <div className="flex justify-between items-start mb-2">
      <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest font-body">{label}</span>
      <div className={`w-2 h-2 ${statusColor.includes('brand') ? statusColor.replace('text-', 'bg-') : 'bg-white/20'}`} />
    </div>
    <div className="flex items-baseline gap-1">
      <span className={`text-2xl font-bold font-latin ${statusColor}`}>{value ?? '--'}</span>
      {unit && <span className="text-white/40 text-[10px] font-latin">{unit}</span>}
    </div>
    {description && <p className="text-white/40 text-[10px] mt-1 leading-tight font-body">{description}</p>}
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
    ctx.strokeStyle = '#911010'; // Sovereign Burnt Carmine
    ctx.lineWidth = 3;
    
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
    ctx.fillStyle = '#EDF2F4'; // Marble Light
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
    <div className="min-h-screen bg-surface-dark text-white p-6 md:p-10 font-body">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-brand-primary font-title">
              ARKDAR Arena Lab
            </h1>
            <p className="text-white/40 mt-2 text-lg font-body">تحليل الأداء الميكانيكي الحيوي للفرسان - المعيار السيادي للتدريب</p>
          </div>
            <div className="flex gap-3">
              <label 
                htmlFor="video-upload"
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-sovereign flex items-center gap-2 transition-all cursor-pointer font-bold uppercase tracking-widest text-[10px]"
              >
                <Upload size={18} className="text-brand-primary" />
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
            <button className="btn-sovereign">
              <Camera size={18} />
              <span>الكاميرا المباشرة</span>
            </button>
          </div>
        </div>

        {!isLoaded ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-sovereign border-dashed">
            <Activity className="w-12 h-12 text-brand-primary animate-pulse mb-4" />
            <p className="text-xl font-medium text-white/40 font-body">جاري تحميل نماذج السيادة الرقمية...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Viewport */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="relative aspect-video bg-black overflow-hidden border border-sovereign group">
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
                    <p className="font-body">قم برفع فيديو أو تشغيل الكاميرا لبدء التحليل</p>
                  </div>
                )}
                
                {/* HUD Overlay */}
                {isAnalyzing && (
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="bg-black/60 px-3 py-1 border border-white/20 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 animate-pulse" />
                      <span className="text-[10px] font-bold tracking-widest uppercase">Live Analysis</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex gap-4 p-4 bg-white/5 border border-sovereign">
                <button 
                  onClick={() => setDiscipline('horseback_archery')}
                  className={`flex-1 py-4 flex flex-col items-center gap-2 transition-all font-body ${discipline === 'horseback_archery' ? 'bg-brand-primary text-white shadow-lg' : 'hover:bg-white/5 text-white/40'}`}
                >
                  <Target size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">الرماية من الخيل</span>
                </button>
                <button 
                  onClick={() => setDiscipline('tent_pegging')}
                  className={`flex-1 py-4 flex flex-col items-center gap-2 transition-all font-body ${discipline === 'tent_pegging' ? 'bg-brand-primary text-white shadow-lg' : 'hover:bg-white/5 text-white/40'}`}
                >
                  <Activity size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">التقاط الأوتاد</span>
                </button>
              </div>
            </div>

            {/* Analysis Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="layer-1 p-6 flex flex-col h-full border border-sovereign">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-2 font-title">
                    <Activity className="text-brand-primary" size={24} />
                    لوحة البيانات
                  </h3>
                  <div className="flex gap-2">
                    <button 
                      title="Save Session"
                      onClick={handleSaveSession}
                      disabled={isSaving || !currentMetrics.torsoAngle}
                      className={`p-2 transition-all border border-sovereign ${
                        saveStatus === 'success' ? 'bg-brand-primary/20 text-brand-primary border-brand-primary' : 
                        saveStatus === 'error' ? 'bg-brand-tertiary/20 text-brand-tertiary' :
                        isSaving ? 'animate-pulse text-white/20' : 'hover:bg-white/10 text-white/40 hover:text-white'
                      }`}
                    >
                      {saveStatus === 'success' ? <CheckCircle2 size={20} /> : <Save size={20} />}
                    </button>
                    <button 
                      title="Download Report"
                      className="p-2 hover:bg-white/10 text-white/40 hover:text-white transition-colors border border-sovereign"
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
                  <div className="bg-black/40 p-5 border border-brand-primary/20">
                    <div className="flex items-center gap-2 mb-3 text-brand-primary">
                      <Info size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-widest font-body">توجيه السيادة الرقمية</span>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed italic font-body">
                    &ldquo;{evaluations.feedback ?? "ابدأ التحليل للحصول على نصائح فورية لتحسين أدائك الرياضي وفق المعايير السيادية."}&rdquo;
                    </p>
                  </div>

                  <button className="w-full py-4 bg-brand-secondary hover:bg-brand-primary text-white font-bold transition-all flex items-center justify-center gap-2 font-body uppercase tracking-[2px] text-[12px]">
                    <Share2 size={20} />
                    مشاركة التقرير السيادي
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
