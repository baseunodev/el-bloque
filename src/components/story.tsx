import Link from "next/link";
import { postUrl, type Post } from "@/lib/content";
import { sectionBySlug } from "@/lib/sections";
import { Cover } from "./cover";
import { ago } from "@/lib/format";

function Meta({ post, section = true }: { post: Post; section?: boolean }) {
  const s = sectionBySlug(post.section)!;
  return (
    <p className="mt-2 flex flex-wrap items-center gap-x-2 text-xs text-muted">
      {section && <span className="font-semibold" style={{ color: s.color }}>{s.name}</span>}
      <time dateTime={post.date}>{ago(post.date)}</time>
      <span>· {post.minutes} min de lectura</span>
    </p>
  );
}

const Kicker = ({ post }: { post: Post }) => (post.kicker ? <p className="kicker mb-1">{post.kicker}</p> : null);

/** Nota principal de la portada. */
export function LeadStory({ post }: { post: Post }) {
  return (
    <article>
      <Link href={postUrl(post)} className="group block">
        <Cover post={post} big className="transition group-hover:brightness-110" />
        <div className="mt-4">
          <Kicker post={post} />
          <h2 className="headline text-3xl sm:text-[2.6rem]">{post.title}</h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">{post.description}</p>
          <Meta post={post} />
        </div>
      </Link>
    </article>
  );
}

/** Nota con imagen y bajada. */
export function Story({ post, showDescription = true }: { post: Post; showDescription?: boolean }) {
  return (
    <article>
      <Link href={postUrl(post)} className="group block">
        <Cover post={post} className="transition group-hover:brightness-110" />
        <div className="mt-3">
          <Kicker post={post} />
          <h3 className="headline text-xl">{post.title}</h3>
          {showDescription && <p className="mt-1.5 line-clamp-3 text-sm text-muted">{post.description}</p>}
          <Meta post={post} />
        </div>
      </Link>
    </article>
  );
}

/** Nota solo con titular (columna lateral, listas). */
export function StoryLine({ post, n }: { post: Post; n?: number }) {
  return (
    <article className="flex gap-3 border-b border-border py-3 first:pt-0 last:border-0 last:pb-0">
      {n != null && <span className="font-serif text-3xl font-bold leading-none text-brand/70">{n}</span>}
      <Link href={postUrl(post)} className="group block">
        <Kicker post={post} />
        <h3 className="headline text-[1.05rem]">{post.title}</h3>
        <Meta post={post} />
      </Link>
    </article>
  );
}
