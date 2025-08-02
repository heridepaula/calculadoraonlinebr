import { designTokens } from './theme';
import { alpha } from '@mui/material/styles';

// Estilos específicos para componentes UI
export const componentStyles = {
  // CalculatorHeader
  header: {
    container: {
      mb: 3,
      textAlign: 'center' as const,
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: 600,
      mb: 1,
    },
    titleH2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      mb: 1,
    },
    description: {
      maxWidth: 600,
      mx: 'auto',
    },
  },

  // CalculatorInput
  input: {
    standard: {
      variant: 'standard' as const,
      fullWidth: true,
    },
    numeric: {
      inputMode: 'decimal' as const,
    },
    centered: {
      '& .MuiInputLabel-root': {
        textAlign: 'center' as const,
        display: 'block',
      },
      '& .MuiInputLabel-shrink': {
        textAlign: 'left' as const,
        display: 'block',
      },
      '& .MuiInputBase-input': {
        fontSize: '1.5rem',
        padding: '8px',
        textAlign: 'center' as const,
      },
    },
  },

  // CalculatorActions
  actions: {
    container: {
      mt: 2,
    },
    stackedContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 2,
      mt: 3,
    },
    clearOnlyContainer: {
      display: 'flex',
      justifyContent: 'center',
      mt: 3,
    },
    buttonPrimary: {
      paddingY: 1.5,
      fontSize: '1rem',
      fontWeight: 'bold',
      backgroundColor: '#1976d2',
      boxShadow: '0px 4px 12px rgba(25, 118, 210, 0.4)',
      '&:hover': {
        backgroundColor: '#1565c0',
        boxShadow: '0px 6px 16px rgba(21, 101, 192, 0.5)',
      },
    },
    buttonSecondary: {
      paddingY: 1.5,
      fontSize: '1rem',
      fontWeight: 'bold',
      borderColor: '#d32f2f',
      color: '#d32f2f',
      '&:hover': {
        backgroundColor: '#ffe6e6',
        borderColor: '#b71c1c',
        color: '#b71c1c',
      },
    },
    buttonClearOnly: {
      paddingY: 1.5,
      fontSize: '1rem',
      fontWeight: 'bold',
      minWidth: 200,
      borderColor: '#d32f2f',
      color: '#d32f2f',
      '&:hover': {
        backgroundColor: '#ffe6e6',
        borderColor: '#b71c1c',
        color: '#b71c1c',
      },
    },
  },

  // CalculatorResult
  result: {
    container: {
      p: 3,
      mt: 3,
      borderRadius: 3,
      transition: 'all 0.3s ease',
    },
    compactContainer: {
      p: 2,
      textAlign: 'center' as const,
      borderRadius: 2,
      mt: 2,
    },
    title: {
      fontWeight: 600,
      mb: 2,
      textAlign: 'center' as const,
    },
    valueContainer: {
      textAlign: 'center' as const,
      mb: 2,
    },
    value: {
      fontWeight: 700,
      fontSize: { xs: '1.8rem', md: '2.2rem' },
    },
    compactValue: {
      fontWeight: 'bold',
    },
    category: {
      fontWeight: 500,
      mt: 1,
    },
    additionalInfo: {
      mt: 2,
    },
    additionalInfoItem: {
      color: 'text.secondary',
      display: 'flex',
      justifyContent: 'space-between',
      mb: 0.5,
    },
    additionalInfoValue: {
      fontWeight: 500,
    },
  },

  // CalculatorPage
  page: {
    container: {
      mt: 4,
      px: 2,
    },
    paper: {
      elevation: 4,
      padding: 3,
      borderRadius: 2,
    },
  },

  // Layout
  layout: {
    mainContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      minHeight: '100vh',
    },
    contentContainer: {
      flexGrow: 1,
      py: { xs: 2, md: 4 },
    },
  },

  // Homepage
  homepage: {
    container: {
      py: { xs: 4, md: 6 },
    },
    categoryContainer: {
      mb: 8,
    },
    categoryHeader: {
      display: 'flex',
      alignItems: 'center',
      mb: 2,
      pb: 1,
    },
    categoryAvatar: {
      mr: 1,
      width: 40,
      height: 40,
    },
    categoryTitle: {
      fontWeight: 600,
    },
    toolCard: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
      borderRadius: 3,
      overflow: 'hidden',
      transition: 'transform 0.2s ease, box-shadow 0.3s ease',
      boxShadow: 2,
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 6,
      },
      '&:active': {
        transform: 'translateY(0)',
        boxShadow: 2,
      },
    },
    toolCardAction: {
      display: 'flex',
      flexDirection: 'column' as const,
      height: '100%',
    },
    toolCardMedia: {
      height: 160,
      width: '100%',
      position: 'relative' as const,
      filter: 'brightness(0.95)',
    },
    toolCardContent: {
      flexGrow: 1,
      p: 3,
    },
    toolCardTitle: {
      fontWeight: 600,
      mb: 1,
    },
    toolCardDescription: {
      lineHeight: 1.6,
    },
  },

  // Specific calculator styles
  imcCalculator: {
    container: {
      maxWidth: 800,
      mx: 'auto',
      p: 3,
    },
    resultContainer: {
      p: { xs: 2, md: 3 },
      borderRadius: '16px',
      transition: 'all 0.3s ease',
      boxShadow: 1,
    },
    resultGrid: {
      mb: 2,
    },
    resultValueGrid: {
      display: 'flex',
      alignItems: 'center',
    },
    resultValue: {
      fontSize: { xs: '1.8rem', md: '2.2rem' },
      fontWeight: 700,
      mr: 2,
    },
    resultProgressGrid: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    },
    resultProgress: {
      flexGrow: 1,
      height: 12,
      borderRadius: 6,
    },
    resultProgressBar: {
      borderRadius: 6,
    },
    resultCategory: {
      fontWeight: 600,
      mb: 1.5,
      display: 'flex',
      alignItems: 'center',
      gap: 1,
    },
    resultCategoryDot: {
      display: 'inline-block',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
    },
    resultAlert: {
      alignItems: 'flex-start',
      '& .MuiAlert-message': {
        py: 0.5,
      },
    },
    resultAlertContent: {
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      width: '100%',
    },
    resultAlertIcon: {
      flexShrink: 0,
      borderRadius: '50%',
      p: 1,
      display: 'flex',
    },
    resultAlertText: {
      mt: 1,
      fontSize: '0.9em',
      fontWeight: 500,
    },
  },

  // Rule of three calculator
  ruleOfThreeCalculator: {
    arrowIcon: {
      fontSize: '2rem',
      marginTop: '1rem',
      color: '#1976d2',
    },
    arrowContainer: {
      textAlign: 'center' as const,
    },
    resultBox: {
      padding: 2,
      textAlign: 'center' as const,
      backgroundColor: '#f5f5f5',
      borderRadius: 2,
    },
    resultTitle: {
      color: '#1a1a1a',
      fontWeight: 'bold',
      marginBottom: 1,
    },
    resultSubtitle: {
      color: 'text.secondary',
    },
    resultExplanation: {
      fontWeight: 'bold',
      color: '#4c814f',
    },
  },
} as const;

// Helper para criar estilos com cores dinâmicas
export const createColoredStyle = (color: string, opacity: number = 0.1) => ({
  backgroundColor: alpha(color, opacity),
  borderColor: alpha(color, 0.3),
  color: color,
});

// Helper para estilos responsivos
export const responsiveStyle = (mobileStyle: any, desktopStyle: any) => ({
  ...mobileStyle,
  '@media (min-width: 768px)': desktopStyle,
});

// Helper para estilos de hover
export const hoverStyle = (baseStyle: any, hoverStyle: any) => ({
  ...baseStyle,
  '&:hover': hoverStyle,
});