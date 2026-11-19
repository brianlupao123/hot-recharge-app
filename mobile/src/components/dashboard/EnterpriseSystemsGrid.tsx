import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Tokens } from '../../theme/tokens';
import { dashboardStyles } from './dashboard.styles';

export interface EnterpriseSystemsGridProps {
  onNavigate: (screen: string) => void;
}

export function EnterpriseSystemsGrid({ onNavigate }: EnterpriseSystemsGridProps) {
  return (
    <View>
      <Text style={dashboardStyles.sectionTitle}>Enterprise Subsystems</Text>
      <View style={dashboardStyles.enterpriseRow}>
        <TouchableOpacity
          style={[dashboardStyles.entCard, { borderColor: Tokens.colors.hotGold }]}
          onPress={() => onNavigate('Fleet')}
        >
          <Text style={dashboardStyles.entEmoji}>🏢</Text>
          <Text style={dashboardStyles.entTitle}>Multi-Meter Fleet</Text>
          <Text style={dashboardStyles.entSub}>Batch multi-property checkout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[dashboardStyles.entCard, { borderColor: Tokens.colors.zesaGreen }]}
          onPress={() => onNavigate('Analytics')}
        >
          <Text style={dashboardStyles.entEmoji}>📊</Text>
          <Text style={dashboardStyles.entTitle}>Tax Reports & Audit</Text>
          <Text style={dashboardStyles.entSub}>ZIMRA/ZETDC fiscal invoices</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[dashboardStyles.entCard, { borderColor: Tokens.colors.cszBlue }]}
          onPress={() => onNavigate('Agent')}
        >
          <Text style={dashboardStyles.entEmoji}>🏪</Text>
          <Text style={dashboardStyles.entTitle}>Reseller Agent POS</Text>
          <Text style={dashboardStyles.entSub}>Float balance & commissions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
