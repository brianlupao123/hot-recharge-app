import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Card } from '../ui';
import { Tokens } from '../../theme/tokens';
import { useResponsive } from '../../hooks/useResponsive';

interface LandingServiceGridProps {
  onServiceSelect: () => void;
}

export function LandingServiceGrid({ onServiceSelect }: LandingServiceGridProps) {
  const { isWide } = useResponsive();

  return (
    <View style={styles.sectionWrapper}>
      <Container>
        <View style={styles.sectionHeader}>
          <Text style={styles.preTitle}>UTILITY SERVICES</Text>
          <Text style={styles.title}>Engineered for Zimbabwean Infrastructure</Text>
        </View>

        <View style={[styles.grid, isWide ? styles.gridRow : styles.gridCol]}>
          {/* Tile 1: Electricity */}
          <Card style={styles.serviceTile}>
            <View style={[styles.iconWrapper, { backgroundColor: Tokens.colors.zesaAmberSubtle }]}>
              <Text style={styles.icon}>⚡</Text>
            </View>
            <Card.Title>ZETDC Prepaid Electricity</Card.Title>
            <Card.Description>
              Direct 20-digit token dispensing with real-time meter verification and stepped Lifeline tariff calculations.
            </Card.Description>
            <TouchableOpacity style={styles.actionBtn} onPress={onServiceSelect}>
              <Text style={[styles.actionText, { color: Tokens.colors.zesaAmber }]}>Buy Electricity →</Text>
            </TouchableOpacity>
          </Card>

          {/* Tile 2: Airtime */}
          <Card style={styles.serviceTile}>
            <View style={[styles.iconWrapper, { backgroundColor: Tokens.colors.primarySubtle }]}>
              <Text style={styles.icon}>📱</Text>
            </View>
            <Card.Title>Multi-Carrier Telecoms</Card.Title>
            <Card.Description>
              Instant PIN-less airtime and data bundles for Econet, NetOne, and Telecel with auto-prefix carrier detection.
            </Card.Description>
            <TouchableOpacity style={styles.actionBtn} onPress={onServiceSelect}>
              <Text style={[styles.actionText, { color: Tokens.colors.primary }]}>Recharge Airtime →</Text>
            </TouchableOpacity>
          </Card>

          {/* Tile 3: Vault */}
          <Card style={styles.serviceTile}>
            <View style={[styles.iconWrapper, { backgroundColor: Tokens.colors.zesaGreenSubtle }]}>
              <Text style={styles.icon}>🔒</Text>
            </View>
            <Card.Title>Encrypted Offline Vault</Card.Title>
            <Card.Description>
              Never lose your token during a blackout. All purchased tokens are encrypted locally and viewable with zero data.
            </Card.Description>
            <TouchableOpacity style={styles.actionBtn} onPress={onServiceSelect}>
              <Text style={[styles.actionText, { color: Tokens.colors.zesaGreen }]}>Open Offline Vault →</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionWrapper: {
    paddingVertical: Tokens.spacing.xxl
  },
  sectionHeader: {
    marginBottom: Tokens.spacing.xl
  },
  preTitle: {
    color: Tokens.colors.primary,
    fontSize: Tokens.typography.caption.fontSize,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: Tokens.spacing.xs
  },
  title: {
    fontSize: Tokens.typography.h2.fontSize,
    fontWeight: Tokens.typography.h2.fontWeight,
    color: Tokens.colors.textPrimary
  },
  grid: {
    gap: Tokens.spacing.md
  },
  gridRow: {
    flexDirection: 'row'
  },
  gridCol: {
    flexDirection: 'column'
  },
  serviceTile: {
    flex: 1,
    padding: Tokens.spacing.lg,
    justifyContent: 'space-between'
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: Tokens.radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Tokens.spacing.md
  },
  icon: {
    fontSize: 22
  },
  actionBtn: {
    marginTop: Tokens.spacing.md,
    alignSelf: 'flex-start'
  },
  actionText: {
    fontSize: Tokens.typography.body.fontSize,
    fontWeight: '700'
  }
});
