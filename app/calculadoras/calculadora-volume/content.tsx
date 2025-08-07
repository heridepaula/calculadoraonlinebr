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
              Tudo Sobre Volume de Sólidos Geométricos
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            O <strong>volume</strong> é uma grandeza física que mede o espaço tridimensional ocupado por um sólido geométrico. É fundamental na geometria espacial, engenharia, arquitetura e diversas áreas da ciência. Cada sólido geométrico possui uma fórmula específica para calcular seu volume, baseada em suas dimensões características.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            <strong>O que é volume?</strong> Volume é a medida do espaço tridimensional ocupado por uma figura sólida. É expresso em unidades cúbicas, como centímetros cúbicos (cm³), metros cúbicos (m³), ou litros (L). O volume é uma propriedade fundamental que nos permite calcular capacidades, quantidades de material e espaços ocupados.
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
            <strong>Unidades de Volume Comuns:</strong><br />
            1 m³ = 1.000 dm³ = 1.000.000 cm³ = 1.000 litros
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Sólidos Geométricos e suas Fórmulas
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
                <strong>Esfera:</strong> V = (4/3) × π × r³
                <br />Sólido perfeitamente redondo, como uma bola de futebol. Todos os pontos da superfície estão à mesma distância do centro.
              </li>
              <li>
                <strong>Cilindro:</strong> V = π × r² × h
                <br />Sólido com base circular e altura constante, como uma lata de refrigerante. Possui duas bases circulares paralelas.
              </li>
              <li>
                <strong>Cone:</strong> V = (1/3) × π × r² × h
                <br />Sólido com base circular que afunila até um ponto no topo, como um cone de sorvete.
              </li>
              <li>
                <strong>Cubo:</strong> V = a³
                <br />Sólido com seis faces quadradas idênticas. Todas as arestas têm o mesmo comprimento.
              </li>
              <li>
                <strong>Paralelepípedo:</strong> V = comprimento × largura × altura
                <br />Sólido com seis faces retangulares, como uma caixa de sapatos.
              </li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Aplicações Práticas do Cálculo de Volume
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
                <strong>Construção Civil:</strong> Cálculo de concreto necessário para fundações, lajes e estruturas.
              </li>
              <li>
                <strong>Engenharia:</strong> Dimensionamento de reservatórios, tanques e recipientes industriais.
              </li>
              <li>
                <strong>Medicina:</strong> Cálculo de dosagens de medicamentos e volume de órgãos em exames.
              </li>
              <li>
                <strong>Culinária:</strong> Medição de ingredientes e capacidade de recipientes.
              </li>
              <li>
                <strong>Logística:</strong> Otimização do espaço de carga em containers e veículos.
              </li>
              <li>
                <strong>Química:</strong> Cálculo de concentrações e reações em volumes específicos.
              </li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Fórmulas Detalhadas por Sólido Geométrico
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
            <strong>Fórmulas de Volume:</strong><br /><br />
            • <strong>Esfera:</strong> V = (4/3) × π × r³<br />
            • <strong>Cilindro:</strong> V = π × r² × h<br />
            • <strong>Cone:</strong> V = (1/3) × π × r² × h<br />
            • <strong>Cubo:</strong> V = a³<br />
            • <strong>Paralelepípedo:</strong> V = c × l × h<br />
            • <strong>Prisma Triangular:</strong> V = (base × altura_triângulo ÷ 2) × altura_prisma<br />
            • <strong>Pirâmide:</strong> V = (1/3) × área_base × altura<br />
            • <strong>Elipsoide:</strong> V = (4/3) × π × a × b × c<br />
            • <strong>Toro:</strong> V = 2π² × R × r²<br /><br />
            <strong>Onde:</strong> r = raio, h = altura, a = lado/aresta, c = comprimento, l = largura, R = raio maior, π ≈ 3,14159
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Conversões de Unidades de Volume
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            É essencial conhecer as conversões entre diferentes unidades de volume para aplicações práticas:
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
              <li><strong>Sistema Métrico:</strong> 1 m³ = 1.000 dm³ = 1.000.000 cm³ = 1.000.000.000 mm³</li>
              <li><strong>Volume e Capacidade:</strong> 1 dm³ = 1 litro (L) = 1.000 mL</li>
              <li><strong>Grandes Volumes:</strong> 1 m³ = 1.000 litros = 1.000.000 mL</li>
              <li><strong>Conversão para Galões:</strong> 1 m³ ≈ 264,17 galões americanos</li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Dicas para Cálculo Preciso de Volume
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
              <li><strong>Medição Precisa:</strong> Use instrumentos adequados para medir dimensões com precisão.</li>
              <li><strong>Unidades Consistentes:</strong> Mantenha todas as medidas na mesma unidade antes de calcular.</li>
              <li><strong>Valor de π:</strong> Use π = 3,14159 ou mais casas decimais para maior precisão.</li>
              <li><strong>Verificação:</strong> Sempre verifique se o resultado faz sentido físico para o objeto medido.</li>
              <li><strong>Arredondamento:</strong> Considere quantas casas decimais são necessárias para sua aplicação.</li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Sólidos Compostos e Irregulares
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Para objetos mais complexos, podemos usar diferentes estratégias:
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
              <li><strong>Decomposição:</strong> Dividir o sólido em formas geométricas conhecidas</li>
              <li><strong>Aproximação:</strong> Usar a forma geométrica mais próxima do objeto real</li>
              <li><strong>Integração:</strong> Para formas muito complexas, usar cálculo integral</li>
              <li><strong>Método da Imersão:</strong> Medir o volume de líquido deslocado pelo objeto</li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Volume na Vida Cotidiana
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            O conceito de volume está presente em diversas situações do dia a dia:
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
              <li><strong>Cozinha:</strong> Receitas, capacidade de panelas e recipientes</li>
              <li><strong>Jardinagem:</strong> Quantidade de terra para vasos e canteiros</li>
              <li><strong>Piscinas:</strong> Volume de água e produtos químicos necessários</li>
              <li><strong>Mudanças:</strong> Espaço necessário em caminhões e containers</li>
              <li><strong>Combustível:</strong> Capacidade de tanques de carros e motocicletas</li>
            </ul>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Exercícios Práticos de Volume
          </Typography>

          <Box
            p={2}
            bgcolor="#fff"
            borderRadius={2}
            boxShadow={1}
            mb={2}
            fontSize="0.85rem"
          >
            <strong>Exemplo 1 - Reservatório Cilíndrico:</strong><br />
            Um reservatório de água tem 2 metros de raio e 5 metros de altura.<br />
            Volume = π × 2² × 5 = π × 4 × 5 = 20π ≈ 62,83 m³ ≈ 62.830 litros<br /><br />
            
            <strong>Exemplo 2 - Caixa d'Água Cúbica:</strong><br />
            Uma caixa d'água cúbica tem 1,5 metro de aresta.<br />
            Volume = 1,5³ = 3,375 m³ = 3.375 litros<br /><br />
            
            <strong>Exemplo 3 - Piscina Retangular:</strong><br />
            Piscina com 8m de comprimento, 4m de largura e 1,5m de profundidade.<br />
            Volume = 8 × 4 × 1,5 = 48 m³ = 48.000 litros
          </Box>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Importância dos Cálculos de Volume
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
            >
              O domínio dos cálculos de volume é essencial em diversas profissões e situações:
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
                  <strong>Economia de Recursos:</strong> Cálculos precisos evitam desperdício de materiais e otimizam custos em projetos.
                </li>
                <li>
                  <strong>Segurança:</strong> Em aplicações industriais, volumes incorretos podem causar acidentes ou falhas estruturais.
                </li>
                <li>
                  <strong>Eficiência Energética:</strong> Dimensionamento correto de sistemas de aquecimento, refrigeração e ventilação.
                </li>
                <li>
                  <strong>Sustentabilidade:</strong> Otimização do uso de recursos naturais e redução do impacto ambiental.
                </li>
                <li>
                  <strong>Planejamento:</strong> Fundamental para logística, armazenamento e transporte de materiais.
                </li>
              </ul>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, textAlign: { xs: "justify", sm: "left" } }}
            >
              Nossa calculadora oferece precisão e praticidade para todos os tipos de cálculos de volume. Use as visualizações 3D para melhor compreender cada sólido geométrico e suas propriedades. Para projetos profissionais, sempre considere fatores de segurança e consulte normas técnicas específicas.
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, marginTop: 2, textAlign: { xs: "justify", sm: "left" } }}
            >
              Para informações técnicas e normas oficiais, consulte o{" "}
              <Link
                href="https://www.inmetro.gov.br/"
                target="_blank"
                rel="noopener noreferrer"
                color="#0fa4d5"
              >
                INMETRO
              </Link>{" "}
              ou{" "}
              <Link
                href="https://www.abnt.org.br/"
                target="_blank"
                rel="noopener noreferrer"
                color="#0fa4d5"
              >
                ABNT
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