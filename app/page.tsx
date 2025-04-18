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
        image: "/images/cards/juros-compostos.png",
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
        image: "/images/cards/regra-de-tres.png",
        href: "/calculadoras/regra-de-tres",
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
        image: "/images/cards/imc.png",
        href: "/calculadoras/imc",
      },
    ],
  },
];

export default function HomePage() {
  return (
    <Container sx={{ py: { xs: 4, md: 6 } }}>
      {categories.map((category) => (
        <Box key={category.title} sx={{ mb: 8 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              borderBottom: `2px solid ${category.color}`,
              pb: 1,
            }}
          >
            <Avatar
              sx={{
                bgcolor: category.color,
                mr: 1,
                width: 40,
                height: 40,
              }}
            >
              {category.icon}
            </Avatar>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, }}
            >
              {category.title}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {category.tools.map((tool) => (
              <Grid key={tool.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    overflow: "hidden",
                    transition: "transform 0.2s ease, box-shadow 0.3s ease",
                    boxShadow: 2,
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                    "&:active": {
                      transform: "translateY(0)",
                      boxShadow: 2,
                    },
                  }}
                >
                  <CardActionArea
                    href={tool.href}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <CardMedia
                      sx={{
                        height: 160,
                        width: "100%",
                        position: "relative",
                        filter: "brightness(0.95)",
                      }}
                    >
                      <Image
                        src={tool.image}
                        alt={tool.title}
                        fill
                        style={{ objectFit: "cover" }}
                        
                      />
                    </CardMedia>
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        {tool.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
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
