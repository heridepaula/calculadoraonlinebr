import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui";
import { badgeInfo } from "~/lib/lottery/badges";
import { LOTTERIES, type LotteryId } from "~/lib/lottery/definitions";
import {
  LOCAL_GAME_EVENT,
  NEW_GAME_EVENT,
  ageSeconds,
  generatedIn,
  liveGamesChannel,
  timeAgo,
} from "~/lib/lottery/live-games";
import { getPusherClient } from "~/lib/pusher.client";
import type { PublicGeneratedGame } from "~/types/lottery";

const FEED_LIMIT = 5;
/** Duração da animação de saída (igual a `feed-out` no tailwind.config). */
const EXIT_MS = 450;
// useLayoutEffect avisa no SSR; no servidor não há layout para medir.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
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
  // Fila: do mais antigo (topo) para o mais novo (embaixo). O servidor manda do mais novo ao mais antigo.
  const [games, setGames] = useState<PublicGeneratedGame[]>(() =>
    initial.slice(0, FEED_LIMIT).reverse()
  );
  const gamesRef = useRef(games);
  const [freshIds, setFreshIds] = useState<Set<string>>(new Set());
  const [live, setLive] = useState(false);
  const [now, setNow] = useState<number | null>(null); // só no cliente: evita divergência de hidratação
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Jogos que acabaram de sair do topo da fila: ficam um instante na tela, saindo com animação.
  const [leaving, setLeaving] = useState<PublicGeneratedGame[]>([]);
  const itemRefs = useRef(new Map<string, HTMLLIElement>());
  const lastTops = useRef(new Map<string, number>());
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  /** Novo jogo entra no fim da fila; passando de 5, o mais antigo (topo) sai. */
  const add = (game: unknown) => {
    if (!isGame(game) || game.lotteryType !== lottery) return;
    const prev = gamesRef.current;
    if (prev.some((g) => g.id === game.id)) return;
    const next = [...prev, game];
    const removed = next.slice(0, Math.max(0, next.length - FEED_LIMIT));
    const kept = next.slice(-FEED_LIMIT);
    gamesRef.current = kept;
    setGames(kept);
    setFreshIds((s) => new Set(s).add(game.id));
    if (removed.length) {
      setLeaving((l) => [...l, ...removed]);
      const ids = new Set(removed.map((g) => g.id));
      timers.current.push(
        setTimeout(() => setLeaving((l) => l.filter((g) => !ids.has(g.id))), EXIT_MS)
      );
    }
  };
  const addRef = useRef(add);
  addRef.current = add;

  // FLIP: quando um jogo sai do topo, os que ficam sobem deslizando em vez de pular.
  useIsoLayoutEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const tops = new Map<string, number>();
    itemRefs.current.forEach((el, id) => {
      tops.set(id, el.offsetTop);
      const before = lastTops.current.get(id);
      if (reduce || before === undefined || before === el.offsetTop) return;
      el.style.transition = "none";
      el.style.transform = `translateY(${before - el.offsetTop}px)`;
      requestAnimationFrame(() => {
        el.style.transition = "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)";
        el.style.transform = "";
      });
    });
    lastTops.current = tops;
  }, [games, leaving]);

  // Relógio do tempo de criação ("Agora" até 60 s, depois "X minutos atrás"): recalcula a cada
  // segundo, então a troca acontece no segundo exato. Abas em segundo plano congelam timers, por
  // isso também atualiza assim que a aba volta a ficar visível.
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const t = setInterval(tick, 1000);
    const onVisible = () => document.visibilityState === "visible" && tick();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(t);
      document.removeEventListener("visibilitychange", onVisible);
    };
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
            <ul
              className="relative space-y-2"
              aria-live="polite"
              aria-label="Últimos jogos gerados"
            >
              {/* os que estão saindo continuam no topo (mesma key) até a animação de saída acabar */}
              {[...leaving, ...games].map((g) => {
                const out = leaving.some((x) => x.id === g.id);
                const fresh = !out && freshIds.has(g.id);
                const isNow = now !== null && ageSeconds(g.generatedAt, now) <= 60;
                return (
                  <li
                    key={g.id}
                    ref={(el) => {
                      if (el) itemRefs.current.set(g.id, el);
                      else itemRefs.current.delete(g.id);
                    }}
                    aria-hidden={out || undefined}
                    className={`rounded-lg border bg-neutral-surface/40 p-3 transition-colors duration-700 ${
                      out
                        ? "pointer-events-none border-neutral-surface-variant motion-safe:animate-feed-out"
                        : fresh
                          ? "border-lot-500/60 motion-safe:animate-feed-in"
                          : "border-neutral-surface-variant"
                    }`}
                  >
                    {/* brilho que se apaga em volta do jogo recém-chegado */}
                    <div
                      className={`-m-3 rounded-lg p-3 ${fresh ? "motion-safe:animate-feed-flash" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div
                          className="flex flex-wrap gap-1"
                          aria-label={`Dezenas: ${g.numbers.map(pad).join(", ")}`}
                        >
                          {g.numbers.map((n, i) => (
                            <span
                              key={n}
                              style={fresh ? { animationDelay: `${120 + i * 45}ms` } : undefined}
                              className={`flex h-7 w-7 items-center justify-center rounded-full bg-lot-600 text-xs font-bold text-white ${
                                fresh ? "motion-safe:animate-ball-pop" : ""
                              }`}
                            >
                              {pad(n)}
                            </span>
                          ))}
                        </div>
                        {now !== null && (
                          <time
                            dateTime={g.generatedAt}
                            title={new Date(g.generatedAt).toLocaleString("pt-BR")}
                            className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-2xs font-semibold transition-colors duration-500 ${
                              isNow
                                ? "bg-emerald-400/15 text-emerald-300"
                                : "bg-neutral-surface text-text-secondary"
                            }`}
                          >
                            {isNow && (
                              <span
                                className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse"
                                aria-hidden="true"
                              />
                            )}
                            {timeAgo(g.generatedAt, now)}
                          </time>
                        )}
                      </div>
                      <p className="!mb-0 mt-2 text-xs text-text-secondary">
                        Gerado{" "}
                        <strong className="text-text-primary">{generatedIn(g.location)}</strong>
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
                      </p>
                    </div>
                  </li>
                );
              })}
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
