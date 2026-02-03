import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { AppInput, AppText, Button, Card, Screen } from '@components';
import { useAuth } from '@context/AuthContext';
import { envStatus, isEnvReady } from '@lib/env';
import { AuthStackParamList } from '@navigation/AppNavigator';
import { useTheme } from '@theme';

type Props = Readonly<NativeStackScreenProps<AuthStackParamList, 'Register'>>;

export default function RegisterScreen({ navigation }: Readonly<Props>) {
  const theme = useTheme();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    const result = await signUp(email.trim(), password);
    setIsSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    Alert.alert(
      'Account created',
      'Check your email to confirm your account before signing in.',
    );
    navigation.navigate('Login');
  };

  return (
    <Screen padded={false} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={styles.flex}
      >
        <View style={[styles.header, { backgroundColor: theme.colors.canvas }]}>
          <AppText variant="display">Create account</AppText>
          <AppText variant="bodyLg" tone="muted" style={styles.headerSubtitle}>
            Build your secure portfolio dashboard.
          </AppText>
        </View>
        <Card style={styles.card}>
          <AppText variant="title">Get started</AppText>
          <AppText tone="muted" style={styles.subtitle}>
            Your credentials are managed by Supabase Auth.
          </AppText>
          {!isEnvReady ? (
            <AppText tone="primary" style={styles.error}>
              Missing environment variables: {envStatus.missing.join(', ')}.
            </AppText>
          ) : null}
          <View style={styles.field}>
            <AppInput
              label="Email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="you@company.com"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.field}>
            <AppInput
              label="Password"
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          {error ? (
            <AppText tone="primary" style={styles.error}>
              {error}
            </AppText>
          ) : null}
          <Button
            label={isSubmitting ? 'Creating account...' : 'Create account'}
            onPress={handleRegister}
            disabled={isSubmitting || !isEnvReady}
            style={styles.primaryButton}
          />
          <Button
            label="Back to login"
            variant="secondary"
            onPress={() => navigation.navigate('Login')}
          />
        </Card>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    paddingTop: 72,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  headerSubtitle: {
    marginTop: 12,
  },
  card: {
    marginHorizontal: 20,
    marginTop: -10,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 20,
  },
  field: {
    marginBottom: 16,
  },
  error: {
    marginBottom: 12,
  },
  primaryButton: {
    marginTop: 8,
    marginBottom: 12,
  },
});
