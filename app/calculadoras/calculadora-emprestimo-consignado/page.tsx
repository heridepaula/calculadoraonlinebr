import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de Empréstimo Consignado Online - INSS e Servidores 2025",
  description: "Simule seu empréstimo consignado com as melhores taxas. Calcule margem consignável, prestações e compare condições para INSS, servidores públicos e CLT.",
  keywords: [
    "calculadora empréstimo consignado",
    "empréstimo consignado INSS",
    "empréstimo consignado servidor público",
    "margem consignável",
    "simulação empréstimo consignado",
    "consignado 2025",
    "empréstimo desconto folha",
    "calculadora margem consignado",
    "empréstimo aposentado",
    "empréstimo pensionista",
    "consignado servidor",
    "taxa empréstimo consignado",
    "prazo empréstimo consignado",
    "simulador consignado",
    "crédito consignado",
    "empréstimo com desconto folha",
    "consignado CLT",
    "portabilidade consignado",
    "margem INSS",
    "empréstimo garantia salário",
  ],
  image: "/images/cards/emprestimo-consignado.webp",
  url: "/calculadoras/calculadora-emprestimo-consignado",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraEmprestimoConsignado = () => {
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
            currentCalculatorId="calculadora-emprestimo-consignado" 
            category="financial"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraEmprestimoConsignado;