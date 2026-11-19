import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Tokens } from '../../theme/tokens';
import { dashboardStyles } from './dashboard.styles';

export interface ServiceGridProps {
  onNavigate: (screen: string, params?: any) => void;
}

export function ServiceGrid({ onNavigate }: ServiceGridProps) {
  return (
    <View>
      <Text style={dashboardStyles.sectionTitle}>Recharge Services</Text>
      <View style={dashboardStyles.tilesGrid}>
        {/* ZESA */}
        <TouchableOpacity
          style={[dashboardStyles.tile, { borderColor: Tokens.colors.zesaAmber }]}
          onPress={() => onNavigate('ZESA')}
        >
          <Text style={dashboardStyles.tileEmoji}>⚡</Text>
          <Text style={dashboardStyles.tileTitle}>ZESA Prepaid</Text>
          <Text style={dashboardStyles.tileSubtitle}>Instant 20-digit tokens</Text>
        </TouchableOpacity>

        {/* Airtime */}
        <TouchableOpacity
          style={[dashboardStyles.tile, { borderColor: Tokens.colors.hotRed }]}
          onPress={() => onNavigate('Airtime')}
        >
          <Text style={dashboardStyles.tileEmoji}>📱</Text>
          <Text style={dashboardStyles.tileTitle}>Airtime</Text>
          <Text style={dashboardStyles.tileSubtitle}>Econet, NetOne, Telecel</Text>
        </TouchableOpacity>

        {/* Bundles */}
        <TouchableOpacity
          style={[dashboardStyles.tile, { borderColor: Tokens.colors.hotGold }]}
          onPress={() => onNavigate('Airtime', { tab: 'bundles' })}
        >
          <Text style={dashboardStyles.tileEmoji}>🌐</Text>
          <Text style={dashboardStyles.tileTitle}>Data & Bundles</Text>
          <Text style={dashboardStyles.tileSubtitle}>WhatsApp, Monthly data</Text>
        </TouchableOpacity>

        {/* Offline Vault */}
        <TouchableOpacity
          style={[dashboardStyles.tile, { borderColor: Tokens.colors.zesaGreen }]}
          onPress={() => onNavigate('Vault')}
        >
          <Text style={dashboardStyles.tileEmoji}>🔒</Text>
          <Text style={dashboardStyles.tileTitle}>Offline Vault</Text>
          <Text style={dashboardStyles.tileSubtitle}>Access tokens with no internet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
