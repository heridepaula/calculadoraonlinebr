import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de Frações Online - Soma, Subtração, Multiplicação e Divisão 2025",
  description: "Calculadora de frações completa com simplificação automática e visualização gráfica. Realize operações com frações passo a passo.",
  keywords: [
    "calculadora frações",
    "calculadora de frações",
    "somar frações",
    "subtrair frações",
    "multiplicar frações",
    "dividir frações",
    "simplificar frações",
    "frações equivalentes",
    "números mistos",
    "denominador comum",
    "operações frações",
    "frações online",
    "matemática básica",
    "ensino fundamental",
    "calculadora matemática",
    "reduzir frações",
    "fração irredutível",
    "mmc frações",
    "visualização frações",
    "frações decimais",
    "converter frações",
    "exercícios frações",
    "matemática 6º ano",
    "matemática 7º ano",
    "fractions calculator",
  ],
  image: "/images/cards/fracoes.webp",
  url: "/calculadoras/calculadora-fracoes",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraFracoes = () => {
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
            currentCalculatorId="calculadora-fracoes" 
            category="math"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraFracoes;