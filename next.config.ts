import type { NextConfig } from "next";

const projectId = "n6kwawc1";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: `/images/${projectId}/production/**`,
      },
    ],
  },
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
