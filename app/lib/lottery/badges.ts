import type { LotteryDef } from "./definitions";
import { MIX_PRESETS } from "./generator";

export interface BadgeInfo {
  icon: string;
  text: string;
}

/** Rótulo de cada badge de estratégia a partir do id (ids vêm de `strategyBadges`). */
const STATIC_BADGES: Record<string, BadgeInfo> = {
  surpresinha: { icon: "🎲", text: "Surpresinha" },
  "mix-custom": { icon: "🎛️", text: "Mistura" },
  "sum-low": { icon: "Σ", text: "Soma baixa" },
  "sum-ideal": { icon: "Σ", text: "Soma ideal" },
  "sum-high": { icon: "Σ", text: "Soma alta" },
  parity: { icon: "⚖️", text: "Pares/Ímpares" },
  primes: { icon: "🔢", text: "Primos" },
  fibonacci: { icon: "🐚", text: "Fibonacci" },
  consecutive: { icon: "🔗", text: "Seguidos" },
  rows: { icon: "▤", text: "Linhas" },
  fixed: { icon: "📌", text: "Números fixos" },
};

export function badgeInfo(id: string): BadgeInfo | undefined {
  if (STATIC_BADGES[id]) return STATIC_BADGES[id];
  const preset = id.startsWith("mix-") ? MIX_PRESETS.find((m) => `mix-${m.id}` === id) : undefined;
  return preset ? { icon: preset.icon, text: preset.label } : undefined;
}

/**
 * Filtra ids vindos do navegador: só ficam badges conhecidos e filtros que a loteria oferece,
 * sem repetição e na ordem original. Assim nenhum texto livre do visitante é gravado ou exibido.
 */
export function sanitizeBadgeIds(def: LotteryDef, ids: unknown): string[] {
  if (!Array.isArray(ids)) return [];
  const filterIds = new Set(["parity", "primes", "fibonacci", "consecutive", "rows"]);
  const out: string[] = [];
  for (const id of ids.slice(0, 20)) {
    if (typeof id !== "string" || out.includes(id) || !badgeInfo(id)) continue;
    if (filterIds.has(id) && !def.filters.includes(id as (typeof def.filters)[number])) continue;
    out.push(id);
  }
  return out;
}

/** Resumo da estratégia (ex.: "Surpresinha · Quentes · Soma ideal · Primos"). */
export function strategyLabel(ids: string[]): string {
  const parts = ids.map((id) => badgeInfo(id)?.text).filter(Boolean);
  return parts.length ? parts.join(" · ") : "Aleatório";
}
