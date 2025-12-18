# Kohlex Service Template

Auto-generated service from the Kohlex IAM provisioning system.

## Setup

1. Clone this repository
2. Copy `.env.example` to `.env` and configure
3. Run `npm install`
4. Run `npm run dev` for development

## Deployment

This service deploys automatically via GitHub Actions when you push to `main`.

### Required GitHub Actions Variables

Set these in your repository settings under Settings > Secrets and variables > Actions > Variables:

- `ECR_REPOSITORY` - ECR repository name (e.g., `kohlex-myservice-service`)
- `CONTAINER_NAME` - Docker container name (e.g., `myservice-service`)
- `API_PORT` - Port the service runs on (e.g., `3060`)

### Required GitHub Actions Secrets

- `EC2_SSH_KEY` - SSH private key for EC2 deployment

## Endpoints

- `GET /` - Service info
- `GET /health` - Health check
- `GET /ready` - Readiness check
