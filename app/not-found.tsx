import { Box, Typography, Container } from "@mui/material";
import Image from "next/image";

export default function Custom404() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Image
          src="/images/404.png"
          alt="Página não encontrada"
          width={300}
          height={300}
        />
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        Ops, não consegui calcular a página!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Parece que a página que você está procurando não existe. Que tal voltar para o início e tentar outra fórmula?
      </Typography>
    </Container>
  );
}
