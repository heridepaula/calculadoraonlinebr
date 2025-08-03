import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FunctionsIcon from "@mui/icons-material/Functions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from '@mui/icons-material/Work';
import HomePageClient from '@/components/HomePageClient';

const categories = [
  {
    title: "Financeira",
    icon: <MonetizationOnIcon />,
    color: "#4caf50",
    tools: [
      {
        title: "Juros Compostos",
        description:
          "Calcule o crescimento do seu investimento ao longo do tempo.",
        image: "/images/cards/juros-compostos.webp",
        href: "/calculadoras/calculadora-juros-compostos",
      },
      {
        title: "LCI e LCA",
        description: "Simule investimentos isentos de IR com garantia FGC.",
        image: "/images/cards/lci-lca.webp",
        href: "/calculadoras/calculadora-lci-lca",
      },
      {
        title: "Primeiro Milhão",
        description: "Descubra quanto tempo ou aporte necessário para alcançar R$ 1 milhão.",
        image: "/images/cards/primeiro-milhao.webp",
        href: "/calculadoras/calculadora-primeiro-milhao",
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
        image: "/images/cards/regra-de-tres.webp",
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
        image: "/images/cards/imc.webp",
        href: "/calculadoras/calculadora-imc",
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
        image: "/images/cards/rescisao-trabalhista.webp",
        href: "/calculadoras/calculadora-rescisao",
      },
    ],
  },
];

export default function HomePage() {
  return <HomePageClient categories={categories} />;
}
