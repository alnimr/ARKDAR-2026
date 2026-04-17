import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import NextImage from 'next/image';
import { Target, Hammer, TreePine, MapPin, ShieldCheck, Crown, Sword } from 'lucide-react';

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
    <div className="flex flex-col w-full overflow-x-hidden layer-0 selection:bg-gold selection:text-black font-brand">

      {/* 1. HERO SECTION - Sovereign Presence */}
      <section className="min-h-screen w-full pt-36 pb-24 px-6 md:px-12 flex flex-col justify-center relative overflow-hidden">
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

        {/* ── Decorative Crescent Watermark ── 60-80% Opacity per Constitution */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-70 pointer-events-none">
          <NextImage 
            src="/images/brand/crescent/Crescent_Vector.svg" 
            alt="" 
            fill 
            className="object-contain" 
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-4xl layer-1 p-10 md:p-20 relative overflow-hidden animate-fade-up border border-quiet depth-card">
            <h1 className="text-5xl md:text-8xl mb-10 font-brand font-bold leading-[0.9] foil-hero uppercase tracking-tighter">
              {t('title')}
            </h1>

            <p className="text-xl md:text-2xl font-brand font-light max-w-2xl leading-relaxed text-ghost opacity-70">
              {t('subtitle')}
            </p>

            <div className="mt-20 flex flex-col sm:flex-row gap-8">
              <Link href="/arenas" className="gold-sovereign-btn px-12 py-5 text-[11px] tracking-[0.3em] flex items-center justify-center">
                {t('explore')} 
                <div className="ms-4 relative w-10 h-3 group-hover:translate-x-2 transition-transform duration-cine">
                  <NextImage src="/images/brand/arrow/Linear_Arrow_Dark.png" alt="" fill className="object-contain" />
                </div>
              </Link>
              <Link href="/heritage" className="ivory-ghost-btn px-12 py-5 text-[11px] tracking-[0.3em] flex items-center justify-center">
                ARKDAR DNA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sovereign Divider */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="arrow-divider" />
      </div>

      {/* 2. PHILOSOPHY & CREED - The Mamluk Litmus Test */}
      <section className="w-full py-48 relative layer-0 border-y border-quiet overflow-hidden">
        <div className="strands-bg-pattern" />
        {/* Five Strands Watermark */}
        <div className="absolute top-0 right-0 w-64 h-full pointer-events-none opacity-[0.02] select-none">
          <NextImage src="/images/brand/strands/Value_Strands.svg" alt="" fill className="object-contain object-right" />
        </div>

        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-12 gap-16 items-center">
            <div className="col-span-12 lg:col-span-7">
              <h2 className="text-[10px] font-brand font-bold tracking-[0.5em] text-gold mb-8 uppercase opacity-50">The Sovereign Creed</h2>
              <h3 className="text-4xl md:text-7xl font-brand font-bold text-white mb-12 leading-[0.9] uppercase tracking-tighter">
                &quot;Heritage first. <br /><span className="text-gold">Performance serves it.&quot;</span>
              </h3>
              <div className="space-y-10 text-xl text-ghost font-brand font-light leading-relaxed max-w-2xl opacity-80">
                <p>أركدار ليست مجرد منصة، بل هي وعاء يحفظ عظمة الماضي بدقة المستقبل. نحن لا نعيد تمثيل التاريخ، بل نعيد صياغته بأسلوب يحترم سيادة الفارس العربي.</p>
                <p>كل سطر برمجي، وكل خوارزمية، وكل سهم نطلقه، يخضع لاختبار واحد: <span className="text-gold italic">&quot;هل كان الفارس المملوكي سيشعر بالفخر بهذا القرار البصري؟&quot;</span></p>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <div className="grid grid-cols-2 gap-8">
                {[
                  { icon: ShieldCheck, label: 'Sovereignty', desc: 'Absolute earned identity' },
                  { icon: Sword,       label: 'Mastery',     desc: 'Precision in every strike' },
                  { icon: Crown,       label: 'Elite',       desc: 'The Hybrid Elite standard' },
                  { icon: Target,      label: 'Purpose',     desc: 'Preserving the art' }
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="layer-1 p-10 border border-quiet depth-card text-center group hover:border-gold/30 transition-all duration-cine">
                    <Icon className="w-12 h-12 text-gold mx-auto mb-8 group-hover:scale-110 transition-transform duration-cine" strokeWidth={1} />
                    <h4 className="text-[10px] font-brand font-bold tracking-[0.3em] text-gold uppercase mb-4">{label}</h4>
                    <p className="text-[11px] text-ghost font-brand opacity-40 uppercase tracking-widest leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sovereign Divider */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="arrow-divider" />
      </div>

      {/* 3. SERVICES - The Fields of Honor */}
      <section className="w-full py-48 relative layer-0 overflow-hidden">
        <div className="strands-bg-pattern" />
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-8xl font-brand font-bold mb-10 text-gold uppercase tracking-tighter">{t('servicesTitle')}</h2>
            <p className="text-2xl text-ghost max-w-3xl mx-auto font-brand font-light leading-relaxed opacity-60">{t('servicesSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map(({ icon: Icon, title, desc }) => (
              <Link 
                key={title} 
                href="/arenas"
                className="layer-1 p-12 border border-quiet hover:border-gold/30 transition-all duration-cine group relative overflow-hidden depth-card"
              >
                <div className="w-24 h-24 layer-2 text-gold flex items-center justify-center mb-12 group-hover:bg-gold group-hover:text-black transition-all duration-cine border border-quiet">
                  <Icon size={40} strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-brand font-bold mb-8 text-gold uppercase tracking-tight">{title}</h3>
                <p className="text-ghost leading-relaxed font-brand font-light text-lg opacity-70">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sovereign Divider */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="arrow-divider" />
      </div>

      {/* 4. PRODUCTS - Royal Arsenal */}
      <section className="w-full py-48 relative layer-1 border-t border-quiet overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative">
          <div className="grid grid-cols-12 gap-16 items-center">
            <div className="col-span-12 lg:col-span-5">
              <h2 className="text-5xl md:text-8xl font-brand font-bold mb-10 text-white uppercase tracking-tighter leading-[0.85]">{t('productsTitle')}</h2>
              <p className="text-ghost text-xl mb-16 max-w-md font-brand font-light leading-relaxed opacity-70">العتاد السيادي: أدوات مصممة بنخبوية هجينة تجمع بين عراقة الصناعة اليدوية وتكنولوجيا القرن الحادي والعشرين.</p>
              <Link href="/gearup" className="btn-outline px-12 py-5 text-[11px] tracking-[0.3em] flex items-center">
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
                    <NextImage 
                      src="/images/brand/crescent/Crescent_Gold.png" 
                      alt="Guardian Bow" 
                      fill 
                      className="object-contain cinema-lut scale-110 group-hover:scale-125 transition-all duration-cine" 
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <h3 className="text-4xl text-gold font-brand font-bold mb-8 uppercase tracking-tight">{t('product1')}</h3>
                    <p className="text-ghost mb-12 text-lg leading-relaxed font-brand font-light opacity-70">درة تاج المهندسين في أركدار. قوس معزز بالكربون بتصميم تراثي لا يُضاهى.</p>
                    <Link href="/gearup" className="btn-sovereign w-full py-5 text-[11px] tracking-[0.3em]">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sovereign Divider */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="arrow-divider" />
      </div>

      {/* 5. REGIONS - Global Sovereignty */}
      <section className="w-full py-48 px-8 relative layer-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-40">
            <h2 className="text-5xl md:text-8xl font-brand font-bold text-gold uppercase tracking-tighter">
              Global Presence
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { flag: '🇪🇬', country: 'Egypt',       city: 'Cairo',         desc: 'أصل الميراث المملوكي ومركز التدريب العالمي.' },
              { flag: '🇨🇭', country: 'Switzerland', city: 'Interlaken',    desc: 'مركز التميز الأوروبي للرماية في الميادين الألبية.' },
              { flag: '🇪🇸', country: 'Spain',       city: 'Andalusia',     desc: 'مركز التوسع الأندلسي للتدريب في الميادين المتنوعة.' },
            ].map(r => (
              <div
                key={r.country}
                className="layer-1 p-16 flex flex-col items-start gap-10 border border-quiet group hover:border-gold/30 transition-all duration-cine depth-card"
              >
                <div className="text-8xl mb-8 grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-cine">{r.flag}</div>
                <div>
                  <h3 className="text-3xl font-brand font-bold text-gold uppercase tracking-tight">{r.country}</h3>
                  <p className="text-[10px] flex items-center gap-4 mt-4 text-ghost font-brand font-bold tracking-[0.4em] opacity-50">
                    <MapPin className="w-5 h-5 text-gold" /> {r.city.toUpperCase()}
                  </p>
                </div>
                <p className="text-lg leading-relaxed text-ghost mt-10 font-brand font-light opacity-70">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
