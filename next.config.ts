import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
    routerBFCache: true,
    cssChunking: true,
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      new URL("https://avatars.githubusercontent.com/u/**?v=4"),
      new URL("https://github.com/**.png"),
    ],
  },
};

export default nextConfig;
