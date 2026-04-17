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

  const isRtl = locale === 'ar';

  return (
    <div className="mt-40 border-t border-quiet pt-32 font-brand selection:bg-gold selection:text-black">
      {/* ── Engagement Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-16 mb-32 pb-24 border-b border-quiet">
        <div className="flex items-center gap-12">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-6 group transition-all duration-cine ${isLiked ? 'text-gold' : 'text-ghost/40 hover:text-gold'}`}
          >
            <div className={`w-16 h-16 border border-quiet flex items-center justify-center transition-all duration-cine ${isLiked ? 'layer-3 border-gold bg-gold/10' : 'layer-1 group-hover:border-gold'}`}>
              <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} className="transition-transform duration-cine group-active:scale-150" strokeWidth={1} />
            </div>
            <span className="font-brand font-bold text-sm tracking-[0.4em] uppercase">{likes}</span>
          </button>

          <div className="flex items-center gap-6 text-ghost/40">
            <div className="w-16 h-16 border border-quiet layer-1 flex items-center justify-center">
              <MessageCircle size={24} strokeWidth={1} />
            </div>
            <span className="font-brand font-bold text-sm tracking-[0.4em] uppercase">{comments.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <span className="text-[11px] font-brand font-bold uppercase tracking-[0.6em] text-gold/40 mr-4">{translations.shareTitle}</span>
          {[
            { icon: Share2, label: 'Share' },
            { icon: LinkIcon, label: 'Copy Link' }
          ].map((social, i) => (
            <button 
               key={i}
               aria-label={social.label}
               title={social.label}
               className="w-14 h-14 border border-quiet layer-1 flex items-center justify-center text-ghost/60 hover:bg-gold hover:text-black hover:border-gold transition-all duration-cine"
            >
               <social.icon size={20} strokeWidth={1} />
            </button>
          ))}
          <button 
            aria-label="More share options"
            title="More share options"
            className="w-14 h-14 border border-quiet layer-1 flex items-center justify-center text-ghost/60 hover:bg-gold hover:text-black hover:border-gold transition-all duration-cine"
          >
            <MoreHorizontal size={20} strokeWidth={1} />
          </button>
        </div>
      </div>

      {/* ── Council Chamber (Comments) ── */}
      <div className="max-w-4xl">
        <h3 className={`text-4xl font-brand font-bold text-gold mb-20 flex items-center gap-8 uppercase tracking-[0.3em] ${isRtl ? 'text-right' : 'text-left'}`}>
           {translations.commentsTitle}
           <span className="text-[12px] font-brand font-bold text-black bg-gold py-2 px-6">
             {comments.length}
           </span>
        </h3>

        {/* Comment Input */}
        <form onSubmit={postComment} className="mb-32 relative group">
          <textarea 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={translations.placeholderComment}
            className="w-full layer-1 border border-quiet p-12 text-ghost placeholder:text-ghost/30 focus:outline-none focus:border-gold transition-all duration-cine min-h-[200px] font-brand text-lg resize-none"
          />
          <button 
            type="submit"
            disabled={!newComment.trim()}
            className={`absolute bottom-10 ${isRtl ? 'left-10' : 'right-10'} flex items-center gap-4 py-4 px-12 bg-gold text-black text-[11px] font-brand font-bold uppercase tracking-[0.4em] disabled:opacity-0 disabled:translate-y-4 transition-all duration-cine hover:tracking-[0.6em]`}
          >
            {translations.postComment}
            <Send size={16} className={isRtl ? 'rotate-180' : ''} strokeWidth={1.5} />
          </button>
        </form>

        {/* Previous Comments */}
        <div className="space-y-20">
          {comments.map((comment) => (
            <div key={comment.id} className="animate-fade-in group/item">
              <div className={`flex items-start gap-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className="w-20 h-20 layer-2 border border-quiet flex items-center justify-center flex-shrink-0 group-hover/item:border-gold transition-all duration-cine bg-black">
                   <span className="text-gold font-brand font-bold text-3xl">{comment.user[0]}</span>
                </div>
                <div className={`flex-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-gold font-brand font-bold text-base tracking-widest uppercase">{comment.user}</h4>
                    <span className="text-[10px] font-brand font-bold text-ghost/40 uppercase tracking-[0.4em]">{comment.date}</span>
                  </div>
                  <p className="text-ghost/80 text-lg leading-relaxed font-brand font-light italic">{comment.text}</p>
                </div>
              </div>
              <div className="mt-12 h-px bg-quiet/20 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
