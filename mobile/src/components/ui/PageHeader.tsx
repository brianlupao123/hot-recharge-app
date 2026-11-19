import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tokens } from '../../theme/tokens';
import { Badge, BadgeVariant } from './Badge';

export interface PageHeaderBadge {
  label: string;
  variant?: BadgeVariant;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badges?: PageHeaderBadge[];
}

export function PageHeader({ title, subtitle, badges }: PageHeaderProps) {
  return (
    <View style={styles.header}>
      {badges && badges.length > 0 && (
        <View style={styles.badgeRow}>
          {badges.map((b, i) => (
            <Badge key={i} variant={b.variant || 'brand'} label={b.label} size="sm" />
          ))}
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: Tokens.spacing.lg
  },
  badgeRow: {
    flexDirection: 'row',
    gap: Tokens.spacing.xs,
    marginBottom: Tokens.spacing.xs,
    flexWrap: 'wrap'
  },
  title: {
    fontSize: Tokens.typography?.titleLarge?.fontSize || 22,
    fontWeight: (Tokens.typography?.titleLarge?.fontWeight as any) || '800',
    color: Tokens.colors.textPrimary,
    letterSpacing: -0.5
  },
  sub: {
    fontSize: Tokens.typography?.bodyMedium?.fontSize || 14,
    color: Tokens.colors.textSecondary,
    marginTop: 4,
    lineHeight: 20
  }
});
