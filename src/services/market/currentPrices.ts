import { fetchFromCoingecko } from './api/coingeckoClient';
import { MarketPrices } from './types';
import { COIN_IDS } from '../../constants/coins';
import { MOCK_MARKET_DATA } from './mockData';

const CACHE_DURATION = 30000; // 30 seconds

export async function fetchCurrentPrices(): Promise<MarketPrices> {
  try {
    const ids = Object.values(COIN_IDS).join(',');
    const data = await fetchFromCoingecko<MarketPrices>({
      endpoint: `/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
      cacheDuration: CACHE_DURATION
    });

    // Validate the response data
    const hasValidData = Object.values(COIN_IDS).every(id => 
      data[id]?.usd !== undefined && 
      data[id]?.usd_24h_change !== undefined
    );

    if (!hasValidData) {
      throw new Error('Invalid price data received');
    }

    return data;
  } catch (error) {
    console.warn('Using mock market data:', error);
    return MOCK_MARKET_DATA;
  }
}