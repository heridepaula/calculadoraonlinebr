import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de Consórcio 2025 - Simulador Imóvel e Veículo Vale a Pena",
  description: "Simule consórcio de imóvel e veículo. Compare com financiamento, calcule probabilidades de contemplação, analise lances e descubra se vale a pena.",
  keywords: [
    "calculadora consórcio",
    "simulador consórcio",
    "consórcio vale a pena",
    "consórcio imóvel",
    "consórcio veículo",
    "contemplação consórcio",
    "lance consórcio",
    "probabilidade contemplação",
    "consórcio vs financiamento",
    "comparar consórcio financiamento",
    "taxa administração consórcio",
    "simulador consórcio 2025",
    "como funciona consórcio",
    "vantagens consórcio",
    "desvantagens consórcio",
    "melhor consórcio",
    "consórcio casa própria",
    "consórcio carro",
    "contemplação por sorteio",
    "contemplação por lance",
  ],
  image: "/images/cards/consorcio.webp",
  url: "/calculadoras/calculadora-consorcio",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraConsorcio = () => {
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
            currentCalculatorId="calculadora-consorcio" 
            category="financial"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraConsorcio;