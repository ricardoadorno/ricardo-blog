import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Set up base path for GitHub Pages deployment
  // This should match your repository name, e.g., /ricardo-blog
  // Remove this if you're deploying to a custom domain or to username.github.io
  basePath: process.env.GITHUB_ACTIONS ? '/ricardo-blog' : '',
  // This ensures assets are served correctly with the basePath
  assetPrefix: process.env.GITHUB_ACTIONS ? '/ricardo-blog/' : '',
  // Required for GitHub Pages deployment
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
