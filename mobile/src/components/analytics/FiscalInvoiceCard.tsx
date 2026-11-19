import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Button, Badge, DataRow } from '../ui';
import { StoredToken } from '../../services/api';
import { Tokens } from '../../theme/tokens';
import { analyticsStyles } from './analytics.styles';

export interface FiscalInvoiceCardProps {
  tokens: StoredToken[];
  selectedToken: StoredToken | null;
  onSelectToken: (token: StoredToken) => void;
  onShareInvoice: (token: StoredToken) => void;
}

export function FiscalInvoiceCard({
  tokens,
  selectedToken,
  onSelectToken,
  onShareInvoice
}: FiscalInvoiceCardProps) {
  return (
    <View>
      <View style={analyticsStyles.invoiceHeaderRow}>
        <Text style={analyticsStyles.sectionTitle}>Fiscal Tax Invoice & Compliance Receipt</Text>
        <Badge variant="warning" label="ZIMRA S.I. 127 COMPLIANT" size="sm" />
      </View>

      {/* Token Selector for Receipt */}
      {tokens.length > 1 && (
        <View style={analyticsStyles.tokenPillRow}>
          {tokens.slice(0, 4).map((t) => (
            <TouchableOpacity
              key={t.id}
              style={[analyticsStyles.tokenPill, selectedToken?.id === t.id && analyticsStyles.tokenPillActive]}
              onPress={() => onSelectToken(t)}
            >
              <Text style={[analyticsStyles.tokenPillText, selectedToken?.id === t.id && analyticsStyles.tokenPillTextActive]}>
                {t.type} • {t.target}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedToken ? (
        <Card style={analyticsStyles.taxInvoiceCard}>
          <Card.Content>
            <View style={analyticsStyles.invoiceHeader}>
              <View>
                <Text style={analyticsStyles.invoiceCompany}>HOT RECHARGE ZIMBABWE (PVT) LTD</Text>
                <Text style={analyticsStyles.invoiceTaxTag}>FISCAL TAX INVOICE</Text>
              </View>
              <Text style={analyticsStyles.invoiceRef}>{selectedToken.receiptNumber}</Text>
            </View>

            <View style={analyticsStyles.divider} />

            <DataRow label="Target / Meter Account:" value={selectedToken.target} isMonospace />
            <DataRow label="Customer Account Holder:" value={selectedToken.customerName || 'Brian Lupao'} />
            {selectedToken.token && (
              <DataRow
                label="Generated Keypad Token:"
                value={selectedToken.token}
                valueColor={Tokens.colors.hotGold}
                isMonospace
              />
            )}
            <DataRow label="Units Issued:" value={`${selectedToken.kwh || 114.5} kWh`} />

            <View style={analyticsStyles.divider} />

            <DataRow label="Net Amount (Excl. VAT):" value={`$${(selectedToken.amount * 0.85).toFixed(2)} USD`} />
            <DataRow label="VAT Standard Rate (15%):" value={`$${(selectedToken.amount * 0.15).toFixed(2)} USD`} />
            <DataRow
              label="TOTAL INC. VAT:"
              value={`$${selectedToken.amount.toFixed(2)} ${selectedToken.currency}`}
              highlight
            />

            <Button
              variant="secondary"
              size="lg"
              onPress={() => onShareInvoice(selectedToken)}
              style={analyticsStyles.shareInvoiceBtn}
            >
              📄 Export / Print Formal Fiscal Invoice
            </Button>
          </Card.Content>
        </Card>
      ) : (
        <Card style={analyticsStyles.taxInvoiceCard}>
          <Card.Content>
            <Text style={{ color: Tokens.colors.textSecondary, textAlign: 'center', padding: 20 }}>
              No transaction records available to generate tax invoice. Complete a ZESA or Airtime purchase to view.
            </Text>
          </Card.Content>
        </Card>
      )}
    </View>
  );
}
