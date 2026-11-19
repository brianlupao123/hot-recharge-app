import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { CustomDarkTheme, Colors } from './src/theme/theme';
import { AuthProvider } from './src/context/AuthContext';
import { WalletProvider } from './src/context/WalletContext';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={CustomDarkTheme}>
        <ErrorBoundary>
          <AuthProvider>
            <WalletProvider>
              <View style={styles.rootContainer}>
                <View style={styles.appContainer}>
                  <NavigationContainer theme={CustomDarkTheme as any}>
                    <StatusBar style="light" />
                    <AppNavigator />
                  </NavigationContainer>
                </View>
              </View>
            </WalletProvider>
          </AuthProvider>
        </ErrorBoundary>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    width: '100%',
    minHeight: '100%'
  },
  appContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.background
  }
});
