import { useTheme } from '@theme';
import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import AppText from './AppText';

type IconButtonProps = {
  readonly icon: string;
  readonly onPress?: () => void;
  readonly style?: ViewStyle;
  readonly active?: boolean;
  readonly size?: 'sm' | 'md' | 'pill';
  readonly disabled?: boolean;
};

export default function IconButton({
  icon,
  onPress,
  style,
  active = false,
  size = 'md',
  disabled = false,
}: IconButtonProps) {
  const theme = useTheme();
  const isPill = size === 'pill';
  const dimension = size === 'sm' ? 30 : 36;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          height: isPill ? 34 : dimension,
          minWidth: isPill ? 72 : dimension,
          paddingHorizontal: isPill ? 12 : 0,
          borderRadius: isPill ? 999 : dimension / 2,
          backgroundColor: active
            ? theme.colors.primarySoft
            : theme.colors.surfaceAlt,
          borderColor: active ? theme.colors.primary : theme.colors.border,
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      <AppText
        style={[
          styles.icon,
          { color: active ? theme.colors.primary : theme.colors.ink },
        ]}
      >
        {icon}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    textAlign: 'center',
    lineHeight: 14,
  },
});
