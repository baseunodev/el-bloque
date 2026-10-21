// Tarjeta que lleva al Mirador Cripto (sitio externo) con los precios principales en vivo.
import type { Coin } from "@/lib/data";
import { miradorCoin, miradorHome, miradorPath } from "@/lib/mirador";
import { mirador } from "@/lib/site";
import { price } from "@/lib/format";
import { LiveChange, LiveDot, LivePrice } from "./live";

export function MiradorPromo({ coins, usdtArs }: { coins: Coin[]; usdtArs?: number }) {
  const top = ["bitcoin", "ethereum", "solana", "ripple"].map((id) => coins.find((c) => c.id === id)).filter(Boolean) as Coin[];
  return (
    <aside className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em]">
          <LiveDot /> Mercado ahora
        </p>
        <a href={miradorHome} target="_blank" rel="noopener" className="text-xs font-semibold text-brand hover:underline">
          {mirador.name} ↗
        </a>
      </div>
      <ul className="mt-3 divide-y divide-border">
        {top.map((c) => (
          <li key={c.id}>
            <a href={miradorCoin(c.id)} target="_blank" rel="noopener" className="flex items-center gap-2 py-2 text-sm hover:text-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt="" width={20} height={20} className="h-5 w-5 rounded-full" />
              <span className="flex-1 font-semibold">{c.name}</span>
              <LivePrice symbol={c.symbol} initial={c.current_price} />
              <LiveChange symbol={c.symbol} initial={c.price_change_percentage_24h} className="w-14 text-right text-xs" />
            </a>
          </li>
        ))}
        {usdtArs != null && (
          <li>
            <a href={miradorPath("/dolar-cripto/argentina")} target="_blank" rel="noopener" className="flex items-center gap-2 py-2 text-sm hover:text-brand">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-up/15 text-[10px] font-bold text-up">$</span>
              <span className="flex-1 font-semibold">Dólar cripto 🇦🇷</span>
              <span className="tabular-nums">{price(usdtArs, "$ ")}</span>
            </a>
          </li>
        )}
      </ul>
      <a
        href={miradorHome}
        target="_blank"
        rel="noopener"
        className="mt-3 block rounded-md bg-ink px-3 py-2.5 text-center text-sm font-bold text-white transition hover:bg-brand"
      >
        Ver gráficos y mapa de calor en vivo ↗
      </a>
    </aside>
  );
}
