"use client";

import React, { useCallback, useMemo, useState } from "react";
import { alpha } from "@mui/material/styles";

import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  LinearProgress,
  useTheme,
  Alert,
} from "@mui/material";
import CurrencyInput from "@/components/CurrencyInput";

interface BMIResult {
  value: number;
  category: string;
  message: string;
  idealRange: [number, number];
  color: string;
  progress: number;
}

const getBMIClassification = (imc: number, theme: any): BMIResult => {
  const baseResult = {
    value: imc,
    idealRange: [0, 0] as [number, number],
    progress: Math.min((imc / 40) * 100, 100),
  };

  if (imc < 16)
    return {
      ...baseResult,
      category: "Magreza Severa",
      message: "Peso muito abaixo do ideal. Consulte um nutricionista.",
      color: theme.palette.error.dark,
    };
  if (imc < 17)
    return {
      ...baseResult,
      category: "Magreza Moderada",
      message: "Peso abaixo do saudável. Acompanhe sua evolução.",
      color: theme.palette.warning.dark,
    };
  if (imc < 18.5)
    return {
      ...baseResult,
      category: "Magreza Leve",
      message: "Peso um pouco abaixo do saudável.",
      color: theme.palette.warning.main,
    };
  if (imc < 25)
    return {
      ...baseResult,
      category: "Peso Saudável",
      message: "Parabéns! Seu peso está na faixa ideal.",
      color: theme.palette.success.dark,
    };
  if (imc < 30)
    return {
      ...baseResult,
      category: "Sobrepeso",
      message: "Peso acima do considerado saudável. Cuidado com a dieta.",
      color: theme.palette.warning.main,
    };
  if (imc < 35)
    return {
      ...baseResult,
      category: "Obesidade Grau I",
      message: "Risco moderado. Recomendamos acompanhamento médico.",
      color: theme.palette.error.main,
    };
  if (imc < 40)
    return {
      ...baseResult,
      category: "Obesidade Grau II",
      message: "Risco significativo. Procure orientação profissional.",
      color: theme.palette.error.dark,
    };
  return {
    ...baseResult,
    category: "Obesidade Grau III",
    message: "Risco muito elevado. Necessário intervenção médica.",
    color: theme.palette.error.dark,
  };
};

const IMCCalculator: React.FC = () => {
  const theme = useTheme();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [touched, setTouched] = useState(false);

  const { valid, error } = useMemo(() => {
    const weightNum = parseFloat(weight.replace(",", "."));
    const heightNum = parseFloat(height.replace(",", "."));

    return {
      valid:
        !isNaN(weightNum) &&
        weightNum > 0 &&
        weightNum <= 600 &&
        !isNaN(heightNum) &&
        heightNum > 0.5 &&
        heightNum <= 3,
      error: touched && (!weight || !height) ? "Preencha ambos os campos" : "",
    };
  }, [weight, height, touched]);

  const result = useMemo<BMIResult | null>(() => {
    if (!valid) return null;

    const weightNum = parseFloat(weight.replace(",", "."));
    const heightNum = parseFloat(height.replace(",", "."));
    const imcValue = weightNum / heightNum ** 2;

    const classification = getBMIClassification(imcValue, theme);
    const idealMin = +(18.5 * heightNum ** 2).toFixed(1);
    const idealMax = +(24.9 * heightNum ** 2).toFixed(1);

    return {
      ...classification,
      idealRange: [idealMin, idealMax],
    };
  }, [valid, weight, height, theme]);

  const handleCalculate = useCallback(() => {
    setTouched(true);
    if (!valid) return;
  }, [valid]);

  const handleClear = useCallback(() => {
    setWeight("");
    setHeight("");
    setTouched(false);
  }, []);

  return (
    <Box component="article" sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography
        variant="h1"
        sx={{ fontSize: "1.5rem", mb: 2, textAlign: "center" }}
      >
        Calculadora de IMC
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 3 }}>
        Informe seu peso e altura para calcular o Índice de Massa Corporal
        (IMC).
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Peso (kg)"
            variant="standard"
            value={weight}
            onChange={(e) => setWeight(e.target.value.replace(/[^0-9,]/g, ""))}
            error={!!error}
            helperText={error || "Exemplo: 75,5"}
            fullWidth
            inputProps={{
              inputMode: "decimal",
              pattern: "[0-9]*(\\.[0-9]*)?",
              min: 1,
              max: 600,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CurrencyInput
            label="Altura (metros)"
            initialValue={height}
            handleChange={setHeight}
          />
        </Grid>

        {result && (
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                p: { xs: 2, md: 3 },
                border: `3px solid ${alpha(result.color, 0.2)}`,
                borderRadius: "16px",
                bgcolor: alpha(result.color, 0.06),
                transition: "all 0.3s ease",
                boxShadow: 1,
              }}
            >
              {/* Container principal do resultado */}
              <Grid container spacing={2} sx={{ mb: 2 }}>
                {/* Valor do IMC com tipografia hierarquizada */}
                <Grid
                  size={{ xs: 12, md: 4 }}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: "1.8rem", md: "2.2rem" },
                      color: result.color,
                      fontWeight: 700,
                      mr: 2,
                    }}
                  >
                    {result.value.toFixed(1)}
                  </Typography>
                </Grid>

                {/* Barra de progresso responsiva */}
                <Grid size={{ xs: 12, md: 8 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <LinearProgress
                      variant="determinate"
                      value={result.progress}
                      sx={{
                        flexGrow: 1,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: alpha(result.color, 0.1),
                        ".MuiLinearProgress-bar": {
                          background: `linear-gradient(90deg, ${alpha(
                            result.color,
                            0.8
                          )} 0%, ${result.color} 100%)`,
                          borderRadius: 6,
                        },
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>

              {/* Categoria e mensagem */}
              <Grid spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: result.color,
                      fontWeight: 600,
                      mb: 1.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: "inline-block",
                        width: "12px",
                        height: "12px",
                        bgcolor: result.color,
                        borderRadius: "50%",
                      }}
                    />
                    {result.category}
                  </Typography>

                  <Alert
                    severity={
                      result.value < 18.5
                        ? "warning"
                        : result.value < 25
                        ? "success"
                        : result.value < 30
                        ? "info"
                        : "error"
                    }
                    icon={false}
                    sx={{
                      bgcolor: alpha(result.color, 0.05),
                      border: `1px solid ${alpha(result.color, 0.2)}`,
                      alignItems: "flex-start",
                      "& .MuiAlert-message": {
                        py: 0.5,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          flexShrink: 0,
                          bgcolor: result.color,
                          color: theme.palette.getContrastText(result.color),
                          borderRadius: "50%",
                          p: 1,
                          display: "flex",
                        }}
                      >
                        {result.value < 18.5 ? (
                          <WarningIcon />
                        ) : result.value < 25 ? (
                          <CheckCircleIcon />
                        ) : (
                          <ErrorIcon />
                        )}
                      </Box>
                      <Box>
                        <Typography variant="body2" component="div">
                          {result.message}
                          <Box
                            sx={{
                              mt: 1,
                              fontSize: "0.9em",
                              color: alpha(result.color, 0.9),
                              fontWeight: 500,
                            }}
                          >
                            Peso ideal: {result.idealRange[0]}kg -{" "}
                            {result.idealRange[1]}kg
                          </Box>
                        </Typography>
                      </Box>
                    </Box>
                  </Alert>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        )}

        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
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
            onClick={handleClear}
            fullWidth
          >
            Limpar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IMCCalculator;
