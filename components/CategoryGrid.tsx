"use client";

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Chip,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';

interface Tool {
  title: string;
  description: string;
  href: string;
  keywords?: string[];
}

interface Category {
  title: string;
  icon: React.ReactNode;
  color: string;
  tools: Tool[];
}

interface CategoryGridProps {
  categories: Category[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  const theme = useTheme();
  const router = useRouter();

  const handleToolClick = (href: string) => {
    window.open(href, '_blank');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {categories.map((category) => (
        <Box key={category.title} sx={{ mb: 6 }}>
          {/* Header da Categoria */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 3,
              pb: 1,
              borderBottom: `3px solid ${category.color}`,
            }}
          >
            <Avatar
              sx={{
                bgcolor: category.color,
                mr: 2,
                width: 48,
                height: 48,
              }}
            >
              {category.icon}
            </Avatar>
            <Box>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                {category.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {category.tools.length} calculadora{category.tools.length > 1 ? 's' : ''} disponível{category.tools.length > 1 ? 'is' : ''}
              </Typography>
            </Box>
          </Box>

          {/* Grid de Ferramentas */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 3,
            }}
          >
            {category.tools.map((tool) => (
              <Card
                key={tool.href}
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                    borderColor: category.color,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => handleToolClick(tool.href)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      p: 3,
                    }}
                  >
                    {/* Ícone da categoria como indicador */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: category.color + '20',
                          color: category.color,
                          width: 40,
                          height: 40,
                          mr: 1.5,
                        }}
                      >
                        {category.icon}
                      </Avatar>
                      <Chip
                        label={category.title}
                        size="small"
                        sx={{
                          backgroundColor: category.color + '15',
                          color: category.color,
                          fontWeight: 500,
                        }}
                      />
                    </Box>

                    {/* Título */}
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        mb: 1.5,
                        color: theme.palette.text.primary,
                        lineHeight: 1.3,
                      }}
                    >
                      {tool.title}
                    </Typography>

                    {/* Descrição */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        flexGrow: 1,
                        lineHeight: 1.5,
                        mb: 2,
                      }}
                    >
                      {tool.description}
                    </Typography>

                    {/* Indicador visual de ação */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: 'auto',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: category.color,
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        Calcular agora
                        <Box
                          component="span"
                          sx={{
                            ml: 1,
                            transform: 'translateX(0)',
                            transition: 'transform 0.2s ease',
                            '.MuiCard-root:hover &': {
                              transform: 'translateX(4px)',
                            },
                          }}
                        >
                          →
                        </Box>
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default CategoryGrid;