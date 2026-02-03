import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from './AppText';
import { useTheme } from '../theme';

type TopBarProps = {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  style?: ViewStyle;
};

export default function TopBar({
  title,
  subtitle,
  rightAction,
  style,
}: TopBarProps) {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.canvas }}>
      <View
        style={[styles.container, { borderColor: theme.colors.border }, style]}
      >
        <View style={styles.titleBlock}>
          <AppText variant="title">{title}</AppText>
          {subtitle ? (
            <AppText tone="muted" style={styles.subtitle}>
              {subtitle}
            </AppText>
          ) : null}
        </View>
        <View style={styles.rightAction}>{rightAction}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleBlock: {
    flex: 1,
  },
  subtitle: {
    marginTop: 4,
  },
  rightAction: {
    marginTop: 2,
  },
});
