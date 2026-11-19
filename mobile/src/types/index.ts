export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  walletBalanceUsd: number;
  walletBalanceZig: number;
  createdAt?: string;
  lastLogin?: string;
}

export type CurrencyType = 'USD' | 'ZiG';

export interface ZesaTariff {
  kwh: number;
  tariffTier: string;
  costBreakdown: {
    tier1Cost: number;
    tier2Cost: number;
    vat: number;
    reaLevy: number;
    totalUnits: number;
  };
}

export interface StoredToken {
  id: string;
  type: 'ZESA' | 'AIRTIME' | 'BUNDLE';
  target: string;
  customerName?: string;
  amount: number;
  currency: CurrencyType;
  token?: string;
  kwh?: number;
  receiptNumber: string;
  timestamp: string;
}

export interface AirtimeProduct {
  productId: number;
  brand: string;
  carrier: 'Econet' | 'NetOne' | 'Telecel';
  name: string;
  currency: CurrencyType;
  minAmount: number;
  maxAmount: number;
  step: number;
}
