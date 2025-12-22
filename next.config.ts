import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/sfg-web',
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
