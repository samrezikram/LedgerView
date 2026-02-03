import { useCallback, useEffect, useState } from 'react';
import { Coin, CoinOrderBy, fetchCoins, OrderDirection } from '@lib/coinranking';

const PAGE_LIMIT = 25;

export function useCoins() {
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

  const loadMore = useCallback(() => {
    if (isLoading || isLoadingMore) return;
    const nextOffset = offset + PAGE_LIMIT;
    if (total && nextOffset >= total) return;
    loadCoins(nextOffset, true);
  }, [isLoading, isLoadingMore, offset, total, loadCoins]);

  const refresh = useCallback(() => {
    loadCoins(0, false);
  }, [loadCoins]);

  const formatPrice = useCallback((value: string) => {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? '--' : parsed.toFixed(2);
  }, []);

  return {
    coins,
    isLoading,
    isLoadingMore,
    error,
    orderBy,
    orderDirection,
    setOrderBy,
    setOrderDirection,
    loadMore,
    refresh,
    formatPrice,
  };
}
