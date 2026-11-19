import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Container, Card, Button, Badge, PageHeader } from '../components/ui';
import { Tokens } from '../theme/tokens';
import { ApiService, SavedMeter } from '../services/api';
import { MeterFleetItem } from '../components/fleet/MeterFleetItem';

export default function MeterFleetScreen({ navigation }: any) {
  const [meters, setMeters] = useState<SavedMeter[]>([]);
  const [selectedMeters, setSelectedMeters] = useState<Record<string, boolean>>({ m1: true, m2: true });
  const [amounts, setAmounts] = useState<Record<string, string>>({ m1: '20', m2: '10', m3: '50', m4: '15' });
  const [loading, setLoading] = useState(false);
  const [batchResults, setBatchResults] = useState<any[]>([]);

  useEffect(() => {
    ApiService.getSavedMeters().then(setMeters);
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedMeters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const calculateTotal = () => {
    return meters.reduce((sum, m) => {
      if (selectedMeters[m.id]) {
        const val = parseFloat(amounts[m.id] || '0');
        return sum + (isNaN(val) ? 0 : val);
      }
      return sum;
    }, 0);
  };

  const handleBatchRecharge = async () => {
    const toRecharge = meters
      .filter((m) => selectedMeters[m.id])
      .map((m) => ({
        meterNumber: m.meterNumber,
        customerName: `${m.nickname} (${m.customerName})`,
        amount: parseFloat(amounts[m.id] || '10'),
        currency: 'USD' as const
      }));

    if (toRecharge.length === 0) {
      Alert.alert('No Meters Selected', 'Please select at least one property meter to recharge.');
      return;
    }

    setLoading(true);
    try {
      const results = await ApiService.batchRecharge(toRecharge);
      setBatchResults(results);

      // Commit all to offline vault
      for (const res of results) {
        await ApiService.saveToOfflineVault({
          id: `BATCH-${Date.now()}-${res.target}`,
          type: 'ZESA',
          target: res.target,
          customerName: res.customerName || 'Property Fleet Meter',
          amount: res.amount || 20,
          currency: 'USD',
          token: res.token,
          kwh: res.kwh,
          receiptNumber: res.receiptNumber,
          timestamp: new Date().toISOString()
        });
      }

      Alert.alert(
        'Batch Purchase Succeeded! 🎉',
        `Successfully generated tokens for ${results.length} property meters!\nTotal USD $${calculateTotal().toFixed(2)} charged.\nTokens committed to your Offline Vault.`
      );
    } catch (err: any) {
      Alert.alert('Batch Failed', err?.message || 'Failed to complete batch recharge');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Tokens.colors.background }}>
      <Container maxWidth={920} style={{ paddingVertical: Tokens.spacing.lg }}>
        <PageHeader
          title="Multi-Property Meter Fleet"
          subtitle="Enterprise property management console for landlords, estates, and organizations managing distributed ZETDC meters with consolidated 1-tap checkout."
          badges={[
            { label: 'ORAC MULTI-ENTITY FLEET', variant: 'brand' },
            { label: 'CONSOLIDATED SETTLEMENT', variant: 'warning' }
          ]}
        />

        {/* Fleet Summary Card */}
        <Card style={styles.summaryCard}>
          <Card.Content>
            <View style={styles.summaryRow}>
              <View>
                <Text style={styles.summaryLabel}>Total Properties Managed</Text>
                <Text style={styles.summaryCount}>{meters.length} Active Meters</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.summaryLabel}>Batch Cart Total</Text>
                <Text style={styles.summaryTotal}>${calculateTotal().toFixed(2)} USD</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Section Heading */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Select Meters for Consolidated Checkout</Text>
          <TouchableOpacity
            onPress={() => {
              const allSelected = meters.every((m) => selectedMeters[m.id]);
              const next: Record<string, boolean> = {};
              meters.forEach((m) => { next[m.id] = !allSelected; });
              setSelectedMeters(next);
            }}
          >
            <Text style={styles.toggleAllText}>Toggle All</Text>
          </TouchableOpacity>
        </View>

        {/* Meter Cards */}
        {meters.map((m) => (
          <MeterFleetItem
            key={m.id}
            meter={m}
            isSelected={!!selectedMeters[m.id]}
            amount={amounts[m.id] || '20'}
            onToggleSelect={() => toggleSelect(m.id)}
            onAmountChange={(v) => setAmounts({ ...amounts, [m.id]: v })}
          />
        ))}

        {/* Consolidated Checkout Button */}
        <Button
          variant="primary"
          size="lg"
          loading={loading}
          disabled={loading || calculateTotal() <= 0}
          onPress={handleBatchRecharge}
          style={styles.batchBtn}
        >
          Consolidated 1-Tap Checkout (${calculateTotal().toFixed(2)} USD)
        </Button>

        {/* Generated Batch Tokens Display */}
        {batchResults.length > 0 && (
          <Card style={styles.batchResultCard}>
            <Card.Header>
              <Card.Title>⚡ Generated Batch Tokens</Card.Title>
              <Card.Description>Dispensed and committed to your Encrypted Offline Vault</Card.Description>
            </Card.Header>
            <Card.Content>
              {batchResults.map((r, i) => (
                <View key={i} style={styles.tokenLine}>
                  <View style={styles.tokenLineTop}>
                    <Text style={styles.tokenLineMeter}>Meter: {r.target}</Text>
                    <Badge variant="success" label={`${r.kwh || 114.5} kWh`} size="sm" />
                  </View>
                  <Text style={styles.tokenLineCode}>{r.token}</Text>
                  <Text style={styles.tokenLineReceipt}>Receipt: {r.receiptNumber}</Text>
                </View>
              ))}
            </Card.Content>
          </Card>
        )}

        <View style={{ height: 48 }} />
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    marginBottom: Tokens.spacing.lg,
    borderColor: 'rgba(245, 166, 35, 0.4)'
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  summaryLabel: {
    fontSize: 11,
    color: Tokens.colors.textSecondary
  },
  summaryCount: {
    fontSize: 18,
    fontWeight: '800',
    color: Tokens.colors.textPrimary,
    marginTop: 2
  },
  summaryTotal: {
    fontSize: 24,
    fontWeight: '900',
    color: Tokens.colors.hotGold,
    marginTop: 2
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Tokens.spacing.sm
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Tokens.colors.textPrimary
  },
  toggleAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: Tokens.colors.hotGold
  },
  batchBtn: {
    marginTop: Tokens.spacing.md
  },
  batchResultCard: {
    marginTop: Tokens.spacing.lg,
    borderColor: 'rgba(16, 185, 129, 0.4)'
  },
  tokenLine: {
    backgroundColor: '#0A0C10',
    padding: Tokens.spacing.md,
    borderRadius: Tokens.radii.md,
    marginBottom: Tokens.spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)'
  },
  tokenLineTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  tokenLineMeter: {
    fontSize: 12,
    fontWeight: '700',
    color: Tokens.colors.textSecondary
  },
  tokenLineCode: {
    fontSize: 16,
    fontWeight: '900',
    color: Tokens.colors.hotGold,
    fontFamily: 'monospace',
    letterSpacing: 1,
    marginVertical: 4
  },
  tokenLineReceipt: {
    fontSize: 11,
    color: Tokens.colors.textMuted
  }
});
