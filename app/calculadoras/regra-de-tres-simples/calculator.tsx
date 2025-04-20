"use client";

import React, { useState, ChangeEvent, FocusEvent, useEffect } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";

interface CalculatorProps {}

const Calculator: React.FC<CalculatorProps> = () => {
  const [valueA, setValueA] = useState<number | undefined>(undefined);
  const [valueB, setValueB] = useState<number | undefined>(undefined);
  const [valueC, setValueC] = useState<number | undefined>(undefined);
  const [valueX, setValueX] = useState<number | string>("?");
  const [resultSymbol, setResultSymbol] = useState<string>("=");

  useEffect(() => {
    if (valueA !== undefined && valueB !== undefined && valueC !== undefined) {
      calculateCompoundInterest();
    } else {
      setValueX("?");
    }
  }, [valueA, valueB, valueC]);

  const calculateCompoundInterest = () => {
    if (valueA !== undefined && valueB !== undefined && valueC !== undefined) {
      const result = (valueB * valueC) / valueA;
      if (result % 1 !== 0) {
        setResultSymbol("≅");
        setValueX(result.toFixed(3));
      } else {
        setResultSymbol("=");
        setValueX(result);
      }
    } else {
      setValueX("?");
    }
  };

  const clearFields = () => {
    setValueA(undefined);
    setValueB(undefined);
    setValueC(undefined);
    setValueX("?");
  };

  const handleChange =
    (setValue: React.Dispatch<React.SetStateAction<number | undefined>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(
        event.target.value === "" ? undefined : Number(event.target.value)
      );
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
            onChange={handleChange(setValueA)}
            value={valueA === undefined ? "" : valueA}
            slotProps={{ input: { type: "numeric" } }}
            fullWidth
            onFocus={handleFocus}
            sx={{
              "& .MuiInputLabel-root": labelStyle,
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
            onChange={handleChange(setValueB)}
            value={valueB === undefined ? "" : valueB}
            slotProps={{ input: { type: "numeric" } }}
            fullWidth
            onFocus={handleFocus}
            sx={{
              "& .MuiInputLabel-root": labelStyle,
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
            onChange={handleChange(setValueC)}
            value={valueC === undefined ? "" : valueC}
            slotProps={{ input: { type: "numeric" } }}
            fullWidth
            onFocus={handleFocus}
            sx={{
              "& .MuiInputLabel-root": labelStyle,
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
            value={valueX}
            slotProps={{ input: { type: "numeric" } }}
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
              ...(valueX === null && { display: "none" }),
            }}
          >
            {valueX !== null && (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#1a1a1a",
                    fontWeight: "bold",
                    marginBottom: 1,
                  }}
                >
                  X {resultSymbol} {valueX}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  A está para B assim como C está para X
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    color: "#4c814f",
                  }}
                >
                  {`${valueA || "A"} está para ${valueB || "B"} assim como ${
                    valueC || "C"
                  } está para ${valueX || "?"}`}
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
