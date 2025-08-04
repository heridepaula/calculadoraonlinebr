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

  const getBondColor = (type: string) => {
    switch (type) {
      case "ltn":
        return "#2196F3";
      case "lft":
        return "#4CAF50";
      case "ntn-b":
        return "#FF9800";
      case "ntn-f":
        return "#9C27B0";
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
              Guia Completo: Tesouro Direto - Títulos Públicos Federais
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O <strong>Tesouro Direto</strong> é o programa do Tesouro Nacional para venda de títulos públicos federais a pessoas físicas pela internet. Criado em 2002, é considerado o investimento mais seguro do país, pois tem garantia do Governo Federal. Nossa calculadora permite simular os diferentes tipos de títulos disponíveis com suas respectivas fórmulas de cálculo matemático-financeiro.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>Por que investir no Tesouro Direto?</strong> Os títulos públicos oferecem alta liquidez, baixo risco e diversas opções de rentabilidade. Com investimento mínimo de apenas R$ 30,00, é acessível para qualquer perfil de investidor, desde iniciantes até os mais experientes.
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
            <strong>Taxas Atuais (2025):</strong><br />
            SELIC: 15,00% | IPCA: 4,87% | Tesouro Prefixado: ~14,50% | IPCA+: ~6,20%
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Tipos de Títulos do Tesouro Direto
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
              <strong style={{ color: getBondColor("ltn") }}>
                Tesouro Prefixado (LTN):
              </strong>{" "}
              Título com taxa de juros fixa definida no momento da compra. Ideal para quem quer saber exatamente quanto receberá no vencimento. Valor nominal sempre R$ 1.000 no vencimento.
            </li>
            <li>
              <strong style={{ color: getBondColor("lft") }}>
                Tesouro Selic (LFT):
              </strong>{" "}
              Título pós-fixado com rentabilidade atrelada à Taxa Selic. Oferece proteção contra oscilações da taxa básica de juros e tem liquidez diária sem risco de marcação a mercado.
            </li>
            <li>
              <strong style={{ color: getBondColor("ntn-b") }}>
                Tesouro IPCA+ (NTN-B Principal):
              </strong>{" "}
              Título híbrido que paga IPCA + taxa prefixada. Garante poder de compra ao proteger contra a inflação, ideal para objetivos de longo prazo.
            </li>
            <li>
              <strong style={{ color: getBondColor("ntn-f") }}>
                Tesouro Prefixado com Juros Semestrais (NTN-F):
              </strong>{" "}
              Título prefixado que paga cupons de juros semestrais de 6% ao ano, oferecendo renda periódica ao investidor antes do vencimento.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Fórmulas Matemáticas de Cálculo
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Cada tipo de título possui fórmulas específicas baseadas em matemática financeira:
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
            <strong>Fórmulas por Tipo de Título:</strong><br /><br />
            
            <strong style={{ color: getBondColor("ltn") }}>• Tesouro Prefixado (LTN):</strong><br />
            PU = VN / (1 + taxa)^(du/252)<br />
            Onde: PU = Preço Unitário, VN = R$ 1.000, du = dias úteis<br /><br />
            
            <strong style={{ color: getBondColor("lft") }}>• Tesouro Selic (LFT):</strong><br />
            VNA = 1.000 × ∏(1 + Selic diária)^du<br />
            PU = VNA × Cotação/100<br /><br />
            
            <strong style={{ color: getBondColor("ntn-b") }}>• Tesouro IPCA+ (NTN-B):</strong><br />
            Rendimento = [(1 + IPCA) × (1 + taxa real)] - 1<br />
            VNA = VNA base × Fator IPCA acumulado<br /><br />
            
            <strong style={{ color: getBondColor("ntn-f") }}>• Tesouro Prefixado c/ Juros (NTN-F):</strong><br />
            PU = Σ[Cupom/(1+taxa)^t] + VN/(1+taxa)^n<br />
            Cupom semestral = VN × [(1,06)^0,5 - 1]
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Tributação no Tesouro Direto
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            A tributação segue a tabela regressiva do Imposto de Renda, incentivando investimentos de longo prazo:
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
            <li><strong>Até 180 dias:</strong> 22,5% de IR sobre o rendimento</li>
            <li><strong>181 a 360 dias:</strong> 20% de IR sobre o rendimento</li>
            <li><strong>361 a 720 dias:</strong> 17,5% de IR sobre o rendimento</li>
            <li><strong>Acima de 720 dias:</strong> 15% de IR sobre o rendimento</li>
            <li><strong>IOF:</strong> Incide apenas em resgates nos primeiros 30 dias</li>
            <li><strong>Taxa de Custódia B3:</strong> 0,20% ao ano sobre o valor dos títulos</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Vantagens e Características Específicas
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong style={{ color: getBondColor("ltn") }}>Tesouro Prefixado - Vantagens:</strong> Previsibilidade total de ganhos, proteção contra queda de juros, ideal para metas com prazo definido. <strong>Riscos:</strong> Perda de valor em caso de alta de juros (marcação a mercado), não protege contra inflação.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong style={{ color: getBondColor("lft") }}>Tesouro Selic - Vantagens:</strong> Liquidez diária sem risco de marcação a mercado, acompanha variações da Selic, ideal para reserva de emergência. <strong>Riscos:</strong> Rentabilidade variável, não protege contra inflação alta.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong style={{ color: getBondColor("ntn-b") }}>Tesouro IPCA+ - Vantagens:</strong> Proteção contra inflação, rentabilidade real garantida, ideal para longo prazo. <strong>Riscos:</strong> Marcação a mercado em caso de resgate antecipado, menor liquidez que Tesouro Selic.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong style={{ color: getBondColor("ntn-f") }}>Tesouro com Juros Semestrais - Vantagens:</strong> Renda periódica de cupons, diversificação de fluxo de caixa. <strong>Riscos:</strong> Tributação sobre cupons, reinvestimento necessário, maior complexidade.
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Como Funciona a Marcação a Mercado
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
            <li><strong>Conceito:</strong> Os preços dos títulos oscilam diariamente conforme as condições de mercado</li>
            <li><strong>Títulos Prefixados:</strong> Preço sobe quando juros caem e vice-versa</li>
            <li><strong>Títulos IPCA+:</strong> Sensíveis a mudanças nas expectativas de inflação e juros reais</li>
            <li><strong>Tesouro Selic:</strong> Não sofre marcação a mercado significativa</li>
            <li><strong>Vencimento:</strong> Independente da marcação, sempre recebe o valor contratado</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Estratégias de Investimento no Tesouro Direto
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
            <li><strong>Reserva de Emergência:</strong> Tesouro Selic pela liquidez e baixo risco</li>
            <li><strong>Objetivos de Curto Prazo (1-2 anos):</strong> Tesouro Prefixado se juros altos</li>
            <li><strong>Objetivos de Longo Prazo (+5 anos):</strong> Tesouro IPCA+ para proteção inflacionária</li>
            <li><strong>Renda Complementar:</strong> Tesouro com Juros Semestrais para aposentados</li>
            <li><strong>Diversificação:</strong> Combine diferentes tipos conforme seus objetivos</li>
            <li><strong>Escadinha:</strong> Invista em vencimentos diferentes para ter flexibilidade</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Cenário Econômico e Oportunidades (2025)
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Com a Selic em 15% e perspectiva de manutenção em patamares elevados, o Tesouro Direto oferece oportunidades atrativas em 2025:
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
            <li><strong>Tesouro Prefixado:</strong> Taxas atrativas próximas a 14,5% para quem acredita em queda futura dos juros</li>
            <li><strong>Tesouro Selic:</strong> Rentabilidade elevada acompanhando a Selic de 15%</li>
            <li><strong>Tesouro IPCA+:</strong> Taxas reais de ~6,2% oferecem proteção inflacionária robusta</li>
            <li><strong>Cenário Inflacionário:</strong> Meta de inflação desafiada, favorecendo títulos indexados</li>
            <li><strong>Política Monetária:</strong> BC sinalizando manutenção de juros altos em 2025</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Como Usar Nossa Calculadora
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Nossa calculadora utiliza as fórmulas oficiais do Tesouro Nacional e considera todos os fatores relevantes:
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
            <li><strong>Cálculo Preciso:</strong> Utiliza 252 dias úteis por ano, como no mercado financeiro</li>
            <li><strong>Tributação Automática:</strong> Calcula IR e IOF conforme legislação vigente</li>
            <li><strong>Taxas de Administração:</strong> Considera custos de corretoras quando informado</li>
            <li><strong>Cenários Projetivos:</strong> Permite simular diferentes cenários econômicos</li>
            <li><strong>Análise Completa:</strong> Mostra rentabilidade nominal, real e líquida</li>
            <li><strong>Gráficos Evolutivos:</strong> Visualiza crescimento do investimento ao longo do tempo</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Passos Para Investir no Tesouro Direto
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
            <li><strong>Abra conta em uma corretora</strong> habilitada pelo Tesouro Nacional</li>
            <li><strong>Cadastre-se no site</strong> oficial do Tesouro Direto com CPF e senha</li>
            <li><strong>Transfira recursos</strong> da conta corrente para a corretora</li>
            <li><strong>Escolha o título</strong> mais adequado ao seu perfil e objetivo</li>
            <li><strong>Defina o valor</strong> do investimento (mínimo R$ 30,00)</li>
            <li><strong>Confirme a compra</strong> e acompanhe pela plataforma</li>
            <li><strong>Monitore seus investimentos</strong> pelo site ou app oficial</li>
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Nossa calculadora oferece simulações precisas baseadas nas fórmulas matemáticas oficiais do Tesouro Nacional. Use-a para comparar cenários e tomar decisões informadas sobre seus investimentos em títulos públicos.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para informações oficiais e atualizadas, acesse o{" "}
            <Link
              href="https://www.tesourodireto.com.br"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              site oficial do Tesouro Direto
            </Link>{" "}
            ou consulte a{" "}
            <Link
              href="https://www.gov.br/tesouronacional/pt-br"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Secretaria do Tesouro Nacional
            </Link>
            .
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Dicas Avançadas para Maximizar Seus Investimentos
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
            >
              Para otimizar seus investimentos no Tesouro Direto, considere estas estratégias avançadas:
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
                <strong>Timing de Mercado:</strong> Monitore curva de juros futuros para identificar melhores momentos de entrada.
              </li>
              <li>
                <strong>Rebalanceamento:</strong> Revise periodicamente a composição da carteira conforme cenário econômico.
              </li>
              <li>
                <strong>Barbell Strategy:</strong> Combine títulos de curto e longo prazo para flexibilidade e rentabilidade.
              </li>
              <li>
                <strong>Dollar Cost Averaging:</strong> Invista valores fixos mensalmente para reduzir volatilidade de preços.
              </li>
              <li>
                <strong>Análise de Duration:</strong> Entenda a sensibilidade dos títulos às mudanças de juros.
              </li>
              <li>
                <strong>Planejamento Tributário:</strong> Considere prazo de carência para otimizar carga de IR.
              </li>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, ...mobileTextStyle }}
            >
              Lembre-se: o Tesouro Direto é o investimento mais seguro do país, mas cada título tem características específicas. Use nossa calculadora para simular diferentes cenários e encontrar a estratégia ideal para seus objetivos financeiros.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;