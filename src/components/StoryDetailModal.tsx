import React, { useState } from 'react';
import { MemoryItem } from '../types';
import { X, Heart, MessageSquare, MapPin, Clock, Send, Share2 } from 'lucide-react';

interface StoryDetailModalProps {
  story: MemoryItem | null;
  onClose: () => void;
  onLike: (id: string) => void;
}

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({
  story,
  onClose,
  onLike,
}) => {
  if (!story) return null;

  const [comments, setComments] = useState<string[]>([
    '看着老江桥的照片太感动了，小时候天天走那座桥去水头一中上学！',
    '致敬父辈们的辛勤付出，才有了今天中国皮都的繁荣！',
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, newComment.trim()]);
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              老水头回忆录
            </span>
            <span className="text-xs text-stone-500">{story.location}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs text-stone-700 leading-relaxed">
          <h2 className="text-base font-extrabold text-stone-900 leading-snug">
            {story.title}
          </h2>

          <div className="flex items-center justify-between text-[11px] text-stone-500">
            <span>记录者：<strong className="text-stone-800">{story.author}</strong> ({story.authorLocation})</span>
            <span className="text-amber-700 font-mono">跨越：{story.yearOld} → {story.yearNew}</span>
          </div>

          {/* Dual Photos side by side */}
          <div className="grid grid-cols-2 gap-2">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200">
              <img
                src={story.oldImageUrl}
                alt="往昔"
                className="w-full h-36 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-1.5 left-1.5 bg-black/60 text-amber-200 px-2 py-0.5 rounded text-[10px] font-medium">
                往昔 ({story.yearOld})
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-stone-200">
              <img
                src={story.newImageUrl}
                alt="今日"
                className="w-full h-36 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-1.5 left-1.5 bg-black/60 text-emerald-200 px-2 py-0.5 rounded text-[10px] font-medium">
                今日新貌 ({story.yearNew})
              </div>
            </div>
          </div>

          <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 leading-relaxed text-stone-700 text-xs">
            <p className="whitespace-pre-line indent-4">{story.story}</p>
          </div>

          {/* Comments list */}
          <div className="pt-2 border-t border-stone-100">
            <h4 className="font-bold text-xs text-stone-900 mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
              老乡共鸣留言 ({comments.length})
            </h4>
            <div className="space-y-2 mb-3">
              {comments.map((cmt, idx) => (
                <div key={idx} className="bg-stone-50 p-2 rounded-xl text-stone-700 text-xs">
                  <span className="text-stone-400 mr-1.5">水头老乡:</span>
                  {cmt}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="分享你对这里的记忆..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddComment();
                }}
                className="flex-1 px-3 py-1.5 rounded-xl bg-stone-100 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
              <button
                onClick={handleAddComment}
                className="px-3 py-1.5 bg-amber-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1 active:scale-95"
              >
                <Send className="w-3 h-3" />
                留言
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={() => onLike(story.id)}
            className="flex items-center gap-1 text-xs text-stone-700 hover:text-rose-600 font-semibold px-3 py-1.5 bg-white rounded-xl border border-stone-200 shadow-2xs"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>为记忆点赞 ({story.likes})</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white font-semibold text-xs rounded-xl hover:bg-stone-800"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
