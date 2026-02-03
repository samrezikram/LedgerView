import React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';

type ScreenProps = ViewProps & {
  padded?: boolean;
};

export default function Screen({ padded = true, style, ...props }: ScreenProps) {
  const theme = useTheme();

  return (
    <SafeAreaView
      {...props}
      style={[
        styles.base,
        { backgroundColor: theme.colors.canvas },
        padded && { paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.lg },
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
