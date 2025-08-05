import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de Salário Líquido 2025 - CLT, PJ e MEI Comparação",
  description: "Calcule seu salário líquido para CLT, PJ e MEI. Compare regimes de trabalho e analise descontos, benefícios e impostos 2025. Ferramenta gratuita e atualizada.",
  keywords: [
    "calculadora salário líquido",
    "salário líquido CLT",
    "desconto folha pagamento",
    "calculadora salário líquido CLT",
    "PJ vs CLT salário",
    "MEI salário líquido",
    "calculadora INSS IRPF",
    "desconto INSS 2025",
    "imposto renda salário",
    "vale transporte desconto",
    "vale refeição cálculo",
    "benefícios trabalhistas",
    "comparar CLT PJ MEI",
    "regime trabalho vantagem",
    "simulador salário líquido",
    "calculadora trabalhista",
    "folha pagamento cálculo",
    "salário bruto líquido",
    "tributos sobre salário",
    "planejamento salarial",
    "otimização tributária salário",
    "calculadora fiscal salário",
    "desconto previdência social",
    "dedução imposto renda",
    "calculadora online salário",
  ],
  image: "/images/cards/calculadora-salario-liquido.webp",
  url: "/calculadoras/calculadora-salario-liquido",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraSalarioLiquido = () => {
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
            currentCalculatorId="calculadora-salario-liquido" 
            category="labor"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraSalarioLiquido;