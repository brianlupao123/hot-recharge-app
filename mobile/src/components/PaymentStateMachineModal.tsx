import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dialog, Portal, ProgressBar, Button } from 'react-native-paper';
import { Colors } from '../theme/theme';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onComplete: (result: any) => void;
  orderDetails: {
    target: string;
    customerName?: string;
    amount: number;
    currency: 'USD' | 'ZiG';
    paymentMethod: string;
    isZesa: boolean;
  };
}

export default function PaymentStateMachineModal({ visible, onDismiss, onComplete, orderDetails }: Props) {
  const [stage, setStage] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0.2);

  useEffect(() => {
    if (!visible) {
      setStage(1);
      setProgress(0.2);
      return;
    }

    // Step 1 -> 2: Rate lock
    const t1 = setTimeout(() => {
      setStage(2);
      setProgress(0.4);
    }, 700);

    // Step 2 -> 3: Prompt sent to handset
    const t2 = setTimeout(() => {
      setStage(3);
      setProgress(0.65);
    }, 1500);

    // Step 3 -> 4: Payment confirmed
    const t3 = setTimeout(() => {
      setStage(4);
      setProgress(0.85);
    }, 2400);

    // Step 4 -> 5: Token dispensed & completed
    const t4 = setTimeout(() => {
      setStage(5);
      setProgress(1.0);
      onComplete({
        token: `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        kwh: Math.round((orderDetails.amount / 0.15) * 10) / 10,
        receiptNumber: `REC-${Date.now().toString().slice(-7)}`
      });
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [visible]);

  const STAGES = [
    { num: 1, title: '1. Order Registered', desc: 'Agent reference allocated & validated' },
    { num: 2, title: '2. Tariff & Exchange Locked', desc: 'Stepped Lifeline rate confirmed' },
    { num: 3, title: `3. ${orderDetails.paymentMethod} Prompt Sent`, desc: `USSD pushed to subscriber handset` },
    { num: 4, title: '4. Settlement Confirmed', desc: 'Carrier callback received & verified' },
    { num: 5, title: '5. Token Generated & Saved', desc: 'Saved to encrypted Offline Vault' }
  ];

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title style={styles.title}>⚡ Live Order Execution Pipeline</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.sub}>
            Two-Stage Idempotent Settlement: {orderDetails.currency} ${orderDetails.amount} via {orderDetails.paymentMethod}
          </Text>

          <ProgressBar progress={progress} color={stage === 5 ? Colors.zesaGreen : Colors.hotRed} style={styles.progressBar} />

          <View style={styles.timeline}>
            {STAGES.map((s) => {
              const isPast = stage > s.num;
              const isCurrent = stage === s.num;
              return (
                <View key={s.num} style={styles.stageRow}>
                  <View style={[styles.circle, isPast && styles.circlePast, isCurrent && styles.circleCurrent]}>
                    <Text style={styles.circleText}>{isPast ? '✓' : s.num}</Text>
                  </View>
                  <View style={styles.stageTextWrap}>
                    <Text style={[styles.stageTitle, isCurrent && styles.stageTitleCurrent, isPast && styles.stageTitlePast]}>
                      {s.title}
                    </Text>
                    <Text style={styles.stageDesc}>{s.desc}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {stage === 3 && (
            <View style={styles.promptAlert}>
              <Text style={styles.promptTitle}>📲 Handset Prompt Active</Text>
              <Text style={styles.promptSub}>
                Check handset: Enter PIN to authorize {orderDetails.currency} ${orderDetails.amount.toFixed(2)} to HOT Recharge.
              </Text>
            </View>
          )}

          {stage === 5 && (
            <View style={styles.successAlert}>
              <Text style={styles.successText}>🎉 Transaction 100% Complete & Dispensed!</Text>
            </View>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          {stage === 5 && (
            <Button textColor={Colors.hotGold} onPress={onDismiss}>
              View Token & Receipt
            </Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border
  },
  title: {
    color: Colors.hotGold,
    fontWeight: '800',
    fontSize: 18
  },
  sub: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: 12
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.surfaceElevated,
    marginBottom: 16
  },
  timeline: {
    marginVertical: 4
  },
  stageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  circlePast: {
    backgroundColor: Colors.zesaGreen,
    borderColor: Colors.zesaGreen
  },
  circleCurrent: {
    backgroundColor: Colors.hotRed,
    borderColor: Colors.hotGold
  },
  circleText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800'
  },
  stageTextWrap: {
    flex: 1
  },
  stageTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textMuted
  },
  stageTitlePast: {
    color: Colors.textPrimary
  },
  stageTitleCurrent: {
    color: Colors.hotGold,
    fontWeight: '800'
  },
  stageDesc: {
    fontSize: 10,
    color: Colors.textSecondary
  },
  promptAlert: {
    backgroundColor: 'rgba(245, 166, 35, 0.1)',
    borderWidth: 1,
    borderColor: Colors.hotGold,
    padding: 10,
    borderRadius: 8,
    marginTop: 8
  },
  promptTitle: {
    color: Colors.hotGold,
    fontWeight: '700',
    fontSize: 12
  },
  promptSub: {
    color: Colors.textPrimary,
    fontSize: 11,
    marginTop: 2
  },
  successAlert: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: Colors.zesaGreen,
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center'
  },
  successText: {
    color: Colors.zesaGreen,
    fontWeight: '800',
    fontSize: 13
  }
});
