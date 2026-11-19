import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../theme/theme';

interface Props {
  navigation: any;
  onQuickZesaRecharge: () => void;
  onQuickAirtimeRecharge: () => void;
}

export default function ExecutiveSpeedBar({
  navigation,
  onQuickZesaRecharge,
  onQuickAirtimeRecharge
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>⚡ Instant Services & Quick Actions</Text>
        <Text style={styles.badge}>Live 1-Tap</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        <TouchableOpacity style={[styles.pill, { borderColor: Colors.zesaAmber }]} onPress={onQuickZesaRecharge}>
          <Text style={styles.pillEmoji}>⚡</Text>
          <Text style={styles.pillText}>Buy ZESA Electricity</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.pill, { borderColor: Colors.hotRed }]} onPress={onQuickAirtimeRecharge}>
          <Text style={styles.pillEmoji}>📱</Text>
          <Text style={styles.pillText}>Econet $5 Airtime</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.pill, { borderColor: Colors.hotGold }]}
          onPress={() => navigation.navigate('Fleet')}
        >
          <Text style={styles.pillEmoji}>🏢</Text>
          <Text style={styles.pillText}>Multi-Meter Fleet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.pill, { borderColor: Colors.zesaGreen }]}
          onPress={() => navigation.navigate('Analytics')}
        >
          <Text style={styles.pillEmoji}>📊</Text>
          <Text style={styles.pillText}>Tax Reports & Invoices</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.pill, { borderColor: Colors.cszBlue }]}
          onPress={() => navigation.navigate('Agent')}
        >
          <Text style={styles.pillEmoji}>🏪</Text>
          <Text style={styles.pillText}>Reseller Float Console</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F1420',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    color: '#CBD5E1',
    letterSpacing: 0.5
  },
  badge: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.zesaGreen,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10
  },
  scroll: {
    flexDirection: 'row'
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8
  },
  pillEmoji: {
    fontSize: 14,
    marginRight: 6
  },
  pillText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '700'
  }
});
