// Llamadas a las funciones de Supabase (RPC) para altas y bajas del newsletter.
import "server-only";
import { supabase } from "./site";

export async function rpc(fn: string, args: Record<string, unknown>): Promise<{ ok: boolean; data?: unknown; status: number }> {
  try {
    const res = await fetch(`${supabase.url}/rest/v1/rpc/${fn}`, {
      method: "POST",
      headers: { apikey: supabase.key, authorization: `Bearer ${supabase.key}`, "content-type": "application/json" },
      body: JSON.stringify(args),
      cache: "no-store",
    });
    if (!res.ok) console.error(`[supabase] ${fn}`, res.status, await res.text());
    return { ok: res.ok, status: res.status, data: res.ok ? await res.json() : undefined };
  } catch (err) {
    console.error(`[supabase] ${fn}`, err);
    return { ok: false, status: 0 };
  }
}
