'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { usePoseAnalysis } from '@/lib/arena/usePoseAnalysis';
import * as ArenaEngine from '@/lib/arena/arenaEngine';
import { PoseLandmarkerResult, ObjectDetectorResult, NormalizedLandmark } from '@mediapipe/tasks-vision';
import Icon from '@/components/core/Icon';
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
    className="layer-1 border border-quiet p-6 depth-card"
  >
    <div className="flex justify-between items-start mb-4">
      <span className="text-ghost text-[9px] font-bold uppercase tracking-[0.2em] font-brand opacity-60">{label}</span>
      <div className={`w-3 h-3 ${statusColor.includes('gold') || statusColor.includes('brand') ? 'bg-gold' : 'bg-ghost opacity-20'}`} />
    </div>
    <div className="flex items-baseline gap-2">
      <span className={`text-3xl font-brand font-bold tracking-tighter ${statusColor.includes('brand') ? 'text-gold' : statusColor}`}>{value ?? '--'}</span>
      {unit && <span className="text-ghost text-[10px] font-brand font-bold opacity-40">{unit}</span>}
    </div>
    {description && <p className="text-ghost text-[10px] mt-3 leading-relaxed font-brand opacity-50">{description}</p>}
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
    
    // Draw connections - ARKDAR GOLD
    ctx.strokeStyle = '#D4AF37'; 
    ctx.lineWidth = 4;
    ctx.lineCap = 'square';
    
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

    // Draw joints - WHITE
    ctx.fillStyle = '#FFFFFF'; 
    landmarks.forEach((lm, i) => {
      if (i > 10) { // Only body joints
        ctx.fillRect(lm.x * ctx.canvas.width - 3, lm.y * ctx.canvas.height - 3, 6, 6); // Square joints
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

      const cameraAngle = ArenaEngine.detectCameraAngle(landmarks);
      const torsoAngle = ArenaEngine.computeTorsoAngle(landmarks, width, height, cameraAngle);
      const cog = ArenaEngine.computeCOGBalance(landmarks, width, height);
      
      const metrics = { torsoAngle, cogBalance: cog };
      const evals = ArenaEngine.evaluateFrameMetrics(metrics, { discipline, phase: 'general', locale: 'ar' });
      
      setCurrentMetrics(metrics);
      setEvaluations(evals);

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
    <div className="min-h-screen bg-black text-white p-12 md:p-16 font-brand selection:bg-gold selection:text-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8 border-b border-quiet pb-12">
          <div className="space-y-3">
            <h1 className="text-4xl font-brand font-bold tracking-tight md:text-6xl text-gold uppercase">
              ARKDAR Arena Lab
            </h1>
            <p className="text-ghost mt-2 text-lg font-brand opacity-60 uppercase tracking-widest">المعيار السيادي للتدريب - تحليل الأداء الميكانيكي</p>
          </div>
            <div className="flex gap-4">
              <label 
                htmlFor="video-upload"
                className="px-8 py-4 layer-1 border border-quiet flex items-center gap-3 transition-all duration-cine cursor-pointer font-bold uppercase tracking-[0.2em] text-[10px] hover:border-gold hover:text-gold"
              >
                <Icon name="upload" size={18} />
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
            <button className="btn-sovereign px-8 py-4 flex items-center gap-3">
              <Icon name="camera" size={18} />
              <span>الكاميرا المباشرة</span>
            </button>
          </div>
        </div>

        {!isLoaded ? (
          <div className="flex flex-col items-center justify-center py-40 layer-1 border border-quiet border-dashed">
            <Icon name="activity" size="l" className="text-gold animate-pulse mb-8" />
            <p className="text-xl font-brand font-bold text-ghost tracking-[0.3em] uppercase opacity-40">جاري تحميل نماذج السيادة الرقمية...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Viewport */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="relative aspect-video bg-black overflow-hidden border border-quiet group depth-card">
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
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-ghost/20">
                    <Icon name="activity" size="l" className="mb-8 opacity-5" style={{ width: 80, height: 80 }} />
                    <p className="font-brand uppercase tracking-widest text-sm opacity-40">قم برفع فيديو أو تشغيل الكاميرا لبدء التحليل</p>
                  </div>
                )}
                
                {/* HUD Overlay */}
                {isAnalyzing && (
                  <div className="absolute top-8 left-8 flex flex-col gap-4">
                    <div className="bg-black/80 px-4 py-2 border border-gold/40 flex items-center gap-3">
                      <span className="w-3 h-3 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)] animate-pulse" />
                      <span className="text-[10px] font-brand font-bold tracking-[0.3em] uppercase text-gold">Live Analysis</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex gap-6 p-6 layer-1 border border-quiet depth-card">
                <button 
                  onClick={() => setDiscipline('horseback_archery')}
                  className={`flex-1 py-6 flex flex-col items-center gap-4 transition-all duration-cine font-brand border ${discipline === 'horseback_archery' ? 'bg-gold text-black border-gold shadow-lg' : 'layer-2 text-ghost border-quiet hover:border-gold/30 hover:text-white'}`}
                >
                  <Icon name="target" size={24} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">الرماية من الخيل</span>
                </button>
                <button 
                  onClick={() => setDiscipline('tent_pegging')}
                  className={`flex-1 py-6 flex flex-col items-center gap-4 transition-all duration-cine font-brand border ${discipline === 'tent_pegging' ? 'bg-gold text-black border-gold shadow-lg' : 'layer-2 text-ghost border-quiet hover:border-gold/30 hover:text-white'}`}
                >
                  <Icon name="activity" size={24} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">التقاط الأوتاد</span>
                </button>
              </div>
            </div>

            {/* Analysis Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="layer-1 p-10 flex flex-col h-full border border-quiet depth-card">
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-2xl font-brand font-bold flex items-center gap-3 text-white uppercase tracking-widest">
                    <Icon name="activity" className="text-gold" size={28} />
                    لوحة البيانات
                  </h3>
                  <div className="flex gap-3">
                    <button 
                      title="Save Session"
                      onClick={handleSaveSession}
                      disabled={isSaving || !currentMetrics.torsoAngle}
                      className={`p-3 transition-all duration-cine border ${
                        saveStatus === 'success' ? 'bg-gold/20 text-gold border-gold' : 
                        saveStatus === 'error' ? 'bg-red-900/20 text-red-500 border-red-500' :
                        isSaving ? 'animate-pulse text-gold/20 border-gold/20' : 'layer-2 border-quiet text-ghost hover:text-white hover:border-gold/50'
                      }`}
                    >
                      {saveStatus === 'success' ? <Icon name="shield-check" size={24} /> : <Icon name="save" size={24} />}
                    </button>
                    <button 
                      title="Download Report"
                      className="p-3 layer-2 border border-quiet text-ghost hover:text-white hover:border-gold/50 transition-all duration-cine"
                    >
                      <Icon name="download" size={24} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  <MetricCard 
                    label="زاوية الجذع" 
                    value={currentMetrics.torsoAngle?.toFixed(1) ?? '--'} 
                    unit="°"
                    statusColor={evaluations.torso?.color.includes('brand') ? 'text-gold' : evaluations.torso?.color}
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
                    statusColor={evaluations.cog?.color.includes('brand') ? 'text-gold' : evaluations.cog?.color}
                    description="انحراف كتلة الجسم عن محور الركب"
                  />
                  <MetricCard 
                    label="ثبات المقعد" 
                    value="92" 
                    unit="%"
                    statusColor="text-gold"
                    description="مدى امتصاص الصدمات أثناء الحركة"
                  />
                </div>

                <div className="mt-auto space-y-6">
                  <div className="layer-2 p-8 border border-gold/20 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
                    <div className="flex items-center gap-3 mb-4 text-gold">
                      <Icon name="info" size={18} />
                      <span className="text-[10px] font-brand font-bold uppercase tracking-[0.3em]">توجيه السيادة الرقمية</span>
                    </div>
                    <p className="text-base text-ghost leading-relaxed italic font-brand group-hover:text-white transition-colors duration-cine">
                    &ldquo;{evaluations.feedback ?? "ابدأ التحليل للحصول على نصائح فورية لتحسين أدائك الرياضي وفق المعايير السيادية."}&rdquo;
                    </p>
                  </div>

                  <button className="w-full py-6 bg-secondary hover:bg-gold text-black font-brand font-bold transition-all duration-cine flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-[12px] depth-card">
                    <Icon name="share" size={24} />
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
