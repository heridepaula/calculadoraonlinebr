'use client';

import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { sanitizeNumericInput } from '@/lib/utils/calculator';

interface CalculatorInputProps extends Omit<TextFieldProps, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  type?: 'number' | 'currency' | 'percentage' | 'text';
  allowDecimals?: boolean;
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({
  value,
  onChange,
  type = 'number',
  allowDecimals = true,
  ...textFieldProps
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    if (type === 'number' || type === 'currency' || type === 'percentage') {
      if (allowDecimals) {
        newValue = sanitizeNumericInput(newValue);
      } else {
        newValue = newValue.replace(/[^0-9]/g, '');
      }
    }

    onChange(newValue);
  };

  const getInputProps = () => {
    const baseProps = {
      inputMode: 'decimal' as const,
    };

    switch (type) {
      case 'currency':
        return {
          ...baseProps,
          startAdornment: 'R$',
        };
      case 'percentage':
        return {
          ...baseProps,
          endAdornment: '%',
        };
      default:
        return baseProps;
    }
  };

  return (
    <TextField
      {...textFieldProps}
      value={value}
      onChange={handleChange}
      variant={textFieldProps.variant || 'standard'}
      fullWidth
      slotProps={{
        input: getInputProps(),
      }}
    />
  );
};

export default CalculatorInput;