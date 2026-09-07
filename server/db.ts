import fs from 'fs';
import path from 'path';
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
} from '../src/types';

export interface DatabaseSchema {
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

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'shuitou_database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Seed Data generator
function getInitialSeed(): DatabaseSchema {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    userProfile: {
      name: '水头阿龙',
      hometownVillage: '平阳县水头镇带溪社区 (泾川)',
      currentCity: '浙江杭州·滨江',
      distanceFromShuitouKm: 365,
      daysAway: 1240,
      bio: '人在外地打拼，心系水头带溪。常惦记老街的炸排骨和炒粉干！',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isCertified: true,
    },
    newsList: [
      {
        id: 'news-1',
        title: '平阳水头带溪滨水生态绿道二期全线贯通，市民夜间漫步再添好去处！',
        category: '城建发展',
        summary: '带溪生态走廊延伸工程完工，增设亲水平台、游步道与智慧夜景灯光，重现“清溪碧水绕水头”的江南小镇风貌。',
        source: '水头发布·融媒体',
        time: '今天 09:30',
        views: 14200,
        likes: 856,
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
        content: [
          '作为水头镇民生关键实事工程，带溪二期生态水岸日前已全面亮灯投入使用。',
          '全长4.8公里的滨水步道串联起了振兴路商圈与老街风情区，沿途设置了便民驿站、观景挑台以及水头历史文化展示廊。',
          '许多在外工作的水头籍乡亲通过航拍视频感叹：“家乡的水更清了，岸更美了，越来越有现代水乡的韵味！”'
        ],
      },
      {
        id: 'news-2',
        title: '【中国皮都】2025平阳水头国际时尚皮件博览会即将开幕，线上特惠同步开启',
        category: '皮都快讯',
        summary: '汇集水头本土300+知名皮具制造企业，涵盖时尚真皮箱包、定制皮带与创新环保材料，打造水头产业金名片。',
        source: '水头商会',
        time: '昨天 15:20',
        views: 9820,
        likes: 624,
        imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80',
        content: [
          '水头作为全国享誉盛名的“中国皮都”，近年来大力推动皮件产业向绿色时尚、高端定制转型升级。',
          '展会期间将设立线上直播分会场，身在全国各地的水头乡亲也可通过手机端直接以出厂折扣价选购家乡好皮具。'
        ],
      },
      {
        id: 'news-3',
        title: '南雁荡山春季文旅季启幕：对平阳乡亲及直系亲属推出门票半价特惠',
        category: '文旅动态',
        summary: '南雁东西洞景区、碧海天池焕新迎客，推出凭水头居民身份证及水头游子证明享景区优惠活动。',
        source: '南雁文旅局',
        time: '2天前',
        views: 11300,
        likes: 745,
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
        content: [
          '春暖花开，家门口的5A级风光南雁荡山迎来漫山绿意。水头客运中心已增开直达南雁游客中心的旅游专线公交。',
          '欢迎在外打拼的乡亲们带家人常回家乡走走，看一看秀丽的雁荡奇峰。'
        ],
      }
    ],
    stores: [
      {
        id: 'store-1',
        name: '老水头牛肉焙（振兴中路非遗传承店）',
        category: '美食餐饮',
        coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
        address: '水头镇振兴中路168号（老百货大楼斜对面）',
        distance: '距镇中心 350m',
        rating: 4.9,
        tel: '0577-63881234',
        tags: ['百年非遗', '水头特产', '现烤现撕', '全国顺丰包邮'],
        couponTitle: '【水头游子专享】招牌香酥牛肉焙半斤立减券',
        originalPrice: 48,
        discountPrice: 29.9,
        soldCount: 3820,
        description: '选用平阳本地农家小黄牛，传统古法柴火慢焙，肉香浓郁，外焦里嫩，是每个水头游子心心念念的舌尖家乡味。',
      },
      {
        id: 'store-2',
        name: '中国皮都名品直销总汇（水头工贸展厅）',
        category: '皮具直销',
        coverImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80',
        address: '水头镇劲松东路水头皮革城A座一楼',
        distance: '距镇中心 800m',
        rating: 4.8,
        tel: '0577-63885678',
        tags: ['头层牛皮', '源头工厂', '正品联保', '免费刻字'],
        couponTitle: '【工厂直供券】头层牛皮商务公文包/双肩包满减',
        originalPrice: 499,
        discountPrice: 198,
        soldCount: 1540,
        description: '扎根水头三十年本土标杆皮具工贸企业，专注高端真皮男女包、定制皮带、旅行行李箱研发与直销。',
      },
      {
        id: 'store-3',
        name: '水头阿香索面黄鱼馆（三十年老字号）',
        category: '美食餐饮',
        coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
        address: '水头镇工农老街与带溪路交叉口',
        distance: '距镇中心 500m',
        rating: 4.7,
        tel: '0577-63889012',
        tags: ['手工拉面', '传统生姜黄鱼', '月子补品', '清晨早市'],
        couponTitle: '【老街记忆】经典生姜酒老母鸡索面双人餐',
        originalPrice: 68,
        discountPrice: 39.9,
        soldCount: 2280,
        description: '纯手工古法日晒索面，细如发丝，柔韧爽滑。搭配本地醇厚农家黄酒与散养土鸡现熬高汤，暖心暖胃。',
      }
    ],
    memories: [
      {
        id: 'mem-1',
        title: '从木板渡船到飞跨带溪：水头带溪大桥的三十年变迁',
        yearOld: '1992年',
        yearNew: '2025年',
        location: '水头镇带溪中心段',
        oldImageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
        newImageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
        story: '还记得90年代初，带溪两岸往来还要靠摆渡木舟，遇到雨季水涨常常断航。如今宏伟的双向六车道现代景观大桥跨越带溪两岸，夜晚霓虹如画。每一次从外地开车回水头，看到大桥亮起暖黄的灯光，就知道——家到了。',
        author: '陈建国（老水头照相馆退休摄影师）',
        authorLocation: '水头本地·工农街',
        likes: 1290,
        commentsCount: 88,
      },
      {
        id: 'mem-2',
        title: '工农街石板路上的童年回响：记忆里那口热腾腾的水头油渣',
        yearOld: '1988年',
        yearNew: '2024年',
        location: '水头工农老街',
        oldImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
        newImageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
        story: '每到傍晚放学，老街两旁的粮站、铁匠铺和点心摊热气腾腾。五分钱一包的香脆猪油渣，配上一碗热气滚滚的水头豆腐脑，是物资匮乏年代最奢侈的美味。现在的工农街修旧如旧，保留了飞檐青瓦，每次回来都要去老石阶上坐坐。',
        author: '林晓峰',
        authorLocation: '现居深圳·南山',
        likes: 954,
        commentsCount: 62,
      }
    ],
    videos: [
      {
        id: 'vid-1',
        author: '水头飞阅',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        locationTag: '带溪生态走廊水头段',
        caption: '晨曦中的水头带溪，白鹭齐飞，晨练的阿伯阿婆沿河漫步。水头真是一年比一年水秀山清！',
        videoThumb: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80',
        videoDuration: '00:45',
        likes: 1840,
        comments: 112,
        isLiked: false,
        timeAgo: '2小时前',
      },
      {
        id: 'vid-2',
        author: '阿平的水头味道',
        authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
        locationTag: '工农街老水头夜市',
        caption: '新鲜出锅的牛肉焙和香脆酥排骨！隔着屏幕闻到水头老家的家乡味了吗？',
        videoThumb: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        videoDuration: '01:12',
        likes: 2430,
        comments: 196,
        isLiked: true,
        timeAgo: '昨天',
      }
    ],
    jobs: [
      {
        id: 'job-1',
        title: '皮革制品首席打样主管 / 制版师',
        company: '温州宏达皮件制品实业集团',
        salary: '10000-15000元/月',
        location: '平阳县水头镇振兴工业园区B区',
        type: '急聘',
        tags: ['包吃住', '交社保', '年终奖', '外地员工交通补贴'],
        requirements: [
          '5年以上中高档真皮皮具、包袋开版打样经验',
          '精通各类皮革缝纫与封边工艺，对流行箱包结构有敏锐把控',
          '吃苦耐劳，具备车间技术班组带教沟通能力'
        ],
        contactName: '陈总监',
        phone: '13868881234',
        wechat: 'hongda_leather_hr',
        postedTime: '今天 10:15',
      },
      {
        id: 'job-2',
        title: '水头新城商业广场 · 招商运营专员',
        company: '平阳水头新城商业运营管理公司',
        salary: '6000-9000元/月',
        location: '水头镇振兴北路与泾川大道交汇处',
        type: '全职',
        tags: ['五险一金', '带薪年假', '节日福利', '晋升空间大'],
        requirements: [
          '大专以上学历，具有商场、连锁品牌或本地餐饮招商运营经验',
          '熟悉水头及平阳周边商圈消费习惯，沟通协调能力强'
        ],
        contactName: '李经理',
        phone: '13905872345',
        wechat: 'shuitou_mall_hr',
        postedTime: '昨天 16:30',
      }
    ],
    services: [
      {
        id: 'srv-1',
        name: '平阳县水头镇便民政务服务中心',
        category: '政务村委',
        phone: '0577-63881001',
        workHours: '周一至周五 08:30-11:30, 14:00-17:00',
        address: '水头镇振兴南路政务大楼一楼',
        desc: '办理社保医保、户籍居住、工商营业执照、不动产及跨省通办便民业务。',
      },
      {
        id: 'srv-2',
        name: '水头中心客运站（长途客运与城乡公交）',
        category: '公共交通',
        phone: '0577-63882200',
        workHours: '每日 06:00-18:30',
        address: '水头镇劲松路客运大楼',
        desc: '发往温州龙湾机场快线、鳌江高铁站接驳车、平阳动车站专线及直达上海、杭州长途班车。',
      }
    ],
    posts: [
      {
        id: 'post-1',
        author: '带溪边的阿强',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        tag: '游子归乡',
        currentCity: '上海·浦东 ➔ 平阳·水头',
        content: '趁着周末从上海虹桥坐高铁回平阳，再拼车半小时就到水头家门口了！晚风吹过带溪绿道，老街的炸排骨和牛肉焙还是记忆里的那个香！在外漂泊多年，最治愈的永远是家乡水头的烟火气。',
        images: [
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80'
        ],
        time: '35分钟前',
        likes: 68,
        isLiked: false,
        comments: [
          {
            id: 'c-1',
            user: '北京水头老乡老林',
            city: '北京·海淀',
            text: '羡慕阿强能经常回！我今年国庆一定回水头喝黄酒索面！',
            time: '20分钟前',
          },
          {
            id: 'c-2',
            user: '工农街小芳',
            city: '平阳·水头',
            text: '欢迎回老家！带溪二期夜景特别漂亮，晚上一定要去走走！',
            time: '12分钟前',
          }
        ],
      },
      {
        id: 'post-2',
        author: '泾川阿妹',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        tag: '打听互助',
        currentCity: '广东·广州',
        content: '打听一下水头老乡们：现在从鳌江动车站拼车回水头振兴路大概多少钱一位？客运中巴最晚几点收班？准备下周带两个孩子回老家看爷爷奶奶！',
        images: [],
        time: '2小时前',
        likes: 42,
        isLiked: true,
        comments: [
          {
            id: 'c-3',
            user: '水头老司机老王',
            city: '平阳·水头',
            text: '拼车一般25-30元一位送到家门口，中巴车最晚一班是傍晚18:40左右，打网约车也很方便！',
            time: '1小时前',
          }
        ],
      }
    ],
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
}

// Read database from disk
export function getDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialSeed();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content) as DatabaseSchema;
  } catch (err) {
    console.error('Error reading database file:', err);
    return getInitialSeed();
  }
}

// Safely update database on disk
export function updateDb(updater: (db: DatabaseSchema) => DatabaseSchema | void): DatabaseSchema {
  const current = getDb();
  const updated = updater(current) || current;
  updated.updatedAt = new Date().toISOString();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to database file:', err);
  }
  return updated;
}
