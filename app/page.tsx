import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Avatar,
} from "@mui/material";
import Image from "next/image";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FunctionsIcon from "@mui/icons-material/Functions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from '@mui/icons-material/Work';

import { componentStyles } from '@/src/styles/components';

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
  return (
    <Container sx={componentStyles.homepage.container}>
      {categories.map((category) => (
        <Box key={category.title} sx={componentStyles.homepage.categoryContainer}>
          <Box
            sx={{
              ...componentStyles.homepage.categoryHeader,
              borderBottom: `2px solid ${category.color}`,
            }}
          >
            <Avatar
              sx={{
                ...componentStyles.homepage.categoryAvatar,
                bgcolor: category.color,
              }}
            >
              {category.icon}
            </Avatar>
            <Typography variant="h5" sx={componentStyles.homepage.categoryTitle}>
              {category.title}
            </Typography>
          </Box>

          <Grid container spacing={2} id={category.title.toLowerCase()}>
            {category.tools.map((tool) => (
              <Grid key={tool.title} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Card sx={componentStyles.homepage.toolCard}>
                  <CardActionArea
                    href={tool.href}
                    sx={componentStyles.homepage.toolCardAction}
                  >
                    <CardMedia sx={componentStyles.homepage.toolCardMedia}>
                      <Image
                        src={tool.image}
                        alt={tool.title}
                        fill
                        style={{ 
                          objectFit: "contain",
                          objectPosition: "center",
                          padding: "8px"
                        }}
                      />
                    </CardMedia>
                    <CardContent sx={componentStyles.homepage.toolCardContent}>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={componentStyles.homepage.toolCardTitle}
                      >
                        {tool.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={componentStyles.homepage.toolCardDescription}
                      >
                        {tool.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
}
