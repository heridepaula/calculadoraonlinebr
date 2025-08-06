import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de Hidratação e Balanço Hídrico | Água Diária 2025",
  description: "Calculadora de hidratação para determinar suas necessidades diárias de água. Cálculo personalizado baseado em peso, idade, atividade física e condições climáticas.",
  keywords: [
    "calculadora hidratação",
    "balanço hídrico",
    "necessidade de água diária",
    "quantidade água por dia",
    "calculadora água corporal",
    "hidratação ideal",
    "consumo água diário",
    "calculadora líquidos",
    "desidratação prevenção",
    "água por peso corporal",
    "hidratação esportiva",
    "água necessária",
    "calculadora nutrição",
    "saúde hidratação",
    "água corpo humano",
    "sede hidratação",
    "líquidos corporais",
    "equilíbrio hídrico",
    "recomendação água OMS",
    "hidratação saudável"
  ],
  image: "/images/cards/hidratacao.webp",
  url: "/calculadoras/calculadora-hidratacao",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraHidratacao = () => {
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
            currentCalculatorId="calculadora-hidratacao" 
            category="health"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraHidratacao;