import React from 'react';
import { NewsItem } from '../types';
import { X, Eye, Heart, Share2, Calendar, MapPin } from 'lucide-react';

interface NewsDetailModalProps {
  news: NewsItem | null;
  onClose: () => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ news, onClose }) => {
  if (!news) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {news.category}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="p-4 overflow-y-auto space-y-3.5 text-xs text-stone-700 leading-relaxed">
          <h2 className="text-base font-extrabold text-stone-900 leading-snug">
            {news.title}
          </h2>

          <div className="flex items-center justify-between text-[11px] text-stone-400 pb-2 border-b border-stone-100">
            <span className="font-medium text-stone-600">{news.source}</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {news.time}
            </span>
            <span className="flex items-center gap-0.5">
              <Eye className="w-3 h-3" /> {news.views} 次阅读
            </span>
          </div>

          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-48 object-cover rounded-2xl border border-stone-100"
            referrerPolicy="no-referrer"
          />

          <div className="space-y-3 text-stone-700 text-xs">
            {news.content.map((paragraph, idx) => (
              <p key={idx} className="indent-5 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100 text-[11px] text-stone-500 flex items-center justify-between">
            <span>责任编辑：水头发布全媒体中心</span>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(`【水头新闻】${news.title}`);
                  alert('新闻链接已复制，可分享至微信！');
                }
              }}
              className="text-rose-700 font-semibold flex items-center gap-1 hover:underline"
            >
              <Share2 className="w-3.5 h-3.5" /> 分享给老乡
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white font-semibold text-xs rounded-xl hover:bg-stone-800"
          >
            返回
          </button>
        </div>
      </div>
    </div>
  );
};
