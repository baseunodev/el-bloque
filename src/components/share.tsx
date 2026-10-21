"use client";
import { useEffect, useState } from "react";

/** Botones para compartir la nota. WhatsApp primero: es por donde más circulan las noticias en la región. */
export function Share({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { name: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, bg: "#25d366" },
    { name: "X", href: `https://x.com/intent/post?text=${t}&url=${u}`, bg: "#0d0d0f" },
    { name: "Telegram", href: `https://t.me/share/url?url=${u}&text=${t}`, bg: "#229ed9" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((l) => (
        <a key={l.name} href={l.href} target="_blank" rel="noopener" className="rounded-sm px-3 py-1.5 text-xs font-bold text-white transition hover:brightness-110" style={{ background: l.bg }}>
          {l.name}
        </a>
      ))}
      <button
        onClick={() => navigator.clipboard?.writeText(url).then(() => setCopied(true))}
        className="rounded-sm border border-border px-3 py-1.5 text-xs font-bold transition hover:border-brand hover:text-brand"
      >
        {copied ? "¡Copiado!" : "Copiar link"}
      </button>
    </div>
  );
}

/** Barra fina arriba que muestra cuánto falta para terminar la nota. */
export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div aria-hidden className="fixed left-0 top-0 z-50 h-1 bg-brand transition-[width] duration-100" style={{ width: `${p * 100}%` }} />;
}
