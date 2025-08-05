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
      case "clt":
        return theme.palette.success.dark;
      case "pj":
        return theme.palette.info.main;
      case "mei":
        return theme.palette.warning.main;
      case "beneficios":
        return theme.palette.secondary.dark;
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
              Guia Completo sobre Salário Líquido 2025 - CLT, PJ e MEI
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O <strong>salário líquido</strong> é o valor que efetivamente chega na sua conta após todos os descontos obrigatórios e benefícios. Em 2025, com as atualizações nas tabelas do INSS e Imposto de Renda, entender como calcular seu salário líquido tornou-se essencial para o planejamento financeiro pessoal e comparação entre diferentes regimes de trabalho.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>O que é salário líquido?</strong> É o valor final que o trabalhador recebe após descontados INSS, Imposto de Renda, contribuições sindicais, planos de saúde e outros descontos, somados aos benefícios como vale-transporte e vale-refeição quando aplicáveis.
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
            <strong>Principais Descontos em 2025:</strong><br />
            • INSS: 7,5% a 14% (conforme faixa salarial)<br />
            • IRPF: 0% a 27,5% (sobre base de cálculo)<br />
            • Vale-transporte: máximo 6% do salário bruto<br />
            • Planos de saúde e outros benefícios contratuais
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            CLT vs PJ vs MEI: Qual Regime Compensa Mais?
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>A escolha do regime de trabalho impacta diretamente no valor líquido recebido.</strong> Cada modalidade possui suas vantagens e desvantagens, sendo essencial analisar não apenas o valor líquido, mas também os benefícios, segurança jurídica e custos envolvidos.
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
              <strong style={{ color: getTypeColor("clt") }}>
                CLT (Carteira Assinada):
              </strong>{" "}
              Maior segurança jurídica com direitos trabalhistas garantidos (férias, 13º salário, FGTS, seguro-desemprego). Descontos: INSS (7,5% a 14%) + IRPF (0% a 27,5%) + contribuições.
            </li>
            <li>
              <strong style={{ color: getTypeColor("pj") }}>
                Pessoa Jurídica (PJ):
              </strong>{" "}
              Maior valor líquido potencial, mas sem benefícios trabalhistas. Tributação via Simples Nacional: Anexo III (6% a 33%) ou Anexo V (15,5% a 30,5%) + pró-labore com INSS.
            </li>
            <li>
              <strong style={{ color: getTypeColor("mei") }}>
                MEI (Microempreendedor):
              </strong>{" "}
              Tributação fixa mensal (~R$ 70/mês), mas limitado a R$ 6.750/mês e R$ 81.000/ano. Ideal para prestadores de serviço com faturamento baixo.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Tabelas de Desconto INSS e IRPF 2025
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            As tabelas do INSS e Imposto de Renda são atualizadas anualmente. Entenda como funcionam:
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
            <strong>TABELA INSS 2025 (Progressiva):</strong><br /><br />
            • Até R$ 1.518,00: 7,5%<br />
            • De R$ 1.518,01 a R$ 2.571,29: 9%<br />
            • De R$ 2.571,30 a R$ 4.285,03: 12%<br />
            • De R$ 4.285,04 a R$ 8.569,90: 14%<br />
            • Teto máximo de contribuição: R$ 1.199,88<br /><br />
            
            <strong>TABELA IRPF 2025 (Progressiva):</strong><br /><br />
            • Até R$ 2.259,20: Isento<br />
            • De R$ 2.259,21 a R$ 2.826,65: 7,5%<br />
            • De R$ 2.826,66 a R$ 3.751,05: 15%<br />
            • De R$ 3.751,06 a R$ 4.664,68: 22,5%<br />
            • Acima de R$ 4.664,68: 27,5%<br />
            • Dedução por dependente: R$ 189,59
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Benefícios que Impactam o Salário Líquido
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Os benefícios corporativos podem aumentar significativamente o valor líquido recebido pelo trabalhador:
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
              <strong style={{ color: getTypeColor("beneficios") }}>
                Vale-Transporte:
              </strong>{" "}
              Desconto máximo de 6% do salário bruto. Valores acima deste percentual são subsidiados pela empresa. Benefício isento de IR.
            </li>
            <li>
              <strong style={{ color: getTypeColor("beneficios") }}>
                Vale-Refeição/Alimentação:
              </strong>{" "}
              Desconto máximo de 20% do benefício concedido. Isento de IR quando dentro dos limites legais (R$ 2.000/mês em 2025).
            </li>
            <li>
              <strong style={{ color: getTypeColor("beneficios") }}>
                Plano de Saúde:
              </strong>{" "}
              Desconto integral do valor da mensalidade. Benefício isento de IR. Reduz a base de cálculo do IRPF.
            </li>
            <li>
              <strong style={{ color: getTypeColor("beneficios") }}>
                Previdência Privada:
              </strong>{" "}
              Contribuições até 12% da renda bruta são dedutíveis do IRPF, reduzindo a base de cálculo do imposto.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Comparação Prática: Mesmo Valor Bruto, Regimes Diferentes
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Veja como o mesmo valor bruto resulta em líquidos diferentes conforme o regime:
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
            <strong>Exemplo - Valor Bruto: R$ 5.000/mês</strong><br /><br />
            
            <strong>CLT:</strong><br />
            • Salário Bruto: R$ 5.000,00<br />
            • INSS (12%): -R$ 514,20<br />
            • IRPF (7,5%): -R$ 112,43<br />
            • VT (6%): -R$ 300,00<br />
            • VR: +R$ 600,00<br />
            • <strong>Líquido: R$ 4.673,37</strong><br /><br />
            
            <strong>PJ (Anexo III - 6%):</strong><br />
            • Faturamento: R$ 5.000,00<br />
            • Simples Nacional: -R$ 300,00<br />
            • Pró-labore INSS (28%): -R$ 194,00<br />
            • Contabilidade: -R$ 200,00<br />
            • <strong>Líquido: R$ 4.306,00</strong><br /><br />
            
            <strong>MEI:</strong><br />
            • Faturamento: R$ 5.000,00<br />
            • DAS MEI: -R$ 70,00<br />
            • <strong>Líquido: R$ 4.930,00</strong><br />
            • ⚠️ <em>Limitado a R$ 6.750/mês</em>
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Estratégias para Maximizar o Salário Líquido
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
            <li><strong>Otimize os Dependentes IR:</strong> Cada dependente deduz R$ 189,59 mensais da base do IRPF</li>
            <li><strong>Use Previdência Privada:</strong> Até 12% do salário bruto deduzível do IR</li>
            <li><strong>Negocie Benefícios:</strong> Vale-alimentação e plano de saúde são isentos de IR</li>
            <li><strong>Analise o Regime PJ:</strong> Para salários altos, PJ pode ser mais vantajoso</li>
            <li><strong>Considere MEI:</strong> Para faturamentos baixos, MEI oferece menor tributação</li>
            <li><strong>Planeje Pensão Alimentícia:</strong> Valor é dedutível da base do IRPF</li>
            <li><strong>Monitore Mudanças:</strong> Tabelas são atualizadas anualmente</li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Quando Vale a Pena Mudar de Regime
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
            <li><strong>CLT para PJ:</strong> Geralmente vantajoso acima de R$ 8.000 brutos, considerando os benefícios perdidos</li>
            <li><strong>PJ para MEI:</strong> Quando o faturamento é inferior a R$ 6.750/mês e não há necessidade de funcionários</li>
            <li><strong>MEI para PJ:</strong> Quando ultrapassar R$ 81.000/ano ou precisar contratar funcionários</li>
            <li><strong>Considere sempre:</strong> Custos com contador, plano de saúde próprio, provisões para férias e 13º</li>
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Nossa calculadora utiliza as tabelas oficiais de 2025 e considera todos os benefícios e descontos legais. Para decisões importantes sobre mudança de regime, sempre consulte um contador qualificado.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para informações oficiais sobre tributação, consulte a{" "}
            <Link
              href="https://www.gov.br/receitafederal/pt-br"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Receita Federal
            </Link>{" "}
            e o{" "}
            <Link
              href="https://www.gov.br/inss/pt-br"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              INSS
            </Link>
            .
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Perguntas Frequentes sobre Salário Líquido
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
            >
              Esclareça as principais dúvidas sobre cálculo de salário líquido:
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
                <strong>Por que meu salário líquido varia todo mês?</strong> Horas extras, faltas, adicionais noturnos e mudanças nos benefícios alteram o cálculo mensal.
              </li>
              <li>
                <strong>Vale-transporte desconta do salário?</strong> Sim, até 6% do salário bruto. Se o VT custar mais, a empresa paga a diferença.
              </li>
              <li>
                <strong>Plano de saúde é descontado antes do IR?</strong> Sim, reduz a base de cálculo do IRPF, resultando em menor imposto.
              </li>
              <li>
                <strong>PJ sempre ganha mais que CLT?</strong> Não necessariamente. Depende do valor, benefícios perdidos e custos adicionais do PJ.
              </li>
              <li>
                <strong>MEI pode receber mais de R$ 6.750/mês?</strong> Não. Ultrapassar este limite exige migração para outro regime tributário.
              </li>
              <li>
                <strong>Como calcular o 13º salário líquido?</strong> Aplica-se os mesmos descontos proporcionais sobre o valor do 13º salário.
              </li>
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, ...mobileTextStyle }}
            >
              O cálculo correto do salário líquido é fundamental para o planejamento financeiro pessoal. Nossa calculadora considera todas as variáveis legais e fornece simulações precisas para auxiliar na tomada de decisões sobre regime de trabalho.
            </Typography>
          </Paper>
        </Box>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Dicas de Planejamento Financeiro com Base no Salário Líquido
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f0f8ff" }}>
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
              <li><strong>Regra 50-30-20:</strong> 50% gastos essenciais, 30% gastos pessoais, 20% investimentos/reserva</li>
              <li><strong>Reserva de Emergência:</strong> 6 a 12 meses do salário líquido em aplicações de alta liquidez</li>
              <li><strong>Investimentos:</strong> Considere o perfil de risco e horizonte temporal com base na estabilidade do regime</li>
              <li><strong>Planejamento Tributário:</strong> Use benefícios fiscais para otimizar o desconto de IR</li>
              <li><strong>Educação Financeira:</strong> Entenda todos os componentes do seu contracheque</li>
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;