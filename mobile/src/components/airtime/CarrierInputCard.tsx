import React from 'react';
import { View, Text } from 'react-native';
import { Card, Input, Badge } from '../ui';
import { CurrencyType } from '../../types';
import { airtimeStyles } from './airtime.styles';

export interface CarrierInfo {
  name: string;
  color: string;
  productId: number;
  code: string;
}

export interface CarrierInputCardProps {
  phoneNumber: string;
  onPhoneChange: (val: string) => void;
  carrier: CarrierInfo;
  currency: CurrencyType;
}

export function CarrierInputCard({
  phoneNumber,
  onPhoneChange,
  carrier,
  currency
}: CarrierInputCardProps) {
  return (
    <Card style={airtimeStyles.sectionCard}>
      <Card.Header>
        <Card.Title>Recipient Handset</Card.Title>
        <Card.Description>Enter 10-digit mobile number with carrier auto-detection</Card.Description>
      </Card.Header>
      <Card.Content>
        <Input
          label="Mobile Number"
          placeholder="e.g. 0784529134"
          value={phoneNumber}
          onChangeText={onPhoneChange}
          keyboardType="phone-pad"
        />

        {/* Carrier Detection Badge */}
        <View style={airtimeStyles.carrierRow}>
          <View style={[airtimeStyles.carrierDot, { backgroundColor: carrier.color }]} />
          <Text style={[airtimeStyles.carrierText, { color: carrier.color }]}>
            {carrier.name}
          </Text>
          <Badge variant="neutral" label={currency} size="sm" />
        </View>
      </Card.Content>
    </Card>
  );
}
