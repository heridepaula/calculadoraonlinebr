import React from "react";
import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
    title: "Calculadora de Juros Compostos Online Grátis e Fácil de Usar",
    description: "Calcule juros compostos online de forma rápida e fácil! Nossa calculadora gratuita exibe o crescimento do seu investimento ao longo do tempo com gráficos interativos. Simule agora!",
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
    image: "/images/cards/juros-compostos.webp",
    url: "/calculadoras/calculadora-juros-compostos",
    structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraJurosCompostos = () => {
    return (
        <>
            <Container maxWidth="lg">
                <Breadcrumbs />
            </Container>
            <Main />
            <CalculatorPage metadata={calculatorMetadata}>
                <Content />
                <Container maxWidth="lg">
                    <RelatedCalculators 
                        currentCalculatorId="compound-interest" 
                        category="financial"
                        maxItems={3}
                    />
                </Container>
            </CalculatorPage>
        </>
    );
};

export default CalculadoraJurosCompostos;