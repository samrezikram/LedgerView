import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import { AppText, Card, IconButton, PillButton, TopBar } from '../components';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import {
  Coin,
  CoinOrderBy,
  fetchCoins,
  OrderDirection,
} from '../lib/coinranking';
import { useTheme } from '../theme';

const PAGE_LIMIT = 25;
const ORDER_OPTIONS: { label: string; value: CoinOrderBy }[] = [
  { label: 'Price', value: 'price' },
  { label: 'MCap', value: 'marketCap' },
  { label: '24H', value: '24hVolume' },
  { label: 'Change', value: 'change' },
  { label: 'Listed', value: 'listedAt' },
];

export default function HomeScreen() {
  const theme = useTheme();
  const { signOut } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [orderBy, setOrderBy] = useState<CoinOrderBy>('marketCap');
  const [orderDirection, setOrderDirection] =
    useState<OrderDirection>('desc');

  const loadCoins = useCallback(
    async (nextOffset: number, append: boolean) => {
      try {
        if (append) {
          setIsLoadingMore(true);
        } else {
          setIsLoading(true);
        }
        setError('');
        const data = await fetchCoins({
          limit: PAGE_LIMIT,
          offset: nextOffset,
          orderBy,
          orderDirection,
        });
        setTotal(data.stats?.total ?? 0);
        setCoins(prev => (append ? [...prev, ...data.coins] : data.coins));
        setOffset(nextOffset);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load coins. Check your connection.'
        );
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [orderBy, orderDirection]
  );

  useEffect(() => {
    setCoins([]);
    setOffset(0);
    loadCoins(0, false);
  }, [orderBy, orderDirection, loadCoins]);

  const handleLoadMore = () => {
    if (isLoading || isLoadingMore) return;
    const nextOffset = offset + PAGE_LIMIT;
    if (total && nextOffset >= total) return;
    loadCoins(nextOffset, true);
  };

  const formatPrice = (value: string) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return '--';
    return parsed.toFixed(2);
  };

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
    <View style={styles.flex}>
      <TopBar
        title="Market Overview"
        subtitle="Live crypto listings powered by CoinRanking."
        rightAction={
          <IconButton
            icon="OUT"
            onPress={() =>
              Alert.alert('Sign out', 'Are you sure you want to log out?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Log out', style: 'destructive', onPress: signOut },
              ])
            }
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
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.6}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={
            isLoadingMore ? (
              <View style={styles.loadingMore}>
                <ActivityIndicator color={theme.colors.primary} />
              </View>
            ) : null
          }
        />
      )}
    </View>
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
    paddingBottom: 24,
    paddingTop: 8,
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
