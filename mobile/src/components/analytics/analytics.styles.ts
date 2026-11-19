import { StyleSheet } from 'react-native';
import { Tokens } from '../../theme/tokens';

export const analyticsStyles = StyleSheet.create({
  kpiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Tokens.spacing.md,
    marginBottom: Tokens.spacing.lg
  },
  sectionCard: {
    marginBottom: Tokens.spacing.lg
  },
  barWrap: {
    marginBottom: Tokens.spacing.md
  },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  barLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Tokens.colors.textPrimary
  },
  barVal: {
    fontSize: 12,
    fontWeight: '700',
    color: Tokens.colors.textSecondary
  },
  track: {
    height: 6,
    backgroundColor: Tokens.colors.surfaceElevated,
    borderRadius: 3,
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    borderRadius: 3
  },
  invoiceHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Tokens.spacing.sm
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Tokens.colors.textPrimary
  },
  tokenPillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Tokens.spacing.xs,
    marginBottom: Tokens.spacing.sm
  },
  tokenPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Tokens.radii.sm,
    backgroundColor: Tokens.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Tokens.colors.border
  },
  tokenPillActive: {
    borderColor: Tokens.colors.hotGold,
    backgroundColor: 'rgba(245, 166, 35, 0.15)'
  },
  tokenPillText: {
    fontSize: 11,
    color: Tokens.colors.textSecondary
  },
  tokenPillTextActive: {
    color: Tokens.colors.hotGold,
    fontWeight: '700'
  },
  taxInvoiceCard: {
    borderColor: 'rgba(245, 166, 35, 0.35)',
    backgroundColor: '#0A0C10',
    borderWidth: 1.5
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  invoiceCompany: {
    fontSize: 13,
    fontWeight: '800',
    color: Tokens.colors.textPrimary,
    letterSpacing: 0.5
  },
  invoiceTaxTag: {
    fontSize: 10,
    fontWeight: '900',
    color: Tokens.colors.hotGold,
    letterSpacing: 1,
    marginTop: 2
  },
  invoiceRef: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: Tokens.colors.textMuted
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: Tokens.spacing.sm
  },
  shareInvoiceBtn: {
    marginTop: Tokens.spacing.md
  }
});
