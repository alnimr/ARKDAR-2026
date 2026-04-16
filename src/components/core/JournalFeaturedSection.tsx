'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { JournalPost } from '@/types/journal';
import NextImage from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
    <section className="py-32 relative overflow-hidden bg-surface-dark border-y border-brand-primary/5">
      {/* Background Decor - Sovereign Red Glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/[0.03] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-6">
            <span className="text-brand-primary text-[10px] font-numbers font-black tracking-[0.5em] uppercase flex items-center gap-4">
              <span className="w-12 h-px bg-brand-primary/30" />
              {t('heroTag')}
            </span>
            <h2 className="text-5xl md:text-7xl font-title font-bold text-white leading-[0.9] uppercase tracking-tighter">
              {t('featuredTitle')}
            </h2>
            <p className="text-foreground/50 max-w-2xl text-xl font-body leading-relaxed">
              {t('featuredSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button 
              onClick={() => scrollContainer(isRtl ? 'right' : 'left')}
              className="w-16 h-16 rounded-sovereign border border-brand-primary/10 glass-sovereign flex items-center justify-center text-foreground/30 hover:text-brand-primary hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all group active:scale-90"
              aria-label={isRtl ? "التمرير لليمين" : "Scroll Left"}
            >
              <ArrowLeft size={24} className={isRtl ? "rotate-180" : ""} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => scrollContainer(isRtl ? 'left' : 'right')}
              className="w-16 h-16 rounded-sovereign border border-brand-primary/10 glass-sovereign flex items-center justify-center text-foreground/30 hover:text-brand-primary hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all group active:scale-90"
              aria-label={isRtl ? "التمرير لليسار" : "Scroll Right"}
            >
              <ArrowRight size={24} className={isRtl ? "rotate-180" : ""} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Cards Container */}
      <div 
        ref={scrollRef}
        className="flex gap-10 overflow-x-auto px-[5%] md:px-[calc((100vw-min(1280px,88vw))/2)] no-scrollbar pb-16 snap-x"
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.2 }}
            className="flex-shrink-0 w-[520px] max-w-[90vw] snap-center"
          >
            <Link 
              href={`/${locale}/heritage/${post.slug}`}
              className="group relative block aspect-[16/10] rounded-sovereign overflow-hidden border border-brand-primary/10 glass-sovereign shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] cinema-lut"
            >
              {/* Image with elite overlay */}
              <NextImage
                src={post.image}
                alt={post.title[locale as keyof typeof post.title]}
                fill
                className="object-cover transition-transform duration-[3s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Floating Labels */}
              <div className="absolute top-8 left-8 flex gap-3">
                <span className="px-5 py-2 glass-sovereign border border-brand-primary/30 text-brand-primary text-[10px] font-numbers font-black uppercase tracking-[0.2em] rounded-[4px]">
                  {(post.categoryId || 'Heritage').toUpperCase()}
                </span>
                <span className="px-5 py-2 glass-sovereign border border-white/10 text-white/50 text-[10px] font-numbers font-black uppercase tracking-[0.2em] rounded-[4px]">
                  {(post.type || 'Article').toUpperCase()}
                </span>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-10 md:p-12 transform transition-all duration-700 group-hover:-translate-y-2">
                <div className="space-y-6 text-start">
                  <div className="flex items-center gap-6 text-foreground/40 text-[10px] uppercase tracking-[0.3em] font-numbers font-black">
                    <span className="flex items-center gap-3">
                      <Calendar size={14} className="text-brand-primary/60" />
                      {new Date(post.date).toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/30" />
                    <span className="flex items-center gap-3">
                      <Clock size={14} className="text-brand-primary/60" />
                      5 MIN READ
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-title font-bold text-white group-hover:text-brand-primary transition-colors duration-500 leading-[1.1] uppercase tracking-tighter">
                    {post.title[locale as keyof typeof post.title]}
                  </h3>
                  
                  <div className="h-1 w-16 bg-brand-primary group-hover:w-32 transition-all duration-[800ms] rounded-full" />
                </div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-gradient-to-tr from-white/[0.07] via-transparent to-transparent" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Decorative Brand Element */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-3xl opacity-10 brand-sep-bow pointer-events-none" />
    </section>
  );
}
