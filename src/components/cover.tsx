// Portada visual de cada nota. Si la nota no trae foto, se dibuja una placa con el color y el símbolo de la sección.
import Image from "next/image";
import type { Post } from "@/lib/content";
import { sectionBySlug } from "@/lib/sections";

export function Cover({ post, className = "", big = false }: { post: Post; className?: string; big?: boolean }) {
  const s = sectionBySlug(post.section)!;
  if (post.image) {
    return (
      <div className={`relative aspect-[16/9] w-full overflow-hidden rounded-md bg-surface-2 ${className}`}>
        <Image
          src={post.image}
          alt={post.imageAlt ?? ""}
          fill
          sizes={big ? "(min-width: 1024px) 800px, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover"
          priority={big}
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className={`relative aspect-[16/9] w-full overflow-hidden rounded-md ${className}`}
      style={{ background: `radial-gradient(120% 120% at 85% 10%, ${s.color}ee, ${s.color}99 35%, #0d0d0f 100%)` }}
    >
      <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: big ? "36px 36px" : "22px 22px" }} />
      <span className={`absolute -bottom-[12%] right-[4%] font-serif font-bold leading-none text-white/25 ${big ? "text-[11rem] sm:text-[15rem]" : "text-[6.5rem]"}`}>{s.glyph}</span>
      <span className={`absolute left-3 top-3 rounded-sm bg-black/40 px-2 py-0.5 font-bold uppercase tracking-widest text-white backdrop-blur ${big ? "text-xs" : "text-[10px]"}`}>{s.name}</span>
    </div>
  );
}
