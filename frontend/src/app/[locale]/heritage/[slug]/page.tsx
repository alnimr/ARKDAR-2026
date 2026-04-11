import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { mockJournalPosts } from '@/data/mockJournal';
import NextImage from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
  FileText,
  Video,
  Download,
  Newspaper,
  ExternalLink,
} from 'lucide-react';
import ArticleReadingProgress from '@/components/core/ArticleReadingProgress';
import ArticleInteractions from '@/components/core/ArticleInteractions';
import ArticleSidebar from '@/components/core/ArticleSidebar';
import ArticleWrapper, { StaggerItem } from '@/components/core/ArticleWrapper';
import { getTranslations } from 'next-intl/server';

export const dynamicParams = true;

// Generate static params for all posts
export async function generateStaticParams() {
  const locales = ['ar', 'en', 'de', 'es'];
  return locales.flatMap((locale) =>
    mockJournalPosts
      .filter((post) => 
        post && 
        post.slug && 
        typeof post.slug === 'string' && 
        post.slug.trim() !== '' &&
        !post.slug.includes(' ')
      )
      .map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = mockJournalPosts.find((p) => p.slug === slug);
  
  if (!post) {
    return { 
      title: 'Heritage Article Not Found | ARKDAR',
      description: 'The requested article could not be found.'
    };
  }

  const title = (post.title && post.title[locale as keyof typeof post.title]) || (post.title && post.title.en) || (post.title && post.title.ar) || 'ARKDAR Article';
  const description = (post.excerpt && post.excerpt[locale as keyof typeof post.excerpt]) || (post.excerpt && post.excerpt.en) || (post.excerpt && post.excerpt.ar) || '';

  const siteName = 'ARKDAR Platform';

  return {
    title: `${title} | ${siteName}`,
    description,
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      images: post.image ? [{ url: post.image }] : [],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'ARKDAR'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteName}`,
      description,
      images: post.image ? [post.image] : [],
    }
  };
}


const typeIconMap = {
  article: FileText,
  media: Video,
  video: Video,
  download: Download,
  press: Newspaper,
  news: Newspaper,
};

const typeColorMap = {
  article: 'text-brand-secondary',
  media: 'text-blue-400',
  video: 'text-blue-400',
  download: 'text-emerald-400',
  press: 'text-brand-primary',
  news: 'text-brand-primary',
};

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = mockJournalPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }
  
  const title = post.title[locale as keyof typeof post.title] || post.title.en;
  // Ensure we have some content to display
  const content = post.content?.[locale as keyof typeof post.content] || 
                  post.content?.en || 
                  post.content?.ar || 
                  '';
  const excerpt = post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.en;

  const TypeIcon = typeIconMap[post.type as keyof typeof typeIconMap];
  const typeColor = typeColorMap[post.type as keyof typeof typeColorMap];

  const t = await getTranslations('Heritage').catch(() => null);
  const isRtl = locale === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  // Safe date formatting
  let formattedDate = '';
  try {
    const d = new Date(post.date);
    if (!isNaN(d.getTime())) {
      formattedDate = d.toLocaleDateString(
        locale === 'ar' ? 'ar-SA' : locale === 'de' ? 'de-DE' : locale === 'es' ? 'es-ES' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' }
      );
    }
  } catch (e) {
    formattedDate = post.date;
  }


  const related = mockJournalPosts
    .filter((p) => p.id !== post.id && p.content)
    .slice(0, 2);

  return (
    <main
      className="min-h-screen bg-surface-dark pt-24 pb-32 relative overflow-x-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <ArticleReadingProgress />
      <div className="fixed inset-0 brand-horse-bg opacity-[0.03] pointer-events-none z-0" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            image: [post.image],
            datePublished: post.date,
            author: {
              "@type": "Organization",
              name: post.author || "ARKDAR",
            },
            description: excerpt,
          }),
        }}
      />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-primary/4 blur-[140px] rounded-full" />
      </div>

      <ArticleWrapper>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <Link
            href={`/${locale}/heritage`}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[3px] text-white/30 hover:text-brand-secondary transition-colors duration-300 mb-12 group"
          >
            <BackIcon size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            {locale === 'ar' ? 'العودة للديوان' : locale === 'de' ? 'Zurück' : locale === 'es' ? 'Volver' : 'Back to Journal'}
          </Link>

          <div className={`flex flex-col lg:flex-row gap-4 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
            {/* Sidebar Desktop */}
            <ArticleSidebar 
              post={post} 
              locale={locale} 
              isRtl={isRtl} 
              translations={{
                date: t?.('sidebar_date') || (locale === 'ar' ? 'التاريخ' : 'Date'),
                author: t?.('sidebar_author') || (locale === 'ar' ? 'الكاتب' : 'Author'),
                readTime: t?.('sidebar_readTime') || (locale === 'ar' ? 'وقت القراءة' : 'Read Time'),
                toc: t?.('sidebar_toc') || (locale === 'ar' ? 'فهرس المقال' : 'Table of Contents')
              }}
            />

            {/* Content Column */}
            <div className="flex-1 max-w-3xl">
              <StaggerItem delay={0.1}>
                {/* Hero Image */}
                <div className="relative w-full aspect-[16/8] rounded-3xl overflow-hidden mb-12 border border-white/5 shadow-2xl">
                  <NextImage
                    src={post.image}
                    alt={title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 896px) 100vw, 896px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/90 via-surface-dark/20 to-transparent" />
                </div>
              </StaggerItem>

              <StaggerItem delay={0.2}>
                <header className="mb-12">
                  <div className={`flex items-center gap-2 mb-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 ${typeColor} text-[10px] font-bold uppercase tracking-widest`}>
                      <TypeIcon size={12} />
                      {post.type === 'article'
                        ? (locale === 'ar' ? 'مقالة' : 'Article')
                        : post.type === 'media' || post.type === 'video'
                        ? (locale === 'ar' ? 'فيديو' : 'Video')
                        : post.type === 'download'
                        ? (locale === 'ar' ? 'تحميل' : 'Download')
                        : (locale === 'ar' ? 'أخبار' : 'News')}
                    </span>
                  </div>

                  <h1 className={`text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-6 ${isRtl ? 'text-right overflow-wrap-anywhere' : 'text-left'}`}>
                    {title}
                  </h1>

                  {/* Mobile Metadata (Hidden on Desktop) */}
                  <div className={`flex lg:hidden flex-wrap items-center gap-x-6 gap-y-2 text-white/40 text-sm mb-8 ${isRtl ? 'flex-row-reverse justify-end' : ''}`}>
                    <span className="flex items-center gap-2">
                      <Calendar size={13} />
                      {formattedDate}
                    </span>
                    {post.author && (
                      <span className="flex items-center gap-2">
                        <User size={13} />
                        {post.author}
                      </span>
                    )}
                  </div>
                  
                  <div className="brand-sep-bow w-full opacity-50" />
                </header>
              </StaggerItem>

              <StaggerItem delay={0.3}>
                {/* Excerpt Blockquote */}
                <blockquote className={`relative px-8 py-6 mb-12 rounded-2xl bg-gradient-to-br from-brand-primary/10 to-transparent border-l-2 border-brand-primary shadow-lg ${isRtl ? 'border-l-0 border-r-2 text-right pl-0 pr-8' : ''}`}>
                  <p className="text-lg md:text-2xl font-serif text-slate-100 italic leading-relaxed">
                    &quot;{excerpt}&quot;
                  </p>
                </blockquote>
              </StaggerItem>

              <StaggerItem delay={0.4}>
                {/* Main Content */}
                <article
                  className={`prose prose-invert prose-lg max-w-none 
                    prose-p:text-slate-100 prose-p:leading-loose prose-p:mb-8
                    prose-headings:font-serif prose-headings:text-white prose-headings:font-bold
                    prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:text-white/95
                    prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-5 prose-h3:text-white/85
                    prose-strong:text-brand-secondary prose-strong:font-bold
                    prose-a:text-brand-secondary prose-a:no-underline hover:prose-a:underline transition-all
                    prose-blockquote:border-brand-primary prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic
                    prose-li:text-slate-200 prose-li:mb-2
                    prose-img:rounded-3xl prose-img:border prose-img:border-white/10
                    ${isRtl ? 'text-right prose-p:text-right prose-headings:text-right' : 'text-left'}`}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </StaggerItem>

        {/* Download Section */}
        {post.downloadUrl && (
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-brand-primary/10 to-white/5 border border-white/10 shadow-xl">
            <p className="text-white/60 text-sm mb-4">
              {locale === 'ar' ? 'مرفق ملف للقراءة لاحقاً بجودة عالية' : 'Attached high-quality file for later reading'}
            </p>
            <a
              href={post.downloadUrl}
              download
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-brand-primary text-white font-bold text-sm uppercase tracking-widest hover:bg-brand-secondary hover:shadow-[0_0_20px_rgba(160,6,28,0.4)] transition-all duration-300"
            >
              <Download size={16} />
              {locale === 'ar' ? 'تحميل المجلة (PDF)' : 'Download Journal (PDF)'}
            </a>
          </div>
        )}

        {/* Interactions & Comments */}
        <ArticleInteractions 
           locale={locale} 
           translations={{
             shareTitle: t?.('shareTitle') || (locale === 'ar' ? 'شارك القصة' : 'Share'),
             commentsTitle: t?.('commentsTitle') || (locale === 'ar' ? 'مجلس النقاش' : 'Comments'),
             placeholderComment: t?.('placeholderComment') || (locale === 'ar' ? 'اكتب انطباعك هنا...' : 'Write here...'),
             postComment: t?.('postComment') || (locale === 'ar' ? 'إضافة تعليق' : 'Post')
           }}
        />

        {/* Media / Video Section */}
        {post.mediaUrl && (
          <div className="mt-16 aspect-video rounded-3xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-center relative z-10 transition-transform duration-500 group-hover:scale-105">
              <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-6">
                <Video size={32} className="text-white" />
              </div>
              <p className="text-white/50 text-sm mb-4">
                {locale === 'ar' ? 'فيلم وثائقي مرتبط' : 'Related documentary film'}
              </p>
              <a
                href={post.mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-secondary text-sm font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                {locale === 'ar' ? 'مشاهدة الآن عبر الموقع' : 'Watch Now'}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}

              <div className="my-24 brand-sep-bow opacity-20" />

              {/* Related Posts */}
              {related.length > 0 && (
                <section className="bg-surface-dark/40 backdrop-blur-sm p-8 rounded-[40px] border border-white/5">
                  <h2 className={`text-2xl font-serif font-bold text-white mb-10 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t?.('relatedTitle') || (locale === 'ar' ? 'قد يهمك أيضاً' : 'Related Posts')}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {related.map((relPost) => {
                      const relTitle = relPost.title[locale as keyof typeof relPost.title] || relPost.title.en;
                      const relExcerpt = relPost.excerpt[locale as keyof typeof relPost.excerpt] || relPost.excerpt.en;
                      return (
                        <Link
                          key={relPost.id}
                          href={`/${locale}/heritage/${relPost.slug}`}
                          className="group flex flex-col sm:flex-row gap-5 p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                        >
                          <div className="relative w-full sm:w-28 aspect-square sm:h-28 rounded-2xl overflow-hidden flex-shrink-0">
                            <NextImage src={relPost.image} alt={relTitle} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                          </div>
                          <div className={`flex flex-col justify-center ${isRtl ? 'text-right' : 'text-left'}`}>
                            <h3 className="text-base font-serif font-semibold text-white leading-snug mb-2 group-hover:text-brand-secondary transition-colors line-clamp-2">
                              {relTitle}
                            </h3>
                            <p className="text-sm text-white/40 line-clamp-2 leading-relaxed">{relExcerpt}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </ArticleWrapper>
    </main>
  );
}
