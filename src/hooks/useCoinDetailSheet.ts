import { useCallback, useEffect, useMemo, useState } from 'react';
import type { RefObject } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Coin, CoinHistoryPoint, fetchCoinHistory } from '@lib/coinranking';
import { useNotifications } from '@context/NotificationContext';

type UseCoinDetailSheetParams = {
  sheetRef: RefObject<BottomSheetModal | null>;
};

export function useCoinDetailSheet({ sheetRef }: UseCoinDetailSheetParams) {
  const { notify } = useNotifications();
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [history, setHistory] = useState<CoinHistoryPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timePeriod, setTimePeriod] = useState('7d');

  const openCoin = useCallback(
    (coin: Coin) => {
      setSelectedCoin(coin);
      sheetRef.current?.present();
    },
    [sheetRef]
  );

  const close = useCallback(() => {
    sheetRef.current?.dismiss();
  }, [sheetRef]);

  useEffect(() => {
    if (!selectedCoin) return;
    let isActive = true;

    const load = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await fetchCoinHistory({
          uuid: selectedCoin.uuid,
          timePeriod,
        });
        if (!isActive) return;
        const ordered = [...data.history].sort(
          (a, b) => a.timestamp - b.timestamp
        );
        setHistory(ordered);
      } catch (err) {
        if (!isActive) return;
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load history. Try again.'
        );
        notify('Unable to load price history. Try again.', 'error');
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    load();
    return () => {
      isActive = false;
    };
  }, [selectedCoin, timePeriod]);

  const highLow = useMemo(() => {
    if (history.length === 0) return { high: '--', low: '--' };
    const prices = history
      .map(point => Number(point.price))
      .filter(value => !Number.isNaN(value));
    if (prices.length === 0) return { high: '--', low: '--' };
    return {
      high: Math.max(...prices),
      low: Math.min(...prices),
    };
  }, [history]);

  return {
    selectedCoin,
    history,
    isLoading,
    error,
    timePeriod,
    setTimePeriod,
    highLow,
    openCoin,
    close,
  };
}
