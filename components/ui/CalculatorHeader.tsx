'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { componentStyles } from '@/src/styles/components';

interface CalculatorHeaderProps {
  title: string;
  description?: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const CalculatorHeader: React.FC<CalculatorHeaderProps> = ({
  title,
  description,
  level = 'h1',
}) => {
  return (
    <Box component="header" sx={componentStyles.header.container}>
      <Typography
        variant={level}
        component={level}
        sx={level === 'h1' ? componentStyles.header.title : componentStyles.header.titleH2}
      >
        {title}
      </Typography>
      {description && (
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={componentStyles.header.description}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default CalculatorHeader;