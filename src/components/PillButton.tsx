import { useTheme } from '@theme';
import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import AppText from './AppText';

type PillButtonProps = {
  readonly label: string;
  readonly selected?: boolean;
  readonly onPress?: () => void;
  readonly style?: ViewStyle;
};

export default function PillButton({
  label,
  selected = false,
  onPress,
  style,
}: PillButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: selected
            ? theme.colors.primary
            : theme.colors.surfaceAlt,
          borderColor: selected ? theme.colors.primary : theme.colors.border,
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      <AppText
        style={[
          styles.label,
          { color: selected ? theme.colors.surface : theme.colors.ink },
        ]}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
