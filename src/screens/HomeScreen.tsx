import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import { AppText, Card, Screen } from '../components';
import { Coin, fetchCoins } from '../lib/coinranking';
import { useTheme } from '../theme';

const PAGE_LIMIT = 25;

export default function HomeScreen() {
  const theme = useTheme();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const loadCoins = useCallback(
    async (nextOffset: number, append: boolean) => {
      try {
        if (append) {
          setIsLoadingMore(true);
        } else {
          setIsLoading(true);
        }
        setError('');
        const data = await fetchCoins({ limit: PAGE_LIMIT, offset: nextOffset });
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
    []
  );

  useEffect(() => {
    loadCoins(0, false);
  }, [loadCoins]);

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
        <AppText tone="muted">#{item.rank}</AppText>
      </View>
      <View style={styles.rowFooter}>
        <AppText tone="muted">{item.symbol}</AppText>
        <AppText variant="bodyLg">${formatPrice(item.price)}</AppText>
      </View>
    </Card>
  );

  return (
    <Screen>
      <AppText variant="headline">Market Overview</AppText>
      <AppText variant="bodyLg" tone="muted" style={styles.subtitle}>
        Live crypto listings powered by CoinRanking.
      </AppText>
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 12,
  },
  list: {
    paddingVertical: 20,
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
    marginTop: 16,
  },
});
