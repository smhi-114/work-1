/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // allow placeholder images used in mock data
    domains: ['placehold.co', 'via.placeholder.com'],
    formats: ['image/avif', 'image/webp']
  }
}

module.exports = nextConfig
