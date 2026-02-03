import React from 'react';
import { StyleSheet } from 'react-native';
import { AppText, Card, Screen } from '../components';

export default function FavoritesScreen() {
  return (
    <Screen>
      <AppText variant="headline">Favorites</AppText>
      <AppText variant="bodyLg" tone="muted" style={styles.subtitle}>
        Your saved coins will live here with quick access to details.
      </AppText>
      <Card style={styles.card}>
        <AppText tone="muted">Favorites list persistence is next.</AppText>
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
