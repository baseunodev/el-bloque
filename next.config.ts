import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fotos de las notas: Unsplash (licencia libre, con crédito al pie).
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] },
};

export default nextConfig;
