import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { authors, getPost, getPosts, postUrl, related } from "@/lib/content";
import { sectionBySlug } from "@/lib/sections";
import { mirador, site } from "@/lib/site";
import { getMarkets } from "@/lib/data";
import { miradorCoin } from "@/lib/mirador";
import { dateTime } from "@/lib/format";
import { Cover } from "@/components/cover";
import { Story } from "@/components/story";
import { NewsletterBand, NewsletterForm } from "@/components/newsletter";
import { ReadingProgress, Share } from "@/components/share";
import { LiveChange, LivePrice } from "@/components/live";
import { AdSlot, Breadcrumbs, Disclaimer, JsonLd } from "@/components/ui";

export const revalidate = 600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ seccion: p.section, slug: p.slug }));
}

type Props = { params: Promise<{ seccion: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const url = postUrl(p);
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: url },
    openGraph: { type: "article", title: p.title, description: p.description, url, publishedTime: p.date, modifiedTime: p.updated ?? p.date, section: sectionBySlug(p.section)?.name },
  };
}

/** Parte el cuerpo después del segundo párrafo para meter un anuncio sin cortar el arranque de la nota. */
function splitBody(html: string): [string, string] {
  let idx = -1;
  for (let i = 0; i < 2; i++) {
    idx = html.indexOf("</p>", idx + 1);
    if (idx < 0) return [html, ""];
  }
  return [html.slice(0, idx + 4), html.slice(idx + 4)];
}

export default async function Nota({ params }: Props) {
  const { seccion, slug } = await params;
  const post = getPost(slug);
  if (!post || post.section !== seccion) notFound();
  const s = sectionBySlug(post.section)!;
  const author = authors[post.author] ?? authors.redaccion;
  const url = `${site.url}${postUrl(post)}`;
  const [top, bottom] = splitBody(post.html);
  const coins = (await getMarkets()).filter((c) => post.coins.includes(c.id));
  const more = related(post, 3);

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: s.name, href: `/${s.slug}` }]} />
        {post.kicker && <p className="kicker">{post.kicker}</p>}
        <h1 className="headline mt-2 text-[2.1rem] sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-xl leading-relaxed text-muted">{post.description}</p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-border py-3">
          <div className="flex items-center gap-3 text-sm">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-serif text-lg font-bold text-white">{author.name[0]}</span>
            <div>
              <p className="font-bold">{author.name}</p>
              <p className="text-xs text-muted">
                <time dateTime={post.date}>{dateTime(post.date)}</time>
                {post.updated && <> · Actualizado {dateTime(post.updated)}</>} · {post.minutes} min de lectura
              </p>
            </div>
          </div>
          <Share url={url} title={post.title} />
        </div>

        <Cover post={post} big className="mt-6" />

        {coins.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {coins.map((c) => (
              <a key={c.id} href={miradorCoin(c.id)} target="_blank" rel="noopener" className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm hover:border-brand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt="" width={18} height={18} className="h-[18px] w-[18px] rounded-full" />
                <span className="font-bold uppercase">{c.symbol}</span>
                <LivePrice symbol={c.symbol} initial={c.current_price} />
                <LiveChange symbol={c.symbol} initial={c.price_change_percentage_24h} className="text-xs" />
              </a>
            ))}
          </div>
        )}

        <div className="prose-nota mt-8">
          <div dangerouslySetInnerHTML={{ __html: top }} />
          <AdSlot slot="nota-medio" minHeight={250} />
          <div dangerouslySetInnerHTML={{ __html: bottom }} />
        </div>

        <div className="mt-10 rounded-lg border-2 border-fg p-5">
          <p className="headline text-2xl">¿Te sirvió? Recibí lo más importante cada mañana.</p>
          <p className="mb-4 mt-1 text-sm text-muted">El resumen cripto del día en 5 minutos, gratis.</p>
          <NewsletterForm source={`nota-${post.slug}`} />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-bold">Compartí esta nota</p>
          <Share url={url} title={post.title} />
        </div>

        <p className="mt-6 rounded-md bg-surface-2 p-4 text-sm">
          📈 ¿Querés ver los precios en vivo, el mapa de calor y el dólar cripto?{" "}
          <a href={miradorCoin(post.coins[0] ?? "bitcoin")} target="_blank" rel="noopener" className="font-bold text-brand hover:underline">
            Abrí el {mirador.name} ↗
          </a>
        </p>
        <Disclaimer />
      </article>

      {more.length > 0 && (
        <section className="mt-12 border-t-2 border-fg pt-4">
          <h2 className="mb-5 text-sm font-extrabold uppercase tracking-[0.14em]">Seguí leyendo</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {more.map((p) => (
              <Story key={p.slug} post={p} showDescription={false} />
            ))}
          </div>
        </section>
      )}

      <AdSlot slot="nota-pie" />
      <NewsletterBand source={`nota-pie-${post.slug}`} />
      <p className="text-center text-sm">
        <Link href={`/${s.slug}`} className="font-bold text-brand hover:underline">
          Más noticias de {s.name} →
        </Link>
      </p>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          mainEntityOfPage: url,
          image: [`${url}/opengraph-image`],
          articleSection: s.name,
          keywords: post.tags.join(", "),
          inLanguage: "es",
          author: { "@type": "Person", name: author.name, url: `${site.url}/sobre-nosotros` },
          publisher: { "@id": `${site.url}/#org` },
        }}
      />
    </>
  );
}
