import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import RootTabs from './RootTabs';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import { useAuth } from '../context/AuthContext';
import { AppText, Screen } from '../components';
import { useTheme } from '../theme';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AppNavigator() {
  const { session, isLoading, isAuthBusy } = useAuth();
  const theme = useTheme();

  if (isLoading) {
    return (
      <Screen>
        <AppText variant="title">Loading session...</AppText>
      </Screen>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {session ? (
          <RootTabs />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      {isAuthBusy ? (
        <View style={[styles.overlay, { backgroundColor: theme.colors.canvas }]}>
          <ActivityIndicator color={theme.colors.primary} />
          <AppText tone="muted" style={styles.overlayText}>
            Securing your session...
          </AppText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
  },
  overlayText: {
    marginTop: 12,
  },
});
