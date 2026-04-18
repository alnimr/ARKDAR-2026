'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/core/Icon';

export default function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-3 layer-1 border border-sovereign px-6 py-3 text-white/50 font-latin font-bold text-xs tracking-[2px] shadow-2xl">
      <Icon name="clock" size={14} color="currentColor" className="animate-pulse" />
      <span className="font-bold">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
      <span className="opacity-20">|</span>
      <span className="uppercase">{time.toLocaleDateString([], { day: '2-digit', month: 'short' })}</span>
    </div>
  );
}
