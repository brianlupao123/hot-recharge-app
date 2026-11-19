import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '../ui';
import { zesaStyles } from './zesa.styles';

export type PaymentRailType = 'EcoCash' | 'OneMoney' | 'InnBucks' | 'Wallet';

export interface PaymentRailSelectorProps {
  selectedRail: PaymentRailType;
  onSelectRail: (rail: PaymentRailType) => void;
}

const RAILS: { id: PaymentRailType; label: string }[] = [
  { id: 'EcoCash', label: 'EcoCash USD/ZiG' },
  { id: 'OneMoney', label: 'OneMoney' },
  { id: 'InnBucks', label: 'InnBucks' },
  { id: 'Wallet', label: 'In-App Wallet' }
];

export function PaymentRailSelector({ selectedRail, onSelectRail }: PaymentRailSelectorProps) {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Card.Header>
        <Card.Title>Settlement Payment Method</Card.Title>
        <Card.Description>Select direct mobile money rail or instant in-app wallet balance</Card.Description>
      </Card.Header>
      <Card.Content>
        <View style={zesaStyles.paymentRails}>
          {RAILS.map((rail) => (
            <TouchableOpacity
              key={rail.id}
              style={[zesaStyles.railItem, selectedRail === rail.id && zesaStyles.railItemActive]}
              onPress={() => onSelectRail(rail.id)}
            >
              <Text style={[zesaStyles.railText, selectedRail === rail.id && zesaStyles.railTextActive]}>
                {rail.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
}
