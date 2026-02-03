import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.subtitle}>
        Your saved coins will live here with quick access to details.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: '#F6F7FB',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0B0F1A',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 14,
    color: '#5B6474',
  },
});
