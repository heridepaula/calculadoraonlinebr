import { timingSafeEqual } from "node:crypto";
import type { LotteryDef } from "~/lib/lottery/definitions";
import { getLatestResult, saveResult } from "~/repositories/lottery.repository.server";
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

function safeEqual(expected: string, received: string): boolean {
  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Aceita o header `Authorization` em dois formatos:
 * - `Bearer $CRON_SECRET` (Vercel Cron);
 * - `Basic base64("cron:$CRON_BASIC_PASSWORD")` (cron-job.org, campo de autenticação HTTP).
 */
export function isAuthorized(request: Request): boolean {
  const received = request.headers.get("authorization") ?? "";
  const secret = process.env.CRON_SECRET;
  const basicPassword = process.env.CRON_BASIC_PASSWORD;
  if (secret && safeEqual(`Bearer ${secret}`, received)) return true;
  if (basicPassword) {
    const expected = `Basic ${Buffer.from(`cron:${basicPassword}`).toString("base64")}`;
    return safeEqual(expected, received);
  }
  return false;
}

/**
 * Busca o último resultado, grava (idempotente por concurso) e audita os jogos gerados.
 * Se o banco já tem esse concurso completo (com premiação), não grava nem audita de novo
 * (retries do cron-job.org após a atualização) e responde `skipped: true`.
 */
export async function runLotteryCron(def: LotteryDef) {
  // A leitura do banco corre junto com o scrape; se falhar, segue o fluxo completo (saveResult acusa o erro).
  const savedP = getLatestResult(def).catch(() => null);
  const known = savedP.then((s) => (s ? { concurso: s.concurso, completo: Boolean(s.premiacoes) } : undefined));
  const { result, source, provider, avisos } = await fetchLatest(def, known);
  const saved = await savedP;

  if (saved?.premiacoes && result.concurso <= saved.concurso) {
    return {
      success: true as const,
      skipped: true as const,
      lottery: def.id,
      source,
      provider,
      avisos,
      concurso: saved.concurso,
      motivo: result.concurso === saved.concurso ? "já atualizado" : "fonte ainda defasada",
    };
  }

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
    skipped: false as const,
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
