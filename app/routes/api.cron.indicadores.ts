import type { LoaderFunctionArgs } from "@remix-run/node";
import { isAuthorized } from "~/services/lottery/cronRunner.server";
import { syncFuel, syncIndicators, syncTreasury } from "~/services/market/sync.server";

const HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: HEADERS });

// @vercel/remix: o download do CSV do Tesouro e da planilha da ANP pode passar do limite padrão da função.
export const config = { maxDuration: 60 };

const msg = (e: unknown) => (e instanceof Error ? e.message : String(e));

// GET /api/cron/indicadores com `Authorization` Bearer (CRON_SECRET) ou Basic (cron:CRON_BASIC_PASSWORD).
// As etapas são independentes: uma falha não impede as outras.
// `?only=indicadores`, `?only=tesouro` ou `?only=combustiveis` roda só uma delas (jobs separados no
// cron-job.org). Os preços de combustíveis (ANP) rodam sem `only`, com `only=combustiveis` e também
// com `only=indicadores`, para o job que já existe atualizá-los sem configuração nova; uma falha deles
// só altera o status HTTP quando o job é `only=combustiveis`.
export async function loader({ request }: LoaderFunctionArgs) {
  if (!isAuthorized(request)) return json({ success: false, error: "Unauthorized" }, 401);

  const only = new URL(request.url).searchParams.get("only");
  if (only && only !== "indicadores" && only !== "tesouro" && only !== "combustiveis") {
    return json(
      { success: false, error: "Parâmetro only inválido (indicadores|tesouro|combustiveis)" },
      400,
    );
  }

  const skipped = { skipped: true };
  const runIndicators = !only || only === "indicadores";
  const runTreasury = !only || only === "tesouro";
  const runFuel = !only || only === "combustiveis" || only === "indicadores";
  const [indicators, treasury, fuel] = await Promise.allSettled([
    runIndicators ? syncIndicators() : Promise.resolve(skipped),
    runTreasury ? syncTreasury() : Promise.resolve(skipped),
    runFuel ? syncFuel() : Promise.resolve(skipped),
  ]);
  const out = {
    indicators:
      indicators.status === "fulfilled"
        ? indicators.value
        : { error: msg(indicators.reason) },
    treasury:
      treasury.status === "fulfilled" ? treasury.value : { error: msg(treasury.reason) },
    fuel: fuel.status === "fulfilled" ? fuel.value : { error: msg(fuel.reason) },
  };
  if (indicators.status === "rejected") console.error("[cron/indicadores] indicadores:", indicators.reason);
  if (treasury.status === "rejected") console.error("[cron/indicadores] tesouro:", treasury.reason);
  if (fuel.status === "rejected") console.error("[cron/indicadores] combustiveis:", fuel.reason);
  const ok =
    indicators.status === "fulfilled" &&
    treasury.status === "fulfilled" &&
    (only !== "combustiveis" || fuel.status === "fulfilled");
  return json({ success: ok, ...out }, ok ? 200 : 500);
}
