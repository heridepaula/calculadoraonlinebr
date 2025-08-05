import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FunctionsIcon from "@mui/icons-material/Functions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from '@mui/icons-material/Work';
import dynamic from 'next/dynamic';
import CriticalResourceLoader from '@/components/CriticalResourceLoader';
import { Metadata } from 'next';

// Configure revalidation for homepage SEO
export const revalidate = 1800; // Revalidate every 30 minutes

// Lazy load only the heavy HomePageClient component with better performance
const HomePageClient = dynamic(() => import('@/components/HomePageClient'), { 
  loading: () => <div style={{ 
    height: '200px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    fontSize: '14px',
    color: '#666'
  }}>Carregando calculadoras...</div>
});

export const metadata: Metadata = {
  title: 'Calculadoras Online Gratuitas | Financeira, Matemática, Saúde e Trabalhista',
  description: 'Acesse gratuitamente mais de 10 calculadoras online: Juros Compostos, IMC, CDB, Tesouro Direto, Rescisão Trabalhista e muito mais. Rápido, fácil e preciso.',
  keywords: 'calculadora online, juros compostos, imc, cdb, tesouro direto, rescisão trabalhista, lci lca, calculadora financeira, calculadora matemática, calculadora saúde',
  openGraph: {
    title: 'Calculadoras Online Gratuitas',
    description: 'Mais de 10 calculadoras online gratuitas para suas necessidades financeiras, matemáticas, de saúde e trabalhistas.',
    type: 'website',
    url: 'https://calculadoraonline.com.br',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadoras Online Gratuitas',
    description: 'Mais de 10 calculadoras online gratuitas para suas necessidades financeiras, matemáticas, de saúde e trabalhistas.',
  },
};

const categories = [
  {
    title: "Financeira",
    icon: <MonetizationOnIcon />,
    color: "#4caf50",
    tools: [
      {
        title: "Juros Compostos",
        description: "Calcule o crescimento do seu investimento ao longo do tempo.",
        href: "/calculadoras/calculadora-juros-compostos",
      },
      {
        title: "LCI e LCA",
        description: "Simule investimentos isentos de IR com garantia FGC.",
        href: "/calculadoras/calculadora-lci-lca",
      },
      {
        title: "Primeiro Milhão",
        description: "Descubra quanto tempo ou aporte necessário para alcançar R$ 1 milhão.",
        href: "/calculadoras/calculadora-primeiro-milhao",
      },
      {
        title: "Preço Médio",
        description: "Calcule o preço médio das suas ações com aportes regulares.",
        href: "/calculadoras/calculadora-preco-medio",
      },
      {
        title: "CDB",
        description: "Simule a rentabilidade do seu Certificado de Depósito Bancário.",
        href: "/calculadoras/calculadora-cdb",
      },
      {
        title: "Comparador de Renda Fixa",
        description: "Compare CDB, LCI/LCA, Tesouro SELIC e Poupança para escolher o melhor investimento.",
        href: "/calculadoras/comparador-renda-fixa",
      },
      {
        title: "Tesouro Direto",
        description: "Simule investimentos em títulos públicos federais: Prefixado, Selic e IPCA+.",
        href: "/calculadoras/calculadora-tesouro-direto",
      },
      {
        title: "Financiamento Imobiliário",
        description: "Simule financiamentos SAC e Price com FGTS, subsídios governamentais e seguros.",
        href: "/calculadoras/calculadora-financiamento-imobiliario",
      },
      {
        title: "Empréstimo Consignado",
        description: "Simule empréstimo consignado para INSS, servidores públicos e CLT com margem consignável.",
        href: "/calculadoras/calculadora-emprestimo-consignado",
      },
    ],
  },
  {
    title: "Matemática",
    icon: <FunctionsIcon />,
    color: "#3f51b5",
    tools: [
      {
        title: "Regra de Três",
        description: "Resolva proporções com facilidade e precisão.",
        href: "/calculadoras/regra-de-tres-simples",
      },
    ],
  },
  {
    title: "Saúde",
    icon: <FavoriteIcon />,
    color: "#f44336",
    tools: [
      {
        title: "IMC (Índice de Massa Corporal)",
        description: "Verifique se seu peso está dentro do ideal.",
        href: "/calculadoras/calculadora-imc",
      },
      {
        title: "Percentual de Gordura Corporal",
        description: "Calcule seu percentual de gordura usando o método US Navy.",
        href: "/calculadoras/calculadora-gordura-corporal",
      },
    ],
  },
  {
    title: "Trabalhista",
    icon: <WorkIcon />,
    color: "#380202ff",
    tools: [
      {
        title: "Rescisão Trabalhista",
        description: "Calcule o valor da rescisão do seu contrato de trabalho.",
        href: "/calculadoras/calculadora-rescisao",
      },
      {
        title: "Aposentadoria INSS + Privada",
        description: "Simule sua aposentadoria com as regras atuais do INSS e previdência privada complementar.",
        href: "/calculadoras/calculadora-aposentadoria",
      },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <CriticalResourceLoader />
      <HomePageClient categories={categories} />
    </>
  );
}
