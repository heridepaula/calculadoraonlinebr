import React, { useState, useRef, useEffect } from "react";

export interface RateInputProps {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  fullWidth?: boolean;
  readOnly?: boolean;
  min?: string;
}

export const RateInput: React.FC<RateInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
  fullWidth = false,
  readOnly = false,
  min,
}) => {
  const [displayValue, setDisplayValue] = useState("");
  const [numericValue, setNumericValue] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Formatar número para exibição brasileira com %
  const formatPercentage = (cents: number): string => {
    const percentage = cents / 100;
    return percentage.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "%";
  };

  // Converter string ou number para centavos
  const stringToCents = (str: string | number): number => {
    if (typeof str === "number") {
      return Math.round(str * 100);
    }
    // Remove tudo exceto dígitos
    const numericString = str.replace(/\D/g, "");
    return parseInt(numericString) || 0;
  };

  // Sincronizar com valor externo
  useEffect(() => {
    const externalCents = stringToCents(value);
    if (externalCents !== numericValue) {
      setNumericValue(externalCents);
      setDisplayValue(formatPercentage(externalCents));
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (readOnly) return;

    const input = e.target as HTMLInputElement;
    const cursorPosition = input.selectionStart || 0;
    const inputValue = input.value;
    const inputLength = inputValue.length;

    // Se backspace ou delete e cursor está no final, limpa o campo completamente
    if ((e.key === "Backspace" || e.key === "Delete") && cursorPosition >= inputLength) {
      e.preventDefault();
      setNumericValue(0);
      setDisplayValue(formatPercentage(0));
      onChange("0,00");
      return;
    }

    // Se backspace e cursor está no final ou quase no final, também limpa
    if (e.key === "Backspace" && cursorPosition >= inputLength - 1) {
      e.preventDefault();
      setNumericValue(0);
      setDisplayValue(formatPercentage(0));
      onChange("0,00");
      return;
    }

    // Permitir teclas especiais
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ];

    if (allowedKeys.includes(e.key)) {
      if (e.key === "Backspace") {
        e.preventDefault();
        const newCents = Math.floor(numericValue / 10);
        setNumericValue(newCents);
        setDisplayValue(formatPercentage(newCents));
        const percentageValue = (newCents / 100).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        onChange(percentageValue);
      }
      return;
    }

    // Permitir apenas dígitos
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const digit = parseInt(e.key);
    const newCents = numericValue * 10 + digit;

    // Limitar a 9.999,99% (999999 centavos)
    if (newCents > 999999) {
      return;
    }

    setNumericValue(newCents);
    setDisplayValue(formatPercentage(newCents));
    const percentageValue = (newCents / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    onChange(percentageValue);
  };

  const handleFocus = () => {
    if (inputRef.current && !readOnly) {
      // Posicionar cursor no final
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(
            inputRef.current.value.length,
            inputRef.current.value.length
          );
        }
      }, 0);
    }
  };

  const handleChange = () => {
    // Previne mudanças diretas no input - só aceita via teclado
  };

  const baseClasses = [
    "w-full p-3 border rounded-lg transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue",
    "bg-background-primary text-text-primary border-neutral-surface-variant",
    "placeholder:text-text-secondary",
    readOnly && "bg-neutral-surface/50 cursor-not-allowed",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const containerClasses = ["space-y-1", fullWidth && "w-full"].filter(Boolean).join(" ");

  return (
    <div className={containerClasses}>
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
          {required && <span className="ml-1 text-system-error">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={baseClasses}
          readOnly={readOnly}
          style={{ caretColor: readOnly ? "transparent" : "auto" }}
        />
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform">
          <span className="text-xs text-text-secondary">📊</span>
        </div>
      </div>
      {min && (
        <p className="text-xs text-text-secondary">
          Valor mínimo: {parseFloat(min).toFixed(2).replace(".", ",")}%
        </p>
      )}
    </div>
  );
};
