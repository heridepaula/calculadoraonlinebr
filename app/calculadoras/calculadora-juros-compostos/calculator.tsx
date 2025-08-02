"use client";

import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import CurrencyInput from "../../../components/CurrencyInput";
import ReinvestedProps from "@/models/interfaces/ReinvestedProps";
import MonthlyResult from "@/models/interfaces/MonthlyResult";

const Calculator: React.FC<ReinvestedProps> = ({ setMonthlyResults }) => {
  const [initialAmount, setInitialAmount] = useState("0,00");
  const [monthlyRate, setMonthlyRate] = useState("0,00");
  const [period, setPeriod] = useState(0);
  const [monthlyDeposit, setMonthlyDeposit] = useState("0,00");
  const [finalValue, setFinalValue] = useState(0);
  const [totalContributed, setTotalContributed] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const calculateCompoundInterest = () => {
    const results: MonthlyResult[] = [];

    const parseBRL = (value: string) => {
      return parseFloat(value.replace(/\./g, "").replace(",", "."));
    };

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
    setTotalContributed(initialPrincipal + monthlyContribution * numberOfMonths);
    setTotalEarnings(
      currentPrincipal - (initialPrincipal + monthlyContribution * numberOfMonths)
    );
  };

  const clearFields = () => {
    setInitialAmount("0,00");
    setMonthlyRate("0,00");
    setPeriod(0);
    setMonthlyDeposit("0,00");
    setFinalValue(0);
    setTotalContributed(0);
    setTotalEarnings(0);
  };

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
        <Grid size={{ xs: 12 }} sx={{ width: "100%" }}>
          <Box
            sx={{
              padding: 2,
              textAlign: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              ...(finalValue === null && { display: "none" }),
            }}
          >
            {finalValue !== null && (
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
                  {totalContributed !== null &&
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
                  {totalEarnings !== null &&
                    totalEarnings.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                </Typography>
              </>
            )}
          </Box>
        </Grid>
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
