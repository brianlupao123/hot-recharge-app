import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CurrencyType } from '../types';
import { useAuth } from './AuthContext';

interface WalletContextType {
  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;
  toggleCurrency: () => void;
  balanceUsd: number;
  balanceZig: number;
  activeBalance: number;
  deductBalance: (amount: number, curr: CurrencyType) => boolean;
  deposit: (amount: number, curr: CurrencyType) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const { user, refreshUser } = useAuth();
  const [currency, setCurrency] = useState<CurrencyType>('USD');
  const [balanceUsd, setBalanceUsd] = useState<number>(user?.walletBalanceUsd ?? 142.50);
  const [balanceZig, setBalanceZig] = useState<number>(user?.walletBalanceZig ?? 2850.00);

  useEffect(() => {
    if (user) {
      setBalanceUsd(user.walletBalanceUsd);
      setBalanceZig(user.walletBalanceZig);
    }
  }, [user]);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'ZiG' : 'USD'));
  };

  const deductBalance = (amount: number, curr: CurrencyType): boolean => {
    if (curr === 'USD') {
      if (balanceUsd < amount) return false;
      setBalanceUsd((prev) => parseFloat((prev - amount).toFixed(2)));
    } else {
      if (balanceZig < amount) return false;
      setBalanceZig((prev) => parseFloat((prev - amount).toFixed(2)));
    }
    refreshUser();
    return true;
  };

  const deposit = (amount: number, curr: CurrencyType) => {
    if (curr === 'USD') {
      setBalanceUsd((prev) => parseFloat((prev + amount).toFixed(2)));
    } else {
      setBalanceZig((prev) => parseFloat((prev + amount).toFixed(2)));
    }
    refreshUser();
  };

  const activeBalance = currency === 'USD' ? balanceUsd : balanceZig;

  return (
    <WalletContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        balanceUsd,
        balanceZig,
        activeBalance,
        deductBalance,
        deposit
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletContextType {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
