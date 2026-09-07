import React, { useState } from 'react';
import { X, Send, Image, Plus, Briefcase, Store, MessageSquare, CheckCircle2 } from 'lucide-react';
import { ForumPost, JobItem, StoreItem } from '../types';

interface PublishModalProps {
  initialType?: 'post' | 'job' | 'store';
  onClose: () => void;
  onAddPost: (post: Omit<ForumPost, 'id' | 'likes' | 'comments' | 'time'>) => void;
  onAddJob: (job: Omit<JobItem, 'id' | 'postedTime'>) => void;
  onAddStore: (store: Omit<StoreItem, 'id' | 'rating' | 'soldCount'>) => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  initialType = 'post',
  onClose,
  onAddPost,
  onAddJob,
  onAddStore,
}) => {
  const [publishType, setPublishType] = useState<'post' | 'job' | 'store'>(initialType);
  const [successToast, setSuccessToast] = useState(false);

  // Post form states
  const [postAuthor, setPostAuthor] = useState('水头乡亲');
  const [postCity, setPostCity] = useState('浙江·水头');
  const [postTag, setPostTag] = useState<'乡音闲聊' | '打听互助' | '游子归乡' | '水头新鲜事' | '拼车拼单'>('水头新鲜事');
  const [postContent, setPostContent] = useState('');
  const [postImageUrl, setPostImageUrl] = useState('');

  // Job form states
  const [jobTitle, setJobTitle] = useState('');
  const [jobCompany, setJobCompany] = useState('');
  const [jobSalary, setJobSalary] = useState('');
  const [jobLocation, setJobLocation] = useState('平阳县水头镇');
  const [jobTags, setJobTags] = useState('包吃住, 提成丰厚');
  const [jobReqs, setJobReqs] = useState('');
  const [jobContact, setJobContact] = useState('');
  const [jobPhone, setJobPhone] = useState('');
  const [jobWechat, setJobWechat] = useState('');

  // Store form states
  const [storeName, setStoreName] = useState('');
  const [storeCat, setStoreCat] = useState<'美食餐饮' | '皮具直销' | '生活商超' | '休娱丽人' | '茶饮夜市'>('美食餐饮');
  const [storeAddress, setStoreAddress] = useState('水头镇振兴路');
  const [storeTel, setStoreTel] = useState('');
  const [storeTags, setStoreTags] = useState('老字号, 特色美食');
  const [storeCoupon, setStoreCoupon] = useState('');
  const [storeOrigPrice, setStoreOrigPrice] = useState('50');
  const [storeDiscPrice, setStoreDiscPrice] = useState('35');
  const [storeDesc, setStoreDesc] = useState('');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    onAddPost({
      author: postAuthor || '水头老乡',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      tag: postTag,
      currentCity: postCity,
      content: postContent.trim(),
      images: postImageUrl ? [postImageUrl] : [],
      isLiked: false,
    });

    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      onClose();
    }, 1200);
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim() || !jobCompany.trim() || !jobPhone.trim()) return;

    const requirementsArray = jobReqs
      ? jobReqs.split('\n').filter((r) => r.trim())
      : ['身体健康，吃苦耐劳', '具备良好团队沟通能力'];

    const tagsArray = jobTags
      ? jobTags.split(/[,，]/).map((t) => t.trim()).filter(Boolean)
      : ['全职', '本地急聘'];

    onAddJob({
      title: jobTitle.trim(),
      company: jobCompany.trim(),
      salary: jobSalary || '面议',
      location: jobLocation || '水头镇',
      type: '急聘',
      tags: tagsArray,
      requirements: requirementsArray,
      contactName: jobContact || '招聘负责人',
      phone: jobPhone.trim(),
      wechat: jobWechat.trim() || jobPhone.trim(),
    });

    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      onClose();
    }, 1200);
  };

  const handleStoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim() || !storeTel.trim()) return;

    const tagsArray = storeTags
      ? storeTags.split(/[,，]/).map((t) => t.trim()).filter(Boolean)
      : ['水头优选', '品质好物'];

    onAddStore({
      name: storeName.trim(),
      category: storeCat,
      address: storeAddress,
      distance: '同城0.5km',
      tel: storeTel.trim(),
      tags: tagsArray,
      couponTitle: storeCoupon || undefined,
      originalPrice: storeOrigPrice ? Number(storeOrigPrice) : undefined,
      discountPrice: storeDiscPrice ? Number(storeDiscPrice) : undefined,
      description: storeDesc || `${storeName} 欢迎水头乡亲光临惠顾！`,
      coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=80',
    });

    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-gray-200">
        {/* Header with 3 Bento-style Tabs */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-[#F8F9FA] p-1 rounded-2xl text-xs border border-gray-100">
            <button
              onClick={() => setPublishType('post')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                publishType === 'post' ? 'bg-[#1A1A1B] text-white shadow-xs' : 'text-gray-500 hover:text-[#1A1A1B]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              发微帖
            </button>
            <button
              onClick={() => setPublishType('job')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                publishType === 'job' ? 'bg-[#1A1A1B] text-white shadow-xs' : 'text-gray-500 hover:text-[#1A1A1B]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              发招工
            </button>
            <button
              onClick={() => setPublishType('store')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                publishType === 'store' ? 'bg-[#1A1A1B] text-white shadow-xs' : 'text-gray-500 hover:text-[#1A1A1B]'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              商家入驻
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-5 overflow-y-auto flex-1 text-xs">
          {successToast ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2 text-[#1A1A1B]">
              <CheckCircle2 className="w-12 h-12 text-[#B91C1C] animate-bounce" />
              <div className="font-bold text-base">发布成功！</div>
              <p className="text-gray-500 text-xs">已同步展示在平阳水头家园平台</p>
            </div>
          ) : (
            <>
              {/* Post Form */}
              {publishType === 'post' && (
                <form onSubmit={handlePostSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#1A1A1B] block mb-1">您的昵称</label>
                      <input
                        type="text"
                        value={postAuthor}
                        onChange={(e) => setPostAuthor(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#1A1A1B] block mb-1">所在城市</label>
                      <input
                        type="text"
                        value={postCity}
                        onChange={(e) => setPostCity(e.target.value)}
                        placeholder="如：杭州、上海、水头"
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#1A1A1B] block mb-1">板块标签</label>
                    <select
                      value={postTag}
                      onChange={(e) => setPostTag(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                    >
                      <option value="水头新鲜事">水头新鲜事</option>
                      <option value="乡音闲聊">乡音闲聊</option>
                      <option value="打听互助">打听互助</option>
                      <option value="游子归乡">游子归乡</option>
                      <option value="拼车拼单">拼车拼单</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#1A1A1B] block mb-1">内容详情</label>
                    <textarea
                      rows={4}
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="分享家乡趣事、打听老乡、拼车回水头，或在外游子心声..."
                      className="w-full p-3 rounded-2xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#1A1A1B] block mb-1">配图 URL (可选)</label>
                    <input
                      type="text"
                      value={postImageUrl}
                      onChange={(e) => setPostImageUrl(e.target.value)}
                      placeholder="输入图片网络地址..."
                      className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#B91C1C] hover:bg-[#991b1b] active:scale-95 text-white font-medium rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    立即发布到乡情圈
                  </button>
                </form>
              )}

              {/* Job Form */}
              {publishType === 'job' && (
                <form onSubmit={handleJobSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#1A1A1B] block mb-1">招聘职位</label>
                      <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="如：皮具车位工/外贸业务员"
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#1A1A1B] block mb-1">企业/商铺名称</label>
                      <input
                        type="text"
                        value={jobCompany}
                        onChange={(e) => setJobCompany(e.target.value)}
                        placeholder="如：平阳某皮业有限公司"
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#1A1A1B] block mb-1">薪资待遇</label>
                      <input
                        type="text"
                        value={jobSalary}
                        onChange={(e) => setJobSalary(e.target.value)}
                        placeholder="如：6000-9000元/月"
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#1A1A1B] block mb-1">工作地点</label>
                      <input
                        type="text"
                        value={jobLocation}
                        onChange={(e) => setJobLocation(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#1A1A1B] block mb-1">岗位福利标签 (逗号分隔)</label>
                    <input
                      type="text"
                      value={jobTags}
                      onChange={(e) => setJobTags(e.target.value)}
                      placeholder="包吃住, 年终奖, 五险, 弹性工作"
                      className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#1A1A1B] block mb-1">任职要求 (每行一条)</label>
                    <textarea
                      rows={2}
                      value={jobReqs}
                      onChange={(e) => setJobReqs(e.target.value)}
                      placeholder="1. 熟练掌握皮包缝纫平车&#10;2. 能适应加班，做事细致"
                      className="w-full p-2.5 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="font-bold text-[#1A1A1B] block mb-1">联系人</label>
                      <input
                        type="text"
                        value={jobContact}
                        onChange={(e) => setJobContact(e.target.value)}
                        placeholder="如：陈厂长"
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#1A1A1B] block mb-1">联系电话</label>
                      <input
                        type="text"
                        value={jobPhone}
                        onChange={(e) => setJobPhone(e.target.value)}
                        placeholder="手机号码"
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#1A1A1B] block mb-1">微信</label>
                      <input
                        type="text"
                        value={jobWechat}
                        onChange={(e) => setJobWechat(e.target.value)}
                        placeholder="微信号"
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#B91C1C] hover:bg-[#991b1b] active:scale-95 text-white font-medium rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    发布水头招聘信息
                  </button>
                </form>
              )}

              {/* Store Form */}
              {publishType === 'store' && (
                <form onSubmit={handleStoreSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#1A1A1B] block mb-1">商户/工厂名称</label>
                      <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        placeholder="如：水头老牌排骨坊/皮具厂直销"
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#1A1A1B] block mb-1">主营类别</label>
                      <select
                        value={storeCat}
                        onChange={(e) => setStoreCat(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                      >
                        <option value="美食餐饮">美食餐饮</option>
                        <option value="皮具直销">皮具直销</option>
                        <option value="生活商超">生活商超</option>
                        <option value="茶饮夜市">茶饮夜市</option>
                        <option value="休娱丽人">休娱丽人</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#1A1A1B] block mb-1">商铺地址</label>
                      <input
                        type="text"
                        value={storeAddress}
                        onChange={(e) => setStoreAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#1A1A1B] block mb-1">订座/客服电话</label>
                      <input
                        type="text"
                        value={storeTel}
                        onChange={(e) => setStoreTel(e.target.value)}
                        placeholder="固话或手机号"
                        required
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#1A1A1B] block mb-1">商圈团购优惠套餐 (可选)</label>
                    <input
                      type="text"
                      value={storeCoupon}
                      onChange={(e) => setStoreCoupon(e.target.value)}
                      placeholder="例如：双人特色排骨粉干套餐 / 头层牛皮双肩包立减券"
                      className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#1A1A1B] block mb-1">原价 (元)</label>
                      <input
                        type="number"
                        value={storeOrigPrice}
                        onChange={(e) => setStoreOrigPrice(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#1A1A1B] block mb-1">团购特惠价 (元)</label>
                      <input
                        type="number"
                        value={storeDiscPrice}
                        onChange={(e) => setStoreDiscPrice(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#1A1A1B] block mb-1">店铺介绍与特色亮点</label>
                    <textarea
                      rows={2}
                      value={storeDesc}
                      onChange={(e) => setStoreDesc(e.target.value)}
                      placeholder="介绍本店特色，支持全国邮寄或是本地老字号历史..."
                      className="w-full p-2.5 rounded-xl bg-[#F8F9FA] border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#B91C1C] hover:bg-[#991b1b] active:scale-95 text-white font-medium rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                  >
                    <Store className="w-3.5 h-3.5" />
                    提交免费入驻水头商圈
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
