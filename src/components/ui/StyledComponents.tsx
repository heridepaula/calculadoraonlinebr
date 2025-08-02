import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardContent, TextField, Typography, Alert, LinearProgress } from '@mui/material';
import { designTokens } from '../../styles/theme';

// Container Components
export const CalculatorContainer = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({
  maxWidth: '800px',
  margin: '0 auto',
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const CalculatorContainerLarge = styled(Box)(({ theme }) => ({
  maxWidth: '1000px',
  margin: '0 auto',
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: 'md',
  margin: '0 auto',
  marginTop: theme.spacing(4),
}));

// Typography Components
export const CalculatorTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  fontWeight: 600,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.25rem',
  },
}));

export const CalculatorSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  textAlign: 'center',
  lineHeight: 1.6,
  color: theme.palette.text.secondary,
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.dark,
}));

// Button Components
export const PrimaryButton = styled(Button)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  fontSize: '1rem',
  fontWeight: 700,
  borderRadius: designTokens.borderRadius.md,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: '0px 4px 12px rgba(25, 118, 210, 0.4)',
  transition: `all ${designTokens.transitions.duration.short}ms ${designTokens.transitions.easing.easeInOut}`,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: '0px 6px 16px rgba(21, 101, 192, 0.5)',
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  fontSize: '1rem',
  fontWeight: 700,
  borderRadius: designTokens.borderRadius.md,
  borderColor: theme.palette.error.main,
  color: theme.palette.error.main,
  transition: `all ${designTokens.transitions.duration.short}ms ${designTokens.transitions.easing.easeInOut}`,
  '&:hover': {
    backgroundColor: '#ffe6e6',
    borderColor: theme.palette.error.dark,
    color: theme.palette.error.dark,
  },
}));

// Card Components
export const ResultCard = styled(Card)(({ theme }) => ({
  border: `2px solid ${theme.palette.success.main}33`, // 33 = 20% opacity in hex
  borderRadius: designTokens.borderRadius.xl,
  backgroundColor: `${theme.palette.success.main}14`, // 14 = 8% opacity in hex
  boxShadow: designTokens.shadows.md,
  transition: `all ${designTokens.transitions.duration.short}ms ${designTokens.transitions.easing.easeInOut}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: designTokens.shadows.lg,
  },
}));

export const ResultCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  '&:last-child': {
    paddingBottom: theme.spacing(3),
  },
}));

export const InfoCard = styled(Card)(({ theme }) => ({
  elevation: 0,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.grey[50],
  borderRadius: designTokens.borderRadius.md,
}));

export const WarningCard = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(3),
  borderRadius: designTokens.borderRadius.md,
  backgroundColor: `${theme.palette.warning.main}14`,
  border: `1px solid ${theme.palette.warning.main}33`,
}));

export const SuccessCard = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(3),
  borderRadius: designTokens.borderRadius.md,
  backgroundColor: `${theme.palette.success.main}0A`, // 0A = 4% opacity in hex
  border: `1px solid ${theme.palette.success.main}33`,
}));

// Input Components
export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: designTokens.borderRadius.sm,
  },
  '& .MuiOutlinedInput-root': {
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  '& .MuiInputBase-input': {
    fontSize: '1rem',
    padding: theme.spacing(1),
  },
}));

export const CenteredTextField = styled(StyledTextField)({
  '& .MuiInputBase-input': {
    textAlign: 'center',
    fontSize: '1.5rem',
    padding: designTokens.spacing.sm,
  },
});

// Progress Components
export const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 6,
  backgroundColor: `${theme.palette.primary.main}1A`, // 1A = 10% opacity in hex
  '& .MuiLinearProgress-bar': {
    borderRadius: 6,
  },
}));

// Layout Components
export const FlexCenter = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const FlexBetween = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const FlexColumn = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const GridContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

// Icon Components
export const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: '2rem',
  marginTop: theme.spacing(1),
  color: theme.palette.primary.main,
}));

// Result Display Components
export const ResultValue = styled(Typography)(({ theme }) => ({
  fontSize: '2.2rem',
  fontWeight: 700,
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    fontSize: '1.8rem',
  },
}));

export const ResultCategory = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const ResultIndicator = styled(Box)({
  display: 'inline-block',
  width: '12px',
  height: '12px',
  borderRadius: '50%',
});

// Form Components
export const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: `${theme.palette.info.main}0A`,
  borderRadius: designTokens.borderRadius.md,
}));

export const FormGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

// Content Paper Components
export const ContentPaper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  borderRadius: designTokens.borderRadius.md,
  marginBottom: theme.spacing(2),
}));

export const FormulaPaper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#fff',
  borderRadius: designTokens.borderRadius.sm,
  boxShadow: designTokens.shadows.xs,
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  fontFamily: 'monospace',
  fontSize: '1rem',
}));

export const ExamplePaper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#e3f2fd',
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  borderRadius: designTokens.borderRadius.sm,
}));

// Animation Components
export const AnimatedCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: designTokens.borderRadius.lg,
  overflow: 'hidden',
  transition: `transform ${designTokens.transitions.duration.short}ms ${designTokens.transitions.easing.easeInOut}, box-shadow ${designTokens.transitions.duration.standard}ms ${designTokens.transitions.easing.easeInOut}`,
  boxShadow: designTokens.shadows.sm,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: designTokens.shadows.lg,
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: designTokens.shadows.sm,
  },
}));

// Responsive Text
export const ResponsiveText = styled(Typography)(({ theme }) => ({
  textAlign: 'justify',
  lineHeight: 1.6,
  [theme.breakpoints.up('sm')]: {
    textAlign: 'left',
  },
}));