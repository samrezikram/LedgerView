import React, { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNotifications } from '@context/NotificationContext';
import { AppText } from '@components';
import { useTheme } from '@theme';

export default function ToastStack() {
  const { notifications, dismiss } = useNotifications();
  const theme = useTheme();

  useEffect(() => {
    if (notifications.length === 0) return;
    const timers = notifications.map(item =>
      setTimeout(() => dismiss(item.id), 4000),
    );
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [notifications, dismiss]);

  if (notifications.length === 0) return null;

  return (
    <View style={styles.container} pointerEvents="box-none">
      {notifications.map(item => (
        <Pressable
          key={item.id}
          onPress={() => dismiss(item.id)}
          style={[
            styles.toast,
            {
              backgroundColor:
                item.type === 'error'
                  ? theme.colors.danger
                  : item.type === 'success'
                    ? theme.colors.success
                    : theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <AppText
            style={{ color: item.type ? theme.colors.surface : theme.colors.ink }}
          >
            {item.message}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 12,
    left: 16,
    right: 16,
    gap: 8,
    zIndex: 1000,
  },
  toast: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
});
