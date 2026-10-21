// Una sola ruta dinámica de primer nivel: sirve las secciones del diario y las páginas institucionales.
import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getPosts } from "@/lib/content";
import { sectionBySlug, sections } from "@/lib/sections";
import { site } from "@/lib/site";
import { LeadStory, Story } from "@/components/story";
import { NewsletterBand } from "@/components/newsletter";
import { AdSlot, Breadcrumbs } from "@/components/ui";

export const revalidate = 600;
export const dynamicParams = false;

const pagesDir = path.join(process.cwd(), "content", "paginas");
const pageSlugs = () => fs.readdirSync(pagesDir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));

function loadPage(slug: string) {
  const file = path.join(pagesDir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const md = fs.readFileSync(file, "utf8").replaceAll("{{site}}", site.name).replaceAll("{{email}}", site.contactEmail);
  const title = md.match(/^#\s+(.+)$/m)?.[1] ?? slug;
  return { title, html: marked.parse(md, { async: false }) as string };
}

export function generateStaticParams() {
  return [...sections.map((s) => ({ seccion: s.slug })), ...pageSlugs().map((p) => ({ seccion: p }))];
}

type Props = { params: Promise<{ seccion: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seccion } = await params;
  const s = sectionBySlug(seccion);
  if (s) return { title: `${s.name}: últimas noticias`, description: s.description, alternates: { canonical: `/${s.slug}` } };
  const page = loadPage(seccion);
  return page ? { title: page.title, alternates: { canonical: `/${seccion}` } } : {};
}

export default async function SeccionOPagina({ params }: Props) {
  const { seccion } = await params;
  const s = sectionBySlug(seccion);
  if (!s) {
    const page = loadPage(seccion);
    if (!page) notFound();
    return <article className="prose-plain mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: page.html }} />;
  }
  const posts = getPosts(s.slug);
  return (
    <>
      <Breadcrumbs items={[{ name: s.name, href: `/${s.slug}` }]} />
      <header className="mb-8 border-b-2 border-fg pb-4">
        <h1 className="headline flex items-center gap-3 text-4xl sm:text-5xl">
          <span className="h-5 w-5 rounded-sm" style={{ background: s.color }} />
          {s.name}
        </h1>
        <p className="mt-2 text-lg text-muted">{s.description}</p>
      </header>
      {posts.length ? (
        <>
          <div className="max-w-4xl">
            <LeadStory post={posts[0]} />
          </div>
          <div className="mt-10 grid gap-8 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(1).map((p) => (
              <Story key={p.slug} post={p} />
            ))}
          </div>
        </>
      ) : (
        <p className="py-10 text-muted">Pronto, las primeras notas de esta sección.</p>
      )}
      <AdSlot slot={`seccion-${s.slug}`} />
      <NewsletterBand source={`seccion-${s.slug}`} />
    </>
  );
}
