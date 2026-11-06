import { createHmac } from "node:crypto";
import type { Collection } from "mongodb";
import { getDb } from "~/lib/mongodb.server";

export const RATE_LIMIT_COLLECTION = "lottery_rate_limits";

interface RateLimitDoc {
  /** `${escopo}:${hash do IP}`: o IP em si nunca é gravado. */
  _id: string;
  count: number;
  /** Fim da janela; o índice TTL apaga o documento depois disso. */
  expiresAt: Date;
}

const globalForRl = globalThis as unknown as { _rateLimitIndexes?: Promise<unknown> };

async function collection(): Promise<Collection<RateLimitDoc>> {
  const col = (await getDb()).collection<RateLimitDoc>(RATE_LIMIT_COLLECTION);
  globalForRl._rateLimitIndexes ??= col
    .createIndex({ expiresAt: 1 }, { name: "ttl_expiresAt", expireAfterSeconds: 0 })
    .catch((err) => {
      globalForRl._rateLimitIndexes = undefined;
      console.error("[rate-limit] falha ao criar índice TTL:", err);
    });
  await globalForRl._rateLimitIndexes;
  return col;
}

/**
 * Hash do IP com chave secreta (HMAC): permite contar requisições do mesmo IP sem guardar o IP
 * nem permitir revertê-lo a partir do banco (LGPD).
 */
export function hashIp(ip: string): string {
  const key = process.env.RATE_LIMIT_SECRET || process.env.CRON_SECRET || "calculadoraonlinebr";
  return createHmac("sha256", key).update(ip).digest("hex").slice(0, 32);
}

export interface RateLimitResult {
  allowed: boolean;
  count: number;
  limit: number;
  /** Quando a janela atual termina e o limite é liberado. */
  resetAt: Date;
}

/**
 * Janela fixa a partir do primeiro uso: conta até `limit` ações em `windowMs`; a janela (e a
 * contagem) só recomeça quando expira, então quem bate o limite espera até `resetAt`.
 * Uma única operação atômica: seguro com várias funções serverless em paralelo.
 */
export async function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now = new Date()
): Promise<RateLimitResult> {
  const col = await collection();
  const active = { $gt: ["$expiresAt", now] }; // campo ausente (documento novo) conta como expirado
  const doc = await col.findOneAndUpdate(
    { _id: key },
    [
      {
        $set: {
          count: { $cond: [active, { $add: ["$count", 1] }, 1] },
          expiresAt: { $cond: [active, "$expiresAt", new Date(now.getTime() + windowMs)] },
        },
      },
    ],
    { upsert: true, returnDocument: "after" }
  );
  const count = doc?.count ?? 1;
  const resetAt = doc?.expiresAt ?? new Date(now.getTime() + windowMs);
  return { allowed: count <= limit, count, limit, resetAt };
}
