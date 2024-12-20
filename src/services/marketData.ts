import { CoinData, FEATURED_COINS } from '../constants/marketData';
import { fetchCurrentPrices } from './market/currentPrices';
import { COIN_IDS } from '../constants/coins';
import { getFallbackData } from './market/fallback';

let lastSuccessfulData: CoinData[] | null = null;

export async function fetchMarketData(): Promise<CoinData[]> {
  try {
    const currentPrices = await fetchCurrentPrices();
    
    // Validate the response data
    const hasValidData = Object.values(COIN_IDS).every(id => 
      currentPrices[id]?.usd !== undefined && 
      currentPrices[id]?.usd_24h_change !== undefined
    );

    if (!hasValidData) {
      throw new Error('Invalid price data received');
    }

    const updatedCoins = FEATURED_COINS.map(coin => {
      const id = COIN_IDS[coin.symbol as keyof typeof COIN_IDS];
      const priceData = currentPrices[id];
      
      return {
        ...coin,
        price: priceData.usd,
        change24h: priceData.usd_24h_change
      };
    });

    lastSuccessfulData = updatedCoins;
    return updatedCoins;
  } catch (error) {
    console.error('Error fetching market data:', error);
    
    // Use last successful data or generate fallback data
    if (lastSuccessfulData) {
      return lastSuccessfulData;
    }
    
    return FEATURED_COINS.map(coin => getFallbackData(coin));
  }
}