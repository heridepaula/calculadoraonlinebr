import { useId, type ChangeEvent } from "react";

/** Maior odd aceita pela máscara: 999,99 */
const MAX_ODDS_CENTS = 99999;

export interface OddsInputProps {
  /** Omitir quando o label for renderizado fora do campo (ex.: com tooltip); nesse caso passe `id`. */
  label?: string;
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Campo de odd decimal com a mesma máscara de MoneyInput/RateInput: os dígitos preenchem a
 * partir das casas decimais (digitar "210" resulta em "2,10"). Emite o valor em formato
 * pt-BR ("2,10") ou "" quando vazio.
 */
export function OddsInput({ label, id, value, onChange, placeholder }: OddsInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    if (digits === "") {
      onChange("");
      return;
    }
    const cents = parseInt(digits, 10);
    if (cents > MAX_ODDS_CENTS) return;
    onChange(
      (cents / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    );
  };

  return (
    <div className="w-full space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="bg-background-primary h-12 w-full rounded-lg border border-neutral-surface-variant p-3 text-lg text-text-primary transition-colors duration-200 placeholder:text-text-secondary focus:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
      />
    </div>
  );
}
