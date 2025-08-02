'use client';

import React from 'react';
import { Box, Typography, Alert, alpha } from '@mui/material';
import { CalculatorResult as CalculatorResultType } from '@/lib/types/calculator';
import { componentStyles, createColoredStyle } from '@/src/styles/components';

interface CalculatorResultProps {
  result: CalculatorResultType | null;
  title?: string;
  showOnlyWhenValid?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

const CalculatorResult: React.FC<CalculatorResultProps> = ({
  result,
  title = 'Resultado',
  showOnlyWhenValid = true,
  variant = 'default',
}) => {
  if (!result || (showOnlyWhenValid && !result.isValid)) {
    return null;
  }

  const getResultColor = () => {
    if (result.category === 'success' || result.category === 'Peso Saudável') {
      return '#4caf50';
    }
    if (result.category === 'warning' || result.category?.includes('Sobrepeso')) {
      return '#ff9800';
    }
    if (result.category === 'error' || result.category?.includes('Obesidade')) {
      return '#f44336';
    }
    return '#1976d2';
  };

  const resultColor = getResultColor();

  if (variant === 'compact') {
    return (
      <Box
        sx={{
          ...componentStyles.result.compactContainer,
          ...createColoredStyle(resultColor, 0.1),
          border: `1px solid ${alpha(resultColor, 0.3)}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            ...componentStyles.result.compactValue,
            color: resultColor,
          }}
        >
          {typeof result.value === 'number' 
            ? result.value.toLocaleString('pt-BR') 
            : result.value}
        </Typography>
        {result.message && (
          <Typography variant="body2" color="text.secondary">
            {result.message}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        ...componentStyles.result.container,
        border: `2px solid ${alpha(resultColor, 0.3)}`,
        backgroundColor: alpha(resultColor, 0.05),
      }}
    >
      <Typography
        variant="h6"
        sx={{
          ...componentStyles.result.title,
          color: resultColor,
        }}
      >
        {title}
      </Typography>

      <Box sx={componentStyles.result.valueContainer}>
        <Typography
          variant="h4"
          sx={{
            ...componentStyles.result.value,
            color: resultColor,
          }}
        >
          {typeof result.value === 'number' 
            ? result.value.toLocaleString('pt-BR') 
            : result.value}
        </Typography>
        {result.category && (
          <Typography
            variant="subtitle1"
            sx={{
              ...componentStyles.result.category,
              color: resultColor,
            }}
          >
            {result.category}
          </Typography>
        )}
      </Box>

      {result.message && (
        <Alert
          severity="info"
          sx={{
            backgroundColor: alpha(resultColor, 0.1),
            border: `1px solid ${alpha(resultColor, 0.2)}`,
            '& .MuiAlert-icon': {
              color: resultColor,
            },
          }}
        >
          {result.message}
        </Alert>
      )}

      {result.additionalInfo && (
        <Box sx={componentStyles.result.additionalInfo}>
          {Object.entries(result.additionalInfo).map(([key, value]) => (
            <Typography
              key={key}
              variant="body2"
              sx={componentStyles.result.additionalInfoItem}
            >
              <span>{key}:</span>
              <span style={componentStyles.result.additionalInfoValue}>{value}</span>
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CalculatorResult;