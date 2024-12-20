import { PricePoint } from '../constants/marketData';

function generateSmoothPrice(
  startPrice: number,
  endPrice: number,
  volatility: number,
  progress: number
): number {
  // Use sine wave for smooth transitions
  const trend = startPrice + (endPrice - startPrice) * progress;
  const variation = trend * volatility * Math.sin(progress * Math.PI * 4);
  return trend + variation;
}

export function generateMockPriceHistory(
  currentPrice: number,
  volatility: number = 0.02
): PricePoint[] {
  const points: PricePoint[] = [];
  const hoursAgo24 = Date.now() - 24 * 60 * 60 * 1000;
  const startPrice = currentPrice * (1 - Math.random() * 0.1); // Start up to 10% lower
  
  // Generate points every 15 minutes
  const totalPoints = 24 * 4; // 15-minute intervals for 24 hours
  
  for (let i = 0; i < totalPoints; i++) {
    const progress = i / totalPoints;
    const time = hoursAgo24 + (i * 15 * 60 * 1000);
    const value = generateSmoothPrice(startPrice, currentPrice, volatility, progress);
    
    points.push({
      time: Math.floor(time / 1000),
      value: Number(value.toFixed(2))
    });
  }
  
  // Ensure the last point matches current price exactly
  points.push({
    time: Math.floor(Date.now() / 1000),
    value: currentPrice
  });
  
  return points;
}