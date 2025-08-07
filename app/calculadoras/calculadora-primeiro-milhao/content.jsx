"use client";

import {
  Box,
  Typography,
  Stack,
  Paper,
  Divider,
  useTheme,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const Content = () => {
  const theme = useTheme();

  return (
    <Box mt={4} mx="auto" maxWidth="md">
      <Stack spacing={4}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa" }}>
          <Box display="flex" alignItems="center" mb={1}>
            <EmojiEventsIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Como Alcançar o Primeiro Milhão: Estratégias e Planejamento Financeiro
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Conquistar o <strong>primeiro milhão</strong> é um marco fundamental na jornada rumo à 
            <strong> independência financeira</strong>. Para muitos brasileiros, esse objetivo representa 
            a porta de entrada para a <strong>liberdade financeira</strong> e a possibilidade de viver 
            dos rendimentos dos investimentos. Nossa <strong>calculadora do primeiro milhão</strong> foi 
            desenvolvida para auxiliar você a entender exatamente quanto tempo e qual 
            <strong> aporte mensal</strong> são necessários para atingir essa meta tão desejada.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            <strong>Por que R$ 1 milhão é uma meta importante?</strong> Com esse valor aplicado em 
            investimentos conservadores que rendem cerca de 10% ao ano, é possível gerar uma renda 
            passiva de aproximadamente R$ 8.300 por mês. Isso representa uma base sólida para 
            <strong> aposentadoria antecipada</strong> ou para ter mais liberdade nas escolhas 
            profissionais e pessoais.
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 2 }}
          >
            Estratégias Eficazes para Conquistar o Primeiro Milhão
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
              <strong>Comece Cedo:</strong> O tempo é seu maior aliado. Começar aos 25 anos em vez 
              dos 35 pode reduzir pela metade o aporte mensal necessário.
            </li>
            <li>
              <strong>Consistência nos Aportes:</strong> Investir uma quantia fixa mensalmente, 
              independente das oscilações do mercado, potencializa o crescimento patrimonial.
            </li>
            <li>
              <strong>Escolha de Investimentos Adequados:</strong> Diversifique entre renda fixa 
              e variável, considerando seu perfil de risco e prazo para a meta.
            </li>
            <li>
              <strong>Reinvestimento dos Rendimentos:</strong> Deixe os juros trabalharem a seu favor, 
              reinvestindo todos os dividendos e rendimentos recebidos.
            </li>
            <li>
              <strong>Aumente os Aportes Gradualmente:</strong> Conforme sua renda crescer, 
              direcione parte desse aumento para os investimentos.
            </li>
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Os <strong>melhores investimentos para o primeiro milhão</strong> incluem uma 
            combinação de <strong>ações</strong>, <strong>fundos imobiliários (FIIs)</strong>, 
            <strong>Tesouro Direto</strong>, <strong>CDBs</strong> e <strong>LCI/LCA</strong>. 
            A diversificação é essencial para equilibrar risco e retorno, especialmente em 
            investimentos de longo prazo como este.
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            É importante também considerar a <strong>inflação</strong> em seus cálculos. 
            O milhão de hoje não terá o mesmo poder de compra daqui a 10 ou 20 anos. 
            Por isso, muitos especialistas recomendam ajustar a meta para valores superiores 
            ou focar em ativos que ofereçam proteção contra a inflação.
          </Typography>
        </Paper>

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            <TrendingUpIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            Exemplos Práticos: Cenários para o Primeiro Milhão
          </Typography>

          <Paper elevation={2} sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
            >
              Vamos analisar <strong>cenários reais</strong> de como diferentes perfis de investidores 
              podem atingir o primeiro milhão:
            </Typography>

            <Stack spacing={2}>
              <Paper elevation={1} sx={{ p: 2, backgroundColor: "#e8f5e8" }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  📊 Cenário 1: Jovem Profissional (25 anos)
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6, textAlign: { xs: "justify", sm: "left" } }}>
                  <strong>Meta:</strong> Primeiro milhão aos 45 anos (20 anos de investimento)<br/>
                  <strong>Rentabilidade esperada:</strong> 10% ao ano<br/>
                  <strong>Aporte mensal necessário:</strong> Aproximadamente R$ 1.500<br/>
                  <strong>Total investido:</strong> R$ 360.000 | <strong>Rendimentos:</strong> R$ 640.000
                </Typography>
              </Paper>

              <Paper elevation={1} sx={{ p: 2, backgroundColor: "#fff3e0" }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  📊 Cenário 2: Profissional Experiente (35 anos)
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6, textAlign: { xs: "justify", sm: "left" } }}>
                  <strong>Meta:</strong> Primeiro milhão aos 50 anos (15 anos de investimento)<br/>
                  <strong>Rentabilidade esperada:</strong> 10% ao ano<br/>
                  <strong>Aporte mensal necessário:</strong> Aproximadamente R$ 2.400<br/>
                  <strong>Total investido:</strong> R$ 432.000 | <strong>Rendimentos:</strong> R$ 568.000
                </Typography>
              </Paper>

              <Paper elevation={1} sx={{ p: 2, backgroundColor: "#f3e5f5" }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  📊 Cenário 3: Investidor com Capital Inicial (qualquer idade)
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6, textAlign: { xs: "justify", sm: "left" } }}>
                  <strong>Capital inicial:</strong> R$ 100.000<br/>
                  <strong>Rentabilidade esperada:</strong> 10% ao ano<br/>
                  <strong>Aporte mensal:</strong> R$ 1.000<br/>
                  <strong>Tempo necessário:</strong> Aproximadamente 12 anos
                </Typography>
              </Paper>
            </Stack>
          </Paper>

          <Divider sx={{ my: 2 }} />

          <Paper
            elevation={1}
            sx={{
              p: 2,
              backgroundColor: "#e3f2fd",
              borderLeft: "4px solid #1976d2",
            }}
          >
            <Typography
              variant="body2"
              fontWeight="bold"
              gutterBottom
              sx={{ lineHeight: 1.6, marginBottom: 1, textAlign: { xs: "justify", sm: "left" } }}
            >
              💡 Dicas Importantes para Acelerar sua Jornada:
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.6, textAlign: { xs: "justify", sm: "left" } }}
            >
              <strong>1. Renda Extra:</strong> Utilize freelances, vendas ou trabalhos extras para 
              aumentar seus aportes mensais.<br/>
              <strong>2. Redução de Gastos:</strong> Corte despesas desnecessárias e direcione 
              essa economia para investimentos.<br/>
              <strong>3. Educação Financeira:</strong> Invista em conhecimento para tomar melhores 
              decisões de investimento.<br/>
              <strong>4. Acompanhamento Regular:</strong> Revise sua estratégia anualmente e 
              ajuste conforme necessário.<br/>
              <strong>5. Paciência e Disciplina:</strong> Não se deixe levar por emoções do mercado. 
              Mantenha o foco na meta de longo prazo.
            </Typography>
          </Paper>
        </Box>

        <Paper elevation={0} sx={{ p: 3, backgroundColor: "#f0f7ff" }}>
          <Box display="flex" alignItems="center" mb={1}>
            <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Fatores que Influenciam sua Jornada ao Primeiro Milhão
            </Typography>
          </Box>

          <Typography
            variant="body2"
            gutterBottom
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Diversos fatores podem acelerar ou retardar sua jornada rumo ao <strong>primeiro milhão</strong>:
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
              <strong>Taxa de Rentabilidade:</strong> Cada 1% a mais na rentabilidade anual 
              pode reduzir significativamente o tempo necessário.
            </li>
            <li>
              <strong>Frequência dos Aportes:</strong> Aportes semanais ou quinzenais podem 
              ser mais eficientes que mensais em alguns casos.
            </li>
            <li>
              <strong>Impostos:</strong> Considere investimentos com isenção ou menor tributação, 
              como LCI/LCA para pessoas físicas.
            </li>
            <li>
              <strong>Custos e Taxas:</strong> Escolha corretoras e fundos com baixas taxas de 
              administração para maximizar seus rendimentos.
            </li>
            <li>
              <strong>Cenário Econômico:</strong> Inflação, taxa Selic e condições do mercado 
              influenciam diretamente seus resultados.
            </li>
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, marginBottom: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            Lembre-se: o <strong>primeiro milhão é apenas o começo</strong>. Uma vez atingido esse 
            marco, o segundo milhão tende a vir mais rapidamente devido ao efeito dos juros compostos. 
            Use nossa calculadora para simular diferentes cenários e encontrar a estratégia que 
            melhor se adequa ao seu perfil e objetivos financeiros!
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};

export default Content;