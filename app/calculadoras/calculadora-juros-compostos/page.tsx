import React from "react";
import {
  Container,
  Paper,
} from "@mui/material";
import { Metadata } from "next";

import Content from "./content";
import Calculator from "./calculator";

export const metadata: Metadata = {
  title: "Calculadora de Juros Compostos",
  description: "Descubra o poder dos juros compostos! Calcule o valor final do seu investimento de forma online e totalmente gratuita.",
  openGraph: {
    title: "Calculadora de Juros Compostos",
    description: "Descubra o poder dos juros compostos! Calcule o valor final do seu investimento de forma online e totalmente gratuita.",
    url: "/calculadoras/calculadora-juros-compostos",
    siteName: "Calculadora de Juros Compostos",
  },
};

const CalculadoraJurosCompostos = () => {
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4, px: 2 }}>
        <Paper elevation={4} sx={{ padding: 3, borderRadius: 2 }}>
          <Calculator />
        </Paper>
      </Container>
      <Container maxWidth="md" sx={{ mt: 4, px: 2 }}>
        <Paper elevation={4} sx={{ padding: 3, borderRadius: 2 }}>
          <Content />
        </Paper>
      </Container>
    </>
  );
};

export default CalculadoraJurosCompostos;
