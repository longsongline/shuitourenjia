#!/usr/bin/env bash
# ============================================================
# 水头家园 (Shuitou Homeland) 全栈应用一键部署脚本
# 适用环境：腾讯云 / 阿里云 / 华为云 / 宝塔面板 / 任意 Linux VPS
# ============================================================

set -e

echo "🚀 开始部署 水头家园 全栈应用与持久化数据系统..."

# 1. 检查 Docker 环境
if command -v docker >/dev/null 2>&1 && command -v docker-compose >/dev/null 2>&1; then
    echo "📦 检测到 Docker 环境，使用容器化极速部署..."
    mkdir -p data
    docker-compose down || true
    docker-compose build
    docker-compose up -d
    echo "✅ 容器已启动！访问地址：http://$(curl -s ifconfig.me || echo 'your-server-ip'):3000"
    exit 0
fi

# 2. 如果没有 Docker，使用 Node.js 原生部署
echo "⚙️ 未检测到 Docker，切换为 Node.js 原生模式部署..."

if ! command -v node >/dev/null 2>&1; then
    echo "❌ 未检测到 Node.js，请先安装 Node.js (v18+):"
    echo "curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs"
    exit 1
fi

echo "📦 正在安装依赖..."
npm install

echo "🔨 正在编译生产版本..."
npm run build

echo "💾 初始化持久化数据目录..."
mkdir -p data

echo "🌟 启动后台服务 (PM2 或 Nohup)..."
if command -v pm2 >/dev/null 2>&1; then
    pm2 stop shuitou-app || true
    pm2 start dist/server.cjs --name "shuitou-app"
    pm2 save
    echo "✅ PM2 管理的服务已成功启动！"
else
    nohup npm start > server.log 2>&1 &
    echo "✅ 服务已在后台启动 (日志写入 server.log)！"
fi

echo "🎉 部署完成！请在浏览器或微信中访问您的服务器 3000 端口。"
