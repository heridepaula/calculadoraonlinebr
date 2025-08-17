import React, { useState, useRef, useEffect } from "react";

export interface MoneyInputProps {
  label?: string;
  value: string | number;
  onChange: (value: number) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  fullWidth?: boolean;
  readOnly?: boolean;
  min?: string;
}

export const MoneyInput: React.FC<MoneyInputProps> = ({
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

  // Formatar número para exibição brasileira
  const formatCurrency = (cents: number): string => {
    const reais = cents / 100;
    return reais.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
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
      setDisplayValue(formatCurrency(externalCents));
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (readOnly) return;

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
        setDisplayValue(formatCurrency(newCents));
        onChange(newCents / 100);
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

    // Limitar a 9.999.999,99 (999999999 centavos)
    if (newCents > 999999999) {
      return;
    }

    setNumericValue(newCents);
    setDisplayValue(formatCurrency(newCents));
    onChange(newCents / 100);
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
        <span className="absolute left-3 top-1/2 -translate-y-1/2 transform select-none text-text-secondary">
          R$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={`${baseClasses} pl-12`}
          readOnly={readOnly}
          style={{ caretColor: readOnly ? "transparent" : "auto" }}
        />
      </div>
      {min && (
        <p className="text-xs text-text-secondary">
          Valor mínimo: R$ {parseFloat(min).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
      )}
    </div>
  );
};
