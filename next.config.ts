import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "hips.hearstapps.com",
      },
      {
        protocol: "https",
        hostname: "ads-perfumes.com",
      },
      {
        protocol: "https",
        hostname: "assets.vogue.com",
      },
      {
        protocol: "https",
        hostname: "c1.wallpaperflare.com",
      }
    ],
  },
};

export default nextConfig;
