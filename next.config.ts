import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost","192.168.1.181"],
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Photos uploaded through the Sanity Studio.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@base-ui/react"],
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
