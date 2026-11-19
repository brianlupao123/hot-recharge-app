import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container } from '../ui';
import { Tokens } from '../../theme/tokens';
import { useResponsive } from '../../hooks/useResponsive';

export function LandingFooter() {
  const { isWide } = useResponsive();

  return (
    <View style={styles.footerWrapper}>
      <Container style={[styles.footerContainer, isWide ? styles.footerRow : styles.footerCol]}>
        <View style={styles.brandCol}>
          <Text style={styles.brandTitle}>
            HOT<Text style={{ color: Tokens.colors.textPrimary }}>recharge</Text>
          </Text>
          <Text style={styles.brandSub}>
            Next-Generation Zimbabwean Utility & Airtime Infrastructure
          </Text>
        </View>

        <View style={styles.metaCol}>
          <Text style={styles.metaText}>Support & Inquiries: +263 78 452 9134</Text>
          <Text style={styles.metaText}>Africa University Engineering Partnership</Text>
          <Text style={styles.copyText}>© {new Date().getFullYear()} HOT Recharge. All rights reserved.</Text>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  footerWrapper: {
    paddingVertical: Tokens.spacing.xxl,
    borderTopWidth: 1,
    borderTopColor: Tokens.colors.surfaceBorder,
    backgroundColor: '#060A12'
  },
  footerContainer: {
    justifyContent: 'space-between',
    gap: Tokens.spacing.lg
  },
  footerRow: {
    flexDirection: 'row'
  },
  footerCol: {
    flexDirection: 'column'
  },
  brandCol: {
    maxWidth: 420
  },
  brandTitle: {
    fontSize: Tokens.typography.h3.fontSize,
    fontWeight: '900',
    color: Tokens.colors.primary,
    marginBottom: Tokens.spacing.xs
  },
  brandSub: {
    color: Tokens.colors.textMuted,
    fontSize: Tokens.typography.caption.fontSize,
    lineHeight: 18
  },
  metaCol: {
    gap: Tokens.spacing.xs
  },
  metaText: {
    color: Tokens.colors.textSecondary,
    fontSize: Tokens.typography.caption.fontSize
  },
  copyText: {
    color: Tokens.colors.textMuted,
    fontSize: 11,
    marginTop: Tokens.spacing.xs
  }
});
