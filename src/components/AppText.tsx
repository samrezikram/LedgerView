import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { useTheme } from '../theme';

type Variant = 'caption' | 'body' | 'bodyLg' | 'title' | 'headline';

type AppTextProps = TextProps & {
  variant?: Variant;
  tone?: 'default' | 'muted' | 'primary';
};

export default function AppText({
  variant = 'body',
  tone = 'default',
  style,
  ...props
}: AppTextProps) {
  const theme = useTheme();
  const color =
    tone === 'muted'
      ? theme.colors.inkMuted
      : tone === 'primary'
        ? theme.colors.primary
        : theme.colors.ink;

  return (
    <Text
      {...props}
      style={[
        styles.base,
        { color, fontFamily: theme.typography.families.regular },
        styles[variant],
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    letterSpacing: 0.2,
  },
  caption: {
    fontSize: 12,
  },
  body: {
    fontSize: 14,
  },
  bodyLg: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  headline: {
    fontSize: 24,
    fontWeight: '700',
  },
});
