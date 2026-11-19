import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { Tokens } from '../../theme/tokens';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  dot?: boolean;
}

const variantContainers: Record<BadgeVariant, ViewStyle> = {
  success: {
    backgroundColor: Tokens.colors.zesaGreenSubtle,
    borderColor: 'rgba(16, 185, 129, 0.35)'
  },
  warning: {
    backgroundColor: Tokens.colors.zesaAmberSubtle,
    borderColor: 'rgba(255, 184, 0, 0.35)'
  },
  danger: {
    backgroundColor: Tokens.colors.alertRedSubtle,
    borderColor: 'rgba(239, 68, 68, 0.35)'
  },
  info: {
    backgroundColor: 'rgba(0, 82, 204, 0.15)',
    borderColor: 'rgba(0, 82, 204, 0.35)'
  },
  neutral: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: Tokens.colors.surfaceBorder
  },
  brand: {
    backgroundColor: Tokens.colors.primarySubtle,
    borderColor: 'rgba(229, 25, 55, 0.35)'
  }
};

const variantLabels: Record<BadgeVariant, TextStyle> = {
  success: { color: '#6EE7B7' },
  warning: { color: '#FCD34D' },
  danger: { color: '#FCA5A5' },
  info: { color: '#93C5FD' },
  neutral: { color: Tokens.colors.textSecondary },
  brand: { color: '#F87171' }
};

const variantDots: Record<BadgeVariant, ViewStyle> = {
  success: { backgroundColor: Tokens.colors.zesaGreen },
  warning: { backgroundColor: Tokens.colors.zesaAmber },
  danger: { backgroundColor: Tokens.colors.alertRed },
  info: { backgroundColor: '#3B82F6' },
  neutral: { backgroundColor: Tokens.colors.textMuted },
  brand: { backgroundColor: Tokens.colors.primary }
};

export function Badge({
  children,
  variant = 'neutral',
  style,
  labelStyle,
  dot = false
}: BadgeProps) {
  return (
    <View style={[styles.badge, variantContainers[variant], style]}>
      {dot && <View style={[styles.dot, variantDots[variant]]} />}
      <Text style={[styles.label, variantLabels[variant], labelStyle]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: Tokens.radii.full,
    borderWidth: 1,
    gap: 6
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3
  }
});
