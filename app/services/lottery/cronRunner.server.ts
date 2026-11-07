import { timingSafeEqual } from "node:crypto";
import type { LotteryDef } from "~/lib/lottery/definitions";
import { saveResult } from "~/repositories/lottery.repository.server";
import type { GamesAuditOutcome } from "~/types/lottery";
import { auditGeneratedGames } from "./generatedGames.server";
import { fetchLatest } from "./lotteryService.server";

export const CRON_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: CRON_HEADERS });

/** `Authorization: Bearer $CRON_SECRET` (Vercel Cron e cron-job.org, via header customizado). */
export function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const received = Buffer.from(request.headers.get("authorization") ?? "");
  return expected.length === received.length && timingSafeEqual(expected, received);
}

/** Busca o último resultado, grava (idempotente por concurso) e audita os jogos gerados. */
export async function runLotteryCron(def: LotteryDef) {
  const { result, source, provider, avisos } = await fetchLatest(def);
  const { created } = await saveResult(def, result);

  // Falha na auditoria não invalida o resultado já gravado.
  let auditoria: GamesAuditOutcome[] | { error: string };
  try {
    auditoria = await auditGeneratedGames(def, result.concurso);
  } catch (err) {
    console.error(`[cron/${def.id}] auditoria dos jogos falhou:`, err);
    auditoria = { error: "Falha na auditoria dos jogos gerados" };
  }

  return {
    success: true as const,
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
  };
}
