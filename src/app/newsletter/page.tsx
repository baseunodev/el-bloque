import type { Metadata } from "next";
import { getPosts } from "@/lib/content";
import { NewsletterForm } from "@/components/newsletter";
import { StoryLine } from "@/components/story";

export const metadata: Metadata = {
  title: "Newsletter: el resumen cripto de cada mañana",
  description: "Todas las mañanas, en 5 minutos: qué pasó con bitcoin, las stablecoins y el dólar cripto, y qué tenés que saber hoy. Gratis.",
  alternates: { canonical: "/newsletter" },
};

const perks = [
  ["☕", "5 minutos", "Lo leés antes del café. Solo lo importante."],
  ["🌎", "Con contexto local", "Qué significa cada noticia para tu bolsillo en América Latina."],
  ["🛡️", "Alertas de estafas", "Te avisamos de las trampas que están circulando."],
  ["📈", "Números del día", "Bitcoin, ethereum, dólar cripto y miedo y codicia, de un vistazo."],
];

export default function NewsletterPage() {
  const latest = getPosts().slice(0, 4);
  return (
    <div className="mx-auto max-w-4xl">
      <section className="rounded-lg bg-ink p-6 text-white sm:p-12">
        <p className="kicker !text-[#fb7185]">Newsletter diario · Gratis</p>
        <h1 className="headline mt-3 text-4xl sm:text-6xl">El mundo cripto en 5 minutos, antes del café.</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/70">Cada mañana te mandamos lo que se movió, lo que importa y lo que viene. Sin humo, sin jerga y en tu idioma.</p>
        <div className="mt-8 max-w-xl">
          <NewsletterForm source="landing" dark />
        </div>
      </section>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {perks.map(([icon, title, text]) => (
          <div key={title} className="flex gap-4 rounded-lg border border-border bg-surface p-5">
            <span className="text-3xl">{icon}</span>
            <div>
              <p className="font-bold">{title}</p>
              <p className="text-sm text-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
      {latest.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 border-t-2 border-fg pt-2 text-sm font-extrabold uppercase tracking-[0.14em]">Lo que contamos estos días</h2>
          {latest.map((p) => (
            <StoryLine key={p.slug} post={p} />
          ))}
        </section>
      )}
    </div>
  );
}
