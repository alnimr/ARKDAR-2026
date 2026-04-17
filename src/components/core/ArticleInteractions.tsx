'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, Link as LinkIcon, Send, MoreHorizontal } from 'lucide-react';

interface ArticleInteractionsProps {
  locale: string;
  translations: {
    shareTitle: string;
    commentsTitle: string;
    placeholderComment: string;
    postComment: string;
  };
}

export default function ArticleInteractions({ locale, translations }: ArticleInteractionsProps) {
  const [likes, setLikes] = useState(124);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, user: 'Malek A.', text: 'The depth of research here is amazing. The Mamluk connection is so clear.', date: '2 days ago' },
    { id: 2, user: 'Sami R.', text: 'Is there a workshop for this specific technique in Cairo?', date: '5h ago' }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };

  const postComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([{ 
      id: Date.now(), 
      user: 'You', 
      text: newComment, 
      date: 'Just now' 
    }, ...comments]);
    setNewComment('');
  };

  return (
    <div className="mt-32 border-t border-brand-primary/5 pt-20">
      {/* ── Engagement Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-10 mb-20 pb-16 border-b border-brand-primary/5">
        <div className="flex items-center gap-10">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-3 group transition-all ${isLiked ? 'text-brand-primary' : 'text-foreground/30 hover:text-brand-primary'}`}
          >
            <div className={`w-14 h-14 border border-sovereign flex items-center justify-center transition-all ${isLiked ? 'bg-brand-primary/10 border-brand-primary' : 'layer-2 group-hover:border-brand-primary/30 group-hover:scale-110'}`}>
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} className="transition-transform duration-[400ms] group-active:scale-150" />
            </div>
            <span className="font-latin font-bold text-sm">{likes}</span>
          </button>

          <div className="flex items-center gap-3 text-foreground/30">
            <div className="w-14 h-14 border border-sovereign layer-2 flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <span className="font-latin font-bold text-sm">{comments.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-latin font-bold uppercase tracking-[0.4em] text-brand-primary/30 mr-2">{translations.shareTitle}</span>
          {[
            { icon: Share2, label: 'Share', color: 'hover:bg-brand-primary' },
            { icon: LinkIcon, label: 'Copy Link', color: 'hover:bg-brand-primary' }
          ].map((social, i) => (
            <button 
               key={i}
               aria-label={social.label}
               title={social.label}
               className={`w-12 h-12 border border-sovereign layer-2 flex items-center justify-center text-foreground/30 hover:text-white transition-all duration-300 ${social.color}`}
            >
               <social.icon size={16} />
            </button>
          ))}
          <button 
            aria-label="More share options"
            title="More share options"
            className="w-12 h-12 border border-sovereign layer-2 flex items-center justify-center text-foreground/30 hover:text-white hover:bg-brand-secondary transition-all"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* ── Council Chamber (Comments) ── */}
      <div className="max-w-3xl">
        <h3 className="text-3xl font-title text-brand-primary mb-12 flex items-center gap-5 uppercase tracking-tight">
           {translations.commentsTitle}
           <span className="text-xs font-latin font-bold text-brand-primary/40 bg-brand-primary/5 py-1.5 px-4">{comments.length}</span>
        </h3>

        {/* Comment Input */}
        <form onSubmit={postComment} className="mb-20 relative group">
          <textarea 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={translations.placeholderComment}
            className="w-full layer-2 border border-sovereign p-8 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-brand-primary/40 transition-all min-h-[160px] font-body text-base"
          />
          <button 
            type="submit"
            disabled={!newComment.trim()}
            className={`absolute bottom-6 ${locale === 'ar' ? 'left-6' : 'right-6'} px-10 py-4 bg-brand-primary text-white text-[10px] font-latin font-bold uppercase tracking-[0.2em] flex items-center gap-3 transition-all hover:bg-brand-secondary disabled:opacity-0 disabled:translate-y-4`}
          >
            {translations.postComment}
            <Send size={14} className={locale === 'ar' ? 'rotate-180' : ''} />
          </button>
        </form>

        {/* Previous Comments */}
        <div className="space-y-12">
          {comments.map((comment) => (
            <div key={comment.id} className="animate-fade-in group/item">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 layer-2 border border-sovereign flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-brand-primary/[0.03] to-transparent">
                   <span className="text-brand-primary font-title font-bold text-xl">{comment.user[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-brand-primary font-body font-bold text-sm tracking-wide">{comment.user}</h4>
                    <span className="text-[9px] font-latin font-bold text-foreground/20 uppercase tracking-[0.2em]">{comment.date}</span>
                  </div>
                  <p className="text-foreground/60 text-base leading-relaxed font-body">{comment.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
