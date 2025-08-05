import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de Férias e 13º Salário 2025 | Calcule Abono Pecuniário",
  description: "Calculadora gratuita de férias e 13º salário proporcional. Calcule férias integrais, proporcionais, abono pecuniário e décimo terceiro com INSS e IRRF atualizados para 2025.",
  keywords: [
    "calculadora de férias",
    "calculadora 13º salário",
    "abono pecuniário",
    "décimo terceiro proporcional",
    "férias proporcionais",
    "venda de férias",
    "CLT 2025",
    "direitos trabalhistas",
    "período aquisitivo",
    "gratificação natalina",
    "férias trabalhista",
    "1/3 constitucional férias",
    "antecipação 13º salário",
    "calculadora trabalhista férias",
    "férias integrais",
    "simulador férias",
    "calculadora online férias",
    "benefícios trabalhistas",
    "tempo de férias",
    "férias fracionadas",
    "período gozo férias",
    "simulador 13º salário",
    "calculadora benefícios",
    "planejamento férias",
  ],
  image: "/images/cards/calculadora-ferias-13.webp",
  url: "/calculadoras/calculadora-ferias-13",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraFeriasDecimo = () => {
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
            currentCalculatorId="calculadora-ferias-13" 
            category="labor"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraFeriasDecimo;