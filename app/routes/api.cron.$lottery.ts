import type { LoaderFunctionArgs } from "@remix-run/node";
import { LOTTERIES, isLotteryId } from "~/lib/lottery/definitions";
import { isAuthorized, json, runLotteryCron } from "~/services/lottery/cronRunner.server";

// GET /api/cron/<loteria> (lotofacil, megasena, quina) com `Authorization: Bearer $CRON_SECRET`.
// @vercel/remix: três loterias em paralelo + fontes externas podem passar do limite padrão.
export const config = { maxDuration: 60 };

export async function loader({ request, params }: LoaderFunctionArgs) {
  if (!isAuthorized(request)) return json({ success: false, error: "Unauthorized" }, 401);
  if (!isLotteryId(params.lottery)) return json({ success: false, error: "Loteria desconhecida" }, 404);
  const def = LOTTERIES[params.lottery];

  try {
    return json(await runLotteryCron(def));
  } catch (err) {
    console.error(`[cron/${def.id}] falha:`, err);
    return json({ success: false, error: "Falha ao obter/salvar resultado" }, 500);
  }
}
