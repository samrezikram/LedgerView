import React, { useCallback } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { AppText, Card, IconButton, TopBar } from '../components';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../theme';

export default function FavoritesScreen() {
  const theme = useTheme();
  const { signOut, isAuthBusy } = useAuth();
  const { favorites, isLoading, toggleFavorite } = useFavorites();
  const formatPrice = useCallback((value: string) => {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? '--' : parsed.toFixed(2);
  }, []);

  return (
    <View style={[styles.flex, { backgroundColor: theme.colors.canvas }]}>
      <TopBar
        title="Favorites"
        subtitle="Your saved coins in one place."
        rightAction={
          <IconButton
            icon="Logout"
            onPress={() =>
              Alert.alert('Sign out', 'Are you sure you want to log out?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Log out', style: 'destructive', onPress: signOut },
              ])
            }
            size="pill"
            disabled={isAuthBusy}
          />
        }
      />
      {isLoading ? (
        <View style={styles.loading}>
          <AppText tone="muted">Loading favorites...</AppText>
        </View>
      ) : favorites.length === 0 ? (
        <Card style={styles.emptyCard}>
          <AppText tone="muted">
            No favorites yet. Add coins from the Home tab.
          </AppText>
        </Card>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.uuid}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <Card style={styles.row}>
              <View style={styles.rowHeader}>
                <AppText variant="bodyLg" style={styles.coinName}>
                  {item.name}
                </AppText>
                <IconButton
                  icon="Remove"
                  size="pill"
                  onPress={() => toggleFavorite(item)}
                />
              </View>
              <View style={styles.rowFooter}>
                <AppText tone="muted">{item.symbol}</AppText>
                <AppText variant="bodyLg">${formatPrice(item.price)}</AppText>
              </View>
            </Card>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  emptyCard: {
    marginHorizontal: 20,
    marginTop: 16,
  },
  loading: {
    padding: 24,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
  },
  separator: {
    height: 12,
  },
  row: {
    padding: 16,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coinName: {
    flex: 1,
    marginRight: 12,
  },
  rowFooter: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
