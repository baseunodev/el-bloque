"use client";
import { useEffect, useRef } from "react";

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Espacio de anuncio con alto reservado (evita saltos de diseño / CLS).
 * Sin NEXT_PUBLIC_ADSENSE_CLIENT muestra un recuadro "Publicidad" vacío para ver dónde van los anuncios;
 * cuando AdSense apruebe el sitio, alcanza con cargar la variable (y el ID de cada bloque en NEXT_PUBLIC_ADSENSE_SLOTS).
 */
export function AdSlot({ slot, minHeight = 250, className = "" }: { slot: string; minHeight?: number; className?: string }) {
  const pushed = useRef(false);
  const id = adSlotId(slot);
  useEffect(() => {
    if (!client || !id || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense todavía no cargó o el bloqueador de anuncios lo impidió
    }
  }, [id]);

  return (
    <div className={`my-8 ${className}`} aria-label="Publicidad">
      <p className="mb-1 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Publicidad</p>
      {client && id ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block", minHeight }}
          data-ad-client={client}
          data-ad-slot={id}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="rounded-md border border-dashed border-border bg-surface-2/60" style={{ minHeight }} data-ad-placeholder={slot} />
      )}
    </div>
  );
}

// NEXT_PUBLIC_ADSENSE_SLOTS: "portada-medio=1234567890,nota-medio=2345678901". "default=…" sirve para todos los que falten.
const slots = Object.fromEntries(
  (process.env.NEXT_PUBLIC_ADSENSE_SLOTS ?? "")
    .split(",")
    .map((x) => x.split("=").map((s) => s.trim()))
    .filter((x) => x.length === 2 && x[0] && x[1]),
);

function adSlotId(slot: string): string | undefined {
  return slots[slot] ?? slots[slot.replace(/-.*$/, "")] ?? slots.default;
}
