"use client";

import {
  Box,
  Container,
  Typography,
  Avatar,
} from "@mui/material";
import dynamic from 'next/dynamic';
import { componentStyles } from '@/src/styles/components';
import LoadingOptimized from '@/components/LoadingOptimized';

// Lazy load do carrossel para melhor performance inicial
const CategoryCarousel = dynamic(() => import('@/components/CategoryCarousel'), {
  loading: () => <LoadingOptimized variant="carousel" />,
  ssr: false // Permitido em client component
});

interface Category {
  title: string;
  icon: React.ReactNode;
  color: string;
  tools: Array<{
    title: string;
    description: string;
    image: string;
    href: string;
  }>;
}

interface HomePageClientProps {
  categories: Category[];
}

const HomePageClient: React.FC<HomePageClientProps> = ({ categories }) => {
  return (
    <Container sx={componentStyles.homepage.container}>
      {categories.map((category) => (
        <Box key={category.title} sx={componentStyles.homepage.categoryContainer}>
          <Box
            sx={{
              ...componentStyles.homepage.categoryHeader,
              borderBottom: `2px solid ${category.color}`,
            }}
          >
            <Avatar
              sx={{
                ...componentStyles.homepage.categoryAvatar,
                bgcolor: category.color,
              }}
            >
              {category.icon}
            </Avatar>
            <Typography variant="h5" sx={componentStyles.homepage.categoryTitle}>
              {category.title}
            </Typography>
          </Box>

          <CategoryCarousel tools={category.tools} />
        </Box>
      ))}
    </Container>
  );
};

export default HomePageClient;