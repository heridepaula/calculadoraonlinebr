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
    title: "Calculadora do Primeiro Milhão Online - Planeje sua Independência Financeira",
    description: "Descubra quanto tempo ou qual aporte mensal você precisa para alcançar seu primeiro milhão. Simule diferentes cenários de investimento e planeje sua independência financeira com nossa calculadora gratuita.",
    keywords: [
        "calculadora primeiro milhão",
        "primeiro milhão",
        "independência financeira",
        "planejamento financeiro",
        "simulador investimento",
        "calculadora investimento",
        "meta financeira",
        "patrimônio 1 milhão",
        "como juntar 1 milhão",
        "investir primeiro milhão",
        "simulador patrimônio",
        "aporte mensal milhão",
        "tempo para milhão",
        "estratégia investimento",
        "meta milionário",
        "calculadora de metas",
        "planejamento patrimônio",
        "educação financeira",
        "liberdade financeira",
        "objetivos financeiros",
    ],
    image: "/images/cards/primeiro-milhao.webp",
    url: "/calculadoras/calculadora-primeiro-milhao",
    structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraPrimeiroMilhao = () => {
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
                        currentCalculatorId="primeiro-milhao" 
                        category="financial"
                        maxItems={3}
                    />
                </Container>
            </CalculatorPage>
        </>
    );
};

export default CalculadoraPrimeiroMilhao;