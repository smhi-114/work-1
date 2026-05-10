/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    // allow placeholder images used in mock data
    domains: ["placehold.co", "via.placeholder.com"],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  webpack(config, { dev }) {
    if (!dev) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;
