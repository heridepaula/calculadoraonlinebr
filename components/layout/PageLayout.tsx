'use client';

import React from 'react';
import { Container } from '@mui/material';
import AppBar from '@/components/AppBar';
import Footer from '@/components/Footer';
import { componentStyles } from '@/src/styles/components';

interface PageLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  disableGutters?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  maxWidth = 'lg',
  disableGutters = false,
}) => {
  return (
    <main style={componentStyles.layout.mainContainer}>
      <AppBar />
      <Container
        maxWidth={maxWidth}
        disableGutters={disableGutters}
        sx={componentStyles.layout.contentContainer}
      >
        {children}
      </Container>
      <Footer />
    </main>
  );
};

export default PageLayout;