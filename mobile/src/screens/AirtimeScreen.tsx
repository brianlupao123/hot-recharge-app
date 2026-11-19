import React, { useState, useEffect } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { Container, Button, Tabs, PageHeader } from '../components/ui';
import { Tokens } from '../theme/tokens';
import { ApiService } from '../services/api';
import { useWallet } from '../context/WalletContext';

import { CarrierInputCard, CarrierInfo } from '../components/airtime/CarrierInputCard';
import { AirtimeAmountCard } from '../components/airtime/AirtimeAmountCard';
import { BundlePackageList } from '../components/airtime/BundlePackageList';

export default function AirtimeScreen({ route }: any) {
  const { currency, toggleCurrency, deductBalance } = useWallet();
  const [phoneNumber, setPhoneNumber] = useState(route?.params?.phone || '0784529134');
  const [mode, setMode] = useState<'airtime' | 'bundles'>(route?.params?.tab === 'bundles' ? 'bundles' : 'airtime');
  const [amount, setAmount] = useState('5');
  const [selectedBundle, setSelectedBundle] = useState<string>('W30');
  const [bundles, setBundles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ApiService.getBundles().then(setBundles).catch(console.warn);
  }, []);

  const getCarrier = (num: string): CarrierInfo => {
    const clean = num.replace(/[^0-9]/g, '');
    if (clean.startsWith('077') || clean.startsWith('078')) {
      return { name: 'Econet Wireless', color: Tokens.colors.econetBlue, productId: currency === 'USD' ? 101 : 7, code: 'ECONET' };
    }
    if (clean.startsWith('071')) {
      return { name: 'NetOne Cellular', color: Tokens.colors.netOneOrange, productId: 102, code: 'NETONE' };
    }
    if (clean.startsWith('073')) {
      return { name: 'Telecel Zimbabwe', color: Tokens.colors.telecelRed, productId: currency === 'USD' ? 103 : 6, code: 'TELECEL' };
    }
    return { name: 'Detecting Network...', color: Tokens.colors.textMuted, productId: 100, code: 'DETECTING' };
  };

  const carrier = getCarrier(phoneNumber);

  const handlePurchase = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number');
      return;
    }

    const isBundle = mode === 'bundles';
    const bundleObj = bundles.find((b) => b.code === selectedBundle);
    const rechargeAmount = isBundle ? (bundleObj?.price || 3.5) : parseFloat(amount);

    if (isNaN(rechargeAmount) || rechargeAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please select or enter a valid recharge amount');
      return;
    }

    setLoading(true);
    try {
      const res = await ApiService.recharge({
        productId: isBundle ? 111 : carrier.productId,
        target: phoneNumber,
        amount: rechargeAmount,
        currency,
        productCode: isBundle ? selectedBundle : undefined,
        customerSMS: isBundle ? `Data bundle purchase for ${phoneNumber}` : `Airtime recharge for ${phoneNumber}`
      });

      // Deduct from in-app balance if funded
      deductBalance(rechargeAmount, currency);

      // Save to Offline Vault
      await ApiService.saveToOfflineVault({
        id: `AIR-${Date.now()}`,
        type: 'AIRTIME',
        target: phoneNumber,
        customerName: `${carrier.name} Subscriber`,
        amount: rechargeAmount,
        currency,
        receiptNumber: res.receiptNumber,
        timestamp: new Date().toISOString()
      });

      Alert.alert(
        'Success! 🎉',
        `${isBundle ? bundleObj?.name : `$${rechargeAmount} Airtime`} successfully credited to ${phoneNumber}.\nReceipt: ${res.receiptNumber}\nCommitted to your Offline Vault.`
      );
    } catch (err: any) {
      Alert.alert('Recharge Failed', err?.message || 'Transaction could not be completed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Tokens.colors.background }}>
      <Container maxWidth={920} style={{ paddingVertical: Tokens.spacing.lg }}>
        <PageHeader
          title="Airtime & Data Bundles"
          subtitle="Instant cross-network mobile airtime and data bundles direct to subscriber handset via HOT Recharge V3 API."
          badges={[
            { label: 'HOT V3 DIRECT FULFILLMENT', variant: 'brand' },
            { label: 'ECONET • NETONE • TELECEL', variant: 'success' }
          ]}
        />

        <View style={{ marginBottom: Tokens.spacing.lg }}>
          <Tabs
            tabs={[
              { key: 'airtime', label: 'Direct Airtime' },
              { key: 'bundles', label: 'Data & WhatsApp Bundles' }
            ]}
            activeKey={mode}
            onChange={(k) => setMode(k as any)}
          />
        </View>

        <CarrierInputCard
          phoneNumber={phoneNumber}
          onPhoneChange={(val) => setPhoneNumber(val.replace(/[^0-9]/g, ''))}
          carrier={carrier}
          currency={currency}
        />

        {mode === 'airtime' ? (
          <AirtimeAmountCard
            amount={amount}
            onAmountChange={setAmount}
            currency={currency}
            onToggleCurrency={toggleCurrency}
          />
        ) : (
          <BundlePackageList
            bundles={bundles}
            selectedBundle={selectedBundle}
            onSelectBundle={setSelectedBundle}
          />
        )}

        <Button
          variant="primary"
          size="lg"
          loading={loading}
          disabled={loading || !phoneNumber}
          onPress={handlePurchase}
        >
          Recharge {phoneNumber} ({mode === 'bundles' ? 'Bundle' : `${currency === 'USD' ? '$' : ''}${amount} ${currency}`})
        </Button>

        <View style={{ height: 48 }} />
      </Container>
    </ScrollView>
  );
}
