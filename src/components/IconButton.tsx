import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import AppText from './AppText';

type IconButtonProps = {
  icon: string;
  onPress?: () => void;
  style?: ViewStyle;
  active?: boolean;
  size?: 'sm' | 'md' | 'pill';
};

export default function IconButton({
  icon,
  onPress,
  style,
  active = false,
  size = 'md',
}: IconButtonProps) {
  const theme = useTheme();
  const dimension = size === 'sm' ? 30 : size === 'pill' ? 34 : 36;
  const pillWidth = size === 'pill' ? 64 : dimension;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          height: dimension,
          width: pillWidth,
          borderRadius: size === 'pill' ? 999 : dimension / 2,
          backgroundColor: active ? theme.colors.primarySoft : theme.colors.surfaceAlt,
          borderColor: active ? theme.colors.primary : theme.colors.border,
          opacity: pressed ? 0.7 : 1,
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
    width: 40,
  },
});
