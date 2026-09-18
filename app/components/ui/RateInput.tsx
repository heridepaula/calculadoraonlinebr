import React, { useState, useRef, useEffect } from "react";

export interface RateInputProps {
  label?: string;
  /** Liga um <label> externo ao campo (ex.: label com tooltip); use com `label` omitido. */
  id?: string;
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
  id,
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
    
    const stringValue = str.toString().trim();
    if (!stringValue) return 0;
    
    // Detect format by checking if there's a comma and point
    // Brazilian format: "10.000,50" (point = thousands, comma = decimal)
    // US/other format: "10000.50" (point = decimal)
    let normalizedValue: string;
    
    if (stringValue.includes(',')) {
      // Brazilian format with comma as decimal separator
      // Remove dots (thousands) and replace comma with dot
      normalizedValue = stringValue.replace(/\./g, '').replace(',', '.');
    } else if (stringValue.includes('.')) {
      // Check if it's thousands separator or decimal
      const parts = stringValue.split('.');
      if (parts.length === 2 && parts[1].length <= 2) {
        // Likely decimal separator (e.g., "10000.50")
        normalizedValue = stringValue;
      } else {
        // Likely thousands separator (e.g., "10.000" or "1.000.000")
        normalizedValue = stringValue.replace(/\./g, '');
      }
    } else {
      // No separators, just digits
      normalizedValue = stringValue;
    }
    
    const parsedValue = parseFloat(normalizedValue) || 0;
    return Math.round(parsedValue * 100);
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

    // Permitir teclas de navegação sem interceptar
    const navigationKeys = [
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

    if (navigationKeys.includes(e.key)) {
      return;
    }

    // Backspace - apaga último dígito ao invés de limpar campo
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
      return;
    }

    // Delete - limpa campo completamente
    if (e.key === "Delete") {
      e.preventDefault();
      setNumericValue(0);
      setDisplayValue(formatPercentage(0));
      onChange("0,00");
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    
    const inputValue = e.target.value;
    
    // Se o input está vazio, resetar
    if (inputValue === "" || inputValue === "%" || inputValue === "0,00%") {
      setNumericValue(0);
      setDisplayValue(formatPercentage(0));
      onChange("0,00");
      return;
    }
    
    // Parse the input value using the same logic as stringToCents
    const newCents = stringToCents(inputValue);
    
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
        <label htmlFor={id} className="block text-sm font-medium text-text-primary">
          {label}
          {required && <span className="ml-1 text-system-error">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          type="text"
          inputMode="numeric"
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
