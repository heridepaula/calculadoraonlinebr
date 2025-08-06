"use client";

import {
  Box,
  Typography,
  Stack,
  Paper,
  useMediaQuery,
  useTheme,
  Link,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Content = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const mobileTextStyle = {
    textAlign: isMobile ? ("justify" as const) : ("left" as const),
  };

  return (
    <Box mt={4} mx="auto" maxWidth="md">
      <Stack spacing={4}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa" }}>
          <Box display="flex" alignItems="center" mb={1}>
            <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              MMC e MDC - Guia Completo com Árvore de Fatores 2025
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O <strong>MMC (Mínimo Múltiplo Comum)</strong> e o <strong>MDC (Máximo Divisor Comum)</strong> são conceitos fundamentais da matemática básica, essenciais para estudantes do ensino fundamental e médio. Nossa calculadora oferece visualização através de <strong>árvores de fatores animadas</strong>, facilitando o aprendizado da decomposição em fatores primos.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>O que é MMC?</strong> O Mínimo Múltiplo Comum é o menor número inteiro positivo que é múltiplo de dois ou mais números. Por exemplo, o MMC de 4 e 6 é 12, pois é o menor número que pode ser dividido tanto por 4 quanto por 6 sem deixar resto.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>O que é MDC?</strong> O Máximo Divisor Comum é o maior número inteiro positivo que divide dois ou mais números. Por exemplo, o MDC de 12 e 18 é 6, pois é o maior número que divide ambos sem deixar resto.
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
            <strong>Fórmulas Importantes:</strong><br />
            MMC(a,b) = |a × b| ÷ MDC(a,b)<br />
            MDC(a,b) × MMC(a,b) = a × b<br />
            <strong>Método da Fatoração:</strong> Decomposição em fatores primos
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🌳 Método da Árvore de Fatores
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            A <strong>árvore de fatores</strong> é um método visual para encontrar todos os fatores primos de um número. Começamos com o número original no topo e vamos dividindo por números primos até obtermos apenas números primos nas "folhas" da árvore.
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
            <strong>Passos para construir a árvore:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li>Escreva o número no topo</li>
              <li>Divida por um número primo (começando pelo menor possível)</li>
              <li>Continue dividindo até obter apenas números primos</li>
              <li>Os números primos nas "folhas" são os fatores primos</li>
            </ul>
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
            <strong>Exemplo - Árvore de Fatores do 12:</strong><br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;12<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;\<br />
            &nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;3<br />
            &nbsp;&nbsp;&nbsp;/&nbsp;\<br />
            &nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;2<br /><br />
            <strong>Fatores primos:</strong> 2, 2, 3<br />
            <strong>Fatoração:</strong> 12 = 2² × 3
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🔢 Algoritmo de Euclides para MDC
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O <strong>Algoritmo de Euclides</strong> é um método eficiente para calcular o MDC de dois números baseado na divisão sucessiva. É especialmente útil para números grandes, pois reduz rapidamente o problema.
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
            <strong>Algoritmo de Euclides - Exemplo MDC(48, 18):</strong><br /><br />
            48 ÷ 18 = 2 resto 12<br />
            18 ÷ 12 = 1 resto 6<br />
            12 ÷ 6 = 2 resto 0<br /><br />
            <strong>MDC(48, 18) = 6</strong> (último resto não-zero)
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            💡 Métodos de Cálculo
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
            <strong>1. Método da Fatoração Completa:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li>Decomponha cada número em fatores primos</li>
              <li><strong>MMC:</strong> Multiplique todos os fatores primos com suas maiores potências</li>
              <li><strong>MDC:</strong> Multiplique apenas os fatores primos comuns com suas menores potências</li>
            </ul>
            
            <strong>2. Método dos Múltiplos (apenas MMC):</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li>Liste os múltiplos de cada número</li>
              <li>Identifique o menor múltiplo comum</li>
            </ul>
            
            <strong>3. Método dos Divisores (apenas MDC):</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li>Liste os divisores de cada número</li>
              <li>Identifique o maior divisor comum</li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🎯 Aplicações Práticas no Cotidiano
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
            <strong>MMC em situações reais:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Sincronização de eventos:</strong> Quando dois eventos se repetem em intervalos diferentes</li>
              <li><strong>Compras em pacotes:</strong> Determinar quantidades para igualar produtos em embalagens diferentes</li>
              <li><strong>Cronogramas:</strong> Planejamento de atividades que se repetem em períodos distintos</li>
              <li><strong>Engrenagens:</strong> Cálculo de rotações para sincronização mecânica</li>
            </ul>
            
            <strong>MDC em situações reais:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Divisão em grupos iguais:</strong> Distribuir itens igualmente sem sobrar</li>
              <li><strong>Redução de frações:</strong> Simplificar frações para sua forma mais simples</li>
              <li><strong>Medidas de terreno:</strong> Encontrar a maior medida comum para divisões</li>
              <li><strong>Receitas culinárias:</strong> Ajustar proporções mantendo as proporções originais</li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            📚 Exemplos Resolvidos Passo a Passo
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
            <strong>Exemplo 1: MMC e MDC de 12 e 18</strong><br /><br />
            
            <strong>Decomposição em fatores primos:</strong><br />
            12 = 2² × 3<br />
            18 = 2 × 3²<br /><br />
            
            <strong>MMC:</strong> Maiores potências de cada primo<br />
            MMC = 2² × 3² = 4 × 9 = 36<br /><br />
            
            <strong>MDC:</strong> Menores potências dos primos comuns<br />
            MDC = 2¹ × 3¹ = 2 × 3 = 6<br /><br />
            
            <strong>Verificação:</strong> 12 × 18 = 216<br />
            MMC × MDC = 36 × 6 = 216 ✓
          </Box>

          <Box
            p={2}
            bgcolor="#fff"
            borderRadius={2}
            boxShadow={1}
            mb={2}
            fontFamily="monospace"
            fontSize="0.85rem"
          >
            <strong>Exemplo 2: MMC e MDC de 15, 20 e 25</strong><br /><br />
            
            <strong>Decomposição em fatores primos:</strong><br />
            15 = 3 × 5<br />
            20 = 2² × 5<br />
            25 = 5²<br /><br />
            
            <strong>MMC:</strong> Maiores potências: 2², 3¹, 5²<br />
            MMC = 4 × 3 × 25 = 300<br /><br />
            
            <strong>MDC:</strong> Fatores comuns: apenas 5¹<br />
            MDC = 5
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🎓 Importância no Ensino e Vestibulares
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            MMC e MDC são tópicos fundamentais que aparecem em diversas situações acadêmicas:
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
              <li><strong>Base para frações:</strong> Essencial para somar, subtrair e comparar frações</li>
              <li><strong>Problemas de contagem:</strong> Análise combinatória e probabilidade</li>
              <li><strong>Teoria dos números:</strong> Fundamento para estudos matemáticos avançados</li>
              <li><strong>Geometria:</strong> Cálculos de perímetros e áreas com medidas fracionárias</li>
              <li><strong>Física:</strong> Análise de movimentos periódicos e ondas</li>
              <li><strong>ENEM e vestibulares:</strong> Aparece em problemas contextualizados</li>
            </ul>
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Nossa calculadora com visualização animada da árvore de fatores torna o aprendizado mais intuitivo e eficaz. Use-a para verificar exercícios e compreender melhor o processo de fatoração.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para mais conteúdo educacional sobre matemática básica, consulte o{" "}
            <Link
              href="https://www.somatematica.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              portal Só Matemática
            </Link>{" "}
            ou a{" "}
            <Link
              href="https://www.khanacademy.org/math"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Khan Academy
            </Link>
            .
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Dicas de Estudo e Memorização
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
            >
              Para dominar MMC e MDC, seguir uma metodologia estruturada é essencial:
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
                  <strong>Memorize os números primos até 50:</strong> 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47. Isso acelera a fatoração.
                </li>
                <li>
                  <strong>Pratique fatoração diariamente:</strong> Comece com números pequenos e aumente gradualmente a dificuldade.
                </li>
                <li>
                  <strong>Use a árvore de fatores:</strong> Método visual que reduz erros e facilita a compreensão.
                </li>
                <li>
                  <strong>Verificação cruzada:</strong> Use a fórmula MMC × MDC = a × b para verificar cálculos com dois números.
                </li>
                <li>
                  <strong>Resolva problemas contextualizados:</strong> Conecte os conceitos com situações reais para fixar melhor.
                </li>
                <li>
                  <strong>Crie cartões de estudo:</strong> Números de um lado, fatoração do outro para memorização rápida.
                </li>
              </ul>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, ...mobileTextStyle }}
            >
              Lembre-se: a prática constante é a chave para o domínio. Nossa calculadora com árvore de fatores animada serve como excelente ferramenta de estudo e verificação.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;