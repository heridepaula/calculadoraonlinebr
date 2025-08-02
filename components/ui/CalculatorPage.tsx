'use client';

import React from 'react';
import { Container, Paper } from '@mui/material';
import StructuredData from '@/components/StructuredData';
import { CalculatorPageProps } from '@/lib/types/calculator';
import { componentStyles } from '@/src/styles/components';

const CalculatorPage: React.FC<CalculatorPageProps> = ({
  metadata,
  children,
}) => {
  return (
    <>
      <StructuredData
        type={metadata.structuredDataType}
        title={metadata.title}
        description={metadata.description}
        url={`https://calculadoraonlinebr.com.br${metadata.url}`}
      />
      <Container maxWidth="md" sx={componentStyles.page.container}>
        <Paper sx={componentStyles.page.paper}>
          {children}
        </Paper>
      </Container>
    </>
  );
};

export default CalculatorPage;