"use client";

import React from "react";
import { Typography, useTheme } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ReinvestedProps from "@/models/interfaces/ReinvestedProps";

const OutcomeEvolutionBarChart: React.FC<ReinvestedProps> = ({ monthlyResults }) => {
  const theme = useTheme();
  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        Evolução Patrimonial
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyResults}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            label={{
              value: "Mês",
              position: "bottom",
              style: { fontSize: 10 },
            }}
            tick={{ style: { fontSize: 10 } }}
          />
          <YAxis
            label={{
              value: "Valor (R$)",
              angle: -90,
              position: "left",
              style: { fontSize: 10 },
            }}
            tickFormatter={(value) =>
              value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
          />
          <Tooltip
            formatter={(value) =>
              value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
          />
          <Legend wrapperStyle={{ fontSize: 10, marginTop: 15 }} />
          <Bar dataKey="outcome" fill={theme.palette.secondary.main} name="Saldo Total" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default OutcomeEvolutionBarChart;