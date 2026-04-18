import { getTranslations, setRequestLocale } from 'next-intl/server';
import { mockJournalPosts } from '@/data/mockJournal';
import JournalClientGrid from '@/components/core/JournalClientGrid';
import JournalFeaturedSection from '@/components/core/JournalFeaturedSection';
import NextImage from 'next/image';
import Link from 'next/link';
import Icon, { IconName } from '@/components/core/Icon';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Heritage' });
  return {
    title: `${t('title')} | ARKDAR`,
    description: t('subtitle'),
  };
}

export default async function HeritagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Heritage');

  const journalHeading = t('pulseHeading');
  const journalSubheading = t('pulseSubheading');

  // Sort descending by date
  const posts = [...mockJournalPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const featuredPosts = posts.filter((p) => p.featured);

  return (
    <main
      className="flex flex-col w-full min-h-screen pt-sovereign-nav layer-0 relative overflow-x-hidden selection:bg-gold selection:text-black font-brand"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      
      {/* Sovereign Atmosphere - Crescent Watermark */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-screen opacity-[0.12] pointer-events-none -z-10">
        <NextImage 
          src="/images/brand/crescent/Crescent_Vector.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* ── Background Texture Layers ── */}
      <div className="absolute inset-0 opacity-[0.03] layer-0 pointer-events-none" />

      {/* ── Sticky Sub-Navigation ── */}
      <nav id="heritage-nav" className="sticky top-[120px] z-50 w-full layer-2 border-y border-quiet depth-card transition-all duration-cine">
        <div className="max-w-7xl mx-auto px-10 h-16 flex items-center justify-center gap-16 md:gap-24 overflow-x-auto no-scrollbar">
          {[
            { id: 'vision', label: t('navVision') },
            { id: 'lineage', label: t('navHistory') },
            { id: 'journal', label: t('navJournal') }
          ].map(item => (
            <a 
              key={item.id} 
              href={`#${item.id}`}
              className="text-[11px] font-brand font-bold uppercase tracking-[0.5em] text-ghost/60 hover:text-gold transition-all duration-cine whitespace-nowrap hover:tracking-[0.6em]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Dynamic Featured Hero Section ── */}
      {featuredPost && (
        <section className="relative h-[90vh] flex flex-col justify-end pb-40 px-6 md:px-12 overflow-hidden group layer-0">
          <div className="strands-bg-pattern opacity-10" />
          <div className="absolute inset-0 cinema-lut">
            <NextImage
              src={featuredPost.image}
              alt={featuredPost.title[locale as keyof typeof featuredPost.title]}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-[30s] ease-out opacity-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
          </div>
          
          <div className="max-w-7xl relative z-10 mx-auto w-full transition-all duration-cine">
            <Link href={`/${locale}/heritage/${featuredPost.slug}`} className="block group/link">
              <div className="flex items-center gap-6 mb-12">
                <span className="inline-block py-3 px-8 layer-2 border border-quiet text-[10px] font-brand font-bold uppercase tracking-[0.6em] text-gold">
                  {t('heroTag')} • {t('navJournal')}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-9xl font-brand font-bold text-primary mb-8 md:mb-16 leading-[0.8] uppercase tracking-tighter md:tracking-tighter foil-hero transition-all duration-cine group-hover/link:tracking-wider">
                {featuredPost.title[locale as keyof typeof featuredPost.title]}
              </h1>
              
              <p className="text-2xl md:text-3xl text-ghost font-brand font-light leading-relaxed max-w-5xl mb-20 line-clamp-2 opacity-80 italic">
                {featuredPost.excerpt[locale as keyof typeof featuredPost.excerpt] || ""}
              </p>
              
              <div className="flex items-center gap-12">
                {featuredPost.author && (
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-16 layer-2 border border-quiet flex items-center justify-center overflow-hidden">
                       <span className="text-gold font-brand font-bold text-2xl">{(featuredPost.author?.[locale as keyof typeof featuredPost.author] || "")?.[0] || 'A'}</span>
                    </div>
                    <span className="text-ghost font-brand font-bold text-xl uppercase tracking-[0.3em] opacity-60">
                      {featuredPost.author?.[locale as keyof typeof featuredPost.author] || ""}
                    </span>
                  </div>
                )}
                <div className="h-px w-24 bg-quiet" />
                <time className="text-gold text-[11px] uppercase tracking-[0.5em] font-brand font-bold" dateTime={featuredPost.date}>
                  {new Date(featuredPost.date).toLocaleDateString(locale, {
                    year: 'numeric', month: 'long',
                  })}
                </time>
              </div>
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-quiet z-20" />
        </section>
      )}

      {/* ── The Vision Section (Philosophy) ── */}
      <section id="vision" className="py-72 px-6 md:px-12 relative overflow-hidden layer-1 border-b border-quiet">
        <div className="strands-bg-pattern opacity-5" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Icon name="quote" className="text-gold mx-auto mb-24 opacity-30" size="l" style={{ width: 96, height: 96 }} />
          
          <h2 className="text-[12px] font-brand font-bold uppercase tracking-[1em] text-gold mb-16 opacity-50">
            {t('navVision')}
          </h2>
          
          <h3 className="text-5xl md:text-8xl lg:text-9xl font-brand font-bold text-primary mb-32 leading-[0.85] uppercase tracking-tighter">
             {t('philosophyTitle')}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 text-start">
            <p className="text-3xl md:text-4xl text-ghost font-brand font-light leading-relaxed italic border-s-4 border-gold/40 ps-16 opacity-90">
               {t('philosophyP1')}
            </p>
            <p className="text-2xl text-ghost font-brand font-light leading-loose opacity-70">
               {t('philosophyP2')}
            </p>
          </div>
          
          <div className="arrow-divider max-w-2xl mx-auto mt-48 opacity-20" />
        </div>
      </section>

      {/* ── Founding Pillars ── */}
      <section id="lineage" className="py-72 px-6 md:px-12 relative z-10 layer-0 overflow-hidden">
        <div className="strands-bg-pattern opacity-5" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-48">
            <h4 className="text-gold font-brand font-bold tracking-[0.8em] uppercase text-[12px] mb-12 opacity-50">
              {t('originTitle')}
            </h4>
            <h2 className="text-6xl md:text-9xl font-brand font-bold text-primary leading-[0.8] mb-16 uppercase tracking-tighter">
              {t('pillarsTitle')}
            </h2>
            <div className="arrow-divider max-w-xs mx-auto opacity-30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: t('pillar1Title'), desc: t('pillar1Desc'), icon: 'newspaper' as IconName },
              { title: t('pillar2Title'), desc: t('pillar2Desc'), icon: 'activity' as IconName },
              { title: t('pillar3Title'), desc: t('pillar3Desc'), icon: 'crown' as IconName }
            ].map((pillar, i) => (
              <div 
                key={i}
                className="layer-1 border border-quiet p-20 hover:border-gold transition-all duration-cine group relative overflow-hidden flex flex-col items-center text-center depth-card"
              >
                <div className="w-32 h-32 mb-16 transform group-hover:scale-110 transition-transform duration-cine cinema-lut opacity-30 group-hover:opacity-100 relative flex items-center justify-center">
                  <Icon name={pillar.icon} size={64} color="var(--gold)" />
                </div>
                <h3 className="text-4xl font-brand font-bold text-primary mb-10 group-hover:text-gold transition-all tracking-tight uppercase">{pillar.title}</h3>
                <p className="text-ghost leading-relaxed font-brand font-light text-xl opacity-70">{pillar.desc}</p>
                <div className="mt-20 pt-16 border-t border-quiet w-full flex justify-center">
                   <div className="w-24 h-px bg-quiet group-hover:w-48 group-hover:bg-gold transition-all duration-cine" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder's Message & Mission ── */}
      <section className="py-72 px-6 md:px-12 relative z-10 layer-1 border-y border-quiet overflow-hidden">
        <div className="strands-bg-pattern opacity-5" />
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-32 items-center">
          <div className="col-span-12 lg:col-span-5 relative aspect-square lg:aspect-[4/5] overflow-hidden group cinema-lut border border-quiet depth-card">
            <NextImage
              src="https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?q=80&w=800"
              alt="Founder's Path"
              fill
              className="object-cover transition-transform duration-[30s] group-hover:scale-110 ease-out grayscale hover:grayscale-0 transition-all duration-cine"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-20 left-20">
               <span className="text-white/10 text-9xl font-brand font-bold italic tracking-tighter uppercase pointer-events-none">AL-NIMR</span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 space-y-24">
            <div className="space-y-12">
              <span className="text-gold text-[12px] font-brand font-bold tracking-[1em] uppercase opacity-50">{t('foundersMessageTitle')}</span>
              <h2 className="text-6xl md:text-9xl font-brand font-bold text-primary leading-[0.8] uppercase tracking-tighter">
                {t('missionTitle')}
              </h2>
            </div>
            
            <p className="text-3xl text-ghost leading-relaxed font-brand font-light italic opacity-90 border-s-4 border-gold/40 ps-16">
              &quot;{t('foundersMessage')}&quot;
            </p>

            <div className="p-16 border border-quiet layer-2 depth-card">
               <p className="text-ghost leading-relaxed text-2xl font-brand font-light opacity-70">
                 {t('missionDesc')}
               </p>
            </div>

            <div className="flex flex-wrap gap-12 pt-12">
              <Link href={`/${locale}/mount-up`} className="gold-sovereign-btn px-16 py-7 text-[12px] tracking-[0.5em] flex items-center gap-6">
                {t('ctaJoinJourney')}
                <div className="relative w-10 h-3 group-hover:translate-x-2 transition-transform duration-cine">
                  <NextImage src="/images/brand/arrow/Linear_Arrow_Dark.png" alt="" fill className="object-contain" />
                </div>
              </Link>
              <Link href={`/${locale}/heritage`} className="ivory-ghost-btn px-16 py-7 text-[12px] tracking-[0.5em] flex items-center gap-6">
                {t('ctaExploreStory')}
                <div className="relative w-10 h-3 group-hover:translate-x-2 transition-transform duration-cine">
                  <NextImage src="/images/brand/arrow/Linear_Arrow_Gold.png" alt="" fill className="object-contain" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Spotlights ── */}
      {featuredPosts.length > 0 && (
        <JournalFeaturedSection posts={featuredPosts} locale={locale} />
      )}

      {/* ── The Digital Divan — Journal Grid ── */}
      <section id="journal" className="py-72 px-6 md:px-12 relative z-10 border-t border-quiet layer-0">
        <div className="strands-bg-pattern opacity-5" />
        <div className="max-w-7xl mx-auto mb-40 text-center">
          <span className="text-[12px] font-brand font-bold uppercase tracking-[1.2em] text-gold mb-12 block opacity-50">
            {t('pulseTag')}
          </span>
          <h2 className="text-6xl md:text-8xl font-brand font-bold text-primary mb-16 uppercase tracking-tighter">
            {journalHeading}
          </h2>
          <div className="arrow-divider max-w-xs mx-auto mb-16 opacity-30" />
          <p className="text-ghost max-w-4xl mx-auto text-2xl leading-relaxed font-brand font-light opacity-70">
            {journalSubheading}
          </p>
        </div>

        <JournalClientGrid posts={posts} locale={locale} />
      </section>

      {/* ── Closing Signature ── */}
       <section className="py-96 text-center relative overflow-hidden layer-0">
        <div className="strands-bg-pattern opacity-10" />
        <div className="arrow-divider mb-32 opacity-30 mx-auto max-w-3xl" />
        <h3 className="text-4xl md:text-6xl font-brand font-bold text-gold italic px-12 z-10 relative leading-tight tracking-tight uppercase">
          &quot;{t('quote')}&quot;
        </h3>
      </section>
    </main>
  );
}

