/**
 * CNPJ numérico e alfanumérico (IN RFB 2.229/2024, em vigor desde julho/2026).
 * Posições 1–12: 0–9 e A–Z. Posições 13–14 (dígitos verificadores): somente 0–9.
 * Módulo 11, com o valor de cada caractere = código ASCII − 48 ("0"→0, "9"→9, "A"→17, "Z"→42).
 */

export const CNPJ_WEIGHTS_DV1: readonly number[] = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
export const CNPJ_WEIGHTS_DV2: readonly number[] = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

const DEFAULT_BRANCH = "0001";
const NUMERIC_CHARS = "0123456789";
const ALPHANUMERIC_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** Remove tudo que não for [a-zA-Z0-9] e só então converte para maiúsculas ("ß" não vira "SS"). */
export function sanitizeCnpj(input: string): string {
  return input.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

export function cnpjCharValue(char: string): number {
  return char.charCodeAt(0) - 48;
}

function checkDigit(chars: string, weights: readonly number[]): number {
  let sum = 0;
  for (let i = 0; i < weights.length; i++) {
    sum += cnpjCharValue(chars[i]) * weights[i];
  }
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

/** Calcula [DV1, DV2] a partir dos 12 primeiros caracteres (já sanitizados). */
export function calculateCnpjCheckDigits(base12: string): [number, number] {
  const dv1 = checkDigit(base12, CNPJ_WEIGHTS_DV1);
  const dv2 = checkDigit(base12 + dv1, CNPJ_WEIGHTS_DV2);
  return [dv1, dv2];
}

/** Aplica a máscara XX.XXX.XXX/XXXX-XX; devolve a entrada intacta se não tiver 14 caracteres. */
export function formatCnpj(input: string): string {
  const cleaned = sanitizeCnpj(input);
  if (cleaned.length !== 14) return input;
  return cleaned.replace(
    /^([A-Z0-9]{2})([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]{4})([0-9]{2})$/,
    "$1.$2.$3/$4-$5"
  );
}

/** True quando alguma das 12 primeiras posições é letra. */
export function isAlphanumericCnpj(input: string): boolean {
  return /[A-Z]/.test(sanitizeCnpj(input).slice(0, 12));
}

export function validateCnpj(input: string): { isValid: boolean; errorMessage?: string } {
  const cleaned = sanitizeCnpj(input);

  if (cleaned.length !== 14) {
    return { isValid: false, errorMessage: "CNPJ deve ter 14 caracteres" };
  }
  if (!/^[A-Z0-9]{12}[0-9]{2}$/.test(cleaned)) {
    return {
      isValid: false,
      errorMessage: "Os dois últimos caracteres (dígitos verificadores) devem ser números",
    };
  }
  if (/^(.)\1{13}$/.test(cleaned)) {
    return { isValid: false, errorMessage: "CNPJ com sequência de caracteres iguais é inválido" };
  }

  const [dv1, dv2] = calculateCnpjCheckDigits(cleaned.slice(0, 12));
  if (Number(cleaned[12]) !== dv1 || Number(cleaned[13]) !== dv2) {
    return { isValid: false, errorMessage: "Dígitos verificadores não conferem" };
  }
  return { isValid: true };
}

/** Valida a ordem/filial (4 caracteres) para o tipo escolhido. Devolve a mensagem de erro ou null. */
export function validateBranch(branch: string, alphanumeric: boolean): string | null {
  const cleaned = sanitizeCnpj(branch);
  if (cleaned.length !== 4) return "A ordem deve ter 4 caracteres";
  if (!alphanumeric && !/^[0-9]{4}$/.test(cleaned)) {
    return "No CNPJ numérico a ordem deve ter apenas números";
  }
  if (cleaned === "0000") return "0000 não é uma ordem válida";
  return null;
}

/** Sorteio uniforme (CSPRNG) sem viés de módulo. */
function randomChars(alphabet: string, length: number): string {
  const limit = 256 - (256 % alphabet.length);
  let out = "";
  while (out.length < length) {
    const bytes = crypto.getRandomValues(new Uint8Array(length * 2));
    for (const b of bytes) {
      if (b < limit && out.length < length) out += alphabet[b % alphabet.length];
    }
  }
  return out;
}

/** Gera um CNPJ válido (14 caracteres, sem máscara). No modo alfanumérico a raiz tem ao menos uma letra. */
export function generateCnpj(opts: { alphanumeric: boolean; branch?: string }): string {
  const { alphanumeric } = opts;
  const branch = sanitizeCnpj(opts.branch ?? DEFAULT_BRANCH);
  const error = validateBranch(branch, alphanumeric);
  if (error) throw new Error(error);

  const alphabet = alphanumeric ? ALPHANUMERIC_CHARS : NUMERIC_CHARS;
  for (;;) {
    const root = randomChars(alphabet, 8);
    if (alphanumeric && !/[A-Z]/.test(root)) continue;
    const base = root + branch;
    const [dv1, dv2] = calculateCnpjCheckDigits(base);
    const cnpj = `${base}${dv1}${dv2}`;
    if (!/^(.)\1{13}$/.test(cnpj)) return cnpj;
  }
}
