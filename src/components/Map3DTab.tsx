import React, { useState } from 'react';
import { 
  Compass, 
  Layers, 
  Sun, 
  Moon, 
  RotateCw, 
  MapPin, 
  Car, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  Maximize2,
  Navigation,
  Sparkles,
  ParkingMeter,
  Activity
} from 'lucide-react';
import { ShuitouRoads3D } from './ShuitouRoads3D';
import { RoadTrafficInfo } from '../types';

export const SHUITOU_ROADS: RoadTrafficInfo[] = [
  {
    id: 'zhenxing-mid',
    name: '振兴中路 (商业核心区)',
    direction: '北湖公园 ⇄ 镇前街商圈',
    status: 'slow',
    currentSpeedKmH: 24,
    speedLimitKmH: 50,
    lengthKm: 1.8,
    travelTimeMin: 4.5,
    incident: '商圈沿街车流密集，建议注意避让行人',
  },
  {
    id: 'zhenxing-north',
    name: '振兴北路 (新城大道)',
    direction: '新城商厦 ⇄ 外环西路',
    status: 'smooth',
    currentSpeedKmH: 48,
    speedLimitKmH: 60,
    lengthKm: 2.2,
    travelTimeMin: 2.8,
  },
  {
    id: 'jinsong-west',
    name: '劲松西路 (客运与医疗通道)',
    direction: '水头客运站 ⇄ 平阳二院',
    status: 'smooth',
    currentSpeedKmH: 52,
    speedLimitKmH: 60,
    lengthKm: 3.1,
    travelTimeMin: 3.6,
  },
  {
    id: 'gongnong',
    name: '工农南路 (老街特色集市)',
    direction: '水头老江桥 ⇄ 农贸市场',
    status: 'congested',
    currentSpeedKmH: 16,
    speedLimitKmH: 40,
    lengthKm: 1.4,
    travelTimeMin: 5.3,
    incident: '传统集市早高峰人流车流交织，单向缓行',
  },
  {
    id: 'bridge-daixi',
    name: '带溪跨江大桥 (水头大桥)',
    direction: '南岸老街 ⇄ 北岸新城区',
    status: 'smooth',
    currentSpeedKmH: 46,
    speedLimitKmH: 60,
    lengthKm: 0.8,
    travelTimeMin: 1.1,
  },
  {
    id: 'yingbin',
    name: '迎宾大道 (高铁高速连接线)',
    direction: '水头互通 ⇄ 鳌江站快速路',
    status: 'smooth',
    currentSpeedKmH: 68,
    speedLimitKmH: 80,
    lengthKm: 4.5,
    travelTimeMin: 3.9,
  },
  {
    id: 'huancheng-west',
    name: '环城西路 (货运疏解主干道)',
    direction: '皮革工业园 ⇄ 工业南区',
    status: 'smooth',
    currentSpeedKmH: 56,
    speedLimitKmH: 60,
    lengthKm: 3.8,
    travelTimeMin: 4.1,
  },
  {
    id: 'jiangbin-green',
    name: '沿溪江滨景观大道',
    direction: '带溪绿道 ⇄ 滨水健身步道',
    status: 'smooth',
    currentSpeedKmH: 38,
    speedLimitKmH: 40,
    lengthKm: 2.6,
    travelTimeMin: 4.0,
  },
];

interface Map3DTabProps {
  onNavigateToNews?: () => void;
}

