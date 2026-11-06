import { timingSafeEqual } from "node:crypto";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { LOTTERIES, isLotteryId } from "~/lib/lottery/definitions";
import { saveResult } from "~/repositories/lottery.repository.server";
import { fetchLatest } from "~/services/lottery/lotteryService.server";

const HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: HEADERS });

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const received = Buffer.from(request.headers.get("authorization") ?? "");
  return expected.length === received.length && timingSafeEqual(expected, received);
}

// Vercel Cron dispara GET em /api/cron/<loteria> (lotofacil, megasena) com
// `Authorization: Bearer $CRON_SECRET`.
export async function loader({ request, params }: LoaderFunctionArgs) {
  if (!isAuthorized(request)) return json({ success: false, error: "Unauthorized" }, 401);
  if (!isLotteryId(params.lottery)) return json({ success: false, error: "Loteria desconhecida" }, 404);
  const def = LOTTERIES[params.lottery];

  try {
    const { result, source, provider, avisos } = await fetchLatest(def);
    const { created } = await saveResult(def, result);
    return json({
      success: true,
      lottery: def.id,
      source,
      provider,
      avisos,
      created,
      concurso: result.concurso,
      data_sorteio: result.data_sorteio.toISOString().slice(0, 10),
      dezenas: result.dezenas,
      acumulou: result.acumulou ?? null,
      premiacoes: result.premiacoes ?? null,
      proximo: result.proximo ?? null,
    });
  } catch (err) {
    console.error(`[cron/${def.id}] falha:`, err);
    return json({ success: false, error: "Falha ao obter/salvar resultado" }, 500);
  }
}
