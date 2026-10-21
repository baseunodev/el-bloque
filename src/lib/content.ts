// Notas del diario en Markdown dentro de /content/notas. Para publicar: crear un .md con frontmatter y hacer push.
import "server-only";
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { sectionBySlug } from "./sections";
import { mirador } from "./site";

export type Post = {
  slug: string;
  section: string;
  title: string;
  description: string; // bajada
  kicker?: string; // volanta: "URGENTE", "ANÁLISIS"…
  date: string; // ISO
  updated?: string;
  author: string;
  coins: string[]; // ids de CoinGecko relacionados (para enlazar al mirador)
  tags: string[];
  featured: boolean;
  image?: string;
  imageAlt?: string;
  imageCredit?: string; // "Foto: Nombre / Unsplash"
  imageCreditUrl?: string;
  minutes: number;
  html: string;
};

const dir = path.join(process.cwd(), "content", "notas");

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return { data, body: m[2] };
}

const list = (s?: string) => (s ? s.split(",").map((x) => x.trim()).filter(Boolean) : []);

function load(file: string): Post {
  const { data, body } = parseFrontmatter(fs.readFileSync(path.join(dir, file), "utf8"));
  const section = sectionBySlug(data.section ?? "") ? data.section : "mercado";
  return {
    slug: file.replace(/\.md$/, ""),
    section,
    title: data.title ?? file,
    description: data.description ?? "",
    kicker: data.kicker,
    date: data.date ?? new Date(0).toISOString(),
    updated: data.updated,
    author: data.author ?? "redaccion",
    coins: list(data.coins),
    tags: list(data.tags),
    featured: data.featured === "true",
    image: data.image,
    imageAlt: data.imageAlt,
    imageCredit: data.imageCredit,
    imageCreditUrl: data.imageCreditUrl,
    minutes: Math.max(1, Math.round(body.split(/\s+/).length / 220)),
    // {{mirador}} en el texto apunta al sitio de precios, así cambiar su dominio no obliga a editar notas.
    html: marked.parse(body.replaceAll("{{mirador}}", mirador.url), { async: false }) as string,
  };
}

let cache: Post[] | null = null;

export function getPosts(section?: string): Post[] {
  if (!cache) {
    cache = fs.existsSync(dir)
      ? fs
          .readdirSync(dir)
          .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
          .map(load)
          .sort((a, b) => b.date.localeCompare(a.date))
      : [];
  }
  return section ? cache.filter((p) => p.section === section) : cache;
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export const postUrl = (p: Pick<Post, "section" | "slug">) => `/${p.section}/${p.slug}`;

export function related(post: Post, limit = 4): Post[] {
  const score = (p: Post) =>
    (p.section === post.section ? 2 : 0) + p.coins.filter((c) => post.coins.includes(c)).length + p.tags.filter((t) => post.tags.includes(t)).length;
  return getPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s || b.p.date.localeCompare(a.p.date))
    .slice(0, limit)
    .map((x) => x.p);
}

export const authors: Record<string, { name: string; role: string; bio: string }> = {
  redaccion: {
    name: "Redacción El Bloque",
    role: "Redacción",
    bio: "Equipo de redacción de El Bloque. Sigue el mercado cripto y su impacto en la economía de América Latina.",
  },
};
