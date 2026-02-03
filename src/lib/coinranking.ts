import { env } from './env';

export type Coin = {
  uuid: string;
  rank: number;
  name: string;
  symbol: string;
  price: string;
  change: string;
  iconUrl?: string;
  marketCap?: string;
  listedAt?: number;
};

export type CoinStats = {
  total: number;
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: string;
  total24hVolume: string;
};

export type CoinOrderBy =
  | 'price'
  | 'marketCap'
  | '24hVolume'
  | 'change'
  | 'listedAt';
export type OrderDirection = 'asc' | 'desc';

type CoinResponse = {
  status: string;
  data: {
    stats: CoinStats;
    coins: Coin[];
  };
};

const BASE_URL = 'https://api.coinranking.com/v2';

export async function fetchCoins(params: {
  limit: number;
  offset: number;
  orderBy?: CoinOrderBy;
  orderDirection?: OrderDirection;
}) {
  const query = new URLSearchParams();
  query.append('limit', String(params.limit));
  query.append('offset', String(params.offset));
  if (params.orderBy) query.append('orderBy', params.orderBy);
  if (params.orderDirection)
    query.append('orderDirection', params.orderDirection);

  const response = await fetch(`${BASE_URL}/coins?${query.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': env.coinrankingApiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`CoinRanking error: ${response.status}`);
  }

  const payload = (await response.json()) as CoinResponse;
  return payload.data;
}
