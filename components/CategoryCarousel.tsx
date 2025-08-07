"use client";

import React, { useState, useRef, useCallback, useMemo, useEffect, memo } from 'react';
import {
  Box,
  IconButton,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import OptimizedImage from './OptimizedImage';
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

const CategoryCarousel: React.FC<CategoryCarouselProps> = memo(({ tools }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  
  // Estados para swipe/arrastar
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  
  // Using responsive breakpoints directly in JSX
  const getResponsiveValue = (mobile: any, tablet: any, desktop: any, large: any) => ({
    xs: mobile,
    sm: tablet, 
    md: desktop,
    lg: large
  });
  
  // Simplified responsive values - will use CSS Grid instead
  const cardWidth = '100%';
  const cardsPerView = 1; // Simplified to 1 card per view for mobile-first approach

  const maxIndex = useMemo(() => Math.max(0, tools.length - cardsPerView), [tools.length, cardsPerView]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // Funções para swipe/arrastar
  const handleStart = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setStartY(clientY);
    setCurrentX(clientX);
    setDragOffset(0);
  }, []);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return;

    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    // Verificar se é um movimento horizontal (swipe lateral)
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setCurrentX(clientX);
      setDragOffset(deltaX);
    }
  }, [isDragging, startX, startY]);

  const handleEnd = useCallback(() => {
    if (!isDragging) return;

    const deltaX = currentX - startX;
    const threshold = 50; // Distância mínima para considerar como swipe

    // Determinar direção do swipe
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && currentIndex > 0) {
        // Swipe para direita - voltar
        handlePrevious();
      } else if (deltaX < 0 && currentIndex < maxIndex) {
        // Swipe para esquerda - avançar
        handleNext();
      }
    }

    // Reset dos estados
    setIsDragging(false);
    setStartX(0);
    setStartY(0);
    setCurrentX(0);
    setDragOffset(0);
  }, [isDragging, currentX, startX, currentIndex, maxIndex, handlePrevious, handleNext]);

  // Event handlers para touch
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  }, [handleStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevenir scroll da página
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  }, [isDragging, handleMove]);

  const handleTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Event handlers para mouse (desktop)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  }, [handleStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  }, [handleMove]);

  const handleMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      handleEnd();
    }
  }, [isDragging, handleEnd]);

  // Memoizar cálculo de translateX com drag offset
  const translateX = useMemo(() => {
    const cardWidthPercent = parseFloat(cardWidth.replace('%', ''));
    const baseTransform = -currentIndex * cardWidthPercent;
    
    // Adicionar offset do drag se estiver arrastando
    if (isDragging && scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const dragPercent = (dragOffset / containerWidth) * 100;
      return `translateX(${baseTransform + dragPercent}%)`;
    }
    
    return `translateX(${baseTransform}%)`;
  }, [currentIndex, cardWidth, isDragging, dragOffset]);

  // Effect para adicionar event listeners globais quando arrastando
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleGlobalMouseUp = () => {
      handleEnd();
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, handleMove, handleEnd]);

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
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          touchAction: 'pan-y', // Permitir scroll vertical, prevenir horizontal
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        <Box
          sx={{
            display: 'flex',
            transform: translateX,
            transition: isDragging ? 'none' : 'transform 0.3s ease-in-out',
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
                    <OptimizedImage
                      src={tool.image}
                      alt={tool.title}
                      width={300}
                      height={200}
                      priority={index === 0} // Priorizar primeira imagem
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

      {/* Indicadores (pontos) - Melhorados para mobile */}
      {tools.length > cardsPerView && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
            gap: { xs: 1.5, sm: 1 },
          }}
        >
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: { xs: 12, sm: 8 },
                height: { xs: 12, sm: 8 },
                borderRadius: '50%',
                backgroundColor: currentIndex === index ? 'primary.main' : 'grey.400',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: 'scale(1)', // Simplified - remove conditional scaling
                '&:hover': {
                  backgroundColor: currentIndex === index ? 'primary.dark' : 'grey.600',
                  transform: 'scale(1.2)',
                },
                '&:active': {
                  transform: 'scale(0.9)',
                },
              }}
            />
          ))}
        </Box>
      )}

      {/* Feedback visual para swipe em mobile */}
      {/* Simplified - show drag feedback on all screen sizes */}
      {isDragging && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 2,
            px: 2,
            py: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {dragOffset > 0 ? '← Anterior' : '→ Próximo'}
          </Typography>
        </Box>
      )}
    </Box>
  );
});

CategoryCarousel.displayName = 'CategoryCarousel';

export default CategoryCarousel;