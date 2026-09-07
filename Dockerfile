# Production Dockerfile for Shuitou Homeland Full-Stack Application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Build frontend static bundle and compile backend to dist/server.cjs
RUN npm run build

# Production runner stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy node_modules and built dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/data ./data

# Persist database in volume
VOLUME ["/app/data"]

EXPOSE 3000

CMD ["node", "dist/server.cjs"]
