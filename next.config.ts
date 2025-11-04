import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  experimental: {
    cssChunking: true,
    turbopackFileSystemCacheForDev: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      new URL("https://avatars.githubusercontent.com/u/**?v=4"),
      new URL("https://github.com/**.png"),
    ],
  },
};

export default nextConfig;
