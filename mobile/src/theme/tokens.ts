/**
 * Design System Tokens for HOT Recharge Mobile & Web
 * Enterprise-grade semantic palette, typography, spacing, and elevation
 */

export const Tokens = {
  colors: {
    // Brand Core
    primary: '#E51937',
    primaryHover: '#C4132D',
    primarySubtle: 'rgba(229, 25, 55, 0.12)',
    secondary: '#F5A623',
    secondarySubtle: 'rgba(245, 166, 35, 0.12)',
    navy: '#0A2540',
    blue: '#0052CC',

    // Utility Accents
    zesaAmber: '#FFB800',
    zesaAmberSubtle: 'rgba(255, 184, 0, 0.12)',
    zesaGreen: '#10B981',
    zesaGreenSubtle: 'rgba(16, 185, 129, 0.12)',
    alertRed: '#EF4444',
    alertRedSubtle: 'rgba(239, 68, 68, 0.12)',

    // Carrier Colors
    econet: '#002B7F',
    netOne: '#FF6600',
    telecel: '#ED1C24',
    ecoCash: '#0C2340',

    // Surfaces & Canvas (Dark OLED Midnight)
    canvas: '#07090E',
    surface: '#0F1420',
    surfaceElevated: '#171E2E',
    surfaceHighlight: '#1F293D',
    surfaceBorder: 'rgba(255, 255, 255, 0.08)',
    surfaceBorderStrong: 'rgba(255, 255, 255, 0.16)',

    // Typography
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    textInverse: '#0B0F19'
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64
  },

  radii: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999
  },

  typography: {
    h1: { fontSize: 36, fontWeight: '900' as const, lineHeight: 44, letterSpacing: -0.5 },
    h2: { fontSize: 24, fontWeight: '800' as const, lineHeight: 32, letterSpacing: -0.3 },
    h3: { fontSize: 18, fontWeight: '700' as const, lineHeight: 26 },
    h4: { fontSize: 15, fontWeight: '700' as const, lineHeight: 22 },
    titleLarge: { fontSize: 22, fontWeight: '800' as const, lineHeight: 28, letterSpacing: -0.4 },
    titleMedium: { fontSize: 18, fontWeight: '700' as const, lineHeight: 24 },
    titleSmall: { fontSize: 15, fontWeight: '700' as const, lineHeight: 20 },
    body: { fontSize: 14, fontWeight: '400' as const, lineHeight: 22 },
    bodyMedium: { fontSize: 14, fontWeight: '600' as const, lineHeight: 22 },
    bodySmall: { fontSize: 12, fontWeight: '400' as const, lineHeight: 18 },
    labelSmall: { fontSize: 11, fontWeight: '600' as const, lineHeight: 16 },
    labelMedium: { fontSize: 13, fontWeight: '600' as const, lineHeight: 18 },
    caption: { fontSize: 12, fontWeight: '500' as const, lineHeight: 18 },
    mono: { fontSize: 13, fontWeight: '700' as const, letterSpacing: 1 }
  },

  shadows: {
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 12,
      elevation: 4
    },
    modal: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.5,
      shadowRadius: 28,
      elevation: 8
    }
  }
} as const;

export type ThemeTokens = typeof Tokens;
