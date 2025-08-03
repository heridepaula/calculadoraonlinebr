"use client";

import React, { memo, Suspense, lazy } from 'react';
import { IconButtonProps } from '@mui/material/IconButton';

const IconButton = lazy(() => import('@mui/material/IconButton'));

interface LazyIconButtonProps extends IconButtonProps {
  children: React.ReactNode;
}

const LazyIconButton = memo<LazyIconButtonProps>(({ children, ...props }) => {
  return (
    <Suspense fallback={<div style={{ width: 40, height: 40, display: 'inline-block' }} />}>
      <IconButton {...props}>
        {children}
      </IconButton>
    </Suspense>
  );
});

LazyIconButton.displayName = 'LazyIconButton';

export default LazyIconButton;