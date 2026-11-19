import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Input, Badge } from '../ui';
import { SavedMeter } from '../../services/api';
import { Tokens } from '../../theme/tokens';

export interface MeterFleetItemProps {
  meter: SavedMeter;
  isSelected: boolean;
  amount: string;
  onToggleSelect: () => void;
  onAmountChange: (amount: string) => void;
}

export function MeterFleetItem({
  meter,
  isSelected,
  amount,
  onToggleSelect,
  onAmountChange
}: MeterFleetItemProps) {
  const isLowPower = meter.estRemainingKwh < 10;

  return (
    <Card
      style={[styles.meterCard, isSelected && styles.meterCardSelected]}
      onPress={onToggleSelect}
    >
      <Card.Content>
        <View style={styles.meterHeader}>
          <View style={styles.meterLeft}>
            <View style={[styles.checkboxBox, isSelected && styles.checkboxBoxActive]}>
              {isSelected && <Text style={styles.checkMark}>✓</Text>}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.nickname}>{meter.nickname}</Text>
              <Text style={styles.meterNumber}>Meter: {meter.meterNumber}</Text>
              <Text style={styles.customerName}>Tenant: {meter.customerName}</Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Badge
              variant={isLowPower ? 'danger' : 'success'}
              label={isLowPower ? `LOW: ${meter.estRemainingKwh} kWh` : `${meter.estRemainingKwh} kWh`}
              size="sm"
            />
          </View>
        </View>

        {isSelected && (
          <View style={styles.amountInputRow}>
            <Text style={styles.amountLabel}>Recharge Amount (USD):</Text>
            <View style={{ width: 140 }}>
              <Input
                placeholder="20"
                value={amount}
                onChangeText={onAmountChange}
                keyboardType="numeric"
              />
            </View>
          </View>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  meterCard: {
    marginBottom: Tokens.spacing.sm
  },
  meterCardSelected: {
    borderColor: Tokens.colors.hotRed,
    backgroundColor: 'rgba(229, 25, 55, 0.05)'
  },
  meterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  meterLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Tokens.spacing.sm,
    flex: 1
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: Tokens.radii.xs,
    borderWidth: 1.5,
    borderColor: Tokens.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2
  },
  checkboxBoxActive: {
    borderColor: Tokens.colors.hotRed,
    backgroundColor: Tokens.colors.hotRed
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900'
  },
  nickname: {
    fontSize: 15,
    fontWeight: '700',
    color: Tokens.colors.textPrimary
  },
  meterNumber: {
    fontSize: 12,
    color: Tokens.colors.textSecondary,
    fontFamily: 'monospace',
    marginTop: 2
  },
  customerName: {
    fontSize: 12,
    color: Tokens.colors.textMuted,
    marginTop: 2
  },
  amountInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Tokens.spacing.sm,
    paddingTop: Tokens.spacing.xs,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)'
  },
  amountLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Tokens.colors.textSecondary
  }
});
