export type JournalType = 'article' | 'media' | 'video' | 'download' | 'press' | 'heritage' | 'craftsmanship' | 'lifestyle';

export interface JournalPost {
  id: string;
  slug: string;
  type: JournalType;
  title: {
    ar: string;
    en: string;
    de: string;
    es: string;
  };
  excerpt: {
    ar: string;
    en: string;
    de: string;
    es: string;
  };
  content: {
    ar: string;
    en: string;
    de: string;
    es: string;
  };
  image: string;
  date: string;
  author?: {
    ar: string;
    en: string;
    de: string;
    es: string;
  };
  language: string;
  status: 'published' | 'draft';
  externalLink?: string;
  downloadUrl?: string;
  mediaUrl?: string;
  category?: string;
  categoryId?: string;
  featured?: boolean;
  isArabic?: boolean;
}
