"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Typography, useTheme } from "@mui/material";
import ReinvestedProps from "@/models/interfaces/ReinvestedProps";

const ChartComponent = dynamic(
  () => import('./ChartComponent'),
  { 
    ssr: false, 
    loading: () => <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Carregando gráfico...</div> 
  }
);

const OutcomeEvolutionBarChart: React.FC<ReinvestedProps> = ({ monthlyResults }) => {
  const theme = useTheme();
  
  if (!monthlyResults || monthlyResults.length === 0) {
    return null;
  }

  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        Evolução Patrimonial
      </Typography>
      <ChartComponent 
        monthlyResults={monthlyResults}
        chartType="bar"
        primaryColor={theme.palette.secondary.main}
      />
    </>
  );
};

export default OutcomeEvolutionBarChart;