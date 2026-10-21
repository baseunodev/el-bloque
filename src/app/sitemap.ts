import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { getPosts, postUrl } from "@/lib/content";
import { sections } from "@/lib/sections";
import { site } from "@/lib/site";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (p: string) => `${site.url}${p}`;
  const pages = fs
    .readdirSync(path.join(process.cwd(), "content", "paginas"))
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
  return [
    { url: u("/"), lastModified: now, changeFrequency: "hourly", priority: 1 },
    { url: u("/newsletter"), changeFrequency: "monthly", priority: 0.7 },
    ...sections.map((s) => ({ url: u(`/${s.slug}`), lastModified: now, changeFrequency: "hourly" as const, priority: 0.8 })),
    ...getPosts().map((p) => ({ url: u(postUrl(p)), lastModified: new Date(p.updated ?? p.date), priority: 0.7 })),
    ...pages.map((p) => ({ url: u(`/${p}`), changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
