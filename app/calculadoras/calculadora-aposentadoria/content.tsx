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

  const mobileTextStyle = {
    textAlign: { xs: "justify", sm: "left" },
  };

  const getRuleColor = (rule: string) => {
    switch (rule) {
      case "general":
        return theme.palette.primary.dark;
      case "points":
        return theme.palette.success.dark;
      case "transition":
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
              Guia Completo da Aposentadoria INSS e Previdência Privada 2025
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            A <strong>aposentadoria no Brasil</strong> passou por mudanças significativas com a Reforma da Previdência (EC 103/2019). Hoje, é fundamental entender as novas regras do INSS e avaliar a importância da previdência privada complementar para garantir uma aposentadoria tranquila e com renda adequada.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            <strong>Por que planejar a aposentadoria?</strong> Com o aumento da expectativa de vida e as mudanças nas regras previdenciárias, o benefício do INSS pode não ser suficiente para manter o padrão de vida. A previdência privada surge como complemento essencial para uma aposentadoria mais confortável.
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
            <strong>Dados Importantes 2025:</strong><br />
            🏛️ Teto INSS: R$ 8.157,41<br />
            📊 Pontos necessários: 92 (mulheres) / 102 (homens)<br />
            ⏰ Idade mínima: 62 (mulheres) / 65 (homens)
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Regras de Aposentadoria INSS 2025
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            A Reforma da Previdência criou diferentes regras que coexistem. Veja as principais opções disponíveis:
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
              <strong style={{ color: getRuleColor("general") }}>
                Regra Geral (Pós-Reforma):
              </strong>{" "}
              Mulheres: 62 anos de idade + 15 anos de contribuição | Homens: 65 anos + 20 anos de contribuição. É a regra definitiva para quem começou a contribuir após 2019.
            </li>
            <li>
              <strong style={{ color: getRuleColor("points") }}>
                Aposentadoria por Pontos:
              </strong>{" "}
              Em 2025: 92 pontos (mulheres) e 102 pontos (homens). A pontuação é a soma da idade + tempo de contribuição. Exige 30 anos (mulheres) ou 35 anos (homens) de contribuição.
            </li>
            <li>
              <strong style={{ color: getRuleColor("transition") }}>
                Idade Progressiva:
              </strong>{" "}
              Idade mínima aumenta 6 meses por ano até atingir 62 (mulheres) e 65 (homens). Em 2025: 59 anos (mulheres) e 64 anos (homens) + 30/35 anos de contribuição.
            </li>
            <li>
              <strong style={{ color: getRuleColor("transition") }}>
                Regra de Transição 50%:
              </strong>{" "}
              Para quem estava próximo da aposentadoria em 2019. Adiciona 50% do tempo que faltava em novembro/2019 + 28 anos (mulheres) ou 33 anos (homens) de contribuição.
            </li>
            <li>
              <strong style={{ color: getRuleColor("transition") }}>
                Regra de Transição 100%:
              </strong>{" "}
              Adiciona 100% do tempo que faltava + idade mínima de 57 (mulheres) ou 60 (homens) + 28/33 anos de contribuição.
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Como é Calculado o Benefício do INSS
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O valor do benefício do INSS é calculado com base na média de todos os salários de contribuição desde julho de 1994:
          </Typography>

          <Box
            p={2}
            bgcolor="#e8f5e8"
            borderRadius={2}
            mb={2}
            border={`2px solid ${theme.palette.success.main}`}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, color: theme.palette.success.dark }}>
              🧮 Fórmula do Cálculo INSS
            </Typography>
            <Typography
              variant="body2"
              component="ul"
              sx={{ listStyleType: "disc", pl: 2, lineHeight: 1.6, mb: 0 }}
            >
              <li><strong>Base:</strong> 60% da média de todos os salários de contribuição</li>
              <li><strong>Acréscimo:</strong> +2% para cada ano que exceder 15 anos (mulheres) ou 20 anos (homens)</li>
              <li><strong>Máximo:</strong> 100% da média (limitado ao teto do INSS)</li>
              <li><strong>Mínimo:</strong> 1 salário mínimo (R$ 1.518 em 2025)</li>
            </Typography>
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Limitações do INSS e Importância da Previdência Privada
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            O INSS possui limitações importantes que tornam a previdência privada essencial para uma aposentadoria adequada:
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
              <strong>Teto limitado:</strong> O benefício máximo do INSS é de R$ 8.157,41 (2025), insuficiente para quem tem renda superior
            </li>
            <li>
              <strong>Taxa de reposição baixa:</strong> Para salários altos, o INSS repõe apenas 30-40% da renda
            </li>
            <li>
              <strong>Pressão demográfica:</strong> Aumento de aposentados vs contribuintes pressiona o sistema público
            </li>
            <li>
              <strong>Inflação e poder de compra:</strong> Benefícios reajustados apenas pela inflação, sem ganho real
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Previdência Privada: PGBL vs VGBL
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            A previdência privada complementa o INSS e oferece vantagens fiscais. Conheça os dois tipos principais:
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
            <strong>Comparativo PGBL vs VGBL:</strong><br /><br />
            • <strong>PGBL (Plano Gerador de Benefício Livre):</strong><br />
            &nbsp;&nbsp;- Dedução de até 12% da renda bruta anual no IR<br />
            &nbsp;&nbsp;- IR sobre valor total no resgate<br />
            &nbsp;&nbsp;- Ideal: declaração completa + contribuinte INSS<br /><br />
            • <strong>VGBL (Vida Gerador de Benefício Livre):</strong><br />
            &nbsp;&nbsp;- Sem dedução no IR<br />
            &nbsp;&nbsp;- IR apenas sobre rendimentos no resgate<br />
            &nbsp;&nbsp;- Ideal: declaração simplificada ou não contribuinte INSS
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Estratégias de Contribuição e Rentabilidade
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para maximizar os benefícios da previdência privada, considere estas estratégias:
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
              <strong>Comece cedo:</strong> Quanto mais tempo, maior o efeito dos juros compostos
            </li>
            <li>
              <strong>Contribuição regular:</strong> Mesmo valores pequenos, com disciplina, geram grandes resultados
            </li>
            <li>
              <strong>Diversificação:</strong> Escolha fundos alinhados ao seu perfil de risco e prazo
            </li>
            <li>
              <strong>Revisão periódica:</strong> Acompanhe performance e ajuste estratégia conforme necessário
            </li>
            <li>
              <strong>Portabilidade:</strong> Use para migrar entre instituições com melhores condições
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Tabela de Contribuição INSS 2025
          </Typography>

          <Box
            p={2}
            bgcolor="#e3f2fd"
            borderRadius={2}
            boxShadow={1}
            mb={2}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, color: theme.palette.primary.dark }}>
              💰 Alíquotas de Contribuição INSS 2025
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              <strong>Empregados (CLT):</strong><br />
              • Até R$ 1.518,00: 7,5%<br />
              • R$ 1.518,01 a R$ 2.571,29: 9%<br />
              • R$ 2.571,30 a R$ 4.190,84: 12%<br />
              • R$ 4.190,85 a R$ 8.157,41: 14%<br /><br />
              <strong>MEI:</strong> 5% sobre salário mínimo (R$ 75,90/mês)<br />
              <strong>Autônomo:</strong> 20% ou 11% (plano simplificado)
            </Typography>
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Simulador Meu INSS e Planejamento
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para um planejamento preciso da sua aposentadoria, utilize as ferramentas oficiais:
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
              <strong>Meu INSS:</strong> App/site oficial com simulador de aposentadoria personalizado
            </li>
            <li>
              <strong>CNIS:</strong> Extrato de contribuições para verificar histórico
            </li>
            <li>
              <strong>Calculadora INSS:</strong> Ferramenta para estimar benefícios futuros
            </li>
            <li>
              <strong>Revisão anual:</strong> Acompanhe mudanças nas regras e ajuste planejamento
            </li>
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Taxa de Reposição Ideal
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para manter o padrão de vida na aposentadoria, especialistas recomendam:
          </Typography>

          <Box
            p={2}
            bgcolor="#fff3e0"
            borderRadius={2}
            boxShadow={1}
            mb={2}
          >
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              <strong>Taxa de Reposição Recomendada:</strong><br />
              🟢 <strong>70% ou mais:</strong> Taxa ideal para manter padrão de vida<br />
              🟡 <strong>50% a 70%:</strong> Taxa moderada, requer ajustes no padrão<br />
              🔴 <strong>Menos de 50%:</strong> Taxa inadequada, aposentadoria comprometida<br /><br />
              <strong>Dica:</strong> INSS sozinho raramente atinge 70% para rendas médias/altas
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Nossa calculadora oferece simulações baseadas nas regras atuais do INSS e permite avaliar o impacto da previdência privada no seu planejamento de aposentadoria. Para decisões definitivas, consulte sempre um consultor financeiro ou previdenciário.
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
          >
            Para informações oficiais sobre aposentadoria, acesse o{" "}
            <Link
              href="https://www.gov.br/inss/pt-br"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              INSS
            </Link>{" "}
            ou o{" "}
            <Link
              href="https://www.gov.br/trabalho-e-previdencia/pt-br"
              target="_blank"
              rel="noopener noreferrer"
              color="#0fa4d5"
            >
              Ministério do Trabalho e Previdência
            </Link>
            .
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Cenários da Reforma da Previdência
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
            >
              A Reforma da Previdência (EC 103/2019) criou diferentes cenários que afetam trabalhadores de formas distintas:
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
                <strong>Quem entrou no mercado após 2019:</strong> Deve seguir obrigatoriamente a regra geral (62/65 anos + 15/20 anos de contribuição).
              </li>
              <li>
                <strong>Quem já contribuía em 2019:</strong> Pode escolher entre diferentes regras de transição, optando pela mais vantajosa.
              </li>
              <li>
                <strong>Servidores públicos:</strong> Têm regras específicas, geralmente mais restritivas que as do RGPS.
              </li>
              <li>
                <strong>Professores:</strong> Mantêm redução de 5 anos na idade mínima (57 mulheres/60 homens) com 25/30 anos de contribuição.
              </li>
              <li>
                <strong>Policiais:</strong> Regras especiais com idades menores e tempos de contribuição específicos.
              </li>
            </Typography>

            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, ...mobileTextStyle }}
            >
              <strong>Impacto da reforma:</strong> A reforma aumentou a idade mínima e o tempo de contribuição, reduzindo o valor médio dos benefícios. Por isso, a previdência privada tornou-se ainda mais importante para complementar a renda na aposentadoria.
            </Typography>
          </Paper>
        </Box>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Planejamento Financeiro para Aposentadoria
          </Typography>
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, ...mobileTextStyle }}
            >
              Um planejamento eficiente de aposentadoria deve considerar múltiplas estratégias:
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
                <strong>Diagnóstico atual:</strong> Avalie seu histórico de contribuições no INSS e estime o benefício futuro.
              </li>
              <li>
                <strong>Definição de meta:</strong> Calcule quanto precisará para manter seu padrão de vida (70% da renda atual é recomendado).
              </li>
              <li>
                <strong>Análise do gap:</strong> Identifique a diferença entre o que o INSS pagará e o que você precisa.
              </li>
              <li>
                <strong>Estratégia de complementação:</strong> Utilize previdência privada, investimentos ou outras fontes de renda.
              </li>
              <li>
                <strong>Revisão periódica:</strong> Ajuste o planejamento conforme mudanças na legislação e na vida pessoal.
              </li>
            </Typography>

            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, ...mobileTextStyle }}
            >
              <strong>Dica importante:</strong> Quanto mais cedo começar a planejar, menor será o esforço mensal necessário. O tempo é o maior aliado na construção de uma aposentadoria confortável através do poder dos juros compostos.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default Content;