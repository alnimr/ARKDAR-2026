'use client';

import { motion } from 'framer-motion';
import NextImage from 'next/image';
import Link from 'next/link';
import { JournalPost } from '@/types/journal';
import Icon, { IconName } from './Icon';

interface JournalCardProps {
  post: JournalPost;
  locale: string;
  index?: number;
}

const typeConfig = {
  article: {
    icon: 'calendar' as IconName,
    labelAr: 'مقالة',
    labelEn: 'Article',
    labelDe: 'Artikel',
    labelEs: 'Artículo',
  },
  media: {
    icon: 'play' as IconName,
    labelAr: 'فيديو',
    labelEn: 'Video',
    labelDe: 'Video',
    labelEs: 'Video',
  },
  video: {
    icon: 'play' as IconName,
    labelAr: 'فيديو',
    labelEn: 'Video',
    labelDe: 'Video',
    labelEs: 'Video',
  },
  download: {
    icon: 'share' as IconName,
    labelAr: 'تحميل',
    labelEn: 'Download',
    labelDe: 'Download',
    labelEs: 'Descarga',
  },
  press: {
    icon: 'notify' as IconName,
    labelAr: 'بيان صحفي',
    labelEn: 'Press Release',
    labelDe: 'Pressemitteilung',
    labelEs: 'Comunicado',
  },
  news: {
    icon: 'notify' as IconName,
    labelAr: 'أخبار',
    labelEn: 'News',
    labelDe: 'Neuigkeiten',
    labelEs: 'Noticias',
  },
  heritage: {
    icon: 'calendar' as IconName,
    labelAr: 'تراث',
    labelEn: 'Heritage',
    labelDe: 'Erbe',
    labelEs: 'Herencia',
  },
  craftsmanship: {
    icon: 'filter' as IconName,
    labelAr: 'حرفية',
    labelEn: 'Craftsmanship',
    labelDe: 'Handwerk',
    labelEs: 'Artesanía',
  },
  lifestyle: {
    icon: 'calendar' as IconName,
    labelAr: 'نمط حياة',
    labelEn: 'Lifestyle',
    labelDe: 'Lifestyle',
    labelEs: 'Estilo de vida',
  },
};

export default function JournalCard({ post, locale, index = 0 }: JournalCardProps) {
  const config = typeConfig[post.type as keyof typeof typeConfig] || typeConfig.article;
  
  const title = post.title?.[locale as keyof typeof post.title] || post.title?.ar || "";
  const excerpt = post.excerpt?.[locale as keyof typeof post.excerpt] || post.excerpt?.ar || "";
  const typeLabel = config[`label${locale === 'ar' ? 'Ar' : locale === 'de' ? 'De' : locale === 'es' ? 'Es' : 'En'}` as keyof typeof config] as string;

  const isExternalOnly = post.type === 'press' && post.externalLink && !post.content;
  const href = isExternalOnly
    ? post.externalLink!
    : `/${locale}/heritage/${post.slug}`;

  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === 'ar' ? 'ar-SA' : locale === 'de' ? 'de-DE' : locale === 'es' ? 'es-ES' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const isRtl = locale === 'ar';

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="layer-1 group relative flex flex-col overflow-hidden border border-quiet transition-all duration-cine hover:border-gold depth-card selection:bg-gold selection:text-black font-brand"
    >
      {/* Brand Watermark Overlay */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-[0.05] -mr-10 -mt-10 rotate-12 transition-all duration-cine pointer-events-none layer-0">
        <NextImage src="/images/brand/watermarks/Five_Strands_Gold.png" alt="" fill className="object-contain" />
      </div>
      
      {/* Full Card Clickable Link */}
      <Link 
        href={href} 
        target={isExternalOnly ? '_blank' : undefined} 
        rel={isExternalOnly ? 'noopener noreferrer' : undefined} 
        className="absolute inset-0 z-20"
        aria-label={title}
      />

      {/* Image */}
      <div className="relative h-72 overflow-hidden cinema-lut">
        <div className="strands-bg-pattern opacity-[0.03]" />
        <NextImage
          src={post.image}
          alt={title}
          fill
          className="object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-110 opacity-60 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        
        {/* Type Badge */}
        <div className={`absolute top-8 ${isRtl ? 'right-8' : 'left-8'} flex items-center gap-4 px-6 py-3 border border-quiet layer-3 bg-black/80 z-30`}>
          <Icon name={config.icon as IconName} size={14} color="var(--color-gold)" />
          <span className="text-[10px] font-brand font-bold uppercase tracking-[0.5em] text-gold">
            {typeLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-12 relative">
        {/* Meta */}
        <div className={`flex items-center gap-8 mb-10 text-ghost/40 text-[10px] font-brand font-bold uppercase tracking-[0.4em] ${isRtl ? 'flex-row-reverse justify-end' : ''}`}>
          <span className="flex items-center gap-3">
            <Icon name="calendar" size={14} color="currentColor" opacity="0.4" />
            {formattedDate}
          </span>
          {post.author && (
            <>
              <span className="w-1 h-1 bg-gold/20" />
              <span className="flex items-center gap-3">
                <Icon name="warrior" size={14} color="currentColor" opacity="0.4" />
                {post.author}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className={`text-2xl md:text-3xl font-brand font-bold text-primary leading-tight mb-8 transition-all duration-cine group-hover:text-gold group-hover:tracking-tight uppercase ${isRtl ? 'text-right' : 'text-left'}`}>
          {title}
        </h3>

        {/* Excerpt */}
        <p className={`text-lg text-ghost/60 leading-relaxed flex-grow line-clamp-3 font-brand font-light italic ${isRtl ? 'text-right' : 'text-left'}`}>
          {excerpt}
        </p>

        {/* Separator */}
        <div className="arrow-divider w-16 group-hover:w-32 opacity-20 group-hover:opacity-40" />

        {/* CTA */}
        <div
          className={`flex items-center gap-6 text-[10px] font-brand font-bold uppercase tracking-[0.5em] text-gold group-hover:tracking-[0.8em] transition-all duration-cine relative z-30 ${isRtl ? 'flex-row-reverse self-end' : 'self-start'}`}
        >
          {post.type === 'download'
            ? (isRtl ? 'تحميل السجل' : 'DOWNLOAD RECORD')
            : post.type === 'press' && isExternalOnly
              ? (isRtl ? 'البيان الصحفي' : 'PRESS RELEASE')
              : (isRtl ? 'اكتشف المزيد' : 'DISCOVERY')}
          <div className="relative w-8 h-3 group-hover:translate-x-2 transition-transform duration-cine">
            <NextImage src="/images/brand/arrow/Linear_Arrow_Gold.png" alt="" fill className="object-contain" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
