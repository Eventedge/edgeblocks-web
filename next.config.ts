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
};

export default nextConfig;
