// Primeira carga / teste manual dos indicadores e do Tesouro: `npm run sync:market`
// Requer MONGODB_URI (ex.: `tsx --env-file=.env scripts/syncMarket.ts`).
import { syncIndicators, syncTreasury } from "../app/services/market/sync.server";

const ind = await syncIndicators();
console.log("indicadores:", ind);
try {
  console.log("tesouro:", await syncTreasury());
} catch (err) {
  console.error("tesouro falhou:", err);
  process.exitCode = 1;
}
process.exit();
