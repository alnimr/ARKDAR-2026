import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Target, ArrowRight, Shield, Compass, Globe } from 'lucide-react';
import NextImage from 'next/image';
import { Suspense } from 'react';
import ServiceGrid from '@/components/layout/ServiceGrid';
import BookingForm from '@/components/BookingForm';

export default async function ArenaPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  console.log('--- DEBUG: ArenaPage rendering for locale:', locale);
  const t = await getTranslations('Arenas');
  console.log('--- DEBUG: Translations loaded');

  return (
    <main className="flex flex-col w-full min-h-screen pt-24 bg-surface relative overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 brand-pattern-waves opacity-10 pointer-events-none" />

      {/* ── Header ── */}
      <section className="py-20 px-6 text-center relative z-10">
        <span className="text-xs font-bold uppercase tracking-[8px] text-brand-secondary mb-4 block animate-fade-in">
          {t('heroTag')}
        </span>
        <h1 className="text-5xl md:text-8xl font-title font-bold text-white mb-8 leading-tight">
          {t('title')}
        </h1>
        <div className="brand-sep-bow mx-auto max-w-md opacity-60" />
      </section>

      {/* ── Experience & Hubs ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="grid-sovereign">
          
          {/* Main Experience Card (Training) */}
          <div className="col-span-12 lg:col-span-8 glass p-12 rounded-sovereign border border-white/5 group hover-lift relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 border-brand-primary/10 border-t-2 border-r-2 rounded-sovereign -mr-20 -mt-20 group-hover:scale-110 transition-transform" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full brand-horse-bg opacity-[0.03] group-hover:opacity-[0.07] transition-opacity" />
             
             <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-brand-primary/10 rounded-sovereign">
                   <Target size={32} className="text-brand-primary" />
                </div>
                <h2 className="text-4xl font-title text-white">{t('masterclassTitle')}</h2>
             </div>

             <p className="text-xl text-[#EDF2F4]/70 font-body leading-relaxed mb-12 max-w-2xl">
                {t('masterclassDesc')}
             </p>

             <div className="flex flex-wrap gap-6">
                <button className="btn-primary">
                   {t('bookSession')} <ArrowRight size={18} />
                </button>
             </div>
          </div>

          {/* Tourism Tours Card (Refined) */}
          <div className="col-span-12 lg:col-span-7 glass p-12 rounded-sovereign border border-white/5 group hover-lift relative overflow-hidden order-last lg:order-none">
             <div className="absolute bottom-0 left-0 w-64 h-64 border-brand-secondary/10 border-b-2 border-l-2 rounded-sovereign -ml-20 -mb-20 group-hover:scale-110 transition-transform" />
             
             <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-brand-secondary/10 rounded-sovereign">
                   <Compass size={32} className="text-brand-secondary" />
                </div>
                <h2 className="text-4xl font-title text-white">{t('toursTitle')}</h2>
             </div>

             <div className="space-y-8 mb-12">
                <div className="flex gap-6 items-start">
                   <div className="p-3 glass rounded-sovereign mt-1 self-start">
                      <Globe size={20} className="text-brand-secondary" />
                   </div>
                   <div>
                      <h4 className="text-white font-title font-bold mb-1">Interlaken</h4>
                      <p className="text-[#EDF2F4]/60 text-sm font-body leading-relaxed">{t('swissTours')}</p>
                   </div>
                </div>

                <div className="flex gap-6 items-start">
                   <div className="p-3 glass rounded-sovereign mt-1 self-start">
                      <Globe size={20} className="text-brand-secondary" />
                   </div>
                   <div>
                      <h4 className="text-white font-title font-bold mb-1">{t('hubCairo')}</h4>
                      <p className="text-[#EDF2F4]/60 text-sm font-body leading-relaxed">{t('egyptTours')}</p>
                   </div>
                </div>
             </div>

             <div className="flex flex-wrap gap-6">
                <button className="px-8 py-4 rounded-sovereign border border-brand-secondary text-brand-secondary font-bold uppercase tracking-widest text-xs hover:bg-brand-secondary hover:text-white transition-all flex items-center gap-3">
                   {t('bookTour')} <ArrowRight size={18} />
                </button>
             </div>
          </div>

          {/* Secondary Stats/Info */}
          <div className="col-span-12 lg:col-span-5 space-y-8">
             <div className="glass p-10 rounded-sovereign border border-white/5 group hover:bg-white/[0.02] transition-colors">
                <Shield size={24} className="text-brand-secondary mb-4" />
                <h3 className="text-white font-title font-bold mb-2">{t('safetyTitle')}</h3>
                <p className="text-sm text-white/50 font-body leading-relaxed">{t('safetyDesc')}</p>
             </div>
             
             <div className="glass p-10 rounded-sovereign border border-white/5 bg-gradient-to-br from-brand-primary/5 to-transparent">
                <h3 className="text-white font-title font-bold mb-4">{t('expansionTitle')}</h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-xs text-brand-primary font-numbers font-bold tracking-widest border-b border-white/5 pb-2">
                      <span>{t('switzerland')}</span>
                      <span>Q3 2026</span>
                   </div>
                   <div className="flex justify-between items-center text-xs text-white/30 font-numbers tracking-widest">
                      <span>{t('spain')}</span>
                      <span>Q1 2027</span>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </section>
      {/* ── Services Showcase (The Highlight) ── */}
      <section className="py-10 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
          <div className="max-w-2xl">
            <h3 className="text-brand-secondary font-bold tracking-[6px] text-xs uppercase mb-4">
               {t('ourServices')}
            </h3>
            <h2 className="text-4xl md:text-6xl font-title text-white">
               Explore Ancient Passions
            </h2>
          </div>
          <div className="hidden md:block">
             <div className="w-24 h-px bg-brand-primary/30 mb-8" />
          </div>
        </div>

        <ServiceGrid />
      </section>

      {/* ── Image Showcase (The Environment) ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
         <div className="grid-sovereign">
            {[1, 2, 3, 4].map(i => (
               <div key={i} className="col-span-6 md:col-span-3 relative aspect-square rounded-sovereign overflow-hidden glass border border-white/5 cinema-lut">
                  <NextImage 
                     src={`/images/brand/brand-bow${i === 2 ? '2' : ''}.png`} 
                     alt={`Arena Detail ${i}`}
                     fill
                     className="object-contain p-4 opacity-50 hover:scale-105 hover:opacity-100 transition-all duration-500"
                  />
               </div>
            ))}
         </div>
      </section>
      
      {/* ── Booking Section (The Portal) ── */}
      <section id="booking" className="py-32 px-6 bg-secondary-950/30 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 px-4">
            <h2 className="text-4xl md:text-7xl font-title text-white mb-6">
              Secure Your Place in History
            </h2>
            <div className="w-24 h-px bg-brand-primary/30 mx-auto" />
          </div>
          
          <Suspense fallback={<div className="text-white text-center py-20">Loading Booking Portal...</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </section>
      
    </main>
  );
}
