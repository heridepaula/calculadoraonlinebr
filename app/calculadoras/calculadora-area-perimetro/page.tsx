import { Metadata } from "next";
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de Área e Perímetro - 15+ Figuras Geométricas 2025",
  description: "Calcule área e perímetro de triângulo, círculo, retângulo, trapézio e mais figuras geométricas com visualização 3D e fórmulas passo a passo.",
  keywords: [
    "calculadora área perímetro",
    "área triângulo",
    "perímetro círculo",
    "área retângulo",
    "área trapézio",
    "área losango",
    "área hexágono",
    "figuras geométricas",
    "geometria plana",
    "matemática geometria",
    "cálculo área",
    "cálculo perímetro",
    "fórmulas geométricas",
    "geometria básica",
    "ensino fundamental",
    "ensino médio",
    "matemática visual",
    "polígonos área",
    "círculo área",
    "superfície geometria",
    "contorno figura",
    "medidas geométricas",
    "área polígono regular",
    "área polígono irregular",
    "geometria analítica",
    "figuras planas",
    "calculadora matemática",
    "ENEM geometria",
    "vestibular matemática",
  ],
  image: "/images/cards/area-perimetro.webp",
  url: "/calculadoras/calculadora-area-perimetro",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const CalculadoraAreaPerimetro = () => {
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
            currentCalculatorId="calculadora-area-perimetro" 
            category="math"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraAreaPerimetro;