import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Tokens } from '../../theme/tokens';
import { Card } from './Card';
import { Badge, BadgeVariant } from './Badge';

export interface KpiCardProps {
  label: string;
  value: string;
  subtitle?: string;
  badge?: { label: string; variant?: BadgeVariant };
  valueColor?: string;
  borderColor?: string;
  style?: ViewStyle;
}

export function KpiCard({
  label,
  value,
  subtitle,
  badge,
  valueColor,
  borderColor,
  style
}: KpiCardProps) {
  return (
    <Card style={[styles.card, borderColor ? { borderColor } : null, style]}>
      <Card.Content>
        <View style={styles.topRow}>
          <Text style={styles.label}>{label}</Text>
          {badge && <Badge variant={badge.variant || 'brand'} label={badge.label} size="sm" />}
        </View>
        <Text style={[styles.value, valueColor ? { color: valueColor } : null]}>{value}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 240
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Tokens.spacing.xs
  },
  label: {
    fontSize: Tokens.typography?.labelSmall?.fontSize || 11,
    color: Tokens.colors.textSecondary,
    fontWeight: '600'
  },
  value: {
    fontSize: 26,
    fontWeight: '900',
    color: Tokens.colors.textPrimary,
    marginVertical: 4
  },
  subtitle: {
    fontSize: Tokens.typography?.bodySmall?.fontSize || 12,
    color: Tokens.colors.textMuted
  }
});
