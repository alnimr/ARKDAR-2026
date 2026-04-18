'use client';

import { useState } from 'react';
import { JournalPost } from '@/types/journal';
import { CATEGORIES } from '@/data/mockJournal';
import JournalCard from './JournalCard';
import Icon from './Icon';

interface JournalClientGridProps {
  posts: JournalPost[];
  locale: string;
}

export default function JournalClientGrid({ posts, locale }: JournalClientGridProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isRtl = locale === 'ar';

  const filteredPosts = posts.filter(post => {
    // Category filter
    const matchCategory = activeTab === 'all' || post.categoryId === activeTab;
    
    // Search filter
    const query = searchQuery.toLowerCase();
    const title = (post.title?.[locale as keyof typeof post.title] || '').toLowerCase();
    const excerpt = (post.excerpt?.[locale as keyof typeof post.excerpt] || '').toLowerCase();
    
    const matchSearch = query === '' || title.includes(query) || excerpt.includes(query);

    return matchCategory && matchSearch;
  });

  return (
    <>
      <div className="max-w-7xl mx-auto mb-16 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Category Tabs */}
        <div className={`flex flex-wrap justify-center gap-6 ${isRtl ? 'md:justify-start' : 'md:justify-start'}`}>
          {CATEGORIES.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-10 py-4 text-[11px] font-brand font-bold uppercase tracking-[0.4em] border transition-all duration-cine cursor-pointer ${
                  isActive
                    ? 'bg-gold border-gold text-black depth-card'
                    : 'layer-1 border-quiet text-ghost/60 hover:text-gold hover:border-gold/40 hover:bg-gold/5'
                }`}
              >
                {tab[locale as 'ar' | 'en' | 'de' | 'es'] ?? tab.en}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-[400px] group">
          <div className={`absolute inset-y-0 ${isRtl ? 'right-8' : 'left-8'} flex items-center pointer-events-none text-gold/30 group-focus-within:text-gold transition-colors duration-cine`}>
            <Icon name="search" size={20} />
          </div>
          <input
            type="text"
            placeholder={locale === 'ar' ? 'ابحث في السجل...' : locale === 'en' ? 'SEARCH THE ARCHIVES...' : locale === 'de' ? 'ARCHIVE DURCHSUCHEN...' : 'BUSCAR EN ARCHIVOS...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full layer-1 border border-quiet py-6 ${isRtl ? 'pr-20 pl-8 text-right' : 'pl-20 pr-8 text-left'} text-white placeholder:text-ghost/30 focus:outline-none focus:border-gold/40 focus:layer-2 transition-all duration-cine font-brand text-lg tracking-tighter uppercase`}
            dir={isRtl ? 'rtl' : 'ltr'}
          />
        </div>
      </div>

      <div className="min-h-[800px]">
        {filteredPosts.length === 0 ? (
           <div className="text-center py-64 layer-1 border border-quiet relative overflow-hidden">
             <div className="absolute inset-0 opacity-[0.03] cinema-lut pointer-events-none" />
             <p className="text-2xl md:text-3xl font-brand font-bold text-gold/30 uppercase tracking-[0.8em] relative">
                {locale === 'ar' ? 'لا توجد سجلات تطابق بحثك' : 'NO RECORDS FOUND'}
             </p>
           </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {filteredPosts.map((post, i) => (
              <JournalCard key={post.id || i} post={post} locale={locale} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
