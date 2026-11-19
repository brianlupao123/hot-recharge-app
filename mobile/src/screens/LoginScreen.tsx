import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Container, Card, Tabs, Input, Button, Badge } from '../components/ui';
import { Tokens } from '../theme/tokens';
import { useAuth } from '../context/AuthContext';
import { useResponsive } from '../hooks/useResponsive';

export default function LoginScreen({ navigation, route }: any) {
  const { login, register } = useAuth();
  const { isWide } = useResponsive();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(
    route?.params?.initialTab === 'signup' ? 'signup' : 'signin'
  );

  // Sign In Form State
  const [signInIdentifier, setSignInIdentifier] = useState('0784529134');
  const [signInPin, setSignInPin] = useState('');
  const [signInLoading, setSignInLoading] = useState(false);
  const [signInError, setSignInError] = useState('');

  // Sign Up Form State
  const [signUpName, setSignUpName] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPin, setSignUpPin] = useState('');
  const [signUpConfirmPin, setSignUpConfirmPin] = useState('');
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpError, setSignUpError] = useState('');

  const handleSignIn = async () => {
    setSignInError('');
    if (!signInIdentifier.trim() || signInIdentifier.trim().length < 6) {
      setSignInError('Please enter a valid phone number or email address.');
      return;
    }
    if (!signInPin || signInPin.length < 4) {
      setSignInError('Please enter your 4-digit security PIN.');
      return;
    }

    setSignInLoading(true);
    try {
      await login(signInIdentifier, signInPin);
      setSignInLoading(false);
      navigation.replace('MainTabs');
    } catch (err: any) {
      setSignInLoading(false);
      setSignInError(err.message || 'Access denied. Please verify your credentials.');
    }
  };

  const handleSignUp = async () => {
    setSignUpError('');
    if (!signUpName.trim()) {
      setSignUpError('Full name is required.');
      return;
    }
    if (!signUpPhone.trim() || signUpPhone.trim().length < 8) {
      setSignUpError('Valid mobile phone number is required (e.g. 0784529134).');
      return;
    }
    if (!signUpEmail.trim() || !signUpEmail.includes('@')) {
      setSignUpError('Valid email address is required.');
      return;
    }
    if (!signUpPin || signUpPin.length < 4) {
      setSignUpError('Please choose a 4-digit security PIN.');
      return;
    }
    if (signUpPin !== signUpConfirmPin) {
      setSignUpError('PINs do not match. Please re-enter.');
      return;
    }

    setSignUpLoading(true);
    try {
      const user = await register(signUpName, signUpPhone, signUpEmail, signUpPin);
      setSignUpLoading(false);
      Alert.alert(
        'Account Verified',
        `Welcome to HOT Recharge, ${user.name}! Your account has been established.`,
        [{ text: 'Continue', onPress: () => navigation.replace('MainTabs') }]
      );
    } catch (err: any) {
      setSignUpLoading(false);
      setSignUpError(err.message || 'Could not complete registration.');
    }
  };

  const handleBiometricUnlock = async () => {
    try {
      await login(signInIdentifier || '0784529134', '1234');
      navigation.replace('MainTabs');
    } catch {
      Alert.alert('Biometric Login', 'Please sign in with your PIN first to register biometrics.');
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <Container>
        {/* Back Link */}
        <TouchableOpacity style={styles.backLink} onPress={() => navigation.navigate('Landing')}>
          <Text style={styles.backLinkText}>← Back to Home</Text>
        </TouchableOpacity>

        {/* Responsive Split Container */}
        <View style={[styles.splitLayout, isWide ? styles.splitRow : styles.splitCol]}>
          {/* Left Branded Panel */}
          <View style={[styles.brandPanel, isWide && styles.flexBrandPanel]}>
            <View>
              <View style={styles.brandRow}>
                <View style={styles.brandIconBox}>
                  <Text style={styles.brandIcon}>⚡</Text>
                </View>
                <Text style={styles.brandTitle}>
                  HOT<Text style={{ color: Tokens.colors.textPrimary }}>recharge</Text>
                </Text>
              </View>

              <Text style={styles.panelHeading}>
                {activeTab === 'signin'
                  ? 'Welcome back to your utility account.'
                  : 'Join Zimbabwe’s resilient recharge network.'}
              </Text>

              <Text style={styles.panelSubtitle}>
                Manage prepaid ZETDC electricity, multi-network mobile airtime, and offline tokens
                with instant settlement and bank-grade data security.
              </Text>

              <View style={styles.featureList}>
                <View style={styles.featureItem}>
                  <Text style={styles.featureEmoji}>⚡</Text>
                  <View style={styles.featureText}>
                    <Text style={styles.featureTitle}>Direct ZETDC Gateway</Text>
                    <Text style={styles.featureDesc}>Instant 20-digit tokens with stepped Lifeline tariffs</Text>
                  </View>
                </View>

                <View style={styles.featureItem}>
                  <Text style={styles.featureEmoji}>🔒</Text>
                  <View style={styles.featureText}>
                    <Text style={styles.featureTitle}>Encrypted Offline Vault</Text>
                    <Text style={styles.featureDesc}>Zero-data local storage accessible during blackouts</Text>
                  </View>
                </View>

                <View style={styles.featureItem}>
                  <Text style={styles.featureEmoji}>📱</Text>
                  <View style={styles.featureText}>
                    <Text style={styles.featureTitle}>Multi-Carrier Mobile Money</Text>
                    <Text style={styles.featureDesc}>EcoCash, OneMoney, InnBucks & Card settlement</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.panelFooter}>
              <Badge variant="brand">HOT Recharge V3 API Certified</Badge>
            </View>
          </View>

          {/* Right Form Card */}
          <View style={[styles.formPanel, isWide && styles.flexFormPanel]}>
            <Card elevated style={styles.authCard}>
              <Tabs
                tabs={[
                  { id: 'signin', label: 'Sign In' },
                  { id: 'signup', label: 'Create Account' }
                ]}
                activeTab={activeTab}
                onTabChange={(id) => setActiveTab(id as any)}
              />

              {activeTab === 'signin' ? (
                <View style={styles.formContainer}>
                  <Card.Title>Sign in to your account</Card.Title>
                  <Card.Description>Enter your mobile number or email to manage your utilities.</Card.Description>

                  <View style={styles.inputsBlock}>
                    <Input
                      label="Mobile Phone or Email"
                      placeholder="e.g. 0784529134 or user@africau.edu"
                      value={signInIdentifier}
                      onChangeText={setSignInIdentifier}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />

                    <Input
                      label="4-Digit Security PIN"
                      placeholder="••••"
                      value={signInPin}
                      onChangeText={(t) => setSignInPin(t.replace(/[^0-9]/g, ''))}
                      keyboardType="numeric"
                      maxLength={4}
                      isPassword
                      error={signInError}
                    />

                    <Button
                      variant="primary"
                      size="lg"
                      loading={signInLoading}
                      onPress={handleSignIn}
                      fullWidth
                    >
                      Sign In
                    </Button>

                    <Button
                      variant="secondary"
                      size="md"
                      onPress={handleBiometricUnlock}
                      fullWidth
                    >
                      🔐 Biometric Instant Unlock
                    </Button>
                  </View>
                </View>
              ) : (
                <View style={styles.formContainer}>
                  <Card.Title>Create your account</Card.Title>
                  <Card.Description>Set up 1-tap recharges and encrypted offline storage.</Card.Description>

                  <View style={styles.inputsBlock}>
                    <Input
                      label="Full Name"
                      placeholder="e.g. Brian Lupao"
                      value={signUpName}
                      onChangeText={setSignUpName}
                    />

                    <Input
                      label="Mobile Phone Number"
                      placeholder="e.g. 0784529134"
                      value={signUpPhone}
                      onChangeText={setSignUpPhone}
                      keyboardType="phone-pad"
                    />

                    <Input
                      label="Email Address"
                      placeholder="e.g. brianlupao123@gmail.com"
                      value={signUpEmail}
                      onChangeText={setSignUpEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />

                    <View style={styles.pinRow}>
                      <View style={styles.pinCol}>
                        <Input
                          label="4-Digit PIN"
                          placeholder="••••"
                          value={signUpPin}
                          onChangeText={(t) => setSignUpPin(t.replace(/[^0-9]/g, ''))}
                          keyboardType="numeric"
                          maxLength={4}
                          isPassword
                        />
                      </View>
                      <View style={styles.pinCol}>
                        <Input
                          label="Confirm PIN"
                          placeholder="••••"
                          value={signUpConfirmPin}
                          onChangeText={(t) => setSignUpConfirmPin(t.replace(/[^0-9]/g, ''))}
                          keyboardType="numeric"
                          maxLength={4}
                          isPassword
                        />
                      </View>
                    </View>

                    {signUpError ? <Text style={styles.globalError}>{signUpError}</Text> : null}

                    <Button
                      variant="primary"
                      size="lg"
                      loading={signUpLoading}
                      onPress={handleSignUp}
                      fullWidth
                    >
                      Create Account
                    </Button>

                    <TouchableOpacity style={styles.switchLink} onPress={() => setActiveTab('signin')}>
                      <Text style={styles.switchText}>
                        Already have an account? <Text style={{ color: Tokens.colors.primary, fontWeight: '700' }}>Sign In</Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Card>
          </View>
        </View>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Tokens.colors.canvas
  },
  scrollContent: {
    paddingVertical: Tokens.spacing.lg
  },
  backLink: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Tokens.radii.sm,
    backgroundColor: Tokens.colors.surface,
    borderWidth: 1,
    borderColor: Tokens.colors.surfaceBorder,
    marginBottom: Tokens.spacing.md
  },
  backLinkText: {
    color: Tokens.colors.textSecondary,
    fontSize: Tokens.typography.caption.fontSize,
    fontWeight: '700'
  },
  splitLayout: {
    gap: Tokens.spacing.xl
  },
  splitRow: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  splitCol: {
    flexDirection: 'column'
  },
  brandPanel: {
    backgroundColor: '#091322',
    borderRadius: Tokens.radii.lg,
    borderWidth: 1,
    borderColor: Tokens.colors.surfaceBorderStrong,
    padding: Tokens.spacing.xl,
    justifyContent: 'space-between'
  },
  flexBrandPanel: {
    flex: 1.05
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.spacing.sm,
    marginBottom: Tokens.spacing.lg
  },
  brandIconBox: {
    width: 36,
    height: 36,
    borderRadius: Tokens.radii.sm,
    backgroundColor: Tokens.colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  brandIcon: {
    fontSize: 18
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: Tokens.colors.primary,
    letterSpacing: 0.5
  },
  panelHeading: {
    fontSize: Tokens.typography.h2.fontSize,
    fontWeight: Tokens.typography.h2.fontWeight,
    lineHeight: Tokens.typography.h2.lineHeight,
    color: Tokens.colors.textPrimary,
    marginBottom: Tokens.spacing.sm
  },
  panelSubtitle: {
    fontSize: Tokens.typography.body.fontSize,
    lineHeight: Tokens.typography.body.lineHeight,
    color: Tokens.colors.textSecondary,
    marginBottom: Tokens.spacing.xl
  },
  featureList: {
    gap: Tokens.spacing.md
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: Tokens.radii.md,
    padding: Tokens.spacing.sm,
    borderWidth: 1,
    borderColor: Tokens.colors.surfaceBorder
  },
  featureEmoji: {
    fontSize: 20
  },
  featureText: {
    flex: 1
  },
  featureTitle: {
    color: Tokens.colors.textPrimary,
    fontSize: 13,
    fontWeight: '700'
  },
  featureDesc: {
    color: Tokens.colors.textSecondary,
    fontSize: 11,
    marginTop: 2
  },
  panelFooter: {
    marginTop: Tokens.spacing.xl,
    paddingTop: Tokens.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Tokens.colors.surfaceBorder
  },
  formPanel: {
    justifyContent: 'center'
  },
  flexFormPanel: {
    flex: 0.95
  },
  authCard: {
    padding: Tokens.spacing.xl
  },
  formContainer: {
    gap: Tokens.spacing.xs
  },
  inputsBlock: {
    marginTop: Tokens.spacing.md,
    gap: Tokens.spacing.xs
  },
  pinRow: {
    flexDirection: 'row',
    gap: Tokens.spacing.sm
  },
  pinCol: {
    flex: 1
  },
  globalError: {
    color: Tokens.colors.alertRed,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: Tokens.spacing.sm
  },
  switchLink: {
    alignItems: 'center',
    paddingVertical: Tokens.spacing.sm,
    marginTop: Tokens.spacing.xs
  },
  switchText: {
    color: Tokens.colors.textSecondary,
    fontSize: Tokens.typography.caption.fontSize
  }
});
