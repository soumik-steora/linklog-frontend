import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',               // Exports static HTML to 'out' folder
  images: { unoptimized: true },  // Disable Next.js Image Optimization (requires Node server)
  trailingSlash: true,
};

export default nextConfig;
