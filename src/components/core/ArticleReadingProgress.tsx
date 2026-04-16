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
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute top-0 right-0 w-24 h-full bg-white/20 blur-sm animate-pulse" />
      </div>
    </div>
  );
}
