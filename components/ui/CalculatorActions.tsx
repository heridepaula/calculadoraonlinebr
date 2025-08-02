'use client';

import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { componentStyles } from '@/src/styles/components';

interface CalculatorActionsProps {
  onCalculate?: () => void;
  onClear: () => void;
  calculateLabel?: string;
  clearLabel?: string;
  showCalculateButton?: boolean;
  disabled?: boolean;
  layout?: 'side-by-side' | 'stacked' | 'clear-only';
}

const CalculatorActions: React.FC<CalculatorActionsProps> = ({
  onCalculate,
  onClear,
  calculateLabel = 'Calcular',
  clearLabel = 'Limpar',
  showCalculateButton = true,
  disabled = false,
  layout = 'side-by-side',
}) => {
  if (layout === 'clear-only') {
    return (
      <Box sx={componentStyles.actions.clearOnlyContainer}>
        <Button
          variant="outlined"
          color="error"
          onClick={onClear}
          disabled={disabled}
          sx={componentStyles.actions.buttonClearOnly}
        >
          {clearLabel}
        </Button>
      </Box>
    );
  }

  if (layout === 'stacked') {
    return (
      <Box sx={componentStyles.actions.stackedContainer}>
        {showCalculateButton && onCalculate && (
          <Button
            variant="contained"
            color="primary"
            onClick={onCalculate}
            disabled={disabled}
            sx={componentStyles.actions.buttonPrimary}
          >
            {calculateLabel}
          </Button>
        )}
        <Button
          variant="outlined"
          color="error"
          onClick={onClear}
          disabled={disabled}
          sx={componentStyles.actions.buttonSecondary}
        >
          {clearLabel}
        </Button>
      </Box>
    );
  }

  return (
    <Grid container spacing={2} sx={componentStyles.actions.container}>
      {showCalculateButton && onCalculate && (
        <Grid size={{ xs: 6 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onCalculate}
            disabled={disabled}
            fullWidth
            sx={componentStyles.actions.buttonPrimary}
          >
            {calculateLabel}
          </Button>
        </Grid>
      )}
      <Grid size={{ xs: showCalculateButton && onCalculate ? 6 : 12 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={onClear}
          disabled={disabled}
          fullWidth
          sx={componentStyles.actions.buttonSecondary}
        >
          {clearLabel}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CalculatorActions;