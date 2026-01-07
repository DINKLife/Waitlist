/**
 * Brand Colors and Design Tokens
 */

export const BRAND_COLORS = {
  primary: {
    dark: '#002860',
    main: '#015EC2',
    light: '#D7E7FF',
  },
  white: '#FFFFFF',
} as const;

export const BRAND_COLORS_RGBA = {
  primaryDark: {
    85: 'rgba(0, 40, 96, 0.85)',
    50: 'rgba(0, 40, 96, 0.5)',
    40: 'rgba(0, 40, 96, 0.4)',
    30: 'rgba(0, 40, 96, 0.3)',
    10: 'rgba(0, 40, 96, 0.1)',
  },
  primary: {
    50: 'rgba(1, 94, 194, 0.5)',
    30: 'rgba(1, 94, 194, 0.3)',
    20: 'rgba(1, 94, 194, 0.2)',
    10: 'rgba(1, 94, 194, 0.1)',
  },
  primaryLight: {
    60: 'rgba(215, 231, 255, 0.6)',
    50: 'rgba(215, 231, 255, 0.5)',
    30: 'rgba(215, 231, 255, 0.3)',
    20: 'rgba(215, 231, 255, 0.2)',
    10: 'rgba(215, 231, 255, 0.1)',
  },
} as const;

export const BRAND_GRADIENTS = {
  primary: 'linear-gradient(135deg, #002860 0%, #015EC2 100%)',
  light: 'linear-gradient(135deg, #015EC2 0%, #D7E7FF 100%)',
  overlay: 'linear-gradient(90deg, rgba(1, 94, 194, 0.2) 0%, rgba(215, 231, 255, 0.1) 100%)',
} as const;

export const WAITLIST_FORM_URL = 'https://forms.gle/5q334TSWGMcVDd1fA';

