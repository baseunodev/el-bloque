// Secciones del diario. El orden es el de la barra de navegación y la portada.
export type SectionInfo = { slug: string; name: string; description: string; color: string; glyph: string };

export const sections: SectionInfo[] = [
  { slug: "mercado", name: "Mercado", description: "Qué pasa con bitcoin, ethereum y el resto de las criptomonedas, día a día.", color: "#f7931a", glyph: "₿" },
  { slug: "regulacion", name: "Regulación", description: "Leyes, impuestos y reglas que cambian las cripto en América Latina y el mundo.", color: "#2563eb", glyph: "§" },
  { slug: "latam", name: "América Latina", description: "Dólar cripto, remesas, adopción y empresas cripto de la región.", color: "#059669", glyph: "◎" },
  { slug: "seguridad", name: "Estafas y seguridad", description: "Fraudes, hackeos y cómo cuidar tu plata.", color: "#dc2626", glyph: "!" },
  { slug: "guias", name: "Guías", description: "Explicaciones simples para entender cripto desde cero.", color: "#7c3aed", glyph: "?" },
];

export const sectionBySlug = (slug: string) => sections.find((s) => s.slug === slug);
