import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/datasnipe",
        destination: "/datasnype",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/hypepipe/:path*",
        destination: "https://api.edgeblocks.io/api/v1/hypepipe/:path*",
      },
    ];
  },
};

export default nextConfig;
