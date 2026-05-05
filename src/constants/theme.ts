export const Colors = {
  primary: '#1A73E8',
  primaryDark: '#1557B0',
  primaryLight: '#E8F0FE',
  secondary: '#00C853',
  secondaryDark: '#009624',
  secondaryLight: '#E8F5E9',
  accent: '#FF6D00',
  accentLight: '#FFF3E0',
  danger: '#D32F2F',
  dangerLight: '#FFEBEE',
  warning: '#F9A825',
  warningLight: '#FFF8E1',
  success: '#2E7D32',
  successLight: '#E8F5E9',
  info: '#0288D1',
  infoLight: '#E1F5FE',

  background: '#F5F7FA',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  border: '#E0E0E0',
  divider: '#F0F0F0',

  text: '#1A1A2E',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textLight: '#FFFFFF',
  textOnPrimary: '#FFFFFF',

  star: '#FFB300',
  online: '#4CAF50',
  offline: '#9E9E9E',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 48,
};

export const FontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  xxxl: 28,
  hero: 34,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  xxl: 28,
  full: 9999,
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};
