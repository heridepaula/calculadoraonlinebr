"use client";

import React from "react";
import { Typography, useTheme } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ReinvestedProps from "@/models/interfaces/ReinvestedProps";

const IncomeEvolution: React.FC<ReinvestedProps> = ({ monthlyResults }) => {
  const theme = useTheme();
  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        Evolução Mensal dos Juros
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyResults}>
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
            tick={{ style: { fontSize: 10 } }}
            tickFormatter={(value) =>
              value.toLocaleString("pt-BR", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
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
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            wrapperStyle={{ fontSize: 10, marginTop: 15 }}
          />
          <Line
            type="monotone"
            dataKey="invested"
            stroke={theme.palette.primary.main}
            name="Aporte Mensal"
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke={theme.palette.success.dark}
            name="Juros no Mês"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default IncomeEvolution;
