import { useState, useEffect, useCallback } from 'react';
import { CoinData, FEATURED_COINS } from '../constants/marketData';
import { fetchMarketData } from '../services/marketData';

const UPDATE_INTERVAL = 30000; // 30 seconds

export function useMarketData() {
  const [marketData, setMarketData] = useState<CoinData[]>(FEATURED_COINS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateData = useCallback(async () => {
    try {
      const data = await fetchMarketData();
      setMarketData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch market data');
      console.error('Error updating market data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    let intervalId: number;

    const initData = async () => {
      if (!mounted) return;
      await updateData();
      
      if (mounted) {
        intervalId = window.setInterval(updateData, UPDATE_INTERVAL);
      }
    };

    initData();

    return () => {
      mounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [updateData]);

  return { marketData, loading, error };
}