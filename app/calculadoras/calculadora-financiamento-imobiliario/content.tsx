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

  const getBankColor = (bank: string) => {
    switch (bank) {
      case "caixa":
        return "#0066cc";
      case "bb":
        return "#ffcc00";
      case "itau":
        return "#ec7000";
      case "bradesco":
        return "#cc092f";
      case "santander":
        return "#ec0000";
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
              Guia Completo do Financiamento Imobiliário 2025
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O <strong>financiamento imobiliário</strong> é uma das principais formas de realizar o sonho da casa própria no Brasil. Com as atualizações de 2025, incluindo novas faixas do programa Minha Casa Minha Vida e taxas diferenciadas, é fundamental conhecer todas as opções disponíveis para tomar a melhor decisão financeira.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>O que é financiamento imobiliário?</strong> É um empréstimo de longo prazo concedido por bancos e instituições financeiras para aquisição de imóveis residenciais ou comerciais, onde o próprio imóvel serve como garantia (alienação fiduciária).
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
            <strong>Novidades 2025:</strong><br />
            ✅ Nova faixa 4 do MCMV para renda até R$ 12.000<br />
            ✅ Taxas reduzidas para Norte/Nordeste (4,0% a.a.)<br />
            ✅ Prazo máximo ampliado para 420 meses
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Sistemas de Amortização: SAC vs Price
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            A escolha do sistema de amortização é crucial para o planejamento financeiro de longo prazo:
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
              <strong style={{ color: theme.palette.success.dark }}>
                SAC (Sistema de Amortização Constante):
              </strong>{" "}
              Parcelas começam maiores e diminuem ao longo do tempo. A amortização do saldo devedor é constante, resultando em menor pagamento de juros total. Ideal para quem tem renda estável e pode pagar parcelas maiores no início.
            </li>
            <li>
              <strong style={{ color: theme.palette.primary.dark }}>
                Tabela Price:
              </strong>{" "}
              Parcelas fixas durante todo o financiamento. No início, paga-se mais juros e menos amortização. Melhor para quem prefere previsibilidade e tem renda que pode crescer ao longo do tempo.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Programas Habitacionais do Governo - Atualizações 2025
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Os programas governamentais oferecem condições especiais com juros subsidiados e valores de subsídio que podem chegar a R$ 55.000:
          </Typography>

          <Box
            p={2}
            bgcolor="#e8f5e8"
            borderRadius={2}
            mb={2}
            border={`2px solid ${theme.palette.success.main}`}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, color: theme.palette.success.dark }}>
              🏛️ Minha Casa Minha Vida 2025
            </Typography>
            <Typography
              variant="body2"
              component="ul"
              sx={{ listStyleType: "disc", pl: 2, lineHeight: 1.6, mb: 0 }}
            >
              <li><strong>Faixa 1:</strong> Renda até R$ 2.640 - Taxa 4,0% a 4,25% - Subsídio até R$ 55.000</li>
              <li><strong>Faixa 2:</strong> Renda até R$ 4.700 - Taxa 5,0% - Subsídio até R$ 47.500</li>
              <li><strong>Faixa 3:</strong> Renda até R$ 8.600 - Taxa 7,16% - Subsídio até R$ 29.000</li>
              <li><strong>Faixa 4 (Nova):</strong> Renda até R$ 12.000 - Taxa 10,50% - Subsídio até R$ 5.000</li>
            </Typography>
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Como Usar o FGTS no Financiamento
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O <strong>FGTS (Fundo de Garantia do Tempo de Serviço)</strong> pode ser utilizado de diferentes formas no financiamento habitacional:
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
              <strong>Na entrada:</strong> Pode ser usado para complementar o valor da entrada, reduzindo o valor a ser financiado
            </li>
            <li>
              <strong>Para amortização:</strong> A cada 2 anos, é possível usar o saldo para reduzir o saldo devedor
            </li>
            <li>
              <strong>Limite de uso:</strong> Máximo de 50% do valor do imóvel ou 100% do saldo disponível
            </li>
            <li>
              <strong>Requisitos:</strong> Trabalhador deve ter pelo menos 3 anos de trabalho sob regime do FGTS
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Taxas de Juros por Banco - 2025
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            As taxas variam significativamente entre instituições financeiras. Veja as faixas atualizadas:
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
            <strong>Taxas de Financiamento 2025:</strong><br /><br />
            • <strong style={{ color: getBankColor("caixa") }}>Caixa Econômica:</strong> 11,29% a 13,50% a.a.<br />
            • <strong style={{ color: getBankColor("bb") }}>Banco do Brasil:</strong> 12,00% a 14,00% a.a.<br />
            • <strong style={{ color: getBankColor("itau") }}>Itaú:</strong> 12,19% a 15,00% a.a.<br />
            • <strong style={{ color: getBankColor("bradesco") }}>Bradesco:</strong> 13,50% a 16,00% a.a.<br />
            • <strong style={{ color: getBankColor("santander") }}>Santander:</strong> 12,50% a 15,50% a.a.<br />
            • <strong>Outros Bancos:</strong> 11,00% a 16,00% a.a.
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Seguros Obrigatórios no Financiamento
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Todo financiamento imobiliário exige a contratação de seguros para proteger o banco e o mutuário:
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
              <strong>MIP (Morte e Invalidez Permanente):</strong> Cobre o saldo devedor em caso de morte ou invalidez permanente do segurado. Custo médio: 0,06% do saldo devedor por mês.
            </li>
            <li>
              <strong>DFI (Danos Físicos ao Imóvel):</strong> Protege contra incêndio, raio, explosão e outros danos. Custo médio: 0,01337% do valor do imóvel por ano.
            </li>
            <li>
              <strong>Renovação:</strong> Os seguros devem ser renovados anualmente e são obrigatórios durante todo o financiamento.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Comprometimento de Renda Ideal
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O comprometimento da renda familiar com o financiamento é um fator crucial para aprovação e sustentabilidade:
          </Typography>

          <Box
            p={2}
            bgcolor="#fff3e0"
            borderRadius={2}
            boxShadow={1}
            mb={2}
          >
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              <strong>Faixas de Comprometimento:</strong><br />
              🟢 <strong>Até 30%:</strong> Comprometimento ideal e seguro<br />
              🟡 <strong>30% a 35%:</strong> Comprometimento moderado, aceitável<br />
              🔴 <strong>Acima de 35%:</strong> Comprometimento alto, risco financeiro
            </Typography>
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Documentação Necessária
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para solicitar um financiamento imobiliário, você precisará apresentar:
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
            <li>Documentos pessoais (RG, CPF, certidões)</li>
            <li>Comprovantes de renda (holerites, IR, contratos)</li>
            <li>Comprovantes de residência</li>
            <li>Extratos bancários dos últimos 3 meses</li>
            <li>Certidões negativas (SPC, Serasa, Cartório)</li>
            <li>Documentos do imóvel (matrícula, IPTU, avaliação)</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Dicas para Conseguir Melhores Condições
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
              <strong>Compare taxas:</strong> Pesquise em pelo menos 3 bancos diferentes
            </li>
            <li>
              <strong>Negocie:</strong> Clientes com relacionamento bancário podem conseguir descontos
            </li>
            <li>
              <strong>Entrada maior:</strong> Quanto maior a entrada, menor o risco e melhores as condições
            </li>
            <li>
              <strong>Score alto:</strong> Mantenha seu CPF limpo e score alto no Serasa/SPC
            </li>
            <li>
              <strong>Documentação completa:</strong> Tenha todos os documentos organizados
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Cálculos e Simulações
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Nossa calculadora considera todos os fatores atualizados para 2025:
          </Typography>

          <Box
            p={2}
            bgcolor="#e3f2fd"
            borderRadius={2}
            boxShadow={1}
            mb={2}
          >
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              <strong>✅ Incluído na Simulação:</strong><br />
              • Sistemas SAC e Price com evolução das parcelas<br />
              • Programas governamentais e subsídios 2025<br />
              • Uso do FGTS na entrada e amortização<br />
              • Seguros MIP e DFI obrigatórios<br />
              • Análise de comprometimento de renda<br />
              • Comparação entre bancos e taxas
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Nossa calculadora oferece simulações precisas baseadas nas condições atuais do mercado brasileiro. Para decisões definitivas, consulte sempre o banco de sua preferência para condições específicas.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para informações oficiais sobre programas habitacionais, acesse o{" "}
            <Link
              href="https://www.gov.br/cidades/pt-br"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Ministério das Cidades
            </Link>{" "}
            ou a{" "}
            <Link
              href="https://www.caixa.gov.br/voce/habitacao/"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Caixa Econômica Federal
            </Link>
            .
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Processo de Financiamento Passo a Passo
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
            >
              Entenda como funciona o processo completo de financiamento imobiliário:
            </Typography>

            <Typography
              variant="body2"
              component="ol"
              sx={{
                pl: 2,
                lineHeight: 1.6,
                marginBottom: 2,
                ...mobileTextStyle,
              }}
            >
              <li>
                <strong>Pré-análise:</strong> O banco avalia sua capacidade de pagamento baseada na renda, histórico de crédito e documentação apresentada.
              </li>
              <li>
                <strong>Escolha do imóvel:</strong> Após pré-aprovação, você tem prazo determinado (geralmente 90 dias) para encontrar o imóvel.
              </li>
              <li>
                <strong>Avaliação técnica:</strong> O banco contrata empresa especializada para avaliar o imóvel e verificar sua documentação.
              </li>
              <li>
                <strong>Aprovação final:</strong> Com documentação completa e avaliação aprovada, o banco libera o crédito.
              </li>
              <li>
                <strong>Assinatura:</strong> Assinatura do contrato de financiamento e dos seguros obrigatórios.
              </li>
              <li>
                <strong>Liberação:</strong> O banco libera o valor diretamente ao vendedor, e você recebe as chaves.
              </li>
            </Typography>

            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, ...mobileTextStyle }}
            >
              <strong>Prazo médio do processo:</strong> Entre 30 a 60 dias, dependendo da complexidade da documentação e da agilidade na apresentação dos documentos necessários.
            </Typography>
          </Paper>
        </Box>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Amortização Extraordinária e Portabilidade
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
            >
              Após a contratação do financiamento, você ainda tem opções para otimizar suas condições:
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
                <strong>Amortização com FGTS:</strong> A cada 2 anos, você pode usar o saldo do FGTS para reduzir o saldo devedor, diminuindo as parcelas ou o prazo.
              </li>
              <li>
                <strong>Amortização extraordinária:</strong> Use recursos próprios (13º salário, herança, etc.) para quitar parcialmente o financiamento.
              </li>
              <li>
                <strong>Portabilidade:</strong> Transfira seu financiamento para outro banco com melhores condições, sem custos adicionais.
              </li>
              <li>
                <strong>Renegociação:</strong> Em situações de dificuldade, é possível renegociar prazos e condições diretamente com o banco.
              </li>
            </Typography>

            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, ...mobileTextStyle }}
            >
              <strong>Dica importante:</strong> A portabilidade de crédito imobiliário é gratuita e pode gerar economia significativa ao longo do financiamento. Compare regularmente as condições do mercado.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;