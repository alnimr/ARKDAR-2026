import React from 'react';
import Link from 'next/link';
import { APP_ROUTES } from '@/config/routes';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Area */}
        <div className="flex items-center">
          <Link href={APP_ROUTES.HOME} className="flex items-center gap-2">
            {/* The actual SVG logo will go here, using a placeholder text for now */}
            <span className="font-serif text-2xl font-bold text-brand-primary uppercase tracking-wider">
              ARKDAR
            </span>
          </Link>
        </div>

        {/* Navigation Area */}
        <nav className="hidden md:flex gap-8">
          <Link href={APP_ROUTES.ABOUT} className="text-sm font-medium text-text-primary hover:text-brand-primary transition-colors">
            Our Heritage
          </Link>
          <Link href={APP_ROUTES.SPORTS.ROOT} className="text-sm font-medium text-text-primary hover:text-brand-primary transition-colors">
            Sports
          </Link>
          <Link href={APP_ROUTES.DASHBOARD.ROOT} className="text-sm font-medium text-text-primary hover:text-brand-primary transition-colors">
            Portal
          </Link>
        </nav>

        {/* Actions Area */}
        <div className="flex items-center gap-4">
          <Link 
            href={APP_ROUTES.BOOKING} 
            className="hidden md:inline-flex items-center justify-center h-10 px-5 text-sm font-medium transition-all duration-300 ease-in-out rounded-[6px] bg-brand-primary text-text-on-brand hover:bg-brand-secondary"
          >
            Book Experience
          </Link>
        </div>
        
      </div>
    </header>
  );
};
