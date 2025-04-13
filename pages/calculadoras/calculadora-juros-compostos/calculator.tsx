import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const Calculator = () => {
  const [initialValue, setInitialValue] = React.useState(0);
  const [interestRate, setInterestRate] = React.useState(0);
  const [period, setPeriod] = React.useState(0);
  const [monthlyContribution, setMonthlyContribution] = React.useState(0);
  const [finalAmount, setFinalAmount] = React.useState(0);
  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Calculadora de Juros Compostos
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 3 }}>
        Insira os valores abaixo para calcular o montante final.
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Capital Inicial (R$)"
            variant="standard"
            onChange={(e) => setInitialValue(Number(e.target.value))}
            value={initialValue}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Taxa de Juros (% ao mês)"
            variant="standard"
            onChange={(e) => setInterestRate(Number(e.target.value))}
            value={interestRate}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField 
            label="Período (meses)" 
            variant="standard" 
            onChange={(e) => setPeriod(Number(e.target.value))}
            value={period}
            fullWidth />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Aporte Mensal (R$)"
            variant="standard"
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            value={monthlyContribution}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12 }} sx={{ width: "100%" }}>
          <Box
            sx={{
              padding: 2,
              textAlign: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" color="primary">
              Montante Final: R$ {finalAmount.toFixed(2)}
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ paddingY: 1.5, fontSize: "1rem" }}
            onClick={() => {
                console.log(initialValue, interestRate, period, monthlyContribution);
              const montanteFinal =
                initialValue * Math.pow(1 + interestRate / 100, period) +
                monthlyContribution * ((Math.pow(1 + interestRate / 100, period) - 1) / (interestRate / 100));
              setFinalAmount(montanteFinal);
            }}
            fullWidth
          >
            Calcular
          </Button>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Button
            variant="outlined"
            color="error"
            sx={{ paddingY: 1.5, fontSize: "1rem" }}
            onClick={() => {
              setInitialValue(0);
              setInterestRate(0);
              setPeriod(0);
              setMonthlyContribution(0);
              setFinalAmount(0);
            }}
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
