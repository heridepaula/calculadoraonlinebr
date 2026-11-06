import Pusher from "pusher";

// Instância reaproveitada entre invocações "warm" (serverless).
const globalForPusher = globalThis as unknown as { _pusher?: Pusher | null };

/** Cliente Pusher do servidor, ou `null` quando as chaves não estão configuradas (ex.: localhost). */
export function getPusher(): Pusher | null {
  if (globalForPusher._pusher !== undefined) return globalForPusher._pusher;
  const {
    PUSHER_APP_ID: appId,
    PUSHER_KEY: key,
    PUSHER_SECRET: secret,
    PUSHER_CLUSTER: cluster,
  } = process.env;
  globalForPusher._pusher =
    appId && key && secret && cluster
      ? new Pusher({ appId, key, secret, cluster, useTLS: true })
      : null;
  return globalForPusher._pusher;
}

/** Chaves públicas para o navegador (vão pelo loader; o secret nunca sai do servidor). */
export function getPusherPublicConfig(): { key: string; cluster: string } | null {
  const { PUSHER_KEY: key, PUSHER_CLUSTER: cluster } = process.env;
  return key && cluster ? { key, cluster } : null;
}

/**
 * Dispara um evento sem nunca derrubar a requisição: o feed ao vivo é acessório,
 * gravar o jogo é o que importa. Retorna `true` se o evento foi aceito pelo Pusher.
 */
export async function triggerSafe(channel: string, event: string, data: unknown): Promise<boolean> {
  const pusher = getPusher();
  if (!pusher) return false;
  try {
    await pusher.trigger(channel, event, data);
    return true;
  } catch (err) {
    console.error(`[pusher] falha ao disparar ${channel}/${event}:`, err);
    return false;
  }
}
