import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de Regra de Três Simples Online Grátis e Fácil de Usar",
  description: "Resolva problemas de regra de três online de forma rápida e fácil! Nossa calculadora gratuita ajuda você a encontrar o valor desconhecido em proporções.",
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
  image: "/images/cards/regra-de-tres.webp",
  url: "/calculadoras/regra-de-tres-simples",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraRegraDeTres = () => {
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
            currentCalculatorId="rule-of-three" 
            category="math"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraRegraDeTres;
