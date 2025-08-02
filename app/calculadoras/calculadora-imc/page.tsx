import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de IMC Online Grátis e Fácil de Usar",
  description: "Calcule seu Índice de Massa Corporal (IMC) online de forma rápida e fácil! Descubra em qual faixa de peso você se encontra com nossa calculadora gratuita.",
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
  image: "/images/cards/imc.webp",
  url: "/calculadoras/calculadora-imc",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraIMC = () => {
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
            currentCalculatorId="bmi" 
            category="health"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraIMC;
