import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useMarketData } from '../hooks/useMarketData';
import CoinPrice from './market/CoinPrice';

export default function Market() {
  const [isOpen, setIsOpen] = useState(false);
  const { marketData, loading, error } = useMarketData();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 shadow-lg z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-2 rounded-t-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors"
      >
        <span>Market Prices</span>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
      </button>
      
      {isOpen && (
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {marketData.map((coin) => (
              <div 
                key={coin.symbol} 
                className="bg-black p-4 rounded-lg border border-gray-800"
              >
                <CoinPrice coin={coin} />
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-sm text-gray-400">
            {error && <span className="text-yellow-500 mr-2">Using cached prices</span>}
            {loading ? 'Updating...' : 'Live prices • Updates every 30s'}
          </div>
        </div>
      )}
    </div>
  );
}