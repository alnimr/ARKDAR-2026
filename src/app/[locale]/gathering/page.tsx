import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Calendar, Users, MapPin, ArrowRight, Share2 } from 'lucide-react';

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

      {/* ── Events Grid ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {events.map((event, i) => (
            <div key={i} className="glass-dark p-12 rounded-[40px] border border-white/5 hover:border-brand-primary/20 transition-all duration-700 group flex flex-col">
              
              <div className="flex justify-between items-start mb-10">
                 <div className="flex items-center gap-3 text-brand-secondary">
                    <Calendar size={20} />
                    <span className="text-sm font-bold tracking-widest">{event.date}</span>
                 </div>
                 <button 
                  className="p-3 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Share event"
                 >
                    <Share2 size={16} className="text-white" />
                 </button>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[4px] text-brand-primary mb-3">{event.type}</span>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 leading-tight group-hover:text-brand-primary transition-colors">{event.title}</h2>
              
              <div className="flex items-center gap-6 mt-auto">
                 <div className="flex items-center gap-2 text-xs text-white/40">
                    <MapPin size={16} className="text-brand-primary" /> {event.loc}
                 </div>
                 <div className="flex items-center gap-2 text-xs text-white/40">
                    <Users size={16} /> {t('restricted')}
                 </div>
                 <ArrowRight size={24} className="ms-auto text-brand-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
              </div>

            </div>
          ))}

          {/* Subscription Card */}
          <div className="lg:col-span-2 glass-dark p-16 rounded-[40px] border border-brand-primary/10 flex flex-col md:row items-center justify-between gap-10 bg-gradient-to-r from-brand-primary/5 to-transparent overflow-hidden relative">
             <div className="absolute inset-0 brand-pattern-waves opacity-[0.03] pointer-events-none" />
             <div className="z-10 text-center md:text-start">
                <h3 className="text-3xl font-serif text-white mb-2">{t('innerCircle')}</h3>
                <p className="text-footer-muted">{t('innerCircleDesc')}</p>
             </div>
             <button className="btn-primary z-10 transition-all hover:shadow-[0_0_40px_rgba(160,6,28,0.4)]">
               {t('subscribe')}
             </button>
          </div>

        </div>
      </section>
      
    </main>
  );
}
