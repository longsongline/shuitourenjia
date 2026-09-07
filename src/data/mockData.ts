import { NewsItem, StoreItem, MemoryItem, MomentVideoItem, JobItem, ServiceContact, ForumPost, UserProfile } from '../types';

export const initialUserProfile: UserProfile = {
  name: '水头阿龙',
  hometownVillage: '平阳县水头镇带溪社区 (泾川)',
  currentCity: '浙江杭州·滨江',
  distanceFromShuitouKm: 365,
  daysAway: 1240,
  bio: '人在外地打拼，心系水头带溪。常惦记老街的炸排骨和炒粉干！',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  isCertified: true,
};

export const mockNewsList: NewsItem[] = [
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
  },
  {
    id: 'news-4',
    title: '水头镇春风送岗行动：提供超1500个高薪技术与管理岗位，支持家乡就业',
    category: '民生公告',
    summary: '涵盖皮具设计、跨境电商运营、机械技工等领域，多个岗位月薪过万并提供员工公寓与带薪年假。',
    source: '水头人社所',
    time: '3天前',
    views: 16500,
    likes: 912,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    content: [
      '为了让更多青年人才留在家乡、返乡创业，水头镇联合本地骨干企业推出了一揽子人才扶持与安家补贴政策。'
    ],
  }
];

export const mockStoreList: StoreItem[] = [
  {
    id: 'store-1',
    name: '老水头老字号·张记金牌排骨 (振兴路店)',
    category: '美食餐饮',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    address: '平阳县水头镇振兴北路188号 (原老影剧院对面)',
    distance: '350m',
    rating: 4.9,
    tel: '0577-63881234',
    tags: ['本地名小吃', '水头排骨', '几十年老店', '外酥里嫩'],
    couponTitle: '招牌秘制香脆排骨双人份 + 经典冰镇红豆汤',
    originalPrice: 48,
    discountPrice: 29.9,
    soldCount: 3820,
    description: '水头人从小吃到大的老底子味道，严选本地新鲜排骨，秘料腌制现炸，蒜香浓郁，回味无穷。',
  },
  {
    id: 'store-2',
    name: '水头中国皮都·奥特莱斯直营馆 (财富大道店)',
    category: '皮具直销',
    coverImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80',
    address: '水头镇财富大道88号中国皮革城A区1楼',
    distance: '1.2km',
    rating: 4.8,
    tel: '0577-63889988',
    tags: ['源头工厂', '头层牛皮', '支持全国包邮', '专柜同款'],
    couponTitle: '水头制造·头层牛皮商务公文包/时尚挎包代金券',
    originalPrice: 399,
    discountPrice: 198,
    soldCount: 1450,
    description: '水头本地30年出口皮具大厂直销，没有中间商，支持为在外地乡亲亲友一键寄送。',
  },
  {
    id: 'store-3',
    name: '带溪人家·传统手工炒粉干 & 鱼圆汤',
    category: '美食餐饮',
    coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
    address: '水头镇江桥路66号 (近水头大桥桥头)',
    distance: '620m',
    rating: 4.9,
    tel: '13868882345',
    tags: ['平阳炒粉干', '温州鲜鱼圆', '夜市烟火', '水头老味道'],
    couponTitle: '水头特色炒粉干套餐(配鳗鱼圆汤/本地麦饼)',
    originalPrice: 32,
    discountPrice: 19.8,
    soldCount: 2790,
    description: '本地细粉干配老土猪肉丝、香菇青菜旺火爆炒，镬气十足，配上一碗爽滑有嚼劲的鲜鱼圆汤！',
  },
  {
    id: 'store-4',
    name: '南雁山房·带溪慢生活茶食馆',
    category: '茶饮夜市',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
    address: '水头镇带溪滨水生态公园景观长廊3号驿站',
    distance: '800m',
    rating: 4.7,
    tel: '13906771122',
    tags: ['滨水露台', '水头夜景观景', '围炉煮茶', '乡友聚会'],
    couponTitle: '双人带溪观景慢品茶歇 (平阳黄汤+手工糖糕+干果盘)',
    originalPrice: 88,
    discountPrice: 49.9,
    soldCount: 960,
    description: '临溪听风，面朝水头夜色，在外归乡聚友的温馨打卡地。',
  },
  {
    id: 'store-5',
    name: '水头联华优选生活超市 (泾川路旗舰店)',
    category: '生活商超',
    coverImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&auto=format&fit=crop&q=80',
    address: '水头镇泾川中路128号',
    distance: '450m',
    rating: 4.6,
    tel: '0577-63855566',
    tags: ['同城配送', '生鲜蔬果', '老字号水头特产专区'],
    couponTitle: '满100减25元全场便民生活购物券',
    originalPrice: 100,
    discountPrice: 75,
    soldCount: 5200,
    description: '水头本地规模大、品类齐的生鲜超市，特设“平阳特产手信专柜”，可邮寄至外省。',
  }
];

