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

  const getInvestmentColor = (type: string) => {
    switch (type) {
      case "cdb":
        return "#2196F3";
      case "lci_lca":
        return "#4CAF50";
      case "tesouro":
        return "#FF9800";
      case "poupanca":
        return "#F44336";
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
              Guia Completo: Comparador de Renda Fixa
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            O <strong>comparador de renda fixa</strong> é uma ferramenta essencial para investidores que desejam escolher a melhor opção de investimento em renda fixa. Com a taxa SELIC atual em <strong>15% ao ano</strong>, é fundamental comparar os rendimentos líquidos entre CDB, LCI/LCA, Tesouro SELIC e Poupança para tomar a decisão mais rentável.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            <strong>Por que comparar investimentos em renda fixa?</strong> Cada modalidade de investimento possui características específicas em relação à tributação, liquidez, rentabilidade e risco. Uma análise comparativa permite identificar qual produto financeiro oferece o melhor retorno líquido considerando seu perfil e objetivos.
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
            <strong>Taxa SELIC Atual (2025):</strong><br />
            15,00% ao ano | CDI: ~15,00% ao ano | Poupança: 6,17% ao ano
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Modalidades de Renda Fixa Comparadas
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
              <strong style={{ color: getInvestmentColor("cdb") }}>
                CDB (Certificado de Depósito Bancário):
              </strong>{" "}
              Título de renda fixa emitido por bancos, oferece entre 95% a 120% do CDI dependendo da instituição e prazo. Possui tributação regressiva de IR (22,5% a 15%) e é garantido pelo FGC até R$ 250 mil.
            </li>
            <li>
              <strong style={{ color: getInvestmentColor("lci_lca") }}>
                LCI/LCA (Letras de Crédito):
              </strong>{" "}
              Títulos lastreados em crédito imobiliário (LCI) ou agronegócio (LCA), oferecem entre 85% a 95% do CDI. Principal vantagem: <strong>isenção total de IR</strong> para pessoas físicas, garantidos pelo FGC.
            </li>
            <li>
              <strong style={{ color: getInvestmentColor("tesouro") }}>
                Tesouro SELIC:
              </strong>{" "}
              Título público federal indexado à taxa SELIC, oferece 100% da SELIC. Possui liquidez diária, tributação regressiva de IR e é considerado o investimento mais seguro do país.
            </li>
            <li>
              <strong style={{ color: getInvestmentColor("poupanca") }}>
                Poupança:
              </strong>{" "}
              Investimento tradicional que rende 0,5% ao mês + TR (Taxa Referencial). Atualmente rende cerca de 6,17% ao ano. Isenta de IR, mas com rentabilidade inferior às demais opções.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Como Funciona a Tributação em Renda Fixa
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            A tributação é um fator decisivo na escolha do investimento. Veja como funciona cada modalidade:
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
              <strong>CDB e Tesouro SELIC:</strong> Tributação regressiva de IR: 22,5% (até 180 dias), 20% (181-360 dias), 17,5% (361-720 dias), 15% (acima de 720 dias). IOF incide sobre resgates em menos de 30 dias.
            </li>
            <li>
              <strong>LCI/LCA:</strong> Totalmente isentas de IR para pessoas físicas. IOF incide apenas em resgates nos primeiros 30 dias.
            </li>
            <li>
              <strong>Poupança:</strong> Isenta de IR e IOF para pessoas físicas, mas com rentabilidade limitada pela regra da poupança.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Rentabilidade Atual dos Investimentos (2025)
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
            <strong>Exemplo de Rendimentos Anuais (R$ 10.000):</strong><br /><br />
            • <strong style={{ color: getInvestmentColor("cdb") }}>CDB 100% CDI:</strong> R$ 11.200 (líquido: ~R$ 10.960)<br />
            • <strong style={{ color: getInvestmentColor("lci_lca") }}>LCI/LCA 90% CDI:</strong> R$ 11.350 (sem impostos)<br />
            • <strong style={{ color: getInvestmentColor("tesouro") }}>Tesouro SELIC:</strong> R$ 11.500 (líquido: ~R$ 11.160)<br />
            • <strong style={{ color: getInvestmentColor("poupanca") }}>Poupança:</strong> R$ 10.617<br /><br />
            <em>*Valores aproximados, considerando tributação e prazos</em>
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Vantagens e Desvantagens de Cada Investimento
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            <strong style={{ color: getInvestmentColor("cdb") }}>CDB - Vantagens:</strong> Maior rentabilidade bruta, diversas opções de bancos, flexibilidade de prazos. <strong>Desvantagens:</strong> Tributação de IR, menor rentabilidade líquida em prazos menores.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            <strong style={{ color: getInvestmentColor("lci_lca") }}>LCI/LCA - Vantagens:</strong> Isenção total de IR, boa rentabilidade líquida, garantia do FGC. <strong>Desvantagens:</strong> Menor liquidez, carência mínima de 90 dias, rentabilidade bruta menor que CDB.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            <strong style={{ color: getInvestmentColor("tesouro") }}>Tesouro SELIC - Vantagens:</strong> Maior segurança do mercado, liquidez diária, acompanha a SELIC. <strong>Desvantagens:</strong> Tributação de IR, taxa de custódia da B3 (0,20% ao ano).
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            <strong style={{ color: getInvestmentColor("poupanca") }}>Poupança - Vantagens:</strong> Isenção de IR, liquidez imediata, simplicidade. <strong>Desvantagens:</strong> Menor rentabilidade, perda de poder de compra em relação à inflação.
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Garantias e Segurança dos Investimentos
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
            <li><strong>FGC (Fundo Garantidor de Créditos):</strong> Garante CDB, LCI e LCA até R$ 250 mil por CPF por instituição financeira</li>
            <li><strong>Tesouro Nacional:</strong> Tesouro SELIC é garantido pelo Governo Federal, considerado risco zero</li>
            <li><strong>Poupança:</strong> Garantida pelo FGC até R$ 250 mil, mesmas regras dos demais produtos</li>
            <li><strong>Diversificação:</strong> Recomenda-se diversificar entre diferentes instituições para maximizar a cobertura do FGC</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Estratégias de Investimento em Renda Fixa
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
            <li><strong>Reserva de Emergência:</strong> Prefira Tesouro SELIC ou CDB com liquidez diária</li>
            <li><strong>Prazo Longo (+2 anos):</strong> CDB com maior percentual do CDI pode ser mais atrativo</li>
            <li><strong>Isenção de IR:</strong> LCI/LCA são ideais para quem busca rendimento líquido superior</li>
            <li><strong>Diversificação:</strong> Combine diferentes produtos para otimizar rentabilidade e liquidez</li>
            <li><strong>Escada de Vencimentos:</strong> Aplique em diferentes prazos para ter flexibilidade</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Cenário Econômico e Perspectivas (2025)
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Com a SELIC em 15% e perspectiva de alta para 15,75%, a renda fixa se torna extremamente atrativa. O Banco Central mantém política monetária restritiva para combater a inflação, beneficiando investidores de renda fixa.
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
            <li><strong>SELIC Alta:</strong> Melhora atratividade do Tesouro SELIC e CDBs indexados ao CDI</li>
            <li><strong>Poupança Defasada:</strong> Com SELIC alta, poupança perde ainda mais atratividade</li>
            <li><strong>LCI/LCA Competitivas:</strong> Isenção de IR compensa rentabilidade bruta menor</li>
            <li><strong>Inflação Controlada:</strong> Meta de 3% para 2025 favorece investimentos em renda fixa</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Como Usar o Comparador de Renda Fixa
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Nossa calculadora considera todos os fatores relevantes para a comparação:
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
            <li><strong>Valor Inicial:</strong> Informe o valor que deseja investir</li>
            <li><strong>Prazo:</strong> Defina o período de investimento (meses ou anos)</li>
            <li><strong>Percentuais do CDI:</strong> Ajuste as taxas oferecidas pelos bancos</li>
            <li><strong>Tributação:</strong> IR e IOF são calculados automaticamente</li>
            <li><strong>Comparação Visual:</strong> Gráficos mostram evolução e resultado final</li>
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            O comparador utiliza as taxas atuais de mercado e considera a tributação vigente para apresentar o <strong>rendimento líquido real</strong> de cada investimento, ajudando você a tomar a melhor decisão financeira.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Para informações atualizadas sobre taxas e regulamentações, consulte o{" "}
            <Link
              href="https://www.bcb.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Banco Central do Brasil
            </Link>{" "}
            ou a{" "}
            <Link
              href="https://www.tesourodireto.com.br"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              plataforma do Tesouro Direto
            </Link>
            .
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Dicas para Maximizar Seus Investimentos
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
            >
              Para otimizar seus investimentos em renda fixa, considere estas estratégias:
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
                <strong>Compare sempre:</strong> Use nossa calculadora antes de investir para identificar a melhor opção.
              </li>
              <li>
                <strong>Considere o prazo:</strong> Investimentos longos podem ter tributação de IR mais baixa (15%).
              </li>
              <li>
                <strong>Diversifique instituições:</strong> Maximize a cobertura do FGC investindo em diferentes bancos.
              </li>
              <li>
                <strong>Acompanhe a SELIC:</strong> Mudanças na taxa básica afetam diretamente a rentabilidade.
              </li>
              <li>
                <strong>Reavalie periodicamente:</strong> O cenário econômico muda, assim como as melhores oportunidades.
              </li>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, textAlign: { xs: "justify", sm: "left" } }}
            >
              Lembre-se: o melhor investimento é aquele que se alinha com seus objetivos, prazo e perfil de risco. Nossa calculadora oferece uma análise técnica, mas sempre considere sua situação financeira específica.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;