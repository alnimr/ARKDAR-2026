import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { mockJournalPosts } from '@/data/mockJournal';
import NextImage from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Video,
  Download,
  Newspaper,
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

  const t = await getTranslations('Heritage').catch(() => null);
  const isRtl = locale === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  // Safe date formatting
  try {
    const d = new Date(post.date);
    if (!isNaN(d.getTime())) {
      // Logic for date is handled in sidebar, but we keep the try/catch if needed for other metadata
    }
  } catch {
    //
  }


  const related = mockJournalPosts
    .filter((p) => p.id !== post.id && p.content)
    .slice(0, 2);

  return (
    <main
      className="min-h-screen bg-background pt-32 pb-40 relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <ArticleReadingProgress />
      <div className="fixed inset-0 brand-horse-bg opacity-[0.02] grayscale pointer-events-none z-0" />
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-primary/4 blur-[140px]" />
      </div>

      <div className="relative z-10 container-sovereign mx-auto px-6">
          <Link
            href={`/${locale}/heritage`}
            className="inline-flex items-center gap-3 text-[10px] font-latin font-bold uppercase tracking-[0.3em] text-brand-primary/50 hover:text-brand-primary transition-all duration-300 mb-16 group"
          >
            <BackIcon size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            {t?.('backToJournal') || (locale === 'ar' ? 'العودة للديوان' : 'Back to Journal')}
          </Link>

          <div className={`flex flex-col lg:flex-row gap-12 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
            {/* Sidebar Desktop */}
            <div className="w-full lg:w-72 flex-shrink-0">
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
            </div>

            {/* Content Column - Strictly 720px via ArticleWrapper */}
            <div className="flex-1">
              <ArticleWrapper>
                <div className="reading-sanctuary">
                  <StaggerItem delay={0.1}>
                    {/* Hero Image */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden mb-16 border border-sovereign shadow-sovereign cinema-lut">
                      <NextImage
                        src={post.image}
                        alt={title}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 896px) 100vw, 896px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                    </div>
                  </StaggerItem>

                  <StaggerItem delay={0.2}>
                    <header className="mb-16">
                      <div className={`flex items-center gap-3 mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span className="inline-flex items-center gap-2 px-4 py-2 border border-sovereign layer-2 text-brand-primary text-[9px] font-latin font-bold uppercase tracking-[0.2em]">
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

                      <h1 className={`text-4xl md:text-7xl font-title font-bold text-brand-primary leading-[1.1] mb-12 uppercase tracking-tighter ${isRtl ? 'text-right' : 'text-left'}`}>
                        {title}
                      </h1>
                    </header>
                  </StaggerItem>

                  <StaggerItem delay={0.3}>
                    {/* Excerpt Blockquote */}
                    <blockquote className={`relative px-10 py-8 mb-20 layer-2 border-sovereign border-l-4 ${isRtl ? 'border-l-0 border-r-4 text-right' : 'text-left'}`}>
                      <p className="text-xl md:text-3xl font-title text-foreground/80 leading-relaxed italic">
                        &quot;{excerpt}&quot;
                      </p>
                    </blockquote>
                  </StaggerItem>

                  <StaggerItem delay={0.4}>
                    {/* Main Content */}
                    <article
                      className={`arkdar-article-body prose-sovereign
                        ${isRtl ? 'text-right' : 'text-left'}`}
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </StaggerItem>

                  {/* Download Section (Integrated) */}
                  {post.downloadUrl && (
                    <div className="mt-24 p-12 layer-2 border border-sovereign relative overflow-hidden group">
                      <div className="absolute inset-0 brand-horse-bg opacity-[0.02] -mr-10 -mb-10 rotate-12 transition-transform duration-700 group-hover:scale-110" />
                      <p className="text-foreground/40 text-xs mb-6 font-latin font-bold uppercase tracking-widest relative">
                        {t?.('downloadCaption') || (locale === 'ar' ? 'مرفق ملف للقراءة لاحقاً بجودة عالية' : 'Official Archive Record')}
                      </p>
                      <a
                        href={post.downloadUrl}
                        download
                        className="inline-flex items-center gap-4 px-10 py-5 bg-brand-primary text-white font-latin font-bold text-xs uppercase tracking-[0.3em] hover:bg-brand-secondary transition-all duration-500 hover-lift relative"
                      >
                        <Download size={16} strokeWidth={2.5} />
                        {t?.('downloadButton') || (locale === 'ar' ? 'تحميل المجلة (PDF)' : 'Download Archive')}
                      </a>
                    </div>
                  )}
                </div>

                <ArticleInteractions 
                   locale={locale} 
                   translations={{
                     shareTitle: t?.('shareTitle') || (locale === 'ar' ? 'شارك القصة' : 'Share Heritage'),
                     commentsTitle: t?.('commentsTitle') || (locale === 'ar' ? 'مجلس النقاش' : 'Majlis Discussion'),
                     placeholderComment: t?.('placeholderComment') || (locale === 'ar' ? 'اكتب انطباعك هنا...' : 'Share your impression...'),
                     postComment: t?.('postComment') || (locale === 'ar' ? 'إضافة تعليق' : 'Join Council')
                   }}
                />

                {/* Related Posts */}
                {related.length > 0 && (
                  <section className="mt-32 pt-20 border-t border-brand-primary/5">
                    <h2 className={`text-2xl font-title font-bold text-brand-primary mb-12 uppercase tracking-tight ${isRtl ? 'text-right' : 'text-left'}`}>
                      {t?.('relatedTitle') || (locale === 'ar' ? 'سجلات ذات صلة' : 'Related Records')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {related.map((relPost) => {
                        const relTitle = relPost.title[locale as keyof typeof relPost.title] || relPost.title.en;
                        return (
                          <Link
                            key={relPost.id || relPost.slug}
                            href={`/${locale}/heritage/${relPost.slug}`}
                            className="group flex flex-col gap-6"
                          >
                            <div className="relative aspect-[16/9] overflow-hidden border border-sovereign layer-1 cinema-lut">
                              <NextImage src={relPost.image} alt={relTitle} fill className="object-cover group-hover:scale-110 transition-transform duration-[1200ms]" />
                            </div>
                            <div className={`${isRtl ? 'text-right' : 'text-left'}`}>
                              <h3 className="text-xl font-latin font-bold text-brand-primary leading-snug group-hover:text-brand-secondary transition-colors line-clamp-2 uppercase">
                                {relTitle}
                              </h3>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                )}
              </ArticleWrapper>
            </div>
          </div>
      </div>
    </main>
  );
}
