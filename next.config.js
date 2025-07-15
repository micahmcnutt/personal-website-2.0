/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/personal-website-2.0' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/personal-website-2.0' : '',
}

module.exports = nextConfig 