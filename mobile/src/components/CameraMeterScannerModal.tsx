import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dialog, Portal, Button } from 'react-native-paper';
import { Colors } from '../theme/theme';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onMeterScanned: (meterNumber: string) => void;
}

export default function CameraMeterScannerModal({ visible, onDismiss, onMeterScanned }: Props) {
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (visible) {
      setScanning(true);
      const timer = setTimeout(() => {
        setScanning(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const selectMeter = (meter: string) => {
    onMeterScanned(meter);
    onDismiss();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title style={styles.title}>📷 Scan ZETDC Meter Card</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.sub}>
            Point your camera at the barcode or numeric card on your prepaid meter. Zero typing in the dark.
          </Text>

          {/* Camera Viewfinder Mockup */}
          <View style={styles.viewfinder}>
            <View style={styles.scanReticle}>
              <View style={[styles.corner, styles.tl]} />
              <View style={[styles.corner, styles.tr]} />
              <View style={[styles.corner, styles.bl]} />
              <View style={[styles.corner, styles.br]} />
              {scanning && <View style={styles.laserLine} />}
              <Text style={styles.reticleText}>
                {scanning ? '🔍 Scanning Meter Barcode / OCR...' : '⚡ Meter Detected!'}
              </Text>
            </View>
          </View>

          {/* 1-Tap Fast Scan Presets */}
          <Text style={styles.presetTitle}>Or Choose Scanned Card:</Text>
          <TouchableOpacity
            style={styles.presetItem}
            onPress={() => selectMeter('04192837461')}
          >
            <Text style={styles.presetName}>Home Meter Card (Brian Lupao)</Text>
            <Text style={styles.presetCode}>04192837461</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.presetItem}
            onPress={() => selectMeter('37194820194')}
          >
            <Text style={styles.presetName}>AU Lab 3 Card (Africa University)</Text>
            <Text style={styles.presetCode}>37194820194</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.presetItem}
            onPress={() => selectMeter('14920194821')}
          >
            <Text style={styles.presetName}>Fairview Cottage Card (Tendai M)</Text>
            <Text style={styles.presetCode}>14920194821</Text>
          </TouchableOpacity>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss} textColor={Colors.hotRed}>
            Cancel
          </Button>
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
    borderColor: Colors.hotGold
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
  viewfinder: {
    height: 150,
    backgroundColor: '#000000',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    position: 'relative'
  },
  scanReticle: {
    width: '80%',
    height: 90,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  laserLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.alertRed
  },
  reticleText: {
    color: Colors.hotGold,
    fontSize: 11,
    fontWeight: '700'
  },
  corner: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderColor: Colors.hotGold
  },
  tl: { top: -2, left: -2, borderTopWidth: 2, borderLeftWidth: 2 },
  tr: { top: -2, right: -2, borderTopWidth: 2, borderRightWidth: 2 },
  bl: { bottom: -2, left: -2, borderBottomWidth: 2, borderLeftWidth: 2 },
  br: { bottom: -2, right: -2, borderBottomWidth: 2, borderRightWidth: 2 },
  presetTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8
  },
  presetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: Colors.surfaceElevated,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: Colors.border
  },
  presetName: {
    fontSize: 12,
    color: Colors.textPrimary
  },
  presetCode: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.hotGold,
    fontFamily: 'monospace'
  }
});
