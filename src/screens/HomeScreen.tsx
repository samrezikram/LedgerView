import React from 'react';
import { StyleSheet } from 'react-native';
import { AppText, Card, Screen } from '../components';
import { useTheme } from '../theme';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <Screen>
      <AppText variant="headline">Market Overview</AppText>
      <AppText variant="bodyLg" tone="muted" style={styles.subtitle}>
        Crypto listings will appear here with sorting and pagination.
      </AppText>
      <Card style={[styles.card, { borderColor: theme.colors.border }]}>
        <AppText tone="muted">Design system toolkit is now in place.</AppText>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 12,
  },
  card: {
    marginTop: 20,
  },
});
