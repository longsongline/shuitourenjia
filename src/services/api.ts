import { 
  NewsItem, 
  StoreItem, 
  MemoryItem, 
  MomentVideoItem, 
  JobItem, 
  ServiceContact, 
  ForumPost, 
  UserProfile, 
  CouponTicket 
} from '../types';
import { 
  initialUserProfile, 
  mockNewsList, 
  mockStoreList, 
  mockMemories, 
  mockMomentVideos, 
  mockJobsList, 
  mockServiceContacts, 
  mockForumPosts 
} from '../data/mockData';

export interface AppDatabaseState {
  version: number;
  updatedAt: string;
  userProfile: UserProfile;
  newsList: NewsItem[];
  stores: StoreItem[];
  memories: MemoryItem[];
  videos: MomentVideoItem[];
  jobs: JobItem[];
  services: ServiceContact[];
  posts: ForumPost[];
  vouchers: CouponTicket[];
}

export const defaultState: AppDatabaseState = {
  version: 1,
  updatedAt: new Date().toISOString(),
  userProfile: initialUserProfile,
  newsList: mockNewsList,
  stores: mockStoreList,
  memories: mockMemories,
  videos: mockMomentVideos,
  jobs: mockJobsList,
  services: mockServiceContacts,
  posts: mockForumPosts,
  vouchers: [
    {
      id: 'v-default-1',
      storeId: 'store-1',
      storeName: '老水头牛肉焙（振兴中路非遗传承店）',
      title: '【水头游子专享】招牌香酥牛肉焙半斤立减券',
      discountPrice: 29.9,
      originalPrice: 48,
      validUntil: '2026-10-31',
      qrCodeText: 'ST-PB-299',
      status: 'unused',
      claimedAt: '今天 10:00',
    }
  ]
};

// 1. Fetch initial persistent data from backend database
export async function fetchInitialData(): Promise<AppDatabaseState> {
  try {
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
    return defaultState;
  } catch (err) {
    console.warn('Backend API fallback: Using initial local state', err);
    return defaultState;
  }
}

// 2. Add comment to backend persistent DB
export async function apiAddComment(postId: string, text: string, user: string, city: string) {
  try {
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, text, user, city })
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('Error adding comment to backend:', err);
    return { success: false, error: err };
  }
}

// 3. Create post in backend persistent DB
export async function apiCreatePost(postData: Partial<ForumPost>) {
  try {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('Error creating post in backend:', err);
    return { success: false, error: err };
  }
}

// 4. Like post in backend persistent DB
export async function apiLikePost(postId: string) {
  try {
    const res = await fetch(`/api/posts/${postId}/like`, {
      method: 'POST'
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('Error liking post:', err);
    return { success: false, error: err };
  }
}

// 5. Post Job
export async function apiCreateJob(jobData: Partial<JobItem>) {
  try {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    });
    return await res.json();
  } catch (err) {
    console.error('Error creating job:', err);
    return { success: false, error: err };
  }
}

// 6. Post Store / Merchant
export async function apiCreateStore(storeData: Partial<StoreItem>) {
  try {
    const res = await fetch('/api/stores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(storeData)
    });
    return await res.json();
  } catch (err) {
    console.error('Error creating store:', err);
    return { success: false, error: err };
  }
}

// 7. Claim Voucher
export async function apiClaimVoucher(voucherData: any) {
  try {
    const res = await fetch('/api/vouchers/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(voucherData)
    });
    return await res.json();
  } catch (err) {
    console.error('Error claiming voucher:', err);
    return { success: false, error: err };
  }
}

// 8. Redeem Voucher
export async function apiRedeemVoucher(voucherId: string) {
  try {
    const res = await fetch('/api/vouchers/redeem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ voucherId })
    });
    return await res.json();
  } catch (err) {
    console.error('Error redeeming voucher:', err);
    return { success: false, error: err };
  }
}

// 9. Update Profile
export async function apiUpdateProfile(profile: Partial<UserProfile>) {
  try {
    const res = await fetch('/api/user/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    return await res.json();
  } catch (err) {
    console.error('Error updating profile:', err);
    return { success: false, error: err };
  }
}
