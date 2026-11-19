import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Input, Button } from '../ui';
import { CurrencyType } from '../../types';
import { walletStyles } from './wallet.styles';

export interface DepositFormCardProps {
  currency: CurrencyType;
  onSetCurrency: (curr: CurrencyType) => void;
  depositAmount: string;
  onAmountChange: (val: string) => void;
  paymentRail: string;
  onSelectRail: (rail: string) => void;
  loading: boolean;
  onSubmitDeposit: () => void;
}

const DEPOSIT_RAILS = ['EcoCash', 'OneMoney', 'InnBucks', 'ZimSwitch Card'];

export function DepositFormCard({
  currency,
  onSetCurrency,
  depositAmount,
  onAmountChange,
  paymentRail,
  onSelectRail,
  loading,
  onSubmitDeposit
}: DepositFormCardProps) {
  return (
    <Card style={walletStyles.sectionCard}>
      <Card.Header>
        <Card.Title>Top Up In-App Balance</Card.Title>
        <Card.Description>Fund via EcoCash, OneMoney, InnBucks, or ZimSwitch</Card.Description>
      </Card.Header>
      <Card.Content>
        {/* Currency Choice */}
        <View style={walletStyles.curToggleRow}>
          <TouchableOpacity
            style={[walletStyles.curBtn, currency === 'USD' && walletStyles.curBtnActive]}
            onPress={() => onSetCurrency('USD')}
          >
            <Text style={[walletStyles.curBtnText, currency === 'USD' && walletStyles.curBtnTextActive]}>USD ($)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[walletStyles.curBtn, currency === 'ZiG' && walletStyles.curBtnActive]}
            onPress={() => onSetCurrency('ZiG')}
          >
            <Text style={[walletStyles.curBtnText, currency === 'ZiG' && walletStyles.curBtnTextActive]}>ZiG</Text>
          </TouchableOpacity>
        </View>

        <Input
          label="Deposit Amount"
          placeholder="e.g. 25"
          value={depositAmount}
          onChangeText={onAmountChange}
          keyboardType="decimal-pad"
        />

        {/* Payment Rails */}
        <Text style={walletStyles.methodLabel}>Deposit Rail:</Text>
        <View style={walletStyles.methodsRow}>
          {DEPOSIT_RAILS.map((method) => (
            <TouchableOpacity
              key={method}
              style={[walletStyles.methodChip, paymentRail === method && walletStyles.methodChipActive]}
              onPress={() => onSelectRail(method)}
            >
              <Text style={[walletStyles.methodText, paymentRail === method && walletStyles.methodTextActive]}>
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          variant="primary"
          size="lg"
          loading={loading}
          onPress={onSubmitDeposit}
          style={walletStyles.depositBtn}
        >
          Deposit {currency === 'USD' ? `$${depositAmount}` : `${depositAmount} ZiG`} via {paymentRail}
        </Button>
      </Card.Content>
    </Card>
  );
}
