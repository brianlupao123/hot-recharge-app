import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  RefreshControl
} from 'react-native';
import { Container } from '../components/ui';
import { Tokens } from '../theme/tokens';
import { ApiService, StoredToken } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import ExecutiveSpeedBar from '../components/ExecutiveSpeedBar';
import PaymentStateMachineModal from '../components/PaymentStateMachineModal';

import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { WalletBalanceBanner } from '../components/dashboard/WalletBalanceBanner';
import { ServiceGrid } from '../components/dashboard/ServiceGrid';
import { EnterpriseSystemsGrid } from '../components/dashboard/EnterpriseSystemsGrid';
import { RecentPurchasesCard } from '../components/dashboard/RecentPurchasesCard';

export default function DashboardScreen({ navigation }: any) {
  const { user } = useAuth();
  const { currency, toggleCurrency, balanceUsd, balanceZig } = useWallet();
  const [vaultItems, setVaultItems] = useState<StoredToken[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeOrder, setActiveOrder] = useState<any>({
    target: '04192837461',
    customerName: user?.fullName || 'Brian Lupao',
    amount: 20,
    currency: 'USD',
    paymentMethod: 'EcoCash USD',
    isZesa: true
  });

  const loadData = async () => {
    const items = await ApiService.getOfflineVault();
    setVaultItems(items);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const runQuickZesaRecharge = () => {
    setActiveOrder({
      target: '04192837461',
      customerName: 'Brian Lupao (Stand 448 Fairview)',
      amount: 20,
      currency: 'USD',
      paymentMethod: 'EcoCash USD',
      isZesa: true
    });
    setModalVisible(true);
  };

  const runQuickAirtimeRecharge = () => {
    setActiveOrder({
      target: '0784529134',
      customerName: user?.fullName || 'Brian Lupao',
      amount: 5,
      currency: 'USD',
      paymentMethod: 'OneMoney',
      isZesa: false
    });
    setModalVisible(true);
  };

  const handleOrderComplete = async (res: any) => {
    await ApiService.saveToOfflineVault({
      id: `HOT-${Date.now()}`,
      type: activeOrder.isZesa ? 'ZESA' : 'AIRTIME',
      target: activeOrder.target,
      customerName: activeOrder.customerName,
      amount: activeOrder.amount,
      currency: activeOrder.currency,
      token: res.token,
      kwh: res.kwh,
      receiptNumber: res.receiptNumber,
      timestamp: new Date().toISOString()
    });
    loadData();
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Tokens.colors.background }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Tokens.colors.hotGold} />}
    >
      <Container maxWidth={920} style={{ paddingVertical: Tokens.spacing.lg }}>
        {/* Brand Header */}
        <DashboardHeader
          user={user}
          currency={currency}
          onToggleCurrency={toggleCurrency}
        />

        {/* Instant Services & Actions SpeedBar */}
        <ExecutiveSpeedBar
          navigation={navigation}
          onQuickZesaRecharge={runQuickZesaRecharge}
          onQuickAirtimeRecharge={runQuickAirtimeRecharge}
        />

        {/* In-App Wallet Balance Banner */}
        <WalletBalanceBanner
          user={user}
          currency={currency}
          balanceUsd={balanceUsd}
          balanceZig={balanceZig}
          onDepositPress={() => navigation.navigate('Wallet')}
        />

        {/* 4 Core Recharge Services Tiles */}
        <ServiceGrid onNavigate={(screen, params) => navigation.navigate(screen, params)} />

        {/* Enterprise Subsystems Grid */}
        <EnterpriseSystemsGrid onNavigate={(screen) => navigation.navigate(screen)} />

        {/* Recent Purchases Vault List */}
        <RecentPurchasesCard
          vaultItems={vaultItems}
          onViewAll={() => navigation.navigate('Vault')}
        />

        {/* 5-Stage Payment Pipeline Modal */}
        <PaymentStateMachineModal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          onComplete={handleOrderComplete}
          orderDetails={activeOrder}
        />

        <View style={{ height: 48 }} />
      </Container>
    </ScrollView>
  );
}
