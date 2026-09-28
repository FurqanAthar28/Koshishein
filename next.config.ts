import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product images served from Shopify's CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;
