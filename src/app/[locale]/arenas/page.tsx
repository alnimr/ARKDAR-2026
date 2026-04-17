import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
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
      <section className="py-24 px-6 text-center relative z-10 px-6">
        <Link
          href={`/${locale}/heritage`}
          className="inline-flex items-center gap-3 text-[10px] font-latin font-bold uppercase tracking-[0.3em] text-brand-primary/50 hover:text-brand-primary transition-all duration-300 mb-16 group"
        >
          {t('heroTag')}
        </Link>
        <h1 className="text-5xl md:text-8xl font-title font-bold text-brand-primary mb-8 leading-none uppercase tracking-tighter">
          {t('title')}
        </h1>
        <div className="brand-sep-bow mx-auto max-w-md opacity-40" />
      </section>

      {/* ── Experience & Hubs ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="grid-sovereign">
          
          {/* Main Experience Card (Training) */}
          <div className="col-span-12 lg:col-span-8 layer-1 p-10 md:p-14 border border-sovereign group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 border-brand-primary/5 border-t-2 border-r-2 -mr-20 -mt-20 group-hover:scale-110 transition-transform" />
             <div className="absolute inset-0 brand-horse-bg opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" />
             
             <div className="flex items-center gap-6 mb-10 relative">
                <div className="w-16 h-16 layer-2 flex items-center justify-center border border-sovereign">
                   <Target size={30} className="text-brand-primary" strokeWidth={1.2} />
                </div>
                <h2 className="text-3xl md:text-5xl font-title text-brand-primary uppercase tracking-wide">{t('masterclassTitle')}</h2>
             </div>

             <p className="text-xl text-foreground/60 font-body leading-relaxed mb-12 max-w-2xl relative">
                {t('masterclassDesc')}
             </p>

             <div className="flex flex-wrap gap-6 relative">
                <button className="btn-sovereign px-10 py-5">
                   {t('bookSession')} <ArrowRight size={18} />
                </button>
             </div>
          </div>

          {/* Tourism Tours Card (Refined) */}
          <div className="col-span-12 lg:col-span-7 layer-1 p-10 md:p-14 border border-sovereign group relative overflow-hidden order-last lg:order-none">
             <div className="absolute bottom-0 left-0 w-64 h-64 border-brand-secondary/5 border-b-2 border-l-2 -ml-20 -mb-20 group-hover:scale-110 transition-transform" />
             
             <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 layer-2 flex items-center justify-center border border-sovereign">
                   <Compass size={30} className="text-brand-secondary" strokeWidth={1.2} />
                </div>
                <h2 className="text-3xl md:text-5xl font-title text-brand-primary uppercase tracking-wide">{t('toursTitle')}</h2>
             </div>

             <div className="space-y-8 mb-12">
                <div className="flex gap-6 items-start">
                   <div className="w-10 h-10 layer-2 border border-sovereign flex items-center justify-center shrink-0">
                      <Globe size={18} className="text-brand-secondary" />
                   </div>
                   <div>
                      <h4 className="text-brand-primary font-title font-bold text-lg mb-1 uppercase tracking-widest">{t('swissHub') || 'Interlaken'}</h4>
                      <p className="text-foreground/50 text-sm font-body leading-relaxed">{t('swissTours')}</p>
                   </div>
                </div>

                <div className="flex gap-6 items-start">
                   <div className="w-10 h-10 layer-2 border border-sovereign flex items-center justify-center shrink-0">
                      <Globe size={18} className="text-brand-secondary" />
                   </div>
                   <div>
                      <h4 className="text-brand-primary font-title font-bold text-lg mb-1 uppercase tracking-widest">{t('hubCairo')}</h4>
                      <p className="text-foreground/50 text-sm font-body leading-relaxed">{t('egyptTours')}</p>
                   </div>
                </div>
             </div>

             <div className="flex flex-wrap gap-6">
                <button className="px-10 py-5 border border-sovereign layer-2 text-brand-secondary font-body font-bold uppercase tracking-[0.2em] text-xs hover:bg-brand-secondary/5 transition-all flex items-center gap-3">
                   {t('bookTour')} <ArrowRight size={18} />
                </button>
             </div>
          </div>

          {/* Secondary Stats/Info */}
          <div className="col-span-12 lg:col-span-5 space-y-8">
             <div className="layer-2 p-10 border border-sovereign group transition-all">
                <Shield size={24} className="text-brand-secondary mb-4" strokeWidth={1.5} />
                <h3 className="text-brand-primary font-title font-bold text-xl mb-4 uppercase tracking-widest">{t('safetyTitle')}</h3>
                <p className="text-sm text-foreground/50 font-body leading-relaxed">{t('safetyDesc')}</p>
             </div>
             
             <div className="layer-2 p-10 border border-sovereign bg-gradient-to-br from-brand-primary/[0.03] to-transparent relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 brand-horse-bg opacity-[0.05] -mr-8 -mt-8 rotate-12" />
                <h3 className="text-brand-primary font-title font-bold text-xl mb-6 uppercase tracking-widest">{t('expansionTitle')}</h3>
                <div className="space-y-6">
                   <div className="flex justify-between items-center text-[10px] text-brand-primary font-latin font-bold tracking-[0.3em] border-b border-brand-primary/10 pb-3 uppercase">
                      <span>{t('switzerland')}</span>
                      <span>Q3 2026</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] text-foreground/30 font-latin font-bold tracking-[0.3em] uppercase">
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
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 px-4">
          <div className="max-w-2xl">
            <h3 className="text-brand-primary font-latin font-bold tracking-[0.4em] text-[10px] uppercase mb-6 opacity-60">
               {t('ourServices')}
            </h3>
            <h2 className="text-4xl md:text-7xl font-title text-brand-primary uppercase tracking-tighter leading-none">
               Explore Ancient Passions
            </h2>
          </div>
          <div className="hidden md:block">
             <div className="w-24 h-px bg-brand-primary/20 mb-10" />
          </div>
        </div>

        <ServiceGrid />
      </section>

      {/* ── Image Showcase (The Environment) ── */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
         <div className="grid-sovereign">
            {[1, 2, 3, 4].map(i => (
               <div key={i} className="col-span-6 md:col-span-3 relative aspect-square overflow-hidden layer-2 border border-sovereign cinema-lut hover:border-brand-primary/30 transition-all p-1">
                  <NextImage 
                     src={`/images/brand/brand-bow${i === 2 ? '2' : ''}.png`} 
                     alt={`Arena Detail ${i}`}
                     fill
                     className="object-contain p-8 opacity-40 grayscale hover:grayscale-0 hover:scale-105 hover:opacity-100 transition-all duration-1000"
                  />
               </div>
            ))}
         </div>
      </section>
      
      {/* ── Booking Section (The Portal) ── */}
      <section id="booking" className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 brand-horse-bg opacity-[0.01] grayscale" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-24 px-4">
            <h2 className="text-4xl md:text-8xl font-title text-brand-primary mb-8 leading-none uppercase tracking-tighter">
              Secure Your Place in History
            </h2>
            <div className="w-24 h-px bg-brand-primary/20 mx-auto" />
          </div>
          
          <Suspense fallback={<div className="text-white text-center py-20">Loading Booking Portal...</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </section>
      
    </main>
  );
}
