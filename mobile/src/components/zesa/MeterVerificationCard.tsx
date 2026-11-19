import React from 'react';
import { View, Text } from 'react-native';
import { Card, Input, Button, Badge } from '../ui';
import { zesaStyles } from './zesa.styles';

export interface MeterVerificationCardProps {
  meterNumber: string;
  onMeterChange: (val: string) => void;
  validating: boolean;
  customerInfo: any;
  onScanPress: () => void;
}

export function MeterVerificationCard({
  meterNumber,
  onMeterChange,
  validating,
  customerInfo,
  onScanPress
}: MeterVerificationCardProps) {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Card.Header>
        <View style={zesaStyles.cardHeaderBetween}>
          <Card.Title>ZETDC Prepaid Meter</Card.Title>
          <Button variant="outline" size="sm" onPress={onScanPress}>
            📷 Scan Card
          </Button>
        </View>
        <Card.Description>Enter 11-digit or 13-digit meter number for real-time validation</Card.Description>
      </Card.Header>
      <Card.Content>
        <Input
          label="Meter Number"
          placeholder="e.g. 04192837461"
          value={meterNumber}
          onChangeText={onMeterChange}
          keyboardType="number-pad"
        />

        {validating && (
          <View style={zesaStyles.statusBox}>
            <Badge variant="info" label="Querying ZETDC Database..." size="sm" />
          </View>
        )}

        {customerInfo && (
          <View style={zesaStyles.verifiedBox}>
            <View style={zesaStyles.verifiedTop}>
              <Text style={zesaStyles.verifiedName}>✓ {customerInfo.customerName}</Text>
              <Badge variant="success" label="VERIFIED METER" size="sm" />
            </View>
            {customerInfo.address && (
              <Text style={zesaStyles.verifiedAddress}>{customerInfo.address}</Text>
            )}
            {customerInfo.meterType && (
              <Text style={zesaStyles.verifiedMeter}>Meter Type: {customerInfo.meterType}</Text>
            )}
          </View>
        )}
      </Card.Content>
    </Card>
  );
}
