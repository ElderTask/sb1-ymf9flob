import { RateLimiter } from '../utils/rateLimiter';
import { retryWithBackoff } from '../utils/retryWithBackoff';
import { marketCache } from '../cache/marketCache';

const API_BASE = 'https://api.coingecko.com/api/v3';
const rateLimiter = new RateLimiter(10); // 10 requests per second

interface RequestOptions {
  endpoint: string;
  cacheDuration?: number;
}

export async function fetchFromCoingecko<T>({ endpoint, cacheDuration }: RequestOptions): Promise<T> {
  const cacheKey = `coingecko:${endpoint}`;
  
  // Check cache first
  if (cacheDuration) {
    const cachedData = marketCache.get<T>(cacheKey);
    if (cachedData) return cachedData;
  }

  // Wait for rate limit
  await rateLimiter.waitForNext();

  try {
    const data = await retryWithBackoff(async () => {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    });

    // Cache successful responses
    if (cacheDuration) {
      marketCache.set(cacheKey, data, cacheDuration);
    }

    return data as T;
  } catch (error) {
    console.warn('Coingecko API error:', error);
    throw error;
  }
}