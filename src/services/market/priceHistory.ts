import { fetchFromCoingecko } from '../api/coingecko';
import { HistoricalPrice } from './types';

const CACHE_DURATION = 300000; // 5 minutes

export async function fetchHistoricalPrices(coinId: string): Promise<HistoricalPrice[]> {
  const oneDayAgo = Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000);
  const now = Math.floor(Date.now() / 1000);

  const data = await fetchFromCoingecko({
    endpoint: `/coins/${coinId}/market_chart/range?vs_currency=usd&from=${oneDayAgo}&to=${now}`,
    cacheDuration: CACHE_DURATION
  });

  return data.prices.map(([timestamp, price]: [number, number]) => ({
    time: Math.floor(timestamp / 1000),
    value: Number(price.toFixed(2))
  }));
}