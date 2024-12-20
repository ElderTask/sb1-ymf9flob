import { MarketPrices, ChartData } from '../types';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class MarketCache {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private readonly maxEntries = 100;
  private readonly defaultTTL = 30000; // 30 seconds

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.pruneCache();
    
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expiry: now + ttl
    });
  }

  private pruneCache(): void {
    if (this.cache.size >= this.maxEntries) {
      const oldestKey = Array.from(this.cache.entries())
        .sort(([, a], [, b]) => a.timestamp - b.timestamp)[0][0];
      this.cache.delete(oldestKey);
    }
  }
}

export const marketCache = new MarketCache();