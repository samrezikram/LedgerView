import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@theme';
import AppText from './AppText';

type InputVariant = 'outline' | 'filled';

type AppInputProps = TextInputProps & {
  label?: string;
  helperText?: string;
  errorText?: string;
  containerStyle?: ViewStyle;
  variant?: InputVariant;
};

export default function AppInput({
  label,
  helperText,
  errorText,
  containerStyle,
  variant = 'outline',
  style,
  ...props
}: AppInputProps) {
  const theme = useTheme();
  const isOutline = variant === 'outline';

  return (
    <View style={containerStyle}>
      {label ? (
        <AppText tone="muted" style={styles.label}>
          {label}
        </AppText>
      ) : null}
      <TextInput
        {...props}
        placeholderTextColor={theme.colors.inkMuted}
        style={[
          styles.input,
          {
            borderColor: isOutline ? theme.colors.border : 'transparent',
            backgroundColor: isOutline
              ? theme.colors.surface
              : theme.colors.surfaceAlt,
            color: theme.colors.ink,
            fontFamily: theme.typography.families.regular,
          },
          style,
        ]}
      />
      {errorText ? (
        <AppText tone="primary" style={styles.helper}>
          {errorText}
        </AppText>
      ) : helperText ? (
        <AppText tone="muted" style={styles.helper}>
          {helperText}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
  },
  helper: {
    marginTop: 8,
  },
});
