// Configuración central del diario. Cambiar marca o dominio acá y se propaga a todo.
export const site = {
  name: "El Bloque",
  tagline: "El diario cripto de América Latina",
  description:
    "Noticias de bitcoin, criptomonedas, stablecoins y regulación contadas en español y con contexto latinoamericano. Todas las mañanas, el resumen en tu correo.",
  // En Vercel se usa el dominio de producción automáticamente si no se cargó NEXT_PUBLIC_SITE_URL.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
  ).replace(/\/$/, ""),
  locale: "es",
  numberLocale: "es-AR",
  social: {
    x: "https://x.com/elbloquediario",
    instagram: "https://instagram.com/elbloquediario",
    telegram: "https://t.me/elbloquediario",
  },
  contactEmail: "redaccion@elbloque.news",
};

// El mirador de mercado es un sitio aparte: el diario lo enlaza para precios y datos en vivo.
export const mirador = {
  name: "Mirador Cripto",
  url: (process.env.NEXT_PUBLIC_MIRADOR_URL || "https://mirador-cripto.vercel.app").replace(/\/$/, ""),
};

export const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT; // ca-pub-XXXXXXXXXXXXXXXX
export const gaId = process.env.NEXT_PUBLIC_GA_ID; // G-XXXXXXX

export const disclaimer =
  "Contenido periodístico e informativo. No constituye asesoramiento financiero ni recomendación de inversión. Las criptomonedas son activos de alto riesgo.";
