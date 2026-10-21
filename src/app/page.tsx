import Link from "next/link";
import { getMarkets, getUsdtQuote } from "@/lib/data";
import { getPosts, postUrl } from "@/lib/content";
import { sections } from "@/lib/sections";
import { LeadStory, Story, StoryLine } from "@/components/story";
import { MiradorPromo } from "@/components/mirador-promo";
import { NewsletterBand } from "@/components/newsletter";
import { AdSlot, SectionTitle } from "@/components/ui";

export const revalidate = 600;

export default async function Portada() {
  const [coins, usdt] = await Promise.all([getMarkets(), getUsdtQuote("ars")]);
  const posts = getPosts();
  const featured = posts.filter((p) => p.featured);
  const lead = featured[0] ?? posts[0];
  const rest = posts.filter((p) => p.slug !== lead?.slug);
  const second = rest.slice(0, 3);
  const latest = posts.slice(0, 6);
  const breaking = posts.find((p) => p.kicker === "ÚLTIMO MOMENTO");

  if (!lead) return <p className="py-20 text-center text-muted">Pronto, las primeras noticias.</p>;

  return (
    <>
      <h1 className="sr-only">El Bloque: noticias cripto de hoy</h1>

      {breaking && (
        <Link href={postUrl(breaking)} className="group mb-6 flex items-center gap-3 overflow-hidden rounded-sm border border-brand/30 bg-brand-soft px-3 py-2 text-sm">
          <span className="flex shrink-0 items-center gap-1.5 rounded-sm bg-brand px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-white">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-white" /> Último momento
          </span>
          <span className="truncate font-semibold group-hover:text-brand">{breaking.title}</span>
        </Link>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LeadStory post={lead} />
        </div>
        <div className="space-y-6">
          <div>
            <SectionTitle>Lo último</SectionTitle>
            <div>
              {latest.map((p) => (
                <StoryLine key={p.slug} post={p} />
              ))}
            </div>
          </div>
          <MiradorPromo coins={coins} usdtArs={usdt?.buy} />
          <AdSlot slot="portada-lateral" minHeight={250} className="!my-0" />
        </div>
      </div>

      <AdSlot slot="portada-top" minHeight={90} />

      {second.length > 0 && (
        <div className="mt-10 grid gap-8 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {second.map((p) => (
            <Story key={p.slug} post={p} />
          ))}
        </div>
      )}

      <NewsletterBand source="portada" />

      <AdSlot slot="portada-medio" minHeight={120} />

      <div className="grid gap-10 lg:grid-cols-2">
        {sections.map((s) => {
          const list = getPosts(s.slug);
          if (!list.length) return null;
          return (
            <section key={s.slug}>
              <SectionTitle href={`/${s.slug}`} color={s.color}>
                {s.name}
              </SectionTitle>
              <div className="grid gap-5 sm:grid-cols-2">
                <Story post={list[0]} showDescription={false} />
                <div>
                  {list.slice(1, 4).map((p) => (
                    <StoryLine key={p.slug} post={p} />
                  ))}
                  {list.length === 1 && <p className="text-sm text-muted">{s.description}</p>}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <AdSlot slot="portada-pie" />
    </>
  );
}
