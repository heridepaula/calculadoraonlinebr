"use client";

import {
  Box,
  Typography,
  Stack,
  Paper,
  useMediaQuery,
  useTheme,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
              Calculadora de Área e Perímetro - Guia Completo de Geometria Plana 2025
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Nossa <strong>calculadora de área e perímetro</strong> abrange mais de 15 figuras geométricas com <strong>visualização 3D</strong> e resolução passo a passo. Ferramenta essencial para estudantes, engenheiros, arquitetos e todos que trabalham com geometria plana no dia a dia.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>O que são área e perímetro?</strong> A <em>área</em> representa a medida da superfície de uma figura geométrica (em unidades quadradas), enquanto o <em>perímetro</em> é a medida do contorno, ou seja, a soma de todos os lados da figura (em unidades lineares).
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
            <strong>Conceitos Fundamentais:</strong><br />
            <strong>Área (A)</strong> → Espaço interno da figura (m², cm², km²)<br />
            <strong>Perímetro (P)</strong> → Contorno da figura (m, cm, km)<br />
            <strong>Unidades</strong> → Área sempre em unidades² | Perímetro em unidades lineares
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🔺 Figuras Básicas e suas Fórmulas
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
            <strong>1. Triângulo:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Área:</strong> A = (base × altura) ÷ 2</li>
              <li><strong>Perímetro:</strong> P = lado1 + lado2 + lado3</li>
              <li><strong>Aplicação:</strong> Telhados, estruturas triangulares, navegação</li>
            </ul>
            
            <strong>2. Retângulo:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Área:</strong> A = comprimento × largura</li>
              <li><strong>Perímetro:</strong> P = 2 × (comprimento + largura)</li>
              <li><strong>Aplicação:</strong> Construção civil, terrenos, móveis</li>
            </ul>
            
            <strong>3. Quadrado:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Área:</strong> A = lado²</li>
              <li><strong>Perímetro:</strong> P = 4 × lado</li>
              <li><strong>Aplicação:</strong> Azulejos, pisos, terrenos quadrados</li>
            </ul>
            
            <strong>4. Círculo:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Área:</strong> A = π × raio²</li>
              <li><strong>Perímetro (Circunferência):</strong> P = 2 × π × raio</li>
              <li><strong>Aplicação:</strong> Rodas, tanques, piscinas circulares</li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🔹 Figuras Avançadas
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
            <strong>5. Trapézio:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Área:</strong> A = ((base maior + base menor) × altura) ÷ 2</li>
              <li><strong>Perímetro:</strong> P = soma de todos os lados</li>
              <li><strong>Aplicação:</strong> Rampas, barragens, estruturas inclinadas</li>
            </ul>
            
            <strong>6. Losango:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Área:</strong> A = (diagonal maior × diagonal menor) ÷ 2</li>
              <li><strong>Perímetro:</strong> P = 4 × lado</li>
              <li><strong>Aplicação:</strong> Design, logotipos, decorações</li>
            </ul>
            
            <strong>7. Paralelogramo:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Área:</strong> A = base × altura</li>
              <li><strong>Perímetro:</strong> P = 2 × (base + lado)</li>
              <li><strong>Aplicação:</strong> Estruturas paralelas, estacionamentos</li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            📐 Polígonos Regulares
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
            <strong>8. Hexágono Regular:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Área:</strong> A = (3√3 × lado²) ÷ 2 ≈ 2,598 × lado²</li>
              <li><strong>Perímetro:</strong> P = 6 × lado</li>
              <li><strong>Aplicação:</strong> Favos de mel, porcas, designs</li>
            </ul>
            
            <strong>9. Pentágono Regular:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Área:</strong> A = (√(25+10√5) × lado²) ÷ 4 ≈ 1,720 × lado²</li>
              <li><strong>Perímetro:</strong> P = 5 × lado</li>
              <li><strong>Aplicação:</strong> Pentágono (EUA), designs geométricos</li>
            </ul>
            
            <strong>10. Elipse:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Área:</strong> A = π × semi-eixo maior × semi-eixo menor</li>
              <li><strong>Perímetro:</strong> P ≈ π × [3(a+b) - √((3a+b)(a+3b))]</li>
              <li><strong>Aplicação:</strong> Órbitas planetárias, design automotivo</li>
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
            <strong>Exemplo Prático - Cálculo de Piso:</strong><br /><br />
            
            <strong>Problema:</strong> Calcular quantos azulejos de 30cm × 30cm são necessários para um cômodo retangular de 4m × 3m.<br /><br />
            
            <strong>Solução:</strong><br />
            1. Área do cômodo: 4m × 3m = 12m²<br />
            2. Área do azulejo: 0,3m × 0,3m = 0,09m²<br />
            3. Quantidade: 12m² ÷ 0,09m² = 133,33<br />
            4. <strong>Resposta:</strong> 134 azulejos (arredondar para cima)
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            📊 Tabela Resumo - Fórmulas Essenciais
          </Typography>

          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Figura</strong></TableCell>
                  <TableCell><strong>Área</strong></TableCell>
                  <TableCell><strong>Perímetro</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Triângulo</TableCell>
                  <TableCell>(b × h) ÷ 2</TableCell>
                  <TableCell>a + b + c</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Retângulo</TableCell>
                  <TableCell>c × l</TableCell>
                  <TableCell>2(c + l)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quadrado</TableCell>
                  <TableCell>l²</TableCell>
                  <TableCell>4l</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Círculo</TableCell>
                  <TableCell>πr²</TableCell>
                  <TableCell>2πr</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Trapézio</TableCell>
                  <TableCell>((B+b) × h) ÷ 2</TableCell>
                  <TableCell>B + b + l₁ + l₂</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Losango</TableCell>
                  <TableCell>(D × d) ÷ 2</TableCell>
                  <TableCell>4l</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🏗️ Aplicações Práticas no Brasil
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
            <strong>Construção Civil:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Área construída:</strong> Cálculo de m² para documentação e vendas</li>
              <li><strong>Materiais:</strong> Quantidade de pisos, azulejos, tinta, concreto</li>
              <li><strong>Terrenos:</strong> Área útil, recuos obrigatórios, taxa de ocupação</li>
              <li><strong>Cobertura:</strong> Área de telhado, calhas, rufos</li>
            </ul>
            
            <strong>Agricultura e Agronegócio:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Propriedades rurais:</strong> Hectares, alqueires, medidas agrárias</li>
              <li><strong>Irrigação:</strong> Área de cobertura de sistemas de irrigação</li>
              <li><strong>Cercamento:</strong> Perímetro de propriedades, divisas</li>
              <li><strong>Plantio:</strong> Espaçamento entre plantas, densidade por hectare</li>
            </ul>
            
            <strong>Indústria e Manufatura:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Metalurgia:</strong> Área de chapas, cortes otimizados</li>
              <li><strong>Têxtil:</strong> Metragem de tecidos, padronagens</li>
              <li><strong>Embalagens:</strong> Área de impressão, desenvolvimento de produtos</li>
              <li><strong>Layouts industriais:</strong> Otimização de espaços fabris</li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            📚 Exercícios Resolvidos Contextualizados
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
            <strong>Exercício 1: Piscina Circular</strong><br /><br />
            
            <strong>Problema:</strong> Uma piscina circular tem raio de 3,5m. Calcule a área da lâmina d'água e o perímetro para instalação do corrimão.<br /><br />
            
            <strong>Solução:</strong><br />
            1. Área: A = π × r²<br />
            2. A = π × (3,5)²<br />
            3. A = π × 12,25 = 38,48 m²<br />
            4. Perímetro: P = 2 × π × r<br />
            5. P = 2 × π × 3,5 = 21,99 m<br /><br />
            
            <strong>Respostas:</strong><br />
            • Área da lâmina d'água: 38,48 m²<br />
            • Perímetro para corrimão: 21,99 m
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
            <strong>Exercício 2: Terreno Trapezoidal</strong><br /><br />
            
            <strong>Problema:</strong> Um terreno tem forma de trapézio com bases de 25m e 15m, e altura de 20m. Qual a área total e o custo para cercar com material a R$ 45,00 por metro? (lados inclinados = 22m cada)<br /><br />
            
            <strong>Solução:</strong><br />
            1. Área: A = ((B + b) × h) ÷ 2<br />
            2. A = ((25 + 15) × 20) ÷ 2<br />
            3. A = (40 × 20) ÷ 2 = 400 m²<br />
            4. Perímetro: P = 25 + 15 + 22 + 22 = 84 m<br />
            5. Custo cercamento: 84 × R$ 45,00 = R$ 3.780,00<br /><br />
            
            <strong>Respostas:</strong><br />
            • Área do terreno: 400 m²<br />
            • Custo do cercamento: R$ 3.780,00
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🎯 Geometria no ENEM e Vestibulares
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            A geometria plana é tema recorrente em provas de matemática, aparecendo em contextos variados:
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
            <strong>Tipos de questões mais comuns:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Problemas contextualizados:</strong> Construção, agricultura, design urbano</li>
              <li><strong>Otimização:</strong> Maximizar áreas com perímetros fixos ou vice-versa</li>
              <li><strong>Composição de figuras:</strong> Áreas de figuras irregulares formadas por figuras básicas</li>
              <li><strong>Semelhança:</strong> Relações entre áreas e perímetros de figuras semelhantes</li>
              <li><strong>Aplicações trigonométricas:</strong> Triângulos e polígonos com ângulos dados</li>
            </ul>
            
            <strong>Estratégias de resolução:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Identifique a figura:</strong> Classifique corretamente a forma geométrica</li>
              <li><strong>Organize os dados:</strong> Liste as medidas fornecidas e as que precisam ser calculadas</li>
              <li><strong>Escolha a fórmula:</strong> Use as fórmulas corretas para área e perímetro</li>
              <li><strong>Faça um esboço:</strong> Desenhe a figura para visualizar melhor o problema</li>
              <li><strong>Verifique unidades:</strong> Mantenha consistência nas unidades de medida</li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🔧 Ferramentas Complementares
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
            <strong>Para cálculos mais precisos, use também:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li><strong>Teorema de Pitágoras:</strong> Para encontrar lados em triângulos retângulos</li>
              <li><strong>Lei dos Cossenos:</strong> Para triângulos não-retângulos</li>
              <li><strong>Fórmula de Herão:</strong> Área do triângulo conhecendo os três lados</li>
              <li><strong>Trigonometria:</strong> Para figuras com ângulos conhecidos</li>
            </ul>
            
            <strong>Aproximações úteis:</strong>
            <ul style={{ listStyleType: "disc", paddingLeft: 16, marginTop: 8 }}>
              <li>π ≈ 3,14159 (use 3,14 para cálculos rápidos)</li>
              <li>√2 ≈ 1,414</li>
              <li>√3 ≈ 1,732</li>
              <li>√5 ≈ 2,236</li>
            </ul>
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Nossa calculadora com visualização 3D e explicações passo a passo facilita o entendimento dos conceitos geométricos, preparando você para resolver qualquer problema de área e perímetro com confiança.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para aprofundar seus conhecimentos em geometria, consulte o{" "}
            <Link
              href="https://www.somatematica.com.br/geometria.php"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              portal Só Matemática - Geometria
            </Link>{" "}
            ou o{" "}
            <Link
              href="https://www.khanacademy.org/math/geometry"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Khan Academy Geometry
            </Link>
            .
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Guia de Estudos para Geometria Plana
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
            >
              Para se tornar expert em cálculos de área e perímetro, siga esta metodologia estruturada:
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
                  <strong>Memorize as fórmulas básicas:</strong> Triângulo, retângulo, quadrado e círculo são fundamentais. Pratique até automatizar.
                </li>
                <li>
                  <strong>Entenda as unidades:</strong> Área sempre em unidades², perímetro em unidades lineares. Pratique conversões (m², cm², km²).
                </li>
                <li>
                  <strong>Visualize as figuras:</strong> Sempre desenhe ou use nossa visualização 3D para compreender melhor os problemas.
                </li>
                <li>
                  <strong>Pratique problemas contextualizados:</strong> Resolva situações reais de construção, agricultura, design.
                </li>
                <li>
                  <strong>Use aproximações inteligentes:</strong> Para π, use 3,14 em cálculos manuais, valores mais precisos em calculadora.
                </li>
                <li>
                  <strong>Desenvolva senso espacial:</strong> Compare áreas e perímetros intuitivamente antes de calcular.
                </li>
                <li>
                  <strong>Conecte com outras áreas:</strong> Geometria aparece em física, química, geografia, arquitetura.
                </li>
                <li>
                  <strong>Verifique sempre seus cálculos:</strong> Use nossa calculadora para confirmar resultados e entender os passos.
                </li>
              </ul>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, ...mobileTextStyle }}
            >
              <strong>Lembre-se:</strong> A geometria plana é a base para geometria espacial, trigonometria e cálculo. Dominar área e perímetro é essencial para seu sucesso em matemática e áreas técnicas. Use nossa calculadora como ferramenta de aprendizado e verificação!
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;