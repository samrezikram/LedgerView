/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from '@navigation/AppNavigator';
import { AuthProvider } from '@context/AuthContext';
import { FavoritesProvider } from '@context/FavoritesContext';
import { NotificationProvider } from '@context/NotificationContext';
import { ThemeProvider } from '@theme';
import { assertEnvReady } from '@lib/env';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  assertEnvReady();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ThemeProvider>
          <AuthProvider>
            <FavoritesProvider>
              <NotificationProvider>
                <BottomSheetModalProvider>
                  <AppContent />
                </BottomSheetModalProvider>
              </NotificationProvider>
            </FavoritesProvider>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function AppContent() {
  return (
    <AppNavigator />
  );
}

export default App;
