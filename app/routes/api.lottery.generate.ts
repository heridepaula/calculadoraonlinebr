import type { ActionFunctionArgs } from "@remix-run/node";
import { locationFromHeaders } from "~/lib/geo.server";
import { strategyLabel, sanitizeBadgeIds } from "~/lib/lottery/badges";
import { LOTTERIES, isLotteryId } from "~/lib/lottery/definitions";
import { NEW_GAME_EVENT, liveGamesChannel } from "~/lib/lottery/live-games";
import { triggerSafe } from "~/lib/pusher.server";
import { insertGeneratedGame, toPublicGame } from "~/repositories/generatedGames.repository.server";
import { parseNumbers, resolveConcursoTarget } from "~/services/lottery/generatedGames.server";

const HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};
const MAX_BODY_BYTES = 2048;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: HEADERS });

/** Só aceita chamadas do próprio site (o navegador sempre envia Origin em POST com fetch). */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

/** GET não existe: a rota só registra jogos. */
export function loader() {
  return json({ success: false, error: "Método não permitido" }, 405);
}

/**
 * POST /api/lottery/generate
 * Corpo: { lottery: "lotofacil" | "megasena" | "quina", numbers: number[], badges: string[] }
 *
 * O jogo é gerado no navegador (resposta instantânea e sem repetir o histórico local); esta rota
 * valida, grava no MongoDB para a auditoria pós-sorteio e avisa o feed ao vivo pelo Pusher.
 */
export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST")
    return json({ success: false, error: "Método não permitido" }, 405);
  if (!isSameOrigin(request)) return json({ success: false, error: "Origem não permitida" }, 403);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES)
    return json({ success: false, error: "Corpo muito grande" }, 413);
  let body: { lottery?: unknown; numbers?: unknown; badges?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ success: false, error: "JSON inválido" }, 400);
  }

  if (typeof body.lottery !== "string" || !isLotteryId(body.lottery))
    return json({ success: false, error: "Loteria desconhecida" }, 400);
  const def = LOTTERIES[body.lottery];
  const numbers = parseNumbers(def, body.numbers);
  if (!numbers)
    return json(
      { success: false, error: `Envie ${def.gameSize} dezenas distintas de 1 a ${def.universe}` },
      400
    );
  const badges = sanitizeBadgeIds(def, body.badges);

  try {
    const concursoTarget = await resolveConcursoTarget(def);
    if (!concursoTarget)
      return json({ success: false, error: "Próximo concurso indisponível" }, 503);

    const doc = await insertGeneratedGame({
      lotteryType: def.id,
      numbers,
      strategy: strategyLabel(badges),
      badges,
      concursoTarget,
      location: locationFromHeaders(request.headers),
    });
    const game = toPublicGame(doc);
    // Aguardado: em serverless, promessas soltas podem ser cortadas quando a resposta sai.
    const live = await triggerSafe(liveGamesChannel(def.id), NEW_GAME_EVENT, { data: game });
    return json({ success: true, live, game }, 201);
  } catch (err) {
    console.error(`[lottery/generate/${def.id}] falha:`, err);
    return json({ success: false, error: "Falha ao registrar o jogo" }, 500);
  }
}
