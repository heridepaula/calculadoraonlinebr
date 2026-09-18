import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converte o valor dos campos com máscara (MoneyInput, RateInput, OddsInput), que usam o formato
 * brasileiro ("1.234,56"), em número. Vazio e zero retornam NaN: esses campos exibem "0,00"
 * quando limpos, então zero é tratado como "não preenchido".
 */
export function parseMaskedNumber(raw: string): number {
  const trimmed = raw.trim();
  if (trimmed === "") return Number.NaN;
  const normalized = trimmed.includes(",") ? trimmed.replace(/\./g, "").replace(",", ".") : trimmed;
  const value = Number(normalized);
  return value === 0 ? Number.NaN : value;
}
