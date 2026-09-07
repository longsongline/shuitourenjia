import React, { useState } from 'react';
import { StoreItem } from '../types';
import { 
  Store, 
  MapPin, 
  Phone, 
  Star, 
  Percent, 
  ShoppingBag, 
  CheckCircle2, 
  PlusCircle, 
  Truck,
  Sparkles
} from 'lucide-react';

interface CommerceTabProps {
  stores: StoreItem[];
  searchQuery: string;
  onClaimCoupon: (store: StoreItem) => void;
  onOpenStoreModal: () => void;
  isMobileFrame?: boolean;
}

export const CommerceTab: React.FC<CommerceTabProps> = ({
  stores,
  searchQuery,
  onClaimCoupon,
  onOpenStoreModal,
  isMobileFrame = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [copiedTel, setCopiedTel] = useState<string | null>(null);

  const categories = ['全部', '美食餐饮', '皮具直销', '生活商超', '茶饮夜市', '休娱丽人'];

  const filteredStores = stores.filter((store) => {
    const matchesCategory = selectedCategory === '全部' || store.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      store.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCall = (tel: string) => {
    setCopiedTel(tel);
    setTimeout(() => setCopiedTel(null), 2500);
    window.location.href = `tel:${tel}`;
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Bento Merchant Join Promo Hero */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#B91C1C]"></div>
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#B91C1C] mb-1">
            <Sparkles className="w-3.5 h-3.5" /> 水头商圈 · 助商惠民
          </div>
          <h3 className="font-bold text-base sm:text-lg text-[#1A1A1B] leading-tight">
            水头特色餐饮 / 中国皮都源头工厂店免费入驻
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            覆盖本地同城常住客源，同时面向数万名在外经商求学的水头老乡宣传带货
          </p>
        </div>
        <button
          onClick={onOpenStoreModal}
          className="shrink-0 px-4 py-2 bg-[#B91C1C] hover:bg-[#991b1b] text-white font-medium rounded-xl text-xs shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          商家免费入驻
        </button>
      </div>

      {/* Category Filter Pills (Bento Style) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#1A1A1B] text-white shadow-xs font-bold'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notice on Leather / Food Local Delivery */}
      <div className="bg-[#FEF2F2] border border-red-100 rounded-2xl p-3 flex items-center gap-2 text-xs text-[#1A1A1B]">
        <Truck className="w-4 h-4 text-[#B91C1C] shrink-0" />
        <span>
          <strong className="text-[#B91C1C]">游子特产直寄服务：</strong> 水头老字号特产与皮革城直销好物均支持<strong>全国顺丰包邮直达</strong>，在外地也能买到家乡正宗好货！
        </span>
      </div>

      {/* Stores & Group Buy List (Bento Grid Cards) */}
      <div className={isMobileFrame ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 lg:grid-cols-2 gap-4'}>
        {filteredStores.map((store) => (
          <div
            key={store.id}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-5 hover:border-gray-200 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header: Store Image + Info */}
              <div className="flex gap-3.5 sm:gap-4">
                <div className="relative shrink-0">
                  <img
                    src={store.coverImage}
                    alt={store.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-gray-100 shadow-2xs"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 left-1 text-[9px] font-bold text-white bg-black/65 backdrop-blur-xs px-1.5 py-0.5 rounded-md whitespace-nowrap">
                    {store.category}
                  </span>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex items-start justify-between gap-1.5">
                      <h4 className="font-bold text-sm sm:text-base text-[#1A1A1B] leading-snug truncate">
                        {store.name}
                      </h4>
                      <span className="text-[10px] font-bold text-[#B91C1C] bg-[#FEF2F2] px-2 py-0.5 rounded-full border border-red-100 shrink-0 whitespace-nowrap">
                        {store.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-xs flex-wrap">
                      <div className="flex items-center text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                        {store.rating}
                      </div>
                      <span className="text-gray-300">·</span>
                      <span className="text-gray-500 text-[11px] whitespace-nowrap">已售 {store.soldCount}+</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-gray-400 text-[11px] flex items-center gap-0.5 whitespace-nowrap">
                        <MapPin className="w-3 h-3 text-gray-400" /> {store.distance}
                      </span>
                    </div>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {store.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] sm:text-[11px] bg-stone-50 text-stone-600 px-2 py-0.5 rounded-lg border border-stone-200/60 whitespace-nowrap font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 mt-3 line-clamp-2 leading-relaxed bg-[#F8F9FA] p-2.5 rounded-2xl border border-gray-100">
                {store.description}
              </p>
            </div>

            <div>
              {/* Address & Tel */}
              <div className="flex items-center justify-between gap-2.5 text-xs text-gray-500 mt-3 pt-2.5 border-t border-gray-100">
                <div className="flex items-center gap-1 text-xs text-gray-500 min-w-0 flex-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B91C1C] shrink-0" />
                  <span className="truncate">{store.address}</span>
                </div>
                <button
                  onClick={() => handleCall(store.tel)}
                  className="shrink-0 whitespace-nowrap flex items-center gap-1 text-[#1A1A1B] hover:text-[#B91C1C] font-semibold text-xs bg-gray-50 hover:bg-gray-100 active:scale-95 px-3 py-1.5 rounded-xl border border-gray-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B91C1C]" />
                  <span>联系商家</span>
                </button>
              </div>

              {/* Group Buy Voucher Promo Box */}
              {store.couponTitle && (
                <div className="mt-3 bg-gradient-to-r from-red-50/80 via-orange-50/50 to-amber-50/40 border border-red-100/90 rounded-2xl p-3 flex items-center justify-between gap-2.5">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 text-[11px] text-[#B91C1C] font-bold whitespace-nowrap">
                      <Percent className="w-3 h-3 text-[#B91C1C]" />
                      <span>同城上新特惠券</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#1A1A1B] truncate mt-0.5">
                      {store.couponTitle}
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-1 flex-wrap">
                      <span className="text-xs text-[#B91C1C] font-bold">¥</span>
                      <span className="text-base sm:text-lg text-[#B91C1C] font-black leading-none">
                        {store.discountPrice}
                      </span>
                      {store.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ¥{store.originalPrice}
                        </span>
                      )}
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold border border-emerald-200 whitespace-nowrap">
                        立省 ¥{((store.originalPrice || 0) - (store.discountPrice || 0)).toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onClaimCoupon(store)}
                    className="shrink-0 whitespace-nowrap px-3.5 py-2 bg-[#B91C1C] hover:bg-[#991b1b] text-white font-bold text-xs rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>抢券团购</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {copiedTel && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1B] text-white text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-white/10">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>正在拨打: {copiedTel}</span>
        </div>
      )}
    </div>
  );
};
