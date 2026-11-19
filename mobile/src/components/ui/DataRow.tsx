import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Tokens } from '../../theme/tokens';

export interface DataRowProps {
  label: string;
  value?: string | ReactNode;
  valueColor?: string;
  isMonospace?: boolean;
  highlight?: boolean;
  style?: ViewStyle;
}

export function DataRow({
  label,
  value,
  valueColor,
  isMonospace,
  highlight,
  style
}: DataRowProps) {
  return (
    <View style={[styles.row, highlight ? styles.highlightRow : null, style]}>
      <Text style={[styles.label, highlight ? styles.highlightLabel : null]}>{label}</Text>
      {typeof value === 'string' ? (
        <Text
          style={[
            styles.value,
            valueColor ? { color: valueColor } : null,
            isMonospace ? styles.monospace : null,
            highlight ? styles.highlightValue : null
          ]}
        >
          {value}
        </Text>
      ) : (
        value
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)'
  },
  label: {
    fontSize: 13,
    color: Tokens.colors.textSecondary,
    fontWeight: '500'
  },
  value: {
    fontSize: 13,
    color: Tokens.colors.textPrimary,
    fontWeight: '700'
  },
  monospace: {
    fontFamily: 'monospace',
    letterSpacing: 0.5
  },
  highlightRow: {
    marginTop: 4,
    borderBottomWidth: 0,
    paddingVertical: 10
  },
  highlightLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF'
  },
  highlightValue: {
    fontSize: 17,
    fontWeight: '900',
    color: Tokens.colors.hotGold
  }
});
