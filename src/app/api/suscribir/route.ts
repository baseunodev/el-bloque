// Alta de suscriptores al newsletter. Guarda en Supabase (tabla "suscriptores") si están las variables de entorno.
import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();
  const source = String(body?.source ?? "web").slice(0, 40);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Ese correo no parece válido." }, { status: 400 });
  }
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("[suscribir] faltan SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
    return NextResponse.json({ error: "Las suscripciones abren en unos días. ¡Volvé pronto!" }, { status: 503 });
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/suscriptores`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      authorization: `Bearer ${SUPABASE_KEY}`,
      "content-type": "application/json",
      prefer: "resolution=ignore-duplicates,return=minimal",
    },
    body: JSON.stringify({ email, source }),
  });
  if (!res.ok && res.status !== 409) {
    console.error("[suscribir]", res.status, await res.text());
    return NextResponse.json({ error: "No pudimos anotarte. Probá de nuevo en un rato." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
