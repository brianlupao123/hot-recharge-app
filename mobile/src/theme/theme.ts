import { MD3DarkTheme } from 'react-native-paper';
import { Tokens } from './tokens';

export const Colors = {
  // Brand
  hotRed: Tokens.colors.primary,
  hotRedDark: Tokens.colors.primaryHover,
  hotGold: Tokens.colors.secondary,
  cszNavy: Tokens.colors.navy,
  cszBlue: Tokens.colors.blue,

  // Utilities
  zesaAmber: Tokens.colors.zesaAmber,
  zesaGreen: Tokens.colors.zesaGreen,
  alertRed: Tokens.colors.alertRed,

  // Carriers
  econetBlue: Tokens.colors.econet,
  netOneOrange: Tokens.colors.netOne,
  telecelRed: Tokens.colors.telecel,
  ecoCashNavy: Tokens.colors.ecoCash,
  innBucksPurple: '#7B1FA2',

  // Canvas & Surfaces
  background: Tokens.colors.canvas,
  surface: Tokens.colors.surface,
  surfaceElevated: Tokens.colors.surfaceElevated,
  border: Tokens.colors.surfaceBorder,
  textPrimary: Tokens.colors.textPrimary,
  textSecondary: Tokens.colors.textSecondary,
  textMuted: Tokens.colors.textMuted
};

export const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: Tokens.colors.primary,
    secondary: Tokens.colors.secondary,
    background: Tokens.colors.canvas,
    surface: Tokens.colors.surface,
    elevation: {
      ...MD3DarkTheme.colors.elevation,
      level1: Tokens.colors.surface,
      level2: Tokens.colors.surfaceElevated
    }
  }
};
