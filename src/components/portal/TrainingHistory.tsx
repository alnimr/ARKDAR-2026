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
        <div className="p-8 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
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
              className={`flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 border transition-all cursor-pointer group ${expandedId === session.id ? 'border-brand-primary rounded-t-2xl' : 'border-white/10 rounded-2xl'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${session.sport === 'archery' ? 'bg-[#DAA520]/20 text-[#DAA520]' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {session.sport === 'archery' ? <Target size={20} /> : <Activity size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-sm">
                    {session.sport === 'archery' ? 'رماية من على الخيل' : 'التقاط أوتاد'}
                    {session.isReviewed && (
                      <span className="ms-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#DAA520]/20 text-[#DAA520] text-[8px] uppercase tracking-widest font-bold">
                        <ShieldCheck size={10} /> تقييم المدرب
                      </span>
                    )}
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-white/40 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {new Date(session.timestamp).toLocaleDateString('ar-EG')}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {new Date(session.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[10px] text-white/40 uppercase tracking-tighter">تقييم الجذع</span>
                  <span className="font-bold text-[#DAA520]">{session.metrics?.avgTrunkAngle?.toFixed(1)}°</span>
                </div>
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[10px] text-white/40 uppercase tracking-tighter">التوازن</span>
                  <span className="font-bold text-emerald-400">{session.metrics?.balanceScore?.toFixed(1)}°</span>
                </div>
                <ChevronRight size={20} className={`text-white/20 group-hover:text-white transition-transform ${expandedId === session.id ? 'rotate-90 text-[#DAA520]' : ''}`} />
              </div>
            </motion.div>

            <AnimatePresence>
              {expandedId === session.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-brand-primary/5 border-x border-b border-brand-primary/20 rounded-b-2xl"
                >
                  <div className="p-6 space-y-4">
                     <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                        <p className="text-[10px] text-white/30 uppercase tracking-[2px] font-bold mb-2">استنتاج الذكاء الاصطناعي</p>
                        <p className="text-sm text-white/70 leading-relaxed italic">&quot;{session.summary}&quot;</p>
                     </div>
                     
                     {session.isReviewed ? (
                       <div className="bg-[#DAA520]/10 p-5 rounded-2xl border border-[#DAA520]/20 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                             <GraduationCap size={48} className="text-[#DAA520]" />
                          </div>
                          <div className="flex items-start gap-4">
                             <div className="w-10 h-10 rounded-full bg-[#DAA520] flex items-center justify-center text-black shrink-0">
                                <MessageSquare size={20} />
                             </div>
                             <div>
                                <p className="text-[10px] text-[#DAA520] font-bold uppercase tracking-widest mb-1">نصيحة المدرب المحترف</p>
                                <p className="text-sm text-white leading-relaxed">{session.coachFeedback}</p>
                             </div>
                          </div>
                       </div>
                     ) : (
                       <div className="p-4 border border-dashed border-white/10 rounded-xl text-center">
                          <p className="text-[10px] text-white/40 uppercase tracking-widest italic">بانتظار مراجعة المدرب...</p>
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
