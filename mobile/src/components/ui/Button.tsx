import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp
} from 'react-native';
import { Tokens } from '../../theme/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  style,
  labelStyle
}: ButtonProps) {
  const isActionDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={isActionDisabled ? undefined : onPress}
      style={[
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        isActionDisabled && styles.disabled,
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? Tokens.colors.primary : '#FFFFFF'}
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text
            style={[
              styles.labelBase,
              styles[`${variant}Label` as keyof typeof styles] as TextStyle,
              styles[`${size}Label` as keyof typeof styles] as TextStyle,
              labelStyle
            ]}
          >
            {children}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Tokens.radii.sm,
    gap: Tokens.spacing.xs
  },
  fullWidth: {
    width: '100%'
  },
  disabled: {
    opacity: 0.5
  },

  // Variants
  primary: {
    backgroundColor: Tokens.colors.primary,
    borderWidth: 1,
    borderColor: Tokens.colors.primary
  },
  secondary: {
    backgroundColor: Tokens.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Tokens.colors.surfaceBorderStrong
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)'
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0
  },
  danger: {
    backgroundColor: Tokens.colors.alertRed,
    borderWidth: 1,
    borderColor: Tokens.colors.alertRed
  },

  // Sizes
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    minHeight: 32
  },
  md: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    minHeight: 44
  },
  lg: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    minHeight: 52
  },

  // Labels
  labelBase: {
    fontWeight: '700',
    textAlign: 'center'
  },
  primaryLabel: {
    color: '#FFFFFF'
  },
  secondaryLabel: {
    color: Tokens.colors.textPrimary
  },
  outlineLabel: {
    color: Tokens.colors.textPrimary
  },
  ghostLabel: {
    color: Tokens.colors.textSecondary
  },
  dangerLabel: {
    color: '#FFFFFF'
  },

  // Size Labels
  smLabel: {
    fontSize: 12
  },
  mdLabel: {
    fontSize: 14
  },
  lgLabel: {
    fontSize: 16
  }
});
