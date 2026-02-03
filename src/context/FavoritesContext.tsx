import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Coin } from '../lib/coinranking';

export type FavoriteCoin = Pick<
  Coin,
  'uuid' | 'rank' | 'name' | 'symbol' | 'price' | 'change' | 'iconUrl' | 'marketCap' | 'listedAt'
> & {
  savedAt: number;
};

type FavoritesContextValue = {
  favorites: FavoriteCoin[];
  isFavorite: (uuid: string) => boolean;
  toggleFavorite: (coin: Coin) => void;
  isLoading: boolean;
};

const STORAGE_KEY = 'ledgerview.favorites.v1';

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoritesMap, setFavoritesMap] = useState<Record<string, FavoriteCoin>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setFavoritesMap(JSON.parse(stored));
        }
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favoritesMap));
  }, [favoritesMap, isLoading]);

  const value = useMemo<FavoritesContextValue>(() => {
    const favorites = Object.values(favoritesMap).sort(
      (a, b) => b.savedAt - a.savedAt
    );

    return {
      favorites,
      isLoading,
      isFavorite: uuid => Boolean(favoritesMap[uuid]),
      toggleFavorite: coin => {
        setFavoritesMap(prev => {
          if (prev[coin.uuid]) {
            const next = { ...prev };
            delete next[coin.uuid];
            return next;
          }
          return {
            ...prev,
            [coin.uuid]: {
              uuid: coin.uuid,
              rank: coin.rank,
              name: coin.name,
              symbol: coin.symbol,
              price: coin.price,
              change: coin.change,
              iconUrl: coin.iconUrl,
              marketCap: coin.marketCap,
              listedAt: coin.listedAt,
              savedAt: Date.now(),
            },
          };
        });
      },
    };
  }, [favoritesMap, isLoading]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
