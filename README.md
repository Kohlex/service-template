# Kohlex Service Template

This is the template repository for auto-provisioning new Kohlex platform services.

## Structure

```
├── src/
│   └── server.ts      # Express API server
├── web/
│   └── app/
│       ├── layout.tsx # Next.js layout
│       └── page.tsx   # Landing page
├── Dockerfile         # Multi-stage build (API + Web)
└── .github/workflows/ # GitHub Actions deployment
```

## Features

- **API Server**: Express.js with health checks
- **Web Frontend**: Next.js landing page
- **Auto-deployment**: GitHub Actions to ECR → EC2
- **Multi-process**: Supervisor runs both API and Web

## GitHub Variables (set by provisioning)

| Variable | Description |
|----------|-------------|
| `SERVICE_NAME` | Display name (e.g., "Invoice Manager") |
| `SERVICE_SLUG` | URL slug (e.g., "invoice") |
| `ECR_REPOSITORY` | ECR repo name |
| `CONTAINER_NAME` | Docker container name |
| `API_PORT` | API server port |
| `WEB_PORT` | Web server port |

## Required GitHub Secrets

- `EC2_SSH_KEY` - SSH private key for EC2 deployment

## Local Development

```bash
# API
npm install
npm run dev

# Web
cd web
npm install
npm run dev
```

## Endpoints

- `GET /` - Landing page (web)
- `GET /{slug}/api/health` - API health check
- `GET /{slug}/api/ready` - API readiness check
