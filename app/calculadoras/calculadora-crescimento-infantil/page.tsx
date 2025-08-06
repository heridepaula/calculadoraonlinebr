import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de Crescimento e Desenvolvimento Infantil | Percentil OMS 2025",
  description: "Calculadora de crescimento infantil baseada nas curvas da OMS. Calcule percentis de peso e altura, previsão de altura adulta e marcos de desenvolvimento da criança.",
  keywords: [
    "calculadora crescimento infantil",
    "percentil altura peso criança",
    "desenvolvimento bebê",
    "curva crescimento OMS",
    "altura adulta previsão",
    "marcos desenvolvimento",
    "percentil infantil",
    "crescimento criança",
    "desenvolvimento motor",
    "pediatria calculadora",
    "peso ideal criança",
    "altura ideal criança",
    "crescimento bebê",
    "desenvolvimento infantil",
    "curvas OMS Brasil",
    "percentil peso altura",
    "calculadora pediatria",
    "crescimento saudável",
    "desenvolvimento motor infantil",
    "marcos desenvolvimento bebê"
  ],
  image: "/images/cards/crescimento-infantil.webp",
  url: "/calculadoras/calculadora-crescimento-infantil",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraCrescimentoInfantil = () => {
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
            currentCalculatorId="calculadora-crescimento-infantil" 
            category="health"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraCrescimentoInfantil;