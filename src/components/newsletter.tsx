"use client";
import { useState } from "react";

/** Formulario de suscripción al newsletter diario. */
export function NewsletterForm({ source, dark = false }: { source: string; dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/suscribir", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, source }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No pudimos anotarte. Probá de nuevo.");
      setState("ok");
      setMsg("¡Listo! Mañana a primera hora te llega el primer resumen.");
    } catch (err) {
      setState("error");
      setMsg(err instanceof Error ? err.message : "No pudimos anotarte.");
    }
  }

  if (state === "ok") return <p className={`rounded-md px-4 py-3 text-sm font-semibold ${dark ? "bg-white/10 text-white" : "bg-up/10 text-up"}`}>{msg}</p>;

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor={`nl-${source}`}>
          Tu correo
        </label>
        <input
          id={`nl-${source}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          className={`min-w-0 flex-1 rounded-md border px-4 py-3 text-base outline-none focus:border-brand ${dark ? "border-white/20 bg-white/10 text-white placeholder:text-white/50" : "border-border bg-surface"}`}
        />
        <button disabled={state === "sending"} className="rounded-md bg-brand px-5 py-3 font-bold text-white transition hover:brightness-110 disabled:opacity-60">
          {state === "sending" ? "Anotando…" : "Quiero recibirlo"}
        </button>
      </div>
      {state === "error" && <p className="mt-2 text-sm text-down">{msg}</p>}
      <p className={`mt-2 text-xs ${dark ? "text-white/60" : "text-muted"}`}>Gratis. Un correo por día. Te das de baja con un clic.</p>
    </form>
  );
}

/** Banda grande de suscripción para portada y notas. */
export function NewsletterBand({ source }: { source: string }) {
  return (
    <section className="my-10 overflow-hidden rounded-lg bg-ink text-white">
      <div className="grid gap-6 p-6 sm:p-10 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div>
          <p className="kicker !text-[#fb7185]">Newsletter diario</p>
          <h2 className="headline mt-2 text-3xl sm:text-4xl">El mundo cripto en 5 minutos, antes del café.</h2>
          <p className="mt-3 text-white/70">Todas las mañanas: lo que se movió, lo que importa y lo que viene. Sin humo y en tu idioma.</p>
        </div>
        <NewsletterForm source={source} dark />
      </div>
    </section>
  );
}
