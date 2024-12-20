import React from 'react';
import { X } from 'lucide-react';
import { CoinData } from '../../constants/marketData';
import PriceChart from './PriceChart';

interface ChartModalProps {
  coin: CoinData;
  onClose: () => void;
}

export default function ChartModal({ coin, onClose }: ChartModalProps) {
  const isPositive = coin.change24h >= 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-1">{coin.name} ({coin.symbol})</h3>
            <div className="flex items-center space-x-4">
              <p className="text-2xl font-semibold">
                ${coin.price.toLocaleString(undefined, { 
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2 
                })}
              </p>
              <span className={`text-lg ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? '+' : ''}{coin.change24h.toFixed(2)}%
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <PriceChart
            data={coin.priceHistory}
            symbol={coin.symbol}
            expanded
          />
        </div>
      </div>
    </div>
  );
}