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
              Tudo Sobre Férias e 13º Salário - Guia Completo 2025
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            As <strong>férias e o 13º salário</strong> são direitos fundamentais dos trabalhadores brasileiros, garantidos pela CLT (Consolidação das Leis do Trabalho) e pela Constituição Federal. Esses benefícios asseguram o descanso remunerado e uma renda extra ao final do ano, proporcionando melhor qualidade de vida e segurança financeira aos trabalhadores.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            <strong>O que são Férias e 13º Salário?</strong> As férias são um período de descanso remunerado de 30 dias anuais, enquanto o 13º salário é uma gratificação natalina equivalente a um salário extra pago ao final do ano. Ambos os direitos são calculados proporcionalmente ao tempo trabalhado.
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
            <strong>Período Aquisitivo de Férias:</strong><br />
            12 meses de trabalho = direito a 30 dias de férias<br />
            <strong>Período de Gozo:</strong> Até 12 meses após o período aquisitivo
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🏖️ Férias Trabalhistas - Como Funciona
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            As férias são um direito constitucional do trabalhador brasileiro. Para cada 12 meses trabalhados (período aquisitivo), o empregado adquire o direito a 30 dias de descanso remunerado.
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
              <strong>Férias Integrais:</strong> 30 dias de descanso para quem trabalhou 12 meses completos com até 5 faltas injustificadas.
            </li>
            <li>
              <strong>Férias Proporcionais:</strong> Para períodos menores que 12 meses, calcula-se 1/12 das férias para cada mês trabalhado (mínimo de 15 dias no mês).
            </li>
            <li>
              <strong>1/3 Constitucional:</strong> Adicional obrigatório de um terço sobre o valor das férias, garantido pela Constituição Federal.
            </li>
            <li>
              <strong>Abono Pecuniário:</strong> Possibilidade de "vender" até 10 dias das férias, recebendo em dinheiro o equivalente a esses dias mais 1/3.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            💰 Abono Pecuniário - Venda de Férias
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            O <strong>abono pecuniário</strong> permite ao trabalhador "vender" parte das suas férias, convertendo até 1/3 do período (máximo 10 dias) em pagamento em dinheiro. Este benefício deve ser solicitado com antecedência mínima de 15 dias antes do término do período aquisitivo.
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
            <li><strong>Limite máximo:</strong> 10 dias das férias podem ser vendidos</li>
            <li><strong>Vantagem fiscal:</strong> O abono pecuniário é isento de IRRF e INSS</li>
            <li><strong>Cálculo:</strong> (Salário ÷ 30) × dias vendidos + 1/3 sobre o valor</li>
            <li><strong>Prazo:</strong> Solicitação até 15 dias antes do fim do período aquisitivo</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🎁 13º Salário - Gratificação Natalina
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            O <strong>13º salário</strong>, também conhecido como gratificação natalina, é um benefício criado pela Lei 4.090/1962 que garante aos trabalhadores CLT o recebimento de um salário extra ao final do ano. O valor corresponde a 1/12 da remuneração anual para cada mês trabalhado.
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
              <strong>Cálculo Proporcional:</strong> (Salário ÷ 12) × meses trabalhados no ano
            </li>
            <li>
              <strong>Mínimo de 15 dias:</strong> Trabalhar pelo menos 15 dias no mês já garante o direito proporcional
            </li>
            <li>
              <strong>Primeira Parcela:</strong> Até 50% do valor, paga entre fevereiro e novembro
            </li>
            <li>
              <strong>Segunda Parcela:</strong> Saldo restante, pago até 20 de dezembro
            </li>
            <li>
              <strong>Antecipação:</strong> Pode ser solicitada junto com as férias</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            📅 Prazos e Pagamentos 2025
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
            <strong>Cronograma de Pagamentos 2025:</strong><br /><br />
            • <strong>1ª Parcela do 13º:</strong> Entre 1º de fevereiro e 30 de novembro<br />
            • <strong>2ª Parcela do 13º:</strong> Até 20 de dezembro<br />
            • <strong>Férias:</strong> Pagamento até 2 dias antes do início<br />
            • <strong>Abono Pecuniário:</strong> Junto com as férias<br />
            • <strong>Salário Mínimo 2025:</strong> R$ 1.518,00
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🔢 Fórmulas de Cálculo Detalhadas
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
            <strong>Cálculos de Férias:</strong><br /><br />
            • <strong>Férias Integrais:</strong> Salário completo<br />
            • <strong>Férias Proporcionais:</strong> (Salário ÷ 12) × meses trabalhados<br />
            • <strong>1/3 das Férias:</strong> Valor das férias ÷ 3<br />
            • <strong>Abono Pecuniário:</strong> (Salário ÷ 30) × dias vendidos + 1/3<br /><br />
            <strong>Cálculos do 13º Salário:</strong><br /><br />
            • <strong>13º Proporcional:</strong> (Salário ÷ 12) × meses trabalhados<br />
            • <strong>1ª Parcela:</strong> 50% do valor total (sem descontos)<br />
            • <strong>2ª Parcela:</strong> Saldo restante (com INSS e IRRF)
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🏦 Descontos e Encargos
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Sobre as férias e 13º salário incidem alguns descontos conforme a legislação vigente:
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
            <li><strong>INSS 2025:</strong> 7,5% até R$ 1.518; 9% até R$ 2.862; 12% até R$ 4.296; 14% até R$ 8.349 (teto: R$ 945,94)</li>
            <li><strong>IRRF:</strong> Incide sobre o valor bruto menos INSS, conforme tabela progressiva</li>
            <li><strong>Férias:</strong> INSS e IRRF sobre valor das férias + 1/3</li>
            <li><strong>13º Salário:</strong> INSS e IRRF apenas na 2ª parcela</li>
            <li><strong>Abono Pecuniário:</strong> Isento de INSS e IRRF</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            ⚖️ Férias Fracionadas - Reforma Trabalhista
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            A Reforma Trabalhista de 2017 permitiu o fracionamento das férias em até 3 períodos, desde que haja concordância entre empregado e empregador:
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
            <li><strong>1º Período:</strong> Mínimo de 14 dias corridos</li>
            <li><strong>2º e 3º Períodos:</strong> Mínimo de 5 dias corridos cada</li>
            <li><strong>Restrição:</strong> Não pode iniciar 2 dias antes de feriado ou domingo</li>
            <li><strong>Menores de 18 anos:</strong> Férias devem ser gozadas em período único</li>
            <li><strong>Estudantes:</strong> Férias devem coincidir com as férias escolares</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            📋 Impacto das Faltas no Período de Férias
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
            <strong>Redução de Férias por Faltas Injustificadas:</strong><br /><br />
            • <strong>Até 5 faltas:</strong> 30 dias de férias<br />
            • <strong>6 a 14 faltas:</strong> 24 dias de férias<br />
            • <strong>15 a 23 faltas:</strong> 18 dias de férias<br />
            • <strong>24 a 32 faltas:</strong> 12 dias de férias<br />
            • <strong>Mais de 32 faltas:</strong> Perde o direito às férias
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            🎯 Exemplos Práticos de Cálculo
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
            <strong>Exemplo 1 - Férias Integrais:</strong><br />
            Salário: R$ 3.000,00 | Trabalhou 12 meses<br />
            • Férias: R$ 3.000,00<br />
            • 1/3 Constitucional: R$ 1.000,00<br />
            • Total Bruto: R$ 4.000,00<br /><br />
            
            <strong>Exemplo 2 - 13º Proporcional:</strong><br />
            Salário: R$ 2.500,00 | Trabalhou 8 meses<br />
            • 13º Proporcional: (R$ 2.500 ÷ 12) × 8 = R$ 1.666,67<br /><br />
            
            <strong>Exemplo 3 - Abono Pecuniário:</strong><br />
            Salário: R$ 3.000,00 | Venda de 10 dias<br />
            • Valor base: (R$ 3.000 ÷ 30) × 10 = R$ 1.000,00<br />
            • 1/3 sobre o abono: R$ 333,33<br />
            • Total do abono: R$ 1.333,33 (isento de INSS/IRRF)
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            ❓ Dúvidas Frequentes
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
            <li><strong>Posso receber 13º e férias juntos?</strong> Sim, é possível solicitar a antecipação da 1ª parcela do 13º junto com as férias.</li>
            <li><strong>Como funciona para quem trabalhou menos de 1 ano?</strong> O cálculo é proporcional aos meses trabalhados (mínimo 15 dias no mês).</li>
            <li><strong>Férias vencidas prescrevem?</strong> Sim, o direito às férias prescreve em 5 anos após o término do contrato ou 2 anos após o fim do período concessivo.</li>
            <li><strong>Posso ser obrigado a tirar férias?</strong> Sim, o empregador pode determinar o período de férias, respeitando as regras legais.</li>
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Nossa calculadora oferece estimativas baseadas na legislação trabalhista brasileira atual. Para casos específicos ou dúvidas complexas, consulte sempre um profissional especializado em direito trabalhista ou contabilidade.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
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
            ou o{" "}
            <Link
              href="https://www.tst.jus.br/"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Tribunal Superior do Trabalho
            </Link>
            .
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Direitos Garantidos por Lei
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
            >
              As férias e o 13º salário são direitos constitucionais e trabalhistas invioláveis:
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
                <strong>Férias anuais remuneradas:</strong> Garantidas pelo artigo 7º, XVII da Constituição Federal e regulamentadas pelos artigos 129 a 153 da CLT.
              </li>
              <li>
                <strong>13º salário:</strong> Criado pela Lei 4.090/1962 e regulamentado pela Lei 4.749/1965, é um direito adquirido de todos os trabalhadores CLT.
              </li>
              <li>
                <strong>Pagamento obrigatório:</strong> O empregador é obrigado por lei a pagar esses valores nos prazos estabelecidos, sob pena de multa e juros.
              </li>
              <li>
                <strong>Irrenunciabilidade:</strong> O trabalhador não pode abrir mão desses direitos, mesmo que queira.
              </li>
              <li>
                <strong>Proporcionalidade:</strong> Mesmo em contratos curtos, o trabalhador tem direito aos valores proporcionais ao tempo trabalhado.
              </li>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, textAlign: { xs: "justify", sm: "left" } }}
            >
              Conhecer seus direitos é fundamental. Em caso de dúvidas ou irregularidades, procure sempre orientação de um advogado trabalhista ou do sindicato de sua categoria profissional.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;