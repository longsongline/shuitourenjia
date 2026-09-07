import React, { useState, useEffect } from 'react';
import { 
  TabType, 
  NewsItem, 
  StoreItem, 
  MemoryItem, 
  MomentVideoItem, 
  JobItem, 
  ServiceContact, 
  ForumPost, 
  UserProfile, 
  CouponTicket 
} from './types';
import { 
  initialUserProfile, 
  mockNewsList, 
  mockStoreList, 
  mockMemories, 
  mockMomentVideos, 
  mockJobsList, 
  mockServiceContacts, 
  mockForumPosts 
} from './data/mockData';
import { 
  fetchInitialData, 
  apiAddComment, 
  apiCreatePost, 
  apiLikePost, 
  apiCreateJob, 
  apiCreateStore, 
  apiClaimVoucher, 
  apiRedeemVoucher, 
  apiUpdateProfile 
} from './services/api';

import { HeaderBar } from './components/HeaderBar';
import { HomeTab } from './components/HomeTab';
import { CommerceTab } from './components/CommerceTab';
import { MemoryTab } from './components/MemoryTab';
import { JobsAndServiceTab } from './components/JobsAndServiceTab';
import { ForumTab } from './components/ForumTab';
import { ProfileTab } from './components/ProfileTab';
import { Map3DTab } from './components/Map3DTab';

import { NewsDetailModal } from './components/NewsDetailModal';
import { StoryDetailModal } from './components/StoryDetailModal';
import { VoucherModal } from './components/VoucherModal';
import { PublishModal } from './components/PublishModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { WeChatMiniProgramModal } from './components/WeChatMiniProgramModal';

import { 
  Home, 
  ShoppingBag, 
  Camera, 
  Briefcase, 
  MessageSquare, 
  User, 
  Plus, 
  Smartphone, 
  Monitor, 
  Sparkles,
  CheckCircle2,
  Compass
} from 'lucide-react';

