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
    <section className="py-24 relative overflow-hidden bg-brand-secondary/5 border-y border-brand-secondary/10">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-brand-primary text-xs font-black tracking-[6px] uppercase flex items-center gap-3">
              <span className="w-8 h-px bg-brand-primary/50" />
              {t('heroTag')}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              {t('featuredTitle')}
            </h2>
            <p className="text-text-muted max-w-xl text-lg font-light leading-relaxed">
              {t('featuredSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => scrollContainer(isRtl ? 'right' : 'left')}
              className="w-14 h-14 rounded-full border border-brand-secondary/20 flex items-center justify-center text-brand-secondary/40 hover:text-brand-primary hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all group active:scale-95"
              aria-label={isRtl ? "التمرير لليمين" : "Scroll Left"}
            >
              <ArrowLeft size={20} className={isRtl ? "rotate-180" : ""} />
            </button>
            <button 
              onClick={() => scrollContainer(isRtl ? 'left' : 'right')}
              className="w-14 h-14 rounded-full border border-brand-secondary/20 flex items-center justify-center text-brand-secondary/40 hover:text-brand-primary hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all group active:scale-95"
              aria-label={isRtl ? "التمرير لليسار" : "Scroll Right"}
            >
              <ArrowRight size={20} className={isRtl ? "rotate-180" : ""} />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Cards Container */}
      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto px-[5%] md:px-[calc((100vw-min(1280px,88vw))/2)] no-scrollbar pb-12 snap-x"
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            className="flex-shrink-0 w-[450px] max-w-[85vw] snap-center"
          >
            <Link 
              href={`/${locale}/heritage/${post.slug}`}
              className="group relative block aspect-[16/10] rounded-[40px] overflow-hidden border border-brand-secondary/10 bg-surface-dark shadow-2xl"
            >
              {/* Image with elite overlay */}
              <NextImage
                src={post.image}
                alt={post.title[locale as keyof typeof post.title]}
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Floating Labels */}
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-3 py-1 bg-brand-primary/20 border border-brand-primary/30 backdrop-blur-md text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-lg">
                  {(post.categoryId || 'Heritage').toUpperCase()}
                </span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 backdrop-blur-md text-white/50 text-[10px] font-bold uppercase tracking-widest rounded-lg">
                  {(post.type || 'Article').toUpperCase()}
                </span>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 transform transition-transform duration-700 group-hover:-translate-y-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-white/40 text-[10px] uppercase tracking-widest font-bold">
                    <span className="flex items-center gap-2">
                      <Calendar size={12} className="text-brand-primary" />
                      {new Date(post.date).toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-brand-primary/40" />
                    <span className="flex items-center gap-2">
                      <Clock size={12} className="text-brand-primary" />
                      5 min
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-serif text-white group-hover:text-brand-secondary transition-colors duration-500 leading-tight">
                    {post.title[locale as keyof typeof post.title]}
                  </h3>
                  
                  <div className="h-0.5 w-12 bg-brand-primary group-hover:w-24 transition-all duration-700" />
                </div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-transparent" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Decorative Brand Element */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-3xl opacity-10 brand-sep-bow pointer-events-none" />
    </section>
  );
}