export const mockMemories: MemoryItem[] = [
  {
    id: 'mem-1',
    title: '水头老江桥与今日现代化带溪双向大桥',
    yearOld: '1989年',
    yearNew: '2025年',
    location: '水头镇带溪跨江大桥段',
    oldImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    newImageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80',
    story: '记得小时候水头江桥两边都是木板店铺，带溪里还有木帆船运送货物。那时候父亲拉着自行车带我去赶集，如今宽阔的双向六车道景观桥飞跨两岸，夜幕降临霓虹闪烁，感慨家乡的沧桑巨变！',
    author: '老街老陈',
    authorLocation: '水头本地·江桥路',
    likes: 1280,
    commentsCount: 86,
  },
  {
    id: 'mem-2',
    title: '水头老影剧院与当年的繁华夜市',
    yearOld: '1995年',
    yearNew: '2024年',
    location: '水头镇振兴路核心商圈',
    oldImageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
    newImageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    story: '90年代初，全水头最热闹的地方就是振兴路影剧院门口。看一场电影两块钱，散场后大家就在门口吃一碗水头排骨或炒粉干，那是几代水头人青春最深刻的香气。',
    author: '雁荡游子-王强',
    authorLocation: '现居广东东莞',
    likes: 954,
    commentsCount: 64,
  },
  {
    id: 'mem-3',
    title: '从简陋皮件家庭作坊到现代化“中国皮都”产业城',
    yearOld: '1992年',
    yearNew: '2025年',
    location: '平阳水头制革工业区 / 皮革城',
    oldImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
    newImageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    story: '当年家家户户切皮条、缝钱包，水头人凭着温州人“敢为人先、历经千辛万苦”的拼搏劲头，把一个小镇做成了闻名世界的皮件制造基地。向老一辈创业者致敬！',
    author: '第二代皮具人小林',
    authorLocation: '现居浙江温州',
    likes: 1530,
    commentsCount: 112,
  }
];

export const mockMomentVideos: MomentVideoItem[] = [
  {
    id: 'mv-1',
    author: '水头小飞手',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    locationTag: '带溪生态夜景公园',
    caption: '今晚水头带溪的风太惬意了！给在外打拼的水头乡亲看看家乡的夜景，美不美？',
    videoThumb: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&auto=format&fit=crop&q=80',
    videoDuration: '00:32',
    likes: 842,
    comments: 63,
    timeAgo: '1小时前',
  },
  {
    id: 'mv-2',
    author: '南雁阿妹',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    locationTag: '南雁荡山仙姑洞脚下',
    caption: '老家的云海日出，带你深吸一口水头老家清新甜润的负氧离子！',
    videoThumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    videoDuration: '00:45',
    likes: 1205,
    comments: 98,
    timeAgo: '3小时前',
  },
  {
    id: 'mv-3',
    author: '老街张师傅',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    locationTag: '江桥路老菜市',
    caption: '清晨第一锅水头香脆排骨出锅啦！咔嚓一口香喷喷，隔着屏幕流口水没？',
    videoThumb: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    videoDuration: '00:18',
    likes: 2190,
    comments: 184,
    timeAgo: '5小时前',
  },
  {
    id: 'mv-4',
    author: '水头青年创业汇',
    authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    locationTag: '水头皮革时尚智造基地',
    caption: '新一批自主品牌皮具准备发往欧洲，水头质造越来越硬核，乡亲们顶起来！',
    videoThumb: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80',
    videoDuration: '00:26',
    likes: 673,
    comments: 42,
    timeAgo: '昨天',
  }
];

export const mockJobsList: JobItem[] = [
  {
    id: 'job-1',
    title: '时尚皮具/箱包主设计师 & 打样师',
    company: '浙江圣罗兰皮具有限公司 (水头规上骨干企业)',
    salary: '8,000 - 15,000 元/月',
    location: '平阳县水头镇制革工业区园区大道',
    type: '急聘',
    tags: ['包吃住', '年底双薪', '五险一金', '带薪年假'],
    requirements: [
      '熟练掌握箱包/钱包纸格制作与打样流程',
      '3年以上皮件行业经验，对国际流行趋势有敏锐度',
      '本镇及周边返乡青年、熟手优先'
    ],
    contactName: '林经理',
    phone: '13868886677',
    wechat: 'lin_leather_shuitou',
    postedTime: '今天 10:15',
  },
  {
    id: 'job-2',
    title: '跨境电商运营主管 (亚马逊/TikTok带货)',
    company: '水头联创跨境数智产业园',
    salary: '7,000 - 14,000 元/月 + 销售提成',
    location: '水头镇财富大道88号电商中心4F',
    type: '全职',
    tags: ['朝九晚六', '绩效奖金', '团队年轻', '技能培训'],
    requirements: [
      '负责水头皮具、户外用品出海店铺搭建与推广',
      '大专及以上学历，对外贸电商有浓厚兴趣，欢迎外地返乡青年'
    ],
    contactName: '周女士',
    phone: '13906775588',
    wechat: 'shuitou_ecom2025',
    postedTime: '今天 08:40',
  },
  {
    id: 'job-3',
    title: '特色餐饮主厨/炒锅师傅 (擅长温州本帮菜)',
    company: '带溪人家餐饮管理有限公司',
    salary: '6,500 - 9,500 元/月',
    location: '水头镇振兴北路商业街',
    type: '全职',
    tags: ['包三餐', '节日福利', '工龄补贴'],
    requirements: [
      '熟练掌握温州海鲜、水头排骨炒粉干等地方风味',
      '讲究厨房卫生，吃苦耐劳'
    ],
    contactName: '张老板',
    phone: '13738779900',
    wechat: 'daixi_renjia88',
    postedTime: '昨天',
  },
  {
    id: 'job-4',
    title: '同城配送专员/轻卡货运司机',
    company: '水头顺达同城物流速递',
    salary: '6,000 - 10,000 元/月 (多劳多得)',
    location: '水头镇物流园区',
    type: '全职',
    tags: ['弹性工时', '油补饭补', '多劳多得'],
    requirements: [
      'C1及以上驾照，熟悉水头、腾蛟、南雁及萧江周边道路',
      '无不良驾驶记录，身体健康'
    ],
    contactName: '陈调度',
    phone: '13587771234',
    wechat: 'sd_express_st',
    postedTime: '2天前',
  }
];

export const mockServiceContacts: ServiceContact[] = [
  {
    id: 'srv-1',
    name: '水头镇便民政务服务中心',
    category: '政务村委',
    phone: '0577-63851001',
    workHours: '周一至周五 08:30 - 17:00',
    address: '平阳县水头镇泾川中路新行政综合楼1楼',
    desc: '户籍办理、医保社保、工商营业执照申请、便民一网通办窗口。',
  },
  {
    id: 'srv-2',
    name: '平阳县第二人民医院 (水头急救与挂号)',
    category: '应急热线',
    phone: '0577-63852120',
    workHours: '急诊24小时无休',
    address: '水头镇江桥路南首',
    desc: '综合二级甲等医院，水头辖区医疗保障与急诊急救中心。',
  },
  {
    id: 'srv-3',
    name: '水头客运中心站 (长途客运与轻轨接驳专线)',
    category: '公共交通',
    phone: '0577-63883344',
    workHours: '每日 06:00 - 19:30',
    address: '水头镇环城北路客运枢纽',
    desc: '发往温州市区、平阳动车站(鳌江)、温州南站高铁站及周边省际班车。',
  },
  {
    id: 'srv-4',
    name: '水头水务自来水抢修热线',
    category: '生活维修',
    phone: '0577-63880000',
    workHours: '24小时应急维修',
    desc: '水头镇区管道爆漏、水压异常报修及水质咨询。',
  },
  {
    id: 'srv-5',
    name: '国网平阳供电公司水头供电所',
    category: '生活维修',
    phone: '0577-63853110',
    workHours: '24小时报修值班',
    desc: '停电报修、电表开户、居民生活用电故障处理。',
  },
  {
    id: 'srv-6',
    name: '南雁荡山风景区游客服务中心',
    category: '景区文旅',
    phone: '0577-63892888',
    workHours: '08:00 - 17:30',
    address: '平阳县南雁镇景区入口处',
    desc: '景区门票咨询、索道开放情况、导游讲解预约、天气咨询。',
  }
];

export const mockForumPosts: ForumPost[] = [
  {
    id: 'post-1',
    author: '外滩漂泊的皮都客',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    tag: '游子归乡',
    currentCity: '上海·徐汇',
    content: '离家第五个年头了，刚刚在视频里看到水头带溪绿道全线亮灯，好漂亮！记得以前放学骑自行车经过老江桥，总要停下来买袋老街排骨。今年国庆一定回水头，带老婆孩子好好看看家乡的新风貌！各位水头老表有在上海的吗？找时间聚个温州老乡局！',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80'
    ],
    time: '2小时前',
    likes: 88,
    isLiked: false,
    comments: [
      {
        id: 'c-1',
        user: '水头老江桥',
        city: '温州·水头',
        text: '欢迎回水头！现在的带溪夜景确实很棒，江边还有很多特色茶座和排骨店，回来请你吃正宗炒粉干！',
        time: '1小时前'
      },
      {
        id: 'c-2',
        user: '闵行皮件老陈',
        city: '上海·闵行',
        text: '我在闵行做皮具外贸，也是水头人！加个微信有空聚聚！',
        time: '30分钟前'
      }
    ]
  },
  {
    id: 'post-2',
    author: '泾川老街坊',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    tag: '水头新鲜事',
    currentCity: '温州·水头',
    content: '今天振兴路老影剧院附近新开了一家水头老风味糕点铺，现烤的麦饼肉馅超级扎实，外皮焦脆！路过的乡亲可以去试吃，店里今天有开业免费试吃活动！',
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80'
    ],
    time: '4小时前',
    likes: 45,
    isLiked: false,
    comments: [
      {
        id: 'c-3',
        user: '阿发哥',
        city: '温州·平阳',
        text: '老影剧院对面是吧？下午下班正好去买两个当夜宵！',
        time: '3小时前'
      }
    ]
  },
  {
    id: 'post-3',
    author: '南雁山里人',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    tag: '打听互助',
    currentCity: '浙江·杭州',
    content: '请教一下水头老乡，现在从杭州东坐高铁到鳌江站后，最晚一班到水头的轻轨接驳或客运班车是几点？如果太晚拼车方便吗？',
    images: [],
    time: '昨天',
    likes: 31,
    isLiked: true,
    comments: [
      {
        id: 'c-4',
        user: '水头通服务员',
        city: '温州·水头',
        text: '鳌江动车站出站口有直达水头的公交快线，最晚到晚上20:30。如果超过这个时间，可以在出站口拼水头专线出租车，一般30元/人直接送到水头镇区。',
        time: '昨天'
      }
    ]
  }
];
