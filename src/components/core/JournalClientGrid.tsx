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
        <div className={`flex flex-wrap justify-center gap-4 ${isRtl ? 'md:justify-start' : 'md:justify-start'}`}>
          {CATEGORIES.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-[10px] font-latin font-bold uppercase tracking-[0.2em] border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-primary border-brand-primary text-white scale-105 shadow-lg'
                    : 'layer-2 border-sovereign text-foreground/40 hover:text-brand-primary hover:border-brand-primary/30 hover:scale-105'
                }`}
              >
                {tab[locale as 'ar' | 'en' | 'de' | 'es'] ?? tab.en}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-96 group">
          <div className={`absolute inset-y-0 ${isRtl ? 'right-5' : 'left-5'} flex items-center pointer-events-none text-brand-primary/30 group-focus-within:text-brand-primary transition-colors`}>
            <Search size={18} strokeWidth={1.5} />
          </div>
          <input
            type="text"
            placeholder={locale === 'ar' ? 'ابحث في التراث...' : locale === 'en' ? 'Search Heritage...' : locale === 'de' ? 'Erbe durchsuchen...' : 'Buscar Herencia...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full layer-2 border border-sovereign py-4 ${isRtl ? 'pr-14 pl-6 text-right' : 'pl-14 pr-6 text-left'} text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-brand-primary/40 focus:bg-brand-primary/[0.03] transition-all font-body text-sm`}
            dir={isRtl ? 'rtl' : 'ltr'}
          />
        </div>
      </div>

      <div className="min-h-[500px]">
        {filteredPosts.length === 0 ? (
           <div className="text-center py-32 layer-2 border border-sovereign relative overflow-hidden">
             <div className="absolute inset-0 brand-horse-bg opacity-[0.03] grayscale" />
             <p className="text-xl md:text-2xl font-title text-brand-primary/40 uppercase tracking-widest relative">
               {locale === 'ar' ? 'عذراً.. لا توجد سجلات تطابق بحثك' : 'No records match your legacy search'}
             </p>
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
