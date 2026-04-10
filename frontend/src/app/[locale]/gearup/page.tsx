import { getTranslations, setRequestLocale } from 'next-intl/server';
import { History, ArrowRight, ShieldCheck, Star } from 'lucide-react';

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
    <main className="flex flex-col w-full min-h-screen pt-24 bg-surface-dark relative overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 brand-pattern-waves opacity-10 pointer-events-none" />

      {/* ── Header ── */}
      <section className="py-20 px-6 text-center relative z-10">
        <span className="text-xs font-bold uppercase tracking-[8px] text-brand-secondary mb-4 block">
          {t('heroTag')}
        </span>
        <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 font-serif leading-tight">
          {t('title')}
        </h1>
        <div className="brand-sep-bow mx-auto max-w-sm opacity-60" />
        <p className="text-xl text-footer-muted font-light mt-8 max-w-xl mx-auto">
          {t('subtitle')}
        </p>
      </section>

      {/* ── Artifacts Gallery ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {products.map((item, i) => (
            <div key={i} className="glass-dark p-10 rounded-[40px] border border-white/5 group hover:border-brand-primary/20 transition-all duration-700 flex flex-col items-center text-center">
              
              <div className="aspect-[4/5] w-full rounded-[30px] bg-white/5 border border-white/5 mb-10 relative flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 brand-pattern-waves opacity-[0.03] group-hover:opacity-[0.08] transition-opacity" />
                 <History size={56} className="text-white/10 group-hover:text-brand-primary/40 transition-all duration-500 group-hover:scale-110" />
                 <div className="absolute top-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <Star size={20} className="text-brand-secondary" fill="currentColor" />
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[4px] text-brand-primary mb-2">{item.type}</span>
              <h3 className="text-2xl font-serif text-white mb-4 transition-colors group-hover:text-brand-primary">{item.name}</h3>
              
              <div className="flex items-center gap-2 text-xs text-white/30 mb-8">
                 <ShieldCheck size={14} className="text-brand-secondary" /> {t('certificate')}
              </div>

              <button className="btn-primary w-full justify-center group-hover:shadow-[0_0_30px_rgba(160,6,28,0.3)] transition-all">
                {t('experience')} <ArrowRight size={18} />
              </button>
            </div>
          ))}

        </div>
      </section>

      {/* ── Featured Detail Section ── */}
      <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-video rounded-3xl overflow-hidden glass-dark border border-white/10">
               <div className="absolute inset-0 brand-pattern-waves opacity-20" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-brand-primary/20 text-6xl font-serif">Mamluk Craft</span>
               </div>
            </div>
            <div className="space-y-6">
               <h2 className="text-4xl font-serif text-white">Engineering Ancestral Power</h2>
               <p className="text-lg text-footer-muted leading-relaxed">
                 Every bow in our collection is a result of years of research into historical composite construction, optimized for the modern archer without losing its soul.
               </p>
               <div className="flex gap-4">
                  {[1, 2, 3].map(i => <div key={i} className="w-12 h-12 rounded-full border border-brand-primary/20 flex items-center justify-center text-brand-primary font-bold">{i}</div>)}
               </div>
            </div>
         </div>
      </section>
      
    </main>
  );
}
