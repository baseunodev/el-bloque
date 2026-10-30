import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fotos de las notas: Unsplash (licencia libre, con crédito al pie).
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] },
  // Las notas viejas y las imágenes para redes se generan a pedido: la función necesita los .md.
  outputFileTracingIncludes: { "/[seccion]/[slug]": ["./content/**/*"], "/[seccion]/[slug]/opengraph-image": ["./content/**/*"] },
};

export default nextConfig;
