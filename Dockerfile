# Stage 1: Build API
FROM node:20-alpine AS api-builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy API source
COPY tsconfig.json ./
COPY src ./src/

# Build TypeScript API
RUN npm run build

# Stage 2: Build Web
FROM node:20-alpine AS web-builder

WORKDIR /app/web

# Copy web package files
COPY web/package*.json ./

# Install dependencies
RUN npm ci

# Copy web source
COPY web ./

# Set service name for build (will be overridden by GitHub Actions)
ARG SERVICE_NAME="Kohlex Service"
ARG SERVICE_SLUG="service"
ARG BASE_PATH=""
ENV SERVICE_NAME=$SERVICE_NAME
ENV SERVICE_SLUG=$SERVICE_SLUG
ENV BASE_PATH=$BASE_PATH

# Build Next.js app
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS production

WORKDIR /app

# Install supervisor to run multiple processes
RUN apk add --no-cache supervisor

# Copy API package files
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built API
COPY --from=api-builder /app/dist ./dist

# Copy built Next.js standalone app
COPY --from=web-builder /app/web/.next/standalone ./web-standalone/
COPY --from=web-builder /app/web/.next/static ./web-standalone/app/web/.next/static
COPY --from=web-builder /app/web/public ./web-standalone/app/web/public 2>/dev/null || true

# Create supervisor config
RUN mkdir -p /etc/supervisor.d
COPY <<EOF /etc/supervisor.d/services.ini
[supervisord]
nodaemon=true
user=root

[program:api]
command=node /app/dist/server.js
directory=/app
autostart=true
autorestart=true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
environment=NODE_ENV=production

[program:web]
command=node /app/web-standalone/app/web/server.js
directory=/app/web-standalone/app/web
autostart=true
autorestart=true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
environment=NODE_ENV=production,HOSTNAME=0.0.0.0
EOF

# Health check (check API)
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${API_PORT:-3001}/health || exit 1

# Expose ports (will be set by environment)
EXPOSE 3000 3001

# Set environment
ENV NODE_ENV=production

# Start supervisor (runs both API and web)
CMD ["supervisord", "-c", "/etc/supervisor.d/services.ini"]
