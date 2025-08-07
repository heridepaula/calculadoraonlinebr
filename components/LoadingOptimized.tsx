"use client";

import { Box, useTheme } from '@mui/material';
import { componentStyles } from '@/src/styles/components';

// Custom skeleton component to replace MUI Skeleton
const CustomSkeleton = ({ 
  variant = 'text', 
  width, 
  height, 
  sx = {} 
}: {
  variant?: 'text' | 'rectangular';
  width?: string | number;
  height?: string | number;
  sx?: any;
}) => (
  <Box
    sx={{
      backgroundColor: '#f0f0f0',
      borderRadius: variant === 'rectangular' ? 1 : 0.5,
      width: width || '100%',
      height: height || (variant === 'text' ? '1em' : 120),
      animation: 'pulse 1.5s ease-in-out infinite',
      '@keyframes pulse': {
        '0%': { opacity: 1 },
        '50%': { opacity: 0.4 },
        '100%': { opacity: 1 },
      },
      ...sx,
    }}
  />
);

interface LoadingOptimizedProps {
  variant?: 'card' | 'carousel' | 'text';
  count?: number;
}

const LoadingOptimized: React.FC<LoadingOptimizedProps> = ({ 
  variant = 'card', 
  count = 1 
}) => {
  const theme = useTheme();

  if (variant === 'carousel') {
    return (
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
        gap: 2, 
        overflow: 'hidden' 
      }}>
        <Box>
          <CustomSkeleton 
            variant="rectangular" 
            height={120} 
            sx={{ borderRadius: 1, mb: 1 }}
          />
          <CustomSkeleton variant="text" width="80%" height={24} />
          <CustomSkeleton variant="text" width="60%" height={20} />
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <CustomSkeleton 
            variant="rectangular" 
            height={120} 
            sx={{ borderRadius: 1, mb: 1 }}
          />
          <CustomSkeleton variant="text" width="80%" height={24} />
          <CustomSkeleton variant="text" width="60%" height={20} />
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <CustomSkeleton 
            variant="rectangular" 
            height={120} 
            sx={{ borderRadius: 1, mb: 1 }}
          />
          <CustomSkeleton variant="text" width="80%" height={24} />
          <CustomSkeleton variant="text" width="60%" height={20} />
        </Box>
      </Box>
    );
  }

  if (variant === 'card') {
    return (
      <Box sx={componentStyles.homepage.toolCard}>
        <CustomSkeleton 
          variant="rectangular" 
          height={120} 
          sx={{ borderRadius: 1 }}
        />
        <Box sx={{ p: 2 }}>
          <CustomSkeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
          <CustomSkeleton variant="text" width="60%" height={20} />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {Array.from({ length: count }, (_, index) => (
        <CustomSkeleton 
          key={index}
          variant="text" 
          height={20} 
          sx={{ mb: 0.5 }}
        />
      ))}
    </Box>
  );
};

export default LoadingOptimized;