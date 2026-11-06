import type { LotteryId } from "./definitions";

// Compartilhado entre servidor (trigger) e navegador (subscribe). Não pode morar em
// `*.client.ts`: o Remix esvazia esses módulos no build do servidor.

/** Canal do feed ao vivo de cada loteria (um por loteria: cada página só recebe os seus jogos). */
export const liveGamesChannel = (lottery: LotteryId) => `live-games-${lottery}`;
export const NEW_GAME_EVENT = "new-game";
/**
 * Evento de janela disparado quando o próprio visitante registra um jogo (detail: PublicGeneratedGame).
 * O feed mostra o jogo na hora, sem depender do Pusher; o id evita duplicar quando o Pusher também entrega.
 */
export const LOCAL_GAME_EVENT = "lottery:game-registered";

/** "em São Paulo, SP" / "no Brasil" / "fora do Brasil" (frase "Gerado …"). */
export function generatedIn(location: string): string {
  if (location === "Brasil") return "no Brasil";
  if (location === "Exterior") return "fora do Brasil";
  return `em ${location}`;
}

/** "de São Paulo, SP" / "do Brasil" / "de fora do Brasil" (frase "um usuário …"). */
export function userFrom(location: string): string {
  if (location === "Brasil") return "do Brasil";
  if (location === "Exterior") return "de fora do Brasil";
  return `de ${location}`;
}

/** Segundos desde a criação (nunca negativo, mesmo com relógio do aparelho adiantado). */
export const ageSeconds = (iso: string, now: number) =>
  Math.max(0, Math.floor((now - new Date(iso).getTime()) / 1000));

/** "Agora" (até 60 s), "X minutos atrás", "X horas atrás" ou a data (dd/mm) depois de 1 dia. */
export function timeAgo(iso: string, now: number): string {
  const s = ageSeconds(iso, now);
  if (s <= 60) return "Agora";
  if (s < 3600) {
    const m = Math.floor(s / 60);
    return `${m} ${m === 1 ? "minuto" : "minutos"} atrás`;
  }
  if (s < 86400) {
    const h = Math.floor(s / 3600);
    return `${h} ${h === 1 ? "hora" : "horas"} atrás`;
  }
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}
