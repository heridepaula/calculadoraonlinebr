import React from "react";
import { Container, Paper } from "@mui/material";
import { Metadata } from "next";

import Content from "./content";
import Main from "./main";

export const metadata: Metadata = {
    title: "Calculadora de Juros Compostos Online Grátis e Fácil de Usar",
    description:
        "Calcule juros compostos online de forma rápida e fácil! Nossa calculadora gratuita exibe o crescimento do seu investimento ao longo do tempo. Simule agora!",
    keywords: [
        "calculadora juros compostos",
        "calculadora de juros compostos",
        "juros compostos online",
        "calcular juros compostos online",
        "calculadora juros compostos grátis",
        "simulador de juros compostos",
        "calculadora de investimento",
        "rendimento composto",
        "juros sobre juros",
        "investimento fácil",
        "calculadora financeira",
    ],
    openGraph: {
        title: "Calculadora de Juros Compostos Online Grátis e Fácil de Usar",
        description:
            "Calcule juros compostos online de forma rápida e fácil! Nossa calculadora gratuita exibe o crescimento do seu investimento ao longo do tempo. Simule agora!",
        url: "/calculadoras/calculadora-juros-compostos",
        siteName: "Calculadora de Juros Compostos Online Grátis",
    },
    twitter: {
        card: "summary_large_image",
        title: "Calculadora de Juros Compostos Online Grátis e Fácil de Usar",
        description:
            "Calcule juros compostos online de forma rápida e fácil! Nossa calculadora gratuita exibe o crescimento do seu investimento ao longo do tempo. Simule agora!",
        images: ["/images/cards/juros-compostos.png"],
    },
};

const CalculadoraJurosCompostos = () => {
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

export default CalculadoraJurosCompostos;