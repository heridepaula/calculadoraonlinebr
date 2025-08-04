import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

// Configure revalidation for calculator pages SEO
export const revalidate = 7200; // Revalidate every 2 hours

const calculatorMetadata = {
  title: "Calculadora de Aposentadoria INSS + Previdência Privada 2025 | Simulador Completo",
  description: "Simule sua aposentadoria com as regras atuais do INSS e calcule o impacto da previdência privada. Inclui todas as regras de transição da reforma da previdência, PGBL, VGBL e cenários personalizados.",
  keywords: [
    "calculadora aposentadoria",
    "simulador INSS",
    "quando vou me aposentar",
    "aposentadoria 2025",
    "previdência privada",
    "PGBL",
    "VGBL",
    "reforma previdência",
    "regras transição",
    "aposentadoria por pontos",
    "idade progressiva",
    "simulador previdência",
    "complementar aposentadoria",
    "teto INSS",
    "benefício INSS",
    "taxa reposição",
    "planejamento aposentadoria",
    "previdência complementar",
    "simulação aposentadoria",
    "calculadora INSS",
    "aposentadoria especial",
    "regra geral aposentadoria",
    "tempo contribuição",
    "idade mínima aposentadoria",
  ],
  image: "/images/cards/calculadora-aposentadoria.webp",
  url: "/calculadoras/calculadora-aposentadoria",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraAposentadoria = () => {
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
            currentCalculatorId="retirement-calculator" 
            category="labor"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraAposentadoria;