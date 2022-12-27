/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['assets-us-01.kc-usercontent.com', "preview-assets-us-01.kc-usercontent.com", 'di8m9w6rqrh5d.cloudfront.net'],
  },
}

module.exports = nextConfig
