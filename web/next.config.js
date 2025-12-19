/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: process.env.BASE_PATH || '',
  // Allow service name to be injected at build time
  env: {
    SERVICE_NAME: process.env.SERVICE_NAME || 'Kohlex Service',
    SERVICE_SLUG: process.env.SERVICE_SLUG || 'service'
  }
}

module.exports = nextConfig
