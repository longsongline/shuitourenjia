import React, { useState } from 'react';
import { CouponTicket } from '../types';
import { X, QrCode, CheckCircle2, Store, Clock, MapPin } from 'lucide-react';

interface VoucherModalProps {
  voucher: CouponTicket | null;
  onClose: () => void;
  onRedeem: (voucherId: string) => void;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({
  voucher,
  onClose,
  onRedeem,
}) => {
  if (!voucher) return null;

  const [isRedeemed, setIsRedeemed] = useState(voucher.status === 'used');

  const handleSimulateRedeem = () => {
    setIsRedeemed(true);
    onRedeem(voucher.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-stone-200 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 to-amber-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4" />
            <span className="font-bold text-xs">{voucher.storeName}</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Voucher Body */}
        <div className="p-5 text-center space-y-4 text-xs">
          <div>
            <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              水头商圈专属优惠
            </span>
            <h3 className="text-base font-extrabold text-stone-900 mt-1">
              {voucher.title}
            </h3>
            <div className="flex items-baseline justify-center gap-1.5 mt-1">
              <span className="text-xs text-rose-600 font-bold">券后价 ¥</span>
              <span className="text-2xl text-rose-600 font-extrabold font-mono">
                {voucher.discountPrice}
              </span>
              <span className="text-xs text-stone-400 line-through">
                ¥{voucher.originalPrice}
              </span>
            </div>
          </div>

          {/* QR Code & Barcode Simulator Box */}
          <div className={`p-4 rounded-2xl border-2 transition-all ${
            isRedeemed
              ? 'bg-stone-100 border-stone-300 opacity-60'
              : 'bg-stone-50 border-rose-200/80'
          }`}>
            {isRedeemed ? (
              <div className="py-8 flex flex-col items-center justify-center gap-2 text-stone-500">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                <span className="font-bold text-sm text-stone-700">此券已成功核销</span>
                <span className="text-[10px]">水头商家感谢您的支持！</span>
              </div>
            ) : (
              <>
                {/* Simulated Barcode */}
                <div className="flex justify-center items-center h-12 space-x-1 mb-2 px-4">
                  {[4, 2, 6, 2, 8, 3, 2, 5, 2, 7, 3, 4, 8, 2, 4, 3, 6, 2, 5, 3].map((w, i) => (
                    <div
                      key={i}
                      className="bg-stone-900 h-full rounded-xs"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
                <div className="font-mono text-stone-600 font-bold tracking-widest text-xs mb-3">
                  ST-{voucher.id.slice(-8).toUpperCase()}
                </div>

                {/* Simulated QR Pattern */}
                <div className="w-36 h-36 mx-auto bg-white p-2.5 rounded-xl border border-stone-200 shadow-inner flex flex-col justify-between">
                  <div className="grid grid-cols-6 gap-1 w-full h-full">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-xs ${
                          (i % 2 === 0 || i % 5 === 0 || i < 7 || i > 28)
                            ? 'bg-stone-900'
                            : 'bg-stone-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-stone-400 mt-2">
                  到水头实体门店出示此码即可核销抵扣
                </div>
              </>
            )}
          </div>

          <div className="text-[11px] text-stone-400 space-y-1 text-left bg-stone-50 p-3 rounded-xl">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              <span>有效期至：{voucher.validUntil}</span>
            </div>
            <div>• 到店可用，支持堂食/自提或水头皮具全国直寄时使用。</div>
            <div>• 最终解释权归水头合作商户所有。</div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            {!isRedeemed ? (
              <button
                onClick={handleSimulateRedeem}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs active:scale-95 transition-all shadow-md flex items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-4 h-4" />
                模拟商家扫码核销
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex-1 py-2.5 bg-stone-800 text-white font-bold rounded-xl text-xs hover:bg-stone-900"
              >
                已完成并关闭
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
