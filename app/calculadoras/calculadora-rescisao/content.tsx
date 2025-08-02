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
      case "sem_justa_causa":
        return theme.palette.success.dark;
      case "com_justa_causa":
        return theme.palette.error.dark;
      case "pedido_demissao":
        return theme.palette.warning.main;
      case "acordo_mutuo":
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
              Entenda Tudo Sobre Rescisão Trabalhista - CLT
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            A <strong>rescisão trabalhista</strong> é o processo de encerramento do contrato de trabalho entre empregado e empregador, regulamentada pela CLT (Consolidação das Leis do Trabalho). Durante a rescisão, o trabalhador tem direito a receber diferentes verbas rescisórias, que variam conforme o tipo de demissão e as circunstâncias do desligamento.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>O que é a rescisão trabalhista?</strong> A rescisão trabalhista é a formalização do fim do vínculo empregatício, documentada através do Termo de Rescisão do Contrato de Trabalho (TRCT). Este processo garante que o trabalhador receba todos os direitos devidos conforme a legislação brasileira.
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
            <strong>Prazo para Pagamento da Rescisão:</strong><br />
            Até 10 dias corridos após o término do contrato
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Tipos de Rescisão Trabalhista
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
              <strong style={{ color: getTypeColor("sem_justa_causa") }}>
                Demissão sem Justa Causa:
              </strong>{" "}
              O empregador dispensa o funcionário sem que este tenha cometido falta grave. O trabalhador tem direito a todas as verbas rescisórias, incluindo aviso prévio, multa de 40% sobre o FGTS e seguro-desemprego.
            </li>
            <li>
              <strong style={{ color: getTypeColor("com_justa_causa") }}>
                Demissão com Justa Causa:
              </strong>{" "}
              O trabalhador é dispensado por ter cometido falta grave. Neste caso, recebe apenas o saldo de salário e férias vencidas (se houver), perdendo direito à maioria das verbas rescisórias.
            </li>
            <li>
              <strong style={{ color: getTypeColor("pedido_demissao") }}>
                Pedido de Demissão:
              </strong>{" "}
              O trabalhador solicita o desligamento. Recebe saldo de salário, férias proporcionais, 13º salário proporcional, mas perde direito ao aviso prévio indenizado, multa do FGTS e seguro-desemprego.
            </li>
            <li>
              <strong style={{ color: getTypeColor("acordo_mutuo") }}>
                Acordo Mútuo (Demissão Consensual):
              </strong>{" "}
              Modalidade criada pela Reforma Trabalhista, onde empregado e empregador concordam em encerrar o contrato. O trabalhador recebe metade do aviso prévio e multa de 20% sobre o FGTS.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Verbas Rescisórias - O que Compõe o Cálculo
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            As verbas rescisórias são os valores que o trabalhador tem direito a receber no momento da rescisão. Veja cada componente:
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
              <strong>Saldo de Salário:</strong> Corresponde aos dias trabalhados no mês da rescisão. Calcula-se dividindo o salário por 30 e multiplicando pelos dias efetivamente trabalhados.
            </li>
            <li>
              <strong>Férias Proporcionais:</strong> Direito a 1/12 avos das férias para cada mês completo trabalhado no período aquisitivo. Inclui o adicional de 1/3 constitucional.
            </li>
            <li>
              <strong>13º Salário Proporcional:</strong> Calculado com base nos meses trabalhados no ano da rescisão (1/12 para cada mês completo).
            </li>
            <li>
              <strong>Aviso Prévio:</strong> Direito a 30 dias de salário, podendo ser trabalhado ou indenizado. Na demissão consensual, o valor é reduzido à metade.
            </li>
            <li>
              <strong>FGTS:</strong> Saldo acumulado durante o contrato, mais os 8% sobre as verbas rescisórias (quando aplicável).
            </li>
            <li>
              <strong>Multa do FGTS:</strong> 40% sobre o total de depósitos na demissão sem justa causa, ou 20% na demissão consensual.
            </li>
            <li>
              <strong>Salário Família:</strong> Benefício de R$ 65,00 por dependente (filhos menores de 14 anos ou com deficiência) para trabalhadores com salário até R$ 1.906,04. Pago proporcionalmente aos dias trabalhados no mês da rescisão.
            </li>
            <li>
              <strong>FGTS:</strong> 8% do salário depositado mensalmente pelo empregador durante todo o contrato, mais 8% sobre verbas rescisórias (aviso prévio e 13º salário).
            </li>
            <li>
              <strong>Encargos e Descontos:</strong> INSS incide sobre saldo de salário, aviso prévio e 13º salário. Imposto de Renda incide sobre o total bruto menos INSS, considerando dependentes.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Fórmulas de Cálculo da Rescisão
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
            <strong>Exemplos de Cálculo:</strong><br /><br />
            • <strong>Saldo de Salário:</strong> (Salário ÷ 30) × Dias trabalhados<br />
            • <strong>Férias Vencidas:</strong> (Salário ÷ 30) × Dias não gozados<br />
            • <strong>Férias Proporcionais:</strong> (Salário ÷ 12) × Meses trabalhados<br />
            • <strong>1/3 das Férias:</strong> (Férias vencidas + proporcionais) ÷ 3<br />
            • <strong>13º Proporcional:</strong> (Salário ÷ 12) × Meses trabalhados<br />
            • <strong>Salário Família:</strong> (R$ 65,00 × Dependentes ÷ 30) × Dias trabalhados<br />
            • <strong>FGTS Depósitos:</strong> Salário × Meses trabalhados × 8%<br />
            • <strong>FGTS Rescisão:</strong> (Aviso prévio + 13º) × 8%<br />
            • <strong>Multa FGTS:</strong> (FGTS depósitos + rescisão) × 40% (ou 20%)<br />
            • <strong>INSS:</strong> Sobre saldo + aviso + 13º (tabela progressiva)<br />
            • <strong>Imposto de Renda:</strong> Sobre total bruto - INSS (tabela progressiva)
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            FGTS e Depósitos do Empregador
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O <strong>FGTS (Fundo de Garantia do Tempo de Serviço)</strong> é um direito de todos os trabalhadores CLT. Durante o contrato, o empregador deposita mensalmente 8% do salário em uma conta vinculada ao trabalhador.
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
            <li><strong>Depósitos mensais:</strong> 8% sobre o salário de cada mês trabalhado</li>
            <li><strong>Depósitos rescisórios:</strong> 8% sobre aviso prévio indenizado e 13º salário</li>
            <li><strong>Saque:</strong> Disponível na demissão sem justa causa ou acordo mútuo</li>
            <li><strong>Multa:</strong> 40% (demissão s/ justa causa) ou 20% (acordo mútuo) sobre total depositado</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Descontos e Encargos na Rescisão
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Sobre as verbas rescisórias incidem alguns descontos obrigatórios conforme a legislação:
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
            <li><strong>INSS (2024):</strong> 7,5% até R$ 1.412; 9% até R$ 2.667; 12% até R$ 4.000; 14% até R$ 7.786 (teto: R$ 908,85)</li>
            <li><strong>Imposto de Renda:</strong> Tabela progressiva com dedução por dependente (R$ 189,59 cada)</li>
            <li><strong>Base de cálculo INSS:</strong> Saldo de salário + aviso prévio + 13º salário</li>
            <li><strong>Base de cálculo IR:</strong> Total bruto - INSS - (dependentes × R$ 189,59)</li>
            <li><strong>Pensão alimentícia:</strong> Se houver determinação judicial</li>
            <li><strong>Adiantamentos:</strong> Valores antecipados pela empresa</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Salário Família na Rescisão Trabalhista
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O <strong>salário família</strong> é um benefício previdenciário pago mensalmente ao trabalhador que tenha filhos de até 14 anos ou filhos com deficiência de qualquer idade. Em 2024/2025, o valor é de <strong>R$ 65,00 por dependente</strong> para trabalhadores com salário de até <strong>R$ 1.906,04</strong>.
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
            <li><strong>Quem tem direito:</strong> Trabalhadores CLT com salário até R$ 1.906,04 e dependentes menores de 14 anos ou com deficiência</li>
            <li><strong>Valor em 2025:</strong> R$ 65,00 por dependente (cumulativo)</li>
            <li><strong>Na rescisão:</strong> Pago proporcionalmente aos dias trabalhados no mês do desligamento</li>
            <li><strong>Exemplo:</strong> 2 filhos, rescisão no dia 15 de um mês de 30 dias: (R$ 130,00 ÷ 30) × 15 = R$ 65,00</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Documentos Necessários para a Rescisão
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para formalizar a rescisão trabalhista, são necessários os seguintes documentos:
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
            <li>Termo de Rescisão do Contrato de Trabalho (TRCT)</li>
            <li>Carteira de Trabalho e Previdência Social (CTPS)</li>
            <li>Chaves de acesso ao FGTS</li>
            <li>Formulário do Seguro-Desemprego (quando aplicável)</li>
            <li>Exame demissional (ASO - Atestado de Saúde Ocupacional)</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Quando Procurar Ajuda Especializada
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            É recomendável buscar orientação de um advogado trabalhista ou contador especializado nas seguintes situações:
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
            <li>Discordância dos valores calculados pela empresa</li>
            <li>Suspeita de irregularidades no cálculo</li>
            <li>Dúvidas sobre direitos específicos</li>
            <li>Necessidade de homologação em sindicato (contratos superiores a um ano)</li>
            <li>Casos complexos envolvendo horas extras, adicionais ou comissões</li>
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Nossa calculadora oferece uma estimativa baseada nas regras gerais da CLT. Para casos específicos ou complexos, sempre consulte um profissional qualificado para garantir que seus direitos sejam respeitados.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para informações oficiais sobre direitos trabalhistas, consulte o{" "}
            <Link
              href="https://www.gov.br/trabalho-e-previdencia/pt-br"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Ministério do Trabalho e Previdência
            </Link>{" "}
            ou a{" "}
            <Link
              href="https://www.tst.jus.br/"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Justiça do Trabalho
            </Link>
            .
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Direitos do Trabalhador na Rescisão
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
            >
              É fundamental que o trabalhador conheça seus direitos durante o processo de rescisão:
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
                <strong>Direito à homologação:</strong> Contratos com mais de um ano devem ser homologados no sindicato da categoria ou órgão competente.
              </li>
              <li>
                <strong>Prazo para pagamento:</strong> A empresa tem até 10 dias corridos para quitar todas as verbas rescisórias.
              </li>
              <li>
                <strong>Multa por atraso:</strong> Em caso de atraso no pagamento, a empresa deve pagar multa equivalente ao salário do empregado.
              </li>
              <li>
                <strong>Seguro-desemprego:</strong> Disponível para demissão sem justa causa, mediante cumprimento dos requisitos legais.
              </li>
              <li>
                <strong>Revisão dos cálculos:</strong> O trabalhador tem direito de questionar e solicitar revisão dos valores apresentados.
              </li>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, ...mobileTextStyle }}
            >
              Sempre confira os cálculos antes de assinar o Termo de Rescisão e não hesite em buscar orientação profissional quando necessário. Seus direitos trabalhistas são garantidos por lei e devem ser respeitados integralmente.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;