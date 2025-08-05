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
    textAlign: isMobile ? "justify" : "left",
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "consorcio":
        return theme.palette.success.dark;
      case "financiamento":
        return theme.palette.warning.main;
      case "contemplacao":
        return theme.palette.info.dark;
      default:
        return theme.palette.text.secondary;
    }
  };

  return (
    <Box mt={4} mx="auto" maxWidth="md">
      <Stack spacing={4}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa" }}>
          <Box display="flex" alignItems="center" mb={1}>
            <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Guia Completo sobre Consórcios 2025 - Imóvel e Veículo
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O <strong>consórcio</strong> é uma das modalidades de crédito mais vantajosas do mercado brasileiro, permitindo a aquisição de imóveis e veículos sem pagamento de juros. Em 2025, com o crescimento de 19,1% nas vendas de cotas, o consórcio consolida-se como alternativa inteligente ao financiamento tradicional, especialmente em tempos de juros altos.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>O que é consórcio?</strong> É um sistema de autofinanciamento para aquisição de bens, onde um grupo de pessoas se une para formar um fundo comum. Mensalmente, através de sorteios ou lances, alguns participantes são contemplados e recebem a carta de crédito para comprar o bem desejado.
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
            <strong>Principais Vantagens do Consórcio:</strong><br />
            • Sem pagamento de juros (apenas taxa administrativa)<br />
            • Não exige entrada ou comprovação de renda<br />
            • Flexibilidade para dar lances<br />
            • Pode usar FGTS (consórcio imobiliário)
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Consórcio Vale a Pena em 2025?
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>Sim, especialmente no cenário econômico atual.</strong> Com a taxa Selic em patamares elevados, os financiamentos tradicionais apresentam juros que podem ultrapassar 12% ao ano. O consórcio, por sua vez, cobra apenas taxa administrativa (entre 0,15% e 0,35% ao mês), resultando em economia significativa.
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
              <strong style={{ color: getTypeColor("consorcio") }}>
                Consórcio de Imóveis:
              </strong>{" "}
              Ideal para quem planeja comprar casa própria sem pressa. Taxa administrativa média de 0,20% ao mês. Permite uso do FGTS para lances e amortização. Grupos típicos de 100 a 200 participantes.
            </li>
            <li>
              <strong style={{ color: getTypeColor("consorcio") }}>
                Consórcio de Veículos:
              </strong>{" "}
              Perfeito para renovação da frota ou primeiro carro. Taxa administrativa média de 0,25% ao mês. Contemplação mais rápida que imóveis. Grupos típicos de 150 a 300 participantes.
            </li>
            <li>
              <strong style={{ color: getTypeColor("financiamento") }}>
                Financiamento vs Consórcio:
              </strong>{" "}
              Financiamento oferece o bem imediatamente, mas com juros altos. Consórcio exige paciência, mas gera economia substancial no longo prazo.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Como Funciona a Contemplação
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            A contemplação é o momento em que o consorciado recebe a carta de crédito para comprar seu bem. Existem duas formas principais:
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
              <strong style={{ color: getTypeColor("contemplacao") }}>
                Contemplação por Sorteio:
              </strong>{" "}
              Realizada mensalmente entre todos os participantes não contemplados. Cada grupo sorteia normalmente 2 participantes por mês. A probabilidade aumenta com a redução do grupo.
            </li>
            <li>
              <strong style={{ color: getTypeColor("contemplacao") }}>
                Contemplação por Lance:
              </strong>{" "}
              O participante oferece um valor (lance) para ser contemplado antecipadamente. Os maiores lances do mês são contemplados. Lance ideal: entre 30% e 50% do valor do bem.
            </li>
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
            <strong>Probabilidades Reais de Contemplação:</strong><br /><br />
            • <strong>Por Sorteio:</strong> Aumenta a cada mês (exemplo: 2/150 = 1,3% no início)<br />
            • <strong>Por Lance (30%):</strong> ~35% de chance de contemplação<br />
            • <strong>Por Lance (40%):</strong> ~60% de chance de contemplação<br />
            • <strong>Por Lance (50%):</strong> ~85% de chance de contemplação<br /><br />
            <strong>Tempo Médio de Contemplação:</strong><br />
            • Grupos de 100-150: 24-30 meses<br />
            • Grupos de 150-200: 30-36 meses<br />
            • Grupos acima de 200: 36-42 meses
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Estratégias para Lances Vencedores
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Dar lance no consórcio é uma estratégia para antecipar a contemplação. Conheça as melhores práticas:
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
            <li><strong>Observe o Comportamento do Grupo:</strong> Nos primeiros meses, analise os valores dos lances vencedores</li>
            <li><strong>Lance Estratégico:</strong> Entre 30% e 50% do valor do bem tem maior probabilidade</li>
            <li><strong>Melhores Épocas:</strong> Evite dezembro/janeiro (gastos extras) e março/abril (IPTU/IPVA)</li>
            <li><strong>Use o FGTS:</strong> No consórcio imobiliário, FGTS pode complementar o lance</li>
            <li><strong>Pague à Vista:</strong> Contemplado paga à vista e pode negociar descontos extras</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Comparação Financeira: Consórcio vs Financiamento
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para tomar a melhor decisão, é essencial comparar os custos totais:
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
            <strong>Exemplo Prático - Imóvel R$ 300.000:</strong><br /><br />
            
            <strong>CONSÓRCIO (120 meses):</strong><br />
            • Valor do bem: R$ 300.000<br />
            • Taxa admin (0,20% am): R$ 600/mês<br />
            • Parcela base: R$ 2.500/mês<br />
            • Parcela total: R$ 3.100/mês<br />
            • Total pago: R$ 372.000<br />
            • Custo adicional: R$ 72.000<br /><br />
            
            <strong>FINANCIAMENTO (120 meses, 10% aa):</strong><br />
            • Financiado: R$ 240.000 (80%)<br />
            • Entrada: R$ 60.000<br />
            • Parcela: R$ 3.444/mês<br />
            • Total pago: R$ 473.280<br />
            • Custo adicional: R$ 173.280<br /><br />
            
            <strong>ECONOMIA DO CONSÓRCIO: R$ 101.280</strong>
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Taxas de Administração por Segmento
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
            <li><strong>Consórcio Imobiliário:</strong> 0,15% a 0,25% ao mês (média: 0,20%)</li>
            <li><strong>Consórcio de Veículos:</strong> 0,20% a 0,35% ao mês (média: 0,25%)</li>
            <li><strong>Consórcio de Motos:</strong> 0,25% a 0,40% ao mês</li>
            <li><strong>Consórcio de Serviços:</strong> 0,30% a 0,45% ao mês</li>
            <li><strong>Fundo de Reserva:</strong> Normalmente 10% do valor da cota</li>
            <li><strong>Seguro:</strong> Varia conforme o bem e idade do grupo</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Vantagens e Desvantagens do Consórcio
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>Vantagens:</strong>
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
            <li>Sem juros, apenas taxa administrativa baixa</li>
            <li>Não exige comprovação de renda rigorosa</li>
            <li>Não precisa dar entrada</li>
            <li>Flexibilidade para dar lances</li>
            <li>Pode usar FGTS (consórcio imobiliário)</li>
            <li>Disciplina financeira (pagamento mensal obrigatório)</li>
            <li>Desconto à vista na hora da compra</li>
            <li>Proteção contra inflação do bem</li>
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>Desvantagens:</strong>
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
            <li>Não há garantia de quando será contemplado</li>
            <li>Necessita paciência e planejamento</li>
            <li>Parcelas começam antes da contemplação</li>
            <li>Taxas administrativas e seguros</li>
            <li>Risco de inadimplência do grupo</li>
            <li>Inflação pode corroer o poder de compra</li>
            <li>Menos flexibilidade que investir o dinheiro</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Como Escolher a Melhor Administradora
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
            <li><strong>Reputação:</strong> Verifique no Banco Central e órgãos de proteção ao consumidor</li>
            <li><strong>Taxa de Administração:</strong> Compare as taxas entre diferentes administradoras</li>
            <li><strong>Solidez Financeira:</strong> Escolha empresas consolidadas no mercado</li>
            <li><strong>Atendimento:</strong> Teste a qualidade do suporte ao cliente</li>
            <li><strong>Transparência:</strong> Administradora deve ser clara sobre custos e regras</li>
            <li><strong>Facilidades:</strong> Apps, site, canais de comunicação</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Dicas para Maximizar suas Chances
          </Typography>

          <Typography
            variant="body2"
            component="ol"
            sx={{
              listStyleType: "decimal",
              pl: 2,
              lineHeight: 1.6,
              marginBottom: 2,
              ...mobileTextStyle,
            }}
          >
            <li><strong>Mantenha-se em dia:</strong> Atrasos podem resultar em exclusão do grupo</li>
            <li><strong>Participe dos sorteios:</strong> Mesmo dando lance, continue concorrendo no sorteio</li>
            <li><strong>Monitore o grupo:</strong> Acompanhe o comportamento dos lances mensalmente</li>
            <li><strong>Planeje o lance:</strong> Tenha recursos disponíveis quando decidir ofertar</li>
            <li><strong>Use simuladores:</strong> Compare diferentes cenários antes de decidir</li>
            <li><strong>Leia o contrato:</strong> Entenda todas as regras e obrigações</li>
            <li><strong>Guarde recursos:</strong> Tenha dinheiro para documentação e taxas</li>
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Nossa calculadora oferece simulações precisas baseadas em dados reais do mercado de consórcios. Para informações oficiais e contratação, sempre consulte administradoras autorizadas pelo Banco Central.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para informações oficiais sobre consórcios, consulte o{" "}
            <Link
              href="https://www.bcb.gov.br/"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Banco Central do Brasil
            </Link>{" "}
            ou a{" "}
            <Link
              href="https://www.abac.org.br/"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              ABAC - Associação Brasileira de Administradoras de Consórcios
            </Link>
            .
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Mitos e Verdades sobre Consórcios
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
            >
              Esclareça as principais dúvidas sobre consórcios:
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
                <strong>MITO:</strong> "Consórcio é loteria" - <strong>VERDADE:</strong> Tem sorteio, mas também lance estratégico e probabilidades calculáveis.
              </li>
              <li>
                <strong>MITO:</strong> "Demora muito para ser contemplado" - <strong>VERDADE:</strong> Com lance adequado, contemplação pode ser imediata.
              </li>
              <li>
                <strong>MITO:</strong> "É mais caro que financiamento" - <strong>VERDADE:</strong> Consórcio é significativamente mais barato no total.
              </li>
              <li>
                <strong>MITO:</strong> "Não posso escolher o bem" - <strong>VERDADE:</strong> Contemplado escolhe livremente dentro do valor da carta.
              </li>
              <li>
                <strong>MITO:</strong> "Se desistir, perco tudo" - <strong>VERDADE:</strong> Valores pagos são devolvidos conforme regras do grupo.
              </li>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, ...mobileTextStyle }}
            >
              O consórcio é uma ferramenta de planejamento financeiro consolidada há décadas no Brasil. Com disciplina e estratégia, pode ser a forma mais econômica de realizar o sonho da casa própria ou do veículo novo.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;