import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de Equação do 2º Grau (Bhaskara) 2025 | Gráfico da Parábola",
  description: "Resolva equações quadráticas com a fórmula de Bhaskara. Calculadora gratuita com gráfico da parábola, análise do discriminante e resolução passo a passo para ENEM e vestibulares.",
  keywords: [
    "calculadora bhaskara",
    "equação segundo grau",
    "calculadora equação quadrática",
    "fórmula bhaskara online",
    "discriminante delta",
    "parábola gráfico",
    "raízes equação",
    "vértice parábola",
    "função quadrática",
    "matemática ensino médio",
    "ENEM matemática",
    "vestibular equação",
    "calculadora matemática",
    "resolver equação 2 grau",
    "bhaskara passo a passo",
    "concavidade parábola",
    "natureza das raízes",
    "relações girard",
    "equação incompleta",
    "ax2 bx c",
    "delta negativo positivo",
    "duas raízes distintas",
    "raiz dupla",
    "sem raízes reais",
  ],
  image: "/images/cards/calculadora-bhaskara.webp",
  url: "/calculadoras/calculadora-bhaskara",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraBhaskara = () => {
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
            currentCalculatorId="calculadora-bhaskara" 
            category="math"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraBhaskara;