import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button, Badge } from '../ui';
import { StoredToken } from '../../services/api';
import { Tokens } from '../../theme/tokens';

export interface VaultTokenCardProps {
  item: StoredToken;
  onCopyToken: (token: string) => void;
  onShareToken: (item: StoredToken) => void;
}

export function VaultTokenCard({ item, onCopyToken, onShareToken }: VaultTokenCardProps) {
  return (
    <Card style={styles.tokenCard}>
      <Card.Header>
        <View style={styles.tokenCardTop}>
          <View>
            <Badge
              variant={item.type === 'ZESA' ? 'warning' : 'info'}
              label={item.type === 'ZESA' ? 'ZETDC PREPAID' : 'AIRTIME TOP-UP'}
              size="sm"
            />
            <Text style={styles.customerName}>{item.customerName || 'Registered Account'}</Text>
            <Text style={styles.targetNum}>Target: {item.target}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.tokenAmount}>
              {item.currency === 'USD' ? `$${item.amount.toFixed(2)}` : `${item.amount.toFixed(2)} ZiG`}
            </Text>
            <Text style={styles.tokenTime}>
              {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        </View>
      </Card.Header>
      <Card.Content>
        {item.token && (
          <View style={styles.tokenDisplayBox}>
            <Text style={styles.tokenLabel}>20-DIGIT KEYPAD RECHARGE TOKEN</Text>
            <Text style={styles.tokenDigits}>{item.token}</Text>
            <View style={styles.tokenMetaRow}>
              <Text style={styles.tokenKwh}>⚡ {item.kwh || 114.5} kWh Units</Text>
              <Text style={styles.receiptText}>Receipt: {item.receiptNumber}</Text>
            </View>
          </View>
        )}

        <View style={styles.actionsRow}>
          {item.token && (
            <Button
              variant="outline"
              size="sm"
              onPress={() => onCopyToken(item.token!)}
              style={styles.actionBtn}
            >
              📋 Copy Digits
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            onPress={() => onShareToken(item)}
            style={styles.actionBtn}
          >
            💬 Share Receipt
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  tokenCard: {
    marginBottom: Tokens.spacing.md
  },
  tokenCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  customerName: {
    fontSize: 15,
    fontWeight: '700',
    color: Tokens.colors.textPrimary,
    marginTop: 6
  },
  targetNum: {
    fontSize: 12,
    color: Tokens.colors.textSecondary,
    marginTop: 2,
    fontFamily: 'monospace'
  },
  tokenAmount: {
    fontSize: 17,
    fontWeight: '900',
    color: Tokens.colors.hotGold
  },
  tokenTime: {
    fontSize: 11,
    color: Tokens.colors.textMuted,
    marginTop: 2
  },
  tokenDisplayBox: {
    backgroundColor: '#0A0C10',
    borderRadius: Tokens.radii.md,
    padding: Tokens.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(245, 166, 35, 0.4)',
    marginVertical: Tokens.spacing.sm
  },
  tokenLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Tokens.colors.hotGold,
    letterSpacing: 1,
    marginBottom: 4
  },
  tokenDigits: {
    fontSize: 20,
    fontWeight: '900',
    color: Tokens.colors.hotGold,
    fontFamily: 'monospace',
    letterSpacing: 2,
    marginVertical: 4
  },
  tokenMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6
  },
  tokenKwh: {
    fontSize: 12,
    fontWeight: '700',
    color: Tokens.colors.zesaGreen
  },
  receiptText: {
    fontSize: 11,
    color: Tokens.colors.textSecondary
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Tokens.spacing.sm,
    marginTop: Tokens.spacing.sm
  },
  actionBtn: {
    flex: 1
  }
});
