/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },

      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },

      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },

      {
        protocol: "https",
        hostname: "hdotrade.com",
      },
    ],
  },
  output: 'export',
  trailingSlash: true,
};

export default nextConfig;
