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
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            {viewMode === 'trainee' ? t('navOverview') : t('coachDashboard')}
          </h2>
          <div className="flex items-center gap-2 mt-4 text-brand-primary text-[10px] font-bold uppercase tracking-[4px]">
            <span className="w-8 h-[1px] bg-brand-primary/40" />
            {viewMode === 'trainee' ? 'Tactical Unit: Trainee' : 'Tactical Unit: Senior Coach'}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
          <LiveClock />
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
            <button 
              onClick={() => setViewMode('trainee')}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 text-xs font-bold transition-all ${viewMode === 'trainee' ? 'bg-white/10 text-white shadow-xl' : 'text-white/40 hover:text-white'}`}
            >
              <UserCircle size={16} />
              {t('viewAsTrainee')}
            </button>
            <button 
              onClick={() => setViewMode('coach')}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 text-xs font-bold transition-all ${viewMode === 'coach' ? 'bg-white/10 text-white shadow-xl' : 'text-white/40 hover:text-white'}`}
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
             <Link href="/portal/lab" className="glass-dark p-12 rounded-[50px] border border-brand-primary/10 relative overflow-hidden group hover:border-brand-primary/40 transition-all block">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                   <div>
                      <h3 className="text-3xl font-serif text-white mb-4">{t('labTitle')}</h3>
                      <p className="text-footer-muted max-w-md">{t('labSubtitle')}</p>
                   </div>
                   <div className="px-10 py-5 bg-brand-primary text-white rounded-full font-bold uppercase tracking-widest text-[12px] shadow-[0_10px_40px_rgba(160,6,28,0.3)] group-hover:scale-105 transition-transform">
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
                  <h3 className="text-2xl font-bold uppercase tracking-widest text-white/60">سجل التدريبات الحديث</h3>
                  <Link href="/portal/lab" className="text-brand-primary text-xs font-bold hover:underline">انتقل للمختبر الكامل</Link>
               </div>
               <TrainingHistory />
            </div>

            {/* Tactical Sidebar Stats */}
            <div className="lg:col-span-4 flex flex-col gap-6">
               <div className="glass-dark p-8 rounded-[40px] border border-white/5 h-full">
                  <h3 className="text-lg font-bold mb-6 text-white/80">المؤشرات التراكمية</h3>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                        <span className="text-white/40 text-xs">متوسط استقرار الجذع</span>
                        <span className="text-2xl font-serif text-[#DAA520]">88°</span>
                     </div>
                     <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                        <span className="text-white/40 text-xs">دقة التقاط الأوتاد</span>
                        <span className="text-2xl font-serif text-emerald-400">92%</span>
                     </div>
                     <div className="p-6 bg-brand-primary/10 rounded-3xl border border-brand-primary/20 mt-8">
                        <p className="text-[10px] text-brand-primary font-bold uppercase tracking-widest mb-2">توصية القائد</p>
                        <p className="text-sm text-white/80 italic leading-relaxed">
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
