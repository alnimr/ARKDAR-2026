import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Icon from '@/components/core/Icon';
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
  const t = await getTranslations('Arenas');

  return (
    <main className="flex flex-col w-full min-h-screen pt-sovereign-nav layer-0 relative overflow-x-hidden selection:bg-gold selection:text-black font-brand">
      
      {/* Sovereign Atmosphere - Crescent Watermark */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-screen opacity-[0.15] pointer-events-none -z-10">
        <NextImage 
          src="/images/brand/crescent/Crescent_Vector.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* ── Header ── */}
      <section className="py-20 md:py-32 px-6 md:px-12 text-center relative z-10 overflow-hidden">
        <div className="strands-bg-pattern" />
        <Link
          href={`/${locale}/heritage`}
          className="inline-flex items-center gap-6 text-[11px] font-brand font-bold uppercase tracking-[0.5em] text-gold/40 hover:text-gold transition-all duration-cine mb-12 md:mb-20 group opacity-50"
        >
          {t('heroTag')}
        </Link>
        <h1 className="text-4xl md:text-9xl font-brand font-bold text-gold mb-12 leading-none uppercase tracking-tighter">
          {t('title')}
        </h1>
        <div className="arrow-divider max-w-xs mx-auto opacity-30" />
      </section>

      {/* ── Experience & Hubs ── */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto z-10 relative overflow-hidden">
        <div className="strands-bg-pattern" />
        <div className="grid grid-cols-12 gap-12">
          
          {/* Main Experience Card (Training) */}
          <div className="col-span-12 lg:col-span-8 layer-1 p-12 md:p-20 border border-quiet group relative overflow-hidden depth-card transition-all duration-cine hover:border-gold/30">
             <div className="absolute top-0 right-0 w-96 h-96 border-gold/5 border-t-2 border-r-2 -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-cine" />
             
             <div className="flex items-center gap-10 mb-16 relative">
                <div className="w-24 h-24 layer-2 flex items-center justify-center border border-quiet group-hover:bg-gold group-hover:text-black transition-all duration-cine">
                   <Icon name="target" size={40} color="currentColor" />
                </div>
                <h2 className="text-5xl md:text-7xl font-brand font-bold text-primary uppercase tracking-tighter leading-none">{t('masterclassTitle')}</h2>
             </div>

             <p className="text-2xl text-ghost font-brand font-light leading-relaxed mb-20 max-w-3xl relative opacity-70">
                {t('masterclassDesc')}
             </p>

             <div className="flex flex-wrap gap-10 relative">
                <button className="gold-sovereign-btn px-16 py-7 text-[11px] tracking-[0.4em] flex items-center gap-6">
                   {t('bookSession')} 
                   <div className="relative w-10 h-3 group-hover:translate-x-2 transition-transform duration-cine">
                    <NextImage src="/images/brand/arrow/Linear_Arrow_Dark.png" alt="" fill className="object-contain" />
                   </div>
                </button>
             </div>
          </div>

          {/* Tourism Tours Card */}
          <div className="col-span-12 lg:col-span-7 layer-1 p-12 md:p-20 border border-quiet group relative overflow-hidden order-last lg:order-none depth-card transition-all duration-cine hover:border-gold/30">
             <div className="absolute bottom-0 left-0 w-96 h-96 border-gold/5 border-b-2 border-l-2 -ml-24 -mb-24 group-hover:scale-110 transition-transform duration-cine" />
             
             <div className="flex items-center gap-10 mb-16">
                <div className="w-24 h-24 layer-2 flex items-center justify-center border border-quiet group-hover:bg-gold group-hover:text-black transition-all duration-cine">
                   <Icon name="compass" size={40} color="currentColor" />
                </div>
                <h2 className="text-5xl md:text-7xl font-brand font-bold text-primary uppercase tracking-tighter leading-none">{t('toursTitle')}</h2>
             </div>

             <div className="space-y-12 mb-20">
                <div className="flex gap-10 items-start group/hub">
                   <div className="w-14 h-14 layer-2 border border-quiet flex items-center justify-center shrink-0 group-hover/hub:border-gold transition-colors duration-cine">
                      <Icon name="globe" size={24} color="var(--color-gold)" />
                   </div>
                   <div>
                      <h4 className="text-gold font-brand font-bold text-2xl mb-3 uppercase tracking-tight">{t('swissHub') || 'INTERLAKEN'}</h4>
                      <p className="text-ghost text-lg font-brand font-light leading-relaxed max-w-md opacity-60">{t('swissTours')}</p>
                   </div>
                </div>

                <div className="flex gap-10 items-start group/hub">
                   <div className="w-14 h-14 layer-2 border border-quiet flex items-center justify-center shrink-0 group-hover/hub:border-gold transition-colors duration-cine">
                      <Icon name="globe" size={24} color="var(--color-gold)" />
                   </div>
                   <div>
                      <h4 className="text-gold font-brand font-bold text-2xl mb-3 uppercase tracking-tight">{t('hubCairo')}</h4>
                      <p className="text-ghost text-lg font-brand font-light leading-relaxed max-w-md opacity-60">{t('egyptTours')}</p>
                   </div>
                </div>
             </div>

             <div className="flex flex-wrap gap-10">
                <button className="ivory-ghost-btn px-14 py-7 text-[11px] flex items-center gap-6">
                   {t('bookTour')} 
                   <div className="relative w-10 h-3 group-hover:translate-x-2 transition-transform duration-cine">
                    <NextImage src="/images/brand/arrow/Linear_Arrow_Gold.png" alt="" fill className="object-contain" />
                   </div>
                </button>
             </div>
          </div>

          {/* Secondary Stats/Info */}
          <div className="col-span-12 lg:col-span-5 space-y-12">
             <div className="layer-2 p-12 border border-quiet group transition-all duration-cine hover:border-gold/30 depth-card">
                <Icon name="shield" size={40} color="var(--color-gold)" opacity="0.6" className="mb-10" />
                <h3 className="text-gold font-brand font-bold text-3xl mb-8 uppercase tracking-tight">{t('safetyTitle')}</h3>
                <p className="text-lg text-ghost font-brand font-light leading-relaxed opacity-60">{t('safetyDesc')}</p>
             </div>
             
             <div className="layer-2 p-12 border border-quiet bg-gradient-to-br from-gold/[0.03] to-transparent relative overflow-hidden depth-card group transition-all duration-cine hover:border-gold/30">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] -mr-24 -mt-24 group-hover:scale-125 transition-transform duration-cine" />
                <h3 className="text-gold font-brand font-bold text-3xl mb-12 uppercase tracking-tight">{t('expansionTitle')}</h3>
                <div className="space-y-10">
                   <div className="flex justify-between items-center text-[12px] text-gold font-brand font-bold tracking-[0.4em] border-b border-quiet pb-6 uppercase">
                      <span>{t('switzerland')}</span>
                      <span>Q3 2026</span>
                   </div>
                   <div className="flex justify-between items-center text-[12px] text-ghost font-brand font-bold tracking-[0.4em] uppercase opacity-40">
                      <span>{t('spain')}</span>
                      <span>Q1 2027</span>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* Sovereign Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="arrow-divider" />
      </div>

      {/* ── Services Showcase ── */}
      <section className="py-48 px-6 md:px-12 max-w-7xl mx-auto z-10 relative overflow-hidden">
        <div className="strands-bg-pattern" />
        <div className="flex flex-col md:flex-row justify-between items-end mb-32">
          <div className="max-w-4xl">
            <h3 className="text-gold font-brand font-bold tracking-[0.8em] text-[11px] uppercase mb-12 opacity-50">
               {t('ourServices')}
            </h3>
            <h2 className="text-5xl md:text-9xl font-brand font-bold text-primary uppercase tracking-tighter leading-[0.85]">
               {t('exploreTitle')}
            </h2>
          </div>
          <div className="hidden md:block">
             <div className="arrow-divider w-40 opacity-20" />
          </div>
        </div>

        <ServiceGrid />
      </section>

      {/* Sovereign Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="arrow-divider" />
      </div>

      {/* ── Image Showcase ── */}
      <section className="py-48 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden relative">
         <div className="strands-bg-pattern" />
         <div className="grid grid-cols-12 gap-10">
            {[1, 2, 3, 4].map(i => (
               <div key={i} className="col-span-6 md:col-span-3 relative aspect-square overflow-hidden layer-2 border border-quiet hover:border-gold/30 transition-all duration-cine p-4 depth-card group">
                  <NextImage 
                     src={`/images/brand/brand-bow${i === 2 ? '2' : ''}.png`} 
                     alt={`Arena Detail ${i}`}
                     fill
                     className="object-contain p-12 opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-cine"
                  />
               </div>
            ))}
         </div>
      </section>
      
      {/* ── Booking Section ── */}
      <section id="booking" className="py-72 px-6 md:px-12 relative overflow-hidden layer-0 border-t border-quiet">
        <div className="strands-bg-pattern opacity-[0.03]" />
        <div className="arrow-divider absolute top-0 left-0 w-full opacity-10" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-48">
            <h2 className="text-5xl md:text-9xl font-brand font-bold text-gold mb-16 leading-none uppercase tracking-tighter">
              {t('bookingTitle')}
            </h2>
            <div className="arrow-divider max-w-xs mx-auto opacity-20" />
          </div>
          
          <Suspense fallback={<div className="text-gold text-center py-32 font-brand font-bold uppercase tracking-[0.6em] text-[11px] opacity-50">{t('uplinkStatus')}</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </section>
      
    </main>
  );
}
