/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // No basePath or assetPrefix needed for custom domain
  // Ensure static export works properly
  distDir: 'out',
}

module.exports = nextConfig 