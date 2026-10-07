import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // One canonical origin for search engines: the bare domain always lands on www.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "monitizee.xyz" }],
        destination: "https://www.monitizee.xyz/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
