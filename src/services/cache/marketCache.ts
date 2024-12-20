interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

export class MarketCache {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private readonly maxEntries = 100;

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    // Extend cache duration on hit
    entry.expiry = Math.min(entry.expiry + 5000, entry.timestamp + 60000);
    return entry.data as T;
  }

  set<T>(key: string, data: T, duration: number): void {
    // Clear old entries if cache is too large
    if (this.cache.size >= this.maxEntries) {
      const oldestKey = Array.from(this.cache.entries())
        .sort(([, a], [, b]) => a.timestamp - b.timestamp)[0][0];
      this.cache.delete(oldestKey);
    }

    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expiry: now + duration
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

// Export a singleton instance
export const marketCache = new MarketCache();