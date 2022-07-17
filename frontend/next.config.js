/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*/",
        destination: `http://127.0.0.1:8000/api/:path*/`,
      },
      {
        source: "/static/:path*",
        destination: `http://127.0.0.1:8000/static/:path*`,
      },
    ];
  },
  images: {
    domains: ["127.0.0.1"],
  },
};

module.exports = nextConfig;
