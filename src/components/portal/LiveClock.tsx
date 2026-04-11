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
    <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-white/60 font-mono text-sm tracking-widest shadow-xl">
      <Clock size={14} className="text-brand-primary animate-pulse" />
      <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
      <span className="opacity-30">|</span>
      <span>{time.toLocaleDateString([], { day: '2-digit', month: 'short' })}</span>
    </div>
  );
}
