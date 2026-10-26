import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { adsenseClient, disclaimer, gaId, mirador, site } from "@/lib/site";
import { sections } from "@/lib/sections";
import { getMarkets } from "@/lib/data";
import { miradorHome } from "@/lib/mirador";
import { JsonLd } from "@/components/ui";
import { LiveProvider } from "@/components/live";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: { type: "website", siteName: site.name, locale: "es_419" },
  twitter: { card: "summary_large_image" },
  // max-image-preview:large es clave para aparecer en Google Discover
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1013" },
  ],
};

const STABLES = new Set(["usdt", "usdc", "dai", "usde", "usds", "fdusd", "usd1"]);

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const coins = (await getMarkets()).filter((c) => !STABLES.has(c.symbol.toLowerCase())).slice(0, 20);
  const today = new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "America/Argentina/Buenos_Aires" }).format(new Date()).replace(/^./, (c) => c.toUpperCase());
  return (
    <html lang="es">
      <body className="min-h-screen antialiased">
        <LiveProvider symbols={coins.map((c) => c.symbol)}>
          <header className="border-b border-border bg-surface">
            <div className="mx-auto max-w-6xl px-4">
              <div className="flex items-center justify-between gap-3 py-2 text-xs text-muted">
                <span>{today}</span>
                <a href={miradorHome} target="_blank" rel="noopener" className="font-semibold text-fg hover:text-brand">
                  📈 {mirador.name}: el mercado en vivo ↗
                </a>
              </div>
              <div className="flex flex-col items-center border-t border-border py-4 sm:py-6">
                <Link href="/" className="font-serif text-5xl font-black tracking-tight sm:text-7xl" aria-label={`${site.name}, portada`}>
                  El Bloque<span className="text-brand">.</span>
                </Link>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-muted">{site.tagline}</p>
              </div>
            </div>
            <nav aria-label="Secciones" className="sticky top-0 z-20 border-t-2 border-fg bg-surface/95 backdrop-blur">
              <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 text-sm font-bold">
                <Link href="/" className="whitespace-nowrap px-2.5 py-2.5 hover:text-brand">
                  Portada
                </Link>
                {sections.map((s) => (
                  <Link key={s.slug} href={`/${s.slug}`} className="whitespace-nowrap px-2.5 py-2.5 hover:text-brand">
                    {s.name}
                  </Link>
                ))}
                <Link href="/newsletter" className="ml-auto whitespace-nowrap rounded-sm bg-brand px-3 py-1.5 text-white hover:brightness-110">
                  ✉ Newsletter
                </Link>
              </div>
            </nav>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        </LiveProvider>

        <footer className="mt-16 bg-ink text-white/80">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm sm:grid-cols-4">
            <div className="sm:col-span-2">
              <p className="font-serif text-3xl font-black text-white">
                El Bloque<span className="text-brand">.</span>
              </p>
              <p className="mt-2 max-w-sm text-white/60">{site.tagline}. Noticias cripto con contexto, todos los días.</p>
              <a href={miradorHome} target="_blank" rel="noopener" className="mt-4 inline-block rounded-sm border border-white/20 px-3 py-2 font-semibold text-white hover:border-brand">
                Precios en vivo en {mirador.name} ↗
              </a>
            </div>
            <ul className="space-y-1.5">
              {sections.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/newsletter" className="hover:text-white">
                  Newsletter
                </Link>
              </li>
            </ul>
            <ul className="space-y-1.5">
              <li><Link href="/sobre-nosotros" className="hover:text-white">Sobre nosotros</Link></li>
              <li><Link href="/politica-editorial" className="hover:text-white">Política editorial y uso de IA</Link></li>
              <li><Link href="/como-nos-financiamos" className="hover:text-white">Cómo nos financiamos</Link></li>
              <li><Link href="/contacto" className="hover:text-white">Contacto</Link></li>
              <li><Link href="/privacidad" className="hover:text-white">Privacidad</Link></li>
              <li><Link href="/cookies" className="hover:text-white">Cookies</Link></li>
              <li><Link href="/aviso-legal" className="hover:text-white">Aviso legal</Link></li>
            </ul>
          </div>
          <p className="mx-auto max-w-6xl px-4 pb-8 text-xs text-white/50">{disclaimer}</p>
        </footer>

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "NewsMediaOrganization",
                "@id": `${site.url}/#org`,
                name: site.name,
                url: site.url,
                logo: `${site.url}/icon.svg`,
                sameAs: Object.values(site.social),
                publishingPrinciples: `${site.url}/politica-editorial`,
                correctionsPolicy: `${site.url}/politica-editorial#correcciones`,
                ownershipFundingInfo: `${site.url}/como-nos-financiamos`,
              },
              { "@type": "WebSite", "@id": `${site.url}/#web`, name: site.name, url: site.url, inLanguage: "es", publisher: { "@id": `${site.url}/#org` } },
            ],
          }}
        />

        {adsenseClient && (
          <Script
            id="adsense"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          />
        )}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
