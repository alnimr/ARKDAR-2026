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

  if (loading) return <div className="animate-pulse text-gold/40 font-brand uppercase tracking-widest p-8 layer-1 border border-quiet">جاري تحميل سجل التدريبات...</div>;

  return (
    <div className="space-y-6">
      {sessions.length === 0 ? (
        <div className="p-12 text-center layer-1 border border-dashed border-quiet">
          <p className="text-ghost uppercase tracking-[0.2em] text-xs">لا توجد جلسات مسجلة حتى الآن.</p>
        </div>
      ) : (
        sessions.map((session, i) => (
          <div key={session.id} className="space-y-3">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setExpandedId(expandedId === session.id ? null : session.id)}
              className={`flex items-center justify-between p-6 layer-2 border transition-all duration-cine cursor-pointer group hover:border-gold/40 ${expandedId === session.id ? 'border-gold' : 'border-quiet'}`}
            >
              <div className="flex items-center gap-6">
                <div className={`p-4 border border-quiet layer-3 ${session.sport === 'archery' ? 'text-gold' : 'text-secondary'}`}>
                  {session.sport === 'archery' ? <Target size={24} /> : <Activity size={24} />}
                </div>
                <div>
                  <h4 className="font-bold text-lg font-brand text-white tracking-tight flex items-center gap-4">
                    {session.sport === 'archery' ? 'رماية من على الخيل' : 'التقاط أوتاد'}
                    {session.isReviewed && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 layer-3 border border-gold/30 text-gold text-[9px] uppercase tracking-[0.2em] font-bold font-latin">
                        <ShieldCheck size={12} /> EVALUATED
                      </span>
                    )}
                  </h4>
                  <div className="flex items-center gap-5 mt-2 text-[10px] text-ghost uppercase tracking-[0.2em] font-latin font-bold">
                    <span className="flex items-center gap-2"><Calendar size={12} className="text-gold/40" /> {new Date(session.timestamp).toLocaleDateString('ar-EG')}</span>
                    <span className="flex items-center gap-2"><Clock size={12} className="text-gold/40" /> {new Date(session.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-10">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[9px] text-ghost uppercase tracking-[0.1em] font-body">زاوية الجذع</span>
                  <span className="font-bold text-gold text-lg font-latin">{session.metrics?.avgTrunkAngle?.toFixed(1)}°</span>
                </div>
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[9px] text-ghost uppercase tracking-[0.1em] font-body">التوازن</span>
                  <span className="font-bold text-secondary text-lg font-latin">{session.metrics?.balanceScore?.toFixed(1)}°</span>
                </div>
                <ChevronRight size={24} className={`text-ghost/20 group-hover:text-gold transition-all duration-cine ${expandedId === session.id ? 'rotate-90 text-gold' : ''}`} />
              </div>
            </motion.div>

            <AnimatePresence>
              {expandedId === session.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden layer-1 border-x border-b border-quiet"
                >
                  <div className="p-8 space-y-6">
                     <div className="layer-3 p-6 border border-quiet relative">
                        <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.02] pointer-events-none layer-0" />
                        <p className="text-[9px] text-gold/40 uppercase tracking-[0.3em] font-bold mb-4 font-latin">SOVEREIGN SYNTHESIS</p>
                        <p className="text-sm text-secondary leading-relaxed italic font-body border-l-2 border-gold/20 pl-6">&quot;{session.summary}&quot;</p>
                     </div>
                     
                     {session.isReviewed ? (
                       <div className="layer-3 p-8 border border-gold/20 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-cine">
                             <GraduationCap size={64} className="text-gold" />
                          </div>
                          <div className="flex items-start gap-6">
                             <div className="w-12 h-12 bg-gold flex items-center justify-center text-black shrink-0">
                                <MessageSquare size={24} />
                             </div>
                             <div>
                                <p className="text-[10px] text-gold font-bold uppercase tracking-[0.3em] mb-3 font-latin">COACH FEEDBACK</p>
                                <p className="text-base text-white leading-relaxed font-body">{session.coachFeedback}</p>
                             </div>
                          </div>
                       </div>
                     ) : (
                       <div className="p-6 border border-dashed border-quiet text-center layer-2">
                          <p className="text-[10px] text-ghost uppercase tracking-[0.3em] italic font-body">AWAITING SOVEREIGN REVIEW...</p>
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
