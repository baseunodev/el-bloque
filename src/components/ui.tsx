import Link from "next/link";
import { disclaimer, site } from "@/lib/site";

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  const all = [{ name: "Portada", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Migas de pan" className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
        {all.map((it, i) => (
          <span key={it.href}>
            {i > 0 && <span className="mx-1.5">›</span>}
            {i < all.length - 1 ? (
              <Link href={it.href} className="hover:text-brand">
                {it.name}
              </Link>
            ) : (
              <span aria-current="page">{it.name}</span>
            )}
          </span>
        ))}
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: site.url + it.href })),
        }}
      />
    </>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export { AdSlot } from "./ad-slot";

export function Disclaimer() {
  return <p className="mt-8 border-l-4 border-border pl-3 text-xs text-muted">{disclaimer}</p>;
}

/** Título de bloque estilo diario: texto en mayúsculas con filete arriba. */
export function SectionTitle({ children, href, color }: { children: React.ReactNode; href?: string; color?: string }) {
  const inner = (
    <span className="inline-flex items-center gap-2">
      {color && <span className="h-3 w-3 rounded-sm" style={{ background: color }} />}
      {children}
    </span>
  );
  return (
    <div className="mb-4 flex items-baseline justify-between border-t-2 border-fg pt-2">
      <h2 className="text-sm font-extrabold uppercase tracking-[0.14em]">{href ? <Link href={href} className="hover:text-brand">{inner}</Link> : inner}</h2>
      {href && (
        <Link href={href} className="text-xs font-semibold text-muted hover:text-brand">
          Ver todo →
        </Link>
      )}
    </div>
  );
}
