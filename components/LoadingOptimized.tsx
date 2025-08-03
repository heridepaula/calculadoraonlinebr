"use client";

import { Box, Skeleton, useTheme, useMediaQuery } from '@mui/material';
import { componentStyles } from '@/src/styles/components';

interface LoadingOptimizedProps {
  variant?: 'card' | 'carousel' | 'text';
  count?: number;
}

const LoadingOptimized: React.FC<LoadingOptimizedProps> = ({ 
  variant = 'card', 
  count = 1 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (variant === 'carousel') {
    return (
      <Box sx={{ display: 'flex', gap: 2, overflow: 'hidden' }}>
        {Array.from({ length: isMobile ? 1 : 3 }, (_, index) => (
          <Box key={index} sx={{ minWidth: isMobile ? '100%' : '33.333%' }}>
            <Skeleton 
              variant="rectangular" 
              height={120} 
              sx={{ borderRadius: 1, mb: 1 }}
              animation="wave"
            />
            <Skeleton variant="text" width="80%" height={24} />
            <Skeleton variant="text" width="60%" height={20} />
          </Box>
        ))}
      </Box>
    );
  }

  if (variant === 'card') {
    return (
      <Box sx={componentStyles.homepage.toolCard}>
        <Skeleton 
          variant="rectangular" 
          height={120} 
          sx={{ borderRadius: 1 }}
          animation="wave"
        />
        <Box sx={{ p: 2 }}>
          <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="60%" height={20} />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton 
          key={index}
          variant="text" 
          height={20} 
          sx={{ mb: 0.5 }}
          animation="wave"
        />
      ))}
    </Box>
  );
};

export default LoadingOptimized;