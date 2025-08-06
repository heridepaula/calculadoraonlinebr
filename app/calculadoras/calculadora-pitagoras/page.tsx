import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: 'Calculadora do Teorema de Pitágoras | Calcular Hipotenusa Online',
  description: 'Calculadora online do Teorema de Pitágoras para calcular hipotenusa, catetos e resolver triângulos retângulos. Fórmulas, exemplos e aplicações práticas.',
  keywords: [
    'calculadora teorema pitagoras',
    'calcular hipotenusa',
    'teorema de pitágoras',
    'calculadora hipotenusa',
    'triângulo retângulo',
    'catetos',
    'cateto adjacente',
    'cateto oposto',
    'fórmula pitagórica',
    'pitágoras online',
    'matemática',
    'geometria',
    'trigonometria',
    'pitágoras',
    'fórmula pitagórica',
    'triângulo',
    'matemática prática'
  ],
  image: '/images/cards/pitagoras.webp',
  url: '/calculadoras/calculadora-pitagoras',
  structuredDataType: 'calculator' as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraPitagoras = () => {
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
            currentCalculatorId="calculadora-pitagoras" 
            category="math"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraPitagoras;