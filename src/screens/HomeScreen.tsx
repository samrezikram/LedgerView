import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import {
  AppText,
  Card,
  IconButton,
  PillButton,
  Screen,
  TopBar,
} from '@components';
import { useCoins, useFavoritesState, useLogout } from '@hooks';
import { Coin, CoinOrderBy, OrderDirection } from '@lib/coinranking';
import { useTheme } from '@theme';

const ORDER_OPTIONS: { label: string; value: CoinOrderBy }[] = [
  { label: 'Price', value: 'price' },
  { label: 'MCap', value: 'marketCap' },
  { label: '24H', value: '24hVolume' },
  { label: 'Change', value: 'change' },
  { label: 'Listed', value: 'listedAt' },
];

const ItemSeparator = () => <View style={styles.separator} />;

export default function HomeScreen() {
  const theme = useTheme();
  const { handleLogout, isAuthBusy } = useLogout();
  const { toggleFavorite, isFavorite } = useFavoritesState();
  const {
    coins,
    isLoading,
    isLoadingMore,
    error,
    orderBy,
    orderDirection,
    setOrderBy,
    setOrderDirection,
    loadMore,
    formatPrice,
  } = useCoins();

  const renderItem = ({ item }: ListRenderItemInfo<Coin>) => (
    <Card style={styles.row}>
      <View style={styles.rowHeader}>
        <AppText variant="bodyLg">{item.name}</AppText>
        <View style={styles.rowHeaderRight}>
          <AppText tone="muted">#{item.rank}</AppText>
          <IconButton
            icon={isFavorite(item.uuid) ? 'FAV' : 'ADD'}
            active={isFavorite(item.uuid)}
            size="sm"
            onPress={() => toggleFavorite(item)}
            style={styles.favoriteButton}
          />
        </View>
      </View>
      <View style={styles.rowFooter}>
        <AppText tone="muted">{item.symbol}</AppText>
        <AppText variant="bodyLg">${formatPrice(item.price)}</AppText>
      </View>
    </Card>
  );

  return (
    <Screen padded={false} style={styles.flex}>
      <TopBar
        title="Market Overview"
        subtitle="Live crypto listings powered by CoinRanking."
        rightAction={
          <IconButton
            icon="Logout"
            onPress={handleLogout}
            size="pill"
            disabled={isAuthBusy}
          />
        }
      />
      <View style={styles.filters}>
        <AppText tone="muted" style={styles.filterLabel}>
          Sort by
        </AppText>
        <View style={styles.filterRow}>
          {ORDER_OPTIONS.map(option => (
            <PillButton
              key={option.value}
              label={option.label}
              selected={orderBy === option.value}
              onPress={() => setOrderBy(option.value)}
              style={styles.filterPill}
            />
          ))}
        </View>
        <View style={styles.directionRow}>
          {(['asc', 'desc'] as OrderDirection[]).map(direction => (
            <PillButton
              key={direction}
              label={direction === 'asc' ? 'Ascending' : 'Descending'}
              selected={orderDirection === direction}
              onPress={() => setOrderDirection(direction)}
              style={styles.directionPill}
            />
          ))}
        </View>
      </View>
      {error ? (
        <Card style={styles.errorCard}>
          <AppText tone="primary">{error}</AppText>
        </Card>
      ) : null}
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={coins}
          keyExtractor={item => item.uuid}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.6}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={
            isLoadingMore ? (
              <View style={styles.loadingMore}>
                <ActivityIndicator color={theme.colors.primary} />
              </View>
            ) : null
          }
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  subtitle: {
    marginTop: 12,
  },
  filters: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  filterLabel: {
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterPill: {
    marginBottom: 8,
  },
  directionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  directionPill: {
    paddingHorizontal: 16,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 12,
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
  rowHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  favoriteButton: {
    marginLeft: 8,
  },
  rowFooter: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loading: {
    paddingVertical: 40,
  },
  loadingMore: {
    paddingVertical: 16,
  },
  errorCard: {
    marginHorizontal: 20,
    marginTop: 12,
  },
});
