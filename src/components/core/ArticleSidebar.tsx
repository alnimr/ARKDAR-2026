'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, User, Clock } from 'lucide-react';
import { JournalPost } from '@/types/journal';

interface ArticleSidebarProps {
  post: JournalPost;
  locale: string;
  isRtl: boolean;
  translations: {
    date: string;
    author: string;
    readTime: string;
    toc: string;
  };
}

const ArticleSidebar: React.FC<ArticleSidebarProps> = ({
  post,
  locale,
  isRtl,
  translations,
}) => {
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    // Extract headings from the article content after it renders
    const articleElement = document.querySelector('article');
    if (articleElement) {
      const headingElements = Array.from(articleElement.querySelectorAll('h2, h3'));
      const extractedHeadings = headingElements.map((el, index) => {
        const id = el.id || `heading-${index}`;
        if (!el.id) el.id = id;
        return {
          id,
          text: el.textContent || '',
          level: parseInt(el.tagName.replace('H', ''), 10),
        };
      });
      setHeadings(extractedHeadings);
    }

    const handleScroll = () => {
      const headingElements = Array.from(document.querySelectorAll('h2, h3'));
      const scrollPosition = window.scrollY + 100;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i] as HTMLElement;
        if (el.offsetTop <= scrollPosition) {
          setActiveId(el.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post.content]);

  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === 'ar' ? 'ar-SA' : locale === 'de' ? 'de-DE' : locale === 'es' ? 'es-ES' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const readTime = Math.ceil((post.content[locale as keyof typeof post.content] || post.content.en || '').split(' ').length / 200) || 5;

  return (
    <aside className={`hidden lg:block w-64 flex-shrink-0 sticky top-40 h-fit ${isRtl ? 'ml-16' : 'mr-16'}`}>
      {/* Metadata Section */}
      <div className="mb-16 space-y-8">
        <div className={`flex flex-col gap-2 ${isRtl ? 'items-start text-right' : 'items-start text-left'}`}>
          <span className="text-[10px] font-latin font-bold uppercase tracking-[0.3em] text-brand-primary/40">
            {translations.date}
          </span>
          <span className="text-foreground/80 text-xs font-latin font-bold flex items-center gap-3">
            <Calendar size={14} className="text-brand-primary/40" strokeWidth={1.5} />
            {formattedDate}
          </span>
        </div>

        {post.author && (
          <div className={`flex flex-col gap-2 ${isRtl ? 'items-start text-right' : 'items-start text-left'}`}>
            <span className="text-[10px] font-latin font-bold uppercase tracking-[0.3em] text-brand-primary/40">
              {translations.author}
            </span>
            <span className="text-foreground/80 text-xs font-body font-bold flex items-center gap-3">
              <User size={14} className="text-brand-primary/40" strokeWidth={1.5} />
              {post.author}
            </span>
          </div>
        )}

        <div className={`flex flex-col gap-2 ${isRtl ? 'items-start text-right' : 'items-start text-left'}`}>
          <span className="text-[10px] font-latin font-bold uppercase tracking-[0.3em] text-brand-primary/40">
            {translations.readTime}
          </span>
          <span className="text-foreground/80 text-xs font-latin font-bold flex items-center gap-3">
            <Clock size={14} className="text-brand-primary/40" strokeWidth={1.5} />
            {readTime} {locale === 'ar' ? 'دقائق قراءة' : 'MIN READ'}
          </span>
        </div>
      </div>

      {/* Table of Contents Section */}
      {headings.length > 0 && (
        <nav className="border-t border-brand-primary/5 pt-12">
          <h4 className={`text-[10px] font-latin font-bold uppercase tracking-[0.3em] text-brand-primary/30 mb-8 ${isRtl ? 'text-right' : 'text-left'}`}>
            {translations.toc}
          </h4>
          <ul className="space-y-5">
            {headings.map((heading) => (
              <li 
                key={heading.id}
                className={`${isRtl ? 'text-right' : 'text-left'} ${heading.level === 3 ? 'ps-6' : ''}`}
              >
                <a
                  href={`#${heading.id}`}
                  className={`text-[13px] font-body transition-all duration-300 block hover:text-brand-primary ${
                    activeId === heading.id 
                      ? 'text-brand-primary font-bold translate-x-1' 
                      : 'text-foreground/30'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
};

export default ArticleSidebar;
