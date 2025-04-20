import { Container, Paper } from "@mui/material";
import { Metadata } from "next";

import Content from "./content";
import Main from "./main";

export const metadata: Metadata = {
  title: "Calculadora de IMC Online Grátis e Fácil de Usar",
  description:
    "Calcule seu Índice de Massa Corporal (IMC) online de forma rápida e fácil! Descubra em qual faixa de peso você se encontra com nossa calculadora gratuita.",
  keywords: [
    "calculadora imc",
    "imc",
    "calcular imc",
    "imc online",
    "índice de massa corporal",
    "faixa de peso",
    "peso ideal",
    "saúde",
    "bem-estar",
    "ferramenta de saúde",
    "medida corporal",
  ],
  openGraph: {
    title: "Calculadora de IMC Online Grátis e Fácil de Usar",
    description:
      "Calcule seu Índice de Massa Corporal (IMC) online de forma rápida e fácil! Descubra em qual faixa de peso você se encontra com nossa calculadora gratuita.",
    url: "/calculadoras/calculadora-imc",
    siteName: "Calculadora de IMC Online Grátis",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de IMC Online Grátis e Fácil de Usar",
    description:
      "Calcule seu Índice de Massa Corporal (IMC) online de forma rápida e fácil! Descubra em qual faixa de peso você se encontra com nossa calculadora gratuita.",
    images: ["/images/cards/imc.webp"],
  },
};

const CalculadoraIMC = () => {
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

export default CalculadoraIMC;
