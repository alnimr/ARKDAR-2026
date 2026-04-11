'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, User, Clock, Hash } from 'lucide-react';

interface ArticleSidebarProps {
  post: any;
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

  const readTime = Math.ceil((post.content?.[locale] || post.content?.en || '').split(' ').length / 200) || 5;

  return (
    <aside className={`hidden lg:block w-64 flex-shrink-0 sticky top-32 h-fit ${isRtl ? 'ml-12' : 'mr-12'}`}>
      {/* Metadata Section */}
      <div className="mb-12 space-y-6">
        <div className={`flex flex-col gap-1 ${isRtl ? 'items-start text-right' : 'items-start text-left'}`}>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary/60">
            {translations.date}
          </span>
          <span className="text-white/80 text-sm flex items-center gap-2">
            <Calendar size={14} className="text-brand-primary/50" />
            {formattedDate}
          </span>
        </div>

        {post.author && (
          <div className={`flex flex-col gap-1 ${isRtl ? 'items-start text-right' : 'items-start text-left'}`}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary/60">
              {translations.author}
            </span>
            <span className="text-white/80 text-sm flex items-center gap-2">
              <User size={14} className="text-brand-primary/50" />
              {post.author}
            </span>
          </div>
        )}

        <div className={`flex flex-col gap-1 ${isRtl ? 'items-start text-right' : 'items-start text-left'}`}>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary/60">
            {translations.readTime}
          </span>
          <span className="text-white/80 text-sm flex items-center gap-2">
            <Clock size={14} className="text-brand-primary/50" />
            {readTime} {locale === 'ar' ? 'دقائق قراءة' : 'min read'}
          </span>
        </div>
      </div>

      {/* Table of Contents Section */}
      {headings.length > 0 && (
        <nav className="border-t border-white/5 pt-10">
          <h4 className={`text-[11px] font-bold uppercase tracking-[3px] text-white/30 mb-6 ${isRtl ? 'text-right' : 'text-left'}`}>
            {translations.toc}
          </h4>
          <ul className="space-y-4">
            {headings.map((heading) => (
              <li 
                key={heading.id}
                className={`${isRtl ? 'text-right' : 'text-left'} ${heading.level === 3 ? 'ps-6' : ''}`}
              >
                <a
                  href={`#${heading.id}`}
                  className={`text-sm transition-all duration-300 block hover:text-brand-secondary ${
                    activeId === heading.id 
                      ? 'text-brand-secondary font-semibold translate-x-1' 
                      : 'text-white/40'
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
