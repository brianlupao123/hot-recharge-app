import React from 'react';
import { View } from 'react-native';
import { Card, Button, Badge, DataRow } from '../ui';
import { UserProfile } from '../../types';
import { walletStyles } from './wallet.styles';

export interface AccountProfileCardProps {
  user: UserProfile | null;
  onSignOut: () => void;
}

export function AccountProfileCard({ user, onSignOut }: AccountProfileCardProps) {
  return (
    <Card style={walletStyles.sectionCard}>
      <Card.Header>
        <Card.Title>Account & Corporate Profile</Card.Title>
        <Card.Description>Enterprise credential verified for CSZ Hackathon 2026</Card.Description>
      </Card.Header>
      <Card.Content>
        <DataRow label="Account Holder" value={user?.fullName || 'Brian Lupao'} />
        <DataRow label="Registered Phone" value={user?.phoneNumber || '+263 78 452 9134'} />
        <DataRow label="Institution / Dept" value={user?.institution || 'Africa University (Computer Science & IT)'} />
        <DataRow
          label="Assigned Role"
          value={<Badge variant="brand" label={user?.role?.toUpperCase() || 'DEVELOPER'} size="sm" />}
        />
        <DataRow
          label="HOT API V3 Mode"
          value={<Badge variant="success" label="CONNECTED / LIVE SANDBOX" size="sm" />}
        />

        <View style={walletStyles.signOutBox}>
          <Button
            variant="outline"
            size="md"
            onPress={onSignOut}
            style={walletStyles.signOutBtn}
          >
            Sign Out of Account
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}
