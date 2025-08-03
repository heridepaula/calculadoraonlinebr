"use client";

import React, { useState, useEffect } from "react";
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
  Divider,
} from "@mui/material";
import { Calculate, TrendingUp, EmojiEvents } from "@mui/icons-material";
import { componentStyles } from "@/src/styles/components";
import CurrencyInput from "@/components/CurrencyInput";
import { useAnalytics } from "@/hooks/useAnalytics";

interface PrimeiroMilhaoResult {
  tempoNecessario: number;
  aporteNecessario: number;
  totalInvestido: number;
  rendimentoTotal: number;
  tipoCalculo: 'tempo' | 'aporte';
  detalhesTemporais: string;
}

const PrimeiroMilhaoCalculator: React.FC = () => {
  const [valorInicial, setValorInicial] = useState<string>("0,00");
  const [valorMensal, setValorMensal] = useState<string>("0,00");
  const [taxaJuros, setTaxaJuros] = useState<number>(10);
  const [tipoCalculo, setTipoCalculo] = useState<string>("tempo");
  const [tempoMeta, setTempoMeta] = useState<number>(10);
  const [unidadeTempo, setUnidadeTempo] = useState<string>("anos");
  const [result, setResult] = useState<PrimeiroMilhaoResult | null>(null);
  const [error, setError] = useState<string>("");

  const analytics = useAnalytics();

  const parseCurrency = (value: string): number => {
    return parseFloat(value.replace(/\./g, "").replace(",", ".")) || 0;
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const calcularTempo = (inicial: number, mensal: number, taxa: number): number => {
    if (inicial >= 1000000) return 0;
    
    const taxaMensal = Math.pow(1 + taxa / 100, 1/12) - 1;
    let saldo = inicial;
    let meses = 0;

    while (saldo < 1000000 && meses < 1200) { // máximo 100 anos
      saldo = saldo * (1 + taxaMensal) + mensal;
      meses++;
    }

    return meses;
  };

  const calcularAporte = (inicial: number, tempo: number, taxa: number): number => {
    if (inicial >= 1000000) return 0;
    
    const meses = unidadeTempo === "anos" ? tempo * 12 : tempo;
    const taxaMensal = Math.pow(1 + taxa / 100, 1/12) - 1;
    
    // Fórmula para valor futuro com aportes mensais
    // VF = VI * (1 + i)^n + PMT * [((1 + i)^n - 1) / i]
    // Resolvendo para PMT: PMT = (VF - VI * (1 + i)^n) / [((1 + i)^n - 1) / i]
    
    const futuroDoInicial = inicial * Math.pow(1 + taxaMensal, meses);
    const fatorAporte = (Math.pow(1 + taxaMensal, meses) - 1) / taxaMensal;
    
    const aporteNecessario = (1000000 - futuroDoInicial) / fatorAporte;
    
    return Math.max(0, aporteNecessario);
  };

  const formatarTempo = (meses: number): string => {
    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;
    
    if (anos === 0) {
      return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
    } else if (mesesRestantes === 0) {
      return `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
    } else {
      return `${anos} ${anos === 1 ? 'ano' : 'anos'} e ${mesesRestantes} ${mesesRestantes === 1 ? 'mês' : 'meses'}`;
    }
  };

  const handleCalculate = () => {
    const startTime = performance.now();
    setError("");

    const valorInicialNum = parseCurrency(valorInicial);
    const valorMensalNum = parseCurrency(valorMensal);

    if (valorInicialNum < 0 || valorMensalNum < 0) {
      setError("Os valores não podem ser negativos.");
      analytics.trackError("primeiro-milhao", "negative_values");
      return;
    }

    if (taxaJuros <= 0 || taxaJuros > 50) {
      setError("A taxa de juros deve estar entre 0% e 50% ao ano.");
      analytics.trackError("primeiro-milhao", "invalid_interest_rate", `Taxa: ${taxaJuros}%`);
      return;
    }

    if (valorInicialNum >= 1000000) {
      setError("Parabéns! Você já possui mais de R$ 1.000.000,00!");
      analytics.trackCalculation("primeiro-milhao", { already_millionaire: true });
      return;
    }

    if (tipoCalculo === "tempo") {
      if (valorMensalNum <= 0 && valorInicialNum < 1000000) {
        setError("Para calcular o tempo, informe um valor de aporte mensal.");
        return;
      }

      const mesesNecessarios = calcularTempo(valorInicialNum, valorMensalNum, taxaJuros);
      
      if (mesesNecessarios >= 1200) {
        setError("Com esses valores, levaria mais de 100 anos. Considere aumentar o aporte mensal ou a taxa de juros.");
        return;
      }

      const totalInvestido = valorInicialNum + (valorMensalNum * mesesNecessarios);
      const rendimentoTotal = 1000000 - totalInvestido;

      const result = {
        tempoNecessario: mesesNecessarios,
        aporteNecessario: valorMensalNum,
        totalInvestido,
        rendimentoTotal,
        tipoCalculo: 'tempo' as const,
        detalhesTemporais: formatarTempo(mesesNecessarios)
      };

      setResult(result);

      // Track successful calculation
      const endTime = performance.now();
      analytics.trackCalculation("primeiro-milhao", {
        calculation_type: 'tempo',
        valor_inicial: valorInicialNum,
        valor_mensal: valorMensalNum,
        taxa_juros: taxaJuros,
        meses_necessarios: mesesNecessarios,
        total_investido: totalInvestido,
        rendimento_total: rendimentoTotal
      });
      analytics.trackPerformance("primeiro-milhao", endTime - startTime);
    } else {
      const mesesMeta = unidadeTempo === "anos" ? tempoMeta * 12 : tempoMeta;
      
      if (mesesMeta <= 0) {
        setError("O tempo deve ser maior que zero.");
        return;
      }

      const aporteNecessario = calcularAporte(valorInicialNum, tempoMeta, taxaJuros);
      
      if (aporteNecessario > 100000) {
        setError("O aporte necessário é muito alto. Considere aumentar o prazo ou a taxa de juros.");
        return;
      }

      const totalInvestido = valorInicialNum + (aporteNecessario * mesesMeta);
      const rendimentoTotal = 1000000 - totalInvestido;

      setResult({
        tempoNecessario: mesesMeta,
        aporteNecessario,
        totalInvestido,
        rendimentoTotal,
        tipoCalculo: 'aporte',
        detalhesTemporais: formatarTempo(mesesMeta)
      });
    }
  };

  const handleClear = () => {
    setValorInicial("0,00");
    setValorMensal("0,00");
    setTaxaJuros(10);
    setTipoCalculo("tempo");
    setTempoMeta(10);
    setUnidadeTempo("anos");
    setResult(null);
    setError("");
    analytics.trackClear("primeiro-milhao");
  };

  // Track quando resultado é visualizado
  useEffect(() => {
    if (result) {
      analytics.trackResultView("primeiro-milhao");
    }
  }, [result, analytics]);

  return (
    <Box sx={componentStyles.page.container}>
      <Paper sx={componentStyles.page.paper}>
        <Box sx={componentStyles.header.container}>
          <Typography variant="h4" sx={componentStyles.header.title}>
            <EmojiEvents sx={{ mr: 1, verticalAlign: "middle" }} />
            Calculadora do Primeiro Milhão
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={componentStyles.header.description}
          >
            Descubra quanto tempo ou qual aporte mensal você precisa para alcançar seu primeiro milhão
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ maxWidth: 500, mx: "auto", mb: 3 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>O que você quer calcular?</InputLabel>
            <Select
              value={tipoCalculo}
              label="O que você quer calcular?"
              variant="standard"
              onChange={(e) => setTipoCalculo(e.target.value)}
            >
              <MenuItem value="tempo">Tempo necessário</MenuItem>
              <MenuItem value="aporte">Aporte mensal necessário</MenuItem>
            </Select>
          </FormControl>

          <div style={{ marginBottom: 16 }}>
            <CurrencyInput
              label="Valor Inicial (R$)"
              initialValue={valorInicial}
              handleChange={setValorInicial}
            />
          </div>

          {tipoCalculo === "tempo" && (
            <div style={{ marginBottom: 16 }}>
              <CurrencyInput
                label="Aporte Mensal (R$)"
                initialValue={valorMensal}
                handleChange={setValorMensal}
              />
            </div>
          )}

          {tipoCalculo === "aporte" && (
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid size={{ xs: 8 }}>
                <TextField
                  label="Prazo para a meta"
                  type="number"
                  value={tempoMeta}
                  onChange={(e) => setTempoMeta(Number(e.target.value))}
                  variant="standard"
                  fullWidth
                  inputProps={{ min: 1, max: 50 }}
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>Período</InputLabel>
                  <Select
                    value={unidadeTempo}
                    label="Período"
                    variant="standard"
                    onChange={(e) => setUnidadeTempo(e.target.value)}
                  >
                    <MenuItem value="meses">Meses</MenuItem>
                    <MenuItem value="anos">Anos</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}

          <TextField
            label="Taxa de Juros (% ao ano)"
            type="number"
            value={taxaJuros}
            onChange={(e) => setTaxaJuros(Number(e.target.value))}
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
            inputProps={{ min: 0.1, max: 50, step: 0.5 }}
            helperText="Taxa anual esperada do investimento"
          />
        </Box>

        {result && (
          <Box sx={{ maxWidth: 600, mx: "auto", mb: 3 }}>
            <Paper sx={componentStyles.result.container}>
              <Typography variant="h6" sx={componentStyles.result.title}>
                <TrendingUp sx={{ mr: 1, verticalAlign: "middle" }} />
                Resultado da Simulação
              </Typography>

              <Box sx={componentStyles.result.valueContainer}>
                <Typography variant="h6" color="text.secondary">
                  🎯 Meta: Primeiro Milhão
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    ...componentStyles.result.value,
                    color: "success.main",
                  }}
                >
                  {formatCurrency(1000000)}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {result.tipoCalculo === 'tempo' ? (
                <Box sx={componentStyles.result.additionalInfo}>
                  <Box sx={componentStyles.result.additionalInfoItem}>
                    <Typography variant="body2">⏰ Tempo necessário:</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        ...componentStyles.result.additionalInfoValue,
                        color: "primary.main",
                        fontWeight: 'bold'
                      }}
                    >
                      {result.detalhesTemporais}
                    </Typography>
                  </Box>

                  <Box sx={componentStyles.result.additionalInfoItem}>
                    <Typography variant="body2">💰 Aporte mensal:</Typography>
                    <Typography
                      variant="body2"
                      sx={componentStyles.result.additionalInfoValue}
                    >
                      {formatCurrency(result.aporteNecessario)}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box sx={componentStyles.result.additionalInfo}>
                  <Box sx={componentStyles.result.additionalInfoItem}>
                    <Typography variant="body2">💰 Aporte mensal necessário:</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        ...componentStyles.result.additionalInfoValue,
                        color: "primary.main",
                        fontWeight: 'bold'
                      }}
                    >
                      {formatCurrency(result.aporteNecessario)}
                    </Typography>
                  </Box>

                  <Box sx={componentStyles.result.additionalInfoItem}>
                    <Typography variant="body2">⏰ Prazo definido:</Typography>
                    <Typography
                      variant="body2"
                      sx={componentStyles.result.additionalInfoValue}
                    >
                      {result.detalhesTemporais}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Box sx={componentStyles.result.additionalInfo}>
                <Box sx={componentStyles.result.additionalInfoItem}>
                  <Typography variant="body2">📊 Total investido:</Typography>
                  <Typography
                    variant="body2"
                    sx={componentStyles.result.additionalInfoValue}
                  >
                    {formatCurrency(result.totalInvestido)}
                  </Typography>
                </Box>

                <Box sx={componentStyles.result.additionalInfoItem}>
                  <Typography variant="body2">📈 Rendimento total:</Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      ...componentStyles.result.additionalInfoValue,
                      color: "success.main",
                    }}
                  >
                    {formatCurrency(result.rendimentoTotal)}
                  </Typography>
                </Box>
              </Box>

              <Alert severity="success" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  🎉 <strong>Parabéns!</strong> Com disciplina e consistência, você chegará ao seu primeiro milhão!
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
            Calcular Primeiro Milhão
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

export default PrimeiroMilhaoCalculator;