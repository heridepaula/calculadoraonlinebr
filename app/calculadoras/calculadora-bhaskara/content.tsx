"use client";

import {
  Box,
  Typography,
  Stack,
  Paper,
  useTheme,
  Link,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Content = () => {
  const theme = useTheme();

  const mobileTextStyle = {
    textAlign: { xs: "justify", sm: "left" },
  };

  return (
    <Box mt={4} mx="auto" maxWidth="md">
      <Stack spacing={4}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa" }}>
          <Box display="flex" alignItems="center" mb={1}>
            <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Equação do 2º Grau e Fórmula de Bhaskara - Guia Completo 2025
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            A <strong>equação do segundo grau</strong>, também conhecida como equação quadrática, é uma das bases fundamentais da matemática do ensino médio. Representada pela forma geral <strong>ax² + bx + c = 0</strong>, onde <em>a ≠ 0</em>, essa equação é resolvida principalmente através da <strong>Fórmula de Bhaskara</strong>, uma ferramenta essencial para estudantes que se preparam para o ENEM e vestibulares.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>O que é a Equação do 2º Grau?</strong> É uma equação polinomial onde a maior potência da incógnita x é 2 (dois). Seus coeficientes são: <em>a</em> (coeficiente de x²), <em>b</em> (coeficiente de x) e <em>c</em> (termo independente). O coeficiente <em>a</em> nunca pode ser zero, pois isso descaracterizaria a equação como sendo do segundo grau.
          </Typography>

          <Box
            p={2}
            bgcolor="#fff"
            borderRadius={2}
            boxShadow={1}
            mb={2}
            textAlign="center"
            fontSize="0.9rem"
          >
            <strong>Fórmula de Bhaskara:</strong><br />
            x = (-b ± √Δ) / (2a)<br />
            <strong>Discriminante:</strong> Δ = b² - 4ac
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            📚 História da Fórmula de Bhaskara
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Embora seja conhecida no Brasil como <strong>Fórmula de Bhaskara</strong>, em homenagem ao matemático indiano Bhaskara Akaria (1114-1185), esta fórmula já era conhecida pelos matemáticos árabes e europeus muito antes. Bhaskara foi um dos primeiros a sistematizar e generalizar o método, tornando-se uma referência na resolução de equações quadráticas.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            No ensino brasileiro, a fórmula ganhou popularidade através da música criada por estudantes: <em>&quot;Você separa o A, separa o B e separa o C, ó baby / Depois calcula o DELTA que é B ao quadrado, menos 4AC, ó baby / E o X, agora, menos B, mais ou menos raiz de DELTA, sobre 2A&quot;</em>. Esta memorização musical ajuda milhares de estudantes todos os anos.
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🔢 Tipos de Equações do 2º Grau
          </Typography>

          <Typography
            variant="body2"
            component="div"
            sx={{
              lineHeight: 1.6,
              marginBottom: 2,
              ...mobileTextStyle,
            }}
          >
            <ul style={{ listStyleType: "disc", paddingLeft: 16 }}>
              <li>
                <strong>Equação Completa:</strong> Possui todos os coeficientes diferentes de zero (ax² + bx + c = 0). Exemplo: 2x² + 5x - 3 = 0
              </li>
              <li>
                <strong>Equação Incompleta:</strong> Um ou mais coeficientes (b ou c) são iguais a zero:
                <ul style={{ marginTop: 8, marginLeft: 16 }}>
                  <li><strong>Tipo 1:</strong> ax² + c = 0 (b = 0). Exemplo: x² - 9 = 0</li>
                  <li><strong>Tipo 2:</strong> ax² + bx = 0 (c = 0). Exemplo: 3x² + 2x = 0</li>
                  <li><strong>Tipo 3:</strong> ax² = 0 (b = c = 0). Exemplo: 5x² = 0</li>
                </ul>
              </li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            📊 Discriminante (Δ) - A Chave para as Raízes
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O <strong>discriminante (Δ)</strong> é calculado pela fórmula <strong>Δ = b² - 4ac</strong> e determina a natureza das raízes da equação. É através do valor de delta que sabemos quantas e quais tipos de soluções a equação possui, antes mesmo de aplicar a fórmula de Bhaskara.
          </Typography>

          <Box
            p={2}
            bgcolor="#fff"
            borderRadius={2}
            boxShadow={1}
            mb={2}
            fontFamily="monospace"
            fontSize="0.85rem"
          >
            <strong>Análise do Discriminante:</strong><br /><br />
            • <strong>Δ &gt; 0:</strong> Duas raízes reais e distintas<br />
            • <strong>Δ = 0:</strong> Duas raízes reais e iguais (ou uma raiz dupla)<br />
            • <strong>Δ &lt; 0:</strong> Não possui raízes reais (raízes complexas)<br /><br />
            <strong>Exemplo:</strong><br />
            Para x² - 5x + 6 = 0: a=1, b=-5, c=6<br />
            Δ = (-5)² - 4(1)(6) = 25 - 24 = 1 &gt; 0<br />
            Logo: duas raízes reais distintas
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            📈 Gráfico da Função Quadrática - A Parábola
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Toda equação do segundo grau está associada a uma <strong>função quadrática f(x) = ax² + bx + c</strong>, cujo gráfico é uma <strong>parábola</strong>. As raízes da equação correspondem aos pontos onde a parábola intercepta o eixo x (quando f(x) = 0).
          </Typography>

          <Typography
            variant="body2"
            component="div"
            sx={{
              lineHeight: 1.6,
              marginBottom: 2,
              ...mobileTextStyle,
            }}
          >
            <ul style={{ listStyleType: "disc", paddingLeft: 16 }}>
              <li><strong>Concavidade:</strong> Se a &gt; 0, a parábola tem concavidade para cima (forma de U). Se a &lt; 0, tem concavidade para baixo (forma de ∩)</li>
              <li><strong>Vértice:</strong> Ponto máximo ou mínimo da parábola, com coordenadas V(xᵥ, yᵥ) onde xᵥ = -b/(2a) e yᵥ = -Δ/(4a)</li>
              <li><strong>Eixo de Simetria:</strong> Reta vertical x = -b/(2a) que passa pelo vértice</li>
              <li><strong>Interceptação com eixo y:</strong> Ponto (0, c) onde a parábola cruza o eixo y</li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            💡 Exemplos Práticos Resolvidos
          </Typography>

          <Box
            p={2}
            bgcolor="#fff"
            borderRadius={2}
            boxShadow={1}
            mb={2}
            fontFamily="monospace"
            fontSize="0.85rem"
          >
            <strong>Exemplo 1: Duas raízes distintas</strong><br />
            Equação: x² - 5x + 6 = 0<br />
            a = 1, b = -5, c = 6<br /><br />
            
            Δ = (-5)² - 4(1)(6) = 25 - 24 = 1<br />
            Como Δ &gt; 0, há duas raízes reais distintas:<br /><br />
            
            x₁ = (5 + √1) / 2 = 6/2 = 3<br />
            x₂ = (5 - √1) / 2 = 4/2 = 2<br /><br />
            
            <strong>Exemplo 2: Raiz dupla</strong><br />
            Equação: x² - 4x + 4 = 0<br />
            a = 1, b = -4, c = 4<br /><br />
            
            Δ = (-4)² - 4(1)(4) = 16 - 16 = 0<br />
            Como Δ = 0, há uma raiz dupla:<br /><br />
            
            x = 4 / (2·1) = 2<br /><br />
            
            <strong>Exemplo 3: Sem raízes reais</strong><br />
            Equação: x² + x + 1 = 0<br />
            a = 1, b = 1, c = 1<br /><br />
            
            Δ = (1)² - 4(1)(1) = 1 - 4 = -3<br />
            Como Δ &lt; 0, não há raízes reais
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🎓 Aplicações no ENEM e Vestibulares 2025
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            As equações do segundo grau são conteúdo obrigatório no ENEM e aparecem em diversos contextos nos vestibulares:
          </Typography>

          <Typography
            variant="body2"
            component="div"
            sx={{
              lineHeight: 1.6,
              marginBottom: 2,
              ...mobileTextStyle,
            }}
          >
            <ul style={{ listStyleType: "disc", paddingLeft: 16 }}>
              <li><strong>Problemas de Máximos e Mínimos:</strong> Lucro máximo, área máxima, otimização de recursos</li>
              <li><strong>Física:</strong> Movimento uniformemente variado, lançamento de projéteis, queda livre</li>
              <li><strong>Geometria:</strong> Cálculo de áreas, perímetros e volumes</li>
              <li><strong>Problemas do Cotidiano:</strong> Situações envolvendo tempo, velocidade, produção</li>
              <li><strong>Funções Quadráticas:</strong> Análise de gráficos, vértice, concavidade</li>
            </ul>
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Nossa calculadora oferece resolução automática com visualização gráfica e explicação passo a passo, ideal para estudar e verificar exercícios. Para dúvidas mais complexas sobre teoria matemática, consulte sempre seu professor ou materiais didáticos atualizados.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para mais informações sobre matemática e preparação para vestibulares, consulte o{" "}
            <Link
              href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              portal oficial do ENEM
            </Link>{" "}
            ou a{" "}
            <Link
              href="https://www.somatematica.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              plataforma Só Matemática
            </Link>
            .
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Importância no Ensino e Carreira
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
            >
              O domínio das equações do segundo grau é fundamental para o sucesso acadêmico e profissional:
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{
                lineHeight: 1.6,
                marginBottom: 2,
                ...mobileTextStyle,
              }}
            >
              <ul style={{ listStyleType: "disc", paddingLeft: 16 }}>
                <li>
                  <strong>Base para temas avançados:</strong> Cálculo diferencial e integral, física avançada, engenharia e economia dependem deste conhecimento.
                </li>
                <li>
                  <strong>Raciocínio lógico:</strong> Desenvolve habilidades de resolução de problemas e pensamento analítico essenciais em qualquer carreira.
                </li>
                <li>
                  <strong>Aplicações práticas:</strong> Desde cálculos arquitetônicos até análises financeiras, as equações quadráticas estão presentes no cotidiano profissional.
                </li>
                <li>
                  <strong>Preparação vestibular:</strong> Tópico de alta frequência no ENEM, FUVEST, UNICAMP e demais vestibulares competitivos.
                </li>
                <li>
                  <strong>Desenvolvimento matemático:</strong> Estabelece as bases para compreensão de funções, limites, derivadas e outros conceitos do ensino superior.
                </li>
              </ul>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, ...mobileTextStyle }}
            >
              Invista tempo no domínio completo deste conteúdo. A compreensão sólida das equações do segundo grau abrirá portas para temas mais avançados e contribuirá significativamente para seu sucesso em matemática e ciências exatas.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;