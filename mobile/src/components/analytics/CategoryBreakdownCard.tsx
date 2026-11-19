import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../ui';
import { Tokens } from '../../theme/tokens';
import { analyticsStyles } from './analytics.styles';

export interface CategoryBreakdownCardProps {
  zesaTotalUsd: number;
}

export function CategoryBreakdownCard({ zesaTotalUsd }: CategoryBreakdownCardProps) {
  return (
    <Card style={analyticsStyles.sectionCard}>
      <Card.Header>
        <Card.Title>Utility Consumption Breakdown</Card.Title>
        <Card.Description>Volume distribution across grid and telecommunications providers</Card.Description>
      </Card.Header>
      <Card.Content>
        {/* ZESA */}
        <View style={analyticsStyles.barWrap}>
          <View style={analyticsStyles.barLabelRow}>
            <Text style={analyticsStyles.barLabel}>⚡ ZETDC Prepaid Electricity</Text>
            <Text style={analyticsStyles.barVal}>${zesaTotalUsd.toFixed(2)} (78%)</Text>
          </View>
          <View style={analyticsStyles.track}>
            <View style={[analyticsStyles.fill, { width: '78%', backgroundColor: Tokens.colors.zesaAmber }]} />
          </View>
        </View>

        {/* Airtime */}
        <View style={analyticsStyles.barWrap}>
          <View style={analyticsStyles.barLabelRow}>
            <Text style={analyticsStyles.barLabel}>📱 Mobile Airtime (Econet / NetOne / Telecel)</Text>
            <Text style={analyticsStyles.barVal}>$15.00 (15%)</Text>
          </View>
          <View style={analyticsStyles.track}>
            <View style={[analyticsStyles.fill, { width: '15%', backgroundColor: Tokens.colors.hotRed }]} />
          </View>
        </View>

        {/* Bundles */}
        <View style={analyticsStyles.barWrap}>
          <View style={analyticsStyles.barLabelRow}>
            <Text style={analyticsStyles.barLabel}>🌐 Data & WhatsApp Bundles</Text>
            <Text style={analyticsStyles.barVal}>$7.00 (7%)</Text>
          </View>
          <View style={analyticsStyles.track}>
            <View style={[analyticsStyles.fill, { width: '7%', backgroundColor: Tokens.colors.hotGold }]} />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}
