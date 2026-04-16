'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-3 bg-white/5 backdrop-blur-[12px] border border-white/10 px-6 py-3 rounded-sovereign text-white/50 font-numbers text-xs tracking-[2px] shadow-2xl">
      <Clock size={14} className="text-brand-primary/80 animate-pulse" />
      <span className="font-bold">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
      <span className="opacity-20">|</span>
      <span className="uppercase">{time.toLocaleDateString([], { day: '2-digit', month: 'short' })}</span>
    </div>
  );
}
