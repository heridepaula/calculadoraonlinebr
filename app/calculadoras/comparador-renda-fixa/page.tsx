import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Comparador de Renda Fixa - CDB, LCI/LCA, Tesouro SELIC e Poupança",
  description: "Compare os rendimentos entre CDB, LCI/LCA, Tesouro SELIC e Poupança. Calculadora gratuita com simulação de investimentos em renda fixa, tributação e rentabilidade líquida.",
  keywords: [
    "comparador renda fixa",
    "CDB vs LCI",
    "tesouro selic",
    "poupança rendimento",
    "simulador investimento",
    "calculadora CDB",
    "LCI LCA calculator",
    "renda fixa 2025",
    "investimento seguro",
    "taxa SELIC",
    "CDI hoje",
    "tributação renda fixa",
    "IR investimento",
    "FGC garantia",
    "rentabilidade líquida",
    "comparação investimentos",
    "melhor investimento",
    "aplicação financeira",
    "simulador tesouro direto",
    "calculadora investimento",
  ],
  image: "/images/cards/comparador-renda-fixa.webp",
  url: "/calculadoras/comparador-renda-fixa",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const ComparadorRendaFixa = () => {
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
            currentCalculatorId="comparador-renda-fixa" 
            category="finance"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default ComparadorRendaFixa;