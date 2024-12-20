export interface MarketResponse {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface ChartData {
  time: number;
  value: number;
  volume?: number;
}

export interface CoinPrice {
  usd: number;
  usd_24h_change: number;
}

export interface MarketPrices {
  [key: string]: CoinPrice;
}

export interface HistoricalPrice {
  time: number;
  value: number;
}