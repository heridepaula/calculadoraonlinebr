import { timingSafeEqual } from "node:crypto";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { saveLotofacilResult } from "~/repositories/lotofacil.repository.server";
import { fetchLatestLotofacil } from "~/services/lotofacil/lotofacilService.server";

const HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: HEADERS });

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const received = Buffer.from(request.headers.get("authorization") ?? "");
  return expected.length === received.length && timingSafeEqual(expected, received);
}

// Vercel Cron dispara GET em /api/cron/lotofacil com `Authorization: Bearer $CRON_SECRET`.
export async function loader({ request }: LoaderFunctionArgs) {
  if (!isAuthorized(request)) return json({ success: false, error: "Unauthorized" }, 401);

  try {
    const { result, source, provider } = await fetchLatestLotofacil();
    const { created } = await saveLotofacilResult(result);
    return json({
      success: true,
      source,
      provider,
      created,
      concurso: result.concurso,
      data_sorteio: result.data_sorteio.toISOString().slice(0, 10),
      dezenas: result.dezenas,
      acumulou: result.acumulou ?? null,
      premiacoes: result.premiacoes ?? null,
    });
  } catch (err) {
    console.error("[cron/lotofacil] falha:", err);
    return json({ success: false, error: "Falha ao obter/salvar resultado" }, 500);
  }
}
