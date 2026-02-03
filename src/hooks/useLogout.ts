import { Alert } from 'react-native';
import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export function useLogout() {
  const { signOut, isAuthBusy } = useAuth();

  const handleLogout = useCallback(() => {
    if (isAuthBusy) return;
    Alert.alert('Sign out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: signOut },
    ]);
  }, [isAuthBusy, signOut]);

  return { handleLogout, isAuthBusy };
}
