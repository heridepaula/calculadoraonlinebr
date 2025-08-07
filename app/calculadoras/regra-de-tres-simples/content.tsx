"use client";

import {
  Box,
  Typography,
  Stack,
  Paper,
  useTheme,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Content = () => {
  const theme = useTheme();

  return (
    <Box mt={4} mx="auto" maxWidth="md">
      <Stack spacing={4}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa" }}>
          <Box display="flex" alignItems="center" mb={1}>
            <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Regra de Três Simples: A Maneira Rápida de Resolver Proporções
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            A <strong>regra de três simples</strong> é um método matemático
            prático para resolver problemas que envolvem proporções entre duas
            grandezas. Seja para ajustar receitas, calcular preços proporcionais
            ou entender relações em física e química, essa ferramenta é
            extremamente útil no dia a dia.
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            O que é Regra de Três Simples?
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            A regra de três simples é utilizada quando há uma relação de
            proporcionalidade entre duas grandezas, e conhecemos três dos quatro
            valores envolvidos. O objetivo é encontrar o valor desconhecido
            mantendo a proporção entre as grandezas.
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Como Funciona: Proporcionalidade Direta e Inversa
          </Typography>
          <Typography
            variant="body2"
            component="ul"
            sx={{
              listStyleType: "disc",
              pl: 2,
              lineHeight: 1.6,
              marginBottom: 2,
              textAlign: { xs: "justify", sm: "left" },
            }}
          >
            <li>
              <strong>Proporcionalidade Direta:</strong> Quando uma grandeza
              aumenta, a outra também aumenta na mesma proporção. Fórmula: \(X =
              (B \times C) / A\)
            </li>
            <li>
              <strong>Proporcionalidade Inversa:</strong> Quando uma grandeza
              aumenta, a outra diminui na mesma proporção. Fórmula: \(X = (A
              \times B) / C\)
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Exemplo Prático: Regra de Três Simples Direta
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Suponha que 3 ovos são suficientes para fazer um bolo para 6
            pessoas. Quantos ovos seriam necessários para um bolo para 12
            pessoas?
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Montamos a proporção:
            <br />
            3 ovos — 6 pessoas
            <br />
            X ovos — 12 pessoas
            <br />
            Aplicamos a fórmula direta: \(X = (3 \times 12) / 6 = 6\)
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            A regra de três simples é direta, fácil de aplicar e resolve
            diversos problemas cotidianos com agilidade. Saber identificar se a
            relação é direta ou inversa é o primeiro passo para usá-la
            corretamente.
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};

export default Content;
