// Alta de suscriptores al newsletter (función "suscribir" de Supabase).
import { NextResponse } from "next/server";
import { rpc } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();
  const source = String(body?.source ?? "web").slice(0, 40);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Ese correo no parece válido." }, { status: 400 });
  }
  const r = await rpc("suscribir", { p_email: email, p_source: source });
  if (!r.ok) return NextResponse.json({ error: "No pudimos anotarte. Probá de nuevo en un rato." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