export const Map3DTab: React.FC<Map3DTabProps> = () => {
  const [activeRoad, setActiveRoad] = useState<RoadTrafficInfo>(SHUITOU_ROADS[0]);
  const [filterType, setFilterType] = useState<'all' | 'slow_congested' | 'smooth'>('all');
  const [mapEngine, setMapEngine] = useState<'gaode' | 'baidu' | 'cyber'>('gaode');

  const filteredRoads = SHUITOU_ROADS.filter((r) => {
    if (filterType === 'slow_congested') return r.status === 'slow' || r.status === 'congested';
    if (filterType === 'smooth') return r.status === 'smooth';
    return true;
  });

  return (
    <div className="space-y-4 pb-12">
      {/* 1. Real-time Cartography Telemetry Header */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2 h-4 bg-[#B91C1C] rounded-full inline-block" />
              <h2 className="font-black text-lg sm:text-xl text-[#1A1A1B]">
                水头镇数字孪生路网 · 3D实况专栏
              </h2>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                高德 / 百度实况联动中
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              全域还原水头镇核心干道、带溪水系桥梁与皮革产业地标，实时展示交通速度与拥堵流光
            </p>
          </div>

          {/* Map Engine Toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-2xl shrink-0 self-stretch sm:self-auto justify-between sm:justify-start">
            <button
              onClick={() => setMapEngine('gaode')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                mapEngine === 'gaode'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-gray-600 hover:text-[#1A1A1B]'
              }`}
            >
              高德实况路网
            </button>
            <button
              onClick={() => setMapEngine('baidu')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                mapEngine === 'baidu'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-gray-600 hover:text-[#1A1A1B]'
              }`}
            >
              百度深色底图
            </button>
            <button
              onClick={() => setMapEngine('cyber')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                mapEngine === 'cyber'
                  ? 'bg-[#1A1A1B] text-amber-400 shadow-xs'
                  : 'text-gray-600 hover:text-[#1A1A1B]'
              }`}
            >
              夜景流光
            </button>
          </div>
        </div>

        {/* Real-time Traffic Telemetry Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-2xl p-2.5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-emerald-800 font-medium">全镇路网畅通率</div>
              <div className="text-base font-black text-emerald-900 leading-tight">87.5%</div>
            </div>
          </div>

          <div className="bg-blue-50/70 border border-blue-200/60 rounded-2xl p-2.5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-blue-800 font-medium">全域平均车速</div>
              <div className="text-base font-black text-blue-900 leading-tight">42.8 km/h</div>
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-2.5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
              <Car className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-amber-800 font-medium">综合拥堵指数</div>
              <div className="text-base font-black text-amber-900 leading-tight">1.28 (畅通)</div>
            </div>
          </div>

          <div className="bg-rose-50/70 border border-rose-200/60 rounded-2xl p-2.5 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#B91C1C] text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-rose-800 font-medium">重点关注路段</div>
              <div className="text-base font-black text-[#B91C1C] leading-tight">工农老街段</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 3D Digital Twin Canvas Section */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border border-gray-100 shadow-sm">
        <ShuitouRoads3D />
      </div>

      {/* 3. Detailed Road Condition Cards & Live Navigation */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-[#B91C1C]" />
            <h3 className="font-bold text-base text-[#1A1A1B]">
              平阳水头镇主要道路路况实测表
            </h3>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                filterType === 'all'
                  ? 'bg-[#1A1A1B] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              全部干道 ({SHUITOU_ROADS.length})
            </button>
            <button
              onClick={() => setFilterType('slow_congested')}
              className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                filterType === 'slow_congested'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              缓行/拥堵 (2)
            </button>
            <button
              onClick={() => setFilterType('smooth')}
              className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                filterType === 'smooth'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              畅通干道 (6)
            </button>
          </div>
        </div>

        {/* Road List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {filteredRoads.map((road) => {
            const isSelected = activeRoad.id === road.id;
            return (
              <div
                key={road.id}
                onClick={() => setActiveRoad(road)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-red-50/40 border-[#B91C1C] ring-2 ring-[#B91C1C]/15'
                    : 'bg-gray-50 hover:bg-gray-100/70 border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-[#1A1A1B]">
                        {road.name}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                          road.status === 'smooth'
                            ? 'bg-emerald-100 text-emerald-800'
                            : road.status === 'slow'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-[#B91C1C]'
                        }`}
                      >
                        {road.status === 'smooth' ? '🟢 畅通' : road.status === 'slow' ? '🟡 缓行' : '🔴 拥堵'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      起止方位: {road.direction}
                    </p>
                  </div>

                  {/* Realtime Speed */}
                  <div className="text-right shrink-0">
                    <div className="text-base font-black text-[#1A1A1B]">
                      {road.currentSpeedKmH} <span className="text-xs font-normal text-gray-400">km/h</span>
                    </div>
                    <div className="text-[10px] text-gray-400">
                      限速 {road.speedLimitKmH} km/h
                    </div>
                  </div>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-200/50 text-[11px] text-gray-600">
                  <span>全长 {road.lengthKm} km</span>
                  <span>·</span>
                  <span>预计通行 {road.travelTimeMin} 分钟</span>
                  {road.incident && (
                    <span className="text-amber-600 font-medium truncate ml-auto">
                      ⚠️ {road.incident}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Road Insight Panel */}
        {activeRoad && (
          <div className="bg-[#F8F9FA] rounded-2xl p-3.5 border border-gray-200/80 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-[#1A1A1B] flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#B91C1C]" />
                已选路段通行指引 · {activeRoad.name}
              </span>
              <span className="text-gray-400 text-[11px]">高德地图实时推算</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              当前实测通行车速为 <strong>{activeRoad.currentSpeedKmH} km/h</strong>，预计行驶耗时 <strong>{activeRoad.travelTimeMin} 分钟</strong>。
              {activeRoad.status === 'congested'
                ? ' 建议走振兴北路或沿溪江滨大道绕行避开老街农贸市场早高峰拥堵点。'
                : ' 道路畅通，绿波通行良好，适合自驾及新能源公交接驳。'}
            </p>
          </div>
        )}
      </div>

      {/* 4. Local Public Transit & Parking Assistant */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Realtime Bus Hub info */}
        <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-sm text-[#1A1A1B] flex items-center gap-1.5">
              <span className="w-1.5 h-3.5 bg-blue-600 rounded-full inline-block" />
              水头汽车客运中心 · 实时专线班次
            </h4>
            <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
              30分钟达高铁站
            </span>
          </div>
          <div className="space-y-1.5 text-xs text-gray-600">
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span>水头 ⇄ 鳌江动车站 (客运快速大巴)</span>
              <strong className="text-[#1A1A1B]">约15分钟/班 · 畅通</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span>水头 ⇄ 平阳二院 ⇄ 腾蛟 (新能源公交)</span>
              <strong className="text-emerald-600">正在发车 · 准点</strong>
            </div>
            <div className="flex justify-between py-1">
              <span>水头 ⇄ 温州龙湾国际机场 (定制拼车)</span>
              <strong className="text-[#B91C1C]">可提前预约接送</strong>
            </div>
          </div>
        </div>

        {/* Realtime Parking Availability */}
        <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-sm text-[#1A1A1B] flex items-center gap-1.5">
              <span className="w-1.5 h-3.5 bg-amber-500 rounded-full inline-block" />
              水头商圈智能停车 · 剩余空车位
            </h4>
            <span className="text-[10px] text-gray-400">实时地磁感应</span>
          </div>
          <div className="space-y-1.5 text-xs text-gray-600">
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span>中国皮都皮革城地下停车场 (1500位)</span>
              <span className="text-emerald-600 font-bold">空余 186 车位</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span>振兴路老街公共停车场</span>
              <span className="text-amber-600 font-bold">空余 24 车位 (较紧张)</span>
            </div>
            <div className="flex justify-between py-1">
              <span>水头镇行政服务中心地面车库</span>
              <span className="text-emerald-600 font-bold">空余 62 车位</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
