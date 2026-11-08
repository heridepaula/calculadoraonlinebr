import type { LoaderFunctionArgs } from "@remix-run/node";
import { isAuthorized } from "~/services/lottery/cronRunner.server";
import { syncIndicators, syncTreasury } from "~/services/market/sync.server";

const HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: HEADERS });

// @vercel/remix: o download do CSV do Tesouro pode passar do limite padrão da função.
export const config = { maxDuration: 60 };

const msg = (e: unknown) => (e instanceof Error ? e.message : String(e));

// GET /api/cron/indicadores com `Authorization` Bearer (CRON_SECRET) ou Basic (cron:CRON_BASIC_PASSWORD).
// As duas etapas são independentes: uma falha não impede a outra.
// `?only=indicadores` ou `?only=tesouro` roda só uma delas (jobs separados no cron-job.org).
export async function loader({ request }: LoaderFunctionArgs) {
  if (!isAuthorized(request)) return json({ success: false, error: "Unauthorized" }, 401);

  const only = new URL(request.url).searchParams.get("only");
  if (only && only !== "indicadores" && only !== "tesouro") {
    return json({ success: false, error: "Parâmetro only inválido (indicadores|tesouro)" }, 400);
  }

  const skipped = { skipped: true };
  const [indicators, treasury] = await Promise.allSettled([
    only === "tesouro" ? Promise.resolve(skipped) : syncIndicators(),
    only === "indicadores" ? Promise.resolve(skipped) : syncTreasury(),
  ]);
  const out = {
    indicators:
      indicators.status === "fulfilled"
        ? indicators.value
        : { error: msg(indicators.reason) },
    treasury:
      treasury.status === "fulfilled" ? treasury.value : { error: msg(treasury.reason) },
  };
  if (indicators.status === "rejected") console.error("[cron/indicadores] indicadores:", indicators.reason);
  if (treasury.status === "rejected") console.error("[cron/indicadores] tesouro:", treasury.reason);
  const ok = indicators.status === "fulfilled" && treasury.status === "fulfilled";
  return json({ success: ok, ...out }, ok ? 200 : 500);
}
