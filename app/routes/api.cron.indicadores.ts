import { timingSafeEqual } from "node:crypto";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { syncIndicators, syncTreasury } from "~/services/market/sync.server";

const HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: HEADERS });

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const received = Buffer.from(request.headers.get("authorization") ?? "");
  return expected.length === received.length && timingSafeEqual(expected, received);
}

const msg = (e: unknown) => (e instanceof Error ? e.message : String(e));

// Vercel Cron: GET /api/cron/indicadores com `Authorization: Bearer $CRON_SECRET`.
// As duas etapas são independentes: uma falha não impede a outra.
export async function loader({ request }: LoaderFunctionArgs) {
  if (!isAuthorized(request)) return json({ success: false, error: "Unauthorized" }, 401);

  const [indicators, treasury] = await Promise.allSettled([syncIndicators(), syncTreasury()]);
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
