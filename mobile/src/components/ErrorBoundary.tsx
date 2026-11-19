import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Tokens } from '../theme/tokens';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught application exception:', error, errorInfo);
  }

  public resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.icon}>🛡️</Text>
            <Text style={styles.title}>System Resiliency Recovery</Text>
            <Text style={styles.message}>
              An isolated interface exception occurred. Your persistent wallet ledger and offline vault tokens remain completely secure.
            </Text>
            {this.state.error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{this.state.error.message}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.button} onPress={this.resetError}>
              <Text style={styles.buttonText}>Restart Interface</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Tokens.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  card: {
    backgroundColor: Tokens.colors.surface,
    padding: 28,
    borderRadius: Tokens.radii.lg,
    borderWidth: 1,
    borderColor: Tokens.colors.border,
    alignItems: 'center',
    maxWidth: 440,
    width: '100%'
  },
  icon: {
    fontSize: 42,
    marginBottom: 12
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Tokens.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8
  },
  message: {
    fontSize: 13,
    color: Tokens.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16
  },
  errorBox: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: Tokens.radii.sm,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    marginBottom: 16,
    width: '100%'
  },
  errorText: {
    fontSize: 11,
    color: '#EF4444',
    fontFamily: 'monospace'
  },
  button: {
    backgroundColor: Tokens.colors.hotRed,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: Tokens.radii.md
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800'
  }
});
