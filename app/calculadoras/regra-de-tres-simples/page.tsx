import React from "react";
import { Container, Paper } from "@mui/material";
import { Metadata } from "next";

import Content from "./content";
import Main from "./main";

export const metadata: Metadata = {
  title: "Calculadora de Regra de Três Simples Online Grátis e Fácil de Usar",
  description:
    "Resolva problemas de regra de três online de forma rápida e fácil! Nossa calculadora gratuita ajuda você a encontrar o valor desconhecido em proporções.",
  keywords: [
    "calculadora regra de três",
    "regra de três",
    "calcular regra de três",
    "regra de três online",
    "calculadora de proporção",
    "problemas de regra de três",
    "matemática básica",
    "cálculo fácil",
    "ferramenta matemática",
    "proporcionalidade",
  ],
  openGraph: {
    title: "Calculadora de Regra de Três Online Grátis e Fácil de Usar",
    description:
      "Resolva problemas de regra de três online de forma rápida e fácil! Nossa calculadora gratuita ajuda você a encontrar o valor desconhecido em proporções.",
    url: "/calculadoras/calculadora-regra-de-tres",
    siteName: "Calculadora de Regra de Três Online Grátis",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Regra de Três Online Grátis e Fácil de Usar",
    description:
      "Resolva problemas de regra de três online de forma rápida e fácil! Nossa calculadora gratuita ajuda você a encontrar o valor desconhecido em proporções.",
    images: ["/images/cards/regra-de-tres.png"],
  },
};

const CalculadoraRegraDeTres = () => {
  return (
    <>
      <Main />
      <Container maxWidth="md" sx={{ mt: 4, px: 2 }}>
        <Paper elevation={4} sx={{ padding: 3, borderRadius: 2 }}>
          <Content />
        </Paper>
      </Container>
    </>
  );
};

export default CalculadoraRegraDeTres;
