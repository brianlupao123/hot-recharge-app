import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Button } from '../ui';
import { Tokens } from '../../theme/tokens';
import { useResponsive } from '../../hooks/useResponsive';

interface LandingNavbarProps {
  onSignInPress: () => void;
  onGetStartedPress: () => void;
  onNavLinkPress: () => void;
}

export function LandingNavbar({
  onSignInPress,
  onGetStartedPress,
  onNavLinkPress
}: LandingNavbarProps) {
  const { isWide } = useResponsive();

  return (
    <View style={styles.navWrapper}>
      <Container style={styles.navContainer}>
        {/* Brand Mark */}
        <View style={styles.brandGroup}>
          <View style={styles.brandBadge}>
            <Text style={styles.brandIcon}>⚡</Text>
          </View>
          <View>
            <Text style={styles.brandName}>
              HOT<Text style={{ color: Tokens.colors.textPrimary }}>recharge</Text>
            </Text>
            <Text style={styles.brandSubtitle}>Utility & Airtime Engine</Text>
          </View>
        </View>

        {/* Desktop Navigation Links */}
        {isWide && (
          <View style={styles.navLinks}>
            <TouchableOpacity onPress={onNavLinkPress}>
              <Text style={styles.linkText}>ZETDC Electricity</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onNavLinkPress}>
              <Text style={styles.linkText}>Airtime & Bundles</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onNavLinkPress}>
              <Text style={styles.linkText}>Offline Vault</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionGroup}>
          <Button variant="outline" size="sm" onPress={onSignInPress}>
            Sign In
          </Button>
          <Button variant="primary" size="sm" onPress={onGetStartedPress}>
            Get Started
          </Button>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  navWrapper: {
    backgroundColor: '#090D16',
    borderBottomWidth: 1,
    borderBottomColor: Tokens.colors.surfaceBorder,
    paddingVertical: Tokens.spacing.sm
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.spacing.sm
  },
  brandBadge: {
    width: 36,
    height: 36,
    borderRadius: Tokens.radii.sm,
    backgroundColor: Tokens.colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  brandIcon: {
    fontSize: 18
  },
  brandName: {
    fontSize: 18,
    fontWeight: '900',
    color: Tokens.colors.primary,
    letterSpacing: 0.5
  },
  brandSubtitle: {
    fontSize: Tokens.typography.caption.fontSize,
    color: Tokens.colors.textSecondary,
    fontWeight: '500'
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.spacing.lg
  },
  linkText: {
    color: Tokens.colors.textSecondary,
    fontSize: Tokens.typography.body.fontSize,
    fontWeight: '600'
  },
  actionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.spacing.sm
  }
});
