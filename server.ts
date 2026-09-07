import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { getDb, updateDb } from './server/db';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON requests
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // 1. Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString(), server: 'Shuitou Homeland Server' });
  });

  // 2. Get full persistent database data
  app.get('/api/data', (req: Request, res: Response) => {
    try {
      const data = getDb();
      res.json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 3. Post a comment (persists in DB)
  app.post('/api/comments', (req: Request, res: Response) => {
    try {
      const { postId, text, user, city } = req.body;
      if (!postId || !text) {
        return res.status(400).json({ success: false, error: 'postId and text are required' });
      }

      const commentItem = {
        id: 'c-' + Date.now(),
        user: user || '水头老乡',
        city: city || '平阳水头',
        text: String(text).trim(),
        time: '刚刚'
      };

      const updatedDb = updateDb((db) => {
        const post = db.posts.find(p => p.id === postId);
        if (post) {
          post.comments = [commentItem, ...(post.comments || [])];
        }
      });

      const updatedPost = updatedDb.posts.find(p => p.id === postId);
      res.json({ success: true, comment: commentItem, post: updatedPost });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4. Create a new forum post
  app.post('/api/posts', (req: Request, res: Response) => {
    try {
      const { author, avatar, tag, currentCity, content, images } = req.body;
      if (!content) {
        return res.status(400).json({ success: false, error: 'content is required' });
      }

      const newPost = {
        id: 'post-' + Date.now(),
        author: author || '水头游子',
        avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        tag: tag || '乡音闲聊',
        currentCity: currentCity || '平阳·水头',
        content: String(content).trim(),
        images: Array.isArray(images) ? images : [],
        time: '刚刚',
        likes: 1,
        isLiked: true,
        comments: []
      };

      const updatedDb = updateDb((db) => {
        db.posts = [newPost, ...db.posts];
      });

      res.json({ success: true, post: newPost, total: updatedDb.posts.length });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 5. Like a post
  app.post('/api/posts/:id/like', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      let targetPost: any = null;

      updateDb((db) => {
        const post = db.posts.find(p => p.id === id);
        if (post) {
          post.isLiked = !post.isLiked;
          post.likes = (post.likes || 0) + (post.isLiked ? 1 : -1);
          if (post.likes < 0) post.likes = 0;
          targetPost = post;
        }
      });

      if (!targetPost) {
        return res.status(404).json({ success: false, error: 'Post not found' });
      }

      res.json({ success: true, post: targetPost });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 6. Post a job recruitment
  app.post('/api/jobs', (req: Request, res: Response) => {
    try {
      const jobData = req.body;
      if (!jobData.title || !jobData.company || !jobData.phone) {
        return res.status(400).json({ success: false, error: 'title, company and phone are required' });
      }

      const newJob = {
        id: 'job-' + Date.now(),
        title: jobData.title,
        company: jobData.company,
        salary: jobData.salary || '面议',
        location: jobData.location || '平阳县水头镇',
        type: jobData.type || '全职',
        tags: Array.isArray(jobData.tags) ? jobData.tags : ['急聘', '包吃住'],
        requirements: Array.isArray(jobData.requirements) ? jobData.requirements : ['工作认真负责，服从安排'],
        contactName: jobData.contactName || '招聘负责人',
        phone: jobData.phone,
        wechat: jobData.wechat || jobData.phone,
        postedTime: '刚刚'
      };

      updateDb((db) => {
        db.jobs = [newJob, ...db.jobs];
      });

      res.json({ success: true, job: newJob });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 7. Post a new merchant / store
  app.post('/api/stores', (req: Request, res: Response) => {
    try {
      const storeData = req.body;
      if (!storeData.name || !storeData.tel) {
        return res.status(400).json({ success: false, error: 'name and tel are required' });
      }

      const newStore = {
        id: 'store-' + Date.now(),
        name: storeData.name,
        category: storeData.category || '生活商超',
        coverImage: storeData.coverImage || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        address: storeData.address || '水头镇中心街区',
        distance: '距镇中心 400m',
        rating: 5.0,
        tel: storeData.tel,
        tags: Array.isArray(storeData.tags) && storeData.tags.length ? storeData.tags : ['新店入驻', '水头老乡推荐'],
        couponTitle: storeData.couponTitle || '进店老乡特惠 8.8 折',
        originalPrice: Number(storeData.originalPrice) || 100,
        discountPrice: Number(storeData.discountPrice) || 88,
        soldCount: 1,
        description: storeData.description || '欢迎水头乡亲莅临体验，品质保证！'
      };

      updateDb((db) => {
        db.stores = [newStore, ...db.stores];
      });

      res.json({ success: true, store: newStore });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8. Claim a voucher / coupon
  app.post('/api/vouchers/claim', (req: Request, res: Response) => {
    try {
      const { storeId, storeName, couponTitle, discountPrice, originalPrice } = req.body;
      const newVoucher = {
        id: 'v-' + Date.now(),
        storeId: storeId || 'unknown',
        storeName: storeName || '水头特惠商户',
        title: couponTitle || '水头游子专享特惠券',
        discountPrice: Number(discountPrice) || 0,
        originalPrice: Number(originalPrice) || 0,
        validUntil: '2026-12-31',
        qrCodeText: 'ST-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        status: 'unused' as const,
        claimedAt: '刚刚'
      };

      const updatedDb = updateDb((db) => {
        db.vouchers = [newVoucher, ...(db.vouchers || [])];
      });

      res.json({ success: true, voucher: newVoucher, allVouchers: updatedDb.vouchers });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 9. Redeem a voucher
  app.post('/api/vouchers/redeem', (req: Request, res: Response) => {
    try {
      const { voucherId } = req.body;
      const updatedDb = updateDb((db) => {
        const v = db.vouchers?.find(item => item.id === voucherId);
        if (v) {
          v.status = 'used';
        }
      });
      res.json({ success: true, vouchers: updatedDb.vouchers });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 10. Update user profile
  app.post('/api/user/profile', (req: Request, res: Response) => {
    try {
      const profileData = req.body;
      const updatedDb = updateDb((db) => {
        db.userProfile = { ...db.userProfile, ...profileData };
      });
      res.json({ success: true, profile: updatedDb.userProfile });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 11. WeChat login mock/real session endpoint
  app.post('/api/wechat/login', (req: Request, res: Response) => {
    try {
      const { code } = req.body;
      // In production with APPID & SECRET, exchange code for openid via https://api.weixin.qq.com/sns/jscode2session
      // Here we generate a persistent openid and token
      const mockOpenId = 'wx_user_' + (code ? code.slice(0, 8) : 'demo');
      res.json({
        success: true,
        openid: mockOpenId,
        token: 'token_' + Date.now(),
        message: '微信登录授权成功'
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 12. Direct Database Export
  app.get('/api/db/export', (req: Request, res: Response) => {
    try {
      const db = getDb();
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename=shuitou_database_backup.json');
      res.send(JSON.stringify(db, null, 2));
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Shuitou Backend] Server running on http://0.0.0.0:${PORT} with persistent database`);
  });
}

startServer();
