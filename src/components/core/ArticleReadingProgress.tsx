'use client';

import { useEffect, useState } from 'react';

export default function ArticleReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress((window.scrollY / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[100] pointer-events-none">
      <div 
        className="h-full bg-brand-primary transition-all duration-300 ease-out shadow-[0_0_10px_rgba(145,16,16,0.6)]"
        style={{ width: `${progress}%` }}
      />
      {/* Decorative trailing light */}
      <div 
        className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent to-brand-secondary/40 blur-[2px] transition-all duration-300 ease-out"
        style={{ left: `calc(${progress}% - 80px)` }}
      />
    </div>
  );
}
