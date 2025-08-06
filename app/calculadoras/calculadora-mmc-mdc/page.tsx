import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de MMC e MDC Online - Fatoração e Árvore de Fatores 2025",
  description: "Calcule MMC (Mínimo Múltiplo Comum) e MDC (Máximo Divisor Comum) de até 6 números com visualização da árvore de fatores animada. Ideal para estudantes do ensino fundamental e médio.",
  keywords: [
    "calculadora mmc",
    "calculadora mdc",
    "mínimo múltiplo comum",
    "máximo divisor comum",
    "fatoração números primos",
    "árvore de fatores",
    "decomposição fatores primos",
    "algoritmo euclides",
    "divisibilidade",
    "números primos",
    "matemática básica",
    "ensino fundamental",
    "matemática 6º ano",
    "matemática 7º ano",
    "múltiplos e divisores",
    "fatoração completa",
    "método fatoração",
    "calculadora matemática",
    "mdc mmc online",
    "exercícios mmc mdc",
    "problema mmc mdc",
    "aplicação mmc mdc",
    "euclides gcd",
    "lcm calculator",
    "greatest common divisor",
    "least common multiple",
  ],
  image: "/images/cards/mmc-mdc.webp",
  url: "/calculadoras/calculadora-mmc-mdc",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraMMCMDC = () => {
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
            currentCalculatorId="calculadora-mmc-mdc" 
            category="math"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraMMCMDC;