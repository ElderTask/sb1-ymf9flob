import { CoinData } from '../../constants/marketData';
import { generateMockPriceHistory } from '../../utils/mockChartData';

export function getFallbackData(coin: CoinData): CoinData {
  return {
    ...coin,
    priceHistory: generateMockPriceHistory(coin.price)
  };
}