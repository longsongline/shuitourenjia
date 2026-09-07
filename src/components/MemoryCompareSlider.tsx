import React, { useState, useRef, useCallback } from 'react';
import { MemoryItem } from '../types';
import { Clock, MapPin, Heart, MessageSquare, Share2, Sparkles } from 'lucide-react';

interface MemoryCompareSliderProps {
  item?: MemoryItem;
  memory?: MemoryItem;
  onLike?: (id: string) => void;
  onOpenStory?: (item: MemoryItem) => void;
}

export const MemoryCompareSlider: React.FC<MemoryCompareSliderProps> = ({
  item,
  memory,
  onLike = (_id: string) => {},
  onOpenStory = (_item: MemoryItem) => {},
}) => {
  const currentItem = item || memory;
  if (!currentItem) return null;

  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-4 transition-all hover:border-gray-200">
      {/* Title & Author Info */}
      <div className="p-4 sm:p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-bold text-[#B91C1C] bg-[#FEF2F2] border border-red-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            水头今昔对比
          </span>
          <span className="text-[11px] text-gray-400 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-gray-400" />
            {currentItem.location}
          </span>
        </div>
        <h3 className="font-bold text-[#1A1A1B] text-base leading-snug">
          {currentItem.title}
        </h3>
        <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
          <span className="font-medium text-[#1A1A1B]">{currentItem.author}</span>
          <span>•</span>
          <span className="text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md text-[10px] font-medium border border-gray-100">
            {currentItem.authorLocation}
          </span>
        </div>
      </div>

      {/* Interactive Drag Before-After Image Slider */}
      <div
        ref={containerRef}
        className="relative h-60 sm:h-72 select-none cursor-ew-resize overflow-hidden bg-black"
        onTouchMove={handleTouchMove}
        onMouseMove={handleMouseMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        {/* Right side / New image */}
        <img
          src={currentItem.newImageUrl}
          alt={`今日 ${currentItem.title}`}
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-medium border border-white/20">
          今日新貌 ({currentItem.yearNew})
        </div>

        {/* Left side / Old image with clip-path */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={currentItem.oldImageUrl}
            alt={`往昔 ${currentItem.title}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 z-10 bg-[#1A1A1B]/90 backdrop-blur-md text-amber-200 px-2.5 py-1 rounded-full text-[11px] font-medium border border-amber-400/30">
            老街旧忆 ({currentItem.yearOld})
          </div>
        </div>

        {/* Drag line & Handle */}
        <div
          className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.6)]"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#1A1A1B] shadow-xl border-2 border-[#B91C1C] flex items-center justify-center text-xs font-bold pointer-events-none">
            ↔
          </div>
        </div>

        {/* Micro-hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-md text-white/90 text-[10px] px-3 py-1 rounded-full pointer-events-none border border-white/10 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-300" />
          左右拖动 查看老水头变迁
        </div>
      </div>

      {/* Story excerpt & interactions */}
      <div className="p-4 sm:p-5 pt-3.5">
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3 mb-3 bg-[#F8F9FA] p-3 rounded-2xl border border-gray-100">
          {currentItem.story}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500">
          <button
            onClick={() => onOpenStory(currentItem)}
            className="text-[#B91C1C] hover:text-[#991b1b] font-medium text-xs flex items-center gap-0.5"
          >
            阅读完整回忆录 →
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onLike(currentItem.id)}
              className="flex items-center gap-1 text-gray-600 hover:text-[#B91C1C] active:scale-95 transition-all"
            >
              <Heart className="w-3.5 h-3.5 text-[#B91C1C]" />
              <span>{currentItem.likes}</span>
            </button>
            <button
              onClick={() => onOpenStory(currentItem)}
              className="flex items-center gap-1 text-gray-600 hover:text-[#1A1A1B]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{currentItem.commentsCount}</span>
            </button>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(`【水头今昔】${currentItem.title} - 水头在线·乡情家园`);
                  alert('乡情链接已复制，可分享至微信群！');
                }
              }}
              className="text-gray-400 hover:text-[#1A1A1B]"
              title="分享给老乡"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
