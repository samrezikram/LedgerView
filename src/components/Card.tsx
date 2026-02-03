import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from '../theme';

export default function Card({ style, ...props }: ViewProps) {
  const theme = useTheme();

  return (
    <View
      {...props}
      style={[
        styles.base,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radii.lg,
        },
        theme.shadows.soft,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    padding: 16,
  },
});
