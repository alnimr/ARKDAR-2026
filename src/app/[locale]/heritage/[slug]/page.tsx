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

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Generate static params
/*
export async function generateStaticParams() {
  try {
    return mockJournalPosts
      .filter(post => post && post.slug)
      .map((post) => ({
        slug: String(post.slug),
      }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}
*/

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

  const title = post.title?.[locale as keyof typeof post.title] || post.title?.en || post.title?.ar || 'Untitled Article';
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
  
  const title = post.title?.[locale as keyof typeof post.title] || post.title?.ar || "";
  const content = post.content?.[locale as keyof typeof post.content] || post.content?.ar || "";
  const excerpt = post.excerpt?.[locale as keyof typeof post.excerpt] || post.excerpt?.ar || "";

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
  } catch {
    formattedDate = post.date;
  }


  const related = mockJournalPosts
    .filter((p) => p.id !== post.id && p.content)
    .slice(0, 2);

  return (
    <main
      className="min-h-screen bg-background pt-24 pb-32 relative overflow-x-hidden"
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
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[3px] text-text-muted hover:text-brand-primary transition-colors duration-300 mb-12 group"
          >
            <BackIcon size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            {t?.('backToJournal') || (locale === 'ar' ? 'العودة للديوان' : 'Back to Journal')}
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
                <div className="relative w-full aspect-[16/8] rounded-3xl overflow-hidden mb-12 border border-brand-secondary/10 shadow-2xl">
                  <NextImage
                    src={post.image}
                    alt={title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 896px) 100vw, 896px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                </div>
              </StaggerItem>

              <StaggerItem delay={0.2}>
                <header className="mb-12">
                  <div className={`flex items-center gap-2 mb-5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-secondary/5 border border-brand-secondary/10 text-brand-secondary text-[10px] font-bold uppercase tracking-widest">
                      <TypeIcon size={12} />
                      {post.type === 'article'
                        ? (t?.('typeArticle') || (locale === 'ar' ? 'مقالة' : 'Article'))
                        : post.type === 'media' || post.type === 'video'
                        ? (t?.('typeVideo') || (locale === 'ar' ? 'فيديو' : 'Video'))
                        : post.type === 'download'
                        ? (t?.('typeDownload') || (locale === 'ar' ? 'تحميل' : 'Download'))
                        : (t?.('typeNews') || (locale === 'ar' ? 'أخبار' : 'News'))}
                    </span>
                  </div>

                  <h1 className={`text-3xl md:text-5xl font-serif font-bold text-text-primary leading-tight mb-6 ${isRtl ? 'text-right overflow-wrap-anywhere' : 'text-left'}`}>
                    {title}
                  </h1>

                  {/* Mobile Metadata (Hidden on Desktop) */}
                  <div className={`flex lg:hidden flex-wrap items-center gap-x-6 gap-y-2 text-text-muted text-sm mb-8 ${isRtl ? 'flex-row-reverse justify-end' : ''}`}>
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
                <blockquote className={`relative px-8 py-6 mb-12 rounded-2xl bg-brand-secondary/5 border-l-2 border-brand-primary shadow-lg ${isRtl ? 'border-l-0 border-r-2 text-right pl-0 pr-8' : ''}`}>
                  <p className="text-lg md:text-2xl font-serif text-text-primary italic leading-relaxed">
                    &quot;{excerpt}&quot;
                  </p>
                </blockquote>
              </StaggerItem>

              <StaggerItem delay={0.4}>
                {/* Main Content */}
                <article
                  className={`prose dark:prose-invert prose-lg max-w-none 
                    prose-p:text-text-primary prose-p:leading-loose prose-p:mb-8
                    prose-headings:font-serif prose-headings:text-text-primary prose-headings:font-bold
                    prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8
                    prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-5
                    prose-strong:text-brand-primary prose-strong:font-bold
                    prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline transition-all
                    prose-blockquote:border-brand-primary prose-blockquote:bg-brand-secondary/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic
                    prose-li:text-text-primary prose-li:mb-2
                    prose-img:rounded-3xl prose-img:border prose-img:border-brand-secondary/10
                    ${isRtl ? 'text-right prose-p:text-right prose-headings:text-right' : 'text-left'}`}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </StaggerItem>

        {/* Download Section */}
        {post.downloadUrl && (
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-brand-primary/10 to-white/5 border border-white/10 shadow-xl">
            <p className="text-white/60 text-sm mb-4">
              {t?.('downloadCaption') || (locale === 'ar' ? 'مرفق ملف للقراءة لاحقاً بجودة عالية' : 'Attached high-quality file for later reading')}
            </p>
            <a
              href={post.downloadUrl}
              download
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-brand-primary text-white font-bold text-sm uppercase tracking-widest hover:bg-brand-secondary hover:shadow-[0_0_20px_rgba(160,6,28,0.4)] transition-all duration-300"
            >
              <Download size={16} />
              {t?.('downloadButton') || (locale === 'ar' ? 'تحميل المجلة (PDF)' : 'Download Journal (PDF)')}
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
          <div className="mt-16 aspect-video rounded-3xl overflow-hidden bg-black/60 border border-brand-secondary/10 flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-center relative z-10 transition-transform duration-500 group-hover:scale-105">
              <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-6">
                <Video size={32} className="text-white" />
              </div>
              <p className="text-white/50 text-sm mb-4">
                {t?.('relatedDocumentary') || (locale === 'ar' ? 'فيلم وثائقي مرتبط' : 'Related documentary film')}
              </p>
              <a
                href={post.mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-secondary text-sm font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                {t?.('watchNow') || (locale === 'ar' ? 'مشاهدة الآن عبر الموقع' : 'Watch Now')}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}

              <div className="my-24 brand-sep-bow opacity-20" />

              {/* Related Posts */}
              {related.length > 0 && (
                <section className="bg-brand-secondary/5 backdrop-blur-sm p-8 rounded-[40px] border border-brand-secondary/10">
                  <h2 className={`text-2xl font-serif font-bold text-text-primary mb-10 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t?.('relatedTitle') || (locale === 'ar' ? 'قد يهمك أيضاً' : 'Related Posts')}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {related.map((relPost) => {
                      const relTitle = relPost.title[locale as keyof typeof relPost.title] || relPost.title.en;
                      const relExcerpt = relPost.excerpt[locale as keyof typeof relPost.excerpt] || relPost.excerpt.en;
                      return (
                        <Link
                          key={relPost.id || relPost.slug}
                          href={`/${locale}/heritage/${relPost.slug}`}
                          className="group flex flex-col sm:flex-row gap-5 p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                        >
                          <div className="relative w-full sm:w-28 aspect-square sm:h-28 rounded-2xl overflow-hidden flex-shrink-0">
                            <NextImage src={relPost.image} alt={relTitle} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                          </div>
                          <div className={`flex flex-col justify-center ${isRtl ? 'text-right' : 'text-left'}`}>
                            <h3 className="text-base font-serif font-semibold text-text-primary leading-snug mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                              {relTitle}
                            </h3>
                            <p className="text-sm text-text-muted line-clamp-2 leading-relaxed">{relExcerpt}</p>
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
