import type { LotteryDef } from "~/lib/lottery/definitions";
import { getPusherPublicConfig } from "~/lib/pusher.server";
import {
  evaluateAndCleanGames,
  getLatestBestGame,
  getPendingAuditConcursos,
  getRecentGeneratedGames,
} from "~/repositories/generatedGames.repository.server";
import {
  getDrawnNumbers,
  getLatestResult,
  getPremiacoes,
} from "~/repositories/lottery.repository.server";
import type { GamesAuditOutcome, PublicBestGame, PublicGeneratedGame } from "~/types/lottery";

/** Máximo de concursos auditados por execução do cron (atrasos acumulados se resolvem aos poucos). */
const MAX_AUDITS_PER_RUN = 10;

/**
 * Audita todos os concursos já sorteados (até `latestConcurso`) que ainda têm jogos pendentes.
 * Concursos sem resultado gravado ficam para a próxima execução.
 */
export async function auditGeneratedGames(
  def: LotteryDef,
  latestConcurso: number
): Promise<GamesAuditOutcome[]> {
  const pending = (await getPendingAuditConcursos(def.id, latestConcurso)).slice(
    0,
    MAX_AUDITS_PER_RUN
  );
  const drawn = await getDrawnNumbers(def, pending);
  const out: GamesAuditOutcome[] = [];
  for (const concurso of pending) {
    const dezenas = drawn.get(concurso);
    if (dezenas) out.push(await evaluateAndCleanGames(def.id, concurso, dezenas));
  }
  return out;
}

/**
 * Quanto o jogo teria pago se tivesse sido apostado: o rateio oficial da faixa acertada.
 * É estimativa: mais um ganhador dividiria o prêmio da faixa (exceto as de valor fixo).
 */
async function estimatedPrize(
  def: LotteryDef,
  concurso: number,
  hits: number
): Promise<number | null | undefined> {
  if (!def.prizeTiers.includes(hits)) return null;
  const premiacoes = await getPremiacoes(def, concurso);
  if (!premiacoes) return undefined;
  return premiacoes.find((p) => p.acertos === hits)?.rateio ?? undefined;
}

export interface CommunityGamesData {
  pusher: { key: string; cluster: string } | null;
  recent: PublicGeneratedGame[];
  best: PublicBestGame | null;
}

/** Dados do feed ao vivo e do melhor jogo para o loader. Nunca derruba a página. */
export async function getCommunityGames(def: LotteryDef): Promise<CommunityGamesData> {
  const pusher = getPusherPublicConfig();
  try {
    const [recent, best] = await Promise.all([
      getRecentGeneratedGames(def.id, 5),
      getLatestBestGame(def.id),
    ]);
    if (best) best.prize = await estimatedPrize(def, best.concursoTarget, best.hits);
    return { pusher, recent, best };
  } catch (err) {
    console.error(`[${def.id}] jogos da comunidade indisponíveis:`, err);
    return { pusher, recent: [], best: null };
  }
}

/** Horário de Brasília (UTC−3, sem horário de verão desde 2019). */
const BRT_OFFSET_MS = 3 * 60 * 60 * 1000;
/**
 * A partir deste horário (Brasília) do dia do sorteio, novos jogos já contam para o concurso
 * seguinte. Fica antes do sorteio de propósito: um jogo gerado depois do resultado nunca pode
 * concorrer ao "melhor jogo" do concurso que já saiu.
 */
export const DRAW_CUTOFF_HOUR_BRT = 19;

/**
 * Concurso para o qual um jogo gerado agora concorre: o próximo concurso informado pela fonte
 * (ou último + 1), avançando um quando o dia do sorteio já passou do horário de corte ou quando o
 * cron ainda não gravou um sorteio que já aconteceu.
 */
export async function resolveConcursoTarget(
  def: LotteryDef,
  now = new Date()
): Promise<number | null> {
  const latest = await getLatestResult(def);
  if (!latest) return null;
  const next = latest.proximo?.concurso ?? latest.concurso + 1;
  const drawDate = latest.proximo?.data;
  if (!drawDate) return next;

  const brt = new Date(now.getTime() - BRT_OFFSET_MS); // campos UTC deste Date = relógio de Brasília
  const today = brt.toISOString().slice(0, 10);
  const drawDay = new Date(drawDate).toISOString().slice(0, 10);
  const closed =
    today > drawDay || (today === drawDay && brt.getUTCHours() >= DRAW_CUTOFF_HOUR_BRT);
  return closed ? next + 1 : next;
}

/** Valida as dezenas enviadas pelo navegador; retorna ordenadas ou `null` se inválidas. */
export function parseNumbers(def: LotteryDef, raw: unknown): number[] | null {
  if (!Array.isArray(raw) || raw.length !== def.gameSize) return null;
  if (!raw.every((n) => Number.isInteger(n) && n >= 1 && n <= def.universe)) return null;
  const numbers = [...new Set(raw as number[])].sort((a, b) => a - b);
  return numbers.length === def.gameSize ? numbers : null;
}
