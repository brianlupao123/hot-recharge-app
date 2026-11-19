import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Input, Badge } from '../ui';
import { CurrencyType } from '../../types';
import { airtimeStyles } from './airtime.styles';

export interface AirtimeAmountCardProps {
  amount: string;
  onAmountChange: (val: string) => void;
  currency: CurrencyType;
  onToggleCurrency: () => void;
}

export function AirtimeAmountCard({
  amount,
  onAmountChange,
  currency,
  onToggleCurrency
}: AirtimeAmountCardProps) {
  const quickPills = currency === 'USD' ? ['1', '2', '5', '10', '20'] : ['20', '50', '100', '250', '500'];

  return (
    <Card style={airtimeStyles.sectionCard}>
      <Card.Header>
        <View style={airtimeStyles.cardHeaderBetween}>
          <Card.Title>Airtime Value</Card.Title>
          <TouchableOpacity onPress={onToggleCurrency}>
            <Badge variant="brand" label={`Currency: ${currency} (Switch)`} size="sm" />
          </TouchableOpacity>
        </View>
        <Card.Description>Select quick top-up amount or specify custom denomination</Card.Description>
      </Card.Header>
      <Card.Content>
        <Input
          label="Custom Amount"
          placeholder="Enter Amount"
          value={amount}
          onChangeText={onAmountChange}
          keyboardType="decimal-pad"
        />

        {/* Quick Preset Chips */}
        <View style={airtimeStyles.chipsRow}>
          {quickPills.map((val) => (
            <TouchableOpacity
              key={val}
              style={[airtimeStyles.amountChip, amount === val && airtimeStyles.amountChipActive]}
              onPress={() => onAmountChange(val)}
            >
              <Text style={[airtimeStyles.amountChipText, amount === val && airtimeStyles.amountChipTextActive]}>
                {currency === 'USD' ? `$${val}` : `${val} ZiG`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
}
