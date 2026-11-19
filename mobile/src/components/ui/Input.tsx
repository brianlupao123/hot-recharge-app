import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp
} from 'react-native';
import { Tokens } from '../../theme/tokens';

export interface InputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  isPassword = false,
  containerStyle,
  style,
  ...props
}: InputProps) {
  const [secure, setSecure] = useState(isPassword);
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputWrapper,
          focused && styles.focusedWrapper,
          error ? styles.errorWrapper : null
        ]}
      >
        {leftIcon && <View style={styles.leftIconSlot}>{leftIcon}</View>}

        <RNTextInput
          placeholderTextColor={Tokens.colors.textMuted}
          secureTextEntry={isPassword ? secure : props.secureTextEntry}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          style={[styles.input, style]}
          {...props}
        />

        {isPassword ? (
          <TouchableOpacity
            style={styles.rightIconSlot}
            onPress={() => setSecure(!secure)}
            activeOpacity={0.7}
          >
            <Text style={styles.eyeToggleText}>{secure ? '👁' : '🙈'}</Text>
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={styles.rightIconSlot}>{rightIcon}</View>
        ) : null}
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Tokens.spacing.md
  },
  label: {
    fontSize: Tokens.typography.caption.fontSize,
    fontWeight: '600',
    color: Tokens.colors.textSecondary,
    marginBottom: Tokens.spacing.xs
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121724',
    borderWidth: 1,
    borderColor: Tokens.colors.surfaceBorderStrong,
    borderRadius: Tokens.radii.sm,
    minHeight: 46,
    paddingHorizontal: Tokens.spacing.md
  },
  focusedWrapper: {
    borderColor: Tokens.colors.primary,
    backgroundColor: '#161D2E'
  },
  errorWrapper: {
    borderColor: Tokens.colors.alertRed
  },
  leftIconSlot: {
    marginRight: Tokens.spacing.sm
  },
  rightIconSlot: {
    marginLeft: Tokens.spacing.sm
  },
  eyeToggleText: {
    fontSize: 14,
    opacity: 0.8
  },
  input: {
    flex: 1,
    color: Tokens.colors.textPrimary,
    fontSize: Tokens.typography.body.fontSize,
    paddingVertical: Tokens.spacing.sm
  },
  errorText: {
    fontSize: 11,
    color: Tokens.colors.alertRed,
    marginTop: 4,
    fontWeight: '500'
  },
  helperText: {
    fontSize: 11,
    color: Tokens.colors.textMuted,
    marginTop: 4
  }
});
