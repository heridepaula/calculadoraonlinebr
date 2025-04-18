"use client";

import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import CurrencyInput from "../../../components/CurrencyInput";

const Calculator = () => {
  const [initialValue, setInitialValue] = useState("0,00");
  const [interestRate, setInterestRate] = useState("0,00");
  const [period, setPeriod] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState("0,00");
  const [finalAmount, setFinalAmount] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const calculateCompoundInterest = () => {
    const parseBRL = (value: string) => {
      return parseFloat(value.replace(/\./g, "").replace(",", "."));
    };

    const principal = parseBRL(initialValue);
    const interest = parseBRL(interestRate) / 100;
    const monthly = parseBRL(monthlyContribution);

    let calculatedAmount = 0;
    if (interest === 0) {
      calculatedAmount = principal + monthly * period;
    } else {
      calculatedAmount =
        principal * Math.pow(1 + interest, period) +
        monthly * ((Math.pow(1 + interest, period) - 1) / interest);
    }

    setFinalAmount(calculatedAmount);
    setTotalInvested(principal + monthly * period);
    setTotalInterest(calculatedAmount - (principal + monthly * period));
  };

  const clearFields = () => {
    setInitialValue("0,00");
    setInterestRate("0,00");
    setPeriod(0);
    setMonthlyContribution("0,00");
    setFinalAmount(0);
    setTotalInvested(0);
    setTotalInterest(0);
  };

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Calculadora de Juros Compostos
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 3 }}>
        Insira os valores abaixo para calcular o resultado final do seu investimento.
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={initialValue}
            handleChange={setInitialValue}
            label="Valor Inicial (R$)"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            initialValue={interestRate}
            handleChange={setInterestRate}
            label="Taxa de Juros (%)"
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
            initialValue={monthlyContribution}
            handleChange={setMonthlyContribution}
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
              ...(finalAmount === null && { display: 'none' }),
            }}
          >
            {finalAmount !== null && (
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
                  {finalAmount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Investido:{" "}
                  {totalInvested !== null && totalInvested.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: '#4c814f',
                  }}
                >
                  Total em Juros:{" "}
                  {totalInterest !== null && totalInterest.toLocaleString("pt-BR", {
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
