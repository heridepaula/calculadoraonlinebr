"use client";

import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  Typography,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Fade,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';

interface Tool {
  title: string;
  description: string;
  href: string;
  category: string;
  keywords?: string[];
}

interface SearchHeaderProps {
  tools: Tool[];
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ tools }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const popularSearches = ['Juros Compostos', 'IMC', 'CDB', 'Tesouro Direto', 'Rescisão'];

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return tools.filter(tool => 
      tool.title.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query) ||
      tool.keywords?.some(keyword => keyword.toLowerCase().includes(query))
    ).slice(0, 6);
  }, [searchQuery, tools]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    setShowResults(value.length > 0);
  };

  const handleToolSelect = (href: string) => {
    setSearchQuery('');
    setShowResults(false);
    router.push(href);
  };

  const handlePopularSearch = (search: string) => {
    setSearchQuery(search);
    setShowResults(true);
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
        py: { xs: 3, md: 4 },
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: theme.palette.text.primary,
              fontSize: { xs: '1.75rem', md: '2.125rem' }
            }}
          >
            Calculadoras Online Gratuitas
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 400,
              color: theme.palette.text.secondary,
              mb: 3,
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            Encontre rapidamente a calculadora que você precisa
          </Typography>

          <Box sx={{ position: 'relative', maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Digite o que você quer calcular..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery && setShowResults(true)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: 'white',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                    borderWidth: 2,
                  },
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  fontSize: '1.1rem',
                  py: 0.5,
                }
              }}
            />

            {/* Resultados da Busca */}
            <Fade in={showResults && filteredTools.length > 0}>
              <Paper
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  mt: 1,
                  maxHeight: 400,
                  overflow: 'auto',
                  zIndex: 1000,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                  borderRadius: 2,
                }}
              >
                <List sx={{ py: 0 }}>
                  {filteredTools.map((tool, index) => (
                    <ListItem key={tool.href} disablePadding>
                      <ListItemButton
                        onClick={() => handleToolSelect(tool.href)}
                        sx={{
                          py: 1.5,
                          px: 2,
                          '&:hover': {
                            backgroundColor: theme.palette.primary.main + '08',
                          }
                        }}
                      >
                        <ListItemText
                          primary={tool.title}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {tool.description}
                              </Typography>
                              <Chip
                                label={tool.category}
                                size="small"
                                sx={{ mt: 0.5, fontSize: '0.7rem' }}
                                color="primary"
                                variant="outlined"
                              />
                            </Box>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Fade>
          </Box>

          {/* Buscas Populares */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Buscas populares:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
              {popularSearches.map((search) => (
                <Chip
                  key={search}
                  label={search}
                  variant="outlined"
                  size="small"
                  onClick={() => handlePopularSearch(search)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main + '10',
                      borderColor: theme.palette.primary.main,
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SearchHeader;