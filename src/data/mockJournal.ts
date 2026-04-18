import { JournalPost, JournalType } from "../types/journal";

import articlesRaw from "./articles.json";

// Ultimate Safety Switch: Force serialization and convert any remaining undefined to ""
const articles = JSON.parse(JSON.stringify(articlesRaw, (k, v) => v === undefined ? "" : v)) as Array<RawArticle>;

export const CATEGORIES = [
  { id: 'all', ar: 'الكل', en: 'All', de: 'Alle', es: 'Todos' },
  { id: 'heritage', ar: 'التراث', en: 'Heritage', de: 'Erbe', es: 'Herencia' },
  { id: 'craftsmanship', ar: 'الحرفية', en: 'Craftsmanship', de: 'Handwerkskunst', es: 'Artesanía' },
  { id: 'lifestyle', ar: 'نمط الحياة', en: 'Lifestyle', de: 'Lebensstil', es: 'Estilo de vida' },
  { id: 'equestrian', ar: 'الفروسية', en: 'Equestrian', de: 'Reitsport', es: 'Ecuestre' }
];

function cleanHtmlContent(html: string): string {
  if (!html) return "";
  
  let cleaned = html
    .replace(/\[caption[^\]]*\][\s\S]*?\[\/caption\]/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&rsquo;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&lrm;/g, '') // Remove left-to-right mark
    .replace(/&rlm;/g, '') // Remove right-to-left mark
    .trim();

  // If the content after stripping HTML tags is empty, return "" to allow fallback
  const textOnly = cleaned.replace(/<[^>]*>/g, "").trim();
  if (textOnly === "" && !cleaned.includes("<img")) {
    return "";
  }

  // Remove WordPress Shortcodes
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

interface RawArticle {
  id: string;
  slug: string;
  date: string;
  type: string;
  status: string;
  title: { ar: string; en: string; de: string; es: string };
  excerpt: { ar: string; en: string; de: string; es: string };
  content: { ar: string; en: string; de: string; es: string };
}

// Map extracted articles to the JournalPost interface with strict filtering
export const mockJournalPosts: JournalPost[] = articles
  .filter((art) => art && art.id && art.slug && art.title && art.content)
  .map((art) => {
  // Robust date parsing
  let formattedDate = '2024-01-01';
  if (art.date && typeof art.date === 'string') {
    formattedDate = art.date.split(' ')[0];
  }

  // Clean content for all available languages
  const cleanedContent = {
    ar: cleanHtmlContent(art.content.ar || ""),
    en: cleanHtmlContent(art.content.en || ""),
    de: cleanHtmlContent(art.content.de || ""),
    es: cleanHtmlContent(art.content.es || "")
  };

  const title = {
    ar: art.title.ar || "",
    en: art.title.en || "",
    de: art.title.de || "Titel nicht verfügbar",
    es: art.title.es || "Título no disponible"
  };

  const excerpt = {
    ar: art.excerpt.ar || "",
    en: art.excerpt.en || "",
    de: art.excerpt.de || "Auszug nicht verfügbar",
    es: art.excerpt.es || "Resumen no disponible"
  };

  // Detect predominant language (optional usage of helper to satisfy lint)
  const isArabic = isPredominantlyArabic(art.title?.ar || "");

  return {
    id: art.id || `arkdar_auto_${art.slug || 'missing'}`,
    slug: art.slug || art.id || `article-${art.id || 'missing'}`,
    type: (art.type as JournalType) || 'article',
    categoryId: 'heritage',
    title,
    excerpt,
    content: cleanedContent,

    date: formattedDate,
    isArabic,
    author: {
      ar: 'أركدار',
      en: 'ARKDAR',
      de: 'ARKDAR',
      es: 'ARKDAR'
    },
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

