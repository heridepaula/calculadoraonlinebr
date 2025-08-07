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

  const getIndexationColor = (type: string) => {
    switch (type) {
      case "pre":
        return theme.palette.primary.dark;
      case "pos":
        return theme.palette.success.dark;
      case "ipca":
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
              Tudo Sobre CDB - Certificado de Depósito Bancário
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            O <strong>CDB (Certificado de Depósito Bancário)</strong> é um dos investimentos de renda fixa mais populares no Brasil. É um título emitido por bancos para captar recursos, oferecendo rentabilidade ao investidor em troca do empréstimo de dinheiro por um período determinado.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            <strong>O que é CDB?</strong> O CDB é um investimento em que você empresta dinheiro ao banco, e ele te paga juros por isso. É considerado um investimento seguro, pois é garantido pelo FGC (Fundo Garantidor de Créditos) até R$ 250.000 por CPF e por instituição financeira.
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
            <strong>Garantia do FGC:</strong><br />
            Até R$ 250.000 por CPF e por instituição financeira
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Tipos de CDB por Indexação
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
              <strong style={{ color: getIndexationColor("pre") }}>
                CDB Pré-fixado:
              </strong>{" "}
              A taxa de juros é definida no momento da aplicação e permanece fixa até o vencimento. Exemplo: CDB de 12% ao ano. Ideal quando você acredita que as taxas de juros vão cair ou quando quer previsibilidade total dos rendimentos.
            </li>
            <li>
              <strong style={{ color: getIndexationColor("pos") }}>
                CDB Pós-fixado (CDI):
              </strong>{" "}
              A rentabilidade varia conforme um índice de referência, geralmente o CDI. Exemplo: 110% do CDI. É o tipo mais comum e acompanha as variações da taxa básica de juros da economia.
            </li>
            <li>
              <strong style={{ color: getIndexationColor("ipca") }}>
                CDB IPCA+:
              </strong>{" "}
              Combina uma taxa fixa com a variação da inflação (IPCA). Exemplo: IPCA + 6% ao ano. Garante ganho real acima da inflação, ideal para investimentos de longo prazo.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Como Funciona o Cálculo do CDB
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            O rendimento do CDB depende do tipo de indexação e do prazo de investimento. Nossa calculadora considera todos os fatores importantes:
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
              <strong>Valor Principal:</strong> Quantia investida inicialmente no CDB.
            </li>
            <li>
              <strong>Taxa de Juros:</strong> Pode ser pré-fixada, pós-fixada (% do CDI) ou híbrida (IPCA+).
            </li>
            <li>
              <strong>Prazo:</strong> Período de investimento em dias, que influencia diretamente na tributação.
            </li>
            <li>
              <strong>Juros Compostos:</strong> Os rendimentos são reinvestidos automaticamente, gerando juros sobre juros.
            </li>
            <li>
              <strong>Tributação:</strong> Imposto de Renda e IOF incidem sobre os rendimentos conforme tabela regressiva.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Tributação do CDB - Tabela Regressiva
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
            <strong>Imposto de Renda sobre Rendimentos:</strong><br />
            • <strong>Até 180 dias:</strong> 22,5%<br />
            • <strong>181 a 360 dias:</strong> 20%<br />
            • <strong>361 a 720 dias:</strong> 17,5%<br />
            • <strong>Acima de 720 dias:</strong> 15%<br /><br />
            <strong>IOF (Imposto sobre Operações Financeiras):</strong><br />
            • Incide apenas nos primeiros 30 dias<br />
            • Alíquota regressiva: 96% no 1º dia até 0% no 30º dia<br />
            • Após 30 dias: isento de IOF
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Vantagens e Desvantagens do CDB
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 1, textAlign: { xs: "justify", sm: "left" } }}
          >
            <strong>✅ Vantagens:</strong>
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
            <li><strong>Segurança:</strong> Garantido pelo FGC até R$ 250.000 por CPF e por banco</li>
            <li><strong>Liquidez:</strong> Muitos CDBs permitem resgate antecipado (com ou sem perda de rentabilidade)</li>
            <li><strong>Rentabilidade:</strong> Geralmente oferece rentabilidade superior à poupança</li>
            <li><strong>Diversidade:</strong> Vários tipos de indexação e prazos disponíveis</li>
            <li><strong>Baixo valor mínimo:</strong> Muitos bancos aceitam aplicações a partir de R$ 100</li>
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 1, textAlign: { xs: "justify", sm: "left" } }}
          >
            <strong>❌ Desvantagens:</strong>
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
            <li><strong>Tributação:</strong> Incidência de IR e IOF sobre os rendimentos</li>
            <li><strong>Prazo de carência:</strong> Alguns CDBs têm período mínimo para resgate</li>
            <li><strong>Risco de crédito:</strong> Embora protegido pelo FGC, existe o risco de falência do banco</li>
            <li><strong>Rentabilidade limitada:</strong> Geralmente não acompanha o crescimento de investimentos em renda variável</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            CDI - Certificado de Depósito Interbancário
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            O <strong>CDI</strong> é a taxa de juros que os bancos usam para emprestar dinheiro entre si. É o principal indexador dos CDBs pós-fixados e acompanha de perto a taxa Selic (taxa básica da economia brasileira).
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
            <li><strong>Relação com Selic:</strong> O CDI fica sempre próximo da taxa Selic</li>
            <li><strong>Atualização diária:</strong> A taxa CDI é atualizada todos os dias úteis</li>
            <li><strong>Percentual do CDI:</strong> CDBs geralmente oferecem entre 90% a 120% do CDI</li>
            <li><strong>Referência atual:</strong> Em janeiro de 2025, o CDI está em aproximadamente 13,65% ao ano</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            IPCA e Investimentos Indexados à Inflação
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            O <strong>IPCA (Índice Nacional de Preços ao Consumidor Amplo)</strong> é o índice oficial de inflação do Brasil. CDBs IPCA+ garantem rentabilidade real, ou seja, ganho acima da inflação.
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
            <li><strong>Proteção contra inflação:</strong> Seu dinheiro não perde poder de compra</li>
            <li><strong>Ideal para longo prazo:</strong> Melhor para investimentos acima de 2 anos</li>
            <li><strong>Composição:</strong> IPCA acumulado + taxa fixa (ex: IPCA + 6% a.a.)</li>
            <li><strong>Meta de inflação 2025:</strong> 3% com tolerância de 1,5% para mais ou menos</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Como Escolher o Melhor CDB
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Para escolher o melhor CDB para seu perfil, considere os seguintes fatores:
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
            <li><strong>Prazo de investimento:</strong> Defina por quanto tempo pode deixar o dinheiro aplicado</li>
            <li><strong>Necessidade de liquidez:</strong> Verifique se precisará resgatar antes do vencimento</li>
            <li><strong>Expectativa de juros:</strong> Se acredita que os juros vão subir ou cair</li>
            <li><strong>Proteção contra inflação:</strong> Para longo prazo, considere IPCA+</li>
            <li><strong>Diversificação:</strong> Não concentre tudo em um único banco</li>
            <li><strong>Rating do banco:</strong> Verifique a solidez da instituição financeira</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Estratégias de Investimento em CDB
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            <strong>Escada de CDBs:</strong> Divida o valor em CDBs com vencimentos diferentes para ter liquidez periodicamente e aproveitar possíveis altas de juros.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            <strong>Diversificação por bancos:</strong> Invista em CDBs de diferentes bancos para maximizar a proteção do FGC e reduzir riscos.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            <strong>Análise de cenários:</strong> Use nossa calculadora para comparar diferentes tipos de CDB e escolher o mais adequado ao seu perfil e expectativas.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Nossa calculadora oferece simulações precisas baseadas nas regras atuais de tributação e indexação. Para informações sempre atualizadas sobre taxas e regulamentações, consulte o{" "}
            <Link
              href="https://www.bcb.gov.br/"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Banco Central do Brasil
            </Link>{" "}
            e a{" "}
            <Link
              href="https://www.cvm.gov.br/"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Comissão de Valores Mobiliários (CVM)
            </Link>
            .
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Dicas Importantes para Investir em CDB
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
            >
              Antes de investir em CDB, considere estas dicas essenciais:
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
                <strong>Pesquise taxas:</strong> Compare as taxas oferecidas por diferentes bancos e corretoras antes de investir.
              </li>
              <li>
                <strong>Leia o contrato:</strong> Verifique todas as condições, incluindo prazo de carência e penalidades por resgate antecipado.
              </li>
              <li>
                <strong>Considere a tributação:</strong> Lembre-se que investimentos com prazo maior têm tributação menor.
              </li>
              <li>
                <strong>Mantenha reserva de emergência:</strong> Não invista todo seu dinheiro em CDBs com carência.
              </li>
              <li>
                <strong>Diversifique:</strong> Distribua seus investimentos entre diferentes bancos e tipos de CDB.
              </li>
              <li>
                <strong>Acompanhe o mercado:</strong> Fique atento às mudanças na taxa Selic e na inflação.
              </li>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, textAlign: { xs: "justify", sm: "left" } }}
            >
              O CDB é uma excelente opção para quem busca segurança e rentabilidade superior à poupança. Use nossa calculadora para simular diferentes cenários e tomar a melhor decisão de investimento para seu perfil.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;