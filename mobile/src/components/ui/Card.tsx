import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { Tokens } from '../../theme/tokens';

export interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
}

export function Card({ children, style, elevated = false }: CardProps) {
  return (
    <View style={[styles.card, elevated && styles.elevated, style]}>
      {children}
    </View>
  );
}

export function CardHeader({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function CardTitle({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export function CardDescription({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

export function CardContent({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.content, style]}>{children}</View>;
}

export function CardFooter({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Tokens.colors.surface,
    borderRadius: Tokens.radii.lg,
    borderWidth: 1,
    borderColor: Tokens.colors.surfaceBorder,
    overflow: 'hidden'
  },
  elevated: {
    backgroundColor: Tokens.colors.surfaceElevated,
    borderColor: Tokens.colors.surfaceBorderStrong,
    ...Tokens.shadows.card
  },
  header: {
    paddingHorizontal: Tokens.spacing.lg,
    paddingTop: Tokens.spacing.lg,
    paddingBottom: Tokens.spacing.sm
  },
  title: {
    fontSize: Tokens.typography.h3.fontSize,
    fontWeight: Tokens.typography.h3.fontWeight,
    color: Tokens.colors.textPrimary
  },
  description: {
    fontSize: Tokens.typography.caption.fontSize,
    color: Tokens.colors.textSecondary,
    marginTop: Tokens.spacing.xs
  },
  content: {
    paddingHorizontal: Tokens.spacing.lg,
    paddingVertical: Tokens.spacing.md
  },
  footer: {
    paddingHorizontal: Tokens.spacing.lg,
    paddingBottom: Tokens.spacing.lg,
    paddingTop: Tokens.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Tokens.colors.surfaceBorder
  }
});
