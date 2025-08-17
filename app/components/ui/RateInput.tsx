import { useState, useEffect, forwardRef } from "react";

interface RateInputProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  min?: string;
  max?: string;
  step?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  id?: string;
}

const RateInput = forwardRef<HTMLInputElement, RateInputProps>(
  (
    {
      label,
      value = "",
      onChange,
      placeholder = "0,00",
      required = false,
      fullWidth = false,
      min,
      max,
      step,
      disabled = false,
      readOnly = false,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState("");
    const [internalValue, setInternalValue] = useState("");

    // Função para formatar o valor para exibição (999.999,99%)
    const formatDisplayValue = (numericValue: string): string => {
      if (!numericValue) return "";

      const num = parseFloat(numericValue);
      if (isNaN(num)) return "";

      return (
        new Intl.NumberFormat("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(num) + "%"
      );
    };

    // Função para converter valor numérico interno para string
    const formatInternalValue = (centavos: number): string => {
      return (centavos / 100).toFixed(2);
    };

    // Função para processar a entrada do usuário (digitação da direita para a esquerda)
    const processInput = (input: string): { display: string; internal: string } => {
      // Remove tudo que não for número
      const digitsOnly = input.replace(/\D/g, "");

      if (!digitsOnly) {
        return { display: "", internal: "" };
      }

      // Converte para centavos (número inteiro)
      const centavos = parseInt(digitsOnly, 10);

      // Converte centavos para valor decimal
      const decimalValue = centavos / 100;

      // Formata para exibição
      const formatted =
        new Intl.NumberFormat("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(decimalValue) + "%";

      const internalVal = decimalValue.toFixed(2);

      return { display: formatted, internal: internalVal };
    };

    // Inicializar valores quando o componente monta ou value prop muda
    useEffect(() => {
      if (value) {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          const formatted = formatDisplayValue(value);
          setDisplayValue(formatted);
          setInternalValue(value);
        } else {
          setDisplayValue("");
          setInternalValue("");
        }
      } else {
        setDisplayValue("");
        setInternalValue("");
      }
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (readOnly || disabled) return;

      const inputValue = e.target.value;

      // Se o usuário está apagando tudo
      if (!inputValue) {
        setDisplayValue("");
        setInternalValue("");
        onChange?.("");
        return;
      }

      const { display, internal } = processInput(inputValue);

      setDisplayValue(display);
      setInternalValue(internal);
      onChange?.(internal);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Permite: backspace, delete, tab, escape, enter
      if ([8, 9, 27, 13, 46].includes(e.keyCode)) {
        return;
      }

      // Permite: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      if (e.ctrlKey && [65, 67, 86, 88].includes(e.keyCode)) {
        return;
      }

      // Permite: Home, End, Left, Right
      if ([35, 36, 37, 39].includes(e.keyCode)) {
        return;
      }

      // Só permite números (0-9)
      if (!((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105))) {
        e.preventDefault();
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const { display, internal } = processInput(pastedText);

      setDisplayValue(display);
      setInternalValue(internal);
      onChange?.(internal);
    };

    const inputClasses = `
      w-full px-3 py-2 text-sm
      border border-neutral-surface-variant rounded-md
      bg-background-primary text-text-primary
      placeholder:text-text-secondary
      focus:border-primary-blue focus:ring-1 focus:ring-primary-blue focus:outline-none
      disabled:opacity-50 disabled:cursor-not-allowed
      read-only:bg-neutral-surface read-only:cursor-default
      transition-colors duration-200
      ${fullWidth ? "w-full" : ""}
      ${className}
    `.trim();

    return (
      <div className={`space-y-1 ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-text-primary">
            {label}
            {required && <span className="ml-1 text-system-error">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            {...props}
            ref={ref}
            id={id}
            type="text"
            value={displayValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            className={inputClasses}
            inputMode="numeric"
            autoComplete="off"
          />
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform">
            <span className="text-xs text-text-secondary">📊</span>
          </div>
        </div>
        <div className="text-xs text-text-secondary">
          💡 Digite apenas números - Ex: 1250 = 12,50%
        </div>
      </div>
    );
  }
);

RateInput.displayName = "RateInput";

export { RateInput };
export type { RateInputProps };
