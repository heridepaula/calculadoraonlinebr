"use client";

import React, { useState, ChangeEvent, FocusEvent, useEffect, useCallback } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";

interface CalculatorProps {}

const Calculator: React.FC<CalculatorProps> = () => {
  const [firstValue, setFirstValue] = useState<string>("");
  const [secondValue, setSecondValue] = useState<string>("");
  const [thirdValue, setThirdValue] = useState<string>("");
  const [resultValue, setResultValue] = useState<string>("?");
  const [resultSymbol, setResultSymbol] = useState<string>("=");

  const calculate = useCallback(() => {
    const firstNumber = Number(firstValue?.replace(",", "."));
    const secondNumber = Number(secondValue?.replace(",", "."));
    const thirdNumber = Number(thirdValue?.replace(",", "."));

    if (!isNaN(firstNumber) && !isNaN(secondNumber) && !isNaN(thirdNumber)) {
      const result = Number((secondNumber * thirdNumber) / firstNumber);
      if (result % 1 !== 0) {
        setResultSymbol("≈");
        setResultValue(result.toFixed(3));
      } else {
        setResultSymbol("=");
        setResultValue(result.toString());
      }
    } else {
      setResultValue("?");
      setResultSymbol("=");
    }
  }, [firstValue, secondValue, thirdValue]);

  useEffect(() => {
    if (firstValue !== "" && secondValue !== "" && thirdValue !== "") {
      calculate();
    } else {
      setResultValue("?");
      setResultSymbol("=");
    }
  }, [firstValue, secondValue, thirdValue, calculate]);

  const clearFields = () => {
    setFirstValue("");
    setSecondValue("");
    setThirdValue("");
    setResultValue("?");
    setResultSymbol("=");
  };

  const handleChange =
    (setValue: React.Dispatch<React.SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.target.value;
      const valid = /^[0-9.,]*$/.test(input);
      if (valid) {
        setValue(input.replace(".", ","));
      }
    };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value === "0" || event.target.value === "?") {
      event.target.value = "";
    }
  };

  const inputStyle = {
    fontSize: "1.5rem",
    padding: "8px",
    textAlign: "center",
  };

  const labelStyle = {
    textAlign: "center",
    display: "block",
  };

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Regra de três Simples
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 3 }}>
        Estabeleça a relação entre as grandezas inserindo os valores conhecidos
        para encontrar o valor desconhecido através da regra de três.
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 4, md: 4 }}>
          <TextField
            label="A"
            variant="standard"
            onChange={handleChange(setFirstValue)}
            value={firstValue}
            fullWidth
            onFocus={handleFocus}
            sx={{
              "& .MuiInputLabel-root": labelStyle, inputStyle,
              "& .MuiInputLabel-shrink": {
                textAlign: "left",
                display: "block",
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 4, md: 4 }} sx={{ textAlign: "center" }}>
          <EastIcon
            sx={{
              fontSize: "2rem",
              marginTop: "1rem",
              color: "#1976d2",
            }}
          />
        </Grid>
        <Grid size={{ xs: 4, md: 4 }}>
          <TextField
            label="B"
            variant="standard"
            onChange={handleChange(setSecondValue)}
            value={secondValue}
            fullWidth
            onFocus={handleFocus}
            sx={{
              "& .MuiInputLabel-root": labelStyle, inputStyle,
              "& .MuiInputLabel-shrink": {
                textAlign: "left",
                display: "block",
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 4, md: 4 }}>
          <TextField
            label="C"
            variant="standard"
            onChange={handleChange(setThirdValue)}
            value={thirdValue}
            fullWidth
            onFocus={handleFocus}
            sx={{
              "& .MuiInputLabel-root": labelStyle, inputStyle,
              "& .MuiInputLabel-shrink": {
                textAlign: "left",
                display: "block",
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 4, md: 4 }} sx={{ textAlign: "center" }}>
          <EastIcon
            sx={{
              fontSize: "2rem",
              marginTop: "1rem",
              color: "#1976d2",
            }}
          />
        </Grid>
        <Grid size={{ xs: 4, md: 4 }}>
          <TextField
            label="X"
            variant="standard"
            value={`${resultSymbol} ${resultValue}`}
            fullWidth
            disabled
            sx={{
              "& .MuiInputLabel-root": labelStyle,
              "& .MuiInputLabel-shrink": {
                textAlign: "left",
                display: "block",
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              padding: 2,
              textAlign: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              ...(resultValue === null && { display: "none" }),
            }}
          >
            {resultValue !== null && (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#1a1a1a",
                    fontWeight: "bold",
                    marginBottom: 1,
                  }}
                >
                  X {resultSymbol} {resultValue}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  A está para B, assim como C está para X
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    color: "#4c814f",
                  }}
                >
                  {`${firstValue || "A"} está para ${secondValue || "B"}, assim como ${
                    thirdValue || "C"
                  } está para ${resultValue || "?"}`}
                </Typography>
              </>
            )}
          </Box>
        </Grid>
        <Grid size={{ xs: 3 }}></Grid>
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
        <Grid size={{ xs: 3 }}></Grid>
      </Grid>
    </>
  );
};

export default Calculator;
