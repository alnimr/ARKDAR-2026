'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { 
  UserCircle, GraduationCap 
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import TrainingHistory from '@/components/portal/TrainingHistory';
import CoachDashboard from '@/components/portal/CoachDashboard';
import LiveClock from './LiveClock';

export default function PortalDashboardClient() {
  const t = useTranslations('Portal');
  const [viewMode, setViewMode] = useState<'trainee' | 'coach'>('trainee');

  return (
    <div className="flex flex-col gap-12">
      {/* Role Switcher Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-title text-white tracking-tight">
            {viewMode === 'trainee' ? t('navOverview') : t('coachDashboard')}
          </h2>
          <div className="flex items-center gap-2 mt-4 text-brand-primary text-[10px] font-bold uppercase tracking-[4px] font-latin">
            <span className="w-8 h-[1px] bg-brand-primary/40" />
            {viewMode === 'trainee' ? 'Tactical Unit: Trainee' : 'Tactical Unit: Senior Coach'}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
          <LiveClock />
          <div className="flex bg-surface-dark border border-sovereign layer-1">
            <button 
              onClick={() => setViewMode('trainee')}
              className={`px-6 py-3 flex items-center gap-2 text-[10px] font-bold transition-all uppercase tracking-widest font-body ${viewMode === 'trainee' ? 'bg-brand-primary text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
            >
              <UserCircle size={16} />
              {t('viewAsTrainee')}
            </button>
            <button 
              onClick={() => setViewMode('coach')}
              className={`px-6 py-3 flex items-center gap-2 text-[10px] font-bold transition-all uppercase tracking-widest font-body ${viewMode === 'coach' ? 'bg-brand-primary text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
            >
              <GraduationCap size={16} />
              {t('viewAsCoach')}
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'trainee' ? (
        <>
          {/* Laboratory Highlight */}
          <div className="grid grid-cols-1 gap-8">
             <Link href="/portal/lab" className="layer-1 p-12 relative overflow-hidden group border border-sovereign hover:border-brand-primary/40 transition-all block">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                   <div>
                      <h3 className="text-3xl font-title text-white mb-4">{t('labTitle')}</h3>
                      <p className="text-white/40 max-w-md font-body">{t('labSubtitle')}</p>
                   </div>
                   <div className="btn-sovereign shadow-[0_10px_40px_rgba(145,16,16,0.3)] group-hover:scale-105 transition-transform">
                      {t('navLab')}
                   </div>
                </div>
             </Link>
          </div>

          {/* Performance & History Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Live Session Management */}
           <div className="lg:col-span-8">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-white/60 font-title">سجل التدريبات الحديث</h3>
                  <Link href="/portal/lab" className="text-brand-primary text-[10px] font-bold hover:underline tracking-widest uppercase font-body">انتقل للمختبر الكامل</Link>
               </div>
               <TrainingHistory />
            </div>

            {/* Tactical Sidebar Stats */}
            <div className="lg:col-span-4 flex flex-col gap-6">
               <div className="layer-1 p-8 h-full border border-sovereign">
                  <h3 className="text-lg font-bold mb-6 text-white/80 font-title">المؤشرات التراكمية</h3>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center layer-2 p-4 border border-sovereign hover:bg-white/5 transition-colors">
                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest font-body">متوسط استقرار الجذع</span>
                        <span className="text-2xl font-latin font-bold text-brand-primary">88°</span>
                     </div>
                     <div className="flex justify-between items-center layer-2 p-4 border border-sovereign hover:bg-white/5 transition-colors">
                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest font-body">دقة التقاط الأوتاد</span>
                        <span className="text-2xl font-latin font-bold text-brand-secondary">92%</span>
                     </div>
                     <div className="p-6 bg-brand-primary/10 border border-brand-primary/20 mt-8">
                        <p className="text-[10px] text-brand-primary font-bold uppercase tracking-widest mb-2 font-body">توصية القائد</p>
                        <p className="text-sm text-white/80 italic leading-relaxed font-body">
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
