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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "inss":
        return theme.palette.success.dark;
      case "servidor":
        return theme.palette.info.dark;
      case "privado":
        return theme.palette.warning.main;
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
              Tudo Sobre Empréstimo Consignado 2025 - Guia Completo
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            O <strong>empréstimo consignado</strong> é uma modalidade de crédito com desconto direto na folha de pagamento ou benefício do INSS, oferecendo as menores taxas de juros do mercado. Em 2025, importantes mudanças beneficiam aposentados, pensionistas e servidores públicos, tornando essa opção ainda mais atrativa.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            <strong>O que é empréstimo consignado?</strong> É um tipo de empréstimo onde as parcelas são descontadas automaticamente do salário ou benefício, garantindo pagamento à instituição financeira. Esta garantia permite taxas de juros menores em comparação com outras modalidades de crédito pessoal.
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
            <strong>Principais Vantagens 2025:</strong><br />
            • Taxas de juros mais baixas do mercado<br />
            • Até 96 meses para pagar (INSS)<br />
            • Desconto automático em folha<br />
            • Sem consulta ao SPC/Serasa
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Margem Consignável por Categoria
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
              <strong style={{ color: getTypeColor("inss") }}>
                INSS (Aposentados e Pensionistas):
              </strong>{" "}
              Até <strong>45% do benefício</strong> - sendo 35% para empréstimo pessoal, 5% para cartão de crédito consignado e 5% para cartão de benefício. Taxa atual de 1,66% ao mês (2025).
            </li>
            <li>
              <strong style={{ color: getTypeColor("servidor") }}>
                Servidores Públicos:
              </strong>{" "}
              Até <strong>35% do salário líquido</strong> para empréstimo e até 5% para cartão consignado. Taxas variam entre 1,0% a 1,5% ao mês, dependendo do órgão e convênios.
            </li>
            <li>
              <strong style={{ color: getTypeColor("privado") }}>
                CLT Setor Privado:
              </strong>{" "}
              Novo <strong>Consignado Privado 2025</strong> - até 35% do salário líquido. Modalidade será lançada no primeiro semestre de 2025 para todos os trabalhadores CLT.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Principais Mudanças em 2025
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            O ano de 2025 trouxe importantes atualizações para o empréstimo consignado:
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
              <strong>Prazo Ampliado (INSS):</strong> Aposentados e pensionistas podem parcelar em até 96 meses (8 anos), contra 84 meses anteriormente.
            </li>
            <li>
              <strong>Taxa de Juros Limitada:</strong> Teto máximo de 1,80% ao mês para operações de empréstimo pessoal em benefícios previdenciários.
            </li>
            <li>
              <strong>Novas Regras para Novatos:</strong> Novos aposentados podem solicitar antes de 90 dias no banco pagador do benefício.
            </li>
            <li>
              <strong>Consignado Privado:</strong> Lançamento previsto para trabalhadores CLT do setor privado no primeiro semestre.
            </li>
            <li>
              <strong>Melhor Regulamentação:</strong> Maior proteção ao consumidor e transparência nas operações.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Como Calcular a Margem Consignável
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            O cálculo da margem consignável é fundamental para saber quanto você pode solicitar de empréstimo:
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
            <strong>Fórmulas de Cálculo da Margem:</strong><br /><br />
            • <strong>INSS:</strong> Benefício × 45% = Margem Total<br />
            • <strong>Servidor Público:</strong> Salário Líquido × 35% = Margem Total<br />
            • <strong>CLT Privado:</strong> Salário Líquido × 35% = Margem Total<br /><br />
            <strong>Margem Disponível:</strong><br />
            Margem Total - Prestações Existentes = Margem Livre<br /><br />
            <strong>Valor Máximo do Empréstimo:</strong><br />
            Depende da taxa de juros e prazo escolhido
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Taxas de Juros do Consignado em 2025
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            As taxas do empréstimo consignado são as mais baixas do mercado de crédito pessoal:
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
            <li><strong>INSS - Empréstimo:</strong> Taxa atual de 1,66% ao mês (teto de 1,80% ao mês)</li>
            <li><strong>INSS - Cartão de Crédito:</strong> 2,46% ao mês</li>
            <li><strong>Servidores Públicos:</strong> Entre 1,0% e 1,5% ao mês (varia por órgão)</li>
            <li><strong>CLT Privado:</strong> Previsão de 1,5% a 2,0% ao mês</li>
            <li><strong>Comparação:</strong> Crédito pessoal comum pode ultrapassar 10% ao mês</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Prazos de Pagamento por Modalidade
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
            <li><strong>INSS:</strong> Até 96 meses (8 anos) - novidade de 2025</li>
            <li><strong>Servidores Públicos:</strong> Até 96 meses (varia por órgão)</li>
            <li><strong>CLT Privado:</strong> Até 72 meses (previsão inicial)</li>
            <li><strong>Importante:</strong> Prazos maiores resultam em juros totais maiores</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Documentos Necessários
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Para solicitar um empréstimo consignado, você precisará dos seguintes documentos:
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
            <li>RG e CPF atualizados</li>
            <li>Comprovante de residência (últimos 3 meses)</li>
            <li>Extrato do INSS ou contracheque (últimos 3 meses)</li>
            <li>Número de matrícula SIAPE (servidores)</li>
            <li>Extrato da margem consignável</li>
            <li>Comprovante de conta bancária</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Vantagens do Empréstimo Consignado
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
            <li><strong>Menores Taxas:</strong> As mais baixas do mercado de crédito pessoal</li>
            <li><strong>Sem Consulta SPC/Serasa:</strong> Análise simplificada baseada na margem</li>
            <li><strong>Desconto Automático:</strong> Sem risco de esquecimento ou atraso</li>
            <li><strong>Prazos Longos:</strong> Até 96 meses para diluir o pagamento</li>
            <li><strong>Aprovação Rápida:</strong> Processo mais ágil que outros empréstimos</li>
            <li><strong>Flexibilidade:</strong> Pode quitar antecipadamente sem multa</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Cuidados e Considerações Importantes
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Embora seja uma modalidade segura, é importante considerar alguns aspectos:
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
            <li><strong>Comprometimento da Renda:</strong> Avalie se conseguirá viver com a renda reduzida</li>
            <li><strong>Prazo vs. Taxa:</strong> Prazos maiores reduzem a parcela, mas aumentam os juros totais</li>
            <li><strong>Margem de Segurança:</strong> Não use 100% da margem disponível</li>
            <li><strong>Compare Ofertas:</strong> Taxas podem variar entre instituições</li>
            <li><strong>Leia o Contrato:</strong> Atenção a taxas adicionais e seguros opcionais</li>
            <li><strong>Emergências:</strong> Mantenha reserva para imprevistos</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Como Consultar Sua Margem Consignável
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
              <strong>INSS:</strong> Portal ou aplicativo Meu INSS, telefone 135, ou agências
            </li>
            <li>
              <strong>Servidores Federais:</strong> Portal SIGEPE ou departamento de pessoal
            </li>
            <li>
              <strong>Servidores Estaduais/Municipais:</strong> Portal do servidor ou RH do órgão
            </li>
            <li>
              <strong>Bancos:</strong> Consulta direta nas instituições financeiras conveniadas
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Portabilidade de Empréstimo Consignado
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            A <strong>portabilidade</strong> permite transferir seu empréstimo para outro banco com melhores condições:
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
            <li><strong>Vantagens:</strong> Redução de taxa, diminuição de parcelas ou prazo</li>
            <li><strong>Processo:</strong> O novo banco quita o débito no banco anterior</li>
            <li><strong>Sem Custos:</strong> Não há taxas para o cliente na portabilidade</li>
            <li><strong>Prazo:</strong> Até 5 dias úteis para conclusão</li>
            <li><strong>Direito:</strong> Garantido por lei para todas as modalidades</li>
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Nossa calculadora oferece uma simulação precisa baseada nas regras atuais de 2025. Para informações oficiais e condições específicas, consulte sempre as instituições financeiras autorizadas e os órgãos competentes.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Para informações oficiais sobre empréstimo consignado, consulte o{" "}
            <Link
              href="https://www.gov.br/inss/pt-br"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Portal do INSS
            </Link>{" "}
            ou o{" "}
            <Link
              href="https://www.bcb.gov.br/"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Banco Central do Brasil
            </Link>
            .
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Dicas para Usar o Consignado com Segurança
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
            >
              O empréstimo consignado é uma ferramenta financeira poderosa quando usado com responsabilidade:
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
                <strong>Planeje antes de solicitar:</strong> Calcule se a renda restante será suficiente para suas necessidades básicas.
              </li>
              <li>
                <strong>Use para investimentos ou emergências:</strong> Evite usar para consumo supérfluo ou dívidas de cartão de crédito.
              </li>
              <li>
                <strong>Compare sempre:</strong> Taxas podem variar significativamente entre instituições.
              </li>
              <li>
                <strong>Considere a quitação antecipada:</strong> Se possível, quite antes do prazo para economizar juros.
              </li>
              <li>
                <strong>Mantenha documentos organizados:</strong> Guarde todos os comprovantes e contratos para consultas futuras.
              </li>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, textAlign: { xs: "justify", sm: "left" } }}
            >
              Lembre-se: o empréstimo consignado compromete sua renda por um longo período. Use com consciência e sempre dentro de suas possibilidades financeiras.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;