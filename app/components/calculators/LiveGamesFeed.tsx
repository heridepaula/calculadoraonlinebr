import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui";
import { badgeInfo } from "~/lib/lottery/badges";
import { LOTTERIES, type LotteryId } from "~/lib/lottery/definitions";
import {
  LOCAL_GAME_EVENT,
  NEW_GAME_EVENT,
  generatedIn,
  liveGamesChannel,
  timeAgo,
} from "~/lib/lottery/live-games";
import { getPusherClient } from "~/lib/pusher.client";
import type { PublicGeneratedGame } from "~/types/lottery";

const FEED_LIMIT = 5;
const pad = (n: number) => n.toString().padStart(2, "0");

const isGame = (g: unknown): g is PublicGeneratedGame =>
  !!g &&
  typeof (g as PublicGeneratedGame).id === "string" &&
  Array.isArray((g as PublicGeneratedGame).numbers) &&
  typeof (g as PublicGeneratedGame).location === "string";

interface Props {
  lottery: LotteryId;
  /** Chaves públicas do Pusher; `null` = sem tempo real (mostra só os recentes e os do visitante). */
  pusher: { key: string; cluster: string } | null;
  initial: PublicGeneratedGame[];
}

/**
 * Feed "Jogos da comunidade": os últimos jogos gerados nesta loteria, com estratégia e cidade.
 * A conexão com o Pusher só abre quando o feed aparece na tela e fecha com a aba em segundo plano,
 * para poupar o limite de conexões simultâneas do plano gratuito.
 */
export function LiveGamesFeed({ lottery, pusher, initial }: Props) {
  const def = LOTTERIES[lottery];
  const [games, setGames] = useState<PublicGeneratedGame[]>(initial.slice(0, FEED_LIMIT));
  const [freshIds, setFreshIds] = useState<Set<string>>(new Set());
  const [live, setLive] = useState(false);
  const [now, setNow] = useState<number | null>(null); // só no cliente: evita divergência de hidratação
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const add = (game: unknown) => {
    if (!isGame(game) || game.lotteryType !== lottery) return;
    setGames((prev) =>
      prev.some((g) => g.id === game.id) ? prev : [game, ...prev].slice(0, FEED_LIMIT)
    );
    setFreshIds((prev) => new Set(prev).add(game.id));
  };
  const addRef = useRef(add);
  addRef.current = add;

  // Relógio dos "há N min".
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);

  // Jogo do próprio visitante: aparece na hora, com ou sem Pusher.
  useEffect(() => {
    const onLocal = (e: Event) => addRef.current((e as CustomEvent).detail);
    window.addEventListener(LOCAL_GAME_EVENT, onLocal);
    return () => window.removeEventListener(LOCAL_GAME_EVENT, onLocal);
  }, []);

  // Só conecta quando o feed entra na tela.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !pusher) return;
    if (typeof IntersectionObserver === "undefined") return setVisible(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pusher]);

  const pusherKey = pusher?.key;
  const pusherCluster = pusher?.cluster;
  useEffect(() => {
    if (!visible || !pusherKey || !pusherCluster) return;
    let cancelled = false;
    let cleanup = () => {};
    const channelName = liveGamesChannel(lottery);

    getPusherClient({ key: pusherKey, cluster: pusherCluster })
      .then((client) => {
        if (cancelled) return;
        const channel = client.subscribe(channelName);
        const onGame = (payload: { data?: unknown }) => addRef.current(payload?.data);
        const onState = ({ current }: { current: string }) => setLive(current === "connected");
        const onVisibility = () =>
          document.visibilityState === "hidden" ? client.disconnect() : client.connect();
        channel.bind(NEW_GAME_EVENT, onGame);
        client.connection.bind("state_change", onState);
        document.addEventListener("visibilitychange", onVisibility);
        setLive(client.connection.state === "connected");
        cleanup = () => {
          channel.unbind(NEW_GAME_EVENT, onGame);
          client.connection.unbind("state_change", onState);
          document.removeEventListener("visibilitychange", onVisibility);
          client.unsubscribe(channelName);
        };
      })
      .catch(() => setLive(false));

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [visible, pusherKey, pusherCluster, lottery]);

  return (
    <div ref={rootRef}>
      <Card className={`${def.themeClass} mx-auto max-w-4xl border-l-4 border-lot-500`}>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle>📡 Jogos da comunidade</CardTitle>
            {live ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-system-error/15 px-2.5 py-1 text-xs font-semibold text-system-error-dark">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-system-error opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-system-error" />
                </span>
                Ao vivo
              </span>
            ) : (
              <span className="rounded-full bg-neutral-surface px-2.5 py-1 text-xs font-medium text-text-secondary">
                Recentes
              </span>
            )}
          </div>
          <p className="!mb-0 mt-1 text-sm text-text-secondary">
            Últimos jogos de {def.name} gerados por quem usa o gerador.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {games.length === 0 ? (
            <p className="!mb-0 rounded-lg bg-neutral-surface/60 p-4 text-center text-sm text-text-secondary">
              Nenhum jogo gerado ainda para o próximo concurso. Gere o seu e ele aparece aqui!
            </p>
          ) : (
            <ul className="space-y-2" aria-live="polite" aria-label="Últimos jogos gerados">
              {games.map((g) => (
                <li
                  key={g.id}
                  className={`rounded-lg border border-neutral-surface-variant bg-neutral-surface/40 p-3 ${
                    freshIds.has(g.id) ? "animate-slide-up border-lot-500/60" : ""
                  }`}
                >
                  <div
                    className="flex flex-wrap gap-1"
                    aria-label={`Dezenas: ${g.numbers.map(pad).join(", ")}`}
                  >
                    {g.numbers.map((n) => (
                      <span
                        key={n}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-lot-600 text-xs font-bold text-white"
                      >
                        {pad(n)}
                      </span>
                    ))}
                  </div>
                  <p className="!mb-0 mt-2 text-xs text-text-secondary">
                    Gerado <strong className="text-text-primary">{generatedIn(g.location)}</strong>
                    {" · "}Estratégia:{" "}
                    <span className="text-text-primary">
                      {g.badges.length
                        ? g.badges
                            .map((id) => badgeInfo(id))
                            .filter(Boolean)
                            .map((b) => `${b!.icon} ${b!.text}`)
                            .join(" · ")
                        : g.strategy}
                    </span>
                    {now !== null && <> · {timeAgo(g.generatedAt, now)}</>}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <p className="!mb-0 text-xs text-text-secondary">
            Os jogos aparecem de forma anônima, só com a cidade aproximada de quem gerou (nenhum IP
            é guardado). Depois do sorteio fica só o melhor jogo de cada concurso.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
