"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import CurrencyInput from "../../../components/CurrencyInput";
import ReinvestedProps from "@/models/interfaces/ReinvestedProps";
import MonthlyResult from "@/models/interfaces/MonthlyResult";
import { useAnalytics } from "@/hooks/useAnalytics";

const Calculator: React.FC<ReinvestedProps> = ({ setMonthlyResults }) => {
  const [initialAmount, setInitialAmount] = useState("0,00");
  const [monthlyRate, setMonthlyRate] = useState("0,00");
  const [period, setPeriod] = useState(0);
  const [monthlyDeposit, setMonthlyDeposit] = useState("0,00");
  const [finalValue, setFinalValue] = useState(0);
  const [totalContributed, setTotalContributed] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const analytics = useAnalytics();

  const parseBRL = useCallback((value: string) => {
    return parseFloat(value.replace(/\./g, "").replace(",", "."));
  }, []);

  const calculateCompoundInterest = useCallback(() => {
    const startTime = performance.now();
    const results: MonthlyResult[] = [];

    const initialPrincipal = parseBRL(initialAmount);
    const monthlyInterestRate = parseBRL(monthlyRate) / 100;
    const monthlyContribution = parseBRL(monthlyDeposit);
    const numberOfMonths = period;

    let currentPrincipal = initialPrincipal;

    for (let month = 1; month <= numberOfMonths; month++) {
      const monthlyInterest = currentPrincipal * monthlyInterestRate;
      const yearsDivisor = month / 12;
      const remainingMonths = month % 12;
      let periodLabel = "";

      if (Math.floor(yearsDivisor) === 0) {
        periodLabel = `${remainingMonths} meses`;
      } else {
        if (remainingMonths === 0) {
          periodLabel = `${Math.floor(yearsDivisor)} anos`;
        } else {
          periodLabel = `${Math.floor(yearsDivisor)} anos e ${remainingMonths} meses`;
        }
      }

      currentPrincipal += monthlyInterest + monthlyContribution;

      results.push({
        month: periodLabel,
        income: monthlyInterest,
        invested: monthlyContribution,
        outcome: currentPrincipal,
      });
    }

    setMonthlyResults(results);
    setFinalValue(currentPrincipal);
    const totalContrib = initialPrincipal + monthlyContribution * numberOfMonths;
    const totalEarn = currentPrincipal - totalContrib;
    setTotalContributed(totalContrib);
    setTotalEarnings(totalEarn);

    // Track successful calculation
    const endTime = performance.now();
    analytics.trackCalculation("juros-compostos", {
      valor_inicial: initialPrincipal,
      taxa_mensal: monthlyInterestRate * 100,
      periodo_meses: numberOfMonths,
      aporte_mensal: monthlyContribution,
      valor_final: currentPrincipal,
      total_investido: totalContrib,
      rendimento_total: totalEarn
    });
    analytics.trackPerformance("juros-compostos", endTime - startTime);
  }, [initialAmount, monthlyRate, period, monthlyDeposit, parseBRL, setMonthlyResults, analytics]);

  const clearFields = useCallback(() => {
    setInitialAmount("0,00");
    setMonthlyRate("0,00");
    setPeriod(0);
    setMonthlyDeposit("0,00");
    setFinalValue(0);
    setTotalContributed(0);
    setTotalEarnings(0);
    analytics.trackClear("juros-compostos");
  }, [analytics]);

  // Track quando resultado é visualizado
  useEffect(() => {
    if (finalValue > 0) {
      analytics.trackResultView("juros-compostos");
    }
  }, [finalValue, analytics]);

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Calculadora de Juros Compostos
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 3 }}>
        Insira os valores abaixo para calcular o resultado final do seu
        investimento.
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={initialAmount}
            handleChange={setInitialAmount}
            label="Valor Inicial (R$)"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={monthlyRate}
            handleChange={setMonthlyRate}
            label="Taxa de Juros % (a.m.)"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Período (meses)"
            variant="standard"
            onChange={(e) => setPeriod(Number(e.target.value))}
            value={period}
            slotProps={{ input: { type: "numeric" } }}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={monthlyDeposit}
            handleChange={setMonthlyDeposit}
            label="Aporte mensal (R$)"
          />
        </Grid>
        {useMemo(() => (
          <Grid size={{ xs: 12 }} sx={{ width: "100%" }}>
            <Box
              sx={{
                padding: 2,
                textAlign: "center",
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                ...(finalValue === 0 && { display: "none" }),
              }}
            >
              {finalValue > 0 && (
                <>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#1a1a1a",
                      fontWeight: "bold",
                      marginBottom: 1,
                    }}
                  >
                    Valor Final:{" "}
                    {finalValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Investido:{" "}
                    {totalContributed > 0 &&
                      totalContributed.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      color: "#4c814f",
                    }}
                  >
                    Total em Juros:{" "}
                    {totalEarnings > 0 &&
                      totalEarnings.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                  </Typography>
                </>
              )}
            </Box>
          </Grid>
        ), [finalValue, totalContributed, totalEarnings])}
        <Grid size={{ xs: 6 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              paddingY: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              backgroundColor: "#1976d2",
              color: "#fff",
              boxShadow: "0px 4px 12px rgba(25, 118, 210, 0.4)",
              "&:hover": {
                backgroundColor: "#1565c0",
                boxShadow: "0px 6px 16px rgba(21, 101, 192, 0.5)",
              },
            }}
            onClick={calculateCompoundInterest}
            fullWidth
          >
            Calcular
          </Button>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Button
            variant="outlined"
            color="error"
            sx={{
              paddingY: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              borderColor: "#d32f2f",
              color: "#d32f2f",
              "&:hover": {
                backgroundColor: "#ffe6e6",
                borderColor: "#b71c1c",
                color: "#b71c1c",
              },
            }}
            onClick={clearFields}
            fullWidth
          >
            Limpar
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Calculator;
