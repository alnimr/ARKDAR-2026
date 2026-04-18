'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Icon from '@/components/core/Icon';
import { Link } from '@/i18n/routing';
import TrainingHistory from '@/components/portal/TrainingHistory';
import CoachDashboard from '@/components/portal/CoachDashboard';
import LiveClock from './LiveClock';

export default function PortalDashboardClient() {
  const t = useTranslations('Portal');
  const [viewMode, setViewMode] = useState<'trainee' | 'coach'>('trainee');


  return (
    <div className="flex flex-col gap-16">
      {/* Role Switcher Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-8">
        <div>
          <h2 className="text-4xl md:text-7xl font-brand text-white tracking-tight">
            {viewMode === 'trainee' ? t('navOverview') : t('coachDashboard')}
          </h2>
          <div className="flex items-center gap-3 mt-5 text-gold text-[10px] font-bold uppercase tracking-[0.4em] font-latin">
            <span className="w-10 h-px bg-gold/40" />
            {viewMode === 'trainee' ? 'TACTICAL UNIT: TRAINEE' : 'TACTICAL UNIT: SENIOR COACH'}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-end md:items-center gap-6">
          <LiveClock />
          <div className="flex layer-1 border border-quiet p-1">
            <button 
              onClick={() => setViewMode('trainee')}
              className={`px-8 py-3 flex items-center gap-3 text-[10px] font-bold transition-all duration-cine uppercase tracking-[0.2em] font-latin ${viewMode === 'trainee' ? 'bg-gold text-black depth-card' : 'text-ghost hover:text-white'}`}
            >
              <Icon name="warrior" size={16} color="currentColor" />
              {t('viewAsTrainee')}
            </button>
            <button 
              onClick={() => setViewMode('coach')}
              className={`px-8 py-3 flex items-center gap-3 text-[10px] font-bold transition-all duration-cine uppercase tracking-[0.2em] font-latin ${viewMode === 'coach' ? 'bg-gold text-black depth-card' : 'text-ghost hover:text-white'}`}
            >
              <Icon name="graduation-cap" size={16} color="currentColor" />
              {t('viewAsCoach')}
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'trainee' ? (
        <>
          {/* Laboratory Highlight */}
          <div className="grid grid-cols-1 gap-10">
             <Link href="/portal/lab" className="layer-1 p-14 relative overflow-hidden group border border-quiet hover:border-gold/40 transition-all duration-cine block depth-card">
                <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-cine" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
                   <div className="text-center md:text-right">
                      <h3 className="text-4xl font-brand text-white mb-4 tracking-tight">{t('labTitle')}</h3>
                      <p className="text-secondary max-w-lg font-body leading-relaxed">{t('labSubtitle')}</p>
                   </div>
                   <div className="btn-sovereign group-hover:translate-x-[-8px] transition-transform duration-cine">
                      {t('navLab')}
                   </div>
                </div>
             </Link>
          </div>

          {/* Performance & History Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Live Session Management */}
           <div className="lg:col-span-8">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-lg font-bold uppercase tracking-[0.3em] text-ghost font-brand">سجل التدريبات الحديث</h3>
                  <Link href="/portal/lab" className="text-gold text-[10px] font-bold hover:underline tracking-[0.2em] uppercase font-latin transition-all duration-cine">FULL ARCHIVE</Link>
               </div>
               <TrainingHistory />
            </div>

            {/* Tactical Sidebar Stats */}
            <div className="lg:col-span-4 flex flex-col gap-8">
               <div className="layer-1 p-10 border border-quiet h-full">
                  <h3 className="text-lg font-bold mb-8 text-white tracking-widest font-brand uppercase">المؤشرات التراكمية</h3>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center layer-2 p-5 border border-quiet hover:border-gold/30 transition-all duration-cine group">
                        <span className="text-ghost text-[10px] font-bold uppercase tracking-[0.2em] font-latin group-hover:text-white">TRUNK STABILITY</span>
                        <span className="text-2xl font-latin font-bold text-gold">88°</span>
                     </div>
                     <div className="flex justify-between items-center layer-2 p-5 border border-quiet hover:border-gold/30 transition-all duration-cine group">
                        <span className="text-ghost text-[10px] font-bold uppercase tracking-[0.2em] font-latin group-hover:text-white">PRECISION RATE</span>
                        <span className="text-2xl font-latin font-bold text-secondary">92%</span>
                     </div>
                     
                     <div className="layer-3 p-8 border border-gold/20 mt-10 relative">
                        <div className="absolute top-0 right-0 w-16 h-16 opacity-5 pointer-events-none layer-0" />
                        <p className="text-[10px] text-gold font-bold uppercase tracking-[0.3em] mb-4 font-latin">COMMAND RECOMMENDATION</p>
                        <p className="text-sm text-secondary italic leading-relaxed font-body border-r-2 border-gold/30 pr-6">
                          &quot;استمر في التركيز على ثبات الحوض أثناء الانتقال من الكانتر إلى الغالوب.&quot;
                        </p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </>
      ) : (
        <CoachDashboard />
      )}
    </div>
  );
}
