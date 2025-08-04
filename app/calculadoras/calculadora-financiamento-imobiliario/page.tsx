import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de Financiamento Imobiliário 2025 | SAC, Price, FGTS e Subsídios",
  description: "Simule seu financiamento imobiliário com sistemas SAC e Price. Inclui programas Minha Casa Minha Vida, uso do FGTS, seguros obrigatórios e comparação de bancos. Atualizado para 2025.",
  keywords: [
    "financiamento imobiliário",
    "casa própria",
    "SAC",
    "Price",
    "FGTS",
    "Minha Casa Minha Vida",
    "Casa Verde Amarela",
    "simulador habitação",
    "calculadora financiamento",
    "juros imobiliário",
    "caixa econômica",
    "banco do brasil",
    "sistema amortização constante",
    "tabela price",
    "subsídio governamental",
    "seguro MIP",
    "seguro DFI",
    "financiamento casa",
    "comprar imóvel",
    "crédito imobiliário",
    "habitação popular",
    "programa habitacional",
    "taxa juros financiamento",
    "prestação imóvel",
    "amortização extraordinária",
    "portabilidade crédito",
    "sonho casa própria",
    "imóvel 2025",
  ],
  image: "/images/cards/financiamento-imobiliario.webp",
  url: "/calculadoras/calculadora-financiamento-imobiliario",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraFinanciamentoImobiliario = () => {
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
            currentCalculatorId="real-estate-financing" 
            category="financial"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraFinanciamentoImobiliario;