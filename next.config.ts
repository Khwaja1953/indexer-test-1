import type { NextConfig } from "next";
import { productProxies } from "./lib/product-proxies";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async rewrites() {
    return Object.entries(productProxies).map(([slug, destination]) => ({
      source: `/products/${slug}`,
      destination,
    }));
  },
};

export default nextConfig;
