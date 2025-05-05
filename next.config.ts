import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath and assetPrefix are not needed for custom domain deployments
  // basePath: process.env.GITHUB_ACTIONS ? '/ricardo-blog' : '',
  // assetPrefix: process.env.GITHUB_ACTIONS ? '/ricardo-blog/' : '',
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
