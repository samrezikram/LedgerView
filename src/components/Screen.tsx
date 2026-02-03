import React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';

type ScreenProps = ViewProps & {
  padded?: boolean;
  edges?: Edge[];
};

export default function Screen({
  padded = true,
  edges = ['top', 'left', 'right'],
  style,
  ...props
}: ScreenProps) {
  const theme = useTheme();

  return (
    <SafeAreaView
      {...props}
      edges={edges}
      style={[
        styles.base,
        { backgroundColor: theme.colors.canvas },
        padded && {
          paddingHorizontal: theme.spacing.lg,
          paddingTop: theme.spacing.lg,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
});
