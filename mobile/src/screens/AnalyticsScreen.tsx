import React, { useState, useEffect } from 'react';
import { ScrollView, View, Alert, Share, Platform } from 'react-native';
import { Container, PageHeader, KpiCard } from '../components/ui';
import { Tokens } from '../theme/tokens';
import { ApiService, AnalyticsSummary, StoredToken } from '../services/api';

import { CategoryBreakdownCard } from '../components/analytics/CategoryBreakdownCard';
import { FiscalInvoiceCard } from '../components/analytics/FiscalInvoiceCard';

export default function AnalyticsScreen() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [tokens, setTokens] = useState<StoredToken[]>([]);
  const [selectedTokenForTax, setSelectedTokenForTax] = useState<StoredToken | null>(null);

  useEffect(() => {
    ApiService.getAnalytics().then(setAnalytics);
    ApiService.getOfflineVault().then((t) => {
      setTokens(t);
      if (t.length > 0) setSelectedTokenForTax(t[0]);
    });
  }, []);

  const shareTaxInvoice = async (item: StoredToken) => {
    const invoiceText = `========================================\n` +
      `  HOT RECHARGE ZIMBABWE (PVT) LTD\n` +
      `  TAX INVOICE / FISCAL RECEIPT\n` +
      `========================================\n` +
      `Receipt No: ${item.receiptNumber}\n` +
      `Date/Time:  ${new Date(item.timestamp).toLocaleString()}\n` +
      `Client:     ${item.customerName || 'Registered Subscriber'}\n` +
      `Target/Mtr: ${item.target}\n` +
      (item.token ? `ZESA Token: ${item.token}\nUnits:      ${item.kwh || 114.5} kWh\n` : `Service:    Mobile Airtime\n`) +
      `----------------------------------------\n` +
      `Net Amount:     $${(item.amount * 0.85).toFixed(2)} USD\n` +
      `VAT (15%):      $${(item.amount * 0.15).toFixed(2)} USD\n` +
      `TOTAL PAID:     $${item.amount.toFixed(2)} ${item.currency}\n` +
      `========================================\n` +
      `Verified via HOT Recharge V3 API\n` +
      `Computer Society of Zimbabwe (CSZ) 2026\n`;

    try {
      if (Platform.OS === 'web') {
        if (typeof navigator !== 'undefined' && navigator.share) {
          await navigator.share({ title: 'HOT Recharge Fiscal Invoice', text: invoiceText });
        } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
          await navigator.clipboard.writeText(invoiceText);
          Alert.alert('Invoice Copied! 📄', 'Full fiscal tax invoice copied to clipboard for printing or sharing.');
        }
      } else {
        await Share.share({ message: invoiceText });
      }
    } catch (err) {
      // User cancelled
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Tokens.colors.background }}>
      <Container maxWidth={920} style={{ paddingVertical: Tokens.spacing.lg }}>
        <PageHeader
          title="Financial Reports & Fiscal Invoices"
          subtitle="Executive spending audit, multi-entity category ledgers, and official ZIMRA-compliant tax receipts."
          badges={[
            { label: 'ORAC AUDIT LEDGER', variant: 'brand' },
            { label: 'ZIMRA FISCAL TAX COMPLIANT', variant: 'success' }
          ]}
        />

        {/* Dual KPI Cards */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Tokens.spacing.md, marginBottom: Tokens.spacing.lg }}>
          <KpiCard
            label="Total Utilities Spent (USD)"
            value={`$${analytics?.totalSpentUsd?.toFixed(2) || '75.00'}`}
            subtitle="Current Billing Cycle"
          />
          <KpiCard
            label="Lifeline Subsidies Saved"
            value={`+$${analytics?.monthlySavingsLifeline?.toFixed(2) || '18.50'}`}
            subtitle="Tier 1 Subsidized Tariff Efficiency"
            valueColor={Tokens.colors.zesaGreen}
            borderColor="rgba(16, 185, 129, 0.4)"
          />
        </View>

        <CategoryBreakdownCard zesaTotalUsd={analytics?.zesaTotalUsd || 70.0} />

        <FiscalInvoiceCard
          tokens={tokens}
          selectedToken={selectedTokenForTax}
          onSelectToken={setSelectedTokenForTax}
          onShareInvoice={shareTaxInvoice}
        />

        <View style={{ height: 48 }} />
      </Container>
    </ScrollView>
  );
}
