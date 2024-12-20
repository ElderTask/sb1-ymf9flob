import { fetchFromCoingecko } from '../api/coingecko';
import { MarketResponse, ChartData } from './types';
import { COIN_IDS } from '../../constants/coins';
import { generateMockPriceHistory } from './mockData';

export async function fetchChartData(symbol: string): Promise<ChartData[]> {
  const coinId = COIN_IDS[symbol as keyof typeof COIN_IDS];
  if (!coinId) throw new Error(`Invalid coin symbol: ${symbol}`);

  try {
    const now = Math.floor(Date.now() / 1000);
    const oneDayAgo = now - 24 * 60 * 60;

    const response = await fetchFromCoingecko({
      endpoint: `/coins/${coinId}/market_chart/range?vs_currency=usd&from=${oneDayAgo}&to=${now}`
    });

    const data = response as MarketResponse;
    
    if (!data?.prices || !Array.isArray(data.prices)) {
      throw new Error('Invalid response format');
    }

    return data.prices.map(([timestamp, price]) => ({
      time: Math.floor(timestamp / 1000),
      value: Number(price.toFixed(2))
    }));
  } catch (error) {
    console.warn(`Using mock chart data for ${symbol}:`, error);
    
    // Generate mock price history
    return generateMockPriceHistory(symbol === 'BTC' ? 43000 : 2000).map(([timestamp, price]) => ({
      time: Math.floor(timestamp / 1000),
      value: Number(price.toFixed(2))
    }));
  }
}