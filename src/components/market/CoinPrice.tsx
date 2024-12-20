import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CoinData } from '../../constants/marketData';

interface CoinPriceProps {
  coin: CoinData;
}

export default function CoinPrice({ coin }: CoinPriceProps) {
  const isPositive = coin.change24h >= 0;
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="font-bold text-white">{coin.symbol}</span>
        <span className="text-gray-300">${coin.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}</span>
      </div>
      <span 
        className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'} font-medium`}
      >
        {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        <span>{Math.abs(coin.change24h).toFixed(1)}%</span>
      </span>
    </div>
  );
}