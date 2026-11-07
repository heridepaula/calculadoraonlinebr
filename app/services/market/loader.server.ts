import { json } from "@remix-run/node";
import { getMarketIndicators } from "./marketData.server";

/** Loader padrão das calculadoras que só precisam dos indicadores (SELIC, CDI, IPCA, INPC...). */
export async function marketIndicatorsLoader() {
  const indicators = await getMarketIndicators();
  return json(
    { indicators },
    { headers: { "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" } },
  );
}
