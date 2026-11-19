import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Alert,
  Clipboard,
  Share,
  Platform
} from 'react-native';
import { Container, Button, PageHeader } from '../components/ui';
import { Tokens } from '../theme/tokens';
import { ApiService } from '../services/api';
import CameraMeterScannerModal from '../components/CameraMeterScannerModal';
import PaymentStateMachineModal from '../components/PaymentStateMachineModal';
import { useWallet } from '../context/WalletContext';

import { MeterVerificationCard } from '../components/zesa/MeterVerificationCard';
import { TariffOptimizerCard } from '../components/zesa/TariffOptimizerCard';
import { PaymentRailSelector, PaymentRailType } from '../components/zesa/PaymentRailSelector';
import { TokenSuccessModal } from '../components/zesa/TokenSuccessModal';

export default function ZesaScreen({ route }: any) {
  const { currency, toggleCurrency, deductBalance } = useWallet();
  const [meterNumber, setMeterNumber] = useState(route?.params?.meter || '04192837461');
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  const [amount, setAmount] = useState('20');
  const [validating, setValidating] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentRailType>('EcoCash');
  const [tokenResult, setTokenResult] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [pipelineVisible, setPipelineVisible] = useState(false);

  // Auto-verify meter number when length >= 10
  const verifyMeter = async (meter: string) => {
    if (meter.length >= 10) {
      setValidating(true);
      try {
        const info = await ApiService.verifyCustomer(41, meter);
        setCustomerInfo(info);
      } catch (err) {
        console.warn('Verification error', err);
      } finally {
        setValidating(false);
      }
    } else {
      setCustomerInfo(null);
    }
  };

  useEffect(() => {
    if (meterNumber) {
      verifyMeter(meterNumber);
    }
  }, [meterNumber]);

  const handleStartPurchase = () => {
    const numAmount = parseFloat(amount);
    if (!meterNumber || isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid meter number and amount');
      return;
    }
    setPipelineVisible(true);
  };

  const handlePipelineComplete = async (res: any) => {
    setTokenResult({
      ...res,
      target: meterNumber,
      amount: parseFloat(amount),
      currency
    });
    setPipelineVisible(false);
    setModalVisible(true);

    if (paymentMethod === 'Wallet') {
      deductBalance(parseFloat(amount), currency);
    }

    // Save to Offline Vault
    await ApiService.saveToOfflineVault({
      id: `HOT-${Date.now()}`,
      type: 'ZESA',
      target: meterNumber,
      customerName: customerInfo?.customerName || 'Brian Lupao',
      amount: parseFloat(amount),
      currency,
      token: res.token,
      kwh: res.kwh,
      receiptNumber: res.receiptNumber,
      timestamp: new Date().toISOString()
    });
  };

  const copyToken = () => {
    if (tokenResult?.token) {
      const clean = tokenResult.token.replace(/-/g, '');
      if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(clean);
      } else if (Clipboard && Clipboard.setString) {
        Clipboard.setString(clean);
      }
      Alert.alert('Copied! 📋', '20-digit token copied to clipboard.');
    }
  };

  const shareToken = async () => {
    if (tokenResult) {
      const message = `⚡ ZESA Electricity Token\nToken: ${tokenResult.token}\nUnits: ${tokenResult.kwh || 114.5} kWh\nMeter: ${tokenResult.target}\nCustomer: ${customerInfo?.customerName || 'Registered Account'}\nReceipt: ${tokenResult.receiptNumber || 'HOT-REC'}\nIssued by HOT Recharge V3`;
      try {
        if (Platform.OS === 'web') {
          if (typeof navigator !== 'undefined' && navigator.share) {
            await navigator.share({ title: 'ZESA Electricity Token', text: message });
          } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
            await navigator.clipboard.writeText(message);
            Alert.alert('Copied for Sharing! 📲', 'Token details copied to clipboard. You can paste into WhatsApp or SMS.');
          }
        } else {
          await Share.share({ message });
        }
      } catch (err) {
        // Share cancelled
      }
    }
  };

  const estKwh = parseFloat(amount) ? (parseFloat(amount) / (currency === 'USD' ? 0.15 : 4.5)).toFixed(1) : '0';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Tokens.colors.background }}>
      <Container maxWidth={920} style={{ paddingVertical: Tokens.spacing.lg }}>
        <PageHeader
          title="Buy ZESA Prepaid Electricity"
          subtitle="Official real-time token dispensation from ZETDC national grid infrastructure via HOT Recharge V3 API."
          badges={[
            { label: 'ZETDC PREPAID GATEWAY', variant: 'warning' },
            { label: 'HOT V3 DIRECT PROTOCOL', variant: 'success' }
          ]}
        />

        <MeterVerificationCard
          meterNumber={meterNumber}
          onMeterChange={(val) => setMeterNumber(val.replace(/[^0-9]/g, ''))}
          validating={validating}
          customerInfo={customerInfo}
          onScanPress={() => setScannerVisible(true)}
        />

        <TariffOptimizerCard
          amount={amount}
          onAmountChange={setAmount}
          currency={currency}
          onToggleCurrency={toggleCurrency}
          estKwh={estKwh}
        />

        <PaymentRailSelector
          selectedRail={paymentMethod}
          onSelectRail={setPaymentMethod}
        />

        <Button
          variant="primary"
          size="lg"
          disabled={!meterNumber || !amount}
          onPress={handleStartPurchase}
        >
          Pay {currency === 'USD' ? `$${amount}` : `${amount} ZiG`} & Launch Order Pipeline
        </Button>

        <CameraMeterScannerModal
          visible={scannerVisible}
          onDismiss={() => setScannerVisible(false)}
          onMeterScanned={(scanned) => {
            setMeterNumber(scanned);
            verifyMeter(scanned);
          }}
        />

        <PaymentStateMachineModal
          visible={pipelineVisible}
          onDismiss={() => setPipelineVisible(false)}
          onComplete={handlePipelineComplete}
          orderDetails={{
            target: meterNumber,
            customerName: customerInfo?.customerName || 'Brian Lupao',
            amount: parseFloat(amount || '20'),
            currency,
            paymentMethod,
            isZesa: true
          }}
        />

        <TokenSuccessModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          tokenResult={tokenResult}
          meterNumber={meterNumber}
          onCopyToken={copyToken}
          onShareToken={shareToken}
        />

        <View style={{ height: 48 }} />
      </Container>
    </ScrollView>
  );
}
