import { useCallback, useId, useRef, type RefObject } from "react";
import { Button } from "~/components/ui";

// ---------------------------------------------------------------------------
// Formatação (pt-BR)
// ---------------------------------------------------------------------------

export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const decimalFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const percentFormatter = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const roundToCents = (value: number) => Math.round(value * 100) / 100;

/** "+ R$ 5,50" / "- R$ 2,30" / "R$ 0,00" */
export function formatSignedCurrency(value: number): string {
  const rounded = roundToCents(value);
  const sign = rounded > 0 ? "+ " : rounded < 0 ? "- " : "";
  return `${sign}${currencyFormatter.format(Math.abs(rounded))}`;
}

/** "+5,50%" / "-2,30%" (recebe o valor já em pontos percentuais) */
export function formatSignedPercent(value: number): string {
  const sign = value > 0.005 ? "+" : value < -0.005 ? "-" : "";
  return `${sign}${decimalFormatter.format(Math.abs(value))}%`;
}

// ---------------------------------------------------------------------------
// Comportamento comum: rolagem até o resultado / formulário
// ---------------------------------------------------------------------------

/**
 * Refs do formulário e do resultado, com rolagem suave (instantânea quando o usuário prefere
 * menos movimento). A rolagem espera o React renderizar o resultado ou os erros.
 */
export function useCalculatorScroll() {
  const inputsRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((ref: RefObject<HTMLDivElement>) => {
    setTimeout(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      ref.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }, 50);
  }, []);

  return { inputsRef, resultRef, scrollTo };
}

// ---------------------------------------------------------------------------
// Componentes
// ---------------------------------------------------------------------------

/** Botões Calcular (submit do formulário) e Limpar. */
export function CalculatorActions({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex justify-center space-x-4">
      <Button type="submit" className="px-8">
        Calcular
      </Button>
      <Button
        type="button"
        onClick={onReset}
        variant="outline"
        className="border-system-error px-8 text-system-error hover:bg-system-error hover:text-white"
      >
        Limpar
      </Button>
    </div>
  );
}

export function MetricBox({
  label,
  value,
  note,
  valueClassName,
}: {
  label: string;
  value: string;
  note?: string;
  valueClassName: string;
}) {
  return (
    <div className="rounded-lg bg-gray-900 p-5 text-center">
      <div className={`text-2xl font-bold sm:text-3xl ${valueClassName}`}>{value}</div>
      <div className="text-sm text-text-secondary">{label}</div>
      {note && <div className="mt-2 text-xs text-gray-400">{note}</div>}
    </div>
  );
}

export interface OptionCardItem<T extends string | number> {
  value: T;
  label: string;
  description?: string;
}

/**
 * Grupo de opções exclusivas em forma de cards (radio). O input nativo fica invisível com
 * opacity-0: `sr-only` não serve porque globals.css torna `.sr-only:focus` visível.
 */
export function OptionCards<T extends string | number>({
  legend,
  options,
  value,
  onChange,
  columnsClassName = "grid-cols-2",
}: {
  legend: string;
  options: ReadonlyArray<OptionCardItem<T>>;
  value: T;
  onChange: (value: T) => void;
  columnsClassName?: string;
}) {
  const name = useId();

  return (
    <fieldset>
      <legend className="mb-1 block text-base font-medium text-text-primary-dark md:text-sm">
        {legend}
      </legend>
      <div className={`grid gap-2 sm:gap-3 ${columnsClassName}`}>
        {options.map((option) => {
          const checked = option.value === value;
          return (
            <label
              key={String(option.value)}
              className={`relative flex min-h-[56px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 px-2 py-2 text-center transition-all duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-blue-dark ${
                checked
                  ? "border-primary-blue-dark bg-primary-blue-light text-text-primary"
                  : "border-neutral-surface-variant bg-background-dark-secondary text-text-secondary hover:border-primary-blue/50"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={String(option.value)}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="pointer-events-none absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
              />
              <span className="text-sm font-semibold leading-tight sm:text-base">
                {option.label}
              </span>
              {option.description && (
                <span
                  className={`mt-0.5 text-[11px] leading-tight sm:text-xs ${
                    checked ? "text-primary-blue-dark" : "text-text-secondary"
                  }`}
                >
                  {option.description}
                </span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Aviso de jogo responsável exibido no rodapé de cada calculadora de apostas. */
export function BettingDisclaimer({ extra }: { extra?: string }) {
  return (
    <p className="text-center text-xs leading-relaxed text-text-secondary">
      Apostas envolvem risco financeiro. Esta calculadora é uma ferramenta matemática e não garante
      lucros{extra ? `: ${extra}` : ""}. Jogue com responsabilidade. (18+)
    </p>
  );
}
