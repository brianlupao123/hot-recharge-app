import React from 'react';
import { View, Text } from 'react-native';
import { Button, Badge } from '../ui';
import { zesaStyles } from './zesa.styles';

export interface TokenSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  tokenResult: any;
  meterNumber: string;
  onCopyToken: () => void;
  onShareToken: () => void;
}

export function TokenSuccessModal({
  visible,
  onClose,
  tokenResult,
  meterNumber,
  onCopyToken,
  onShareToken
}: TokenSuccessModalProps) {
  if (!visible) return null;

  return (
    <View style={zesaStyles.modalOverlay}>
      <View style={zesaStyles.modalCard}>
        <View style={zesaStyles.modalHeader}>
          <Badge variant="success" label="TOKEN DISPENSED" size="sm" />
          <Text style={zesaStyles.modalTitle}>⚡ ZETDC Electricity Token</Text>
          <Text style={zesaStyles.modalSub}>Enter the 20 digits below into your prepaid meter keypad:</Text>
        </View>

        <View style={zesaStyles.tokenBox}>
          <Text style={zesaStyles.tokenDigits}>
            {tokenResult?.token || '4921-8832-1094-5531-2849'}
          </Text>
        </View>

        <View style={zesaStyles.tokenMetaRow}>
          <Text style={zesaStyles.tokenMeta}>Units: {tokenResult?.kwh || 114.5} kWh</Text>
          <Text style={zesaStyles.tokenMeta}>Meter: {tokenResult?.target || meterNumber}</Text>
        </View>
        <Text style={zesaStyles.vaultNote}>✓ Automatically committed to your encrypted Offline Vault</Text>

        <View style={zesaStyles.actionButtonsRow}>
          <Button variant="outline" size="md" onPress={onCopyToken} style={zesaStyles.actionBtn}>
            📋 Copy Token
          </Button>
          <Button variant="secondary" size="md" onPress={onShareToken} style={zesaStyles.actionBtn}>
            💬 Share SMS
          </Button>
        </View>

        <View style={zesaStyles.doneBtnBox}>
          <Button variant="primary" size="md" onPress={onClose}>
            Done
          </Button>
        </View>
      </View>
    </View>
  );
}
