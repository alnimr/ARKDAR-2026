import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import NextImage from 'next/image';
import Icon, { IconName } from '@/components/core/Icon';
import { MamlukStar, SovereignDivider } from '@/components/core/MamlukOrnaments';

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');

  const services: { icon: IconName; title: string; desc: string }[] = [
    { icon: 'target',   title: t('service1Title'), desc: t('service1Desc') },
    { icon: 'hammer',   title: t('service2Title'), desc: t('service2Desc') },
    { icon: 'tree-pine', title: t('service3Title'), desc: t('service3Desc') },
  ];

  const creedItems: { icon: IconName; label: string; desc: string }[] = [
    { icon: 'shield-check', label: t('creed1Label'), desc: t('creed1Desc') },
    { icon: 'sword',       label: t('creed2Label'), desc: t('creed2Desc') },
    { icon: 'crown',       label: t('creed3Label'), desc: t('creed3Desc') },
    { icon: 'target',      label: t('creed4Label'), desc: t('creed4Desc') }
  ];

  return (
    <div className="flex flex-col w-full overflow-x-hidden layer-0 selection:bg-gold selection:text-black font-brand">

      {/* 1. HERO SECTION - Sovereign Presence */}
      <section className="min-h-screen w-full pt-sovereign-nav pb-24 px-6 md:px-12 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <NextImage 
            src="/images/brand/hero.png" 
            alt="ARKDAR Sovereign Hero" 
            fill 
            className="object-cover opacity-60 cinema-lut" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
        </div>

        <div className="absolute -bottom-10 -right-20 w-[500px] h-[500px] -z-10 opacity-15 pointer-events-none rotate-[15deg]">
          <NextImage 
            src="/images/brand/crescent/Crescent_Vector.svg" 
            alt="" 
            fill 
            className="object-contain" 
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-4xl layer-1 p-10 md:p-20 relative overflow-hidden animate-fade-up border border-quiet depth-card">
            <h1 className={`text-5xl md:text-8xl mb-10 font-brand font-semibold leading-[0.9] foil-hero uppercase ${locale === 'ar' ? 'tracking-normal' : 'tracking-tighter'}`}>
              {t('title')}
            </h1>

            <p className="text-xl md:text-2xl font-brand font-light max-w-2xl leading-relaxed text-ghost opacity-70">
              {t('subtitle')}
            </p>

            <div className={`mt-20 flex flex-col sm:flex-row gap-8 ${locale === 'ar' ? 'tracking-normal' : 'tracking-[0.3em]'}`}>
              <Link href="/arenas" className="btn-sovereign px-12 py-5 text-[11px] flex items-center justify-center">
                {t('explore')} 
                <div className="ms-4 relative w-10 h-3 group-hover:translate-x-2 transition-transform duration-cine">
                  <NextImage src="/images/brand/arrow/Linear_Arrow_Dark.png" alt="" fill className="object-contain" />
                </div>
              </Link>
              <Link href="/heritage" className="ivory-ghost-btn px-12 py-5 text-[11px] flex items-center justify-center">
                {t('dnaTag')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sovereign Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <SovereignDivider />
      </div>

      {/* 2. PHILOSOPHY & CREED */}
      <section className="w-full py-64 relative layer-0 border-y border-quiet overflow-hidden">
        <div className="strands-bg-pattern" />
        <div className="max-w-7xl mx-auto px-sovereign">
          <div className="grid grid-cols-12 gap-16 items-center">
            <div className="col-span-12 lg:col-span-7">
              <h2 className={`text-[10px] font-brand font-semibold mb-8 uppercase opacity-50 ${locale === 'ar' ? 'tracking-normal' : 'tracking-[0.5em]'}`}>{t('creedTitle')}</h2>
              <h3 className={`text-4xl md:text-7xl font-brand font-semibold text-white mb-12 leading-[0.9] uppercase ${locale === 'ar' ? 'tracking-normal' : 'tracking-tighter'}`}>
                {t('creedHeritage')} <br /><span className="text-gold">{t('creedPerformance')}</span>
              </h3>
              <div className="space-y-10 text-xl text-ghost font-brand font-light leading-relaxed max-w-2xl opacity-80">
                <p>{t('creed1Desc')}</p>
                <p>{t('creed2Desc')}</p>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {creedItems.map(({ icon, label, desc }) => (
                  <div key={label} className="layer-1 p-10 border border-quiet depth-card text-center group hover:border-gold/30 transition-all duration-cine relative">
                    <div className="absolute top-4 right-4 opacity-20">
                      <MamlukStar type={8} size={40} degree="hidden" />
                    </div>
                    <Icon name={icon} size={48} color="currentColor" className="text-gold mx-auto mb-8 group-hover:scale-110 transition-transform duration-cine" />
                    <h4 className={`text-[10px] font-brand font-semibold text-gold uppercase mb-4 ${locale === 'ar' ? 'tracking-normal' : 'tracking-[0.3em]'}`}>{label}</h4>
                    <p className={`text-[11px] text-ghost font-brand opacity-40 uppercase leading-relaxed line-clamp-2 ${locale === 'ar' ? 'tracking-normal' : 'tracking-widest'}`}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-64 relative layer-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-sovereign">
          <div className="text-center mb-40">
            <h2 className="text-eyebrow text-gold mb-8">{t('servicesSubtitle')}</h2>
            <h3 className={`text-5xl md:text-8xl font-brand font-semibold text-primary uppercase ${locale === 'ar' ? 'tracking-normal' : 'tracking-tighter'}`}>{t('servicesTitle')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map(({ icon, title, desc }) => (
              <Link 
                key={title} 
                href="/arenas"
                className="layer-1 p-12 border border-quiet hover:border-gold/30 transition-all duration-cine group relative overflow-hidden depth-card"
              >
                <div className="w-20 h-20 layer-2 text-gold flex items-center justify-center mb-10 group-hover:bg-gold group-hover:text-black transition-all duration-cine border border-quiet">
                  <Icon name={icon} size={32} color="currentColor" />
                </div>
                <h4 className="text-2xl font-brand font-semibold mb-6 text-gold uppercase tracking-tight">{title}</h4>
                <p className="text-ghost leading-relaxed font-brand font-light text-base opacity-70 line-clamp-3">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRODUCTS */}
      <section className="w-full py-64 relative layer-1 border-t border-quiet overflow-hidden">
        <div className="max-w-7xl mx-auto px-sovereign relative">
          <div className="grid grid-cols-12 gap-16 items-center">
            <div className="col-span-12 lg:col-span-5">
              <h2 className={`text-5xl md:text-8xl font-brand font-semibold mb-10 text-white uppercase leading-[0.85] ${locale === 'ar' ? 'tracking-normal' : 'tracking-tighter'}`}>{t('productsTitle')}</h2>
              <p className="text-ghost text-xl mb-16 max-w-md font-brand font-light leading-relaxed opacity-70">{t('gearupDesc')}</p>
              <Link href="/gearup" className={`ivory-ghost-btn px-12 py-5 text-[11px] flex items-center ${locale === 'ar' ? 'tracking-normal' : 'tracking-[0.3em]'}`}>
                {t('viewAllCollection')} 
                <div className="ms-4 relative w-10 h-3">
                  <NextImage src="/images/brand/arrow/Linear_Arrow_Gold.png" alt="" fill className="object-contain" />
                </div>
              </Link>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <div className="layer-2 p-16 border border-quiet group relative overflow-hidden depth-card">
                <div className="flex flex-col md:flex-row items-center gap-20">
                  <div className="w-full md:w-1/2 h-96 relative">
                    <NextImage src="/images/brand/crescent/Crescent_Gold.png" alt="Guardian Bow" fill className="object-contain cinema-lut scale-110 group-hover:scale-125 transition-all duration-cine" />
                  </div>
                  <div className="w-full md:w-1/2">
                    <h3 className="text-4xl text-gold font-brand font-semibold mb-8 uppercase tracking-tight">{t('product1')}</h3>
                    <p className="text-ghost mb-12 text-lg leading-relaxed font-brand font-light opacity-70">{t('creed2Desc')}</p>
                    <Link href="/gearup" className={`btn-sovereign w-full py-5 text-[11px] ${locale === 'ar' ? 'tracking-normal' : 'tracking-[0.3em]'}`}>{t('gearupBtn')}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REGIONS */}
      <section className="w-full py-64 px-sovereign relative layer-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-40">
            <h2 className={`text-5xl md:text-8xl font-brand font-semibold text-gold uppercase ${locale === 'ar' ? 'tracking-normal' : 'tracking-tighter'}`}>{t('presenceTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { country: t('location1Country'), city: t('location1City'), desc: t('location1Desc') },
              { country: t('location2Country'), city: t('location2City'), desc: t('location2Desc') }
            ].map(r => (
              <div key={r.country} className="layer-1 p-16 flex flex-col items-start gap-10 border border-quiet group hover:border-gold/30 transition-all duration-cine depth-card relative">
                <div className="absolute top-6 right-6 opacity-10">
                  <MamlukStar type={12} size={60} degree="hidden" />
                </div>
                <h3 className="text-3xl font-brand font-semibold text-gold uppercase tracking-tight">{r.country}</h3>
                <p className={`text-[10px] flex items-center gap-4 mt-4 text-ghost font-brand font-semibold opacity-50 ${locale === 'ar' ? 'tracking-normal' : 'tracking-[0.4em]'}`}>
                  <Icon name="location" size={20} color="var(--color-gold)" /> {r.city.toUpperCase()}
                </p>
                <p className="text-lg leading-relaxed text-ghost mt-10 font-brand font-light opacity-70">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
