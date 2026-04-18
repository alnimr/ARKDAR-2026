'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { JournalPost } from '@/types/journal';
import NextImage from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { useTranslations } from 'next-intl';

function FormattedDate({ date, locale }: { date: string; locale: string }) {
  const [formatted, setFormatted] = useState("");
  
  useEffect(() => {
    setFormatted(new Date(date).toLocaleDateString(locale, { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }));
  }, [date, locale]);

  return <>{formatted}</>;
}

interface JournalFeaturedSectionProps {
  posts: JournalPost[];
  locale: string;
}

export default function JournalFeaturedSection({ posts, locale }: JournalFeaturedSectionProps) {
  const t = useTranslations('Heritage');
  const scrollRef = useRef<HTMLDivElement>(null);
  const isRtl = locale === 'ar';

  const scrollContainer = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (posts.length === 0) return null;

  return (
    <section className="py-72 relative overflow-hidden layer-0 border-y border-quiet selection:bg-gold selection:text-black font-brand">
      {/* Background Decor - Sovereign Atmosphere */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/[0.05] to-transparent -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-sovereign mb-32 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-16">
          <div className="space-y-8">
            <span className="text-gold text-[12px] font-brand font-bold tracking-[0.8em] uppercase flex items-center gap-6">
              <span className="w-16 h-px bg-gold/30" />
              {t('heroTag')}
            </span>
            <h2 className="text-5xl md:text-9xl font-brand font-bold text-primary leading-[0.8] uppercase tracking-tighter foil-hero">
              {t('featuredTitle')}
            </h2>
            <p className="text-ghost max-w-3xl text-2xl font-brand font-light leading-relaxed opacity-70 italic">
              {t('featuredSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-8">
            <button 
              onClick={() => scrollContainer(isRtl ? 'right' : 'left')}
              className="w-24 h-24 border border-quiet layer-1 flex items-center justify-center text-gold/40 hover:bg-gold hover:text-black transition-all duration-cine group"
              aria-label={isRtl ? "التمرير لليمين" : "Scroll Left"}
            >
              <Icon name="arrow" size={32} color="currentColor" className={`${isRtl ? "rotate-90" : "rotate-180"} group-hover:-translate-x-2 transition-transform duration-cine`} />
            </button>
            <button 
              onClick={() => scrollContainer(isRtl ? 'left' : 'right')}
              className="w-24 h-24 border border-quiet layer-1 flex items-center justify-center text-gold/40 hover:bg-gold hover:text-black transition-all duration-cine group"
              aria-label={isRtl ? "التمرير لليسار" : "Scroll Right"}
            >
              <Icon name="arrow" size={32} color="currentColor" className={`${isRtl ? "rotate-180" : "rotate-90"} group-hover:translate-x-2 transition-transform duration-cine`} />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Cards Container */}
      <div 
        ref={scrollRef}
        className="flex gap-16 overflow-x-auto px-[5%] md:px-[calc((100vw-min(1280px,88vw))/2)] no-scrollbar pb-32 snap-x"
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 w-[280px] sm:w-[500px] md:w-[720px] max-w-[90vw] snap-center"
          >
            <Link 
              href={`/${locale}/heritage/${post.slug}`}
              className="group relative block aspect-[16/9] overflow-hidden border border-quiet layer-1 depth-card cinema-lut"
            >
              {/* Image with elite overlay */}
              <NextImage
                src={post.image}
                alt={post.title[locale as keyof typeof post.title]}
                fill
                className="object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-110 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-layer-0 via-layer-0/60 to-transparent opacity-90 group-hover:opacity-95 transition-all duration-cine" />
              
              {/* Floating Labels */}
              <div className="absolute top-12 left-12 flex gap-6">
                <span className="px-8 py-3 layer-3 border border-quiet text-gold text-[10px] font-brand font-bold uppercase tracking-[0.5em] bg-layer-3/80">
                  {(post.categoryId || 'Heritage').toUpperCase()}
                </span>
                <span className="px-8 py-3 layer-3 border border-quiet text-ghost text-[10px] font-brand font-bold uppercase tracking-[0.5em] bg-layer-3/80 opacity-60">
                  {(post.type || 'Article').toUpperCase()}
                </span>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-16 md:p-20">
                <div className="space-y-10 text-start">
                  <div className="flex items-center gap-10 text-ghost/40 text-[11px] uppercase tracking-[0.5em] font-brand font-bold">
                    <span className="flex items-center gap-4">
                      <Icon name="calendar" size={16} color="currentColor" opacity="0.4" />
                      <FormattedDate date={post.date} locale={locale} />
                    </span>
                    <span className="w-1 h-1 bg-gold/20" />
                    <span className="flex items-center gap-4">
                      <Icon name="share" size={16} color="currentColor" opacity="0.4" />
                      {t('readTime', { minutes: 5 })}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-6xl font-brand font-bold text-primary group-hover:text-gold transition-all duration-cine leading-[0.9] uppercase tracking-tighter">
                    {post.title[locale as keyof typeof post.title]}
                  </h3>
                  
                  <div className="h-px w-24 bg-gold group-hover:w-48 transition-all duration-cine" />
                </div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-cine pointer-events-none bg-gradient-to-tr from-white/[0.05] via-transparent to-transparent" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Decorative Brand Element - Sovereign Divider */}
      <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent pointer-events-none" />
    </section>
  );
}
