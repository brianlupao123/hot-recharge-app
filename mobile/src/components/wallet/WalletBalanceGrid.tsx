import React from 'react';
import { View } from 'react-native';
import { KpiCard } from '../ui';
import { walletStyles } from './wallet.styles';

export interface WalletBalanceGridProps {
  balanceUsd: number;
  balanceZig: number;
}

export function WalletBalanceGrid({ balanceUsd, balanceZig }: WalletBalanceGridProps) {
  return (
    <View style={walletStyles.walletsRow}>
      <KpiCard
        label="United States Dollar"
        value={`$${balanceUsd.toFixed(2)}`}
        subtitle="Primary Settlement Currency"
        badge={{ label: 'USD', variant: 'warning' }}
        borderColor="rgba(245, 166, 35, 0.4)"
      />
      <KpiCard
        label="Zimbabwe Gold"
        value={balanceZig.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        subtitle="Official Reserve-Backed Currency"
        badge={{ label: 'ZiG', variant: 'success' }}
        borderColor="rgba(16, 185, 129, 0.4)"
      />
    </View>
  );
}
