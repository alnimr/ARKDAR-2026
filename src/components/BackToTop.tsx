'use client';

import Icon from './core/Icon';

interface BackToTopProps {
  label: string;
}

export default function BackToTop({ label }: BackToTopProps) {
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="flex items-center gap-4 text-[10px] font-brand font-bold tracking-[0.4em] text-ghost/40 hover:text-gold transition-all duration-cine group uppercase"
    >
      {label}
      <Icon name="arrow" size={12} color="currentColor" className="-rotate-90 group-hover:-translate-y-1 transition-transform" />
    </button>
  );
}
