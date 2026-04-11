'use client';

import { useState } from 'react';
import { JournalPost } from '@/types/journal';
import { CATEGORIES } from '@/data/mockJournal';
import JournalCard from './JournalCard';
import { Search } from 'lucide-react';

interface JournalClientGridProps {
  posts: JournalPost[];
  locale: string;
}

export default function JournalClientGrid({ posts, locale }: JournalClientGridProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isRtl = locale === 'ar';

  const filteredPosts = posts.filter(post => {
    // Only show published articles
    // if (post.status !== 'published') return false;

    // Category filter
    const matchCategory = activeTab === 'all' || post.categoryId === activeTab;
    
    // Search filter
    const query = searchQuery.toLowerCase();
    const title = (post.title?.[locale as keyof typeof post.title] || post.title?.en || post.title?.ar || '').toLowerCase();
    const excerpt = (post.excerpt?.[locale as keyof typeof post.excerpt] || post.excerpt?.en || post.excerpt?.ar || '').toLowerCase();
    
    const matchSearch = query === '' || title.includes(query) || excerpt.includes(query);

    return matchCategory && matchSearch;
  });

  return (
    <>
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Category Tabs */}
        <div className={`flex flex-wrap justify-center gap-3 ${isRtl ? 'md:justify-start' : 'md:justify-start'}`}>
          {CATEGORIES.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all cursor-pointer
                  ${isActive
                    ? 'bg-brand-primary/20 border-brand-primary/40 text-brand-secondary z-10 scale-105'
                    : 'bg-white/[0.03] border-white/10 text-white/30 hover:text-white/60 hover:border-white/20 hover:scale-105'}`}
              >
                {tab[locale as 'ar' | 'en' | 'de' | 'es'] ?? tab.en}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80 group">
          <div className={`absolute inset-y-0 ${isRtl ? 'right-4' : 'left-4'} flex items-center pointer-events-none text-white/30 group-focus-within:text-brand-secondary transition-colors`}>
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder={locale === 'ar' ? 'بحث...' : locale === 'en' ? 'Search...' : locale === 'de' ? 'Suche...' : 'Buscar...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-white/[0.02] border border-white/10 rounded-full py-3 ${isRtl ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'} text-white placeholder-white/30 focus:outline-none focus:border-brand-primary/50 focus:bg-white/[0.05] transition-all`}
            dir={isRtl ? 'rtl' : 'ltr'}
          />
        </div>
      </div>

      <div className="min-h-[500px]">
        {filteredPosts.length === 0 ? (
           <div className="text-center text-white/40 py-20 font-serif text-xl border border-white/5 rounded-3xl bg-white/[0.02]">
             {locale === 'ar' ? 'لا توجد مقالات تطابق بحثك.' : 'No articles match your search.'}
           </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => (
              <JournalCard key={post.id || i} post={post} locale={locale} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
