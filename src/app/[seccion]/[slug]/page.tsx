import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { authors, getPost, getPosts, postUrl, related, type Post } from "@/lib/content";
import { sectionBySlug } from "@/lib/sections";
import { mirador, site } from "@/lib/site";
import { getMarkets } from "@/lib/data";
import { miradorCoin } from "@/lib/mirador";
import { dateTime } from "@/lib/format";
import { Cover } from "@/components/cover";
import { Story, StoryLine } from "@/components/story";
import { NewsletterBand, NewsletterForm } from "@/components/newsletter";
import { ReadingProgress, Share } from "@/components/share";
import { LiveChange, LivePrice } from "@/components/live";
import { AdSlot, Breadcrumbs, Disclaimer, JsonLd, SectionTitle } from "@/components/ui";

export const revalidate = 600;

// Solo se arman en el build las notas más nuevas; el resto se genera la primera vez que alguien
// la abre y queda en caché. Así cada deploy no guarda una copia de todas las notas.
const PRERENDER = 30;

export function generateStaticParams() {
  return getPosts().slice(0, PRERENDER).map((p) => ({ seccion: p.section, slug: p.slug }));
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

/** Corta el HTML después del párrafo n (para meter un anuncio o un "Leé también" sin romper el arranque). */
function splitAt(html: string, n: number): [string, string] {
  let idx = -1;
  for (let i = 0; i < n; i++) {
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
  const [top, rest] = splitAt(post.html, 2);
  const [middle, bottom] = splitAt(rest, 3);
  const coins = (await getMarkets()).filter((c) => post.coins.includes(c.id));
  const [readAlso, ...more] = related(post, 4);
  const latest = getPosts().filter((p) => p.slug !== post.slug).slice(0, 5);
  const shown = new Set([post.slug, readAlso?.slug, ...more.map((p) => p.slug)]);
  // Barra lateral: primero notas de la misma sección, y si no alcanzan, de las demás.
  const sameSection = [...getPosts(post.section), ...getPosts()].filter((p) => !shown.has(p.slug) && shown.add(p.slug)).slice(0, 3);

  return (
    <>
      <ReadingProgress />
      <div className="mx-auto max-w-3xl lg:grid lg:max-w-none lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
        <article className="min-w-0 lg:mx-auto lg:max-w-3xl">
          <Breadcrumbs items={[{ name: s.name, href: `/${s.slug}` }]} />
          {post.kicker && <p className="kicker">{post.kicker}</p>}
          <h1 className="headline mt-2 text-[2.1rem] sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-xl leading-relaxed text-muted">{post.description}</p>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-border py-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-serif text-sm font-bold text-white">EB</span>
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
            <div dangerouslySetInnerHTML={{ __html: middle }} />
            {readAlso && bottom && <ReadAlso post={readAlso} />}
            <div dangerouslySetInnerHTML={{ __html: bottom }} />
          </div>

          <AdSlot slot="nota-final" minHeight={250} />

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
          <SourcesAndCredits post={post} />
        </article>

        <aside className="hidden lg:block" aria-label="Más noticias">
          <div className="space-y-6">
            <div>
              <SectionTitle>Lo último</SectionTitle>
              {latest.map((p) => (
                <StoryLine key={p.slug} post={p} />
              ))}
            </div>
            <div className="sticky top-16">
              <AdSlot
                slot="nota-lateral"
                minHeight={600}
                className="!my-0"
                fallback={
                  <div>
                    <SectionTitle color={s.color}>Más para leer</SectionTitle>
                    <div className="space-y-5">
                      {sameSection.map((p) => (
                        <Story key={p.slug} post={p} showDescription={false} />
                      ))}
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </aside>
      </div>

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
          image: post.image ? [post.image, `${url}/opengraph-image`] : [`${url}/opengraph-image`],
          articleSection: s.name,
          keywords: post.tags.join(", "),
          inLanguage: "es",
          author: { "@type": "Organization", name: author.name, url: `${site.url}/sobre-nosotros` },
          publisher: { "@id": `${site.url}/#org` },
        }}
      />
    </>
  );
}

/** Recuadro "Leé también" dentro del texto: lleva al lector a otra nota nuestra (más páginas vistas). */
function ReadAlso({ post }: { post: Post }) {
  return (
    <Link href={postUrl(post)} className="read-also group my-8 flex items-center gap-4 border-y-2 border-fg py-4">
      <div className="w-28 shrink-0 sm:w-36">
        <Cover post={post} />
      </div>
      <div>
        <p className="kicker mb-1">Leé también</p>
        <p className="headline text-lg leading-snug group-hover:text-brand">{post.title}</p>
      </div>
    </Link>
  );
}

/** Fuentes y crédito de la foto: al pie de todo, fuera del cuerpo de la nota. */
function SourcesAndCredits({ post }: { post: Post }) {
  if (!post.sources.length && !post.imageCredit) return null;
  return (
    <div className="mt-6 border-t border-border pt-3 text-xs text-muted">
      {post.sources.length > 0 && (
        <p>
          <span className="font-semibold">Fuentes:</span>{" "}
          {post.sources.map((src, i) => (
            <span key={i}>
              {i > 0 && " · "}
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener nofollow" className="hover:underline">
                  {src.name}
                </a>
              ) : (
                src.name
              )}
            </span>
          ))}
        </p>
      )}
      {post.imageCredit && (
        <p className="mt-1">
          {post.imageCreditUrl ? (
            <a href={post.imageCreditUrl} target="_blank" rel="noopener nofollow" className="hover:underline">
              {post.imageCredit}
            </a>
          ) : (
            post.imageCredit
          )}
        </p>
      )}
    </div>
  );
}
