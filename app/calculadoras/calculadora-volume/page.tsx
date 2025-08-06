import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: 'Calculadora de Volume | Calcule Volume de Sólidos Geométricos',
  description: 'Calculadora online de volume para sólidos geométricos: esfera, cilindro, cone, cubo, prisma e mais. Fórmulas, exemplos e visualização 3D.',
  keywords: [
    'calculadora de volume',
    'volume esfera',
    'volume cilindro',
    'volume cone',
    'volume cubo',
    'volume prisma',
    'geometria espacial',
    'sólidos geométricos',
    'fórmulas de volume',
    'matemática',
    'geometria',
    'cálculo de volume',
    'volume paralelepípedo',
    'volume pirâmide'
  ],
  image: '/images/cards/volume.webp',
  url: '/calculadoras/calculadora-volume',
  structuredDataType: 'calculator' as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraVolume = () => {
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
            currentCalculatorId="calculadora-volume" 
            category="math"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraVolume;