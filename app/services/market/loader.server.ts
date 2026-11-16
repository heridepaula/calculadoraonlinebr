import { json } from "@remix-run/node";
import { FALLBACK_FUEL_PRICES, type FuelPrices } from "~/lib/market/fuel";
import { getFuelPrices, getMarketIndicators } from "./marketData.server";

/** Loader padrão das calculadoras que só precisam dos indicadores (SELIC, CDI, IPCA, INPC...). */
export async function marketIndicatorsLoader() {
  const indicators = await getMarketIndicators();
  return json(
    { indicators },
    { headers: { "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" } },
  );
}

const CACHE_CONTROL = "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400";

/** Loader das calculadoras que mostram o preço médio dos combustíveis; nunca lança (cai no fallback). */
export async function fuelPricesLoader() {
  let fuel: FuelPrices;
  try {
    fuel = await getFuelPrices();
  } catch (err) {
    console.error("[market] fuelPricesLoader:", err);
    fuel = structuredClone(FALLBACK_FUEL_PRICES);
  }
  return json({ fuel }, { headers: { "Cache-Control": CACHE_CONTROL } });
}
