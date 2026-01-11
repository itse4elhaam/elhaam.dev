import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
