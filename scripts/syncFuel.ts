// Só os preços de combustíveis da ANP: `npm run sync:fuel` (requer MONGODB_URI em .env.local).
// Não reexecuta indicadores nem Tesouro, ao contrário de `npm run sync:market`.
import { syncFuel } from "../app/services/market/sync.server";

try {
  console.log("combustiveis:", await syncFuel());
} catch (err) {
  console.error("combustiveis falhou:", err);
  process.exitCode = 1;
}
process.exit();
