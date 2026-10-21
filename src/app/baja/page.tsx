import type { Metadata } from "next";
import Link from "next/link";
import { rpc } from "@/lib/supabase";

export const metadata: Metadata = { title: "Darse de baja del newsletter", robots: { index: false } };
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function Baja({ searchParams }: { searchParams: Promise<{ t?: string }> }) {
  const { t } = await searchParams;
  const r = t && UUID.test(t) ? await rpc("darse_de_baja", { p_token: t }) : null;
  const ok = r?.ok && r.data === true;
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <h1 className="headline text-4xl">{ok ? "Listo, te diste de baja" : "No encontramos tu suscripción"}</h1>
      <p className="mt-4 text-muted">
        {ok
          ? "No vas a recibir más el newsletter. Si cambiás de idea, te podés volver a anotar cuando quieras."
          : "Puede que ya te hayas dado de baja o que el link esté incompleto. Si seguís recibiendo correos, escribinos."}
      </p>
      <p className="mt-8">
        <Link href="/" className="font-bold text-brand hover:underline">
          Volver a la portada
        </Link>
      </p>
    </div>
  );
}
