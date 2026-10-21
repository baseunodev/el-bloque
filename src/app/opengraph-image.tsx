import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg, #0d0d0f 55%, #e11d48)", color: "#fff" }}>
        <div style={{ fontSize: 96, fontWeight: 900, display: "flex" }}>El Bloque<span style={{ color: "#e11d48" }}>.</span></div>
        <div style={{ fontSize: 56, fontWeight: 700, marginTop: 20, lineHeight: 1.1 }}>{site.tagline}</div>
        <div style={{ fontSize: 32, marginTop: 30, color: "#97a0b0" }}>Noticias · Newsletter diario · Mercado en vivo</div>
      </div>
    ),
    size,
  );
}
