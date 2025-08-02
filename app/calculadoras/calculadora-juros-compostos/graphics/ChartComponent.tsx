"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import MonthlyResult from "@/models/interfaces/MonthlyResult";

interface ChartComponentProps {
  monthlyResults: MonthlyResult[];
  chartType: "line" | "bar";
  primaryColor: string;
  successColor?: string;
  secondaryColor?: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ 
  monthlyResults, 
  chartType, 
  primaryColor, 
  successColor,
  secondaryColor 
}) => {
  if (!monthlyResults || monthlyResults.length === 0) {
    return null;
  }

  const commonAxisProps = {
    tick: { style: { fontSize: 10 } }
  };

  const commonTooltipProps = {
    formatter: (value: any) =>
      value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
  };

  const commonLegendProps = {
    wrapperStyle: { fontSize: 10, marginTop: 15 }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      {chartType === "line" ? (
        <LineChart data={monthlyResults}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            label={{
              value: "Mês",
              position: "bottom",
              style: { fontSize: 10 },
            }}
            {...commonAxisProps}
          />
          <YAxis
            label={{
              value: "Valor (R$)",
              angle: -90,
              position: "left",
              style: { fontSize: 10 },
            }}
            {...commonAxisProps}
            tickFormatter={(value) =>
              value.toLocaleString("pt-BR", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
            }
          />
          <Tooltip {...commonTooltipProps} />
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            {...commonLegendProps}
          />
          <Line
            type="monotone"
            dataKey="invested"
            stroke={primaryColor}
            name="Aporte Mensal"
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke={successColor}
            name="Juros no Mês"
          />
        </LineChart>
      ) : (
        <BarChart data={monthlyResults}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            label={{
              value: "Mês",
              position: "bottom",
              style: { fontSize: 10 },
            }}
            {...commonAxisProps}
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
          <Tooltip {...commonTooltipProps} />
          <Legend {...commonLegendProps} />
          <Bar 
            dataKey="outcome" 
            fill={secondaryColor || primaryColor} 
            name="Saldo Total" 
          />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
};

export default ChartComponent;