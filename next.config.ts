import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/products/pocket-power-bank",
        destination: "https://fusionlabs.space/git-github-for-devops-beginners/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
