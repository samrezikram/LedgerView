import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '@context/AuthContext';
import { useNotifications } from '@context/NotificationContext';

export function useLogout() {
  const { signOut, isAuthBusy } = useAuth();
  const { notify } = useNotifications();

  const handleLogout = useCallback(() => {
    if (isAuthBusy) return;
    Alert.alert('Sign out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
          } catch {
            notify('Unable to sign out. Please try again.', 'error');
          }
        },
      },
    ]);
  }, [isAuthBusy, signOut, notify]);

  return { handleLogout, isAuthBusy };
}
