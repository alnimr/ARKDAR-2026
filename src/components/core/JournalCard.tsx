'use client';

import { motion } from 'framer-motion';
import NextImage from 'next/image';
import Link from 'next/link';
import { JournalPost } from '@/types/journal';
import { 
  FileText, 
  Video, 
  Download, 
  Newspaper, 
  ArrowUpRight, 
  Calendar,
  User
} from 'lucide-react';

interface JournalCardProps {
  post: JournalPost;
  locale: string;
  index?: number;
}

const typeConfig = {
  article: {
    icon: FileText,
    labelAr: 'مقالة',
    labelEn: 'Article',
    labelDe: 'Artikel',
    labelEs: 'Artículo',
    color: 'text-brand-primary',
    bg: 'bg-brand-primary/10',
    border: 'border-brand-primary/20',
  },
  media: {
    icon: Video,
    labelAr: 'فيديو',
    labelEn: 'Video',
    labelDe: 'Video',
    labelEs: 'Video',
    color: 'text-brand-primary',
    bg: 'bg-brand-primary/10',
    border: 'border-brand-primary/10',
  },
  video: {
    icon: Video,
    labelAr: 'فيديو',
    labelEn: 'Video',
    labelDe: 'Video',
    labelEs: 'Video',
    color: 'text-brand-primary',
    bg: 'bg-brand-primary/10',
    border: 'border-brand-primary/10',
  },
  download: {
    icon: Download,
    labelAr: 'تحميل',
    labelEn: 'Download',
    labelDe: 'Download',
    labelEs: 'Descarga',
    color: 'text-brand-primary',
    bg: 'bg-brand-primary/10',
    border: 'border-brand-primary/10',
  },
  press: {
    icon: Newspaper,
    labelAr: 'بيان صحفي',
    labelEn: 'Press Release',
    labelDe: 'Pressemitteilung',
    labelEs: 'Comunicado',
    color: 'text-brand-primary',
    bg: 'bg-brand-primary/10',
    border: 'border-brand-primary/20',
  },
  news: {
    icon: Newspaper,
    labelAr: 'أخبار',
    labelEn: 'News',
    labelDe: 'Neuigkeiten',
    labelEs: 'Noticias',
    color: 'text-brand-primary',
    bg: 'bg-brand-primary/10',
    border: 'border-brand-primary/20',
  },
  heritage: {
    icon: FileText,
    labelAr: 'تراث',
    labelEn: 'Heritage',
    labelDe: 'Erbe',
    labelEs: 'Herencia',
    color: 'text-brand-primary',
    bg: 'bg-brand-primary/10',
    border: 'border-brand-primary/20',
  },
  craftsmanship: {
    icon: Newspaper,
    labelAr: 'حرفية',
    labelEn: 'Craftsmanship',
    labelDe: 'Handwerk',
    labelEs: 'Artesanía',
    color: 'text-brand-primary',
    bg: 'bg-brand-primary/10',
    border: 'border-brand-primary/10',
  },
  lifestyle: {
    icon: FileText,
    labelAr: 'نمط حياة',
    labelEn: 'Lifestyle',
    labelDe: 'Lifestyle',
    labelEs: 'Estilo de vida',
    color: 'text-brand-primary',
    bg: 'bg-brand-primary/10',
    border: 'border-brand-primary/10',
  },
};

export default function JournalCard({ post, locale, index = 0 }: JournalCardProps) {
  const config = typeConfig[post.type as keyof typeof typeConfig] || typeConfig.article;
  const TypeIcon = config.icon;
  
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

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "easeInOut" }}
      className="layer-2 group relative flex flex-col overflow-hidden border border-sovereign transition-all duration-300 hover-sovereign"
    >
      {/* Brand Watermark Overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 brand-horse-bg opacity-0 group-hover:opacity-[0.03] -mr-8 -mt-8 rotate-12 transition-opacity duration-700 pointer-events-none" />
      
      {/* Full Card Clickable Link */}
      <Link 
        href={href} 
        target={isExternalOnly ? '_blank' : undefined} 
        rel={isExternalOnly ? 'noopener noreferrer' : undefined} 
        className="absolute inset-0 z-20"
        aria-label={title}
      />

      {/* Image */}
      <div className="relative h-64 overflow-hidden cinema-lut">
        <NextImage
          src={post.image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90" />
        
        {/* Type Badge */}
        <div className={`absolute top-6 ${locale === 'ar' ? 'right-6' : 'left-6'} flex items-center gap-2 px-4 py-2 border layer-3 ${config.border}`}>
          <TypeIcon size={12} className="text-brand-primary" />
          <span className="text-[9px] font-latin font-bold uppercase tracking-[0.2em] text-brand-primary">
            {typeLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-8 relative">
        {/* Meta */}
        <div className={`flex items-center gap-5 mb-6 text-foreground/40 text-[9px] font-latin font-bold uppercase tracking-[0.2em] ${locale === 'ar' ? 'flex-row-reverse justify-end' : ''}`}>
          <span className="flex items-center gap-2">
            <Calendar size={12} className="text-brand-primary/40" strokeWidth={1.5} />
            {formattedDate}
          </span>
          {post.author && (
            <>
              <span className="w-1 h-1 rounded-full bg-brand-primary/10" />
              <span className="flex items-center gap-2 font-body font-bold text-foreground/30">
                <User size={12} className="text-brand-primary/40" strokeWidth={1.5} />
                {post.author}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className={`text-xl md:text-2xl font-title font-bold text-white leading-tight mb-4 transition-colors duration-300 group-hover:text-brand-primary ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
          {title}
        </h3>

        {/* Excerpt */}
        <p className={`text-sm text-foreground/50 leading-relaxed flex-grow line-clamp-3 font-body ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
          {excerpt}
        </p>

        {/* Separator */}
        <div className="mt-8 mb-6 h-px bg-brand-primary/5 w-12" />

        {/* CTA */}
        <div
          className={`flex items-center gap-3 text-[9px] font-latin font-bold uppercase tracking-[0.2em] text-brand-primary/80 group-hover:text-brand-primary transition-all duration-300 relative z-30 ${locale === 'ar' ? 'flex-row-reverse self-end' : 'self-start'}`}
        >
          {post.type === 'download'
            ? (locale === 'ar' ? 'تحميل السجل' : 'Download Record')
            : post.type === 'press' && isExternalOnly
              ? (locale === 'ar' ? 'البيان الصحفي' : 'Press Release')
              : (locale === 'ar' ? 'اكتشف المزيد' : 'Discovery')}
          <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
        </div>
      </div>
    </motion.article>
  );
}
