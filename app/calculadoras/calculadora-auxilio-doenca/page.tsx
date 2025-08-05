import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de Auxílio-Doença e Benefícios INSS 2025 - Valores Atualizados",
  description: "Calcule o valor do auxílio-doença, auxílio-acidente e pensão por morte do INSS. Simule benefícios com salário-de-benefício, carência e regras atualizadas 2025.",
  keywords: [
    "calculadora auxílio-doença",
    "valor auxílio doença INSS",
    "benefício INSS 2025",
    "auxílio por incapacidade temporária",
    "auxílio-acidente calculadora",
    "pensão por morte INSS",
    "salário-de-benefício INSS",
    "carência INSS",
    "simulador benefícios INSS",
    "calculadora previdenciária",
    "INSS 2025 valores",
    "benefício por incapacidade",
    "perícia médica INSS",
    "auxílio doença online",
    "calculadora INSS oficial",
    "benefícios previdenciários",
    "incapacidade temporária",
    "doenças graves INSS",
    "acidente trabalho benefício",
    "dependentes INSS pensão",
  ],
  image: "/images/cards/auxilio-doenca.webp",
  url: "/calculadoras/calculadora-auxilio-doenca",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraAuxilioDoenca = () => {
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
            currentCalculatorId="calculadora-auxilio-doenca" 
            category="labor"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraAuxilioDoenca;