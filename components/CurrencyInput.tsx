import React, { useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";

type Props = {
  label: string;
  initialValue: string;
  handleChange: (value: string) => void;
};

const CurrencyInput: React.FC<Props> = ({ label, initialValue, handleChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const formatToBRL = (numString: string) => {
    const cents = numString.padStart(3, "0");
    const reais = cents.slice(0, -2);
    const centavos = cents.slice(-2);
    const formatted = `${parseInt(reais, 10).toLocaleString("pt-BR")},${centavos}`;
    return formatted;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    const formatted = formatToBRL(onlyDigits);
    handleChange(formatted);
  };

  useEffect(() => {
    // Sempre posiciona o cursor à direita
    const el = inputRef.current;
    if (el) {
      const length = el.value.length;
      el.setSelectionRange(length, length);
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
    />
  );
};

export default CurrencyInput;