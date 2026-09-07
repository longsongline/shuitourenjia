import React, { useState } from 'react';
import { UserProfile, CouponTicket } from '../types';
import { 
  User, 
  MapPin, 
  Ticket, 
  Award, 
  Briefcase, 
  Sparkles, 
  ChevronRight, 
  QrCode, 
  Share2
} from 'lucide-react';

interface ProfileTabProps {
  userProfile: UserProfile;
  vouchers: CouponTicket[];
  onOpenAiAssistant: () => void;
  onOpenVoucherModal: (v: CouponTicket) => void;
  onUpdateCity: (city: string, km: number) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  userProfile,
  vouchers,
  onOpenAiAssistant,
  onOpenVoucherModal,
  onUpdateCity,
}) => {
  const [activeSubView, setActiveSubView] = useState<'vouchers' | 'none'>('none');

  const unusedVouchers = vouchers.filter((v) => v.status === 'unused');

  return (
    <div className="space-y-4 pb-12">
      {/* Dark Bento Profile Header (Matching Bento Grid dark card archetype) */}
      <div className="bg-[#1A1A1B] text-white rounded-3xl p-6 shadow-sm border border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#B91C1C]" />
        
        <div className="flex items-center gap-4 mb-4">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-md"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-lg text-white truncate">
                {userProfile.name}
              </h3>
              {userProfile.isCertified && (
                <span className="text-[10px] bg-[#B91C1C] text-white font-medium px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                  <Award className="w-3 h-3" />
                  水头乡亲认证
                </span>
              )}
            </div>
            <div className="text-xs text-gray-400 mt-1 flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#B91C1C] shrink-0" />
              <span className="truncate">籍贯：{userProfile.hometownVillage}</span>
            </div>
          </div>
        </div>

        {/* Wanderer metric dashboard in Bento style */}
        <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <div className="text-[10px] text-gray-400">现居城市</div>
            <div className="font-bold text-amber-300 text-sm truncate mt-1">
              {userProfile.currentCity}
            </div>
          </div>
          <div className="border-x border-white/10">
            <div className="text-[10px] text-gray-400">离乡打拼</div>
            <div className="font-bold text-white text-sm mt-1">
              {userProfile.daysAway} <span className="text-[10px] font-normal text-gray-400">天</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400">距老家水头</div>
            <div className="font-bold text-amber-300 text-sm mt-1">
              {userProfile.distanceFromShuitouKm} <span className="text-[10px] font-normal text-gray-400">km</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-300 mt-3.5 italic leading-relaxed px-1">
          “{userProfile.bio}”
        </p>
      </div>

      {/* Quick Action Bento Cards: Vouchers & AI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => setActiveSubView(activeSubView === 'vouchers' ? 'none' : 'vouchers')}
          className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm cursor-pointer hover:border-gray-200 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#FEF2F2] text-[#B91C1C] flex items-center justify-center border border-red-100">
              <Ticket className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#B91C1C] bg-[#FEF2F2] px-2.5 py-1 rounded-full border border-red-100">
              {unusedVouchers.length} 张待用
            </span>
          </div>
          <div className="mt-4">
            <h4 className="font-bold text-sm text-[#1A1A1B]">我的团购券包</h4>
            <p className="text-xs text-gray-400 mt-0.5">回乡消费到店出示二维码核销使用</p>
          </div>
        </div>

        <div
          onClick={onOpenAiAssistant}
          className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm cursor-pointer hover:border-gray-200 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 font-bold px-2 py-0.5 rounded-full">
              智能问答
            </span>
          </div>
          <div className="mt-4">
            <h4 className="font-bold text-sm text-[#1A1A1B]">水头通 · 乡情AI助手</h4>
            <p className="text-xs text-gray-400 mt-0.5">本地美食推荐、皮革产业行情与温州方言翻译</p>
          </div>
        </div>
      </div>

      {/* Claimed Vouchers List Bento Card */}
      {vouchers.length > 0 && (
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-sm text-[#1A1A1B] flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-[#B91C1C]" />
              我的水头特惠券包
            </h4>
            <span className="text-xs text-gray-400">共 {vouchers.length} 张</span>
          </div>

          <div className="space-y-3">
            {vouchers.map((v) => (
              <div
                key={v.id}
                onClick={() => onOpenVoucherModal(v)}
                className="p-3.5 rounded-2xl border border-gray-200 bg-[#F8F9FA] hover:border-gray-300 transition-all cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-[#1A1A1B] truncate">
                    {v.storeName}
                  </div>
                  <div className="text-xs text-[#B91C1C] font-semibold truncate mt-0.5">
                    {v.title}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">
                    有效至: {v.validUntil}
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end gap-1.5">
                  <span className="text-base font-extrabold text-[#B91C1C] font-mono">
                    ¥{v.discountPrice}
                  </span>
                  <button className="px-3 py-1 rounded-xl bg-[#B91C1C] text-white text-[10px] font-medium flex items-center gap-1 shadow-2xs hover:bg-[#991b1b]">
                    <QrCode className="w-3 h-3" />
                    核销码
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service & Community Links Menu (Bento Card) */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-2 text-xs">
        <div className="p-3.5 rounded-2xl flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-[#1A1A1B]">水头在外同乡联络处</div>
              <div className="text-[11px] text-gray-400">杭州、上海、广东、意大利普拉托联络处通讯录</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

        <div className="p-3.5 rounded-2xl flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-[#1A1A1B]">返乡创业青年人才扶持政策</div>
              <div className="text-[11px] text-gray-400">皮件产业升级与跨境电商创业免息贷款补贴</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

        <div 
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText('【平阳水头在线·乡情家园】在外打拼也能时刻关注老家水头变化，快来看看吧！');
              alert('小程序推荐口令已复制，可发给老乡！');
            }
          }}
          className="p-3.5 rounded-2xl flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-[#1A1A1B]">推荐给身边的水头老乡</div>
              <div className="text-[11px] text-gray-400">凝聚乡情力量，共建线上家园</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Platform Info Footer */}
      <div className="text-center text-[11px] text-gray-400 space-y-1 pt-3">
        <div>平阳水头在线 · 乡情家园</div>
        <div>聚乡亲 · 兴商贸 · 留乡愁 · 助民生</div>
      </div>
    </div>
  );
};
