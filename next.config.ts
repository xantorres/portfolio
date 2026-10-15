import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/modernize",
          has: [{ type: "host", value: "redfirst.dev" }],
        },
      ],
    };
  },
};

export default nextConfig;
