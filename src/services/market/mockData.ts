// Mock market data for fallback
export const MOCK_MARKET_DATA = {
  bitcoin: {
    usd: 43250.82,
    usd_24h_change: 2.35
  },
  ethereum: {
    usd: 2285.16,
    usd_24h_change: 3.12
  },
  solana: {
    usd: 98.45,
    usd_24h_change: 5.67
  },
  binancecoin: {
    usd: 312.78,
    usd_24h_change: 1.89
  },
  'avalanche-2': {
    usd: 35.92,
    usd_24h_change: 4.23
  }
};

// Generate realistic mock price history
export function generateMockPriceHistory(basePrice: number, points: number = 24): [number, number][] {
  const history: [number, number][] = [];
  const volatility = 0.02; // 2% volatility
  let currentPrice = basePrice;
  
  for (let i = points; i >= 0; i--) {
    const time = Date.now() - (i * 3600 * 1000); // hourly points
    const change = (Math.random() - 0.5) * volatility * currentPrice;
    currentPrice += change;
    history.push([time, currentPrice]);
  }
  
  return history;
}