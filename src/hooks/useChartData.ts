import { useState, useEffect } from 'react';
import { ChartData } from '../services/market/types';
import { fetchChartData } from '../services/market/chartData';
import { generateMockPriceHistory } from '../utils/mockChartData';

export function useChartData(symbol: string, currentPrice: number) {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const chartData = await fetchChartData(symbol);
        if (mounted) {
          setData(chartData);
          setError(null);
        }
      } catch (err) {
        console.warn(`Using mock data for ${symbol}:`, err);
        if (mounted) {
          // Fallback to mock data
          setData(generateMockPriceHistory(currentPrice));
          setError('Using simulated data');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [symbol, currentPrice]);

  return { data, loading, error };
}