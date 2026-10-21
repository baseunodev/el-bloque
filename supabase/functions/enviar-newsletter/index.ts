// Arma y manda el newsletter diario de El Bloque.
// Lo dispara pg_cron todas las mañanas. Con ?preview=1 devuelve el HTML sin mandar nada.
// Secretos: RESEND_API_KEY (para mandar), SITE_URL, MIRADOR_URL, FROM_EMAIL. SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY los pone Supabase.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const SITE = (Deno.env.get("SITE_URL") ?? "https://el-bloque-theta.vercel.app").replace(/\/$/, "");
const MIRADOR = (Deno.env.get("MIRADOR_URL") ?? "https://mirador-cripto.vercel.app").replace(/\/$/, "");
const FROM = Deno.env.get("FROM_EMAIL") ?? "El Bloque <onboarding@resend.dev>";
const RESEND = Deno.env.get("RESEND_API_KEY");

type Item = { title: string; link: string; description: string; date: Date };

const decode = (s: string) =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function getItems(): Promise<Item[]> {
  const xml = await (await fetch(`${SITE}/feed.xml`)).text();
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, it]) => {
    const tag = (t: string) => decode(it.match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`))?.[1] ?? "").trim();
    return { title: tag("title"), link: tag("link"), description: tag("description"), date: new Date(tag("pubDate")) };
  });
}

async function getMarket() {
  try {
    const [p, f] = await Promise.all([
      fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true").then((r) => r.json()),
      fetch("https://api.alternative.me/fng/?limit=1").then((r) => r.json()),
    ]);
    return { p, fng: f?.data?.[0] };
  } catch {
    return null;
  }
}

const nf = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });
const pct = (n: number) => `${n > 0 ? "▲" : n < 0 ? "▼" : ""} ${Math.abs(n).toFixed(1).replace(".", ",")}%`;
const utm = (u: string, c: string) => `${u}${u.includes("?") ? "&" : "?"}utm_source=newsletter&utm_medium=email&utm_campaign=${c}`;

function render(items: Item[], market: Awaited<ReturnType<typeof getMarket>>, fecha: string, campaign: string) {
  const [lead, ...rest] = items;
  const coin = (id: string, name: string) => {
    const c = market?.p?.[id];
    if (!c) return "";
    const ch = c.usd_24h_change ?? 0;
    return `<td style="padding:10px;text-align:center;border:1px solid #e2ddd2"><div style="font-size:12px;color:#5d6066">${name}</div><div style="font-size:17px;font-weight:700">US$ ${nf.format(c.usd)}</div><div style="font-size:12px;color:${ch >= 0 ? "#059669" : "#dc2626"}">${pct(ch)}</div></td>`;
  };
  const story = (i: Item) =>
    `<tr><td style="padding:14px 0;border-bottom:1px solid #e2ddd2"><a href="${esc(utm(i.link, campaign))}" style="color:#141414;text-decoration:none;font-family:Georgia,serif;font-size:19px;font-weight:700;line-height:1.25">${esc(i.title)}</a><div style="margin-top:6px;color:#5d6066;font-size:14px;line-height:1.5">${esc(i.description)}</div></td></tr>`;
  return `<!doctype html><html><body style="margin:0;background:#f7f5f0;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#141414">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f0"><tr><td align="center" style="padding:24px 12px">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border:1px solid #e2ddd2">
<tr><td style="padding:24px 28px 8px;text-align:center;border-bottom:3px double #141414">
<div style="font-family:Georgia,serif;font-size:40px;font-weight:900">El Bloque<span style="color:#e11d48">.</span></div>
<div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#5d6066;margin:4px 0 10px">El resumen cripto · ${esc(fecha)}</div></td></tr>
<tr><td style="padding:20px 28px 0"><div style="font-size:15px;line-height:1.6">Buen día 👋 Esto es lo que tenés que saber hoy, en 5 minutos.</div></td></tr>
${market ? `<tr><td style="padding:16px 28px 0"><table width="100%" cellpadding="0" cellspacing="0"><tr>${coin("bitcoin", "Bitcoin")}${coin("ethereum", "Ethereum")}${coin("solana", "Solana")}</tr></table>
${market.fng ? `<div style="font-size:13px;color:#5d6066;margin-top:8px">Índice de miedo y codicia: <b>${esc(market.fng.value)}</b>. <a href="${utm(`${MIRADOR}/indice-miedo-codicia`, campaign)}" style="color:#e11d48">Ver más en el Mirador Cripto →</a></div>` : ""}</td></tr>` : ""}
${lead ? `<tr><td style="padding:24px 28px 0"><div style="font-size:11px;font-weight:800;letter-spacing:2px;color:#e11d48">LA NOTICIA DEL DÍA</div>
<a href="${esc(utm(lead.link, campaign))}" style="display:block;margin-top:6px;color:#141414;text-decoration:none;font-family:Georgia,serif;font-size:26px;font-weight:700;line-height:1.15">${esc(lead.title)}</a>
<div style="margin-top:8px;color:#5d6066;font-size:15px;line-height:1.55">${esc(lead.description)}</div>
<a href="${esc(utm(lead.link, campaign))}" style="display:inline-block;margin-top:12px;background:#e11d48;color:#fff;text-decoration:none;font-weight:700;padding:10px 16px;border-radius:4px;font-size:14px">Leer la nota completa</a></td></tr>` : ""}
${rest.length ? `<tr><td style="padding:24px 28px 0"><div style="font-size:11px;font-weight:800;letter-spacing:2px;border-top:2px solid #141414;padding-top:8px">TAMBIÉN PASÓ</div><table width="100%" cellpadding="0" cellspacing="0">${rest.map(story).join("")}</table></td></tr>` : ""}
<tr><td style="padding:24px 28px"><table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0f;border-radius:6px"><tr><td style="padding:18px;color:#fff;font-size:14px">📈 Precios en vivo, mapa de calor y dólar cripto: <a href="${utm(MIRADOR, campaign)}" style="color:#fb7185;font-weight:700">abrí el Mirador Cripto</a></td></tr></table></td></tr>
<tr><td style="padding:0 28px 24px;font-size:12px;color:#5d6066;line-height:1.5">¿Te sirvió? Reenviáselo a alguien que le pueda interesar. Contenido informativo: no es asesoramiento financiero.<br><br>Recibís este correo porque te suscribiste en ${esc(SITE.replace(/^https?:\/\//, ""))}. <a href="{{baja}}" style="color:#5d6066">Darme de baja</a>.</td></tr>
</table></td></tr></table></body></html>`;
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const preview = url.searchParams.get("preview") === "1";
  const now = new Date();
  const fecha = new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long", timeZone: "America/Argentina/Buenos_Aires" }).format(now);
  const hoy = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Argentina/Buenos_Aires" }).format(now); // AAAA-MM-DD
  const campaign = `diario-${hoy}`;

  const all = await getItems().catch(() => [] as Item[]);
  // Notas de las últimas 36 h; si no hubo, las más recientes para que el correo nunca salga vacío.
  const recent = all.filter((i) => now.getTime() - i.date.getTime() < 36 * 36e5);
  const items = (recent.length ? recent : all).slice(0, 6);
  if (!items.length) return Response.json({ ok: false, error: "No hay notas en el feed" }, { status: 503 });
  const html = render(items, await getMarket(), fecha, campaign);
  const subject = `☕ ${items[0].title}`;

  if (preview) return new Response(html.replace("{{baja}}", `${SITE}/baja`), { headers: { "content-type": "text/html; charset=utf-8" } });
  if (!RESEND) return Response.json({ ok: false, error: "Falta RESEND_API_KEY" }, { status: 503 });

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  // Un solo envío por día aunque la función se llame varias veces.
  const { error: dup } = await db.from("envios").insert({ fecha: hoy, asunto: subject });
  if (dup) return Response.json({ ok: false, error: "Ya se mandó el de hoy" }, { status: 409 });

  const { data: subs, error } = await db.from("suscriptores").select("email, token").eq("activo", true);
  if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });

  let sent = 0;
  for (let i = 0; i < (subs ?? []).length; i += 100) {
    const batch = subs!.slice(i, i + 100).map((s) => {
      const baja = `${SITE}/baja?t=${s.token}`;
      return { from: FROM, to: [s.email], subject, html: html.replace("{{baja}}", baja), headers: { "List-Unsubscribe": `<${baja}>` } };
    });
    const r = await fetch("https://api.resend.com/emails/batch", {
      method: "POST",
      headers: { authorization: `Bearer ${RESEND}`, "content-type": "application/json" },
      body: JSON.stringify(batch),
    });
    if (r.ok) sent += batch.length;
    else console.error("resend", r.status, await r.text());
  }
  await db.from("envios").update({ enviados: sent }).eq("fecha", hoy);
  return Response.json({ ok: true, sent, subject });
});
