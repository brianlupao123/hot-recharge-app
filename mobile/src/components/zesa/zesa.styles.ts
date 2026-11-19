import { StyleSheet } from 'react-native';
import { Tokens } from '../../theme/tokens';

export const zesaStyles = StyleSheet.create({
  cardHeaderBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statusBox: {
    marginTop: Tokens.spacing.xs
  },
  verifiedBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
    padding: Tokens.spacing.md,
    borderRadius: Tokens.radii.md,
    marginTop: Tokens.spacing.xs
  },
  verifiedTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  verifiedName: {
    fontSize: 14,
    fontWeight: '700',
    color: Tokens.colors.zesaGreen
  },
  verifiedAddress: {
    fontSize: 12,
    color: Tokens.colors.textPrimary,
    marginTop: 2
  },
  verifiedMeter: {
    fontSize: 11,
    color: Tokens.colors.textSecondary,
    marginTop: 2
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
  tariffBox: {
    backgroundColor: Tokens.colors.surfaceElevated,
    padding: Tokens.spacing.md,
    borderRadius: Tokens.radii.md,
    marginTop: Tokens.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Tokens.colors.zesaAmber
  },
  tariffTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tariffTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Tokens.colors.zesaAmber
  },
  tariffUnits: {
    fontSize: 15,
    fontWeight: '900',
    color: Tokens.colors.textPrimary
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Tokens.colors.background,
    marginVertical: 8,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: Tokens.colors.zesaAmber,
    borderRadius: 3
  },
  tariffSub: {
    fontSize: 11,
    color: Tokens.colors.textSecondary,
    lineHeight: 16
  },
  paymentRails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Tokens.spacing.xs
  },
  railItem: {
    flex: 1,
    minWidth: 140,
    padding: 12,
    borderRadius: Tokens.radii.md,
    backgroundColor: Tokens.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Tokens.colors.border,
    alignItems: 'center'
  },
  railItemActive: {
    borderColor: Tokens.colors.hotGold,
    backgroundColor: 'rgba(245, 166, 35, 0.15)'
  },
  railText: {
    fontSize: 12,
    color: Tokens.colors.textSecondary,
    fontWeight: '600'
  },
  railTextActive: {
    color: Tokens.colors.hotGold,
    fontWeight: '800'
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Tokens.spacing.md,
    zIndex: 1000
  },
  modalCard: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: Tokens.colors.surface,
    borderRadius: Tokens.radii.lg,
    borderWidth: 1,
    borderColor: Tokens.colors.hotGold,
    padding: Tokens.spacing.lg
  },
  modalHeader: {
    marginBottom: Tokens.spacing.md
  },
  modalTitle: {
    color: Tokens.colors.hotGold,
    fontWeight: '800',
    fontSize: 20,
    marginTop: 6
  },
  modalSub: {
    color: Tokens.colors.textSecondary,
    fontSize: 13,
    marginTop: 2
  },
  tokenBox: {
    backgroundColor: '#000000',
    padding: Tokens.spacing.md,
    borderRadius: Tokens.radii.md,
    borderWidth: 1.5,
    borderColor: Tokens.colors.hotGold,
    alignItems: 'center',
    marginVertical: Tokens.spacing.md
  },
  tokenDigits: {
    color: Tokens.colors.hotGold,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1.5,
    fontFamily: 'monospace'
  },
  tokenMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  tokenMeta: {
    fontSize: 13,
    color: Tokens.colors.textPrimary,
    fontWeight: '600'
  },
  vaultNote: {
    fontSize: 11,
    color: Tokens.colors.zesaGreen,
    marginBottom: Tokens.spacing.md
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: Tokens.spacing.sm
  },
  actionBtn: {
    flex: 1
  },
  doneBtnBox: {
    marginTop: Tokens.spacing.md
  }
});
