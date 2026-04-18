import { getTranslations, setRequestLocale } from 'next-intl/server';
import Icon from '@/components/core/Icon';
import NextImage from 'next/image';

export default async function CollectionPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Gearup');

  const products = [
    { name: t('product1Name'), type: t('product1Type'), authenticity: 'Premium' },
    { name: t('product2Name'), type: t('product2Type'), authenticity: 'Elite' },
    { name: t('product3Name'), type: t('product3Type'), authenticity: 'Handmade' }
  ];

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
      <section className="py-32 px-6 md:px-12 text-center relative z-10 overflow-hidden">
        <div className="strands-bg-pattern" />
        <span className="text-[11px] font-brand font-bold uppercase tracking-[0.6em] text-gold/60 mb-8 block opacity-50">
          {t('heroTag')}
        </span>
        <h1 className="text-6xl md:text-9xl font-brand font-bold text-gold mb-12 tracking-tighter leading-none uppercase">
          {t('title')}
        </h1>
        <div className="arrow-divider max-w-xs mx-auto opacity-30" />
        <p className="text-2xl text-ghost font-brand font-light mt-12 max-w-3xl mx-auto leading-relaxed opacity-70">
          {t('subtitle')}
        </p>
      </section>

      {/* ── Artifacts Gallery ── */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto z-10 relative overflow-hidden">
        <div className="strands-bg-pattern" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          
          {products.map((item, i) => (
            <div key={i} className="layer-1 p-12 border border-quiet group hover:border-gold/40 transition-all duration-cine flex flex-col items-center text-center depth-card relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-px bg-gold/30" />
              <div className="absolute top-0 left-0 w-px h-24 bg-gold/30" />
              
              <div className="aspect-[4/5] w-full layer-2 border border-quiet mb-12 relative flex items-center justify-center overflow-hidden p-8">
                 <div className="absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-cine" />
                 <NextImage 
                  src="/images/brand/bows/Bow_Icon_Gold.svg" 
                  alt="" 
                  width={120} 
                  height={120} 
                  className="opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-cine group-hover:scale-110" 
                 />
                 <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-cine translate-y-[-10px] group-hover:translate-y-0">
                    <Icon name="star" size={24} className="text-gold" fill="currentColor" />
                 </div>
              </div>

              <span className="text-[11px] font-brand font-bold uppercase tracking-[0.5em] text-gold/60 mb-4">{item.type}</span>
              <h3 className="text-4xl font-brand font-bold text-primary mb-6 transition-colors duration-cine group-hover:text-gold tracking-tighter uppercase">{item.name}</h3>
              
              <div className="flex items-center gap-4 text-[11px] font-brand font-bold uppercase tracking-[0.3em] text-ghost mb-12 opacity-50">
                 <Icon name="shield-check" size={18} className="text-gold" /> {t('certificate')}
              </div>

              <button className="gold-sovereign-btn w-full justify-center group-hover:translate-y-[-4px] transition-all duration-cine px-12 py-7 text-[11px] tracking-[0.4em] flex items-center gap-6">
                {t('experience')} 
                <div className="relative w-10 h-3 group-hover:translate-x-2 transition-transform duration-cine">
                  <NextImage src="/images/brand/arrow/Linear_Arrow_Dark.png" alt="" fill className="object-contain" />
                </div>
              </button>
            </div>
          ))}

        </div>
      </section>

      {/* Sovereign Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="arrow-divider" />
      </div>

      {/* ── Featured Detail Section ── */}
      <section className="py-48 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden relative">
         <div className="strands-bg-pattern opacity-5" />
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="relative aspect-video layer-2 border border-quiet overflow-hidden depth-card group">
               <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gold/10 text-7xl md:text-8xl font-brand font-bold uppercase tracking-tighter opacity-40 group-hover:scale-105 transition-transform duration-cine">{t('craftTag')}</span>
               </div>
               {/* Aesthetic Bow Asset */}
               <div className="absolute inset-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                  <NextImage src="/images/brand/brand-bow.png" alt="" fill className="object-contain" />
               </div>
            </div>
            <div className="space-y-12">
               <h2 className="text-5xl md:text-7xl font-brand font-bold text-primary leading-none tracking-tighter uppercase">{t('featuredTitle')}</h2>
               <p className="text-2xl text-ghost leading-relaxed font-brand font-light opacity-70">
                 {t('featuredDesc')}
               </p>
               <div className="flex gap-8">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-16 h-16 border border-quiet flex items-center justify-center text-gold font-brand font-bold text-xl layer-1 hover:border-gold transition-colors duration-cine cursor-default">
                      {i.toString().padStart(2, '0')}
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
      
    </main>
  );
}
