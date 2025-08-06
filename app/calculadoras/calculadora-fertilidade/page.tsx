import { Metadata } from 'next';
import { createCalculatorMetadata } from "@/lib/utils/calculator";
import CalculatorPage from "@/components/ui/CalculatorPage";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Container } from "@mui/material";

import Content from "./content";
import Main from "./main";

const calculatorMetadata = {
  title: "Calculadora de Fertilidade e Ciclo Menstrual | Período Fértil 2025",
  description: "Calcule seu período fértil, data de ovulação e melhores dias para engravidar. Ferramenta gratuita com base científica para planejamento da gravidez e controle do ciclo menstrual.",
  keywords: [
    "calculadora fertilidade",
    "período fértil",
    "ovulação",
    "ciclo menstrual",
    "engravidar",
    "concepção",
    "planejamento gravidez",
    "tabelinha",
    "dias férteis",
    "calculadora ovulação",
    "fertilidade feminina",
    "gravidez planejamento",
    "ciclo reprodutivo",
    "calendário fertilidade",
    "período ovulatório"
  ],
  image: "/images/cards/fertilidade.webp",
  url: "/calculadoras/calculadora-fertilidade",
  structuredDataType: "calculator" as const,
};

export const metadata: Metadata = createCalculatorMetadata(calculatorMetadata);

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Calculadora de Fertilidade e Ciclo Menstrual',
  description: 'Ferramenta online gratuita para calcular período fértil, ovulação e planejamento da gravidez',
  url: 'https://calculadoraonline.com.br/calculadoras/calculadora-fertilidade',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any',
  permissions: 'browser',
  isAccessibleForFree: true,
  creator: {
    '@type': 'Organization',
    name: 'Calculadora Online Brasil',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'BRL',
  },
};

const CalculadoraFertilidade = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container maxWidth="lg">
        <Breadcrumbs />
      </Container>
      <Main />
      <CalculatorPage metadata={calculatorMetadata}>
        <Content />
        <Container maxWidth="lg">
          <RelatedCalculators 
            currentCalculatorId="calculadora-fertilidade" 
            category="health"
            maxItems={3}
          />
        </Container>
      </CalculatorPage>
    </>
  );
};

export default CalculadoraFertilidade;