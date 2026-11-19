import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '../ui';
import { StoredToken } from '../../services/api';
import { dashboardStyles } from './dashboard.styles';

export interface RecentPurchasesCardProps {
  vaultItems: StoredToken[];
  onViewAll: () => void;
}

export function RecentPurchasesCard({ vaultItems, onViewAll }: RecentPurchasesCardProps) {
  if (vaultItems.length === 0) return null;

  return (
    <View>
      <View style={dashboardStyles.recentHeaderRow}>
        <Text style={dashboardStyles.sectionTitle}>Recent Purchases</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={dashboardStyles.seeAllText}>View All Vault Tokens</Text>
        </TouchableOpacity>
      </View>

      {vaultItems.slice(0, 3).map((item) => (
        <Card key={item.id} style={dashboardStyles.txCard}>
          <Card.Content>
            <View style={dashboardStyles.txRow}>
              <View>
                <Text style={dashboardStyles.txTitle}>
                  {item.type === 'ZESA' ? '⚡ ZETDC Electricity' : '📱 Mobile Airtime'}
                </Text>
                <Text style={dashboardStyles.txTarget}>Target: {item.target}</Text>
                {item.token && (
                  <Text style={dashboardStyles.txToken}>Token: {item.token}</Text>
                )}
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={dashboardStyles.txAmount}>${item.amount.toFixed(2)} {item.currency}</Text>
                {item.kwh && <Text style={dashboardStyles.txKwh}>{item.kwh} kWh</Text>}
              </View>
            </View>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
}
