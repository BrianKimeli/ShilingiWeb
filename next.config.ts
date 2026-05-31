import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/blog", destination: "/times", permanent: true },
    ];
  },
};

export default nextConfig;