import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Badge } from '../ui';
import { airtimeStyles } from './airtime.styles';

export interface BundleItem {
  code: string;
  name: string;
  price: number;
  validity: string;
}

export interface BundlePackageListProps {
  bundles: BundleItem[];
  selectedBundle: string;
  onSelectBundle: (code: string) => void;
}

export function BundlePackageList({
  bundles,
  selectedBundle,
  onSelectBundle
}: BundlePackageListProps) {
  return (
    <Card style={airtimeStyles.sectionCard}>
      <Card.Header>
        <Card.Title>Select Data or WhatsApp Bundle</Card.Title>
        <Card.Description>Official MNO data packages provisioned via HOT V3</Card.Description>
      </Card.Header>
      <Card.Content>
        {bundles.map((bundle) => {
          const isSelected = selectedBundle === bundle.code;
          return (
            <TouchableOpacity
              key={bundle.code}
              style={[airtimeStyles.bundleItem, isSelected && airtimeStyles.bundleItemActive]}
              onPress={() => onSelectBundle(bundle.code)}
            >
              <View style={{ flex: 1 }}>
                <Text style={[airtimeStyles.bundleName, isSelected && airtimeStyles.bundleNameActive]}>
                  {bundle.name}
                </Text>
                <Text style={airtimeStyles.bundleValidity}>Validity: {bundle.validity}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[airtimeStyles.bundlePrice, isSelected && airtimeStyles.bundlePriceActive]}>
                  ${bundle.price.toFixed(2)} USD
                </Text>
                {isSelected && <Badge variant="warning" label="SELECTED" size="sm" />}
              </View>
            </TouchableOpacity>
          );
        })}
      </Card.Content>
    </Card>
  );
}
