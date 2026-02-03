import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@theme';
import AppText from './AppText';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  readonly label: string;
  readonly onPress?: () => void;
  readonly disabled?: boolean;
  readonly variant?: ButtonVariant;
  readonly style?: ViewStyle;
};

export default function Button({
  label,
  onPress,
  disabled = false,
  variant = 'primary',
  style,
}: ButtonProps) {
  const theme = useTheme();
  const isPrimary = variant === 'primary';
  const backgroundColorWhenEnabled = isPrimary
    ? theme.colors.primary
    : theme.colors.surface;
  const backgroundColor = disabled
    ? theme.colors.surfaceAlt
    : backgroundColorWhenEnabled;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor,
          borderColor: isPrimary ? theme.colors.primary : theme.colors.border,
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <AppText
        variant="bodyLg"
        style={[
          styles.label,
          {
            color: isPrimary ? theme.colors.surface : theme.colors.ink,
            fontFamily: theme.typography.families.semibold,
          },
        ]}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    letterSpacing: 0.2,
  },
});
