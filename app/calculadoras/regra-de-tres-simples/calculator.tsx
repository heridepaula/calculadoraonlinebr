'use client';

import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { useCalculator } from '@/lib/hooks/useCalculator';
import { parseBRLNumber } from '@/lib/utils/calculator';
import CalculatorHeader from '@/components/ui/CalculatorHeader';
import CalculatorInput from '@/components/ui/CalculatorInput';
import CalculatorActions from '@/components/ui/CalculatorActions';
import { CalculatorResult as CalculatorResultType, ValidationResult } from '@/lib/types/calculator';
import { componentStyles } from '@/src/styles/components';

interface RuleTresState {
  firstValue: string;
  secondValue: string;
  thirdValue: string;
}

interface RuleTresResult extends CalculatorResultType {
  symbol: string;
  explanation: string;
}

const RuleTresCalculatorRefactored: React.FC = () => {
  const initialState: RuleTresState = {
    firstValue: '',
    secondValue: '',
    thirdValue: '',
  };

  const validate = (state: RuleTresState): ValidationResult => {
    const { firstValue, secondValue, thirdValue } = state;
    
    if (!firstValue || !secondValue || !thirdValue) {
      return { valid: false, error: 'Preencha todos os campos' };
    }

    const firstNum = parseBRLNumber(firstValue);
    const secondNum = parseBRLNumber(secondValue);
    const thirdNum = parseBRLNumber(thirdValue);

    if (isNaN(firstNum) || isNaN(secondNum) || isNaN(thirdNum)) {
      return { valid: false, error: 'Todos os valores devem ser números válidos' };
    }

    if (firstNum === 0) {
      return { valid: false, error: 'O primeiro valor não pode ser zero' };
    }

    return { valid: true };
  };

  const calculate = (state: RuleTresState): RuleTresResult | null => {
    const firstNum = parseBRLNumber(state.firstValue);
    const secondNum = parseBRLNumber(state.secondValue);
    const thirdNum = parseBRLNumber(state.thirdValue);

    const result = (secondNum * thirdNum) / firstNum;
    const isDecimal = result % 1 !== 0;
    const formattedResult = isDecimal ? result.toFixed(3) : result.toString();

    return {
      value: formattedResult,
      isValid: true,
      symbol: isDecimal ? '≈' : '=',
      explanation: `${state.firstValue || 'A'} está para ${state.secondValue || 'B'}, assim como ${state.thirdValue || 'C'} está para ${formattedResult}`,
      message: 'A está para B, assim como C está para X',
    };
  };

  const { state, updateField, validation, result, handleClear } = useCalculator({
    initialState,
    validate,
    calculate,
  });


  return (
    <>
      <CalculatorHeader
        title="Regra de Três Simples"
        description="Estabeleça a relação entre as grandezas inserindo os valores conhecidos para encontrar o valor desconhecido através da regra de três."
      />

      <Grid container spacing={3}>
        {/* Primeira linha: A → B */}
        <Grid size={{ xs: 4 }}>
          <CalculatorInput
            label="A"
            value={state.firstValue}
            onChange={(value) => updateField('firstValue', value)}
            type="number"
            sx={componentStyles.input.centered}
            error={!!validation.error}
          />
        </Grid>
        <Grid size={{ xs: 4 }} sx={componentStyles.ruleOfThreeCalculator.arrowContainer}>
          <EastIcon sx={componentStyles.ruleOfThreeCalculator.arrowIcon} />
        </Grid>
        <Grid size={{ xs: 4 }}>
          <CalculatorInput
            label="B"
            value={state.secondValue}
            onChange={(value) => updateField('secondValue', value)}
            type="number"
            sx={componentStyles.input.centered}
          />
        </Grid>

        {/* Segunda linha: C → X */}
        <Grid size={{ xs: 4 }}>
          <CalculatorInput
            label="C"
            value={state.thirdValue}
            onChange={(value) => updateField('thirdValue', value)}
            type="number"
            sx={componentStyles.input.centered}
          />
        </Grid>
        <Grid size={{ xs: 4 }} sx={componentStyles.ruleOfThreeCalculator.arrowContainer}>
          <EastIcon sx={componentStyles.ruleOfThreeCalculator.arrowIcon} />
        </Grid>
        <Grid size={{ xs: 4 }}>
          <CalculatorInput
            label="X"
            value={result ? `${(result as RuleTresResult).symbol} ${result.value}` : '= ?'}
            onChange={() => {}}
            disabled
            sx={componentStyles.input.centered}
          />
        </Grid>

        {/* Resultado detalhado */}
        {result && (
          <Grid size={{ xs: 12 }}>
            <Box sx={componentStyles.ruleOfThreeCalculator.resultBox}>
              <Typography
                variant="h5"
                sx={componentStyles.ruleOfThreeCalculator.resultTitle}
              >
                X {(result as RuleTresResult).symbol} {result.value}
              </Typography>
              <Typography variant="body2" sx={componentStyles.ruleOfThreeCalculator.resultSubtitle}>
                {result.message}
              </Typography>
              <Typography
                variant="body1"
                sx={componentStyles.ruleOfThreeCalculator.resultExplanation}
              >
                {(result as RuleTresResult).explanation}
              </Typography>
            </Box>
          </Grid>
        )}

        {validation.error && (
          <Grid size={{ xs: 12 }}>
            <Typography color="error" variant="body2" textAlign="center">
              {validation.error}
            </Typography>
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <CalculatorActions
            onClear={handleClear}
            layout="clear-only"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default RuleTresCalculatorRefactored;