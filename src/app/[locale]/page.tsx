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
          <div className="col-content-primary glass p-8 md:p-16 rounded-sovereign relative overflow-hidden animate-fade-up">
            <div className="flex flex-wrap gap-2 mb-8">
              {['Precision', 'Heritage', 'Performance'].map(v => (
                <span key={v} className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-[4px] text-[10px] font-bold uppercase tracking-widest border border-brand-primary/20">
                  {v}
                </span>
              ))}
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 font-bold leading-none text-brand-primary">
              {t('title')}
            </h1>

            <p className="text-xl md:text-2xl font-light max-w-xl leading-relaxed text-text-sovereign/80 font-sans">
              {t('subtitle')}
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <Link href="/arenas" className="btn-sovereign group">
                {t('explore')} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/heritage" className="btn-outline-sovereign">
                Our Legacy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES - The Sovereign Grid */}
      <section className="w-full max-w-7xl mx-auto px-6 py-32 relative">
        <div className="brand-sep-bow mb-16 opacity-30 mx-auto" />
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-brand-primary">{t('servicesTitle')}</h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">{t('servicesSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc }) => (
            <Link 
              key={title} 
              href="/arenas"
              className="glass p-10 hover-lift group relative overflow-hidden"
            >
              <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-sovereign flex items-center justify-center mb-8 group-hover:scale-105 transition-transform border border-brand-primary/10">
                <Icon size={30} strokeWidth={1.2} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-primary">{title}</h3>
              <p className="text-text-muted leading-relaxed font-sans">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. PRODUCTS - Asymmetrical Balance */}
      <section className="w-full py-32 relative overflow-hidden bg-[#0D0D0D]">
        <div className="absolute inset-0 pointer-events-none brand-pattern-waves opacity-[0.03]" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid-sovereign items-center">
            <div className="col-span-12 lg:col-span-5 mb-12 lg:mb-0">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">{t('productsTitle')}</h2>
              <p className="text-text-muted text-lg mb-8 max-w-md">Instruments of absolute precision, crafted for the elite horse-archer.</p>
              <Link href="/gearup" className="btn-outline-sovereign border-white/20 text-white hover:bg-white/5">
                View All Collection <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <div className="glass p-8 md:p-12 rounded-sovereign bg-brand-primary/5 border-brand-primary/20 group relative overflow-hidden">
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
                    <h3 className="text-3xl text-white font-bold mb-4">{t('product1')}</h3>
                    <p className="text-text-muted mb-8 text-sm leading-relaxed">The flagship of ARKDAR engineering. Carbon-reinforced limbs with traditional aesthetics.</p>
                    <Link href="/gearup" className="btn-sovereign w-full">
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
            <h2 className="text-4xl md:text-6xl font-bold text-brand-primary">
              Global Presence
            </h2>
            <div className="brand-sep-bow mx-auto max-w-xs mt-8 opacity-20" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { flag: '🇪🇬', country: 'Egypt',       city: 'Cairo',         desc: 'Home of the Mamluk Heritage and global training facility.' },
              { flag: '🇨🇭', country: 'Switzerland', city: 'Geneva Region', desc: 'European Excellence Hub for alpine horse-archery.' },
              { flag: '🇪🇸', country: 'Spain',       city: 'Andalusia',     desc: 'Iberian Expansion Centre for diverse terrain training.' },
            ].map(r => (
              <div
                key={r.country}
                className="glass p-12 hover-lift flex flex-col items-start gap-4 border-white/5"
              >
                <div className="text-6xl mb-4 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all">{r.flag}</div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-primary">{r.country}</h3>
                  <p className="text-sm flex items-center gap-2 mt-2 text-text-muted font-numbers">
                    <MapPin className="w-4 h-4 text-brand-primary/60" /> {r.city}
                  </p>
                </div>
                <p className="text-base leading-relaxed text-text-muted/80 mt-6 font-sans">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
