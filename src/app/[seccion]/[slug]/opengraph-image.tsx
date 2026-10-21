import { ImageResponse } from "next/og";
import { getPost, getPosts } from "@/lib/content";
import { sectionBySlug } from "@/lib/sections";

// Imagen de 1200 px por nota: la usan redes sociales, WhatsApp y Google Discover.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "El Bloque";

export function generateStaticParams() {
  return getPosts().map((p) => ({ seccion: p.section, slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  const s = sectionBySlug(p?.section ?? "") ?? { name: "", color: "#e11d48" };
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: `linear-gradient(135deg, #0d0d0f 40%, ${s.color})`, color: "#fff", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 44, fontWeight: 900, display: "flex" }}>
            El Bloque<span style={{ color: "#e11d48" }}>.</span>
          </div>
          <div style={{ fontSize: 22, padding: "6px 14px", background: s.color, borderRadius: 4, textTransform: "uppercase", letterSpacing: 3, display: "flex" }}>{p?.kicker ?? s.name}</div>
        </div>
        <div style={{ fontSize: p && p.title.length > 80 ? 54 : 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 1050, display: "flex" }}>{p?.title ?? "El diario cripto de América Latina"}</div>
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", display: "flex" }}>El diario cripto de América Latina</div>
      </div>
    ),
    size,
  );
}
