import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from 'react-native';
import { Colors } from '../theme/theme';
import { AuthService } from '../services/auth';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ZesaScreen from '../screens/ZesaScreen';
import AirtimeScreen from '../screens/AirtimeScreen';
import VaultScreen from '../screens/VaultScreen';
import WalletScreen from '../screens/WalletScreen';
import MeterFleetScreen from '../screens/MeterFleetScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import AgentScreen from '../screens/AgentScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs({ navigation }: any) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background
        },
        headerTitleStyle: {
          fontWeight: '900',
          color: Colors.hotRed,
          fontSize: 18
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={async () => {
              await AuthService.logout();
              navigation.replace('Landing');
            }}
            style={{ marginRight: 14, paddingVertical: 5, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#1E2330', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.12)' }}
          >
            <Text style={{ color: '#EF4444', fontSize: 11, fontWeight: '700' }}>Sign Out</Text>
          </TouchableOpacity>
        ),
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6
        },
        tabBarActiveTintColor: Colors.hotRed,
        tabBarInactiveTintColor: Colors.textMuted
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Home',
          headerTitle: 'HOT RECHARGE',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🏠</Text>
        }}
      />
      <Tab.Screen
        name="ZESA"
        component={ZesaScreen}
        options={{
          title: 'ZESA',
          headerTitle: 'ZETDC PREPAID ELECTRICITY',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>⚡</Text>
        }}
      />
      <Tab.Screen
        name="Airtime"
        component={AirtimeScreen}
        options={{
          title: 'Airtime',
          headerTitle: 'AIRTIME & DATA BUNDLES',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>📱</Text>
        }}
      />
      <Tab.Screen
        name="Vault"
        component={VaultScreen}
        options={{
          title: 'Vault',
          headerTitle: 'OFFLINE TOKEN VAULT',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🔒</Text>
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          title: 'Wallet',
          headerTitle: 'MULTI-CURRENCY WALLET',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>💳</Text>
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background
        },
        headerTintColor: Colors.hotRed,
        headerTitleStyle: {
          fontWeight: '800',
          color: Colors.textPrimary
        }
      }}
    >
      {/* 1. Onboarding & Landing */}
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false }}
      />

      {/* 2. Authentication & Quick Profiles */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      {/* 3. Main Dashboard & Core Services */}
      <Stack.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />

      {/* 4. Enterprise Subsystems */}
      <Stack.Screen
        name="Fleet"
        component={MeterFleetScreen}
        options={{
          title: 'Multi-Meter Fleet Manager'
        }}
      />
      <Stack.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          title: 'Financial Reports & Tax Invoices'
        }}
      />
      <Stack.Screen
        name="Agent"
        component={AgentScreen}
        options={{
          title: 'Reseller Agent Console'
        }}
      />
    </Stack.Navigator>
  );
}
