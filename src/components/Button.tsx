import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import AppText from './AppText';
import { useTheme } from '../theme';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  style?: ViewStyle;
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

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: disabled
            ? theme.colors.surfaceAlt
            : isPrimary
              ? theme.colors.primary
              : theme.colors.surface,
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
