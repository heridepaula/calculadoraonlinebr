import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de Percentual de Gordura Corporal Online Grátis - Método US Navy",
  description: "Calcule seu percentual de gordura corporal online usando o método da Marinha Americana. Ferramenta gratuita e precisa para monitorar sua composição corporal e saúde.",
  keywords: [
    "calculadora gordura corporal",
    "percentual de gordura corporal",
    "calcular gordura corporal",
    "método us navy",
    "composição corporal",
    "calculadora bf",
    "body fat calculator",
    "gordura corporal online",
    "medidas corporais",
    "índice gordura corporal",
    "calculadora composição corporal",
    "percentual bf",
    "medição gordura corporal",
    "avaliação corporal",
    "fitness calculadora",
    "saúde corporal",
    "marinha americana método",
    "circunferência corporal",
    "análise corporal",
    "calculadora fitness",
    "percentual massa gorda",
    "composição física",
    "medidas antropométricas",
    "avaliação física online",
    "calculadora saúde",
  ],
  image: "/images/cards/gordura-corporal.webp",
  url: "/calculadoras/calculadora-gordura-corporal",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraGorduraCorporal = () => {
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
            currentCalculatorId="body-fat" 
            category="health"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraGorduraCorporal;