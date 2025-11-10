import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  //NOTE: will only load the modules you are actually using
  experimental: { optimizePackageImports: [], viewTransition: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
  },
};

export default nextConfig;
