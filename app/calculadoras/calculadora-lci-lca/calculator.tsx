"use client";

import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { Calculate, TrendingUp } from "@mui/icons-material";
import { componentStyles } from "@/src/styles/components";
import CurrencyInput from "@/components/CurrencyInput";

interface LciLcaResult {
  totalInvestido: number;
  totalRendimento: number;
  valorFinal: number;
  rendimentoMensal: number;
  rentabilidadeTotal: number;
  rentabilidadeAnual: number;
}

const LciLcaCalculator: React.FC = () => {
  const [valorInicial, setValorInicial] = useState<string>("0,00");
  const [valorMensal, setValorMensal] = useState<string>("0,00");
  const [periodo, setPeriodo] = useState<number>(12);
  const [unidadePeriodo, setUnidadePeriodo] = useState<string>("meses");
  const [taxaCdi, setTaxaCdi] = useState<number>(100);
  const [tipoRendimento, setTipoRendimento] = useState<string>("pos");
  const [taxaPre, setTaxaPre] = useState<number>(12);
  const [taxaSelic, setTaxaSelic] = useState<number>(15);
  const [result, setResult] = useState<LciLcaResult | null>(null);
  const [error, setError] = useState<string>("");

  const parseCurrency = (value: string): number => {
    return parseFloat(value.replace(/\./g, "").replace(",", ".")) || 0;
  };

  const handleCalculate = () => {
    setError("");

    const valorInicialNum = parseCurrency(valorInicial);
    const valorMensalNum = parseCurrency(valorMensal);

    if (valorInicialNum <= 0 && valorMensalNum <= 0) {
      setError("Informe pelo menos o valor inicial ou o investimento mensal.");
      return;
    }

    if (periodo <= 0) {
      setError("O período deve ser maior que zero.");
      return;
    }

    if (tipoRendimento === "pos" && (taxaCdi <= 0 || taxaCdi > 200)) {
      setError("A taxa CDI deve estar entre 0% e 200%.");
      return;
    }

    if (tipoRendimento === "pre" && (taxaPre <= 0 || taxaPre > 50)) {
      setError("A taxa pré-fixada deve estar entre 0% e 50%.");
      return;
    }

    const mesesTotal = unidadePeriodo === "anos" ? periodo * 12 : periodo;
    
    // CDI aproximado (normalmente próximo à SELIC)
    const cdiAtual = taxaSelic;
    
    let taxaMensal: number;
    if (tipoRendimento === "pos") {
      const taxaAnual = (taxaCdi / 100) * cdiAtual;
      taxaMensal = Math.pow(1 + taxaAnual / 100, 1/12) - 1;
    } else {
      taxaMensal = Math.pow(1 + taxaPre / 100, 1/12) - 1;
    }

    let totalInvestido = valorInicialNum;
    let valorFinal = valorInicialNum;

    // Cálculo com aportes mensais
    for (let mes = 1; mes <= mesesTotal; mes++) {
      valorFinal = valorFinal * (1 + taxaMensal);
      if (mes <= mesesTotal) {
        valorFinal += valorMensalNum;
        totalInvestido += valorMensalNum;
      }
    }

    const totalRendimento = valorFinal - totalInvestido;
    const rendimentoMensal = totalRendimento / mesesTotal;
    const rentabilidadeTotal = ((valorFinal / totalInvestido) - 1) * 100;
    const rentabilidadeAnual = (Math.pow(valorFinal / totalInvestido, 12 / mesesTotal) - 1) * 100;

    setResult({
      totalInvestido,
      totalRendimento,
      valorFinal,
      rendimentoMensal,
      rentabilidadeTotal,
      rentabilidadeAnual,
    });
  };

  const handleClear = () => {
    setValorInicial("0,00");
    setValorMensal("0,00");
    setPeriodo(12);
    setUnidadePeriodo("meses");
    setTaxaCdi(100);
    setTipoRendimento("pos");
    setTaxaPre(12);
    setTaxaSelic(15);
    setResult(null);
    setError("");
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <Box sx={componentStyles.page.container}>
      <Paper sx={componentStyles.page.paper}>
        <Box sx={componentStyles.header.container}>
          <Typography variant="h4" sx={componentStyles.header.title}>
            <Calculate sx={{ mr: 1, verticalAlign: "middle" }} />
            Calculadora LCI e LCA
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={componentStyles.header.description}
          >
            Calcule o rendimento dos seus investimentos em LCI e LCA com isenção de Imposto de Renda
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ maxWidth: 500, mx: "auto", mb: 3 }}>
          <TextField
            label="Taxa SELIC Atual (% ao ano)"
            type="number"
            value={taxaSelic}
            onChange={(e) => setTaxaSelic(Number(e.target.value))}
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
            inputProps={{ min: 1, max: 30, step: 0.25 }}
            helperText="Taxa SELIC utilizada como referência para o CDI"
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tipo de Rendimento</InputLabel>
            <Select
              value={tipoRendimento}
              label="Tipo de Rendimento"
              variant="standard"
              onChange={(e) => setTipoRendimento(e.target.value)}
            >
              <MenuItem value="pos">Pós-fixado (% do CDI)</MenuItem>
              <MenuItem value="pre">Pré-fixado (% ao ano)</MenuItem>
            </Select>
          </FormControl>

          <div style={{ marginBottom: 16 }}>
            <CurrencyInput
              label="Valor Inicial (R$)"
              initialValue={valorInicial}
              handleChange={setValorInicial}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <CurrencyInput
              label="Investimento Mensal (R$)"
              initialValue={valorMensal}
              handleChange={setValorMensal}
            />
          </div>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 8 }}>
              <TextField
                label="Período"
                type="number"
                value={periodo}
                onChange={(e) => setPeriodo(Number(e.target.value))}
                variant="standard"
                fullWidth
                inputProps={{ min: 1, max: 50 }}
              />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Período</InputLabel>
                <Select
                  value={unidadePeriodo}
                  label="Período"
                  variant="standard"
                  onChange={(e) => setUnidadePeriodo(e.target.value)}
                >
                  <MenuItem value="meses">Meses</MenuItem>
                  <MenuItem value="anos">Anos</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {tipoRendimento === "pos" ? (
            <TextField
              label="Taxa (% do CDI)"
              type="number"
              value={taxaCdi}
              onChange={(e) => setTaxaCdi(Number(e.target.value))}
              variant="standard"
              fullWidth
              sx={{ mb: 2 }}
              inputProps={{ min: 50, max: 200, step: 5 }}
              helperText="Ex: 100% = 100% do CDI atual"
            />
          ) : (
            <TextField
              label="Taxa Pré-fixada (% ao ano)"
              type="number"
              value={taxaPre}
              onChange={(e) => setTaxaPre(Number(e.target.value))}
              variant="standard"
              fullWidth
              sx={{ mb: 2 }}
              inputProps={{ min: 1, max: 50, step: 0.5 }}
              helperText="Taxa anual fixa"
            />
          )}
        </Box>

        {result && (
          <Box sx={{ maxWidth: 600, mx: "auto", mb: 3 }}>
            <Paper sx={componentStyles.result.container}>
                <Typography variant="h6" sx={componentStyles.result.title}>
                  <TrendingUp sx={{ mr: 1, verticalAlign: "middle" }} />
                  Resultado da Simulação
                </Typography>

                <Box sx={componentStyles.result.additionalInfo}>
                  <Box sx={componentStyles.result.additionalInfoItem}>
                    <Typography variant="body2">Total Investido:</Typography>
                    <Typography
                      variant="body2"
                      sx={componentStyles.result.additionalInfoValue}
                    >
                      {formatCurrency(result.totalInvestido)}
                    </Typography>
                  </Box>

                  <Box sx={componentStyles.result.additionalInfoItem}>
                    <Typography variant="body2">Rendimento Total:</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        ...componentStyles.result.additionalInfoValue,
                        color: "success.main",
                      }}
                    >
                      {formatCurrency(result.totalRendimento)}
                    </Typography>
                  </Box>

                  <Box sx={componentStyles.result.additionalInfoItem}>
                    <Typography variant="body2">Rendimento Mensal Médio:</Typography>
                    <Typography
                      variant="body2"
                      sx={componentStyles.result.additionalInfoValue}
                    >
                      {formatCurrency(result.rendimentoMensal)}
                    </Typography>
                  </Box>

                  <Box sx={componentStyles.result.additionalInfoItem}>
                    <Typography variant="body2">Rentabilidade Total:</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        ...componentStyles.result.additionalInfoValue,
                        color: "success.main",
                      }}
                    >
                      {formatPercentage(result.rentabilidadeTotal)}
                    </Typography>
                  </Box>

                  <Box sx={componentStyles.result.additionalInfoItem}>
                    <Typography variant="body2">Rentabilidade Anual:</Typography>
                    <Typography
                      variant="body2"
                      sx={componentStyles.result.additionalInfoValue}
                    >
                      {formatPercentage(result.rentabilidadeAnual)}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={componentStyles.result.valueContainer}>
                  <Typography variant="h6" color="text.secondary">
                    Valor Final:
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      ...componentStyles.result.value,
                      color: "success.main",
                    }}
                  >
                    {formatCurrency(result.valorFinal)}
                  </Typography>
                </Box>

                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    ✅ <strong>Isenção de IR:</strong> LCI e LCA são isentos de Imposto de Renda para pessoas físicas
                  </Typography>
                </Alert>
            </Paper>
          </Box>
        )}

        <Box sx={componentStyles.actions.stackedContainer}>
          <Button
            variant="contained"
            size="large"
            onClick={handleCalculate}
            sx={componentStyles.actions.buttonPrimary}
            startIcon={<Calculate />}
          >
            Calcular Rendimento
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleClear}
            sx={componentStyles.actions.buttonSecondary}
          >
            Limpar Campos
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LciLcaCalculator;