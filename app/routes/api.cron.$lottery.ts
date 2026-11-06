import { timingSafeEqual } from "node:crypto";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { LOTTERIES, isLotteryId } from "~/lib/lottery/definitions";
import { saveResult } from "~/repositories/lottery.repository.server";
import { auditGeneratedGames } from "~/services/lottery/generatedGames.server";
import { fetchLatest } from "~/services/lottery/lotteryService.server";
import type { GamesAuditOutcome } from "~/types/lottery";

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

// Vercel Cron dispara GET em /api/cron/<loteria> (lotofacil, megasena, quina) com
// `Authorization: Bearer $CRON_SECRET`.
export async function loader({ request, params }: LoaderFunctionArgs) {
  if (!isAuthorized(request)) return json({ success: false, error: "Unauthorized" }, 401);
  if (!isLotteryId(params.lottery)) return json({ success: false, error: "Loteria desconhecida" }, 404);
  const def = LOTTERIES[params.lottery];

  try {
    const { result, source, provider, avisos } = await fetchLatest(def);
    const { created } = await saveResult(def, result);

    // Auditoria dos jogos gerados pela comunidade: falha aqui não invalida o resultado já gravado.
    let auditoria: GamesAuditOutcome[] | { error: string };
    try {
      auditoria = await auditGeneratedGames(def, result.concurso);
    } catch (err) {
      console.error(`[cron/${def.id}] auditoria dos jogos falhou:`, err);
      auditoria = { error: "Falha na auditoria dos jogos gerados" };
    }

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
      auditoria,
    });
  } catch (err) {
    console.error(`[cron/${def.id}] falha:`, err);
    return json({ success: false, error: "Falha ao obter/salvar resultado" }, 500);
  }
}
