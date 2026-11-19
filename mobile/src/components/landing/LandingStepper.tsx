import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container } from '../ui';
import { Tokens } from '../../theme/tokens';
import { useResponsive } from '../../hooks/useResponsive';

export function LandingStepper() {
  const { isWide } = useResponsive();

  const steps = [
    { number: '01', title: 'Enter Number or Meter', desc: 'Live validation ensures phone or meter belongs to you.' },
    { number: '02', title: 'Choose Currency & Amount', desc: 'Full tariff transparency across USD and ZiG currencies.' },
    { number: '03', title: 'Instant Mobile Payment', desc: 'EcoCash, OneMoney, InnBucks, Card, or Wallet float.' },
    { number: '04', title: 'Permanent Vault Storage', desc: 'Token sent via SMS and cached to zero-data offline storage.' }
  ];

  return (
    <View style={styles.stepperWrapper}>
      <Container>
        <Text style={styles.preTitle}>FOUR SIMPLE STEPS</Text>
        <Text style={styles.title}>How a Recharge Works</Text>

        <View style={[styles.stepGrid, isWide ? styles.stepGridRow : styles.stepGridCol]}>
          {steps.map((s) => (
            <View key={s.number} style={styles.stepCard}>
              <Text style={styles.stepNum}>{s.number}</Text>
              <Text style={styles.stepTitle}>{s.title}</Text>
              <Text style={styles.stepDesc}>{s.desc}</Text>
            </View>
          ))}
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  stepperWrapper: {
    paddingVertical: Tokens.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Tokens.colors.surfaceBorder
  },
  preTitle: {
    color: Tokens.colors.secondary,
    fontSize: Tokens.typography.caption.fontSize,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: Tokens.spacing.xs
  },
  title: {
    fontSize: Tokens.typography.h2.fontSize,
    fontWeight: Tokens.typography.h2.fontWeight,
    color: Tokens.colors.textPrimary,
    marginBottom: Tokens.spacing.xl
  },
  stepGrid: {
    gap: Tokens.spacing.md
  },
  stepGridRow: {
    flexDirection: 'row'
  },
  stepGridCol: {
    flexDirection: 'column'
  },
  stepCard: {
    flex: 1,
    backgroundColor: Tokens.colors.surface,
    borderRadius: Tokens.radii.md,
    borderLeftWidth: 3,
    borderLeftColor: Tokens.colors.primary,
    borderWidth: 1,
    borderColor: Tokens.colors.surfaceBorder,
    padding: Tokens.spacing.md
  },
  stepNum: {
    color: Tokens.colors.secondary,
    fontSize: Tokens.typography.caption.fontSize,
    fontWeight: '900',
    marginBottom: Tokens.spacing.xs
  },
  stepTitle: {
    color: Tokens.colors.textPrimary,
    fontSize: Tokens.typography.h4.fontSize,
    fontWeight: Tokens.typography.h4.fontWeight,
    marginBottom: Tokens.spacing.xs
  },
  stepDesc: {
    color: Tokens.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18
  }
});
