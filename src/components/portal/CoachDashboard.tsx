'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/arena/firebase';
import { 
  Users, Activity, Target, ChevronRight, MessageSquare, 
  Search, Filter, Shield 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrainingSession {
  id: string;
  userId: string;
  sport: string;
  timestamp: number;
  metrics?: {
    avgTrunkAngle?: number;
    balanceScore?: number;
  };
  summary?: string;
  isReviewed?: boolean;
}

export default function CoachDashboard() {
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'sessions'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as TrainingSession));
      setSessions(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleApplyFeedback = async () => {
    if (!selectedSession || !feedbackText) return;
    setIsSubmitting(true);
    try {
      const sessionRef = doc(db, 'sessions', selectedSession.id);
      await updateDoc(sessionRef, {
        coachFeedback: feedbackText,
        feedbackDate: Date.now(),
        isReviewed: true
      });
      setSelectedSession(null);
      setFeedbackText('');
    } catch (err) {
      console.error('Error submitting feedback:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="animate-pulse text-white/20">جاري تحميل لوحة تحكم المدرب...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px]">
      {/* Sessions List */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-xl font-bold uppercase tracking-widest text-white/60 flex items-center gap-2 font-title">
             <Users size={20} className="text-brand-primary" />
             طلبات مراجعة الأداء
           </h3>
           <div className="flex gap-2">
              <button 
                title="Filter"
                className="p-2 layer-1 border border-sovereign text-white/40 hover:text-white"
              >
                <Filter size={18}/>
              </button>
              <button 
                title="Search"
                className="p-2 layer-1 border border-sovereign text-white/40 hover:text-white"
              >
                <Search size={18}/>
              </button>
           </div>
        </div>

        {sessions.map((session, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={session.id}
            onClick={() => setSelectedSession(session)}
            className={`p-5 border transition-all cursor-pointer group flex items-center justify-between ${
                selectedSession?.id === session.id 
                ? 'bg-brand-primary/10 border-brand-primary' 
                : session.isReviewed ? 'bg-surface-dark border-sovereign opacity-60' : 'bg-surface-dark border-sovereign hover:border-brand-primary/40'
            }`}
          >
            <div className="flex items-center gap-4">
               <div className={`w-12 h-12 flex items-center justify-center border border-sovereign ${session.sport === 'archery' ? 'bg-brand-primary/20 text-brand-primary' : 'bg-brand-secondary/20 text-brand-secondary'}`}>
                  {session.sport === 'archery' ? <Target size={24} /> : <Activity size={24} />}
               </div>
               <div>
                  <h4 className="font-bold text-white group-hover:text-brand-primary transition-colors font-body">
                     {session.userId === 'anonymous-trainee' ? 'متدرب مجهول' : `متدرب: ${session.userId.substring(0, 8)}`}
                  </h4>
                  <p className="text-[10px] text-white/40 font-latin font-bold tracking-widest mt-1">
                     {new Date(session.timestamp).toLocaleString('ar-EG')}
                  </p>
               </div>
            </div>

            <div className="flex items-center gap-4">
               {!session.isReviewed && <span className="w-2 h-2 bg-brand-primary animate-pulse" />}
               <ChevronRight size={18} className="text-white/20 group-hover:text-white" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Review Panel */}
      <div className="lg:col-span-5">
        <AnimatePresence mode="wait">
          {selectedSession ? (
            <motion.div 
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="layer-1 p-8 h-full sticky top-8 border border-sovereign"
            >
              <div className="flex items-center justify-between mb-8">
                 <h4 className="text-2xl font-title text-white">تفاصيل الجلسة</h4>
                 <button onClick={() => setSelectedSession(null)} className="text-white/40 hover:text-white font-body">إغلاق</button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="layer-2 p-4 border border-sovereign">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1 font-latin font-bold">متوسط الجذع</p>
                    <p className="text-2xl font-bold text-brand-primary font-latin">{selectedSession.metrics?.avgTrunkAngle?.toFixed(1)}°</p>
                 </div>
                 <div className="layer-2 p-4 border border-sovereign">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1 font-latin font-bold">التوازن</p>
                    <p className="text-2xl font-bold text-brand-secondary font-latin">{selectedSession.metrics?.balanceScore?.toFixed(1)}°</p>
                 </div>
              </div>

              <div className="mb-8">
                <p className="text-xs font-bold text-white/60 mb-2 uppercase tracking-widest">توجيه الذكاء الاصطناعي</p>
                <div className="p-4 layer-2 border border-sovereign italic text-sm text-white/60 leading-relaxed">
                  &quot;{selectedSession.summary}&quot;
                </div>
              </div>

              <div className="space-y-4">
                 <label className="text-xs font-bold text-brand-primary uppercase tracking-widest flex items-center gap-2 font-body">
                   <MessageSquare size={16} />
                   رأيك كمدرب محترف
                 </label>
                 <textarea 
                   value={feedbackText}
                   onChange={(e) => setFeedbackText(e.target.value)}
                   className="w-full h-32 layer-2 border border-sovereign p-4 text-white focus:border-brand-primary outline-none transition-all font-body"
                   placeholder="اكتب توجيهاتك الفنية هنا للفارس..."
                 />
                 <button 
                   onClick={handleApplyFeedback}
                   disabled={isSubmitting || !feedbackText}
                   className="w-full py-4 bg-brand-secondary hover:bg-brand-primary disabled:opacity-50 text-white font-bold transition-all shadow-[0_10px_30px_rgba(145,16,16,0.2)] font-body border border-sovereign"
                 >
                   {isSubmitting ? 'جاري الحفظ...' : 'إرسال التقييم للمتدرب'}
                 </button>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 layer-1 border border-sovereign border-dashed">
               <Shield size={64} className="text-white/10 mb-6" />
               <h4 className="text-xl font-bold text-white/40">اختر جلسة من القائمة للبدء بالتقييم</h4>
               <p className="text-sm text-white/20 mt-2 max-w-xs">يمكنك هنا مراجعة أداء فرسانك وتقديم نصائح تكتيكية لهم مباشرة.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
