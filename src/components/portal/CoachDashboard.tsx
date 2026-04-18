'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/arena/firebase';
import Icon from '@/components/core/Icon';
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

  if (loading) return <div className="animate-pulse text-gold/40 font-brand uppercase tracking-widest text-sm">جاري تحميل لوحة تحكم المدرب...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px] selection:bg-gold selection:text-black font-brand">
      {/* Sessions List */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between mb-8 border-b border-quiet pb-6">
           <h3 className="text-xl font-bold uppercase tracking-widest text-white flex items-center gap-3 font-brand">
             <Icon name="users" size={20} color="currentColor" />
             طلبات مراجعة الأداء
           </h3>
           <div className="flex gap-3">
              <button 
                title="Filter"
                className="p-3 layer-1 border border-quiet text-ghost/40 hover:text-gold hover:border-gold/50 transition-all duration-cine"
              >
                <Icon name="filter" size={18} color="currentColor" />
              </button>
              <button 
                title="Search"
                className="p-3 layer-1 border border-quiet text-ghost/40 hover:text-gold hover:border-gold/50 transition-all duration-cine"
              >
                <Icon name="search" size={18} color="currentColor" />
              </button>
           </div>
        </div>

        <div className="space-y-4 max-h-[700px] overflow-y-auto no-scrollbar pr-2">
          {sessions.map((session, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              key={session.id}
              onClick={() => setSelectedSession(session)}
              className={`p-6 border transition-all duration-cine cursor-pointer group flex items-center justify-between depth-card ${
                  selectedSession?.id === session.id 
                  ? 'bg-gold/10 border-gold shadow-[0_0_30px_rgba(212,175,55,0.1)]' 
                  : session.isReviewed ? 'bg-black/40 border-quiet opacity-40' : 'bg-black border-quiet hover:border-gold/30'
              }`}
            >
              <div className="flex items-center gap-6">
                 <div className={`w-14 h-14 flex items-center justify-center border transition-all duration-cine ${session.sport === 'archery' ? 'bg-gold/10 text-gold border-gold/30 group-hover:bg-gold group-hover:text-black' : 'bg-ghost/5 text-ghost border-quiet group-hover:bg-ghost group-hover:text-black'}`}>
                    {session.sport === 'archery' ? <Icon name="target" size={28} color="currentColor" /> : <Icon name="activity" size={28} color="currentColor" />}
                 </div>
                 <div>
                    <h4 className="font-bold text-white group-hover:text-gold transition-colors font-brand text-lg uppercase tracking-tight">
                       {session.userId === 'anonymous-trainee' ? 'متدرب مجهول' : `متدرب: ${session.userId.substring(0, 8)}`}
                    </h4>
                    <p className="text-[10px] text-ghost/40 font-brand font-bold uppercase tracking-[0.2em] mt-2">
                       {new Date(session.timestamp).toLocaleString('ar-EG')}
                    </p>
                 </div>
              </div>

              <div className="flex items-center gap-6">
                 {!session.isReviewed && <span className="w-2.5 h-2.5 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)] animate-pulse" />}
                 <Icon name="chevron" size={20} color="currentColor" className="text-ghost/20 group-hover:text-gold transition-all duration-cine transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
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
              transition={{ duration: 0.6 }}
              className="layer-1 p-10 h-full sticky top-8 border border-quiet depth-card"
            >
              <div className="flex items-center justify-between mb-12">
                 <h4 className="text-2xl font-brand font-bold text-white uppercase tracking-tight border-s-2 border-gold ps-6">تفاصيل الجلسة</h4>
                 <button onClick={() => setSelectedSession(null)} className="text-ghost/40 hover:text-white font-brand text-xs uppercase tracking-widest transition-colors">إغلاق</button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                 <div className="layer-2 p-6 border border-quiet hover:border-gold/20 transition-all duration-cine">
                    <p className="text-[9px] text-ghost uppercase tracking-[0.3em] mb-2 font-brand font-bold opacity-40">متوسط الجذع</p>
                    <p className="text-3xl font-bold text-gold font-brand tracking-tighter">{selectedSession.metrics?.avgTrunkAngle?.toFixed(1)}°</p>
                 </div>
                 <div className="layer-2 p-6 border border-quiet hover:border-gold/20 transition-all duration-cine">
                    <p className="text-[9px] text-ghost uppercase tracking-[0.3em] mb-2 font-brand font-bold opacity-40">التوازن</p>
                    <p className="text-3xl font-bold text-ghost font-brand tracking-tighter">{selectedSession.metrics?.balanceScore?.toFixed(1)}°</p>
                 </div>
              </div>

              <div className="mb-10">
                <p className="text-[10px] font-bold text-gold mb-4 uppercase tracking-[0.3em] font-brand">توجيه الذكاء الاصطناعي</p>
                <div className="p-6 layer-2 border border-quiet italic text-sm text-ghost/70 leading-relaxed font-brand bg-gold/5">
                  &quot;{selectedSession.summary}&quot;
                </div>
              </div>

              <div className="space-y-6">
                 <label className="text-[10px] font-bold text-gold uppercase tracking-[0.3em] flex items-center gap-3 font-brand">
                   <Icon name="message-square" size={18} color="currentColor" />
                   رأيك كمدرب محترف
                 </label>
                 <textarea 
                   value={feedbackText}
                   onChange={(e) => setFeedbackText(e.target.value)}
                   className="w-full h-40 layer-2 border border-quiet p-6 text-white focus:border-gold outline-none transition-all duration-cine font-brand resize-none placeholder:text-ghost/20"
                   placeholder="اكتب توجيهاتك الفنية هنا للفارس..."
                 />
                 <button 
                   onClick={handleApplyFeedback}
                   disabled={isSubmitting || !feedbackText}
                   className="w-full py-6 bg-secondary hover:bg-gold disabled:opacity-20 text-black font-brand font-bold transition-all duration-cine depth-card uppercase tracking-[0.3em] text-[12px]"
                 >
                   {isSubmitting ? 'جاري الحفظ...' : 'إرسال التقييم للمتدرب'}
                 </button>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-16 layer-1 border border-quiet border-dashed depth-card opacity-50">
               <Icon name="shield" size={80} color="var(--color-gold)" opacity="0.2" className="mb-8" />
               <h4 className="text-xl font-brand font-bold text-ghost uppercase tracking-widest">اختر جلسة للتقييم</h4>
               <p className="text-xs text-ghost/40 mt-4 max-w-xs font-brand leading-relaxed">يمكنك هنا مراجعة أداء فرسانك وتقديم نصائح تكتيكية لهم مباشرة وفق المعايير السيادية.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
