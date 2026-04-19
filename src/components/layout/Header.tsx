import React from 'react';
import Link from 'next/link';
import { APP_ROUTES } from '@/config/routes';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full layer-1 border-b border-quiet layer-sovereign">
      <div className="max-w-7xl mx-auto flex h-24 items-center justify-between px-6 lg:px-10">
        
        {/* Logo Area */}
        <div className="flex items-center">
          <Link href={APP_ROUTES.HOME} className="flex items-center gap-3 group">
            {/* ARKDAR Sovereign Wordmark */}
            <span className="font-brand text-3xl font-bold text-gold uppercase tracking-[0.3em] transition-all duration-cine group-hover:tracking-[0.4em]">
              ARKDAR
            </span>
          </Link>
        </div>

        {/* Navigation Area */}
        <nav className="hidden md:flex gap-10">
          <Link href={APP_ROUTES.ABOUT} className="text-[10px] font-latin font-bold uppercase tracking-[0.3em] text-ghost hover:text-gold transition-all duration-cine">
            Our Heritage
          </Link>
          <Link href={APP_ROUTES.SPORTS.ROOT} className="text-[10px] font-latin font-bold uppercase tracking-[0.3em] text-ghost hover:text-gold transition-all duration-cine">
            Sports
          </Link>
          <Link href={APP_ROUTES.DASHBOARD.ROOT} className="text-[10px] font-latin font-bold uppercase tracking-[0.3em] text-ghost hover:text-gold transition-all duration-cine">
            Portal
          </Link>
        </nav>

        {/* Actions Area */}
        <div className="flex items-center gap-6">
          <Link 
            href={APP_ROUTES.BOOKING} 
            className="btn-sovereign hidden md:inline-flex"
          >
            Book Experience
          </Link>
        </div>
        
      </div>
    </header>
  );
};
