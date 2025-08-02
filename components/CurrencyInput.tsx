import React, { useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";

type Props = {
  label: string;
  initialValue: string;
  handleChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
};

const CurrencyInput: React.FC<Props> = ({ label, initialValue, handleChange, error, helperText }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const formatToBRL = (numberString: string) => {
    const cents = numberString.padStart(3, "0");
    const reais = cents.slice(0, -2);
    const centavos = cents.slice(-2);
    const formatted = `${parseInt(reais, 10).toLocaleString("pt-BR")},${centavos}`;
    return formatted;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = event.target.value.replace(/\D/g, "");
    const formatted = formatToBRL(onlyDigits);
    handleChange(formatted);
  };

  useEffect(() => {
    // Sempre posiciona o cursor à direita
    const element = inputRef.current;
    if (element) {
      const length = element.value.length;
      element.setSelectionRange(length, length);
    }
  }, [initialValue]);

  return (
    <TextField
      inputRef={inputRef}
      label={label}
      value={initialValue}
      onChange={handleInputChange}
      variant="standard"
      slotProps={{ input: { type: "numeric" } }}
      fullWidth
      error={error}
      helperText={helperText}
    />
  );
};

export default CurrencyInput;