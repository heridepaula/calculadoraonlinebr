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

  return (
    <Box mt={4} mx="auto" maxWidth="md">
      <Stack spacing={4}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa" }}>
          <Box display="flex" alignItems="center" mb={1}>
            <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Tudo Sobre o Teorema de Pitágoras
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            O <strong>Teorema de Pitágoras</strong> é um dos conceitos fundamentais da matemática, estabelecendo a relação entre os lados de um triângulo retângulo. Criado pelo matemático grego Pitágoras (c. 570-495 a.C.), este teorema afirma que em qualquer triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            <strong>O que é o Teorema de Pitágoras?</strong> O teorema estabelece que a² + b² = c², onde 'a' e 'b' são os catetos (lados que formam o ângulo reto) e 'c' é a hipotenusa (lado oposto ao ângulo reto, sempre o maior lado do triângulo). Esta relação é válida apenas para triângulos retângulos, que possuem um ângulo de 90 graus.
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
            <strong>Fórmula do Teorema de Pitágoras:</strong><br />
            a² + b² = c² ou c = √(a² + b²)
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Elementos do Triângulo Retângulo
          </Typography>

          <Typography
            variant="body2"
            component="div"
            sx={{
              lineHeight: 1.6,
              marginBottom: 2,
              textAlign: { xs: "justify", sm: "left" },
            }}
          >
            <ul style={{ paddingLeft: '1rem' }}>
              <li>
                <strong>Hipotenusa (c):</strong> O lado mais longo do triângulo retângulo, sempre oposto ao ângulo de 90°. É a diagonal que conecta os dois catetos.
              </li>
              <li>
                <strong>Cateto A (a):</strong> Um dos lados que formam o ângulo reto. Também chamado de cateto adjacente ou oposto, dependendo do ângulo de referência.
              </li>
              <li>
                <strong>Cateto B (b):</strong> O outro lado que forma o ângulo reto junto com o cateto A. Os dois catetos são sempre perpendiculares entre si.
              </li>
              <li>
                <strong>Ângulo Reto:</strong> O ângulo de 90° formado pelos dois catetos. É o que caracteriza o triângulo como retângulo.
              </li>
              <li>
                <strong>Ângulos Agudos:</strong> Os dois ângulos menores que 90°, que somados com o ângulo reto totalizam 180°.
              </li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Aplicações Práticas do Teorema de Pitágoras
          </Typography>

          <Typography
            variant="body2"
            component="div"
            sx={{
              lineHeight: 1.6,
              marginBottom: 2,
              textAlign: { xs: "justify", sm: "left" },
            }}
          >
            <ul style={{ paddingLeft: '1rem' }}>
              <li>
                <strong>Construção Civil:</strong> Verificar se estruturas estão em esquadro (ângulo reto) usando a regra 3-4-5. Se os lados medem 3m, 4m e 5m, o ângulo é de 90°.
              </li>
              <li>
                <strong>Navegação e GPS:</strong> Calcular a distância direta entre dois pontos quando conhecemos os deslocamentos nas direções norte-sul e leste-oeste.
              </li>
              <li>
                <strong>Arquitetura:</strong> Determinar o comprimento de diagonais em plantas baixas, calcular a inclinação de telhados e rampas.
              </li>
              <li>
                <strong>Engenharia:</strong> Calcular forças resultantes quando duas forças perpendiculares atuam sobre um objeto.
              </li>
              <li>
                <strong>Astronomia:</strong> Determinar distâncias entre corpos celestes usando triangulação.
              </li>
              <li>
                <strong>Computação Gráfica:</strong> Calcular distâncias em jogos 2D e 3D, algoritmos de pathfinding.
              </li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Como Aplicar o Teorema de Pitágoras
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
            <strong>Casos de Aplicação:</strong><br /><br />
            • <strong>Encontrar a Hipotenusa:</strong> c = √(a² + b²)<br />
            • <strong>Encontrar um Cateto:</strong> a = √(c² - b²) ou b = √(c² - a²)<br />
            • <strong>Verificar Triângulo Retângulo:</strong> Se a² + b² = c², então é retângulo<br />
            • <strong>Regra 3-4-5:</strong> Múltiplos de 3, 4, 5 sempre formam triângulo retângulo<br />
            • <strong>Outros Trios Pitagóricos:</strong> 5-12-13, 8-15-17, 7-24-25, etc.
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Trios Pitagóricos Famosos
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Os <strong>trios pitagóricos</strong> são conjuntos de três números inteiros positivos que satisfazem o teorema de Pitágoras. O mais famoso é o trio 3-4-5:
          </Typography>

          <Typography
            variant="body2"
            component="div"
            sx={{
              lineHeight: 1.6,
              marginBottom: 2,
              textAlign: { xs: "justify", sm: "left" },
            }}
          >
            <ul style={{ paddingLeft: '1rem' }}>
              <li><strong>3-4-5:</strong> 3² + 4² = 9 + 16 = 25 = 5²</li>
              <li><strong>5-12-13:</strong> 5² + 12² = 25 + 144 = 169 = 13²</li>
              <li><strong>8-15-17:</strong> 8² + 15² = 64 + 225 = 289 = 17²</li>
              <li><strong>7-24-25:</strong> 7² + 24² = 49 + 576 = 625 = 25²</li>
              <li><strong>9-40-41:</strong> 9² + 40² = 81 + 1600 = 1681 = 41²</li>
              <li><strong>Múltiplos:</strong> 6-8-10, 9-12-15, 15-20-25 (múltiplos do 3-4-5)</li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            História e Curiosidades
          </Typography>

          <Typography
            variant="body2"
            component="div"
            sx={{
              lineHeight: 1.6,
              marginBottom: 2,
              textAlign: { xs: "justify", sm: "left" },
            }}
          >
            <ul style={{ paddingLeft: '1rem' }}>
              <li>
                <strong>Antiguidade:</strong> O teorema era conhecido pelos babilônios cerca de 1000 anos antes de Pitágoras, mas ele foi o primeiro a prová-lo matematicamente.
              </li>
              <li>
                <strong>Mais de 400 Provas:</strong> Existem mais de 400 demonstrações diferentes do teorema, incluindo provas geométricas, algébricas e por semelhança.
              </li>
              <li>
                <strong>Aplicação Universal:</strong> É um dos teoremas mais aplicados na prática, usado em virtualmente todas as áreas que envolvem medições.
              </li>
              <li>
                <strong>Base da Trigonometria:</strong> O teorema é fundamental para o desenvolvimento das funções trigonométricas.
              </li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Exemplos Práticos de Cálculo
          </Typography>

          <Box
            p={2}
            bgcolor="#fff"
            borderRadius={2}
            boxShadow={1}
            mb={2}
            fontSize="0.85rem"
          >
            <strong>Exemplo 1 - Encontrar a Hipotenusa:</strong><br />
            Catetos de 3m e 4m<br />
            c = √(3² + 4²) = √(9 + 16) = √25 = 5m<br /><br />
            
            <strong>Exemplo 2 - Encontrar um Cateto:</strong><br />
            Hipotenusa de 13m e cateto de 5m<br />
            b = √(13² - 5²) = √(169 - 25) = √144 = 12m<br /><br />
            
            <strong>Exemplo 3 - Verificar Esquadro:</strong><br />
            Lados de 6m, 8m e 10m<br />
            6² + 8² = 36 + 64 = 100 = 10² ✓ (É retângulo)
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Relação com Trigonometria
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            O Teorema de Pitágoras é a base para as funções trigonométricas fundamentais:
          </Typography>

          <Typography
            variant="body2"
            component="div"
            sx={{
              lineHeight: 1.6,
              marginBottom: 2,
              textAlign: { xs: "justify", sm: "left" },
            }}
          >
            <ul style={{ paddingLeft: '1rem' }}>
              <li><strong>Seno (sen):</strong> razão entre cateto oposto e hipotenusa</li>
              <li><strong>Cosseno (cos):</strong> razão entre cateto adjacente e hipotenusa</li>
              <li><strong>Tangente (tan):</strong> razão entre cateto oposto e cateto adjacente</li>
              <li><strong>Identidade Fundamental:</strong> sen²θ + cos²θ = 1 (derivada do teorema)</li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Dicas para Resolver Problemas
          </Typography>

          <Typography
            variant="body2"
            component="div"
            sx={{
              lineHeight: 1.6,
              marginBottom: 2,
              textAlign: { xs: "justify", sm: "left" },
            }}
          >
            <ul style={{ paddingLeft: '1rem' }}>
              <li><strong>Identifique o Triângulo Retângulo:</strong> Procure por ângulos de 90° no problema</li>
              <li><strong>Nomeie os Lados:</strong> Identifique qual é a hipotenusa e quais são os catetos</li>
              <li><strong>Use as Unidades Certas:</strong> Mantenha consistência nas unidades de medida</li>
              <li><strong>Verifique a Resposta:</strong> Substitua na fórmula original para confirmar</li>
              <li><strong>Desenhe o Triângulo:</strong> Um esboço ajuda a visualizar o problema</li>
            </ul>
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Importância na Educação e Profissões
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
            >
              O domínio do Teorema de Pitágoras é fundamental em diversas áreas:
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{
                lineHeight: 1.6,
                marginBottom: 2,
                textAlign: { xs: "justify", sm: "left" },
              }}
            >
              <ul style={{ paddingLeft: '1rem' }}>
                <li>
                  <strong>Base Matemática:</strong> Fundamental para geometria, trigonometria, álgebra e cálculo. É pré-requisito para estudos avançados em STEM.
                </li>
                <li>
                  <strong>Aplicações Profissionais:</strong> Essencial para engenheiros, arquitetos, topógrafos, designers, programadores e técnicos em diversas áreas.
                </li>
                <li>
                  <strong>Resolução de Problemas:</strong> Desenvolve o raciocínio lógico e a capacidade de abstrair problemas reais em modelos matemáticos.
                </li>
                <li>
                  <strong>Tecnologia:</strong> Base para algoritmos de computação gráfica, GPS, realidade aumentada e muitas aplicações modernas.
                </li>
                <li>
                  <strong>Vida Cotidiana:</strong> Útil para reformas domésticas, jardinagem, esportes e diversas situações práticas do dia a dia.
                </li>
              </ul>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, textAlign: { xs: "justify", sm: "left" } }}
            >
              Nossa calculadora oferece não apenas os cálculos, mas também visualizações do triângulo e exemplos de aplicações práticas. Use a ferramenta para compreender melhor as relações entre os lados e ângulos, facilitando o aprendizado e a aplicação do teorema.
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, marginTop: 2, textAlign: { xs: "justify", sm: "left" } }}
            >
              Para aprofundar seus conhecimentos em matemática, consulte materiais do{" "}
              <Link
                href="https://www.khanacademy.org/math"
                target="_blank"
                rel="noopener noreferrer"
                color="#0fa4d5"
              >
                Khan Academy
              </Link>{" "}
              ou{" "}
              <Link
                href="https://pt.wikipedia.org/wiki/Teorema_de_Pit%C3%A1goras"
                target="_blank"
                rel="noopener noreferrer"
                color="#0fa4d5"
              >
                Wikipedia
              </Link>
              .
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;