import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de Preço Médio - Calcule o Preço Médio dos seus Investimentos",
  description: "Calcule o preço médio das suas ações automaticamente. Ferramenta gratuita para acompanhar seus investimentos na bolsa de valores com histórico detalhado.",
  keywords: [
    "preço médio ações",
    "calculadora preço médio",
    "preço médio ponderado",
    "investimentos bolsa valores",
    "média ponderada ações",
    "custo médio ações",
    "calculadora investimentos",
    "preço médio compra ações",
    "acompanhar carteira ações",
    "média preço ações",
    "dollar cost averaging",
    "DCA",
    "aporte regular ações",
    "estratégia investimento",
    "bolsa de valores",
    "carteira de ações",
    "investimento em ações",
    "preço médio ponderado",
    "custo médio ponderado",
    "média ponderada investimentos",
  ],
  image: "/images/cards/preco-medio.webp",
  url: "/calculadoras/calculadora-preco-medio",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraPrecoMedio = () => {
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
            currentCalculatorId="preco-medio" 
            category="financial"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraPrecoMedio;