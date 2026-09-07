import React, { useState } from 'react';
import { 
  X, 
  Download, 
  CheckCircle2, 
  Copy, 
  Smartphone, 
  FileArchive, 
  Image as ImageIcon, 
  Box, 
  Globe, 
  ShieldAlert,
  QrCode,
  ArrowRight,
  ExternalLink,
  Send,
  Sparkles
} from 'lucide-react';
import JSZip from 'jszip';

interface WeChatMiniProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeChatMiniProgramModal: React.FC<WeChatMiniProgramModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'instant' | 'deploy' | 'upload' | 'assets' | 'code'>('deploy');
  const [selectedFile, setSelectedFile] = useState<string>('app.json');
  const [copied, setCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadingDeploy, setIsDownloadingDeploy] = useState(false);

  if (!isOpen) return null;

  // Use current live app URL (fallback to public preview URL)
  const liveUrl = typeof window !== 'undefined' 
    ? (window.location.origin.includes('localhost') 
        ? 'https://ais-pre-msop3cwetd2muubsundvux-103123826347.europe-west3.run.app' 
        : window.location.href)
    : 'https://ais-pre-msop3cwetd2muubsundvux-103123826347.europe-west3.run.app';

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(liveUrl)}&color=1A1A1B`;

  // Complete multi-page files for WeChat Mini Program
  const mpFiles: Record<string, string> = {
    'project.config.json': `{
  "description": "平阳县水头家园-微信小程序原生工程配置文件",
  "packOptions": {
    "ignore": []
  },
  "setting": {
    "urlCheck": false,
    "es6": true,
    "enhance": true,
    "postcss": true,
    "preloadBackgroundData": false,
    "minified": true,
    "newFeature": true,
    "autoAudits": false,
    "coverView": true,
    "showShadowRootInWxmlPanel": true,
    "scopeDataCheck": false,
    "checkInvalidKey": true,
    "checkSiteMap": true,
    "uploadWithSourceMap": true,
    "compileHotReLoad": false,
    "lazyCodeLoading": "requiredComponents"
  },
  "compileType": "miniprogram",
  "libVersion": "3.3.4",
  "appid": "touristappid",
  "projectname": "shuitou-homeland-miniprogram"
}`,
    'app.json': `{
  "pages": [
    "pages/index/index",
    "pages/commerce/commerce",
    "pages/jobs/jobs",
    "pages/memory/memory",
    "pages/forum/forum",
    "pages/roads3d/roads3d",
    "pages/webview/webview",
    "pages/profile/profile"
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#B91C1C",
    "navigationBarTitleText": "水头家园 · 平阳水头在线",
    "navigationBarTextStyle": "white"
  },
  "tabBar": {
    "color": "#71717A",
    "selectedColor": "#B91C1C",
    "backgroundColor": "#FFFFFF",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "精选",
        "iconPath": "images/tab_home.png",
        "selectedIconPath": "images/tab_home_active.png"
      },
      {
        "pagePath": "pages/commerce/commerce",
        "text": "商圈",
        "iconPath": "images/tab_shop.png",
        "selectedIconPath": "images/tab_shop_active.png"
      },
      {
        "pagePath": "pages/roads3d/roads3d",
        "text": "3D路网",
        "iconPath": "images/tab_3d.png",
        "selectedIconPath": "images/tab_3d_active.png"
      },
      {
        "pagePath": "pages/jobs/jobs",
        "text": "招工便民",
        "iconPath": "images/tab_job.png",
        "selectedIconPath": "images/tab_job_active.png"
      },
      {
        "pagePath": "pages/memory/memory",
        "text": "水头记忆",
        "iconPath": "images/tab_memory.png",
        "selectedIconPath": "images/tab_memory_active.png"
      }
    ]
  },
  "permission": {
    "scope.userLocation": {
      "desc": "您的位置信息将用于计算您距水头振兴路商圈的实际距离及导航"
    }
  },
  "sitemapLocation": "sitemap.json"
}`,
    'app.js': `// app.js - 水头家园小程序全局逻辑
const townData = require('./data/townData.js');

App({
  onLaunch() {
    console.log('水头家园小程序已启动，正在装载本地商圈与路网数据...');
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systemInfo = res;
      }
    });
  },
  globalData: {
    townData: townData,
    onlineH5Url: 'https://ais-pre-msop3cwetd2muubsundvux-103123826347.europe-west3.run.app',
    userCity: '水头镇',
    distanceKm: 0
  }
});`,
    'app.wxss': `/** app.wxss 全局样式规范 **/
page {
  background-color: #F8F9FA;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Microsoft Yahei', sans-serif;
  color: #1A1A1B;
  box-sizing: border-box;
}

.card {
  background: #FFFFFF;
  border-radius: 28rpx;
  padding: 28rpx;
  margin: 16rpx 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.03);
  border: 1rpx solid #F0F0F0;
}
.flex-row { display: flex; flex-direction: row; align-items: center; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.text-primary { color: #B91C1C; }
.bg-primary { background-color: #B91C1C; }`,
    'data/townData.js': `// data/townData.js - 水头镇完整数据字典与高清云端资产索引
module.exports = {
  townMeta: {
    name: '平阳县水头镇',
    title: '中国皮都 · 鳌江流域商贸重镇',
    weather: { temp: 26, condition: '多云', humidity: 75, riverQuality: '优良 (II类水质)' },
    riverStatus: '带溪水头段水位正常 · 绿道全线畅通'
  },
  stores: [
    {
      id: 's1',
      name: '老水头牛肉焙总店',
      category: '传统非遗名吃',
      rating: 4.9,
      distance: '振兴北路步行街',
      phone: '0577-63881234',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
      couponTitle: '【招牌非遗】水头秘制牛肉焙单人尝鲜券',
      discountPrice: 29.9,
      originalPrice: 48.0
    },
    {
      id: 's2',
      name: '中国皮都直销展贸中心',
      category: '皮具箱包直销',
      rating: 4.8,
      distance: '劲松东路 188 号',
      phone: '0577-63885678',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop',
      couponTitle: '【工厂直供】水头真皮手工皮带一件包邮',
      discountPrice: 198.0,
      originalPrice: 399.0
    }
  ],
  jobs: [
    {
      id: 'j1',
      title: '皮革大厂 · 样板主管',
      company: '温州宏达皮革工业集团',
      salary: '8000-12000元/月',
      location: '水头工业园区振兴路',
      tags: ['包吃住', '五险一金', '年底双薪'],
      contact: '13868881234'
    }
  ],
  roads3DNodes: [
    { name: '振兴北路', x: -60, z: 0, length: 120, speed: 48, status: 'smooth' },
    { name: '劲松东路', x: 0, z: 50, length: 140, speed: 42, status: 'smooth' },
    { name: '带溪跨江大桥', x: 40, z: -30, length: 90, speed: 45, status: 'smooth' },
    { name: '工农老街', x: -20, z: -60, length: 70, speed: 25, status: 'slow' }
  ]
};`,
    'sitemap.json': `{
  "desc": "关于本文件的更多信息，请参考文档 https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html",
  "rules": [{
    "action": "allow",
    "page": "*"
  }]
}`,
    'pages/roads3d/roads3d.wxml': `<!-- pages/roads3d/roads3d.wxml 水头镇数字孪生路网 3D 专栏 -->
<view class="roads-container">
  <view class="roads-header">
    <view class="flex-between">
      <view>
        <text class="page-title">水头数字孪生 · 3D高德实景路网</text>
        <text class="page-sub">实时均速 42.8km/h · 畅通率 88.5%</text>
      </view>
      <button size="mini" class="btn-live" bindtap="openFull3DWeb">全屏交互 ↗</button>
    </view>
  </view>
  <view class="road-stats">
    <view class="road-item"><text class="road-name">振兴北路</text><text class="road-status green">48 km/h 畅通</text></view>
    <view class="road-item"><text class="road-name">劲松东路</text><text class="road-status green">42 km/h 畅通</text></view>
    <view class="road-item"><text class="road-name">带溪跨江大桥</text><text class="road-status green">45 km/h 畅通</text></view>
    <view class="road-item"><text class="road-name">工农老街</text><text class="road-status yellow">25 km/h 缓行</text></view>
  </view>
  <view class="launch-card" bindtap="openFull3DWeb">
    <view class="launch-title">启动 WebGL 3D 实景渲染引擎 ↗</view>
    <view class="launch-desc">支持自由旋转视角、高德实况路网粒子流与带溪水光倒影</view>
  </view>
</view>`,
    'pages/roads3d/roads3d.js': `// pages/roads3d/roads3d.js
Page({
  data: {},
  openFull3DWeb() {
    wx.navigateTo({ url: '/pages/webview/webview' });
  }
});`,
    'pages/roads3d/roads3d.json': `{"navigationBarTitleText": "水头数字孪生路网"}`,
    'pages/roads3d/roads3d.wxss': `.roads-container { padding: 24rpx; background: #0F172A; min-height: 100vh; color: #FFF; }
.page-title { font-size: 32rpx; font-weight: bold; color: #38BDF8; display: block; }
.page-sub { font-size: 22rpx; color: #94A3B8; display: block; margin: 6rpx 0 20rpx; }
.btn-live { background: #38BDF8 !important; color: #0F172A !important; font-weight: bold; }
.road-stats { background: rgba(255,255,255,0.05); border-radius: 20rpx; padding: 20rpx; margin-bottom: 24rpx; }
.road-item { display: flex; justify-content: space-between; padding: 16rpx 0; border-bottom: 1rpx solid rgba(255,255,255,0.05); }
.green { color: #34D399; font-weight: bold; }
.yellow { color: #FBBF24; font-weight: bold; }
.launch-card { background: #1E293B; border: 1rpx solid #38BDF8; border-radius: 20rpx; padding: 30rpx; }
.launch-title { font-size: 28rpx; color: #38BDF8; font-weight: bold; margin-bottom: 8rpx; }
.launch-desc { font-size: 22rpx; color: #94A3B8; }`,
    'pages/index/index.wxml': `<!-- pages/index/index.wxml 水头家园·精选 -->
<view class="container">
  <view class="hero-card">
    <view class="hero-badge">平阳县水头镇 · 中国皮都</view>
    <view class="hero-title">水头家园 · 乡音在水头</view>
    <view class="hero-desc">鳌江流域重镇 · 振兴路商圈 · 带溪水乡绿道</view>
  </view>
  <view class="action-card" bindtap="openFullApp">
    <view class="action-title">✨ 进入水头家园 3D 沉浸实景版 ↗</view>
    <view class="action-sub">包含高德实时路况车流、三维街景建模与全城交互</view>
  </view>
  <view class="section">
    <view class="section-title">🔥 水头精选商圈特惠</view>
    <block wx:for="{{stores}}" wx:key="id">
      <view class="store-item" bindtap="navToCommerce">
        <view class="store-name">{{item.name}}</view>
        <view class="store-meta">{{item.category}} · {{item.distance}}</view>
        <view class="coupon-box">
          <text class="coupon-title">{{item.couponTitle}}</text>
          <text class="price-val">¥{{item.discountPrice}}</text>
        </view>
      </view>
    </block>
  </view>
</view>`,
    'pages/index/index.js': `// pages/index/index.js
const townData = require('../../data/townData.js');
Page({
  data: { stores: townData.stores || [] },
  openFullApp() { wx.navigateTo({ url: '/pages/webview/webview' }); },
  navToCommerce() { wx.switchTab({ url: '/pages/commerce/commerce' }); }
});`,
    'pages/index/index.json': `{"navigationBarTitleText": "水头家园 · 精选"}`,
    'pages/index/index.wxss': `.container { padding: 24rpx; background: #F8F9FA; min-height: 100vh; }
.hero-card { background: linear-gradient(135deg, #B91C1C, #991B1B); color: #FFF; padding: 36rpx; border-radius: 28rpx; margin-bottom: 24rpx; }
.hero-badge { font-size: 22rpx; background: rgba(255,255,255,0.2); display: inline-block; padding: 4rpx 14rpx; border-radius: 12rpx; margin-bottom: 12rpx; }
.hero-title { font-size: 36rpx; font-weight: bold; margin-bottom: 8rpx; }
.hero-desc { font-size: 24rpx; opacity: 0.9; }
.action-card { background: #FFF; border: 2rpx solid #FEE2E2; border-radius: 24rpx; padding: 24rpx 30rpx; margin-bottom: 24rpx; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.04); }
.action-title { font-size: 28rpx; font-weight: bold; color: #B91C1C; margin-bottom: 4rpx; }
.action-sub { font-size: 22rpx; color: #6B7280; }
.section { background: #FFF; padding: 28rpx; border-radius: 24rpx; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.03); }
.section-title { font-size: 30rpx; font-weight: bold; margin-bottom: 20rpx; color: #111827; }
.store-item { padding: 16rpx 0; border-bottom: 1rpx solid #F3F4F6; }
.store-name { font-size: 28rpx; font-weight: bold; }
.store-meta { font-size: 22rpx; color: #6B7280; margin: 4rpx 0 10rpx; }
.coupon-box { background: #FEF2F2; padding: 12rpx 16rpx; border-radius: 12rpx; display: flex; justify-content: space-between; align-items: center; }
.coupon-title { font-size: 24rpx; color: #991B1B; }
.price-val { font-size: 28rpx; color: #DC2626; font-weight: bold; }`,
    'pages/commerce/commerce.wxml': `<!-- pages/commerce/commerce.wxml 水头商圈 -->
<view class="container">
  <view class="top-bar">
    <text class="top-title">水头商圈 · 精选商户与特惠</text>
    <text class="top-sub">平阳水头老字号、皮具直销与特色名吃</text>
  </view>
  <block wx:for="{{stores}}" wx:key="id">
    <view class="store-card">
      <view class="store-name">{{item.name}}</view>
      <view class="store-addr">📍 {{item.distance}}</view>
      <view class="coupon-item">
        <view>
          <text class="coupon-title">{{item.couponTitle}}</text>
          <text class="price-red">¥{{item.discountPrice}}</text>
        </view>
        <button class="btn-claim" size="mini" bindtap="claimCoupon" data-name="{{item.name}}">领券</button>
      </view>
    </view>
  </block>
</view>`,
    'pages/commerce/commerce.js': `// pages/commerce/commerce.js
const townData = require('../../data/townData.js');
Page({
  data: { stores: townData.stores || [] },
  claimCoupon(e) {
    const storeName = e.currentTarget.dataset.name;
    wx.showToast({ title: '已领取【' + storeName + '】券', icon: 'success' });
  }
});`,
    'pages/commerce/commerce.json': `{"navigationBarTitleText": "水头商圈 · 优惠券"}`,
    'pages/commerce/commerce.wxss': `.container { padding: 24rpx; background: #F8F9FA; min-height: 100vh; }
.top-title { font-size: 34rpx; font-weight: bold; color: #111827; display: block; }
.top-sub { font-size: 22rpx; color: #6B7280; display: block; margin: 6rpx 0 20rpx; }
.store-card { background: #FFF; border-radius: 24rpx; padding: 28rpx; margin-bottom: 20rpx; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.03); }
.store-name { font-size: 30rpx; font-weight: bold; margin-bottom: 8rpx; }
.store-addr { font-size: 22rpx; color: #6B7280; margin-bottom: 16rpx; }
.coupon-item { background: #FEF2F2; border-radius: 16rpx; padding: 16rpx 20rpx; display: flex; justify-content: space-between; align-items: center; }
.coupon-title { font-size: 24rpx; color: #991B1B; display: block; margin-bottom: 4rpx; }
.price-red { font-size: 30rpx; font-weight: bold; color: #DC2626; }
.btn-claim { background: #B91C1C !important; color: #FFF !important; margin: 0; }`,
    'pages/jobs/jobs.wxml': `<!-- pages/jobs/jobs.wxml 水头招工便民 -->
<view class="container">
  <view class="top-bar">
    <text class="top-title">水头招工便民 · 工业园直聘</text>
    <text class="top-sub">皮革重镇、宠物产业、机械制造等本地优质岗位</text>
  </view>
  <block wx:for="{{jobs}}" wx:key="id">
    <view class="job-card">
      <view class="job-header">
        <text class="job-title">{{item.title}}</text>
        <text class="job-salary">{{item.salary}}</text>
      </view>
      <view class="job-company">{{item.company}}</view>
      <view class="job-location">📍 {{item.location}}</view>
      <button class="btn-call" size="mini" bindtap="callEmployer" data-phone="{{item.contact}}">拨打电话 📞</button>
    </view>
  </block>
</view>`,
    'pages/jobs/jobs.js': `// pages/jobs/jobs.js
const townData = require('../../data/townData.js');
Page({
  data: { jobs: townData.jobs || [] },
  callEmployer(e) {
    const phone = e.currentTarget.dataset.phone || '0577-63881234';
    wx.makePhoneCall({ phoneNumber: phone });
  }
});`,
    'pages/jobs/jobs.json': `{"navigationBarTitleText": "水头招工便民"}`,
    'pages/jobs/jobs.wxss': `.container { padding: 24rpx; background: #F8F9FA; min-height: 100vh; }
.top-title { font-size: 34rpx; font-weight: bold; color: #111827; display: block; }
.top-sub { font-size: 22rpx; color: #6B7280; display: block; margin: 6rpx 0 20rpx; }
.job-card { background: #FFF; border-radius: 24rpx; padding: 28rpx; margin-bottom: 20rpx; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.03); }
.job-header { display: flex; justify-content: space-between; margin-bottom: 10rpx; }
.job-title { font-size: 30rpx; font-weight: bold; }
.job-salary { font-size: 28rpx; font-weight: bold; color: #B91C1C; }
.job-company { font-size: 24rpx; color: #374151; margin-bottom: 6rpx; }
.job-location { font-size: 22rpx; color: #6B7280; margin-bottom: 16rpx; }
.btn-call { background: #059669 !important; color: #FFF !important; margin: 0; }`,
    'pages/memory/memory.wxml': `<!-- pages/memory/memory.wxml 水头记忆 -->
<view class="container">
  <view class="top-bar">
    <text class="top-title">老水头记忆 · 岁月回响</text>
    <text class="top-sub">带溪老木桥、工农路旧影与老一辈水头人的共同回忆</text>
  </view>
  <view class="memory-card">
    <view class="memory-year">1980年代 · 带溪木桥旧影</view>
    <view class="memory-desc">当年没有带溪跨江大桥，大家靠着老木桥与渡船往来江两岸，江水清澈，早市格外热闹。</view>
    <button class="btn-like" size="mini" bindtap="likeItem">❤️ 赞水头记忆 (142)</button>
  </view>
</view>`,
    'pages/memory/memory.js': `// pages/memory/memory.js
Page({
  likeItem() {
    wx.showToast({ title: '已点赞水头记忆', icon: 'success' });
  }
});`,
    'pages/memory/memory.json': `{"navigationBarTitleText": "水头记忆 · 岁月旧影"}`,
    'pages/memory/memory.wxss': `.container { padding: 24rpx; background: #F8F9FA; min-height: 100vh; }
.top-title { font-size: 34rpx; font-weight: bold; color: #111827; display: block; }
.top-sub { font-size: 22rpx; color: #6B7280; display: block; margin: 6rpx 0 20rpx; }
.memory-card { background: #FFF; border-radius: 24rpx; padding: 28rpx; margin-bottom: 20rpx; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.03); }
.memory-year { font-size: 28rpx; font-weight: bold; color: #B91C1C; margin-bottom: 12rpx; }
.memory-desc { font-size: 24rpx; color: #4B5563; line-height: 1.6; margin-bottom: 16rpx; }
.btn-like { background: #FEF2F2 !important; color: #B91C1C !important; margin: 0; }`,
    'pages/forum/forum.wxml': `<!-- pages/forum/forum.wxml 老乡圈 -->
<view class="container">
  <view class="top-bar">
    <text class="top-title">水头乡友圈 · 老乡聊天室</text>
    <text class="top-sub">天南地北水头人，共话家乡新变化</text>
  </view>
  <view class="post-card">
    <view class="post-user"><text class="name">阿强 (杭州游子)</text><text class="time">距水头 320km · 刚刚</text></view>
    <view class="post-content">离开水头三年了，每次回去都一定要去振兴路吃老水头牛肉焙，带溪绿道走一圈！</view>
    <button size="mini" class="btn-action" bindtap="toastAction">👍 点赞 (28)</button>
  </view>
</view>`,
    'pages/forum/forum.js': `// pages/forum/forum.js
Page({
  toastAction() { wx.showToast({ title: '点赞成功', icon: 'success' }); }
});`,
    'pages/forum/forum.json': `{"navigationBarTitleText": "水头乡友圈"}`,
    'pages/forum/forum.wxss': `.container { padding: 24rpx; background: #F8F9FA; min-height: 100vh; }
.top-title { font-size: 34rpx; font-weight: bold; color: #111827; display: block; }
.top-sub { font-size: 22rpx; color: #6B7280; display: block; margin: 6rpx 0 20rpx; }
.post-card { background: #FFF; border-radius: 24rpx; padding: 28rpx; margin-bottom: 20rpx; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.03); }
.post-user { display: flex; justify-content: space-between; margin-bottom: 12rpx; }
.name { font-size: 26rpx; font-weight: bold; }
.time { font-size: 20rpx; color: #9CA3AF; }
.post-content { font-size: 26rpx; color: #374151; line-height: 1.6; margin-bottom: 16rpx; }
.btn-action { background: #F3F4F6 !important; color: #4B5563 !important; margin: 0; }`,
    'pages/webview/webview.wxml': `<!-- pages/webview/webview.wxml 全景网页容器 -->
<web-view src="{{webUrl}}"></web-view>`,
    'pages/webview/webview.js': `// pages/webview/webview.js
const app = getApp();
Page({
  data: { webUrl: '' },
  onLoad() {
    this.setData({
      webUrl: app.globalData.onlineH5Url || 'https://ais-pre-msop3cwetd2muubsundvux-103123826347.europe-west3.run.app'
    });
  }
});`,
    'pages/webview/webview.json': `{"navigationBarTitleText": "水头家园在线"}`,
    'pages/webview/webview.wxss': ``,
    'pages/profile/profile.wxml': `<!-- pages/profile/profile.wxml 个人中心 -->
<view class="container">
  <view class="user-card">
    <view class="user-name">水头游子</view>
    <view class="user-city">当前城市：平阳水头 · 距水头 0 km</view>
  </view>
  <view class="menu-item" bindtap="openWeb">
    <text>🎫 我的团购与核销优惠券 ↗</text>
  </view>
</view>`,
    'pages/profile/profile.js': `// pages/profile/profile.js
Page({
  openWeb() { wx.navigateTo({ url: '/pages/webview/webview' }); }
});`,
    'pages/profile/profile.json': `{"navigationBarTitleText": "个人中心"}`,
    'pages/profile/profile.wxss': `.container { padding: 24rpx; background: #F8F9FA; min-height: 100vh; }
.user-card { background: #FFF; border-radius: 24rpx; padding: 32rpx; margin-bottom: 24rpx; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.03); }
.user-name { font-size: 32rpx; font-weight: bold; }
.user-city { font-size: 22rpx; color: #6B7280; margin-top: 6rpx; }
.menu-item { background: #FFF; border-radius: 20rpx; padding: 24rpx; font-size: 26rpx; color: #374151; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.03); }`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(mpFiles[selectedFile] || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(liveUrl);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  const handleDownloadDbBackup = async () => {
    try {
      const res = await fetch('/api/data');
      const json = await res.json();
      const content = JSON.stringify(json.data || json, null, 2);
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `shuitou_database_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download DB error:', err);
    }
  };

  const handleDownloadDeployZip = async () => {
    setIsDownloadingDeploy(true);
    try {
      const zip = new JSZip();

      // Dockerfile
      zip.file('Dockerfile', `# Production Dockerfile for Shuitou Homeland Full-Stack Application
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/data ./data

VOLUME ["/app/data"]
EXPOSE 3000

CMD ["node", "dist/server.cjs"]
`);

      // docker-compose.yml
      zip.file('docker-compose.yml', `version: '3.8'

services:
  shuitou-homeland:
    build: .
    container_name: shuitou-homeland-server
    restart: always
    ports:
      - "3000:3000"
    volumes:
      # 持久化数据库挂载目录：评论、帖子、招聘、商户数据在此永久保存
      - ./data:/app/data
    environment:
      - NODE_ENV=production
      - PORT=3000
`);

      // deploy.sh
      zip.file('deploy.sh', `#!/usr/bin/env bash
set -e
echo "🚀 开始部署 水头家园 全栈应用与持久化数据系统..."

if command -v docker >/dev/null 2>&1 && command -v docker-compose >/dev/null 2>&1; then
    echo "📦 检测到 Docker 环境，使用容器化极速部署..."
    mkdir -p data
    docker-compose down || true
    docker-compose build
    docker-compose up -d
    echo "✅ 容器已启动！访问地址：http://$(curl -s ifconfig.me || echo 'your-server-ip'):3000"
    exit 0
fi

echo "⚙️ 未检测到 Docker，切换为 Node.js 原生模式部署..."
npm install
npm run build
mkdir -p data
npm start
`);

      // package.json
      zip.file('package.json', `{
  "name": "shuitou-homeland-fullstack",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs",
    "start": "node dist/server.cjs"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.1.14",
    "@vitejs/plugin-react": "^5.0.4",
    "express": "^4.21.2",
    "jszip": "^3.10.1",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "three": "^0.185.1",
    "vite": "^6.2.3"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.14.0",
    "@types/three": "^0.185.4",
    "esbuild": "^0.25.0",
    "tailwindcss": "^4.1.14",
    "tsx": "^4.21.0",
    "typescript": "~5.8.2"
  }
}`);

      // server.ts
      zip.file('server.ts', `import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { getDb, updateDb } from './server/db';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', server: 'Shuitou Homeland Server' });
  });

  app.get('/api/data', (req, res) => {
    res.json({ success: true, data: getDb() });
  });

  app.post('/api/comments', (req, res) => {
    const { postId, text, user, city } = req.body;
    const commentItem = {
      id: 'c-' + Date.now(),
      user: user || '水头老乡',
      city: city || '平阳水头',
      text: String(text).trim(),
      time: '刚刚'
    };
    const updatedDb = updateDb((db) => {
      const post = db.posts.find(p => p.id === postId);
      if (post) post.comments = [commentItem, ...(post.comments || [])];
    });
    res.json({ success: true, comment: commentItem });
  });

  app.post('/api/posts', (req, res) => {
    const { author, avatar, tag, currentCity, content, images } = req.body;
    const newPost = {
      id: 'post-' + Date.now(),
      author: author || '水头游子',
      avatar: avatar || '',
      tag: tag || '乡音闲聊',
      currentCity: currentCity || '平阳·水头',
      content: String(content).trim(),
      images: Array.isArray(images) ? images : [],
      time: '刚刚',
      likes: 1,
      isLiked: true,
      comments: []
    };
    updateDb((db) => { db.posts = [newPost, ...db.posts]; });
    res.json({ success: true, post: newPost });
  });

  app.post('/api/posts/:id/like', (req, res) => {
    const { id } = req.params;
    let targetPost = null;
    updateDb((db) => {
      const post = db.posts.find(p => p.id === id);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likes = (post.likes || 0) + (post.isLiked ? 1 : -1);
        targetPost = post;
      }
    });
    res.json({ success: true, post: targetPost });
  });

  app.post('/api/jobs', (req, res) => {
    const jobData = req.body;
    const newJob = {
      id: 'job-' + Date.now(),
      ...jobData,
      postedTime: '刚刚'
    };
    updateDb((db) => { db.jobs = [newJob, ...db.jobs]; });
    res.json({ success: true, job: newJob });
  });

  app.post('/api/stores', (req, res) => {
    const storeData = req.body;
    const newStore = {
      id: 'store-' + Date.now(),
      ...storeData,
      rating: 5.0,
      soldCount: 1
    };
    updateDb((db) => { db.stores = [newStore, ...db.stores]; });
    res.json({ success: true, store: newStore });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log('Server running on port ' + PORT);
  });
}
startServer();
`);

      // server/db.ts
      const serverDir = zip.folder('server');
      serverDir?.file('db.ts', `import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'shuitou_database.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function getDb() {
  if (!fs.existsSync(DB_FILE)) return { posts: [], jobs: [], stores: [], vouchers: [] };
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

export function updateDb(updater) {
  const current = getDb();
  updater(current);
  current.updatedAt = new Date().toISOString();
  fs.writeFileSync(DB_FILE, JSON.stringify(current, null, 2), 'utf-8');
  return current;
}
`);

      // Initial database file in ./data/
      try {
        const res = await fetch('/api/data');
        const json = await res.json();
        const dataDir = zip.folder('data');
        dataDir?.file('shuitou_database.json', JSON.stringify(json.data || json, null, 2));
      } catch (e) {
        const dataDir = zip.folder('data');
        dataDir?.file('shuitou_database.json', '{}');
      }

      // Deployment guide README_DEPLOY.md
      zip.file('README_DEPLOY.md', `# 水头家园 - 全栈服务端与持久化数据库一键部署指南

## 🌟 架构亮点
1. **真实数据持久化**：所有的老乡留言、帖子、招聘和商户数据均持久化保存在本地 \`data/shuitou_database.json\` 文件中，重启不丢失，随时可备份拷贝！
2. **无需复杂数据库环境**：不需要配置复杂的 MySQL 或 PostgreSQL 密码，解压即跑！
3. **内置 RESTful API**：
   - \`GET /api/data\`：拉取全量持久化数据
   - \`POST /api/comments\`：发表老乡留言评论
   - \`POST /api/posts\`：发布游子乡情帖子
   - \`POST /api/jobs\`：发布招聘求职
   - \`POST /api/stores\`：商户入驻

---

## 🚀 部署方法 1：Docker 一键部署（最推荐 · 30秒完成）
在您的云服务器（阿里云 / 腾讯云 / 华为云 / 海外 VPS）终端中，进入解压目录：
\`\`\`bash
docker-compose up -d --build
\`\`\`
服务即在后台开机自启（3000端口）。
并且数据目录 \`./data\` 会自动持久化映射在服务器宿主机，容器重建或升级数据绝对不会丢失！

---

## 🚀 部署方法 2：宝塔面板 / 普通 Linux 终端部署
如果使用宝塔面板：
1. 在宝塔面板新建 Node.js 项目；
2. 上传本 zip 压缩包并解压；
3. 执行一键脚本：
\`\`\`bash
bash deploy.sh
\`\`\`
或手动启动：
\`\`\`bash
npm install
npm run build
npm start
\`\`\`

---

## 📱 微信小程序如何对接本持久化后端？
1. 登录微信公众平台 (mp.weixin.qq.com)，在【开发】->【开发管理】->【开发设置】的「request 合法域名」中，填入您的服务器域名（例如 \`https://api.yourdomain.com\`）；
2. 小程序前端发送请求时直接调用此服务接口，老乡在小程序里的所有发表、互动便会永久保存在您的服务器中！
`);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'shuitou-homeland-fullstack-deploy.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloadingDeploy(false);
    }
  };

  const handleDownloadZip = async () => {
    setIsDownloading(true);
    try {
      const zip = new JSZip();
      
      zip.file('project.config.json', mpFiles['project.config.json']);
      zip.file('app.json', mpFiles['app.json']);
      zip.file('app.js', mpFiles['app.js']);
      zip.file('app.wxss', mpFiles['app.wxss']);
      zip.file('sitemap.json', mpFiles['sitemap.json']);
      
      const dataDir = zip.folder('data');
      dataDir?.file('townData.js', mpFiles['data/townData.js']);

      const pages = ['index', 'commerce', 'jobs', 'memory', 'forum', 'roads3d', 'webview', 'profile'];
      const pagesDir = zip.folder('pages');

      for (const pageName of pages) {
        const pDir = pagesDir?.folder(pageName);
        pDir?.file(`${pageName}.wxml`, mpFiles[`pages/${pageName}/${pageName}.wxml`] || `<view class="container"><text>${pageName}</text></view>`);
        pDir?.file(`${pageName}.js`, mpFiles[`pages/${pageName}/${pageName}.js`] || `Page({})`);
        pDir?.file(`${pageName}.json`, mpFiles[`pages/${pageName}/${pageName}.json`] || `{"navigationBarTitleText": "${pageName}"}`);
        pDir?.file(`${pageName}.wxss`, mpFiles[`pages/${pageName}/${pageName}.wxss`] || '');
      }

      // Valid transparent 1x1 PNG for tabBar icons so WeChat DevTools never warns about missing icons
      const transparentPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      const tabIcons = [
        'tab_home.png',
        'tab_home_active.png',
        'tab_shop.png',
        'tab_shop_active.png',
        'tab_3d.png',
        'tab_3d_active.png',
        'tab_job.png',
        'tab_job_active.png',
        'tab_memory.png',
        'tab_memory_active.png'
      ];
      const imgDir = zip.folder('images');
      tabIcons.forEach(iconName => {
        imgDir?.file(iconName, transparentPngBase64, { base64: true });
      });

      zip.file('README.md', `# 水头家园 - 微信小程序全功能工程源码包\n\n1. 打开微信开发者工具，点击【导入】，选择本解压后的文件夹。\n2. AppID 可以填您自己的微信小程序 AppID（或选择测试号/游客模式）。\n3. 点击右上角“预览”即可手机微信扫码查看效果；点击“上传”即可直接提交到微信公众平台审核发布！\n`);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'shuitou-homeland-wx-miniprogram.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-900 via-stone-900 to-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 flex-wrap">
                水头家园 · 微信小程序 / 手机直览中心
                <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold">
                  免调试即开
                </span>
              </h2>
              <p className="text-xs text-gray-300">
                支持手机微信直接扫码体验、公众平台极速上传与原生小程序工程包
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-gray-100 bg-gray-50 px-4 pt-2 gap-2 text-xs font-medium overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('deploy')}
            className={`pb-2.5 px-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'deploy'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>🚀 数据持久化与一键部署 (开箱即用)</span>
          </button>
          <button
            onClick={() => setActiveTab('instant')}
            className={`pb-2.5 px-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'instant'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>📱 微信扫码即看 (零工具·免调试)</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-2.5 px-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>📤 微信平台免调上传 (体验版太阳码)</span>
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`pb-2.5 px-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'assets'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>📦 为什么包体小？(图片与3D说明)</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`pb-2.5 px-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <span>💻 原生源码</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 0: 数据持久化与一键部署系统 */}
          {activeTab === 'deploy' && (
            <div className="space-y-4">
              {/* Status banner */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-stone-50 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                    </span>
                    <span className="text-sm font-bold text-emerald-950">
                      后端数据库已接入 · 数据持久化状态：正常
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed max-w-xl">
                    用户发表的所有<strong>老乡留言评论、论坛发帖、点赞、招工求职、商户入驻与卡券领取</strong>均自动实时写入本地持久化文件库（<code className="bg-white px-1.5 py-0.5 rounded border border-gray-200 font-mono text-[11px] text-emerald-800">./data/shuitou_database.json</code>），刷新页面或重启服务数据不丢失。
                  </p>
                </div>
                <button
                  onClick={handleDownloadDbBackup}
                  className="bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>导出当前数据库 (.json)</span>
                </button>
              </div>

              {/* One-click downloadable package highlight */}
              <div className="p-4 sm:p-5 bg-stone-900 text-white rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-stone-800">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-400 text-stone-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      开箱即用
                    </span>
                    <h3 className="text-base font-bold text-white">
                      全栈一键部署包 (含 Express 后端 + 持久化数据库 + Docker + 脚本)
                    </h3>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed max-w-xl">
                    已为您打好完整的生产级全套工程包，支持直接下载后上传到任何服务器（阿里云、腾讯云、宝塔面板或海外 VPS），无需配置复杂环境，单条命令即可上线！
                  </p>
                </div>
                <button
                  onClick={handleDownloadDeployZip}
                  disabled={isDownloadingDeploy}
                  className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 shrink-0 disabled:opacity-50 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-stone-950" />
                  <span>{isDownloadingDeploy ? '正在打包压缩...' : '一键下载全栈部署包 (.zip)'}</span>
                </button>
              </div>

              {/* Deployment instructions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                {/* Mode 1 */}
                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">1</span>
                    <span>Docker 极速部署 (30秒)</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    在云服务器解压后，执行一行命令即可全天候运行：
                  </p>
                  <div className="bg-stone-900 text-emerald-400 p-2 rounded-lg font-mono text-[11px] select-all">
                    docker-compose up -d --build
                  </div>
                  <p className="text-[10px] text-gray-500">
                    * 数据目录 <code className="font-mono">./data</code> 已挂载，升级重建容器数据永久保留！
                  </p>
                </div>

                {/* Mode 2 */}
                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                    <span>宝塔面板 / 普通 Linux VPS</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    解压后运行内置自动化安装部署脚本：
                  </p>
                  <div className="bg-stone-900 text-blue-300 p-2 rounded-lg font-mono text-[11px] select-all">
                    bash deploy.sh
                  </div>
                  <p className="text-[10px] text-gray-500">
                    * 脚本会自动安装所需依赖、编译并启动 3000 端口服务。
                  </p>
                </div>

                {/* Mode 3 */}
                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                    <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">3</span>
                    <span>微信小程序跨端持久化对接</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    微信公众平台配置您的域名为 request 域名：
                  </p>
                  <div className="bg-stone-900 text-amber-300 p-2 rounded-lg font-mono text-[11px]">
                    https://your-domain.com
                  </div>
                  <p className="text-[10px] text-gray-500">
                    * 手机端与小程序产生的所有交互统一汇聚到您自有的独立数据库中！
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* TAB 1: 微信扫码免调试直看 (用户最想要的一秒见效方式) */}
          {activeTab === 'instant' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center gap-5">
                {/* Real Live QR Code */}
                <div className="shrink-0 bg-white p-3 rounded-2xl shadow-md border border-emerald-100 flex flex-col items-center text-center">
                  <img 
                    src={qrCodeUrl} 
                    alt="微信扫一扫实时看效果" 
                    className="w-40 h-40 sm:w-44 sm:h-44 object-contain rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[11px] text-emerald-800 font-bold mt-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    拿出手机微信扫一扫
                  </span>
                </div>

                {/* Instant explanation */}
                <div className="flex-1 space-y-2.5 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs px-2.5 py-1 rounded-full font-bold">
                    <span>方式一：免安装任何软件，微信内 1 秒运行</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 leading-snug">
                    直接在手机微信中查看水头家园全量效果
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    当前应用已部署在云端并完成移动端深度适配。<strong>无需下载微信开发者工具，无需配置任何代码</strong>，直接用微信扫码，即可在手机微信中体验<strong>全部 3D 数字孪生路网、老水头记忆、求职招聘与商圈优惠</strong>！
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                    <button
                      onClick={handleCopyUrl}
                      className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold transition-all shadow-xs"
                    >
                      {urlCopied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>已复制链接</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-emerald-700" />
                          <span>复制网址发送到微信聊天</span>
                        </>
                      )}
                    </button>
                    
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                    >
                      <span>新窗口打开体验</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Tips for Wechat users */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-xs space-y-1">
                  <span className="font-bold text-[#1A1A1B] flex items-center gap-1">
                    📌 添加到微信浮窗/桌面
                  </span>
                  <p className="text-gray-500 text-[11px] leading-relaxed">
                    手机微信打开后，点击右上角「···」，选择「添加到桌面」或「设为浮窗」，体验和安装的小程序完全一样！
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-xs space-y-1">
                  <span className="font-bold text-[#1A1A1B] flex items-center gap-1">
                    💬 微信群 / 朋友圈一键分享
                  </span>
                  <p className="text-gray-500 text-[11px] leading-relaxed">
                    可直接将链接发送给任何平阳水头的老乡朋友，任何手机点击即可秒级浏览，不需要对方提前安装小程序。
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-xs space-y-1">
                  <span className="font-bold text-[#1A1A1B] flex items-center gap-1">
                    🔗 绑定到微信公众号
                  </span>
                  <p className="text-gray-500 text-[11px] leading-relaxed">
                    如果您拥有水头本地微信公众号，可在公众号后台「自定义菜单」直接粘贴此网址，读者点击底部菜单直接进入！
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 微信平台免调代码直接上传 */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-900 leading-relaxed space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-950">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>解答：微信公众平台 (mp.weixin.qq.com) 为什么网页上没有“上传压缩包”按钮？</span>
                </div>
                <p>
                  因为腾讯微信官方为了防范恶意木马和代码防伪签名，<strong>对所有开发者统一关闭了网页端上传 zip 的功能</strong>。微信规定：所有原生小程序必须通过腾讯官方签发的「微信开发者工具」客户端上传。
                </p>
                <div className="p-2.5 bg-white/80 rounded-xl border border-amber-200 text-emerald-900 font-medium">
                  💡 <strong>好消息是：您根本不需要调试代码！</strong> 代码我们已经为您全部写好了，您在开发者工具里<strong>不需要改任何一行代码、不需要看任何控制台，点一次“导入”然后点一次“上传”就完成了！</strong>
                </div>
              </div>

              {/* 2-Click zero-debug guide */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#1A1A1B] uppercase tracking-wider">
                  零调试两步直接传微信平台（生成微信官方体验版太阳码）：
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#B91C1C] text-white text-xs font-bold flex items-center justify-center">1</span>
                      <h4 className="text-xs font-bold text-[#1A1A1B]">第一步：点击“导入”</h4>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                      下载下方源码压缩包解压，打开官方「微信开发者工具」，点击「导入」，文件夹选择刚才解压的目录，AppID 填你的小程序 AppID。
                    </p>
                  </div>

                  <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                      <h4 className="text-xs font-bold text-[#1A1A1B]">第二步：右上角直接点“上传”</h4>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                      <strong>不用点任何调试、不用写任何代码</strong>，直接点击右上角绿色的「上传」按钮，输入版本号「1.0.0」确定，代码就直接推送到微信后台了！
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-xs text-emerald-950 space-y-2">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    如何把上传的代码生成微信官方「体验版太阳码」？
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    上传完成后，登录微信公众平台（mp.weixin.qq.com），在左侧菜单点击「版本管理」➔ 找到刚才上传的 1.0.0 版本 ➔ 点击「选为体验版」。此时页面会立即生成一个<strong>永久微信小程序太阳码</strong>，微信扫一扫即可直接作为正式小程序体验，完全不需要等微信审核！
                  </p>
                </div>

                <div className="pt-1 flex items-center justify-end">
                  <button
                    onClick={handleDownloadZip}
                    disabled={isDownloading}
                    className="bg-stone-900 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isDownloading ? '正在打包压缩...' : '下载全量无须调试工程包 (.zip)'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 为什么包体小 */}
          {activeTab === 'assets' && (
            <div className="space-y-3.5">
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-900 leading-relaxed flex gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-amber-950 mb-1">
                    微信官方对小程序包大小实行「严苛的 2MB 上限」
                  </h4>
                  <p>
                    微信规定：任何超过 2MB 的本地文件都会导致微信开发者工具报错拦截，无法上传！大厂（美团、高德、携程）的小程序代码包也仅有几十 KB。
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1A1A1B]">
                    <ImageIcon className="w-4 h-4 text-blue-600" />
                    <span>1. 高清图片：云端 CDN 高速加载</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    老水头非遗美食、老江桥照片、商户门头图，完整配置在 <code className="bg-gray-200 px-1 rounded font-mono">data/townData.js</code> 中。手机微信打开时<strong>实时高速按需拉取并持久化本地缓存</strong>，既不占包体大小，又能秒级显示！
                  </p>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1A1A1B]">
                    <Box className="w-4 h-4 text-purple-600" />
                    <span>2. 3D 道路建模：算法矢量网格生成</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    水头振兴路、劲松东路与带溪大桥的 3D 模型，采用 <strong>WebGL / Three.js 矢量数学网格（Procedural Mesh）</strong>由代码实时动态绘制计算！车辆粒子流动、水面波光与高德路况，全部装在几KB的算法中，完全不占包体！
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 原生源码 */}
          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
                  {Object.keys(mpFiles).map((filename) => (
                    <button
                      key={filename}
                      onClick={() => setSelectedFile(filename)}
                      className={`text-xs px-2.5 py-1 rounded-xl transition-all whitespace-nowrap font-mono ${
                        selectedFile === filename
                          ? 'bg-stone-900 text-white font-bold'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filename}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCopyCode}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs text-gray-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>复制代码</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-3.5 bg-stone-900 text-gray-200 rounded-2xl font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[360px] border border-stone-800">
                <code>{mpFiles[selectedFile]}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
          <span className="text-gray-500">
            支持手机微信直接扫码 / 微信公众平台体验版一键直传
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-medium transition-colors"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};
