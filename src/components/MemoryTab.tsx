import React, { useState } from 'react';
import { MemoryItem, MomentVideoItem } from '../types';
import { MemoryCompareSlider } from './MemoryCompareSlider';
import { 
  History, 
  Video, 
  Heart, 
  MessageCircle, 
  PlusCircle, 
  Play, 
  Sparkles, 
  MapPin, 
  Share2,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';

interface MemoryTabProps {
  memories: MemoryItem[];
  videos: MomentVideoItem[];
  onSelectMemory: (item: MemoryItem) => void;
  onLikeMemory: (id: string) => void;
  onLikeVideo: (id: string) => void;
  onOpenUploadStory: () => void;
  onOpenUploadVideo: () => void;
}

export const MemoryTab: React.FC<MemoryTabProps> = ({
  memories,
  videos,
  onSelectMemory,
  onLikeMemory,
  onLikeVideo,
  onOpenUploadStory,
  onOpenUploadVideo,
}) => {
  const [subTab, setSubTab] = useState<'memories' | 'videos'>('memories');
  const [activeVideoModal, setActiveVideoModal] = useState<MomentVideoItem | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(30);

  return (
    <div className="space-y-4 pb-12">
      {/* Sub-tab Navigation (Bento Switcher) */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-2xs">
        <button
          onClick={() => setSubTab('memories')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            subTab === 'memories'
              ? 'bg-[#1A1A1B] text-white shadow-xs'
              : 'text-gray-500 hover:text-[#1A1A1B]'
          }`}
        >
          <History className="w-4 h-4 text-amber-400" />
          水头老街回忆录 ({memories.length})
        </button>
        <button
          onClick={() => setSubTab('videos')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            subTab === 'videos'
              ? 'bg-[#1A1A1B] text-white shadow-xs'
              : 'text-gray-500 hover:text-[#1A1A1B]'
          }`}
        >
          <Video className="w-4 h-4 text-[#B91C1C]" />
          乡友短视频·随手拍 ({videos.length})
        </button>
      </div>

      {/* Action Header Banner */}
      {subTab === 'memories' ? (
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-700 font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 水头岁月印记 · 留存永恒乡愁
            </div>
            <h3 className="font-bold text-base sm:text-lg text-[#1A1A1B] leading-tight">
              水头老照片 & 今昔对比图志
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              记录水头老街、带溪古码头、中国皮都崛起的珍贵图文记忆
            </p>
          </div>
          <button
            onClick={onOpenUploadStory}
            className="shrink-0 px-4 py-2 bg-[#B91C1C] hover:bg-[#991b1b] text-white font-medium rounded-xl text-xs shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            上传老照片
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#B91C1C]" />
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#B91C1C] font-bold mb-1">
              <Video className="w-3.5 h-3.5" /> 随时随地看家乡 · 乡友圈微视
            </div>
            <h3 className="font-bold text-base sm:text-lg text-[#1A1A1B] leading-tight">
              带溪晨暮、水头夜市、南雁风光
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              家乡亲友随手拍摄，让远在他乡打拼的游子宛如身临其境
            </p>
          </div>
          <button
            onClick={onOpenUploadVideo}
            className="shrink-0 px-4 py-2 bg-[#B91C1C] hover:bg-[#991b1b] text-white font-medium rounded-xl text-xs shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            发布随手拍
          </button>
        </div>
      )}

      {/* SubTab 1: Memories List */}
      {subTab === 'memories' && (
        <div className="space-y-4">
          {memories.map((mem) => (
            <MemoryCompareSlider
              key={mem.id}
              item={mem}
              onLike={onLikeMemory}
              onOpenStory={onSelectMemory}
            />
          ))}
        </div>
      )}

      {/* SubTab 2: Short Videos Grid in Bento Style */}
      {subTab === 'videos' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:border-gray-200 transition-all flex flex-col group"
            >
              {/* Video Thumbnail with Play Badge */}
              <div
                onClick={() => setActiveVideoModal(vid)}
                className="relative aspect-4/5 bg-stone-900 cursor-pointer overflow-hidden"
              >
                <img
                  src={vid.videoThumb}
                  alt={vid.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10">
                  <MapPin className="w-2.5 h-2.5 text-amber-400" />
                  <span className="truncate max-w-[90px]">{vid.locationTag}</span>
                </div>

                <div className="absolute bottom-2.5 right-2.5 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full font-mono border border-white/10">
                  {vid.videoDuration}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <p 
                  onClick={() => setActiveVideoModal(vid)}
                  className="text-xs font-bold text-[#1A1A1B] line-clamp-2 leading-snug cursor-pointer hover:text-[#B91C1C]"
                >
                  {vid.caption}
                </p>

                <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-100 text-xs">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <img
                      src={vid.authorAvatar}
                      alt={vid.author}
                      className="w-5 h-5 rounded-full object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[11px] text-gray-500 truncate">{vid.author}</span>
                  </div>

                  <button
                    onClick={() => onLikeVideo(vid.id)}
                    className="flex items-center gap-1 text-gray-400 hover:text-[#B91C1C] active:scale-95 transition-transform shrink-0"
                  >
                    <Heart className={`w-3.5 h-3.5 ${vid.isLiked ? 'fill-[#B91C1C] text-[#B91C1C]' : ''}`} />
                    <span className="text-[11px]">{vid.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Simulated Video Playback Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-sm bg-[#1A1A1B] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player Screen */}
            <div className="relative aspect-9/14 w-full bg-black overflow-hidden">
              <img
                src={activeVideoModal.videoThumb}
                alt={activeVideoModal.caption}
                className="w-full h-full object-cover brightness-95"
                referrerPolicy="no-referrer"
              />

              {/* Watermark */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-white text-xs">
                <span className="w-2 h-2 rounded-full bg-[#B91C1C] animate-pulse" />
                <span>平阳水头在线 · 乡友视界</span>
              </div>

              {/* Sound toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute top-4 right-14 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
              </button>

              {/* Video Overlay Info */}
              <div className="absolute bottom-6 left-3 right-16 z-20 text-white text-xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-bold text-sm text-white">@{activeVideoModal.author}</span>
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">水头乡亲认证</span>
                </div>
                <p className="text-xs text-white/95 leading-snug line-clamp-3 mb-2">
                  {activeVideoModal.caption}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-amber-300 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full inline-flex border border-white/10">
                  <MapPin className="w-3 h-3" />
                  <span>{activeVideoModal.locationTag}</span>
                </div>
              </div>

              {/* Right Side Interaction Bar */}
              <div className="absolute bottom-8 right-3 z-20 flex flex-col items-center gap-4 text-white">
                <button
                  onClick={() => onLikeVideo(activeVideoModal.id)}
                  className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeVideoModal.isLiked ? 'bg-[#B91C1C] text-white' : 'bg-white/20 backdrop-blur-md'}`}>
                    <Heart className={`w-5 h-5 ${activeVideoModal.isLiked ? 'fill-white' : ''}`} />
                  </div>
                  <span className="text-[11px] font-bold">{activeVideoModal.likes}</span>
                </button>

                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold">{activeVideoModal.comments}</span>
                </div>

                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(`【水头随手拍】${activeVideoModal.caption}`);
                      alert('视频链接已复制，可分享到微信！');
                    }
                  }}
                  className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px]">转发</span>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
                <div className="h-full bg-[#B91C1C] transition-all duration-300" style={{ width: `${videoProgress}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
