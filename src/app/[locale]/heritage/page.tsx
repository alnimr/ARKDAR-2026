import { getTranslations, setRequestLocale } from 'next-intl/server';
import { mockJournalPosts } from '@/data/mockJournal';
import JournalClientGrid from '@/components/core/JournalClientGrid';
import JournalFeaturedSection from '@/components/core/JournalFeaturedSection';
import NextImage from 'next/image';
import Link from 'next/link';
import { Quote } from 'lucide-react';

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

  const journalHeading =
    locale === 'ar' ? 'الديوان الرقمي' : locale === 'de' ? 'Digitales Journal' : locale === 'es' ? 'El Diván Digital' : 'The Digital Divan';
  const journalSubheading =
    locale === 'ar'
      ? 'مقالات، فيديوهات، وإصدارات حصرية من عالم أركدار'
      : locale === 'de'
      ? 'Artikel, Videos und exklusive Veröffentlichungen aus der ARKDAR-Welt'
      : locale === 'es'
      ? 'Artículos, vídeos y publicaciones exclusivas del mundo ARKDAR'
      : 'Articles, videos, and exclusive releases from the ARKDAR world';

  // Sort descending by date
  const posts = [...mockJournalPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const featuredPosts = posts.filter((p) => p.featured);

  return (
    <main
      className="flex flex-col w-full min-h-screen pt-24 bg-surface-dark relative overflow-x-hidden transition-colors duration-500"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* ── Background Texture Layers ── */}
      <div className="absolute inset-0 brand-pattern-waves opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full brand-horse-bg opacity-[0.03] pointer-events-none" />

      {/* ── Sticky Sub-Navigation ── */}
      <nav id="heritage-nav" className="sticky top-[72px] z-50 w-full bg-surface-dark border-y border-sovereign shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-center gap-8 md:gap-16 overflow-x-auto no-scrollbar">
          {[
            { id: 'vision', label: t('navVision') },
            { id: 'lineage', label: t('navHistory') },
            { id: 'journal', label: t('navJournal') }
          ].map(item => (
            <a 
              key={item.id} 
              href={`#${item.id}`}
              className="text-[10px] md:text-xs font-bold uppercase tracking-[4px] text-white/50 hover:text-brand-primary transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Dynamic Featured Hero Section ── */}
      {featuredPost && (
        <section className="relative h-[90vh] flex flex-col justify-end section-padding overflow-hidden group">
          {/* Background Image with Parallax-like effect */}
          <div className="absolute inset-0 cinema-lut">
            <NextImage
              src={featuredPost.image}
              alt={featuredPost.title[locale as keyof typeof featuredPost.title]}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-[20s] ease-out opacity-60"
              priority
            />
            {/* Elite Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/40 to-transparent" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-surface-dark to-transparent opacity-60" />
          </div>
          
          <div className="max-w-6xl px-6 relative z-10 animate-fade-up pb-20">
            <Link href={`/${locale}/heritage/${featuredPost.slug}`} className="block group/link">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block py-1 px-4 border border-sovereign layer-2 text-[10px] font-bold uppercase tracking-[5px] text-brand-primary">
                  {t('heroTag')} • {t('navJournal')}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-title font-bold text-white mb-8 leading-[1.1] transition-all duration-300 group-hover/link:text-brand-secondary tracking-tight">
                {featuredPost.title[locale as keyof typeof featuredPost.title]}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/70 font-body leading-relaxed max-w-3xl mb-10 line-clamp-2 md:line-clamp-3">
                {featuredPost.excerpt[locale as keyof typeof featuredPost.excerpt] || featuredPost.excerpt.en}
              </p>
              
              <div className="flex items-center gap-6">
                {featuredPost.author && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 layer-2 border border-sovereign flex items-center justify-center overflow-hidden">
                       <span className="text-brand-primary font-title italic">{featuredPost.author?.[0] || 'A'}</span>
                    </div>
                    <span className="text-white/80 font-body font-medium text-sm">{featuredPost.author}</span>
                  </div>
                )}
                <div className="h-px w-12 bg-white/10" />
                <time className="text-white/40 text-sm uppercase tracking-widest font-latin font-bold" dateTime={featuredPost.date}>
                  {new Date(featuredPost.date).toLocaleDateString(locale, {
                    year: 'numeric', month: 'long',
                  })}
                </time>
              </div>
            </Link>
          </div>
          
          {/* Bottom highlight bar */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent z-20" />
        </section>
      )}

      {/* ── The Vision Section (Philosophy) ── */}
      <section id="vision" className="py-40 px-6 relative overflow-hidden bg-brand-primary/5">
        <div className="absolute top-0 left-0 w-full h-full brand-pattern-waves opacity-5 pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Quote className="text-brand-primary mx-auto mb-12 opacity-80" size={64} strokeWidth={1} />
          
          <h2 className="text-xs font-black uppercase tracking-[10px] text-brand-primary mb-6">
            {t('navVision')}
          </h2>
          
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-title text-white mb-16 leading-tight">
             {t('philosophyTitle')}
          </h3>
          
          <div className="grid-sovereign text-left items-start">
            <p className="col-span-12 lg:col-span-6 text-xl md:text-2xl text-white/60 font-body leading-relaxed italic border-l-2 border-brand-primary/30 pl-8">
               {t('philosophyP1')}
            </p>
            <p className="col-span-12 lg:col-span-6 text-lg text-white/50 font-body leading-loose">
               {t('philosophyP2')}
            </p>
          </div>
          
          <div className="mt-24 brand-sep-bow mx-auto max-w-lg" />
        </div>
      </section>

      {/* ── Founding Pillars (The Three Pillars of ARKDAR) ── */}
      <section id="lineage" className="py-40 px-6 relative z-10 bg-surface-dark overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 animate-fade-up">
            <h4 className="text-brand-secondary font-bold tracking-[8px] uppercase text-xs mb-4">
              {t('originTitle')}
            </h4>
            <h2 className="text-5xl md:text-7xl font-title text-white leading-tight mb-8">
              {t('pillarsTitle')}
            </h2>
            <div className="w-24 h-1 bg-brand-primary/40 mx-auto" />
          </div>

          <div className="grid-sovereign">
            {[
              { title: t('pillar1Title'), desc: t('pillar1Desc'), icon: '📜' },
              { title: t('pillar2Title'), desc: t('pillar2Desc'), icon: '🦾' },
              { title: t('pillar3Title'), desc: t('pillar3Desc'), icon: '🦅' }
            ].map((pillar, i) => (
              <div 
                key={i}
                className="col-span-12 md:col-span-4 layer-2 border border-sovereign p-12 hover-lift group relative overflow-hidden flex flex-col items-center text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-6xl mb-8 transform group-hover:scale-110 transition-transform duration-500">{pillar.icon}</div>
                <h3 className="text-2xl font-title text-white mb-6 group-hover:text-brand-primary transition-colors">{pillar.title}</h3>
                <p className="text-white/60 leading-relaxed font-body">{pillar.desc}</p>
                <div className="mt-auto pt-8">
                   <div className="w-12 h-0.5 bg-brand-primary/20 group-hover:w-24 group-hover:bg-brand-primary/60 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder's Message & Mission ── */}
      <section className="py-32 px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid-sovereign items-center">
          <div className="col-span-12 lg:col-span-5 relative aspect-square lg:aspect-[4/5] overflow-hidden group cinema-lut border border-sovereign shadow-2xl">
            <NextImage
              src="https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?q=80&w=800"
              alt="Founder's Path"
              fill
              className="object-cover transition-transform duration-[15s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-12 left-12">
               <span className="text-white/20 text-7xl font-title italic tracking-tighter uppercase">AL-NIMR</span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <span className="text-brand-primary text-xs font-bold tracking-[6px] uppercase">{t('foundersMessageTitle')}</span>
              <h2 className="text-4xl md:text-6xl font-title text-white leading-[1.2]">
                {t('missionTitle')}
              </h2>
            </div>
            
            <p className="text-xl text-white/70 leading-[1.8] font-body">
              &quot;{t('foundersMessage')}&quot;
            </p>

            <div className="p-8 border-l-4 border-sovereign layer-2">
               <p className="text-white/60 italic leading-relaxed text-lg font-body">
                 {t('missionDesc')}
               </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <Link href={`/${locale}/mountup`} className="btn-sovereign px-10 py-5">
                {t('ctaJoinJourney')}
              </Link>
              <button className="px-10 py-5 border border-sovereign layer-2 text-white/80 text-sm font-bold tracking-widest uppercase hover:bg-white/5 hover:border-brand-primary/20 transition-all font-body">
                {t('ctaExploreStory')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Spotlights ── */}
      {featuredPosts.length > 0 && (
        <JournalFeaturedSection posts={featuredPosts} locale={locale} />
      )}

      {/* ── The Digital Divan — Journal Grid ── */}
      <section id="journal" className="py-32 px-6 relative z-10 border-t border-white/5">
        {/* Section header */}
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-[8px] text-brand-primary mb-4 block">
            {locale === 'ar' ? 'مستجدات أركدار' : 'ARKDAR Pulse'}
          </span>
          <h2 className="text-4xl md:text-5xl font-title text-white mb-6">
            {journalHeading}
          </h2>
          <div className="w-16 h-px bg-brand-primary/40 mx-auto mb-6" />
          <p className="text-white/50 max-w-xl mx-auto text-lg leading-relaxed font-body">
            {journalSubheading}
          </p>
        </div>

        {/* Filter tabs & Interactive Grid */}
        <JournalClientGrid posts={posts} locale={locale} />
      </section>

      {/* ── Closing Signature ── */}
       <section className="py-40 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 blur-[120px] pointer-events-none" />
        <div className="brand-sep-bow mb-12 opacity-40 mx-auto max-w-2xl" />
        <h3 className="text-2xl md:text-3xl font-display text-brand-secondary italic px-6 z-10 relative">
          &quot;{t('quote')}&quot;
        </h3>
      </section>
    </main>
  );
}
