import type { LoaderFunctionArgs } from "@remix-run/node";
import { LOTTERIES, isLotteryId } from "~/lib/lottery/definitions";
import { isAuthorized, json, runLotteryCron } from "~/services/lottery/cronRunner.server";

// GET /api/cron/loterias[?only=lotofacil,megasena] — atualiza várias loterias de uma vez (para cron-job.org).
// Responde 200 se todas deram certo e 502 se alguma falhou (cron-job.org marca a execução como falha).
export async function loader({ request }: LoaderFunctionArgs) {
  if (!isAuthorized(request)) return json({ success: false, error: "Unauthorized" }, 401);

  const only = new URL(request.url).searchParams.get("only");
  const ids = only ? only.split(",").map((s) => s.trim()).filter(Boolean) : Object.keys(LOTTERIES);
  const invalid = ids.filter((id) => !isLotteryId(id));
  if (invalid.length) return json({ success: false, error: `Loteria desconhecida: ${invalid.join(",")}` }, 404);

  const results = await Promise.all(
    ids.map(async (id) => {
      const def = LOTTERIES[id as keyof typeof LOTTERIES];
      try {
        return await runLotteryCron(def);
      } catch (err) {
        console.error(`[cron/${def.id}] falha:`, err);
        return { success: false as const, lottery: def.id, error: "Falha ao obter/salvar resultado" };
      }
    })
  );

  const ok = results.every((r) => r.success);
  return json({ success: ok, results }, ok ? 200 : 502);
}
