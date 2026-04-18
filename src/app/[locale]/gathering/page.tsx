import { getTranslations, setRequestLocale } from 'next-intl/server';
import Icon from '@/components/core/Icon';

export default async function PulsePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Gathering');

  const events = [
    { title: t('event1Title'), date: t('event1Date'), loc: t('event1Loc'), type: t('event1Type') },
    { title: t('event2Title'), date: t('event2Date'), loc: t('event2Loc'), type: t('event2Type') }
  ];

  return (
    <main className="flex flex-col w-full min-h-screen pt-sovereign-nav layer-0 relative overflow-x-hidden selection:bg-gold selection:text-black font-brand">
      
      {/* Sovereign Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-screen bg-gradient-to-b from-gold/[0.03] to-transparent" />
      </div>

      {/* ── Header ── */}
      <section className="py-20 md:py-32 px-6 md:px-12 text-center relative z-10">
        <span className="text-[11px] font-brand font-bold uppercase tracking-[0.6em] text-gold/60 mb-8 block">
          {t('heroTag')}
        </span>
        <h1 className="text-4xl md:text-9xl font-brand font-bold text-gold mb-12 tracking-tighter leading-none uppercase">
          {t('title')}
        </h1>
        <div className="w-40 h-px bg-gold/20 mx-auto" />
        <p className="text-2xl text-ghost font-brand font-light mt-12 max-w-3xl mx-auto leading-relaxed opacity-70">
          {t('subtitle')}
        </p>
      </section>

      {/* ── Events Grid ── */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {events.map((event, i) => (
            <div key={i} className="layer-1 p-14 border border-quiet hover:border-gold/40 transition-all duration-cine group flex flex-col depth-card relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-px bg-gold/30" />
               <div className="absolute top-0 right-0 w-px h-24 bg-gold/30" />
               
               <div className="flex justify-between items-start mb-12">
                  <div className="flex items-center gap-6 text-gold/80">
                     <Icon name="calendar" size={24} color="currentColor" />
                     <span className="text-[11px] font-brand font-bold tracking-[0.4em] uppercase">{event.date}</span>
                  </div>
                  <button 
                    className="p-5 border border-quiet layer-2 opacity-0 group-hover:opacity-100 transition-all duration-cine hover:border-gold"
                    aria-label="Share event"
                  >
                     <Icon name="share" size={18} color="white" />
                  </button>
               </div>

               <span className="text-[11px] font-brand font-bold uppercase tracking-[0.5em] text-gold/60 mb-4">{event.type}</span>
               <h2 className="text-4xl md:text-5xl font-brand font-bold text-white mb-10 leading-none group-hover:text-gold transition-colors duration-cine tracking-tighter uppercase">{event.title}</h2>
               
               <div className="flex items-center gap-10 mt-auto pt-10 border-t border-quiet">
                  <div className="flex items-center gap-4 text-[11px] font-brand font-bold uppercase tracking-[0.3em] text-ghost opacity-60">
                     <Icon name="location" size={20} color="var(--color-gold)" /> {event.loc}
                  </div>
                  <div className="flex items-center gap-4 text-[11px] font-brand font-bold uppercase tracking-[0.3em] text-ghost opacity-60">
                     <Icon name="users" size={20} color="currentColor" /> {t('restricted')}
                  </div>
                  <Icon name="arrow" size={32} color="currentColor" className="ms-auto text-gold opacity-0 group-hover:opacity-100 transition-all duration-cine translate-x-[-12px] group-hover:translate-x-0" />
               </div>

            </div>
          ))}

          {/* Subscription Card */}
          <div className="lg:col-span-2 layer-2 p-20 border border-gold/10 flex flex-col md:flex-row items-center justify-between gap-12 bg-gradient-to-r from-gold/[0.04] to-transparent overflow-hidden relative depth-card">
             <div className="z-10 text-center md:text-right">
                <h3 className="text-4xl md:text-5xl font-brand font-bold text-white mb-6 tracking-tighter uppercase">{t('innerCircle')}</h3>
                <p className="text-ghost text-xl max-w-2xl leading-relaxed font-brand font-light opacity-70">{t('innerCircleDesc')}</p>
             </div>
             <button className="btn-sovereign z-10 px-16 py-7 text-[11px] tracking-[0.4em] group-hover:translate-x-[-8px] transition-transform duration-cine">
               {t('subscribe')}
             </button>
          </div>

        </div>
      </section>
      
    </main>
  );
}
