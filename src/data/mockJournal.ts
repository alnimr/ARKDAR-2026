import { JournalPost, JournalType } from "../types/journal";

import articlesRaw from "./articles.json";

// Ultimate Safety Switch: Force serialization and convert any remaining undefined to ""
const articles = JSON.parse(JSON.stringify(articlesRaw, (k, v) => v === undefined ? "" : v));

export const CATEGORIES = [
  { id: 'all', ar: 'الكل', en: 'All', de: 'Alle', es: 'Todos' },
  { id: 'heritage', ar: 'التراث', en: 'Heritage', de: 'Erbe', es: 'Herencia' },
  { id: 'craftsmanship', ar: 'الحرفية', en: 'Craftsmanship', de: 'Handwerkskunst', es: 'Artesanía' },
  { id: 'lifestyle', ar: 'نمط الحياة', en: 'Lifestyle', de: 'Lebensstil', es: 'Estilo de vida' },
  { id: 'equestrian', ar: 'الفروسية', en: 'Equestrian', de: 'Reitsport', es: 'Ecuestre' }
];

function cleanHtmlContent(content: string): string {
  if (!content) return '';
  
  // Basic HTML entity cleaning
  let cleaned = content
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&rsquo;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&lrm;/g, '') // Remove left-to-right mark
    .replace(/&rlm;/g, ''); // Remove right-to-left mark

  // Remove WordPress Shortcodes
  cleaned = cleaned.replace(/\[caption[^\]]*\].*?\[\/caption\]/g, ''); 
  cleaned = cleaned.replace(/\[.*?\]/g, ''); 

  // Remove Social Media Hashtags at the end or within
  cleaned = cleaned.replace(/#[\w\u0600-\u06FF]+/g, '');

  // Remove specific promotional phrases seen in migration
  cleaned = cleaned.replace(/ابحث عن أقرب نادي إليك وانضم إلى المرح!/g, '');
  cleaned = cleaned.replace(/شاركونا القصة!/g, '');
  cleaned = cleaned.replace(/هل لديك موقف مضحك حدث لك أثناء الرماية على الخيل؟/g, '');
  cleaned = cleaned.replace(/دعونا نسمع عن أسوأ سهم أطلقته أو أغرب حركة قام بها جوادك في التعليقات!/g, '');

  // Clean redundant whitespace between tags
  cleaned = cleaned.replace(/>\s+</g, '><');

  // Fix multiple line breaks & Convert to HTML Paragraphs if not already HTML
  // If it's pure text with \n, we wrap lines in <p> tags
  if (!cleaned.includes('<p>') && !cleaned.includes('<div')) {
    cleaned = cleaned
      .split(/\n\s*\n/)
      .map(p => `<p>${p.trim().replace(/\n/g, '<br/>')}</p>`)
      .join('');
  } else {
    // If it is already HTML but has some \n inside, convert them to <br/>
    cleaned = cleaned.replace(/\n/g, '<br/>');
  }

  return cleaned.trim();
}

/**
 * Helper to detect if content is predominantly Arabic.
 */
function isPredominantlyArabic(text: string): boolean {
  if (!text) return false;
  const arabicChars = text.match(/[\u0600-\u06FF]/g) || [];
  return arabicChars.length / text.length > 0.3;
}

// Map extracted articles to the JournalPost interface with strict filtering
export const mockJournalPosts: JournalPost[] = (articles as any[])
  .filter((art) => art && art.id && art.slug && art.title && art.content)
  .map((art) => {
  // Robust date parsing
  let formattedDate = '2024-01-01';
  if (art.date && typeof art.date === 'string') {
    formattedDate = art.date.split(' ')[0];
  }

  return {
    id: art.id || `arkdar_auto_${art.slug || 'missing'}`,
    slug: art.slug || art.id || `article-${art.id || 'missing'}`,
    type: (art.type as JournalType) || 'article',
    categoryId: 'heritage',
    title: art.title || { ar: 'عنوان غير متوفر', en: 'Title Unavailable', de: 'Titel nicht verfügbar', es: 'Título no disponible' },
    excerpt: art.excerpt || { ar: 'ملخص غير متوفر', en: 'Excerpt Unavailable', de: 'Auszug nicht verfügbar', es: 'Resumen no disponible' },
    content: art.content || { ar: '', en: '', de: '', es: '' },
    date: formattedDate,
    author: 'أركدار',
    language: 'ar',
    status: (art.status === 'published' || art.status === 'draft') ? art.status : 'published',
    featured: art.id === 'u373770086_inatc_3101' || art.id === 'u373770086_inatc_3416',
    readingTime: {
      ar: '5 دقائق',
      en: '5 min read',
      de: '5 Min. Leszeit',
      es: '5 min de lectura'
    },
    image: `https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200`
  };
});

