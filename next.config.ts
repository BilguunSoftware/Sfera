import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  poweredByHeader: false,
  agentRules: false,
};

export default nextConfig;
