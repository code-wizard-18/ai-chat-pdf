import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  server: {
    maxRequestBodySize: 10 * 1024 * 1024 // 10MB
  }
};

export default nextConfig;
