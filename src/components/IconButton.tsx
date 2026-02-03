import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

type IconButtonProps = {
  icon: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function IconButton({ icon, onPress, style }: IconButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: theme.colors.surfaceAlt,
          borderColor: theme.colors.border,
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      <Text style={[styles.icon, { color: theme.colors.ink }]}>{icon}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 16,
    fontWeight: '700',
  },
});
