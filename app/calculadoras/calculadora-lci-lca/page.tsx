import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora LCI e LCA Online - Simule Investimentos Isentos de IR",
  description: "Calcule o rendimento de LCI e LCA com nossa calculadora gratuita. Simule investimentos pós e pré-fixados, isentos de Imposto de Renda para pessoa física.",
  keywords: [
    "calculadora lci lca",
    "lci lca calculadora",
    "calculadora investimento lci",
    "calculadora lca",
    "simular lci lca",
    "rendimento lci lca",
    "investimento isento ir",
    "letra credito imobiliario",
    "letra credito agronegocio",
    "calculadora renda fixa",
    "investimento baixo risco",
    "simulador lci",
    "simulador lca",
    "cdi calculadora",
    "investimento pre fixado",
    "investimento pos fixado",
    "fgc garantia",
    "isencao imposto renda",
    "calculadora financeira",
    "renda fixa brasil",
  ],
  image: "/images/cards/lci-lca.webp",
  url: "/calculadoras/calculadora-lci-lca",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraLciLca = () => {
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
            currentCalculatorId="lci-lca" 
            category="financial"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraLciLca;