import React from 'react';
import CoinPrice from './CoinPrice';
import { useMarketData } from '../../hooks/useMarketData';
import { RefreshCw } from 'lucide-react';

export default function MarketTicker() {
  const { marketData, loading, error } = useMarketData();

  return (
    <div className="hidden lg:flex items-center justify-between px-4 py-1 bg-gray-900 text-white">
      <div className="flex items-center space-x-6 overflow-x-auto">
        {marketData.map((coin) => (
          <CoinPrice key={coin.symbol} coin={coin} />
        ))}
        {loading && (
          <RefreshCw className="h-4 w-4 animate-spin ml-2" />
        )}
      </div>
      <div className="flex items-center space-x-2 whitespace-nowrap">
        {error && (
          <span className="text-xs text-yellow-400">Using cached prices</span>
        )}
        <span className="text-xs text-gray-400">
          Live prices • Updates every 30s
        </span>
      </div>
    </div>
  );
}