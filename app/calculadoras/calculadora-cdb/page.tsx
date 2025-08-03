import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de CDB Online - Certificado de Depósito Bancário 2025",
  description: "Calcule a rentabilidade do seu CDB (Certificado de Depósito Bancário). Ferramenta gratuita para simular rendimentos, impostos e comparar tipos de indexação: pré-fixado, pós-fixado (CDI) e IPCA+.",
  keywords: [
    "calculadora CDB",
    "certificado depósito bancário",
    "CDB pré-fixado",
    "CDB pós-fixado",
    "CDB IPCA",
    "rentabilidade CDB",
    "simulador CDB",
    "investimento renda fixa",
    "CDI",
    "IPCA plus",
    "imposto renda CDB",
    "IOF CDB",
    "FGC",
    "juros compostos",
    "tributação CDB",
    "CDB 2025",
    "banco",
    "investimento seguro",
    "renda fixa",
    "calculadora investimento",
    "rendimento bancário",
    "depósito a prazo",
    "taxa CDI",
    "inflação IPCA",
  ],
  image: "/images/cards/calculadora-cdb.webp",
  url: "/calculadoras/calculadora-cdb",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraCDB = () => {
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
            currentCalculatorId="calculadora-cdb" 
            category="finance"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraCDB;