import React, { useState, useEffect } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { Container, Card, Button, Input, Badge, PageHeader, KpiCard, DataRow } from '../components/ui';
import { Tokens } from '../theme/tokens';
import { ApiService, AgentMetrics } from '../services/api';

export default function AgentScreen() {
  const [metrics, setMetrics] = useState<AgentMetrics | null>(null);
  const [sellTarget, setSellTarget] = useState('0771234567');
  const [sellAmount, setSellAmount] = useState('5');
  const [dispensing, setDispensing] = useState(false);

  useEffect(() => {
    ApiService.getAgentMetrics().then(setMetrics);
  }, []);

  const handleAgentSell = () => {
    const num = parseFloat(sellAmount);
    if (!sellTarget || isNaN(num) || num <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid target number and amount.');
      return;
    }

    setDispensing(true);
    setTimeout(() => {
      setDispensing(false);
      const commission = (num * 0.025).toFixed(2);
      Alert.alert(
        'Voucher Dispensed to Walk-in Customer! ⚡',
        `Sold: $${num.toFixed(2)} Airtime to ${sellTarget}\nEarned Commission: +$${commission} USD\nFloat balance and commissions updated.`
      );
    }, 900);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Tokens.colors.background }}>
      <Container maxWidth={920} style={{ paddingVertical: Tokens.spacing.lg }}>
        <PageHeader
          title="Merchant & Reseller Agent Console"
          subtitle="Point-of-Sale over-the-counter voucher dispensation with automated commissions and real-time float reconciliation."
          badges={[
            { label: 'COMMERCIAL TILL', variant: 'brand' },
            { label: 'AGENT COMMISSION ENGINE', variant: 'success' }
          ]}
        />

        {/* Float & Commission KPI Cards */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Tokens.spacing.md, marginBottom: Tokens.spacing.lg }}>
          <KpiCard
            label="Till Float Balance (USD)"
            value={`$${metrics?.floatBalanceUsd.toFixed(2) || '540.25'}`}
            subtitle={`Till ID: ${metrics?.tillNumber || 'HOT-TILL-8842'}`}
            borderColor="rgba(245, 166, 35, 0.4)"
          />
          <KpiCard
            label="Commissions Earned (USD)"
            value={`+$${metrics?.commissionsEarnedUsd.toFixed(2) || '48.60'}`}
            subtitle={`Today's Transactions: ${metrics?.todaySalesCount || 19}`}
            valueColor={Tokens.colors.zesaGreen}
            borderColor="rgba(16, 185, 129, 0.4)"
          />
        </View>

        {/* Commission Rates Table */}
        <Card style={{ marginBottom: Tokens.spacing.lg }}>
          <Card.Header>
            <Card.Title>Official Agent Commission Structure</Card.Title>
            <Card.Description>Instant automatic credit into your merchant settlement wallet</Card.Description>
          </Card.Header>
          <Card.Content>
            <DataRow
              label="📱 Mobile Airtime (Econet / NetOne / Telecel)"
              value={<Badge variant="success" label="2.5% CREDIT" size="sm" />}
            />
            <DataRow
              label="⚡ ZETDC Prepaid Electricity (ZESA)"
              value={<Badge variant="warning" label="1.5% CREDIT" size="sm" />}
            />
            <DataRow
              label="🌐 TelOne & Broadband Vouchers"
              value={<Badge variant="info" label="2.0% CREDIT" size="sm" />}
            />
          </Card.Content>
        </Card>

        {/* POS Rapid Dispenser Card */}
        <Card style={{ marginBottom: Tokens.spacing.lg }}>
          <Card.Header>
            <Card.Title>Rapid Walk-in POS Dispenser</Card.Title>
            <Card.Description>Issue airtime or ZESA token directly from merchant float</Card.Description>
          </Card.Header>
          <Card.Content>
            <Input
              label="Customer Phone or Meter Number"
              placeholder="e.g. 0771234567"
              value={sellTarget}
              onChangeText={setSellTarget}
              keyboardType="phone-pad"
            />

            <Input
              label="Dispensation Amount (USD)"
              placeholder="e.g. 5"
              value={sellAmount}
              onChangeText={setSellAmount}
              keyboardType="decimal-pad"
            />

            <Button
              variant="primary"
              size="lg"
              loading={dispensing}
              onPress={handleAgentSell}
            >
              Sell Voucher & Earn Commission (+${(parseFloat(sellAmount || '0') * 0.025).toFixed(2)} USD)
            </Button>
          </Card.Content>
        </Card>

        <View style={{ height: 48 }} />
      </Container>
    </ScrollView>
  );
}
