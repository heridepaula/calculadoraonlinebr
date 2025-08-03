"use client";

import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  Box,
  IconButton,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Image from 'next/image';
import { componentStyles } from '@/src/styles/components';

interface Tool {
  title: string;
  description: string;
  image: string;
  href: string;
}

interface CategoryCarouselProps {
  tools: Tool[];
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ tools }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
  
  // Memoizar cálculos de largura
  const cardWidth = useMemo(() => {
    if (isMobile) return '100%';     // xs: 12 = 100%
    if (isTablet) return '50%';      // sm: 6 = 50%
    if (isLarge) return '25%';       // lg: 3 = 25%
    return '33.333%';                // md: 4 = 33.333%
  }, [isMobile, isTablet, isLarge]);
  
  // Memoizar cálculo de cards por view
  const cardsPerView = useMemo(() => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    if (isLarge) return 4;
    return 3;
  }, [isMobile, isTablet, isLarge]);

  const maxIndex = useMemo(() => Math.max(0, tools.length - cardsPerView), [tools.length, cardsPerView]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // Memoizar cálculo de translateX
  const translateX = useMemo(() => {
    const cardWidthPercent = parseFloat(cardWidth.replace('%', ''));
    return `translateX(-${currentIndex * cardWidthPercent}%)`;
  }, [currentIndex, cardWidth]);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* Botão Anterior */}
      {currentIndex > 0 && (
        <IconButton
          onClick={handlePrevious}
          sx={{
            position: 'absolute',
            left: -24,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
          }}
        >
          <ChevronLeft />
        </IconButton>
      )}

      {/* Container do Carrossel */}
      <Box
        ref={scrollContainerRef}
        sx={{
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            transform: translateX,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          {tools.map((tool, index) => (
            <Box
              key={tool.title}
              sx={{
                width: cardWidth,
                flexShrink: 0,
                px: 1,
              }}
            >
              <Card sx={componentStyles.homepage.toolCard}>
                <CardActionArea
                  href={tool.href}
                  sx={componentStyles.homepage.toolCardAction}
                >
                  <CardMedia sx={componentStyles.homepage.toolCardMedia}>
                    <Image
                      src={tool.image}
                      alt={tool.title}
                      fill
                      priority={index === 0} // Priorizar primeira imagem
                      loading={index === 0 ? "eager" : "lazy"}
                      quality={index === 0 ? 85 : 75} // Maior qualidade para primeira imagem
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                        padding: "8px"
                      }}
                    />
                  </CardMedia>
                  <CardContent sx={componentStyles.homepage.toolCardContent}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={componentStyles.homepage.toolCardTitle}
                    >
                      {tool.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={componentStyles.homepage.toolCardDescription}
                    >
                      {tool.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Botão Próximo */}
      {currentIndex < maxIndex && (
        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: -24,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
          }}
        >
          <ChevronRight />
        </IconButton>
      )}

      {/* Indicadores (pontos) */}
      {tools.length > cardsPerView && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
            gap: 1,
          }}
        >
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: currentIndex === index ? 'primary.main' : 'grey.400',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                  backgroundColor: currentIndex === index ? 'primary.dark' : 'grey.600',
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CategoryCarousel;