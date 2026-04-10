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
    <div className="flex flex-col items-center w-full overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="min-h-screen w-full pt-36 pb-24 px-4 md:px-8 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <NextImage src="/images/brand/hero.png" alt="ARKDAR" fill className="object-cover opacity-85" priority />
          <div className="absolute inset-0 gradient-hero-overlay" />
        </div>

        <div className="absolute inset-0 -z-10 pointer-events-none brand-pattern-waves opacity-[0.08]" />

        <div className="glass p-10 md:p-20 rounded-3xl text-center max-w-4xl relative overflow-hidden group animate-fade-up">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['Precision', 'Heritage', 'Performance'].map(v => (
              <span key={v} className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {v}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 font-bold leading-tight text-brand-primary">
            {t('title')}
          </h1>

          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed text-text-primary/70">
            {t('subtitle')}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/arenas" className="btn-primary w-full sm:w-auto justify-center group shadow-[0_0_20px_rgba(160,6,28,0.2)]">
              {t('explore')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/heritage" className="btn-ghost glass w-full sm:w-auto justify-center hover:bg-white transition-all">
              Our Legacy
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SERVICES (THE ARENA PREVIEW) */}
      <section className="w-full max-w-7xl mx-auto px-6 py-28 relative">
        <div className="brand-sep-bow mb-12 opacity-40 mx-auto" />
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('servicesTitle')}</h2>
          <p className="text-lg text-text-muted">{t('servicesSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, desc }) => (
            <Link 
              key={title} 
              href="/arenas"
              className="glass p-8 rounded-2xl group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-white/40"
            >
              <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold font-serif mb-3">{title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. PRODUCTS (THE COLLECTION PREVIEW) */}
      <section className="w-full py-28 relative overflow-hidden bg-surface-dark">
        <div className="absolute inset-0 pointer-events-none brand-pattern-waves opacity-[0.03]" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">{t('productsTitle')}</h2>
            <Link href="/gearup" className="text-brand-secondary font-bold hover:underline transition-all">
              View All Collection &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="glass-dark p-10 rounded-3xl text-center group relative overflow-hidden border border-white/5">
              <div className="absolute inset-0 brand-horse-bg opacity-[0.02]" />
              <h3 className="text-3xl font-serif text-white font-bold mb-4">{t('product1')}</h3>
              <div className="w-full h-48 relative mb-8">
                  <NextImage src="/images/brand/brand-bow.png" alt="Guardian Bow" fill className="object-contain p-4 opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              </div>
              <Link href="/gearup" className="btn-primary w-full justify-center">
                Shop Now
              </Link>
            </div>
            
            <div className="flex flex-col justify-center gap-6">
              {[t('product2'), t('product3')].map((p, i) => (
                <div key={p} className="glass-dark p-6 rounded-xl flex justify-between items-center text-white border border-white/5 hover:border-brand-primary/20 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center">
                       <NextImage src="/images/brand/logo.png" alt="Product" width={24} height={24} className="opacity-20" />
                    </div>
                    <span className="font-serif text-lg">{p}</span>
                  </div>
                  <ArrowRight size={20} className="text-brand-primary group-hover:translate-x-2 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. REGIONS SECTION */}
      <section className="w-full py-28 px-6 bg-surface-light relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-text-primary">
              Global Presence
            </h2>
            <div className="brand-sep-bow mx-auto max-w-xs mt-6 opacity-30" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { flag: '🇪🇬', country: 'Egypt',       city: 'Cairo',         desc: 'Home of the Mamluk Heritage and global training facility.' },
              { flag: '🇨🇭', country: 'Switzerland', city: 'Geneva Region', desc: 'European Excellence Hub for alpine horse-archery.' },
              { flag: '🇪🇸', country: 'Spain',       city: 'Andalusia',     desc: 'Iberian Expansion Centre for diverse terrain training.' },
            ].map(r => (
              <div
                key={r.country}
                className="glass p-10 rounded-3xl flex flex-col items-start gap-4 hover:-translate-y-2 transition-all duration-300 border border-white/40 shadow-sm hover:shadow-xl"
              >
                <div className="text-5xl mb-2">{r.flag}</div>
                <div>
                  <h3 className="text-2xl font-bold font-serif text-text-primary">{r.country}</h3>
                  <p className="text-sm flex items-center gap-1.5 mt-1 text-text-muted">
                    <MapPin className="w-4 h-4 text-brand-primary" /> {r.city}
                  </p>
                </div>
                <p className="text-base leading-relaxed text-text-muted mt-4">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
