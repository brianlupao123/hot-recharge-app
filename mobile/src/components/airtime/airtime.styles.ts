import { StyleSheet } from 'react-native';
import { Tokens } from '../../theme/tokens';

export const airtimeStyles = StyleSheet.create({
  tabsBox: {
    marginBottom: Tokens.spacing.lg
  },
  sectionCard: {
    marginBottom: Tokens.spacing.lg
  },
  cardHeaderBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  carrierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.spacing.xs,
    marginTop: Tokens.spacing.xs
  },
  carrierDot: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  carrierText: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Tokens.spacing.xs,
    marginTop: Tokens.spacing.xs
  },
  amountChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Tokens.radii.full,
    backgroundColor: Tokens.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Tokens.colors.border
  },
  amountChipActive: {
    borderColor: Tokens.colors.hotRed,
    backgroundColor: 'rgba(229, 25, 55, 0.15)'
  },
  amountChipText: {
    fontSize: 12,
    color: Tokens.colors.textSecondary,
    fontWeight: '600'
  },
  amountChipTextActive: {
    color: Tokens.colors.hotRed,
    fontWeight: '800'
  },
  bundleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Tokens.spacing.md,
    borderRadius: Tokens.radii.md,
    backgroundColor: Tokens.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Tokens.colors.border,
    marginBottom: Tokens.spacing.sm
  },
  bundleItemActive: {
    borderColor: Tokens.colors.hotGold,
    backgroundColor: 'rgba(245, 166, 35, 0.12)'
  },
  bundleName: {
    fontSize: 14,
    fontWeight: '700',
    color: Tokens.colors.textPrimary
  },
  bundleNameActive: {
    color: Tokens.colors.hotGold
  },
  bundleValidity: {
    fontSize: 11,
    color: Tokens.colors.textSecondary,
    marginTop: 2
  },
  bundlePrice: {
    fontSize: 15,
    fontWeight: '800',
    color: Tokens.colors.textPrimary,
    marginBottom: 2
  },
  bundlePriceActive: {
    color: Tokens.colors.hotGold
  }
});
