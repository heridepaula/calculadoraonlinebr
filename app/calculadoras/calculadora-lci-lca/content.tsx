"use client";

import React from "react";
import {
  Box,
  Typography,
  Paper,
} from "@mui/material";
import {
  TrendingUp,
  AccountBalance,
  Calculate,
  InfoOutlined,
} from "@mui/icons-material";
import { componentStyles } from "@/src/styles/components";

const LciLcaContent: React.FC = () => {
  return (
    <Box mt={4} mx="auto" maxWidth="md">
      {/* Introdução */}
      <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa", mb: 3 }}>
        <Box display="flex" alignItems="center" mb={1}>
          <InfoOutlined sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" fontWeight="bold">
            LCI e LCA: Guia Completo dos Investimentos Isentos de IR
          </Typography>
        </Box>
        <Typography variant="body2" paragraph>
          Descubra como investir em Letra de Crédito Imobiliário (LCI) e Letra de Crédito do Agronegócio (LCA) 
          e aproveite a isenção de Imposto de Renda para pessoas físicas.
        </Typography>
      </Paper>

      {/* O que são LCI e LCA */}
      <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa", mb: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <AccountBalance sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" fontWeight="bold">
            O que são LCI e LCA?
          </Typography>
        </Box>
        
        <Typography variant="body2" paragraph>
          <strong>LCI - Letra de Crédito Imobiliário:</strong> Título de renda fixa emitido por bancos para captar recursos destinados ao 
          financiamento do setor imobiliário. Os recursos captados são direcionados para 
          financiamentos habitacionais e comerciais.
        </Typography>
        
        <Typography variant="body2" paragraph>
          <strong>LCA - Letra de Crédito do Agronegócio:</strong> Título similar à LCI, mas os recursos captados são direcionados para o 
          financiamento do setor do agronegócio, incluindo produção, comercialização e 
          beneficiamento de produtos rurais.
        </Typography>
      </Paper>

      {/* Vantagens */}
      <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa", mb: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <TrendingUp sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" fontWeight="bold">
            Principais Vantagens das LCI e LCA
          </Typography>
        </Box>

        <Typography variant="body2" paragraph>
          <strong>✓ Isenção de Imposto de Renda:</strong> Para pessoas físicas, não há incidência de IR sobre os rendimentos
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>✓ Garantia do FGC:</strong> Cobertura de até R$ 250.000 por CPF e por instituição financeira
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>✓ Rentabilidade Atrativa:</strong> Geralmente oferecem taxas superiores à poupança e CDB
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>✓ Baixo Risco:</strong> Classificados como investimentos de baixo risco
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>✓ Contribuição Social:</strong> Investe em setores importantes da economia brasileira
        </Typography>
      </Paper>

      {/* Como Funcionam */}
      <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa", mb: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <AccountBalance sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" fontWeight="bold">
            Como Funcionam LCI e LCA?
          </Typography>
        </Box>

        <Typography variant="body2" paragraph>
          <strong>1. Emissão:</strong> Bancos emitem os títulos para captar recursos específicos para 
          financiamento imobiliário ou agronegócio.
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>2. Investimento:</strong> Você aplica seu dinheiro no título, emprestando recursos para o banco 
          com taxa e prazo definidos.
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>3. Resgate:</strong> No vencimento, você recebe o valor investido mais os rendimentos, 
          isentos de IR para pessoa física.
        </Typography>
      </Paper>

      {/* Tipos de Rendimento */}
      <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa", mb: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <TrendingUp sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" fontWeight="bold">
            Tipos de Rendimento
          </Typography>
        </Box>

        <Typography variant="body2" paragraph>
          <strong>Pós-fixado (% do CDI):</strong> O rendimento varia conforme a taxa CDI. Exemplo: 95% do CDI significa que 
          você receberá 95% da variação do CDI no período. Ideal quando espera-se alta da taxa Selic/CDI.
        </Typography>
        
        <Typography variant="body2" paragraph>
          <strong>Pré-fixado (% ao ano):</strong> A taxa é definida no momento da aplicação e não muda durante todo o período. 
          Exemplo: 12% ao ano. Ideal quando espera-se queda da taxa Selic/CDI.
        </Typography>
      </Paper>

      {/* Perguntas Frequentes */}
      <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa", mb: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <InfoOutlined sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" fontWeight="bold">
            Perguntas Frequentes
          </Typography>
        </Box>

        <Typography variant="body2" paragraph>
          <strong>Qual o prazo mínimo?</strong> Por lei, o prazo mínimo é de 90 dias para LCI e LCA. Muitas instituições 
          oferecem prazos maiores (180 dias, 360 dias, 2 anos+). Quanto maior o prazo, melhor a taxa.
        </Typography>

        <Typography variant="body2" paragraph>
          <strong>Valor mínimo para investir?</strong> Varia conforme a instituição, desde R$ 1.000 até R$ 30.000 ou mais. 
          Consulte as condições específicas de cada banco ou corretora.
        </Typography>

        <Typography variant="body2" paragraph>
          <strong>Posso resgatar antes?</strong> Geralmente não permitem resgate antecipado. O dinheiro fica "travado" 
          até o vencimento. Invista apenas recursos que não precisará no período.
        </Typography>

        <Typography variant="body2" paragraph>
          <strong>São melhores que a poupança?</strong> Sim, na maioria dos casos. A poupança rende 70% da Selic (quando acima de 8,5% a.a.). 
          LCI e LCA geralmente oferecem taxas superiores e também são isentas de IR.
        </Typography>
      </Paper>

      {/* Como usar a calculadora */}
      <Paper elevation={0} sx={{ p: 3, backgroundColor: "#fafafa" }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Calculate sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" fontWeight="bold">
            Como Usar Nossa Calculadora
          </Typography>
        </Box>

        <Typography variant="body2" paragraph>
          Nossa calculadora de LCI e LCA foi desenvolvida para simular seus investimentos de forma simples e precisa:
        </Typography>

        <Typography variant="body2" paragraph>
          <strong>• Escolha o tipo de rendimento:</strong> Pós-fixado (% do CDI) ou pré-fixado (% ao ano)
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>• Informe os valores:</strong> Valor inicial e/ou investimento mensal recorrente
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>• Defina o período:</strong> Em meses ou anos, conforme seu planejamento
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>• Configure a taxa:</strong> Percentual do CDI ou taxa pré-fixada oferecida
        </Typography>

        <Typography variant="body2" sx={{ mt: 2, p: 2, backgroundColor: "#e8f5e8", borderRadius: 1 }}>
          <strong>✓ Resultado Completo:</strong> A calculadora mostra o valor final, rendimento total, 
          rentabilidade e rendimento médio mensal, considerando a isenção de IR.
        </Typography>
      </Paper>
    </Box>
  );
};

export default LciLcaContent;