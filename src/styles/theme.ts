import { createTheme } from '@mui/material/styles';

// Design Tokens
export const designTokens = {
  colors: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
      contrastText: '#fff',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#fff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#000',
    },
    error: {
      main: '#f44336',
      light: '#ef5350',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
  },
  shadows: {
    xs: '0px 1px 3px rgba(0, 0, 0, 0.12)',
    sm: '0px 2px 4px rgba(0, 0, 0, 0.12)',
    md: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    lg: '0px 8px 16px rgba(0, 0, 0, 0.15)',
    xl: '0px 12px 24px rgba(0, 0, 0, 0.15)',
  },
  typography: {
    fontFamily: 'IBM Plex Mono, monospace',
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      md: '1rem',       // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
} as const;

// Tema customizado do Material-UI
const theme = createTheme({
  palette: {
    primary: designTokens.colors.primary,
    secondary: designTokens.colors.secondary,
    success: designTokens.colors.success,
    warning: designTokens.colors.warning,
    error: designTokens.colors.error,
    info: designTokens.colors.info,
    grey: designTokens.colors.grey,
  },
  breakpoints: {
    values: designTokens.breakpoints.values,
  },
  typography: {
    fontFamily: designTokens.typography.fontFamily,
    h1: {
      fontSize: designTokens.typography.fontSizes['4xl'],
      fontWeight: designTokens.typography.fontWeights.bold,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: designTokens.typography.fontSizes['3xl'],
      fontWeight: designTokens.typography.fontWeights.bold,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: designTokens.typography.fontSizes['2xl'],
      fontWeight: designTokens.typography.fontWeights.semiBold,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: designTokens.typography.fontSizes.xl,
      fontWeight: designTokens.typography.fontWeights.semiBold,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: designTokens.typography.fontSizes.lg,
      fontWeight: designTokens.typography.fontWeights.medium,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: designTokens.typography.fontSizes.md,
      fontWeight: designTokens.typography.fontWeights.medium,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: designTokens.typography.fontSizes.md,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: designTokens.typography.fontSizes.sm,
      lineHeight: 1.6,
    },
    caption: {
      fontSize: designTokens.typography.fontSizes.xs,
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: designTokens.borderRadius.sm,
  },
  spacing: designTokens.spacing.xs,
  transitions: {
    duration: designTokens.transitions.duration,
    easing: designTokens.transitions.easing,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: designTokens.typography.fontWeights.semiBold,
          borderRadius: designTokens.borderRadius.md,
          padding: `${designTokens.spacing.sm}px ${designTokens.spacing.md}px`,
          transition: `all ${designTokens.transitions.duration.short}ms ${designTokens.transitions.easing.easeInOut}`,
        },
        containedPrimary: {
          boxShadow: designTokens.shadows.sm,
          '&:hover': {
            boxShadow: designTokens.shadows.md,
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            borderRadius: designTokens.borderRadius.sm,
          },
          '& .MuiOutlinedInput-root': {
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: designTokens.colors.primary.main,
              },
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.lg,
          boxShadow: designTokens.shadows.sm,
          transition: `all ${designTokens.transitions.duration.short}ms ${designTokens.transitions.easing.easeInOut}`,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.md,
        },
      },
    },
  },
});

export default theme;