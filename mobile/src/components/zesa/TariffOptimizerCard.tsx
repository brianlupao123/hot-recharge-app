import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Input, Badge } from '../ui';
import { CurrencyType } from '../../types';
import { zesaStyles } from './zesa.styles';

export interface TariffOptimizerCardProps {
  amount: string;
  onAmountChange: (val: string) => void;
  currency: CurrencyType;
  onToggleCurrency: () => void;
  estKwh: string;
}

export function TariffOptimizerCard({
  amount,
  onAmountChange,
  currency,
  onToggleCurrency,
  estKwh
}: TariffOptimizerCardProps) {
  const quickOptions = currency === 'USD' ? ['5', '10', '20', '50'] : ['100', '250', '500', '1000'];

  return (
    <Card style={{ marginBottom: 16 }}>
      <Card.Header>
        <View style={zesaStyles.cardHeaderBetween}>
          <Card.Title>Recharge Amount</Card.Title>
          <TouchableOpacity onPress={onToggleCurrency}>
            <Badge variant="brand" label={`Currency: ${currency} (Switch)`} size="sm" />
          </TouchableOpacity>
        </View>
        <Card.Description>Select denomination or specify custom amount</Card.Description>
      </Card.Header>
      <Card.Content>
        <Input
          label={`Amount in ${currency}`}
          placeholder="e.g. 20"
          value={amount}
          onChangeText={onAmountChange}
          keyboardType="decimal-pad"
        />

        {/* Quick Amount Chips */}
        <View style={zesaStyles.chipsRow}>
          {quickOptions.map((val) => (
            <TouchableOpacity
              key={val}
              style={[zesaStyles.amountChip, amount === val && zesaStyles.amountChipActive]}
              onPress={() => onAmountChange(val)}
            >
              <Text style={[zesaStyles.amountChipText, amount === val && zesaStyles.amountChipTextActive]}>
                {currency === 'USD' ? `$${val}` : `${val} ZiG`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stepped Lifeline Tariff Optimizer */}
        <View style={zesaStyles.tariffBox}>
          <View style={zesaStyles.tariffTop}>
            <Text style={zesaStyles.tariffTitle}>📊 Lifeline Tariff Optimizer</Text>
            <Text style={zesaStyles.tariffUnits}>~ {estKwh} kWh</Text>
          </View>
          <View style={zesaStyles.progressTrack}>
            <View style={[zesaStyles.progressFill, { width: `${Math.min(100, (parseFloat(estKwh) / 200) * 100)}%` }]} />
          </View>
          <Text style={zesaStyles.tariffSub}>
            Subsidized Lifeline Band 1 applied up to 50 kWh. Optimize monthly purchases for maximum utility efficiency.
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}
