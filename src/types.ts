export type TabType = 'home' | 'commerce' | 'map3d' | 'memory' | 'jobs' | 'forum' | 'profile';

export interface RoadTrafficInfo {
  id: string;
  name: string;
  direction: string;
  status: 'smooth' | 'slow' | 'congested';
  currentSpeedKmH: number;
  speedLimitKmH: number;
  lengthKm: number;
  travelTimeMin: number;
  incident?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: '城建发展' | '民生公告' | '文旅动态' | '皮都快讯';
  summary: string;
  source: string;
  time: string;
  views: number;
  likes: number;
  imageUrl: string;
  content: string[];
}

export interface StoreItem {
  id: string;
  name: string;
  category: '美食餐饮' | '皮具直销' | '生活商超' | '休娱丽人' | '茶饮夜市';
  coverImage: string;
  address: string;
  distance: string;
  rating: number;
  tel: string;
  tags: string[];
  couponTitle?: string;
  originalPrice?: number;
  discountPrice?: number;
  soldCount: number;
  description: string;
}

export interface CouponTicket {
  id: string;
  storeId: string;
  storeName: string;
  title: string;
  discountPrice: number;
  originalPrice: number;
  validUntil: string;
  qrCodeText: string;
  status: 'unused' | 'used';
  claimedAt: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  yearOld: string;
  yearNew: string;
  location: string;
  oldImageUrl: string;
  newImageUrl: string;
  story: string;
  author: string;
  authorLocation: string; // e.g., '现居杭州' or '水头本地'
  likes: number;
  commentsCount: number;
}

export interface MomentVideoItem {
  id: string;
  author: string;
  authorAvatar: string;
  locationTag: string; // e.g. '带溪滨水绿道'
  caption: string;
  videoThumb: string;
  videoDuration: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  timeAgo: string;
}

export interface JobItem {
  id: string;
  title: string;
  company: string;
  salary: string;
  location: string;
  type: '全职' | '兼职' | '急聘';
  tags: string[];
  requirements: string[];
  contactName: string;
  phone: string;
  wechat: string;
  postedTime: string;
}

export interface ServiceContact {
  id: string;
  name: string;
  category: '政务村委' | '公共交通' | '应急热线' | '生活维修' | '景区文旅';
  phone: string;
  workHours: string;
  address?: string;
  desc: string;
}

export interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  tag: '乡音闲聊' | '打听互助' | '游子归乡' | '水头新鲜事' | '拼车拼单';
  currentCity: string; // e.g. '上海·浦东' or '温州·水头'
  content: string;
  images: string[];
  time: string;
  likes: number;
  isLiked?: boolean;
  comments: {
    id: string;
    user: string;
    city: string;
    text: string;
    time: string;
  }[];
}

export interface UserProfile {
  name: string;
  hometownVillage: string; // e.g. '平阳县水头镇带溪村'
  currentCity: string; // e.g. '浙江杭州'
  distanceFromShuitouKm: number;
  daysAway: number;
  bio: string;
  avatar: string;
  isCertified: boolean;
}
