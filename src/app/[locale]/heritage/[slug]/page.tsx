import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { mockJournalPosts } from '@/data/mockJournal';
import NextImage from 'next/image';
import Link from 'next/link';
import Icon, { IconName } from '@/components/core/Icon';
import ArticleReadingProgress from '@/components/core/ArticleReadingProgress';
import ArticleInteractions from '@/components/core/ArticleInteractions';
import ArticleSidebar from '@/components/core/ArticleSidebar';
import ArticleWrapper, { StaggerItem } from '@/components/core/ArticleWrapper';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

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

  const title = post.title?.[locale as keyof typeof post.title] || 'Untitled Article';
  const description = (post.excerpt && post.excerpt[locale as keyof typeof post.excerpt]) || '';

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
      authors: [post.author?.[locale as keyof typeof post.author] || 'ARKDAR'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteName}`,
      description,
      images: post.image ? [post.image] : [],
    }
  };
}


const typeIconMap: Record<string, IconName> = {
  article: 'file-text',
  media: 'video',
  video: 'video',
  download: 'download',
  press: 'newspaper',
  news: 'newspaper',
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
  
  const title = post.title?.[locale as keyof typeof post.title] || "";
  const content = post.content?.[locale as keyof typeof post.content] || "";
  const excerpt = post.excerpt?.[locale as keyof typeof post.excerpt] || "";

  const typeIcon = typeIconMap[post.type as keyof typeof typeIconMap] || 'file-text';

  const t = await getTranslations('Heritage').catch(() => null);
  const isRtl = locale === 'ar';
  const backIcon = isRtl ? 'arrow-right' : 'arrow-left';

  const related = mockJournalPosts
    .filter((p) => p.id !== post.id && p.content)
    .slice(0, 2);

  return (
    <main
      className="min-h-screen layer-0 pt-sovereign-nav pb-48 relative overflow-hidden transition-all duration-cine"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <ArticleReadingProgress />
      <div className="fixed inset-0 opacity-[0.02] layer-0 pointer-events-none z-0" />
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
              name: post.author?.[locale as keyof typeof post.author] || "ARKDAR",
            },
            description: excerpt,
          }),
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
          <Link
            href={`/${locale}/heritage`}
            className="inline-flex items-center gap-4 text-[10px] font-latin font-bold uppercase tracking-[0.4em] text-ghost hover:text-gold transition-all duration-base mb-20 group"
          >
            <Icon name={backIcon as IconName} size={14} className="group-hover:-translate-x-1 transition-transform duration-base ease-arrow" />
            {t?.('backToJournal') || (locale === 'ar' ? 'العودة للديوان' : 'Back to Journal')}
          </Link>

          <div className={`flex flex-col lg:flex-row gap-16 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
            {/* Sidebar Desktop */}
            <div className="w-full lg:w-80 flex-shrink-0">
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

            {/* Content Column */}
            <div className="flex-1">
              <ArticleWrapper>
                <div className="reading-sanctuary">
                  <StaggerItem delay={0.1}>
                    {/* Hero Image */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden mb-20 border border-sovereign depth-float cinema-lut">
                      <NextImage
                        src={post.image}
                        alt={title}
                        fill
                        priority
                        className="object-cover transform hover:scale-105 transition-transform duration-[10s] ease-out"
                        sizes="(max-width: 896px) 100vw, 896px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    </div>
                  </StaggerItem>

                  <StaggerItem delay={0.2}>
                    <header className="mb-20">
                      <div className={`flex items-center gap-4 mb-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span className="inline-flex items-center gap-3 px-6 py-2.5 layer-2 border border-quiet text-gold text-[9px] font-latin font-bold uppercase tracking-[0.4em]">
                          <Icon name={typeIcon} size={12} />
                          {post.type === 'article'
                            ? (t?.('typeArticle') || (locale === 'ar' ? 'مقالة' : 'Article'))
                            : post.type === 'media' || post.type === 'video'
                            ? (t?.('typeVideo') || (locale === 'ar' ? 'فيديو' : 'Video'))
                            : post.type === 'download'
                            ? (t?.('typeDownload') || (locale === 'ar' ? 'تحميل' : 'Download'))
                            : (t?.('typeNews') || (locale === 'ar' ? 'أخبار' : 'News'))}
                        </span>
                      </div>

                      <h1 className={`text-5xl md:text-7xl font-brand font-bold text-gold leading-tight mb-16 tracking-tight ${isRtl ? 'text-right' : 'text-left'}`}>
                        {title}
                      </h1>
                    </header>
                  </StaggerItem>

                  <StaggerItem delay={0.3}>
                    {/* Excerpt Blockquote */}
                    <blockquote className={`relative px-12 py-10 mb-24 layer-1 border-quiet border-s-4 ${isRtl ? 'text-right' : 'text-left'} depth-card`}>
                      <p className="text-xl md:text-3xl font-brand text-secondary leading-[1.8] italic">
                        &quot;{excerpt}&quot;
                      </p>
                    </blockquote>
                  </StaggerItem>

                  <StaggerItem delay={0.4}>
                    {/* Main Content */}
                    <article
                      className={`arkdar-article-body prose-sovereign
                        ${isRtl ? 'text-right font-body' : 'text-left font-body'}`}
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </StaggerItem>

                  {/* Download Section */}
                  {post.downloadUrl && (
                    <div className="mt-32 p-16 layer-1 border border-quiet relative overflow-hidden group depth-card">
                      <div className="absolute inset-0 opacity-[0.02] -mr-10 -mb-10 rotate-12 transition-transform duration-cine group-hover:scale-110" />
                      <p className="text-ghost text-[10px] mb-8 font-latin font-bold uppercase tracking-[0.5em] relative">
                        {t?.('downloadCaption') || (locale === 'ar' ? 'مرفق ملف للقراءة لاحقاً بجودة عالية' : 'Official Archive Record')}
                      </p>
                      <a
                        href={post.downloadUrl}
                        download
                        className="btn-sovereign w-fit"
                      >
                        <Icon name="download" size={16} />
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
                  <section className="mt-48 pt-24 border-t border-quiet">
                    <h2 className={`text-2xl font-brand font-bold text-gold mb-16 uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'}`}>
                      {t?.('relatedTitle')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {related.map((relPost) => {
                        const relTitle = relPost.title[locale as keyof typeof relPost.title] || "";
                        return (
                          <Link
                            key={relPost.id || relPost.slug}
                            href={`/${locale}/heritage/${relPost.slug}`}
                            className="group flex flex-col gap-8"
                          >
                            <div className="relative aspect-[16/9] overflow-hidden border border-quiet layer-1 depth-card cinema-lut">
                              <NextImage src={relPost.image} alt={relTitle} fill className="object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out" />
                            </div>
                            <div className={`${isRtl ? 'text-right' : 'text-left'}`}>
                              <h3 className="text-xl font-brand font-bold text-primary leading-snug group-hover:text-gold transition-colors line-clamp-2">
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

