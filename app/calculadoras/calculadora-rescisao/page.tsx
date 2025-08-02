import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de Rescisão Trabalhista Online - CLT 2024",
  description: "Calcule sua rescisão trabalhista de acordo com a CLT. Ferramenta gratuita para calcular saldo de salário, férias, 13º salário, aviso prévio, salário família e multa do FGTS.",
  keywords: [
    "calculadora rescisão trabalhista",
    "rescisão CLT",
    "cálculo rescisão",
    "verbas rescisórias",
    "demissão sem justa causa",
    "demissão com justa causa",
    "acordo mútuo",
    "aviso prévio",
    "FGTS",
    "multa FGTS",
    "férias proporcionais",
    "13º salário",
    "saldo de salário",
    "salário família",
    "direitos trabalhistas",
    "CLT 2024",
    "rescisão online",
    "calculadora trabalhista",
    "término contrato trabalho",
  ],
  image: "/images/cards/rescisao-trabalhista.webp",
  url: "/calculadoras/calculadora-rescisao",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraRescisao = () => {
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
            currentCalculatorId="calculadora-rescisao" 
            category="labor"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraRescisao;