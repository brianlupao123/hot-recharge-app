import React from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from '../ui';
import { UserProfile, CurrencyType } from '../../types';
import { dashboardStyles } from './dashboard.styles';

export interface WalletBalanceBannerProps {
  user: UserProfile | null;
  currency: CurrencyType;
  balanceUsd: number;
  balanceZig: number;
  onDepositPress: () => void;
}

export function WalletBalanceBanner({
  user,
  currency,
  balanceUsd,
  balanceZig,
  onDepositPress
}: WalletBalanceBannerProps) {
  return (
    <Card style={dashboardStyles.balanceCard}>
      <Card.Content>
        <View style={dashboardStyles.balanceRow}>
          <View>
            <Text style={dashboardStyles.balanceLabel}>In-App Wallet Balance</Text>
            <Text style={dashboardStyles.balanceAmount}>
              {currency === 'USD' ? `$${balanceUsd.toFixed(2)}` : `${balanceZig.toFixed(2)}`}{' '}
              <Text style={dashboardStyles.currencyCode}>{currency}</Text>
            </Text>
          </View>
          <Button variant="primary" size="md" onPress={onDepositPress}>
            Deposit
          </Button>
        </View>
        <View style={dashboardStyles.balanceMetaRow}>
          <Text style={dashboardStyles.balanceMeta}>Account: {user?.name || user?.fullName || 'Brian Lupao'}</Text>
          <Text style={dashboardStyles.balanceNetwork}>EcoCash / OneMoney Linked</Text>
        </View>
      </Card.Content>
    </Card>
  );
}
