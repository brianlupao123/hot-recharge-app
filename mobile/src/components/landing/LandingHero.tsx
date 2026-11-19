import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button, Badge } from '../ui';
import { Tokens } from '../../theme/tokens';
import { useResponsive } from '../../hooks/useResponsive';

interface LandingHeroProps {
  onSignInPress: () => void;
  onSignUpPress: () => void;
}

export function LandingHero({ onSignInPress, onSignUpPress }: LandingHeroProps) {
  const { isWide } = useResponsive();

  return (
    <View style={styles.heroWrapper}>
      <Container style={[styles.heroContainer, isWide ? styles.heroRow : styles.heroCol]}>
        {/* Left Column: Headlines & Call to Actions */}
        <View style={[styles.heroLeft, isWide && styles.flexHeroLeft]}>
          <Badge variant="success" dot style={styles.statusBadge}>
            HOT Recharge V3 Gateway Active
          </Badge>

          <Text style={styles.headline}>
            Instant Electricity & Airtime.{'\n'}Zero Delays.
          </Text>

          <Text style={styles.subtitle}>
            Recharge ZETDC prepaid meters, purchase multi-carrier mobile airtime, and safeguard your
            20-digit tokens in an encrypted offline vault engineered to survive network blackouts.
          </Text>

          <View style={styles.ctaGroup}>
            <Button variant="primary" size="md" onPress={onSignInPress}>
              Sign In to Account
            </Button>
            <Button variant="outline" size="md" onPress={onSignUpPress}>
              Create Account
            </Button>
          </View>

          <View style={styles.trustBadges}>
            <Text style={styles.trustItem}>✓ 20-Second Delivery</Text>
            <Text style={styles.trustItem}>✓ Offline Token Vault</Text>
            <Text style={styles.trustItem}>✓ EcoCash & OneMoney</Text>
          </View>
        </View>

        {/* Right Column: Live Flow Visual Card */}
        <View style={[styles.heroRight, isWide && styles.flexHeroRight]}>
          <View style={styles.previewCard}>
            <View style={styles.previewHeader}>
              <Text style={styles.previewTitle}>Live Recharge Flow</Text>
              <Badge variant="success">VERIFIED</Badge>
            </View>

            <View style={styles.stepItem}>
              <View style={[styles.stepBullet, { backgroundColor: '#3B82F6' }]}>
                <Text style={styles.stepNumber}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Meter Lookup & Name Query</Text>
                <Text style={styles.stepSub}>Stand 448 Fairview · Verified</Text>
              </View>
              <Text style={styles.stepCheck}>✓</Text>
            </View>

            <View style={styles.stepItem}>
              <View style={[styles.stepBullet, { backgroundColor: Tokens.colors.secondary }]}>
                <Text style={styles.stepNumber}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Lifeline Tariff Calculation</Text>
                <Text style={styles.stepSub}>Subsidised domestic tier applied</Text>
              </View>
              <Text style={styles.stepCheck}>✓</Text>
            </View>

            <View style={styles.stepItem}>
              <View style={[styles.stepBullet, { backgroundColor: Tokens.colors.zesaGreen }]}>
                <Text style={styles.stepNumber}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Mobile Money Settlement</Text>
                <Text style={styles.stepSub}>EcoCash USD $20.00</Text>
              </View>
              <Text style={styles.stepCheck}>✓</Text>
            </View>

            <View style={[styles.stepItem, styles.stepHighlight]}>
              <View style={[styles.stepBullet, { backgroundColor: Tokens.colors.primary }]}>
                <Text style={styles.stepNumber}>4</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepTitle, { color: '#FCD34D' }]}>20-Digit Token Delivered</Text>
                <Text style={styles.tokenCode}>4920 · 8371 · 9024 · 1823 · 4901</Text>
                <Text style={styles.stepSub}>Stored in Offline Vault</Text>
              </View>
            </View>
          </View>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  heroWrapper: {
    backgroundColor: '#07101E',
    borderBottomWidth: 1,
    borderBottomColor: Tokens.colors.surfaceBorder,
    paddingVertical: Tokens.spacing.xxl
  },
  heroContainer: {
    gap: Tokens.spacing.xl
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  heroCol: {
    flexDirection: 'column'
  },
  heroLeft: {
    justifyContent: 'center'
  },
  flexHeroLeft: {
    flex: 1.15
  },
  flexHeroRight: {
    flex: 0.85
  },
  statusBadge: {
    marginBottom: Tokens.spacing.md
  },
  headline: {
    fontSize: Tokens.typography.h1.fontSize,
    fontWeight: Tokens.typography.h1.fontWeight,
    lineHeight: Tokens.typography.h1.lineHeight,
    color: Tokens.colors.textPrimary,
    letterSpacing: Tokens.typography.h1.letterSpacing,
    marginBottom: Tokens.spacing.md
  },
  subtitle: {
    fontSize: Tokens.typography.body.fontSize,
    lineHeight: Tokens.typography.body.lineHeight,
    color: Tokens.colors.textSecondary,
    marginBottom: Tokens.spacing.lg,
    maxWidth: 580
  },
  ctaGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Tokens.spacing.sm,
    marginBottom: Tokens.spacing.lg
  },
  trustBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Tokens.spacing.md
  },
  trustItem: {
    fontSize: Tokens.typography.caption.fontSize,
    color: Tokens.colors.textMuted,
    fontWeight: '600'
  },

  // Preview Card
  heroRight: {
    width: '100%'
  },
  previewCard: {
    backgroundColor: Tokens.colors.surface,
    borderRadius: Tokens.radii.lg,
    borderWidth: 1,
    borderColor: Tokens.colors.surfaceBorderStrong,
    padding: Tokens.spacing.lg,
    ...Tokens.shadows.card
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Tokens.colors.surfaceBorder,
    paddingBottom: Tokens.spacing.sm,
    marginBottom: Tokens.spacing.md
  },
  previewTitle: {
    color: Tokens.colors.textPrimary,
    fontSize: Tokens.typography.h4.fontSize,
    fontWeight: Tokens.typography.h4.fontWeight
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.spacing.sm,
    paddingVertical: Tokens.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Tokens.colors.surfaceBorder
  },
  stepHighlight: {
    borderBottomWidth: 0,
    backgroundColor: Tokens.colors.primarySubtle,
    borderRadius: Tokens.radii.sm,
    padding: Tokens.spacing.sm,
    marginTop: Tokens.spacing.xs
  },
  stepBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepNumber: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800'
  },
  stepContent: {
    flex: 1
  },
  stepTitle: {
    color: Tokens.colors.textPrimary,
    fontSize: 13,
    fontWeight: '700'
  },
  stepSub: {
    color: Tokens.colors.textSecondary,
    fontSize: 11,
    marginTop: 2
  },
  stepCheck: {
    color: Tokens.colors.zesaGreen,
    fontWeight: '800',
    fontSize: 14
  },
  tokenCode: {
    color: '#FCD34D',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginVertical: 2
  }
});
