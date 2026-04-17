'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/arena/firebase';
import { Calendar, Activity, ChevronRight, Target, Clock, MessageSquare, ShieldCheck, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrainingSession {
  id: string;
  sport: string;
  timestamp: number;
  isReviewed?: boolean;
  coachFeedback?: string;
  summary?: string;
  metrics?: { avgTrunkAngle?: number; balanceScore?: number };
}

export default function TrainingHistory() {
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'sessions'),
      orderBy('timestamp', 'desc'),
      limit(10)
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

  if (loading) return <div className="animate-pulse text-white/20">جاري تحميل سجل التدريبات...</div>;

  return (
    <div className="space-y-4">
      {sessions.length === 0 ? (
        <div className="p-8 text-center bg-white/5 border border-dashed border-sovereign">
          <p className="text-white/40">لا توجد جلسات مسجلة حتى الآن.</p>
        </div>
      ) : (
        sessions.map((session, i) => (
          <div key={session.id} className="space-y-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setExpandedId(expandedId === session.id ? null : session.id)}
              className={`flex items-center justify-between p-5 bg-surface-dark border transition-all cursor-pointer group ${expandedId === session.id ? 'border-brand-primary' : 'border-sovereign'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 border border-sovereign ${session.sport === 'archery' ? 'bg-brand-primary/20 text-brand-primary' : 'bg-brand-secondary/20 text-brand-secondary'}`}>
                  {session.sport === 'archery' ? <Target size={20} /> : <Activity size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-sm font-title">
                    {session.sport === 'archery' ? 'رماية من على الخيل' : 'التقاط أوتاد'}
                    {session.isReviewed && (
                      <span className="ms-3 inline-flex items-center gap-1 px-2 py-0.5 bg-brand-primary/20 text-brand-primary text-[8px] uppercase tracking-widest font-bold font-body border border-brand-primary/20">
                        <ShieldCheck size={10} /> تقييم المدرب
                      </span>
                    )}
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-white/40 uppercase tracking-widest font-latin font-bold">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(session.timestamp).toLocaleDateString('ar-EG')}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {new Date(session.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[10px] text-white/40 uppercase tracking-tighter font-body">تقييم الجذع</span>
                  <span className="font-bold text-brand-primary font-latin">{session.metrics?.avgTrunkAngle?.toFixed(1)}°</span>
                </div>
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[10px] text-white/40 uppercase tracking-tighter font-body">التوازن</span>
                  <span className="font-bold text-brand-secondary font-latin">{session.metrics?.balanceScore?.toFixed(1)}°</span>
                </div>
                <ChevronRight size={20} className={`text-white/20 group-hover:text-white transition-transform ${expandedId === session.id ? 'rotate-90 text-brand-primary' : ''}`} />
              </div>
            </motion.div>

            <AnimatePresence>
              {expandedId === session.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-brand-primary/5 border-x border-b border-brand-primary/20"
                >
                  <div className="p-6 space-y-4">
                     <div className="bg-black/40 p-4 border border-sovereign">
                        <p className="text-[10px] text-white/30 uppercase tracking-[2px] font-bold mb-2 font-body">استنتاج السيادة الرقمية</p>
                        <p className="text-sm text-white/70 leading-relaxed italic font-body">&quot;{session.summary}&quot;</p>
                     </div>
                     
                     {session.isReviewed ? (
                       <div className="bg-brand-primary/5 p-5 border border-brand-primary/20 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                             <GraduationCap size={48} className="text-brand-primary" />
                          </div>
                          <div className="flex items-start gap-4">
                             <div className="w-10 h-10 bg-brand-primary flex items-center justify-center text-white shrink-0">
                                <MessageSquare size={20} />
                             </div>
                             <div>
                                <p className="text-[10px] text-brand-primary font-bold uppercase tracking-widest mb-1 font-body">نصيحة المدرب السيادي</p>
                                <p className="text-sm text-white leading-relaxed font-body">{session.coachFeedback}</p>
                             </div>
                          </div>
                       </div>
                     ) : (
                       <div className="p-4 border border-dashed border-sovereign text-center">
                          <p className="text-[10px] text-white/40 uppercase tracking-widest italic font-body">بانتظار مراجعة المدرب...</p>
                       </div>
                     )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))
      )}
    </div>
  );
}
