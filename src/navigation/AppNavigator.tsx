import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { AppText, Screen, ToastStack } from '@components';
import { useAuth } from '@context/AuthContext';
import LoginScreen from '@auth/LoginScreen';
import RegisterScreen from '@auth/RegisterScreen';
import { useTheme } from '@theme';
import RootTabs from '@navigation/RootTabs';

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
        <View
          style={[styles.overlay, { backgroundColor: theme.colors.canvas }]}
        >
          <ActivityIndicator color={theme.colors.primary} />
          <AppText tone="muted" style={styles.overlayText}>
            Securing your session...
          </AppText>
        </View>
      ) : null}
      <ToastStack />
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
