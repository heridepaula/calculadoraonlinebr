import React from "react";
import { Container, Paper } from "@mui/material";
import { Metadata } from "next";
import StructuredData from "../../../components/StructuredData";

import Content from "./content";
import Main from "./main";

export const metadata: Metadata = {
    title: "Calculadora de Juros Compostos Online Grátis e Fácil de Usar",
    description:
        "Calcule juros compostos online de forma rápida e fácil! Nossa calculadora gratuita exibe o crescimento do seu investimento ao longo do tempo com gráficos interativos. Simule agora!",
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
        "gráfico juros compostos",
        "evolução patrimonial",
    ],
    openGraph: {
        type: 'website',
        title: "Calculadora de Juros Compostos Online Grátis e Fácil de Usar",
        description:
            "Calcule juros compostos online de forma rápida e fácil! Nossa calculadora gratuita exibe o crescimento do seu investimento ao longo do tempo com gráficos interativos. Simule agora!",
        url: "https://calculadoraonlinebr.com.br/calculadoras/calculadora-juros-compostos",
        siteName: "Calculadora Online BR",
        images: [
            {
                url: "https://calculadoraonlinebr.com.br/images/cards/juros-compostos.webp",
                width: 800,
                height: 600,
                alt: "Calculadora de Juros Compostos Online",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Calculadora de Juros Compostos Online Grátis e Fácil de Usar",
        description:
            "Calcule juros compostos online de forma rápida e fácil! Nossa calculadora gratuita exibe o crescimento do seu investimento ao longo do tempo com gráficos interativos.",
        images: ["https://calculadoraonlinebr.com.br/images/cards/juros-compostos.webp"],
    },
    alternates: {
        canonical: "https://calculadoraonlinebr.com.br/calculadoras/calculadora-juros-compostos",
    },
};

const CalculadoraJurosCompostos = () => {
    return (
        <>
            <StructuredData 
                type="calculator"
                title="Calculadora de Juros Compostos Online Grátis"
                description="Calcule juros compostos online com gráficos interativos. Simule o crescimento do seu investimento ao longo do tempo de forma gratuita e precisa."
                url="https://calculadoraonlinebr.com.br/calculadoras/calculadora-juros-compostos"
            />
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