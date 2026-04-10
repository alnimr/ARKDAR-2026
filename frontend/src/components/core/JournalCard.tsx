'use client';

import { motion } from 'framer-motion';
import NextImage from 'next/image';
import Link from 'next/link';
import { JournalPost } from '@/data/mockJournal';
import { 
  FileText, 
  Video, 
  Download, 
  Newspaper, 
  ArrowUpRight, 
  ExternalLink,
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
    color: 'text-brand-secondary',
    bg: 'bg-brand-secondary/10',
    border: 'border-brand-secondary/20',
  },
  media: {
    icon: Video,
    labelAr: 'فيديو',
    labelEn: 'Video',
    labelDe: 'Video',
    labelEs: 'Video',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
  },
  video: {
    icon: Video,
    labelAr: 'فيديو',
    labelEn: 'Video',
    labelDe: 'Video',
    labelEs: 'Video',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
  },
  download: {
    icon: Download,
    labelAr: 'تحميل',
    labelEn: 'Download',
    labelDe: 'Download',
    labelEs: 'Descarga',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
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
    color: 'text-brand-secondary',
    bg: 'bg-brand-secondary/10',
    border: 'border-brand-secondary/20',
  },
  lifestyle: {
    icon: FileText,
    labelAr: 'نمط حياة',
    labelEn: 'Lifestyle',
    labelDe: 'Lifestyle',
    labelEs: 'Estilo de vida',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
  },
};

export default function JournalCard({ post, locale, index = 0 }: JournalCardProps) {
  const config = typeConfig[post.type as keyof typeof typeConfig] || typeConfig.article;
  const TypeIcon = config.icon;
  
  const title = post.title[locale as keyof typeof post.title] || post.title.en;
  const excerpt = post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.en;
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
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500"
    >
      {/* Ambient glow on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(160,6,28,0.08) 0%, transparent 70%)' }}
      />
      
      {/* Full Card Clickable Link */}
      <Link 
        href={href} 
        target={isExternalOnly ? '_blank' : undefined} 
        rel={isExternalOnly ? 'noopener noreferrer' : undefined} 
        className="absolute inset-0 z-20"
        aria-label={title}
      />

      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <NextImage
          src={post.image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
        
        {/* Type Badge */}
        <div className={`absolute top-4 ${locale === 'ar' ? 'right-4' : 'left-4'} flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${config.bg} ${config.border} backdrop-blur-sm`}>
          <TypeIcon size={13} className={config.color} />
          <span className={`text-[10px] font-bold uppercase tracking-widest ${config.color}`}>
            {typeLabel}
          </span>
        </div>

        {/* Media/Download overlay icon */}
        {(post.type === 'media' || post.type === 'download') && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center">
              <TypeIcon size={22} className="text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-7">
        {/* Meta */}
        <div className={`flex items-center gap-4 mb-4 text-white/30 text-[11px] font-medium ${locale === 'ar' ? 'flex-row-reverse justify-end' : ''}`}>
          <span className="flex items-center gap-1.5">
            <Calendar size={11} />
            {formattedDate}
          </span>
          {post.author && (
            <>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5">
                <User size={11} />
                {post.author}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className={`text-lg font-serif font-semibold text-white leading-snug mb-3 group-hover:text-brand-secondary transition-colors duration-300 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
          {title}
        </h3>

        {/* Excerpt */}
        <p className={`text-sm text-white/50 leading-relaxed flex-grow line-clamp-3 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
          {excerpt}
        </p>

        {/* Separator */}
        <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* CTA */}
        <div
          className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[2px] text-white/40 group-hover:text-brand-secondary transition-colors duration-300 relative z-30 ${locale === 'ar' ? 'flex-row-reverse self-end' : 'self-start'}`}
        >
          {post.type === 'download'
            ? (locale === 'ar' ? 'تحميل' : 'Download')
            : post.type === 'press' && isExternalOnly
              ? (locale === 'ar' ? 'قراءة الخبر' : 'Read Article')
              : (locale === 'ar' ? 'اكتشف أكثر' : 'Read More')}
          {isExternalOnly ? <ExternalLink size={13} /> : <ArrowUpRight size={13} />}
        </div>
      </div>
    </motion.article>
  );
}
