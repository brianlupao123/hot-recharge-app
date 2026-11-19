import { StyleSheet } from 'react-native';
import { Tokens } from '../../theme/tokens';
import { Colors } from '../../theme/theme';

export const dashboardStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Tokens.spacing.md,
    paddingTop: 4
  },
  appName: {
    fontSize: 22,
    fontWeight: '900',
    color: Tokens.colors.hotRed,
    letterSpacing: -0.5
  },
  appSub: {
    fontSize: 12,
    color: Tokens.colors.textSecondary,
    marginTop: 2
  },
  currencyToggle: {
    backgroundColor: Tokens.colors.surfaceElevated,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Tokens.radii.full,
    borderWidth: 1,
    borderColor: Tokens.colors.hotGold
  },
  currencyToggleText: {
    color: Tokens.colors.hotGold,
    fontSize: 11,
    fontWeight: '700'
  },
  balanceCard: {
    backgroundColor: Tokens.colors.surface,
    borderWidth: 1.5,
    borderColor: Tokens.colors.border,
    borderRadius: Tokens.radii.lg,
    marginBottom: Tokens.spacing.lg
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  balanceLabel: {
    fontSize: 11,
    color: Tokens.colors.textSecondary,
    fontWeight: '600'
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: '900',
    color: Tokens.colors.textPrimary,
    marginTop: 4
  },
  currencyCode: {
    fontSize: 14,
    color: Tokens.colors.hotGold,
    fontWeight: '700'
  },
  balanceMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)'
  },
  balanceMeta: {
    fontSize: 11,
    color: Tokens.colors.textMuted
  },
  balanceNetwork: {
    fontSize: 11,
    color: Tokens.colors.zesaGreen,
    fontWeight: '600'
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Tokens.colors.textPrimary,
    marginBottom: 10,
    marginTop: 8
  },
  tilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Tokens.spacing.sm,
    marginBottom: Tokens.spacing.lg
  },
  tile: {
    flex: 1,
    minWidth: 140,
    backgroundColor: Tokens.colors.surface,
    borderWidth: 1,
    borderRadius: Tokens.radii.md,
    padding: Tokens.spacing.md
  },
  tileEmoji: {
    fontSize: 24,
    marginBottom: 6
  },
  tileTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Tokens.colors.textPrimary
  },
  tileSubtitle: {
    fontSize: 11,
    color: Tokens.colors.textSecondary,
    marginTop: 2
  },
  enterpriseRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Tokens.spacing.sm,
    marginBottom: Tokens.spacing.lg
  },
  entCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: Tokens.colors.surfaceElevated,
    borderWidth: 1,
    borderRadius: Tokens.radii.md,
    padding: Tokens.spacing.md
  },
  entEmoji: {
    fontSize: 20,
    marginBottom: 4
  },
  entTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Tokens.colors.textPrimary
  },
  entSub: {
    fontSize: 10,
    color: Tokens.colors.textMuted,
    marginTop: 2
  },
  favoritesRow: {
    flexDirection: 'row',
    marginBottom: Tokens.spacing.lg
  },
  chip: {
    marginRight: 8,
    backgroundColor: Tokens.colors.surfaceElevated
  },
  recentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: Tokens.colors.hotGold
  },
  txCard: {
    backgroundColor: Tokens.colors.surface,
    borderWidth: 1,
    borderColor: Tokens.colors.border,
    borderRadius: Tokens.radii.md,
    marginBottom: Tokens.spacing.xs
  },
  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  txTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Tokens.colors.textPrimary
  },
  txTarget: {
    fontSize: 11,
    color: Tokens.colors.textSecondary,
    marginTop: 2
  },
  txToken: {
    fontSize: 10,
    color: Tokens.colors.hotGold,
    fontFamily: 'monospace',
    marginTop: 2
  },
  txAmount: {
    fontSize: 14,
    fontWeight: '800',
    color: Tokens.colors.textPrimary
  },
  txKwh: {
    fontSize: 11,
    color: Tokens.colors.zesaGreen,
    fontWeight: '700',
    marginTop: 2
  }
});
