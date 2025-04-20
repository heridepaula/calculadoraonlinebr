"use client";

import {
  Box,
  Typography,
  Stack,
  Paper,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Content = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const mobileTextStyle = {
    textAlign: isMobile ? "justify" : "left",
  };

  return (
    <Box mt={4} mx="auto" maxWidth="md">
      <Stack spacing={4}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa" }}>
          <Box display="flex" alignItems="center" mb={1}>
            <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              O Poder dos Juros Compostos no Crescimento do seu Patrimônio
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Entenda como os <strong>juros compostos</strong> podem impulsionar
            seus investimentos! Para investidores de todos os níveis,
            compreender esse conceito fundamental é crucial para alcançar seus
            objetivos financeiros a longo prazo. Diferente dos juros simples,
            onde o rendimento é calculado apenas sobre o capital inicial, os{" "}
            <strong>
              juros compostos fazem seu dinheiro render sobre o valor inicial
              mais os juros acumulados
            </strong>
            . Essa "mágica" do juro sobre juro acelera o crescimento do seu
            patrimônio de forma exponencial com o tempo.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>Por que os juros compostos são tão importantes?</strong>{" "}
            Eles transformam pequenos investimentos iniciais e aportes regulares
            em quantias significativas ao longo do tempo. Seja para a sua
            aposentadoria, a compra de um imóvel ou a realização de outros
            sonhos, o efeito dos juros compostos é um poderoso aliado
            financeiro.
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Benefícios de Aproveitar os Juros Compostos
          </Typography>
          <Typography
            variant="body2"
            component="ul"
            sx={{
              listStyleType: "disc",
              pl: 2,
              lineHeight: 1.6,
              marginBottom: 2,
              ...mobileTextStyle,
            }}
          >
            <li>
              <strong>Crescimento Exponencial:</strong> Seu dinheiro cresce em
              um ritmo acelerado, especialmente em investimentos de longo prazo.
            </li>
            <li>
              <strong>Potencialização dos Reinvestimentos:</strong> Os lucros
              gerados se tornam um novo capital, gerando ainda mais lucros.
            </li>
            <li>
              <strong>Alcance de Objetivos Financeiros:</strong> Facilita a
              realização de metas financeiras de grande porte, como a
              independência financeira.
            </li>
            <li>
              <strong>Menor Necessidade de Aportes Iniciais Elevados:</strong>{" "}
              Mesmo começando com pouco, o tempo e os juros compostos trabalham
              a seu favor.
            </li>
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Diversas{" "}
            <strong>
              aplicações financeiras se beneficiam dos juros compostos
            </strong>
            , como a <strong>poupança</strong> (apesar de ter um rendimento
            menor), os <strong>CDBs (Certificados de Depósito Bancário)</strong>
            , o <strong>Tesouro Direto</strong> com seus títulos, os planos de{" "}
            <strong>previdência privada</strong> e os{" "}
            <strong>fundos de investimento</strong> que reinvestem seus lucros.
            Ao escolher seus investimentos, considere aqueles que oferecem a
            capitalização dos juros para maximizar seus retornos.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            No entanto, é crucial estar atento ao outro lado da moeda. As{" "}
            <strong>dívidas com juros compostos</strong>, como as do{" "}
            <strong>cartão de crédito</strong> e os{" "}
            <strong>empréstimos pessoais</strong>, podem crescer rapidamente se
            não forem pagas integralmente e no prazo. A falta de{" "}
            <strong>controle financeiro</strong> e o não pagamento dessas
            dívidas podem levar a um ciclo vicioso difícil de sair. Portanto, a{" "}
            <strong>educação financeira</strong> é fundamental para usar os
            juros compostos a seu favor e evitar seus efeitos negativos.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Em resumo,{" "}
            <strong>
              entender e aplicar a lógica dos juros compostos é um dos pilares
              para construir um futuro financeiro sólido e alcançar a tão
              desejada liberdade financeira
            </strong>
            . Comece a investir o quanto antes, mantenha a consistência dos seus
            aportes e deixe que o tempo e os juros compostos façam o resto.
            Utilize nossa calculadora para simular diferentes cenários e
            visualize o potencial de crescimento do seu dinheiro!
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Desvendando a Fórmula dos Juros Compostos
          </Typography>

          <Paper elevation={2} sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
            >
              Para calcular o{" "}
              <strong>
                montante final de um investimento com juros compostos
              </strong>
              , utilizamos a seguinte fórmula matemática:
            </Typography>

            <Box
              p={2}
              bgcolor="#fff"
              borderRadius={2}
              boxShadow={1}
              mb={2}
              textAlign="center"
              fontFamily="monospace"
              fontSize="1rem"
            >
              M = C × (1 + i)<sup>n</sup>
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ lineHeight: 1.6, marginBottom: 1, ...mobileTextStyle }}
            >
              Onde cada variável representa:
              <br />– <strong>M (Montante Final):</strong> O valor total do
              investimento ao final do período, incluindo o capital inicial e os
              juros acumulados.
              <br />– <strong>C (Capital Inicial):</strong> O valor principal
              investido inicialmente.
              <br />– <strong>i (Taxa de Juros):</strong> A taxa de rendimento
              por período, expressa em formato decimal (por exemplo, 5% ao mês é
              0.05).
              <br />– <strong>n (Número de Períodos):</strong> O número total de
              períodos de capitalização (meses, anos, etc.).
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 2,
                lineHeight: 1.6,
                marginBottom: 2,
                ...mobileTextStyle,
              }}
            >
              Compreender cada elemento da fórmula é essencial para planejar
              seus investimentos e interpretar os resultados de simulações. A{" "}
              <strong>taxa de juros</strong> e o{" "}
              <strong>período de investimento</strong> são fatores cruciais que
              impactam diretamente o montante final. Quanto maior a taxa e o
              prazo, maior será o efeito dos juros compostos.
            </Typography>
          </Paper>

          <Divider sx={{ my: 2 }} />

          <Paper
            elevation={1}
            sx={{
              p: 2,
              backgroundColor: "#e3f2fd",
              borderLeft: "4px solid #1976d2",
            }}
          >
            <Typography
              variant="body2"
              fontWeight="bold"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 1, ...mobileTextStyle }}
            >
              Exemplo Prático de Juros Compostos:
            </Typography>
            <Typography
              variant="caption"
              fontFamily="monospace"
              sx={{ lineHeight: 1.6, ...mobileTextStyle }}
            >
              Imagine que você invista um <strong>Capital Inicial (C)</strong>{" "}
              de R$ 1.000 a uma <strong>Taxa de Juros (i)</strong> de 1% ao mês
              (0.01) durante um <strong>Número de Períodos (n)</strong> de 12
              meses.
              <br />
              <br />O cálculo seria: M = 1000 × (1 + 0.01)<sup>12</sup> ≈ R$
              1.126,83.
              <br />
              <br />
              Isso significa que, ao final de um ano, você teria um montante
              final de aproximadamente R$ 1.126,83, sendo R$ 126,83 de juros
              acumulados sobre o seu investimento inicial. Este exemplo ilustra
              o poder do crescimento gradual proporcionado pelos juros
              compostos.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;
