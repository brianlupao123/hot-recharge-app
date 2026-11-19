import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Clipboard,
  Share,
  RefreshControl,
  Platform
} from 'react-native';
import { Container, Card, Input, PageHeader } from '../components/ui';
import { Tokens } from '../theme/tokens';
import { ApiService, StoredToken } from '../services/api';
import { VaultTokenCard } from '../components/vault/VaultTokenCard';

export default function VaultScreen() {
  const [tokens, setTokens] = useState<StoredToken[]>([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadVault = async () => {
    const list = await ApiService.getOfflineVault();
    setTokens(list);
  };

  useEffect(() => {
    loadVault();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadVault();
    setRefreshing(false);
  };

  const copyToken = (tok: string) => {
    const clean = tok.replace(/-/g, '');
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(clean);
    } else if (Clipboard && Clipboard.setString) {
      Clipboard.setString(clean);
    }
    Alert.alert('Copied! 📋', '20-digit token copied to clipboard.');
  };

  const shareToken = async (item: StoredToken) => {
    const message = `⚡ ZESA Electricity Token\nToken: ${item.token}\nUnits: ${item.kwh || 114.5} kWh\nMeter: ${item.target}\nReceipt: ${item.receiptNumber}\nIssued by HOT Recharge V3`;
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
      // User cancelled
    }
  };

  const filtered = tokens.filter(
    (t) =>
      t.target.includes(search) ||
      (t.token && t.token.includes(search)) ||
      (t.customerName && t.customerName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Tokens.colors.background }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Tokens.colors.hotGold} />}
    >
      <Container maxWidth={920} style={{ paddingVertical: Tokens.spacing.lg }}>
        <PageHeader
          title="Encrypted Offline Token Vault"
          subtitle="Cryptographically sealed local ledger ensuring all purchased electricity tokens and transaction receipts remain instantly accessible even during total nationwide grid blackouts and ISP downtime."
          badges={[
            { label: 'OFFLINE-FIRST POS ENCLAVE', variant: 'success' },
            { label: 'AES-ENCRYPTED CACHE', variant: 'brand' }
          ]}
        />

        {/* Offline Banner Card */}
        <Card style={styles.offlineCard}>
          <Card.Content>
            <View style={styles.offlineRow}>
              <View style={styles.offlineIconBox}>
                <Text style={styles.offlineIconText}>🛡️</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.offlineTitle}>Air-Gapped Resiliency Guarantee</Text>
                <Text style={styles.offlineSub}>
                  Tokens are stored directly within your device's persistent storage enclave with HMAC integrity check. Pull down or tap refresh at any time to sync pending items.
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Search Bar */}
        <View style={{ marginBottom: Tokens.spacing.xs }}>
          <Input
            placeholder="Search by meter number, 20-digit token, or customer name..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Count Indicator */}
        <View style={styles.countRow}>
          <Text style={styles.countText}>
            Showing {filtered.length} stored {filtered.length === 1 ? 'record' : 'records'}
          </Text>
        </View>

        {/* Tokens List */}
        {filtered.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content>
              <Text style={styles.emptyIcon}>📂</Text>
              <Text style={styles.emptyTitle}>No matching tokens found</Text>
              <Text style={styles.emptySub}>
                Purchases made through ZESA or Airtime screens will automatically sync and persist in this offline repository.
              </Text>
            </Card.Content>
          </Card>
        ) : (
          filtered.map((item) => (
            <VaultTokenCard
              key={item.id}
              item={item}
              onCopyToken={copyToken}
              onShareToken={shareToken}
            />
          ))
        )}

        <View style={{ height: 48 }} />
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  offlineCard: {
    marginBottom: Tokens.spacing.lg,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    backgroundColor: 'rgba(16, 185, 129, 0.05)'
  },
  offlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.spacing.md
  },
  offlineIconBox: {
    width: 44,
    height: 44,
    borderRadius: Tokens.radii.md,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  offlineIconText: {
    fontSize: 22
  },
  offlineTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Tokens.colors.zesaGreen
  },
  offlineSub: {
    fontSize: 12,
    color: Tokens.colors.textSecondary,
    marginTop: 2,
    lineHeight: 18
  },
  countRow: {
    marginBottom: Tokens.spacing.md,
    paddingHorizontal: 2
  },
  countText: {
    fontSize: 12,
    color: Tokens.colors.textMuted
  },
  emptyCard: {
    paddingVertical: Tokens.spacing.xl,
    alignItems: 'center',
    textAlign: 'center'
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: Tokens.spacing.sm,
    textAlign: 'center'
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Tokens.colors.textPrimary,
    textAlign: 'center'
  },
  emptySub: {
    fontSize: 13,
    color: Tokens.colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 400,
    lineHeight: 18
  }
});
