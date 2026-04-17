import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import NextImage from 'next/image';
import { Target, Hammer, TreePine, ArrowRight, MapPin } from 'lucide-react';

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');

  const services = [
    { icon: Target,   title: t('service1Title'), desc: t('service1Desc') },
    { icon: Hammer,   title: t('service2Title'), desc: t('service2Desc') },
    { icon: TreePine, title: t('service3Title'), desc: t('service3Desc') },
  ];

  return (
    <div className="flex flex-col w-full overflow-x-hidden">

      {/* 1. HERO SECTION - Asymmetrical Layout */}
      <section className="min-h-screen w-full pt-36 pb-24 px-6 md:px-12 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <NextImage 
            src="/images/brand/hero.png" 
            alt="ARKDAR" 
            fill 
            className="object-cover opacity-80 cinema-lut" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-base/60 via-surface-base/20 to-surface-base" />
        </div>

        <div className="absolute inset-0 -z-10 pointer-events-none brand-pattern-waves opacity-[0.05]" />

        <div className="grid-sovereign h-full items-center">
          <div className="col-content-primary layer-1 p-8 md:p-16 lg:p-20 relative overflow-hidden animate-fade-up border border-sovereign shadow-2xl">
            <div className="flex flex-wrap gap-2 mb-8">
              {['Precision', 'Heritage', 'Performance'].map(v => (
                <span key={v} className="layer-2 text-brand-primary px-3 py-1 text-[10px] font-latin font-bold uppercase tracking-widest border border-sovereign">
                  {v}
                </span>
              ))}
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 font-title font-bold leading-none text-brand-primary uppercase tracking-tighter">
              {t('title')}
            </h1>

            <p className="text-xl md:text-2xl font-body font-light max-w-xl leading-relaxed text-white/80">
              {t('subtitle')}
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <Link href="/arenas" className="btn-sovereign px-10 py-5 flex items-center justify-center gap-3 group">
                {t('explore')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/heritage" className="px-10 py-5 border border-sovereign layer-2 text-brand-primary font-body font-bold uppercase tracking-widest text-[11px] hover:bg-brand-primary/5 transition-all text-center">
                Our Legacy
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-6 py-32 relative">
        <div className="brand-sep-bow mb-16 opacity-30 mx-auto" />
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-title font-bold mb-6 text-brand-primary uppercase tracking-[8px]">{t('servicesTitle')}</h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-body">{t('servicesSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, desc }) => (
            <Link 
              key={title} 
              href="/arenas"
              className="layer-2 p-10 border border-sovereign hover:border-brand-primary/30 transition-all group relative overflow-hidden"
            >
              <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-8 group-hover:scale-105 transition-transform border border-sovereign">
                <Icon size={30} strokeWidth={1.2} />
              </div>
              <h3 className="text-2xl font-title font-bold mb-4 text-brand-primary uppercase tracking-widest">{title}</h3>
              <p className="text-white/60 leading-relaxed font-body">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="w-full py-32 relative overflow-hidden bg-surface-dark">
        <div className="absolute inset-0 pointer-events-none brand-pattern-waves opacity-[0.03]" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid-sovereign items-center">
            <div className="col-span-12 lg:col-span-5 mb-12 lg:mb-0">
              <h2 className="text-4xl md:text-6xl font-title font-bold mb-6 text-white uppercase tracking-[8px]">{t('productsTitle')}</h2>
              <p className="text-white/50 text-lg mb-8 max-w-md font-body">Instruments of absolute precision, crafted for the elite horse-archer.</p>
              <Link href="/gearup" className="px-8 py-4 border border-sovereign layer-2 text-white font-body font-bold uppercase tracking-[3px] text-[10px] hover:bg-white/5 transition-all inline-flex items-center gap-2">
                View All Collection <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <div className="layer-2 p-8 md:p-12 border border-sovereign bg-brand-primary/5 group relative overflow-hidden">
                <div className="absolute inset-0 brand-horse-bg opacity-[0.03]" />
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="w-full md:w-1/2 h-64 relative">
                    <NextImage 
                      src="/images/brand/brand-bow.png" 
                      alt="Guardian Bow" 
                      fill 
                      className="object-contain cinema-lut scale-110 group-hover:scale-125 transition-all duration-1000" 
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <h3 className="text-3xl text-white font-title font-bold mb-4 uppercase tracking-wide">{t('product1')}</h3>
                    <p className="text-foreground/60 mb-8 text-sm leading-relaxed font-body">The flagship of ARKDAR engineering. Carbon-reinforced limbs with traditional aesthetics.</p>
                    <Link href="/gearup" className="btn-sovereign w-full py-5 flex items-center justify-center font-body font-bold uppercase tracking-[0.2em] text-xs">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REGIONS - Spatial Clarity */}
      <section className="w-full py-32 px-6 relative bg-surface-base">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-title font-bold text-brand-primary uppercase tracking-widest">
              Global Presence
            </h2>
            <div className="brand-sep-bow mx-auto max-w-xs mt-8 opacity-20" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { flag: '🇪🇬', country: 'Egypt',       city: 'Cairo',         desc: 'Home of the Mamluk Heritage and global training facility.' },
              { flag: '🇨🇭', country: 'Switzerland', city: 'Geneva Region', desc: 'European Excellence Hub for alpine horse-archery.' },
              { flag: '🇪🇸', country: 'Spain',       city: 'Andalusia',     desc: 'Iberian Expansion Centre for diverse terrain training.' },
            ].map(r => (
              <div
                key={r.country}
                className="layer-2 p-10 flex flex-col items-start gap-4 border border-sovereign group hover:border-brand-primary/20 transition-all"
              >
                <div className="text-6xl mb-4 grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">{r.flag}</div>
                <div>
                  <h3 className="text-2xl font-title font-bold text-brand-primary uppercase tracking-widest">{r.country}</h3>
                  <p className="text-[10px] flex items-center gap-2 mt-2 text-white/40 font-latin font-bold tracking-[2px]">
                    <MapPin className="w-4 h-4 text-brand-primary/60" /> {r.city.toUpperCase()}
                  </p>
                </div>
                <p className="text-base leading-relaxed text-white/60 mt-6 font-body">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
