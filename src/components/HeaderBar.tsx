import React, { useState, useEffect } from 'react';
import { Search, MapPin, CloudSun, Heart, ChevronRight, Sparkles, Plus, RefreshCw, Wind, Droplets } from 'lucide-react';
import { UserProfile } from '../types';
import { fetchShuitouWeather, getFormattedDate, RealtimeWeather, DateInfo } from '../services/weatherService';

interface HeaderBarProps {
  userProfile: UserProfile;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAiAssistant: () => void;
  onUpdateCity: (city: string, distance: number) => void;
  onOpenPublish?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  userProfile,
  searchQuery,
  onSearchChange,
  onOpenAiAssistant,
  onUpdateCity,
  onOpenPublish,
}) => {
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showWeatherDetail, setShowWeatherDetail] = useState(false);
  const [blessingSent, setBlessingSent] = useState(false);
  const [blessingCount, setBlessingCount] = useState(8826);
  const [dateInfo, setDateInfo] = useState<DateInfo>(getFormattedDate());
  const [weather, setWeather] = useState<RealtimeWeather | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  // Sync date every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setDateInfo(getFormattedDate());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch live weather for Pingyang Shuitou
  const loadWeather = async () => {
    setWeatherLoading(true);
    const data = await fetchShuitouWeather();
    setWeather(data);
    setWeatherLoading(false);
  };

  useEffect(() => {
    loadWeather();
  }, []);

  const cityPresets = [
    { city: '浙江杭州·滨江', km: 365 },
    { city: '上海·浦东新区', km: 480 },
    { city: '广东广州·白云', km: 980 },
    { city: '江苏苏州·工业园', km: 450 },
    { city: '北京·朝阳区', km: 1680 },
    { city: '意大利·米兰 (海外)', km: 9200 },
    { city: '温州·水头本地', km: 0 },
  ];

  const handleBless = () => {
    if (!blessingSent) {
      setBlessingSent(true);
      setBlessingCount((c) => c + 1);
    }
  };

  return (
    <header className="bg-white text-[#1A1A1B] p-3.5 sm:p-5 rounded-3xl shadow-sm border border-gray-100 mb-3 sm:mb-4 transition-all">
      {/* 1. Top row: Logo, Brand & Actions */}
      <div className="flex justify-between items-center gap-2 mb-2.5">
        {/* Logo & Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#B91C1C] rounded-2xl flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-xs shrink-0 select-none">
            水
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-[#1A1A1B] whitespace-nowrap">
                水头家园
              </h1>
              <span className="text-[#B91C1C] text-[10px] font-bold px-1.5 py-0.5 bg-[#FEF2F2] rounded-md border border-red-100 whitespace-nowrap">
                平阳·水头
              </span>
            </div>
            <p className="text-[10px] text-gray-400 truncate hidden xs:block sm:block">
              凝聚乡情 · 服务便民 · 智惠家乡
            </p>
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="flex gap-1.5 sm:gap-2 items-center shrink-0">
          {/* AI Helper trigger */}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100 text-xs font-semibold transition-all active:scale-95"
            title="水头通 AI 智能助手"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse shrink-0" />
            <span className="whitespace-nowrap text-[11px] sm:text-xs">水头通</span>
          </button>

          {/* Post button */}
          {onOpenPublish && (
            <button
              onClick={onOpenPublish}
              className="bg-[#B91C1C] hover:bg-[#991b1b] text-white px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold active:scale-95 transition-all shadow-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="whitespace-nowrap text-[11px] sm:text-xs">发布</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Weather & Live Date Bar (Dedicated Row - Never Collides with Title) */}
      <div 
        onClick={() => setShowWeatherDetail(!showWeatherDetail)}
        className="bg-gradient-to-r from-amber-50/70 via-red-50/40 to-orange-50/60 border border-amber-200/50 rounded-2xl px-3 py-2 mb-2.5 flex items-center justify-between gap-2 cursor-pointer hover:border-amber-300 transition-all select-none shadow-2xs"
        title="点击展开/收起水头镇详细气象与水文参数"
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <CloudSun className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="font-bold text-xs text-[#1A1A1B] whitespace-nowrap">
            水头 {weather ? `${weather.temperature}°C ${weather.condition}` : '28°C 晴间多云'}
          </span>
          {weather && (
            <span className="text-[10px] text-gray-500 hidden sm:inline">
              (湿度{weather.humidity}% · 空气{weather.airQuality})
            </span>
          )}
          {weatherLoading && <RefreshCw className="w-2.5 h-2.5 animate-spin text-gray-400 shrink-0" />}
        </div>

        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-gray-600 shrink-0">
          <span className="font-medium">{dateInfo.gregorian}</span>
          <span className="text-gray-300">|</span>
          <span>{dateInfo.lunar}</span>
          {dateInfo.solarTerm && (
            <span className="text-[#B91C1C] font-bold">
              ({dateInfo.solarTerm})
            </span>
          )}
          <ChevronRight className={`w-3 h-3 text-gray-400 transition-transform ${showWeatherDetail ? 'rotate-90' : ''}`} />
        </div>
      </div>

      {/* Live Weather Detail Dropdown Drawer */}
      {showWeatherDetail && weather && (
        <div className="bg-[#F8F9FA] border border-gray-200/80 rounded-2xl p-3 mb-3 text-xs shadow-sm animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200/60 mb-2">
            <div className="flex items-center gap-2">
              <CloudSun className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-[#1A1A1B]">平阳水头镇 · 实时气象站</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded">
                {weather.updatedAt}
              </span>
            </div>
            <button
              onClick={loadWeather}
              className="text-[10px] text-gray-500 hover:text-[#B91C1C] flex items-center gap-1"
            >
              <RefreshCw className={`w-3 h-3 ${weatherLoading ? 'animate-spin' : ''}`} />
              刷新
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] mb-2">
            <div className="bg-white p-2 rounded-xl border border-gray-100">
              <div className="text-gray-400 text-[10px]">体感温度</div>
              <div className="font-bold text-[#1A1A1B] text-xs mt-0.5">{weather.apparentTemp}°C</div>
            </div>
            <div className="bg-white p-2 rounded-xl border border-gray-100">
              <div className="text-gray-400 text-[10px]">温差范围</div>
              <div className="font-bold text-[#1A1A1B] text-xs mt-0.5">{weather.tempMin}°C ~ {weather.tempMax}°C</div>
            </div>
            <div className="bg-white p-2 rounded-xl border border-gray-100">
              <div className="text-gray-400 text-[10px]">相对湿度</div>
              <div className="font-bold text-[#1A1A1B] text-xs mt-0.5 flex items-center justify-center gap-0.5">
                <Droplets className="w-3 h-3 text-blue-500" />
                {weather.humidity}%
              </div>
            </div>
            <div className="bg-white p-2 rounded-xl border border-gray-100">
              <div className="text-gray-400 text-[10px]">风速 / 空气</div>
              <div className="font-bold text-[#1A1A1B] text-xs mt-0.5 flex items-center justify-center gap-0.5">
                <Wind className="w-3 h-3 text-emerald-500" />
                {weather.windSpeed}m/s · {weather.airQuality}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 bg-white/80 p-2 rounded-xl border border-gray-100">
            💡 <strong className="text-[#1A1A1B]">乡情气象提示：</strong>{weather.tip}
          </div>
        </div>
      )}

      {/* Wanderer Bento Status Bar */}
      <div className="bg-[#F8F9FA] rounded-2xl p-2.5 mb-3 border border-gray-100 text-xs flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 text-[#B91C1C]">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 text-[11px] whitespace-nowrap">游子打拼地:</span>
              <button
                onClick={() => setShowCityPicker(!showCityPicker)}
                className="font-bold text-[#1A1A1B] hover:text-[#B91C1C] underline decoration-[#B91C1C]/40 underline-offset-2 flex items-center gap-0.5 truncate transition-colors"
              >
                {userProfile.currentCity}
                <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
              </button>
            </div>
            <div className="text-[10px] text-gray-500 truncate">
              {userProfile.distanceFromShuitouKm > 0 ? (
                <>
                  离家打拼 <strong className="text-[#B91C1C]">{userProfile.daysAway}</strong> 天 · 
                  距老家水头 <strong className="text-[#1A1A1B]">{userProfile.distanceFromShuitouKm}</strong> km
                </>
              ) : (
                <span className="text-emerald-600 font-semibold">身在水头老家 · 建设美丽家园</span>
              )}
            </div>
          </div>
        </div>

        {/* Bless Hometown Button */}
        <button
          onClick={handleBless}
          disabled={blessingSent}
          className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all shadow-2xs ${
            blessingSent
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold'
              : 'bg-white hover:bg-gray-50 text-[#1A1A1B] border border-gray-200 active:scale-95'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${blessingSent ? 'fill-emerald-600 text-emerald-600' : 'text-[#B91C1C] fill-[#B91C1C]'}`} />
          <span className="whitespace-nowrap">{blessingSent ? '已祈福' : '为家乡祈福'}</span>
          <span className="text-[10px] text-gray-400 font-mono">({blessingCount})</span>
        </button>
      </div>

      {/* City Switcher Modal Dropdown */}
      {showCityPicker && (
        <div className="bg-white border border-gray-200 rounded-2xl p-3 mb-3 text-xs shadow-lg animate-in fade-in zoom-in-95">
          <div className="text-[11px] text-gray-400 mb-2 flex items-center justify-between">
            <span>选择当前打拼城市 (实时测算与老家水头的距离):</span>
            <button
              onClick={() => setShowCityPicker(false)}
              className="text-gray-400 hover:text-gray-700 px-1"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
            {cityPresets.map((item) => (
              <button
                key={item.city}
                onClick={() => {
                  onUpdateCity(item.city, item.km);
                  setShowCityPicker(false);
                }}
                className={`py-1.5 px-2 rounded-xl text-left truncate transition-all ${
                  userProfile.currentCity === item.city
                    ? 'bg-[#B91C1C] text-white font-bold shadow-xs'
                    : 'bg-[#F8F9FA] text-[#1A1A1B] hover:bg-gray-100 border border-gray-100'
                }`}
              >
                <div className="truncate font-medium text-xs">{item.city}</div>
                <div className={`text-[10px] ${userProfile.currentCity === item.city ? 'text-red-100' : 'text-gray-400'}`}>
                  {item.km === 0 ? '本地' : `${item.km}km`}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Input Bar (Bento style) */}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-gray-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="搜索水头老街排骨 / 皮具直销 / 招工求职 / 班车客运..."
          className="w-full pl-10 pr-8 py-2.5 rounded-2xl bg-[#F8F9FA] text-[#1A1A1B] text-xs placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] border border-gray-100 transition-all shadow-2xs"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 text-gray-400 hover:text-gray-600 text-xs px-1"
          >
            ✕
          </button>
        )}
      </div>
    </header>
  );
};

