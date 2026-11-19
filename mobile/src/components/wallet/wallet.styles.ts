import { StyleSheet } from 'react-native';
import { Tokens } from '../../theme/tokens';

export const walletStyles = StyleSheet.create({
  walletsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Tokens.spacing.md,
    marginBottom: Tokens.spacing.lg
  },
  sectionCard: {
    marginBottom: Tokens.spacing.lg
  },
  curToggleRow: {
    flexDirection: 'row',
    gap: Tokens.spacing.sm,
    marginBottom: Tokens.spacing.md
  },
  curBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Tokens.radii.full,
    backgroundColor: Tokens.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Tokens.colors.border
  },
  curBtnActive: {
    borderColor: Tokens.colors.hotGold,
    backgroundColor: 'rgba(245, 166, 35, 0.15)'
  },
  curBtnText: {
    fontSize: 12,
    color: Tokens.colors.textSecondary,
    fontWeight: '700'
  },
  curBtnTextActive: {
    color: Tokens.colors.hotGold
  },
  methodLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Tokens.colors.textSecondary,
    marginBottom: 8,
    marginTop: 4
  },
  methodsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Tokens.spacing.xs,
    marginBottom: Tokens.spacing.lg
  },
  methodChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: Tokens.radii.sm,
    backgroundColor: Tokens.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Tokens.colors.border
  },
  methodChipActive: {
    borderColor: Tokens.colors.hotGold,
    backgroundColor: 'rgba(245, 166, 35, 0.15)'
  },
  methodText: {
    fontSize: 12,
    color: Tokens.colors.textSecondary,
    fontWeight: '600'
  },
  methodTextActive: {
    color: Tokens.colors.hotGold,
    fontWeight: '700'
  },
  depositBtn: {
    marginTop: Tokens.spacing.xs
  },
  signOutBox: {
    marginTop: Tokens.spacing.lg,
    alignItems: 'flex-start'
  },
  signOutBtn: {
    borderColor: 'rgba(239, 68, 68, 0.4)'
  }
});
