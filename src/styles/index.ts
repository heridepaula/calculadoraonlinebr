// Main styles export file
export { classes, combineStyles, conditionalStyle } from './classes';
export { componentStyles, createColoredStyle, responsiveStyle, hoverStyle } from './components';
export { designTokens } from './theme';

// Helper function to merge multiple style objects
export const mergeStyles = (...styles: Record<string, any>[]) => {
  return Object.assign({}, ...styles);
};

// Helper for conditional styles with fallback
export const styleIf = (condition: boolean, style: Record<string, any>, fallback: Record<string, any> = {}) => {
  return condition ? style : fallback;
};

// Helper for responsive breakpoint styles
export const breakpointStyles = {
  mobile: '@media (max-width: 599px)',
  tablet: '@media (min-width: 600px) and (max-width: 959px)',
  desktop: '@media (min-width: 960px)',
  largeDesktop: '@media (min-width: 1280px)',
};

// Common animation easing functions
export const easings = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
};