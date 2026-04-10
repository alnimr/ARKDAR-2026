'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, ExternalLink, Link as LinkIcon, Send, MoreHorizontal } from 'lucide-react';

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
    <div className="mt-20 border-t border-white/5 pt-16">
      {/* ── Engagement Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-8 mb-16 pb-12 border-b border-white/5">
        <div className="flex items-center gap-8">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 group transition-all ${isLiked ? 'text-brand-primary' : 'text-white/40 hover:text-white'}`}
          >
            <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${isLiked ? 'bg-brand-primary/10 border-brand-primary/40' : 'border-white/10 group-hover:border-white/30 group-hover:scale-110'}`}>
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} className="transition-transform duration-300 group-active:scale-150" />
            </div>
            <span className="font-medium">{likes}</span>
          </button>

          <div className="flex items-center gap-2 text-white/40">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <span className="font-medium">{comments.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[3px] text-white/30 mr-2">{translations.shareTitle}</span>
          {[
            { icon: Share2, label: 'Share', color: 'hover:bg-brand-primary' },
            { icon: ExternalLink, label: 'Share', color: 'hover:bg-[#0077b5]' },
            { icon: LinkIcon, label: 'Copy Link', color: 'hover:bg-brand-primary' }
          ].map((social, i) => (
            <button 
               key={i}
               aria-label={social.label}
               title={social.label}
               className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 ${social.color}`}
            >
               <social.icon size={16} />
            </button>
          ))}
          <button 
            aria-label="More share options"
            title="More share options"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* ── Council Chamber (Comments) ── */}
      <div className="max-w-2xl">
        <h3 className="text-2xl font-serif text-white mb-10 flex items-center gap-4">
           {translations.commentsTitle}
           <span className="text-sm font-sans font-normal text-white/30 bg-white/5 py-1 px-3 rounded-full">{comments.length}</span>
        </h3>

        {/* Comment Input */}
        <form onSubmit={postComment} className="mb-12 relative group">
          <textarea 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={translations.placeholderComment}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-primary/50 transition-all min-h-[120px]"
          />
          <button 
            type="submit"
            disabled={!newComment.trim()}
            className={`absolute bottom-4 ${locale === 'ar' ? 'left-4' : 'right-4'} px-6 py-3 rounded-xl bg-brand-primary text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all hover:bg-brand-secondary disabled:opacity-0 disabled:translate-y-2`}
          >
            {translations.postComment}
            <Send size={14} className={locale === 'ar' ? 'rotate-180' : ''} />
          </button>
        </form>

        {/* Previous Comments */}
        <div className="space-y-8">
          {comments.map((comment) => (
            <div key={comment.id} className="animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary/20 to-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                   <span className="text-brand-primary font-serif italic">{comment.user[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-white font-medium text-sm">{comment.user}</h4>
                    <span className="text-[10px] text-white/20 uppercase tracking-widest">{comment.date}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{comment.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
