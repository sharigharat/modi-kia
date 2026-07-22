import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgd.aeplcdn.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "bunny-wp-pullzone-cghvklkcns.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "www.kia.com",
      },
      {
        protocol: "https",
        hostname: "stimg.cardekho.com",
      },
    ],
  },
};

export default nextConfig;
