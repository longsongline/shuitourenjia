import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  History, 
  Briefcase, 
  Newspaper, 
  Video, 
  PhoneCall, 
  Users, 
  ArrowRight, 
  Sparkles,
  Zap,
  Package,
  Bus,
  Hospital,
  Flame,
  ChevronRight,
  Clock,
  Tag,
  MapPin,
  CloudSun,
  Droplets,
  Wind,
  Layers,
  Compass,
  Building2
} from 'lucide-react';
import { NewsItem, StoreItem, MemoryItem, TabType } from '../types';
import { MemoryCompareSlider } from './MemoryCompareSlider';
import { ShuitouRoads3D } from './ShuitouRoads3D';
import { fetchShuitouWeather, getFormattedDate, RealtimeWeather, DateInfo } from '../services/weatherService';

interface HomeTabProps {
  newsList: NewsItem[];
  stores: StoreItem[];
  memories: MemoryItem[];
  onNavigateTab: (tab: TabType) => void;
  onSelectNews: (news: NewsItem) => void;
  onClaimCoupon: (store: StoreItem) => void;
  onSelectMemory: (mem: MemoryItem) => void;
  onLikeMemory: (id: string) => void;
  isMobileFrame?: boolean;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  newsList,
  stores,
  memories,
  onNavigateTab,
  onSelectNews,
  onClaimCoupon,
  onSelectMemory,
  onLikeMemory,
  isMobileFrame = true,
}) => {
  const [selectedNewsIndex, setSelectedNewsIndex] = useState<number>(0);
  const [dateInfo, setDateInfo] = useState<DateInfo>(getFormattedDate());
  const [weather, setWeather] = useState<RealtimeWeather | null>(null);

  useEffect(() => {
    // Load live weather and sync date
    fetchShuitouWeather().then(setWeather);
    const timer = setInterval(() => {
      setDateInfo(getFormattedDate());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const featuredNews = newsList[selectedNewsIndex] || newsList[0];

  // Quick Service Items
  const serviceIcons = [
    { icon: '⚡', label: '电费缴纳', bg: 'bg-blue-50 text-blue-600' },
    { icon: '📦', label: '快递查询', bg: 'bg-emerald-50 text-emerald-600' },
    { icon: '🚌', label: '客运班线', bg: 'bg-purple-50 text-purple-600' },
    { icon: '🏥', label: '医院挂号', bg: 'bg-rose-50 text-[#B91C1C]' },
    { icon: '🔧', label: '家政报修', bg: 'bg-amber-50 text-amber-600' },
    { icon: '🚗', label: '平阳拼车', bg: 'bg-cyan-50 text-cyan-600' },
    { icon: '📜', label: '公积金社保', bg: 'bg-indigo-50 text-indigo-600' },
    { icon: '📞', label: '便民热线', bg: 'bg-stone-100 text-stone-700' },
  ];

  return (
    <div className="space-y-4 pb-12">
      {/* 1. Quick Navigation Bento Bar (Never Truncates, Crystal Clear 4x2 Grid on Mobile) */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-2.5">
        {[
          { label: '家乡头条', icon: Newspaper, color: 'text-[#B91C1C]', bg: 'bg-red-50', tab: 'home' as TabType },
          { label: '本地商圈', icon: ShoppingBag, color: 'text-rose-600', bg: 'bg-rose-50', tab: 'commerce' as TabType },
          { label: '3D路网', icon: Compass, color: 'text-blue-600', bg: 'bg-blue-50', tab: 'map3d' as TabType },
          { label: '招工求职', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50', tab: 'jobs' as TabType },
          { label: '老街回忆', icon: History, color: 'text-amber-600', bg: 'bg-amber-50', tab: 'memory' as TabType },
          { label: '乡情论坛', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', tab: 'forum' as TabType },
          { label: '乡友随拍', icon: Video, color: 'text-purple-600', bg: 'bg-purple-50', tab: 'memory' as TabType },
          { label: '便民生活', icon: PhoneCall, color: 'text-cyan-600', bg: 'bg-cyan-50', tab: 'jobs' as TabType },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => onNavigateTab(item.tab)}
            className="flex flex-col items-center justify-center gap-1.5 p-2 sm:p-2.5 bg-white hover:bg-gray-50 rounded-2xl border border-gray-100 shadow-2xs transition-all active:scale-95 group"
          >
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-105 transition-transform shrink-0`}>
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>
            <span className="text-xs font-semibold text-[#1A1A1B] whitespace-nowrap leading-tight text-center">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* 2. Live Shuitou Town Pulse & Weather Info Banner */}
      <div className="bg-white rounded-3xl p-3.5 sm:p-4 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0">
            <CloudSun className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-xs sm:text-sm text-[#1A1A1B]">
                平阳·水头镇 今日实况
              </span>
              <span className="text-[10px] bg-red-50 text-[#B91C1C] px-2 py-0.5 rounded-full font-medium border border-red-100">
                {dateInfo.gregorian} · {dateInfo.weekDay} · {dateInfo.lunar}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 truncate mt-0.5">
              {weather ? (
                <>
                  气温 <strong className="text-[#1A1A1B]">{weather.temperature}°C</strong> ({weather.condition}) · 
                  体感 {weather.apparentTemp}°C · 湿度 {weather.humidity}% · 空气 {weather.airQuality}
                </>
              ) : (
                '正在校准平阳水头气象观测站实时数据...'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-gray-500 shrink-0 self-end sm:self-center">
          <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-xl border border-gray-100">
            <Droplets className="w-3 h-3 text-blue-500" />
            带溪水文: 优良
          </span>
          <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-xl border border-gray-100">
            <Wind className="w-3 h-3 text-emerald-500" />
            交通: 全线畅通
          </span>
        </div>
      </div>

      {/* 3. High-Impact Gateway Card to the 3D Digital Twin Road Map */}
      <div className="bg-gradient-to-br from-[#1A1A1B] via-stone-900 to-slate-900 text-white rounded-3xl p-4 sm:p-5 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[10px] bg-[#B91C1C] text-white font-bold px-2 py-0.5 rounded-full">
                新上线专栏
              </span>
              <h3 className="font-bold text-base text-white flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-400" />
                水头镇数字孪生路网 · 3D高德实景专栏
              </h3>
            </div>
            <p className="text-xs text-gray-300 mt-1 max-w-xl leading-relaxed">
              真实还原水头振兴路商圈、劲松东路、工农老街、带溪跨江大桥及中国皮都城。
              全镇路网畅通率 <strong className="text-emerald-400">87.5%</strong> · 实时均速 <strong className="text-blue-300">42.8 km/h</strong>。
            </p>

            {/* Quick Road Status Chips */}
            <div className="flex items-center gap-2 flex-wrap mt-2.5">
              <span className="text-[11px] bg-white/10 text-emerald-300 border border-white/10 px-2 py-0.5 rounded-lg flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                振兴北路 48km/h 畅通
              </span>
              <span className="text-[11px] bg-white/10 text-amber-300 border border-white/10 px-2 py-0.5 rounded-lg flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                振兴中路 24km/h 缓行
              </span>
              <span className="text-[11px] bg-white/10 text-emerald-300 border border-white/10 px-2 py-0.5 rounded-lg flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                水头大桥 46km/h 畅通
              </span>
            </div>
          </div>

          {/* Jump to 3D Tab Button */}
          <button
            onClick={() => onNavigateTab('map3d')}
            className="shrink-0 bg-[#B91C1C] hover:bg-[#991b1b] active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-1.5 self-start sm:self-center"
          >
            <span>进入 3D 沉浸式路网专栏</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. Bento Grid: News & Community (Row 1: col-span-7 and col-span-5) */}
      <div className={isMobileFrame ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 lg:grid-cols-12 gap-4'}>
        {/* 1. Headline Bento Card */}
        <div className={isMobileFrame ? 'w-full bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm relative overflow-hidden group flex flex-col justify-between' : 'lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm relative overflow-hidden group flex flex-col justify-between'}>
          <div className="absolute top-0 left-0 w-full h-1 bg-[#B91C1C]" />

          <div>
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-[10px] bg-[#FEF2F2] text-[#B91C1C] font-bold px-2.5 py-1 rounded-full inline-block border border-red-100">
                家乡头条 · {featuredNews.category}
              </span>
              <span className="text-[11px] text-gray-400">
                {featuredNews.time}
              </span>
            </div>

            <h2 
              onClick={() => onSelectNews(featuredNews)}
              className="text-lg sm:text-xl font-bold leading-snug mb-2.5 text-[#1A1A1B] cursor-pointer hover:text-[#B91C1C] transition-colors line-clamp-2"
            >
              {featuredNews.title}
            </h2>

            <p className="text-gray-500 text-xs sm:text-sm mb-4 line-clamp-3 leading-relaxed">
              {featuredNews.summary}
            </p>

            {/* Quick news item switcher pills */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1 mb-3">
              {newsList.slice(0, 4).map((n, i) => (
                <button
                  key={n.id}
                  onClick={() => setSelectedNewsIndex(i)}
                  className={`text-[11px] px-2.5 py-1 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1 ${
                    selectedNewsIndex === i
                      ? 'bg-[#1A1A1B] text-white font-medium shadow-2xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-70">0{i + 1}</span>
                  <span>{n.title.slice(0, 8)}...</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3.5 border-t border-gray-100 mt-2">
            <div className="flex items-center">
              <div className="flex -space-x-1.5">
                <div className="w-6 h-6 rounded-full bg-red-100 border border-white flex items-center justify-center text-[9px] text-[#B91C1C] font-bold">老</div>
                <div className="w-6 h-6 rounded-full bg-blue-100 border border-white flex items-center justify-center text-[9px] text-blue-600 font-bold">陈</div>
                <div className="w-6 h-6 rounded-full bg-emerald-100 border border-white flex items-center justify-center text-[9px] text-emerald-600 font-bold">林</div>
              </div>
              <span className="text-[11px] text-gray-400 ml-2.5">
                {featuredNews.views} 人已阅
              </span>
            </div>

            <button
              onClick={() => onSelectNews(featuredNews)}
              className="text-[#B91C1C] text-xs font-bold flex items-center gap-1 hover:underline underline-offset-4"
            >
              阅读详情 →
            </button>
          </div>
        </div>

        {/* 2. Dark Bento Card: 乡情论坛 / 社区动态 */}
        <div className={isMobileFrame ? 'w-full bg-[#1A1A1B] rounded-3xl p-5 text-white flex flex-col justify-between shadow-sm' : 'lg:col-span-5 bg-[#1A1A1B] rounded-3xl p-5 text-white flex flex-col justify-between shadow-sm'}>
          <div>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-base tracking-tight flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-400" />
                  乡情论坛 · 游子心声
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">温州平阳在外老乡同城交流</p>
              </div>
              <span className="text-[10px] bg-white/15 text-gray-200 px-2 py-0.5 rounded-full border border-white/10 shrink-0">
                12条新动态
              </span>
            </div>

            <div className="space-y-2.5 my-2">
              <div className="flex gap-2.5 items-center p-2 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-7 h-7 rounded-xl bg-blue-500/80 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                  陈
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-200 truncate">
                    <strong className="text-white font-medium">@老陈(杭州): </strong>水头现在的变化真大，想家了！
                  </p>
                  <span className="text-[9px] text-gray-400">10分钟前 · 游子归乡</span>
                </div>
              </div>

              <div className="flex gap-2.5 items-center p-2 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/80 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                  妹
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-200 truncate">
                    <strong className="text-white font-medium">@水头妹子: </strong>今天在带溪绿道拍了花，真好看！
                  </p>
                  <span className="text-[9px] text-gray-400">35分钟前 · 水头新鲜事</span>
                </div>
              </div>

              <div className="flex gap-2.5 items-center p-2 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-7 h-7 rounded-xl bg-amber-500/80 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                  张
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-200 truncate">
                    <strong className="text-white font-medium">@老张(广州): </strong>水头至鳌江客运专线现在很方便！
                  </p>
                  <span className="text-[9px] text-gray-400">1小时前 · 打听互助</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('forum')}
            className="w-full bg-white/10 hover:bg-white/20 active:scale-95 py-2 rounded-2xl text-xs text-white transition-all font-medium text-center mt-2 border border-white/10"
          >
            进入老乡社区交流 ➔
          </button>
        </div>
      </div>

      {/* 5. Bento Grid: Jobs, Store Deals, Public Services */}
      <div className={isMobileFrame ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 lg:grid-cols-12 gap-4'}>
        {/* 1. Local Jobs Card */}
        <div className={isMobileFrame ? 'w-full bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between' : 'lg:col-span-4 bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between'}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base text-[#1A1A1B] flex items-center gap-1.5">
                <span className="w-1.5 h-4 bg-orange-400 rounded-full inline-block" />
                本地招聘
              </h3>
              <span className="text-[10px] text-gray-400 font-normal">急聘 82 岗</span>
            </div>

            <div className="space-y-2">
              <div 
                onClick={() => onNavigateTab('jobs')}
                className="p-2.5 bg-gray-50 hover:bg-orange-50/50 rounded-2xl border border-transparent hover:border-orange-200 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1B] truncate">皮革大厂 · 样板主管</h4>
                  <span className="text-[9px] bg-red-100 text-[#B91C1C] px-1.5 py-0.5 rounded-md font-bold shrink-0 whitespace-nowrap">🔥 急聘</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1.5 flex justify-between items-center">
                  <strong className="text-orange-600 font-bold">8000-12000元/月</strong>
                  <span className="whitespace-nowrap">包吃住 · 五险</span>
                </p>
              </div>

              <div 
                onClick={() => onNavigateTab('jobs')}
                className="p-2.5 bg-gray-50 hover:bg-orange-50/50 rounded-2xl border border-transparent hover:border-orange-200 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1B] truncate">新城超市 · 店长助手</h4>
                  <span className="text-[9px] bg-gray-200/80 text-gray-600 px-1.5 py-0.5 rounded-md shrink-0 whitespace-nowrap">振兴路</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1.5 flex justify-between items-center">
                  <strong className="text-orange-600 font-bold">4500-6000元/月</strong>
                  <span className="whitespace-nowrap">双休提成</span>
                </p>
              </div>

              <div 
                onClick={() => onNavigateTab('jobs')}
                className="p-2.5 bg-gray-50 hover:bg-orange-50/50 rounded-2xl border border-transparent hover:border-orange-200 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1B] truncate">跨境电商皮件主播</h4>
                  <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-md font-medium shrink-0 whitespace-nowrap">高提成</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1.5 flex justify-between items-center">
                  <strong className="text-orange-600 font-bold">6000-15000元/月</strong>
                  <span className="whitespace-nowrap">欢迎返乡</span>
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('jobs')}
            className="text-center text-xs text-gray-500 hover:text-[#B91C1C] font-medium pt-3 mt-1 border-t border-gray-100 transition-colors"
          >
            查看更多 82 个职位 →
          </button>
        </div>

        {/* 2. Group Buy & Deals Card */}
        <div className={isMobileFrame ? 'w-full bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between' : 'lg:col-span-4 bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between'}>
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-base text-[#1A1A1B] flex items-center gap-1.5">
                <span className="w-1.5 h-4 bg-[#B91C1C] rounded-full inline-block" />
                新店团购 & 优惠
              </h3>
              <button 
                onClick={() => onNavigateTab('commerce')}
                className="text-xs text-[#B91C1C] font-medium hover:underline"
              >
                全部商圈 →
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {stores.slice(0, 4).map((store) => (
                <div
                  key={store.id}
                  onClick={() => onClaimCoupon(store)}
                  className="bg-gray-50 hover:bg-red-50/50 rounded-2xl p-2.5 flex flex-col justify-between border border-gray-100 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1 gap-1">
                    <span className="text-[10px] text-gray-500 font-medium truncate">
                      {store.category}
                    </span>
                    <span className="bg-[#B91C1C] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shrink-0 whitespace-nowrap">
                      抢券
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#1A1A1B] truncate group-hover:text-[#B91C1C] transition-colors">
                      {store.name}
                    </p>
                    <div className="flex items-baseline gap-1 mt-1 flex-wrap">
                      {store.discountPrice ? (
                        <>
                          <span className="text-[#B91C1C] font-black text-xs sm:text-sm">
                            ￥{store.discountPrice}
                          </span>
                          <span className="line-through text-gray-400 text-[10px]">
                            ￥{store.originalPrice}
                          </span>
                        </>
                      ) : (
                        <span className="text-[10px] text-[#B91C1C] font-medium whitespace-nowrap">
                          老字号优惠
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-3 border-t border-gray-100 mt-2">
            <span className="text-[10px] text-gray-400">
              支持外地老乡全国包邮直寄 · 实体店扫码核销
            </span>
          </div>
        </div>

        {/* 3. Public Services Bento Card */}
        <div className={isMobileFrame ? 'w-full bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between' : 'lg:col-span-4 bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between'}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base text-[#1A1A1B] flex items-center gap-1.5">
                <span className="w-1.5 h-4 bg-blue-500 rounded-full inline-block" />
                生活服务入口
              </h3>
              <button
                onClick={() => onNavigateTab('jobs')}
                className="text-[11px] text-[#B91C1C] font-medium hover:underline"
              >
                更多服务 →
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
              {serviceIcons.map((srv, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigateTab('jobs')}
                  className="flex flex-col items-center gap-1.5 cursor-pointer group p-1.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-10 h-10 ${srv.bg} rounded-2xl flex items-center justify-center text-sm shadow-2xs group-hover:scale-105 transition-transform`}>
                    {srv.icon}
                  </div>
                  <span className="text-[11px] font-medium text-gray-700 text-center whitespace-nowrap">
                    {srv.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F8F9FA] rounded-2xl p-2.5 mt-3 text-[11px] text-gray-500 flex items-center justify-between">
            <span>📞 水头便民总机: 0577-63881001</span>
            <span className="text-emerald-600 font-medium">24h服务</span>
          </div>
        </div>
      </div>

      {/* 6. Featured Interactive Comparison Slider directly inside Home */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#B91C1C] rounded-full inline-block" />
            <h3 className="font-bold text-base text-[#1A1A1B]">
              今昔光影交互 · {memories[0]?.title}
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('memory')}
            className="text-xs text-[#B91C1C] font-medium hover:underline"
          >
            探索更多老街记忆 →
          </button>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          按住中间滑块左右拖动，亲眼见证 1989 年老江桥与 2025 年带溪现代化新桥的华丽蝶变
        </p>
        <div className="max-w-2xl mx-auto">
          {memories[0] && (
            <MemoryCompareSlider
              item={memories[0]}
              onLike={onLikeMemory}
              onOpenStory={onSelectMemory}
            />
          )}
        </div>
      </div>
    </div>
  );
};
