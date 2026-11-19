import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { LandingHero } from '../components/landing/LandingHero';
import { LandingServiceGrid } from '../components/landing/LandingServiceGrid';
import { LandingStepper } from '../components/landing/LandingStepper';
import { LandingFooter } from '../components/landing/LandingFooter';
import { Tokens } from '../theme/tokens';

export default function LandingScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <LandingNavbar
        onSignInPress={() => navigation.navigate('Login')}
        onGetStartedPress={() => navigation.navigate('Login', { initialTab: 'signup' })}
        onNavLinkPress={() => navigation.navigate('Login')}
      />
      <LandingHero
        onSignInPress={() => navigation.navigate('Login')}
        onSignUpPress={() => navigation.navigate('Login', { initialTab: 'signup' })}
      />
      <LandingServiceGrid
        onServiceSelect={() => navigation.navigate('Login')}
      />
      <LandingStepper />
      <LandingFooter />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Tokens.colors.canvas
  },
  content: {
    flexGrow: 1
  }
});
