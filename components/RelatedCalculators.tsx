"use client";

import { 
  Box, 
  Typography, 
  Card, 
  CardActionArea, 
  CardContent,
  Avatar,
  Chip,
  useTheme
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FunctionsIcon from "@mui/icons-material/Functions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from '@mui/icons-material/Work';
import { CALCULATORS } from "@/lib/data/calculators";
import { CALCULATOR_CATEGORIES } from "@/lib/config/constants";

interface RelatedCalculatorsProps {
  currentCalculatorId?: string;
  category?: string;
  maxItems?: number;
}

const getCategoryIcon = (category: string) => {
  const iconMap = {
    'financial': <MonetizationOnIcon />,
    'math': <FunctionsIcon />,
    'health': <FavoriteIcon />,
    'labor': <WorkIcon />,
  };
  return iconMap[category as keyof typeof iconMap] || <MonetizationOnIcon />;
};

export default function RelatedCalculators({ 
  currentCalculatorId, 
  category, 
  maxItems = 3 
}: RelatedCalculatorsProps) {
  const theme = useTheme();
  
  let relatedCalculators = CALCULATORS.filter(calc => calc.id !== currentCalculatorId);
  
  // If category is provided, prioritize calculators from the same category
  if (category) {
    const sameCategory = relatedCalculators.filter(calc => calc.category === category);
    const otherCategories = relatedCalculators.filter(calc => calc.category !== category);
    relatedCalculators = [...sameCategory, ...otherCategories];
  }
  
  // Limit the number of related calculators
  relatedCalculators = relatedCalculators.slice(0, maxItems);
  
  if (relatedCalculators.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 6, mb: 4 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          mb: 4,
          textAlign: "center",
          color: theme.palette.text.primary
        }}
      >
        Outras Calculadoras
      </Typography>
      
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: maxItems >= 2 ? 'repeat(2, 1fr)' : '1fr',
            md: maxItems >= 3 ? 'repeat(3, 1fr)' : maxItems >= 2 ? 'repeat(2, 1fr)' : '1fr',
          },
          gap: 3,
        }}
      >
        {relatedCalculators.map((calculator) => {
          const categoryConfig = CALCULATOR_CATEGORIES[calculator.category];
          
          return (
            <Card
              key={calculator.id}
              sx={{
                height: '100%',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                  borderColor: categoryConfig.color,
                },
              }}
            >
              <CardActionArea
                onClick={() => window.open(calculator.path, '_blank')}
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
                        bgcolor: categoryConfig.color + '20',
                        color: categoryConfig.color,
                        width: 40,
                        height: 40,
                        mr: 1.5,
                      }}
                    >
                      {getCategoryIcon(calculator.category)}
                    </Avatar>
                    <Chip
                      label={categoryConfig.name}
                      size="small"
                      sx={{
                        backgroundColor: categoryConfig.color + '15',
                        color: categoryConfig.color,
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
                      fontSize: '1.1rem',
                    }}
                  >
                    {calculator.title}
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
                    {calculator.description}
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
                        color: categoryConfig.color,
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
          );
        })}
      </Box>
    </Box>
  );
}