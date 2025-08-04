import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora do Tesouro Direto - Títulos Públicos LTN, LFT, NTN-B",
  description: "Simule investimentos em títulos do Tesouro Direto: Tesouro Prefixado, Tesouro Selic e Tesouro IPCA+. Calculadora gratuita com fórmulas oficiais, tributação IR e rentabilidade.",
  keywords: [
    "calculadora tesouro direto",
    "tesouro direto simulador",
    "tesouro prefixado LTN",
    "tesouro selic LFT",
    "tesouro IPCA NTN-B",
    "tesouro juros semestrais NTN-F",
    "títulos públicos federais",
    "investimento governo",
    "simulador títulos públicos",
    "calculadora LTN",
    "calculadora LFT",
    "calculadora NTN-B",
    "rentabilidade tesouro direto",
    "imposto renda tesouro",
    "marcação a mercado",
    "VNA tesouro",
    "taxa selic investimento",
    "IPCA proteção inflação",
    "juros compostos títulos",
    "matemática financeira tesouro",
    "fórmulas tesouro direto",
    "investimento seguro brasil",
    "renda fixa governo",
    "bonds brasil calculator",
    "brazilian treasury bonds",
  ],
  image: "/images/cards/tesouro-direto.webp",
  url: "/calculadoras/calculadora-tesouro-direto",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraTesouroDireto = () => {
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
            currentCalculatorId="calculadora-tesouro-direto" 
            category="finance"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraTesouroDireto;