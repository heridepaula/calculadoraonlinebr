import { designTokens } from './theme';

// Sistema de classes CSS utilitárias baseado nos design tokens
export const classes = {
  // Layout
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${designTokens.spacing.md}px`,
  },
  
  containerSmall: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: `0 ${designTokens.spacing.md}px`,
  },

  containerMedium: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: `0 ${designTokens.spacing.md}px`,
  },

  // Flex utilities
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  flexColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
  },

  flexGap: {
    display: 'flex',
    gap: designTokens.spacing.md,
  },

  // Spacing
  spacing: {
    xs: { padding: designTokens.spacing.xs },
    sm: { padding: designTokens.spacing.sm },
    md: { padding: designTokens.spacing.md },
    lg: { padding: designTokens.spacing.lg },
    xl: { padding: designTokens.spacing.xl },
    xxl: { padding: designTokens.spacing.xxl },
  },

  margin: {
    xs: { margin: designTokens.spacing.xs },
    sm: { margin: designTokens.spacing.sm },
    md: { margin: designTokens.spacing.md },
    lg: { margin: designTokens.spacing.lg },
    xl: { margin: designTokens.spacing.xl },
    xxl: { margin: designTokens.spacing.xxl },
  },

  // Typography
  textCenter: { textAlign: 'center' as const },
  textLeft: { textAlign: 'left' as const },
  textRight: { textAlign: 'right' as const },
  
  fontWeight: {
    light: { fontWeight: designTokens.typography.fontWeights.light },
    regular: { fontWeight: designTokens.typography.fontWeights.regular },
    medium: { fontWeight: designTokens.typography.fontWeights.medium },
    semiBold: { fontWeight: designTokens.typography.fontWeights.semiBold },
    bold: { fontWeight: designTokens.typography.fontWeights.bold },
  },

  // Borders
  borderRadius: {
    xs: { borderRadius: designTokens.borderRadius.xs },
    sm: { borderRadius: designTokens.borderRadius.sm },
    md: { borderRadius: designTokens.borderRadius.md },
    lg: { borderRadius: designTokens.borderRadius.lg },
    xl: { borderRadius: designTokens.borderRadius.xl },
    xxl: { borderRadius: designTokens.borderRadius.xxl },
  },

  // Shadows
  shadow: {
    xs: { boxShadow: designTokens.shadows.xs },
    sm: { boxShadow: designTokens.shadows.sm },
    md: { boxShadow: designTokens.shadows.md },
    lg: { boxShadow: designTokens.shadows.lg },
    xl: { boxShadow: designTokens.shadows.xl },
  },

  // Calculator specific styles
  calculator: {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: designTokens.spacing.lg,
    },
    
    containerLarge: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: designTokens.spacing.lg,
    },

    paper: {
      elevation: 4,
      padding: designTokens.spacing.xs,
      borderRadius: designTokens.borderRadius.xs,
    },

    grid: {
      container: {
        spacing: 3,
      },
      item: {
        xs: 12,
        md: 6,
      },
    },

    header: {
      fontSize: designTokens.typography.fontSizes['2xl'],
      marginBottom: designTokens.spacing.sm,
      textAlign: 'center' as const,
      fontWeight: designTokens.typography.fontWeights.semiBold,
    },

    subtitle: {
      marginBottom: designTokens.spacing.lg,
      textAlign: 'center' as const,
      lineHeight: 1.6,
    },

    resultCard: {
      border: '2px solid',
      borderRadius: designTokens.borderRadius.xl,
      padding: designTokens.spacing.lg,
      backgroundColor: 'rgba(76, 175, 80, 0.08)',
      borderColor: 'rgba(76, 175, 80, 0.3)',
      boxShadow: designTokens.shadows.md,
      transition: `all ${designTokens.transitions.duration.short}ms ${designTokens.transitions.easing.easeInOut}`,
    },

    resultHeader: {
      marginBottom: designTokens.spacing.lg,
      fontWeight: designTokens.typography.fontWeights.bold,
      display: 'flex',
      alignItems: 'center',
      gap: designTokens.spacing.sm,
    },

    inputField: {
      fontSize: designTokens.typography.fontSizes.lg,
      padding: designTokens.spacing.sm,
      textAlign: 'center' as const,
    },

    buttonPrimary: {
      paddingTop: designTokens.spacing.md,
      paddingBottom: designTokens.spacing.md,
      fontSize: designTokens.typography.fontSizes.md,
      fontWeight: designTokens.typography.fontWeights.semiBold,
      borderRadius: designTokens.borderRadius.md,
      transition: `all ${designTokens.transitions.duration.short}ms ${designTokens.transitions.easing.easeInOut}`,
      boxShadow: `0px 4px 12px rgba(25, 118, 210, 0.4)`,
      '&:hover': {
        boxShadow: `0px 6px 16px rgba(21, 101, 192, 0.5)`,
        transform: 'translateY(-2px)',
      },
    },

    buttonSecondary: {
      paddingTop: designTokens.spacing.md,
      paddingBottom: designTokens.spacing.md,
      fontSize: designTokens.typography.fontSizes.md,
      fontWeight: designTokens.typography.fontWeights.semiBold,
      borderRadius: designTokens.borderRadius.md,
      borderColor: designTokens.colors.error.main,
      color: designTokens.colors.error.main,
      transition: `all ${designTokens.transitions.duration.short}ms ${designTokens.transitions.easing.easeInOut}`,
      '&:hover': {
        backgroundColor: '#ffe6e6',
        borderColor: designTokens.colors.error.dark,
        color: designTokens.colors.error.dark,
      },
    },

    progressBar: {
      height: 12,
      borderRadius: 6,
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
      '& .MuiLinearProgress-bar': {
        borderRadius: 6,
      },
    },

    infoBox: {
      padding: designTokens.spacing.md,
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
      borderRadius: designTokens.borderRadius.md,
      marginBottom: designTokens.spacing.lg,
    },

    warningBox: {
      padding: designTokens.spacing.md,
      backgroundColor: 'rgba(255, 152, 0, 0.1)',
      borderRadius: designTokens.borderRadius.md,
      border: `1px solid rgba(255, 152, 0, 0.2)`,
    },

    successBox: {
      padding: designTokens.spacing.md,
      backgroundColor: 'rgba(76, 175, 80, 0.05)',
      borderRadius: designTokens.borderRadius.md,
      border: `1px solid rgba(76, 175, 80, 0.2)`,
    },
  },

  // Layout styles
  layout: {
    main: {
      display: 'flex',
      flexDirection: 'column' as const,
      minHeight: '100vh',
    },
    
    container: {
      mt: 4,
      px: 2,
    },

    pageContainer: {
      flexGrow: 1,
      py: { xs: 2, md: 4 },
    },
  },

  // Content styles
  content: {
    paper: {
      elevation: 0,
      padding: designTokens.spacing.lg,
      backgroundColor: designTokens.colors.grey[50],
      borderRadius: designTokens.borderRadius.md,
    },

    formulaPaper: {
      elevation: 2,
      padding: designTokens.spacing.md,
      backgroundColor: designTokens.colors.grey[50],
      borderRadius: designTokens.borderRadius.md,
    },

    formulaBox: {
      padding: designTokens.spacing.md,
      backgroundColor: '#fff',
      borderRadius: designTokens.borderRadius.sm,
      boxShadow: designTokens.shadows.xs,
      marginBottom: designTokens.spacing.md,
      textAlign: 'center' as const,
      fontFamily: 'monospace',
      fontSize: designTokens.typography.fontSizes.md,
    },

    examplePaper: {
      elevation: 1,
      padding: designTokens.spacing.md,
      backgroundColor: '#e3f2fd',
      borderLeft: `4px solid ${designTokens.colors.primary.main}`,
      borderRadius: designTokens.borderRadius.sm,
    },
  },

  // Utility classes
  hidden: { display: 'none' },
  visible: { display: 'block' },
  
  // Responsive utilities
  responsive: {
    textJustify: {
      textAlign: 'justify' as const,
      '@media (max-width: 600px)': {
        textAlign: 'justify' as const,
      },
      '@media (min-width: 601px)': {
        textAlign: 'left' as const,
      },
    },
  },
} as const;

// Helper function para combinar estilos
export const combineStyles = (...styles: Array<Record<string, any>>) => {
  return styles.reduce((acc, style) => ({ ...acc, ...style }), {});
};

// Helper function para estilos condicionais
export const conditionalStyle = (condition: boolean, trueStyle: Record<string, any>, falseStyle: Record<string, any> = {}) => {
  return condition ? trueStyle : falseStyle;
};