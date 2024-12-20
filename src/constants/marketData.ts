export interface CoinData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

// Initial data (will be updated with real data)
export const FEATURED_COINS: CoinData[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 0, change24h: 0 },
  { symbol: 'ETH', name: 'Ethereum', price: 0, change24h: 0 },
  { symbol: 'SOL', name: 'Solana', price: 0, change24h: 0 },
  { symbol: 'BNB', name: 'BNB', price: 0, change24h: 0 },
  { symbol: 'AVAX', name: 'Avalanche', price: 0, change24h: 0 }
];