import { useTheme } from '@theme';
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

type Variant = 'caption' | 'body' | 'bodyLg' | 'title' | 'headline' | 'display';

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

  let color: string;
  if (tone === 'muted') {
    color = theme.colors.inkMuted;
  } else if (tone === 'primary') {
    color = theme.colors.primary;
  } else {
    color = theme.colors.ink;
  }

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
  display: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});
