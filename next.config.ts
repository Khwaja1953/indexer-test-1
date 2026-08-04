import type { NextConfig } from "next";
import { productRedirects } from "./lib/product-redirects";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async redirects() {
    return Object.entries(productRedirects).map(([slug, destination]) => ({
      source: `/products/${slug}`,
      destination,
      permanent: false,
    }));
  },
};

export default nextConfig;
