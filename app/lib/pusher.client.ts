import type Pusher from "pusher-js";

let clientPromise: Promise<Pusher> | null = null;

/**
 * Cliente Pusher do navegador, criado sob demanda. O `pusher-js` é importado dinamicamente
 * para não pesar no carregamento inicial da página nem rodar no SSR.
 * Canal e evento: `liveGamesChannel` / `NEW_GAME_EVENT` em `~/lib/lottery/live-games`.
 */
export function getPusherClient(config: { key: string; cluster: string }): Promise<Pusher> {
  if (typeof window === "undefined")
    return Promise.reject(new Error("pusher-js só roda no navegador"));
  clientPromise ??= import("pusher-js").then(
    ({ default: PusherJs }) => new PusherJs(config.key, { cluster: config.cluster, forceTLS: true })
  );
  return clientPromise;
}
