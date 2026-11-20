import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserProfile, CurrencyType } from '../../types';
import { dashboardStyles } from './dashboard.styles';

export interface DashboardHeaderProps {
  user: UserProfile | null;
  currency: CurrencyType;
  onToggleCurrency: () => void;
}

export function DashboardHeader({ user, currency, onToggleCurrency }: DashboardHeaderProps) {
  const displayName = user?.name || user?.fullName || 'Brian Lupao';
  const displayPhone = user?.phone || user?.phoneNumber || '0784529134';

  return (
    <View style={dashboardStyles.header}>
      <View>
        <Text style={dashboardStyles.appName}>HOT<Text style={{ color: '#FFF' }}>recharge</Text></Text>
        <Text style={dashboardStyles.appSub}>
          {`${displayName} (${displayPhone})`}
        </Text>
      </View>
      <TouchableOpacity
        style={dashboardStyles.currencyToggle}
        onPress={onToggleCurrency}
      >
        <Text style={dashboardStyles.currencyToggleText}>Switch to {currency === 'USD' ? 'ZiG' : 'USD'}</Text>
      </TouchableOpacity>
    </View>
  );
}
