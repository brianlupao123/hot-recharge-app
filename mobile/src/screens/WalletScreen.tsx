import React, { useState } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { Container, PageHeader } from '../components/ui';
import { Tokens } from '../theme/tokens';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';

import { WalletBalanceGrid } from '../components/wallet/WalletBalanceGrid';
import { DepositFormCard } from '../components/wallet/DepositFormCard';
import { AccountProfileCard } from '../components/wallet/AccountProfileCard';

export default function WalletScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const { balanceUsd, balanceZig, currency, setCurrency, deposit } = useWallet();

  const [depositAmount, setDepositAmount] = useState('25');
  const [paymentRail, setPaymentRail] = useState('EcoCash');
  const [loading, setLoading] = useState(false);

  const handleDeposit = () => {
    const num = parseFloat(depositAmount);
    if (isNaN(num) || num <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid deposit amount.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      deposit(num, currency);
      Alert.alert(
        'Deposit Confirmed! 💳',
        `An approval prompt for ${currency === 'USD' ? `$${num.toFixed(2)}` : `${num.toFixed(2)} ZiG`} was processed via ${paymentRail}.\nYour in-app wallet balance has been updated.`
      );
    }, 900);
  };

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out of your account?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          navigation?.replace?.('Landing');
        }
      }
    ]);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Tokens.colors.background }}>
      <Container maxWidth={920} style={{ paddingVertical: Tokens.spacing.lg }}>
        <PageHeader
          title="Multi-Currency Treasury Wallet"
          subtitle="Real-time balance synchronization across USD and Zimbabwe Gold (ZiG) for instant utility settlements."
          badges={[
            { label: 'MULTI-CURRENCY LEDGER', variant: 'brand' },
            { label: 'HOT V3 COMPLIANT', variant: 'success' }
          ]}
        />

        <WalletBalanceGrid balanceUsd={balanceUsd} balanceZig={balanceZig} />

        <DepositFormCard
          currency={currency}
          onSetCurrency={setCurrency}
          depositAmount={depositAmount}
          onAmountChange={setDepositAmount}
          paymentRail={paymentRail}
          onSelectRail={setPaymentRail}
          loading={loading}
          onSubmitDeposit={handleDeposit}
        />

        <AccountProfileCard user={user} onSignOut={handleSignOut} />

        <View style={{ height: 48 }} />
      </Container>
    </ScrollView>
  );
}
