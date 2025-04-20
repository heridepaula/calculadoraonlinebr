"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import CurrencyInput from "@/components/CurrencyInput";

interface IMCCalculatorProps {}

const IMCCalculator: React.FC<IMCCalculatorProps> = () => {
  const [peso, setPeso] = useState<string>("");
  const [altura, setAltura] = useState<string>("");
  const [imc, setImc] = useState<number | null>(null);
  const [classificacao, setClassificacao] = useState<string>("");
  const [textoInformativo, setTextoInformativo] = useState<string>("");
  const [pesoIdealMin, setPesoIdealMin] = useState<number | null>(null);
  const [pesoIdealMax, setPesoIdealMax] = useState<number | null>(null);
  const [resultadoColor, setResultadoColor] = useState<string>("");
  const theme = useTheme();

  const calcularIMC = () => {
    const pesoNum = Number(peso?.replace(",", "."));
    const alturaNum = Number(altura?.replace(",", "."));

    if (!isNaN(pesoNum) && !isNaN(alturaNum) && alturaNum > 0) {
      const imcCalculado = pesoNum / (alturaNum * alturaNum);
      setImc(imcCalculado);
      interpretarIMC(imcCalculado, alturaNum);
    } else {
      setImc(null);
      setClassificacao("Erro");
      setTextoInformativo("Preencha peso e altura corretamente.");
      setPesoIdealMin(null);
      setPesoIdealMax(null);
      setResultadoColor(theme.palette.text.secondary);
    }
  };

  const interpretarIMC = (imcValor: number, altura: number) => {
    const pesoIdealMinCalculado = parseFloat(
      (18.5 * altura * altura).toFixed(2)
    );
    const pesoIdealMaxCalculado = parseFloat(
      (24.9 * altura * altura).toFixed(2)
    );
    setPesoIdealMin(pesoIdealMinCalculado);
    setPesoIdealMax(pesoIdealMaxCalculado);

    if (imcValor < 16) {
      setClassificacao("Magreza Severa");
      setTextoInformativo("Peso muito abaixo do ideal.");
      setResultadoColor(theme.palette.error.dark);
    } else if (imcValor >= 16 && imcValor < 17) {
      setClassificacao("Magreza Moderada");
      setTextoInformativo("Peso abaixo do saudável.");
      setResultadoColor(theme.palette.warning.dark);
    } else if (imcValor >= 17 && imcValor < 18.5) {
      setClassificacao("Magreza Leve");
      setTextoInformativo("Peso um pouco abaixo do saudável.");
      setResultadoColor(theme.palette.warning.main);
    } else if (imcValor >= 18.5 && imcValor < 25) {
      setClassificacao("Peso Saudável");
      setTextoInformativo("Peso dentro da faixa considerada saudável.");
      setResultadoColor(theme.palette.success.dark);
    } else if (imcValor >= 25 && imcValor < 30) {
      setClassificacao("Sobrepeso");
      setTextoInformativo("Peso acima do considerado saudável.");
      setResultadoColor(theme.palette.warning.main);
    } else if (imcValor >= 30 && imcValor < 35) {
      setClassificacao("Obesidade Grau I");
      setTextoInformativo("Obesidade com risco moderado.");
      setResultadoColor(theme.palette.error.main);
    } else if (imcValor >= 35 && imcValor < 40) {
      setClassificacao("Obesidade Grau II");
      setTextoInformativo("Obesidade com risco significativo.");
      setResultadoColor(theme.palette.error.dark);
    } else if (imcValor >= 40) {
      setClassificacao("Obesidade Grau III");
      setTextoInformativo("Obesidade com risco muito elevado.");
      setResultadoColor(theme.palette.error.dark);
    }
  };

  const handleChangePeso = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const valid = /^[0-9.,]*$/.test(input);
    if (valid) {
      setPeso(input.replace(".", ","));
    }
  };

  const clearFields = () => {
    setPeso("");
    setAltura("");
    setImc(null);
    setClassificacao("");
    setTextoInformativo("");
    setPesoIdealMin(null);
    setPesoIdealMax(null);
    setResultadoColor("");
  };

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Calculadora de IMC
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 3 }}>
        Informe seu peso e altura para calcular o Índice de Massa Corporal
        (IMC).
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Peso (kg)"
            variant="standard"
            onChange={handleChangePeso}
            value={peso}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            label="Altura (m)"
            handleChange={setAltura}
            initialValue={altura}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              padding: 2,
              textAlign: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              ...(imc === null && { display: "none" }),
            }}
          >
            {imc !== null && (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#1a1a1a",
                    marginBottom: 0.5,
                  }}
                >
                  IMC
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    color: "#1a1a1a",
                    marginBottom: 0.5,
                  }}
                >
                  {imc.toFixed(2)}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    color: resultadoColor,
                    marginBottom: 0.5,
                  }}
                >
                  Classificação: {classificacao}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  marginBottom={0.5}
                >
                  {textoInformativo}
                </Typography>
                {pesoIdealMin !== null && pesoIdealMax !== null && (
                  <Typography variant="body2" color="textSecondary">
                    Peso ideal para sua altura: entre{" "}
                    <Typography component="span" sx={{ fontWeight: "bold" }}>
                      {pesoIdealMin} kg
                    </Typography>{" "}
                    e{" "}
                    <Typography component="span" sx={{ fontWeight: "bold" }}>
                      {pesoIdealMax} kg
                    </Typography>
                  </Typography>
                )}
              </>
            )}
            {classificacao === "Erro" && (
              <Typography variant="body1" color={resultadoColor}>
                {textoInformativo}
              </Typography>
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
            onClick={calcularIMC}
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

export default IMCCalculator;
