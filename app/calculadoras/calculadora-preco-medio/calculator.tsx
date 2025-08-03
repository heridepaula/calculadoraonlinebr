"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Alert,
  Divider,
  Chip,
} from "@mui/material";
import { 
  Calculate, 
  TrendingUp, 
  Add, 
  Delete,
  ShowChart
} from "@mui/icons-material";
import { componentStyles } from "@/src/styles/components";
import CurrencyInput from "@/components/CurrencyInput";
import { useAnalytics } from "@/hooks/useAnalytics";

interface AcaoCompra {
  id: number;
  quantidade: number;
  preco: number;
  valorTotal: number;
  timestamp: Date;
}

interface PrecoMedioResult {
  quantidadeTotal: number;
  valorTotalInvestido: number;
  precoMedio: number;
  compras: AcaoCompra[];
}

const PrecoMedioAcaoCalculator: React.FC = () => {
  const [quantidade, setQuantidade] = useState<string>("0");
  const [preco, setPreco] = useState<string>("0,00");
  const [compras, setCompras] = useState<AcaoCompra[]>([]);
  const [result, setResult] = useState<PrecoMedioResult | null>(null);
  const [error, setError] = useState<string>("");
  const [nextId, setNextId] = useState<number>(1);

  const analytics = useAnalytics();

  const parseQuantidade = (value: string): number => {
    return parseInt(value) || 0;
  };

  const parseCurrency = (value: string): number => {
    return parseFloat(value.replace(/\./g, "").replace(",", ".")) || 0;
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const calcularPrecoMedio = useCallback((comprasLista: AcaoCompra[]): PrecoMedioResult => {
    if (comprasLista.length === 0) {
      return {
        quantidadeTotal: 0,
        valorTotalInvestido: 0,
        precoMedio: 0,
        compras: []
      };
    }

    let quantidadeAcumulada = 0;
    let valorAcumulado = 0;

    comprasLista.forEach((compra) => {
      quantidadeAcumulada += compra.quantidade;
      valorAcumulado += compra.valorTotal;
    });

    return {
      quantidadeTotal: quantidadeAcumulada,
      valorTotalInvestido: valorAcumulado,
      precoMedio: valorAcumulado / quantidadeAcumulada,
      compras: comprasLista
    };
  }, []);

  const adicionarCompra = () => {
    const startTime = performance.now();
    setError("");

    const qtd = parseQuantidade(quantidade);
    const precoNum = parseCurrency(preco);

    if (qtd <= 0) {
      setError("A quantidade deve ser maior que zero.");
      analytics.trackError("preco-medio", "invalid_quantity");
      return;
    }

    if (precoNum <= 0) {
      setError("O preço deve ser maior que zero.");
      analytics.trackError("preco-medio", "invalid_price");
      return;
    }

    const novaCompra: AcaoCompra = {
      id: nextId,
      quantidade: qtd,
      preco: precoNum,
      valorTotal: qtd * precoNum,
      timestamp: new Date()
    };

    const novasCompras = [...compras, novaCompra];
    setCompras(novasCompras);
    setNextId(nextId + 1);

    // Calcular automaticamente
    const resultado = calcularPrecoMedio(novasCompras);
    setResult(resultado);

    // Limpar campos para próxima entrada
    setQuantidade("0");
    setPreco("0,00");

    // Track da adição
    const endTime = performance.now();
    analytics.trackCalculation("preco-medio", {
      quantidade: qtd,
      preco: precoNum,
      valor_total: novaCompra.valorTotal,
      total_compras: novasCompras.length,
      quantidade_total: resultado.quantidadeTotal,
      valor_total_investido: resultado.valorTotalInvestido,
      preco_medio: resultado.precoMedio
    });
    analytics.trackPerformance("preco-medio", endTime - startTime);
  };

  const removerCompra = (id: number) => {
    const novasCompras = compras.filter(compra => compra.id !== id);
    setCompras(novasCompras);

    if (novasCompras.length === 0) {
      setResult(null);
    } else {
      const resultado = calcularPrecoMedio(novasCompras);
      setResult(resultado);
    }

    analytics.trackResultAction("preco-medio", "remove_purchase");
  };

  const limparTudo = () => {
    setCompras([]);
    setResult(null);
    setQuantidade("0");
    setPreco("0,00");
    setError("");
    setNextId(1);
    analytics.trackClear("preco-medio");
  };

  // Track quando resultado é visualizado
  useEffect(() => {
    if (result && result.compras.length > 0) {
      analytics.trackResultView("preco-medio");
    }
  }, [result, analytics]);

  // Recalcular automaticamente quando compras mudam
  useEffect(() => {
    if (compras.length > 0) {
      const resultado = calcularPrecoMedio(compras);
      setResult(resultado);
    }
  }, [compras, calcularPrecoMedio]);

  return (
    <Box sx={componentStyles.page.container}>
      <Paper sx={componentStyles.page.paper}>
        <Box sx={componentStyles.header.container}>
          <Typography variant="h4" sx={componentStyles.header.title}>
            <ShowChart sx={{ mr: 1, verticalAlign: "middle" }} />
            Calculadora de Preço Médio
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={componentStyles.header.description}
          >
            Calcule o preço médio das suas ações automaticamente a cada compra adicionada
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Coluna Esquerda - Formulário e Resultado */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box sx={{ position: 'sticky', top: 20 }}>
              {/* Formulário de Entrada */}
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
                  Adicionar Nova Compra
                </Typography>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Quantidade de Ações"
                      type="number"
                      value={quantidade}
                      onChange={(e) => setQuantidade(e.target.value)}
                      variant="standard"
                      fullWidth
                      inputProps={{ min: 1, step: 1 }}
                      helperText="Número inteiro de ações"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <CurrencyInput
                      label="Preço por Ação (R$)"
                      initialValue={preco}
                      handleChange={setPreco}
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  size="large"
                  onClick={adicionarCompra}
                  fullWidth
                  sx={componentStyles.actions.buttonPrimary}
                  startIcon={<Add />}
                >
                  Adicionar Compra
                </Button>
              </Paper>

              {/* Resultado - Sempre Visível */}
              {result && result.compras.length > 0 && (
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="h6" sx={componentStyles.result.title}>
                    <TrendingUp sx={{ mr: 1, verticalAlign: "middle" }} />
                    Resultado do Preço Médio
                  </Typography>

                  <Box sx={componentStyles.result.valueContainer}>
                    <Typography variant="h6" color="text.secondary">
                      Preço Médio por Ação:
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        ...componentStyles.result.value,
                        color: "primary.main",
                      }}
                    >
                      {formatCurrency(result.precoMedio)}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={componentStyles.result.additionalInfo}>
                    <Box sx={componentStyles.result.additionalInfoItem}>
                      <Typography variant="body2">📊 Total de Ações:</Typography>
                      <Typography
                        variant="body2"
                        sx={componentStyles.result.additionalInfoValue}
                      >
                        {result.quantidadeTotal.toLocaleString('pt-BR')} ações
                      </Typography>
                    </Box>

                    <Box sx={componentStyles.result.additionalInfoItem}>
                      <Typography variant="body2">💰 Valor Total Investido:</Typography>
                      <Typography
                        variant="body2"
                        sx={componentStyles.result.additionalInfoValue}
                      >
                        {formatCurrency(result.valorTotalInvestido)}
                      </Typography>
                    </Box>

                    <Box sx={componentStyles.result.additionalInfoItem}>
                      <Typography variant="body2">🛒 Número de Compras:</Typography>
                      <Typography
                        variant="body2"
                        sx={componentStyles.result.additionalInfoValue}
                      >
                        {result.compras.length} operações
                      </Typography>
                    </Box>
                  </Box>

                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      💡 <strong>Dica:</strong> O preço médio é calculado automaticamente a cada nova compra adicionada.
                    </Typography>
                  </Alert>

                  {/* Botão Limpar */}
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={limparTudo}
                      fullWidth
                      sx={componentStyles.actions.buttonSecondary}
                      startIcon={<Delete />}
                    >
                      Limpar Todas as Compras
                    </Button>
                  </Box>
                </Paper>
              )}
            </Box>
          </Grid>

          {/* Coluna Direita - Lista de Compras e Gráfico */}
          <Grid size={{ xs: 12, lg: 6 }}>
            {/* Lista de Compras */}
            {compras.length > 0 && (
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
                  Histórico de Compras
                </Typography>
                
                <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                  {compras.map((compra, index) => (
                    <Paper 
                      key={compra.id} 
                      elevation={1} 
                      sx={{ p: 2, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="primary" fontWeight="bold">
                          Compra #{index + 1}
                        </Typography>
                        <Typography variant="body2">
                          {compra.quantidade} ações × {formatCurrency(compra.preco)} = {formatCurrency(compra.valorTotal)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {compra.timestamp.toLocaleString('pt-BR')}
                        </Typography>
                      </Box>
                      <IconButton 
                        color="error" 
                        onClick={() => removerCompra(compra.id)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </Paper>
                  ))}
                </Box>
              </Paper>
            )}

          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PrecoMedioAcaoCalculator;