export default function App() {
  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Primary Data States
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [newsList, setNewsList] = useState<NewsItem[]>(mockNewsList);
  const [stores, setStores] = useState<StoreItem[]>(mockStoreList);
  const [memories, setMemories] = useState<MemoryItem[]>(mockMemories);
  const [videos, setVideos] = useState<MomentVideoItem[]>(mockMomentVideos);
  const [jobs, setJobs] = useState<JobItem[]>(mockJobsList);
  const [services] = useState<ServiceContact[]>(mockServiceContacts);
  const [posts, setPosts] = useState<ForumPost[]>(mockForumPosts);

  // User Claimed Coupons (Wallet)
  const [vouchers, setVouchers] = useState<CouponTicket[]>([
    {
      id: 'v-preset-1',
      storeId: 'store-1',
      storeName: '老水头老字号·张记金牌排骨',
      title: '招牌秘制香脆排骨双人份 + 冰镇红豆汤',
      discountPrice: 29.9,
      originalPrice: 48,
      validUntil: '2026-10-31',
      qrCodeText: 'ST-PB-299',
      status: 'unused',
      claimedAt: '今天 10:00',
    },
  ]);

  // Modals
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<CouponTicket | null>(null);
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);
  const [publishInitialType, setPublishInitialType] = useState<'post' | 'job' | 'store'>('post');
  const [showAiModal, setShowAiModal] = useState<boolean>(false);
  const [showWeChatModal, setShowWeChatModal] = useState<boolean>(false);

  // Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Sync with persistent backend database on mount
  useEffect(() => {
    fetchInitialData().then((db) => {
      if (db.userProfile) setUserProfile(db.userProfile);
      if (db.posts && db.posts.length) setPosts(db.posts);
      if (db.jobs && db.jobs.length) setJobs(db.jobs);
      if (db.stores && db.stores.length) setStores(db.stores);
      if (db.memories && db.memories.length) setMemories(db.memories);
      if (db.vouchers && db.vouchers.length) setVouchers(db.vouchers);
      if (db.newsList && db.newsList.length) setNewsList(db.newsList);
    });
  }, []);

  // Interactions: Claim Coupon
  const handleClaimCoupon = (store: StoreItem) => {
    if (!store.couponTitle || !store.discountPrice) return;
    const newVoucher: CouponTicket = {
      id: `v-${Date.now()}`,
      storeId: store.id,
      storeName: store.name,
      title: store.couponTitle,
      discountPrice: store.discountPrice,
      originalPrice: store.originalPrice || store.discountPrice * 1.5,
      validUntil: '2026-12-31',
      qrCodeText: `ST-${Date.now().toString().slice(-6)}`,
      status: 'unused',
      claimedAt: '刚刚',
    };
    setVouchers([newVoucher, ...vouchers]);
    setSelectedVoucher(newVoucher);
    // Persist to backend database
    apiClaimVoucher({
      storeId: store.id,
      storeName: store.name,
      couponTitle: store.couponTitle,
      discountPrice: store.discountPrice,
      originalPrice: store.originalPrice || store.discountPrice * 1.5
    });
    showToast(`成功领取【${store.name}】特惠团购券！`);
  };

  // Redeem Voucher
  const handleRedeemVoucher = (voucherId: string) => {
    setVouchers(
      vouchers.map((v) => (v.id === voucherId ? { ...v, status: 'used' as const } : v))
    );
    // Persist to backend database
    apiRedeemVoucher(voucherId);
    showToast('优惠券已成功核销！');
  };

  // Interactions: Like Memory
  const handleLikeMemory = (id: string) => {
    setMemories(
      memories.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
    );
    showToast('已为这段老水头记忆点赞！');
  };

  // Interactions: Like Video
  const handleLikeVideo = (id: string) => {
    setVideos(
      videos.map((v) => {
        if (v.id === id) {
          const isLiked = !v.isLiked;
          return {
            ...v,
            isLiked,
            likes: isLiked ? v.likes + 1 : v.likes - 1,
          };
        }
        return v;
      })
    );
  };

  // Interactions: Like Forum Post
  const handleLikePost = (id: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
    // Persist to backend database
    apiLikePost(id);
  };

  // Interactions: Comment on Forum Post
  const handleAddComment = (postId: string, text: string) => {
    const commentUser = userProfile.name;
    const commentCity = userProfile.currentCity.split('·')[0] || '水头';
    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                id: `c-${Date.now()}`,
                user: commentUser,
                city: commentCity,
                text,
                time: '刚刚',
              },
            ],
          };
        }
        return p;
      })
    );
    // Persist to backend database
    apiAddComment(postId, text, commentUser, commentCity);
    showToast('老乡留言已发送并持久化存储！');
  };

  // Interactions: Update Wanderer City
  const handleUpdateCity = (city: string, km: number) => {
    setUserProfile((prev) => ({
      ...prev,
      currentCity: city,
      distanceFromShuitouKm: km,
    }));
    // Persist to backend database
    apiUpdateProfile({
      currentCity: city,
      distanceFromShuitouKm: km
    });
    showToast(`已切换当前城市为【${city}】，距水头 ${km} 公里`);
  };

  // Publishing Handlers
  const handleAddPost = (newPostData: Omit<ForumPost, 'id' | 'likes' | 'comments' | 'time'>) => {
    const post: ForumPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      likes: 1,
      isLiked: true,
      comments: [],
      time: '刚刚',
    };
    setPosts([post, ...posts]);
    setActiveTab('forum');
    // Persist to backend database
    apiCreatePost(newPostData);
    showToast('发布成功！已在乡友圈展示并持久化存储');
  };

  const handleAddJob = (newJobData: Omit<JobItem, 'id' | 'postedTime'>) => {
    const job: JobItem = {
      ...newJobData,
      id: `job-${Date.now()}`,
      postedTime: '刚刚',
    };
    setJobs([job, ...jobs]);
    setActiveTab('jobs');
    // Persist to backend database
    apiCreateJob(newJobData);
    showToast('招工信息已发布并持久化存储！');
  };

  const handleAddStore = (newStoreData: Omit<StoreItem, 'id' | 'rating' | 'soldCount'>) => {
    const store: StoreItem = {
      ...newStoreData,
      id: `store-${Date.now()}`,
      rating: 5.0,
      soldCount: 0,
    };
    setStores([store, ...stores]);
    setActiveTab('commerce');
    // Persist to backend database
    apiCreateStore(newStoreData);
    showToast('商家入驻成功！欢迎水头商户');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1B] flex flex-col items-center justify-start antialiased selection:bg-red-100 font-sans">
      {/* Top Device View Toggle Bar (Only visible outside on larger screens) */}
      <div className="w-full max-w-6xl px-4 py-2.5 flex items-center justify-between text-xs text-gray-500 border-b border-gray-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#B91C1C] animate-pulse" />
          <span className="font-bold text-[#1A1A1B] tracking-tight text-sm">
            水头家园 · 平阳水头在线
          </span>
          <span className="hidden sm:inline text-xs bg-[#FEF2F2] text-[#B91C1C] px-2 py-0.5 rounded-full font-medium border border-red-100">
            便民商圈 · 回忆录 · 乡情社区
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowWeChatModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold border border-emerald-200 transition-colors shadow-2xs"
            title="微信小程序工程源码与发布"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <span>微信小程序发布 / 源码</span>
          </button>

          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1A1A1B] font-medium transition-colors"
            title="切换视图体验"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-blue-600" />
                <span>切为宽屏便当格 (1024px+)</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#B91C1C]" />
                <span>切为小程序模拟器 (390px)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container: Mobile Frame vs Bento Wide Container */}
      <div className={`w-full transition-all duration-300 ${
        isMobileFrame 
          ? 'max-w-[420px] my-0 sm:my-5 rounded-none sm:rounded-[40px] shadow-none sm:shadow-2xl sm:ring-8 sm:ring-stone-800/90 overflow-hidden bg-[#F8F9FA] min-h-screen sm:min-h-[844px] flex flex-col relative' 
          : 'max-w-6xl mx-auto my-0 sm:my-6 rounded-none sm:rounded-3xl shadow-xs bg-[#F8F9FA] min-h-screen flex flex-col relative overflow-hidden px-2 sm:px-6'
      }`}>
        
        {/* WeChat Mini Program Top Capsule Bar (when in mobile frame) */}
        {isMobileFrame && (
          <div className="bg-[#B91C1C] text-white px-4 py-2 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-1.5 text-xs font-bold tracking-tight">
              <span>9:41</span>
              <span className="text-[10px] opacity-80 font-normal">水头家园 · 微信小程序</span>
            </div>
            {/* WeChat Standard Capsule Button */}
            <div 
              onClick={() => setShowWeChatModal(true)}
              className="bg-black/25 hover:bg-black/40 border border-white/20 rounded-full px-2.5 py-1 flex items-center gap-2 cursor-pointer transition-colors shadow-2xs"
              title="点击打开微信小程序操作菜单与发布源码"
            >
              <div className="flex gap-0.5 items-center">
                <span className="w-1 h-1 rounded-full bg-white" />
                <span className="w-1 h-1 rounded-full bg-white" />
                <span className="w-1 h-1 rounded-full bg-white" />
              </div>
              <span className="w-px h-2.5 bg-white/30" />
              <div className="w-2.5 h-2.5 rounded-full border border-white flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-white" />
              </div>
            </div>
          </div>
        )}

        {/* Global Header Bar */}
        <HeaderBar
          userProfile={userProfile}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenAiAssistant={() => setShowAiModal(true)}
          onUpdateCity={handleUpdateCity}
          onOpenPublish={() => {
            setPublishInitialType('post');
            setShowPublishModal(true);
          }}
        />

        {/* Tab Content Body */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'home' && (
            <HomeTab
              newsList={newsList}
              stores={stores}
              memories={memories}
              onNavigateTab={(t) => setActiveTab(t)}
              onSelectNews={(n) => setSelectedNews(n)}
              onClaimCoupon={handleClaimCoupon}
              onSelectMemory={(m) => setSelectedMemory(m)}
              onLikeMemory={handleLikeMemory}
              isMobileFrame={isMobileFrame}
            />
          )}

          {activeTab === 'map3d' && (
            <Map3DTab onNavigateToNews={() => setActiveTab('home')} />
          )}

          {activeTab === 'commerce' && (
            <CommerceTab
              stores={stores}
              searchQuery={searchQuery}
              onClaimCoupon={handleClaimCoupon}
              onOpenStoreModal={() => {
                setPublishInitialType('store');
                setShowPublishModal(true);
              }}
              isMobileFrame={isMobileFrame}
            />
          )}

          {activeTab === 'memory' && (
            <MemoryTab
              memories={memories}
              videos={videos}
              onSelectMemory={(m) => setSelectedMemory(m)}
              onLikeMemory={handleLikeMemory}
              onLikeVideo={handleLikeVideo}
              onOpenUploadStory={() => {
                setPublishInitialType('post');
                setShowPublishModal(true);
              }}
              onOpenUploadVideo={() => {
                setPublishInitialType('post');
                setShowPublishModal(true);
              }}
            />
          )}

          {activeTab === 'jobs' && (
            <JobsAndServiceTab
              jobs={jobs}
              services={services}
              searchQuery={searchQuery}
              onOpenPostJobModal={() => {
                setPublishInitialType('job');
                setShowPublishModal(true);
              }}
              isMobileFrame={isMobileFrame}
            />
          )}

          {activeTab === 'forum' && (
            <ForumTab
              posts={posts}
              searchQuery={searchQuery}
              onLikePost={handleLikePost}
              onAddComment={handleAddComment}
              onOpenCreatePost={() => {
                setPublishInitialType('post');
                setShowPublishModal(true);
              }}
              isMobileFrame={isMobileFrame}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileTab
              userProfile={userProfile}
              vouchers={vouchers}
              onOpenAiAssistant={() => setShowAiModal(true)}
              onOpenVoucherModal={(v) => setSelectedVoucher(v)}
              onUpdateCity={handleUpdateCity}
            />
          )}
        </main>

        {/* Floating Fast Action "+ 发布" Button */}
        <button
          onClick={() => {
            setPublishInitialType('post');
            setShowPublishModal(true);
          }}
          className="fixed sm:absolute bottom-16 right-4 z-20 w-12 h-12 rounded-2xl bg-[#B91C1C] hover:bg-[#991b1b] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all border border-white/20"
          title="发布新鲜事 / 招工 / 商家入驻"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Mobile Bottom Navigation Bar (Bento style, crystal clear labels, never truncated) */}
        <nav className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl sm:rounded-3xl px-1.5 sm:px-3 py-2 flex items-center justify-around shadow-sm mb-1 mt-auto">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
              activeTab === 'home' ? 'text-[#B91C1C] font-bold' : 'text-gray-400 hover:text-[#1A1A1B]'
            }`}
          >
            <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5]' : ''}`} />
            <span className="text-[10px] leading-tight whitespace-nowrap">精选</span>
          </button>

          <button
            onClick={() => setActiveTab('map3d')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all relative ${
              activeTab === 'map3d' ? 'text-[#B91C1C] font-bold' : 'text-gray-400 hover:text-[#1A1A1B]'
            }`}
          >
            <Compass className={`w-5 h-5 ${activeTab === 'map3d' ? 'stroke-[2.5]' : ''}`} />
            <span className="text-[10px] leading-tight whitespace-nowrap">3D路况</span>
            <span className="absolute top-0 right-1 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          <button
            onClick={() => setActiveTab('commerce')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
              activeTab === 'commerce' ? 'text-[#B91C1C] font-bold' : 'text-gray-400 hover:text-[#1A1A1B]'
            }`}
          >
            <ShoppingBag className={`w-5 h-5 ${activeTab === 'commerce' ? 'stroke-[2.5]' : ''}`} />
            <span className="text-[10px] leading-tight whitespace-nowrap">商圈</span>
          </button>

          <button
            onClick={() => setActiveTab('memory')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
              activeTab === 'memory' ? 'text-[#B91C1C] font-bold' : 'text-gray-400 hover:text-[#1A1A1B]'
            }`}
          >
            <Camera className={`w-5 h-5 ${activeTab === 'memory' ? 'stroke-[2.5]' : ''}`} />
            <span className="text-[10px] leading-tight whitespace-nowrap">忆·视界</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
              activeTab === 'jobs' ? 'text-[#B91C1C] font-bold' : 'text-gray-400 hover:text-[#1A1A1B]'
            }`}
          >
            <Briefcase className={`w-5 h-5 ${activeTab === 'jobs' ? 'stroke-[2.5]' : ''}`} />
            <span className="text-[10px] leading-tight whitespace-nowrap">便民招工</span>
          </button>

          <button
            onClick={() => setActiveTab('forum')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
              activeTab === 'forum' ? 'text-[#B91C1C] font-bold' : 'text-gray-400 hover:text-[#1A1A1B]'
            }`}
          >
            <MessageSquare className={`w-5 h-5 ${activeTab === 'forum' ? 'stroke-[2.5]' : ''}`} />
            <span className="text-[10px] leading-tight whitespace-nowrap">乡友圈</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
              activeTab === 'profile' ? 'text-[#B91C1C] font-bold' : 'text-gray-400 hover:text-[#1A1A1B]'
            }`}
          >
            <User className={`w-5 h-5 ${activeTab === 'profile' ? 'stroke-[2.5]' : ''}`} />
            <span className="text-[10px] leading-tight whitespace-nowrap">我的</span>
          </button>
        </nav>
      </div>

      {/* Global Modals */}
      <NewsDetailModal
        news={selectedNews}
        onClose={() => setSelectedNews(null)}
      />

      <StoryDetailModal
        story={selectedMemory}
        onClose={() => setSelectedMemory(null)}
        onLike={handleLikeMemory}
      />

      <VoucherModal
        voucher={selectedVoucher}
        onClose={() => setSelectedVoucher(null)}
        onRedeem={handleRedeemVoucher}
      />

      {showPublishModal && (
        <PublishModal
          initialType={publishInitialType}
          onClose={() => setShowPublishModal(false)}
          onAddPost={handleAddPost}
          onAddJob={handleAddJob}
          onAddStore={handleAddStore}
        />
      )}

      {showAiModal && (
        <AiAssistantModal
          onClose={() => setShowAiModal(false)}
        />
      )}

      <WeChatMiniProgramModal
        isOpen={showWeChatModal}
        onClose={() => setShowWeChatModal(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 text-white text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-white/10 animate-in fade-in zoom-in-95">
          <CheckCircle2 className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
