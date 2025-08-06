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
              Calculadora de Frações - Guia Completo para Estudantes 2025
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            As <strong>frações</strong> são uma das bases fundamentais da matemática, representando partes de um todo. Nossa calculadora oferece operações completas com <strong>simplificação automática</strong> e <strong>visualização gráfica</strong>, facilitando o entendimento dos conceitos para estudantes do ensino fundamental e médio.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>O que são Frações?</strong> Uma fração representa uma divisão, onde o <em>numerador</em> (número de cima) indica quantas partes temos, e o <em>denominador</em> (número de baixo) indica em quantas partes o todo foi dividido. Por exemplo, 3/4 significa que temos 3 partes de um total de 4 partes iguais.
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
            <strong>Estrutura de uma Fração:</strong><br />
            <strong>Numerador</strong> ← Quantas partes temos<br />
            ————————— ← Barra de fração<br />
            <strong>Denominador</strong> ← Total de partes<br /><br />
            <strong>Exemplo:</strong> 3/8 = três oitavos
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            📊 Tipos de Frações
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
                <strong>Fração Própria:</strong> Numerador menor que denominador (3/5, 2/7). Representa menos que um inteiro.
              </li>
              <li>
                <strong>Fração Imprópria:</strong> Numerador maior ou igual ao denominador (7/4, 5/5). Representa um inteiro ou mais.
              </li>
              <li>
                <strong>Número Misto:</strong> Combinação de número inteiro e fração própria (2 1/3 = dois e um terço).
              </li>
              <li>
                <strong>Frações Equivalentes:</strong> Representam o mesmo valor (1/2 = 2/4 = 3/6 = 4/8).
              </li>
              <li>
                <strong>Fração Irredutível:</strong> Não pode ser mais simplificada, numerador e denominador são primos entre si (3/7, 5/8).
              </li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            ➕ Operações com Frações
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>1. Adição e Subtração:</strong> Para somar ou subtrair frações, precisamos ter o mesmo denominador (denominador comum). Utilizamos o MMC (Mínimo Múltiplo Comum) para encontrar esse denominador comum.
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
            <strong>Exemplo - Soma: 1/4 + 1/6</strong><br /><br />
            1. MMC de 4 e 6 = 12<br />
            2. Converter para denominador comum:<br />
            &nbsp;&nbsp;1/4 = 3/12 (multiplicar por 3/3)<br />
            &nbsp;&nbsp;1/6 = 2/12 (multiplicar por 2/2)<br />
            3. Somar numeradores: 3 + 2 = 5<br />
            4. Resultado: 5/12
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>2. Multiplicação:</strong> Para multiplicar frações, multiplicamos numerador por numerador e denominador por denominador. É a operação mais simples com frações.
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
            <strong>Exemplo - Multiplicação: 2/3 × 3/4</strong><br /><br />
            1. Multiplicar numeradores: 2 × 3 = 6<br />
            2. Multiplicar denominadores: 3 × 4 = 12<br />
            3. Resultado: 6/12<br />
            4. Simplificar: 6/12 = 1/2 (dividir por 6)
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>3. Divisão:</strong> Para dividir frações, multiplicamos a primeira fração pelo <em>inverso</em> (reciproco) da segunda fração. &quot;Dividir é multiplicar pelo inverso.&quot;
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
            <strong>Exemplo - Divisão: 3/4 ÷ 2/5</strong><br /><br />
            1. Inverter a segunda fração: 2/5 → 5/2<br />
            2. Multiplicar: 3/4 × 5/2<br />
            3. Numeradores: 3 × 5 = 15<br />
            4. Denominadores: 4 × 2 = 8<br />
            5. Resultado: 15/8 = 1 7/8
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🔧 Simplificação de Frações
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>Simplificar</strong> uma fração significa reduzi-la à sua forma mais simples, dividindo numerador e denominador pelo seu <strong>Máximo Divisor Comum (MDC)</strong>. Uma fração está na forma mais simples quando o MDC do numerador e denominador é 1.
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
            <strong>Exemplo - Simplificar 12/18:</strong><br /><br />
            1. Encontrar fatores de 12: 1, 2, 3, 4, 6, 12<br />
            2. Encontrar fatores de 18: 1, 2, 3, 6, 9, 18<br />
            3. MDC(12, 18) = 6 (maior fator comum)<br />
            4. Dividir ambos por 6:<br />
            &nbsp;&nbsp;12 ÷ 6 = 2<br />
            &nbsp;&nbsp;18 ÷ 6 = 3<br />
            5. Resultado: 12/18 = 2/3
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🍕 Aplicações Práticas das Frações
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
            <strong>No cotidiano brasileiro:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Culinária:</strong> Receitas de bolo (1/2 xícara de açúcar, 3/4 de xícara de farinha)</li>
              <li><strong>Tempo:</strong> Frações de hora (1/4 de hora = 15 minutos, 3/4 de hora = 45 minutos)</li>
              <li><strong>Dinheiro:</strong> Divisão de despesas (1/3 do salário para moradia, 1/4 para alimentação)</li>
              <li><strong>Medidas:</strong> Construção e reformas (3/8 de polegada, 5/16 de espessura)</li>
              <li><strong>Esportes:</strong> Estatísticas (3/4 dos jogos vencidos, 2/5 dos gols marcados)</li>
            </ul>
            
            <strong>Na educação:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Divisão de grupos:</strong> 2/3 da turma, 3/5 dos alunos aprovados</li>
              <li><strong>Avaliações:</strong> Notas fracionárias, conceitos parciais</li>
              <li><strong>Geometria:</strong> Partes de figuras, áreas fracionárias</li>
              <li><strong>Probabilidade:</strong> Chances de eventos (1/6 em dados, 1/2 em moedas)</li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            📚 Exercícios Resolvidos
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
            <strong>Problema 1: Maria comeu 1/4 de uma pizza e João comeu 1/3. Que fração da pizza eles comeram juntos?</strong><br /><br />
            
            <strong>Solução:</strong><br />
            1. Operação: 1/4 + 1/3<br />
            2. MMC de 4 e 3 = 12<br />
            3. Converter frações:<br />
            &nbsp;&nbsp;1/4 = 3/12<br />
            &nbsp;&nbsp;1/3 = 4/12<br />
            4. Somar: 3/12 + 4/12 = 7/12<br />
            5. <strong>Resposta:</strong> Eles comeram 7/12 da pizza.
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
            <strong>Problema 2: Ana tinha 3/4 de um bolo. Ela deu 1/2 do que tinha para sua irmã. Quanto do bolo total Ana deu?</strong><br /><br />
            
            <strong>Solução:</strong><br />
            1. Ana tinha: 3/4 do bolo<br />
            2. Deu 1/2 do que tinha: 1/2 × 3/4<br />
            3. Multiplicar: (1 × 3)/(2 × 4) = 3/8<br />
            4. <strong>Resposta:</strong> Ana deu 3/8 do bolo total.
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🎓 Frações no ENEM e Vestibulares
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            As frações aparecem frequentemente em provas de matemática, especialmente em:
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
              <li><strong>Problemas contextualizados:</strong> Situações do cotidiano envolvendo divisões proporcionais</li>
              <li><strong>Porcentagens:</strong> Conversão entre frações, decimais e porcentagens</li>
              <li><strong>Geometria:</strong> Cálculo de áreas e perímetros fracionários</li>
              <li><strong>Estatística:</strong> Interpretação de dados em forma fracionária</li>
              <li><strong>Física:</strong> Velocidades, acelerações e proporções</li>
              <li><strong>Química:</strong> Concentrações, proporções moleculares</li>
            </ul>
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Nossa calculadora com visualização gráfica e explicação passo a passo ajuda na compreensão intuitiva dos conceitos, preparando você para resolver problemas mais complexos com confiança.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para mais recursos educacionais sobre frações e matemática básica, consulte o{" "}
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
              href="https://www.khanacademy.org/math/arithmetic/arith-fractions"
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
            Dicas de Estudo para Dominar Frações
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
            >
              Para se tornar expert em frações, siga uma metodologia estruturada de aprendizado:
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
                  <strong>Comece com o concreto:</strong> Use objetos reais (pizza, chocolate, frutas) para visualizar frações antes de trabalhar com números abstratos.
                </li>
                <li>
                  <strong>Domine as equivalências:</strong> Memorize frações equivalentes básicas (1/2 = 2/4 = 3/6, 1/3 = 2/6 = 3/9).
                </li>
                <li>
                  <strong>Pratique simplificação:</strong> Sempre reduza frações à forma mais simples. Isso facilita comparações e operações.
                </li>
                <li>
                  <strong>Use denominadores comuns:</strong> Para comparar frações, converta para o mesmo denominador usando MMC.
                </li>
                <li>
                  <strong>Visualize operações:</strong> Desenhe círculos, retângulos ou barras para representar as operações visualmente.
                </li>
                <li>
                  <strong>Conecte com decimais:</strong> Pratique conversões entre frações e decimais (1/4 = 0,25, 3/4 = 0,75).
                </li>
                <li>
                  <strong>Resolva problemas reais:</strong> Aplique frações em situações do dia a dia para fixar o aprendizado.
                </li>
              </ul>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, ...mobileTextStyle }}
            >
              <strong>Lembre-se:</strong> As frações são a base para álgebra, geometria e cálculo. Investir tempo no domínio completo deste tópico pagará dividendos em todos os seus estudos matemáticos futuros. Use nossa calculadora como ferramenta de verificação e aprendizado!
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;