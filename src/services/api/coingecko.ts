import { RateLimiter } from '../utils/rateLimiter';
import { marketCache } from '../cache/marketCache';
import { RetryHandler } from '../utils/retryHandler';

const API_BASE = 'https://api.coingecko.com/api/v3';
const TIMEOUT = 10000;
const rateLimiter = new RateLimiter(1000); // 1 request per second
const retryHandler = new RetryHandler(3, 2000); // 3 retries, 2s delay

interface FetchOptions {
  endpoint: string;
  cacheDuration?: number;
}

export async function fetchFromCoingecko({ endpoint, cacheDuration }: FetchOptions): Promise<any> {
  const cacheKey = `coingecko:${endpoint}`;
  
  // Check cache first
  if (cacheDuration) {
    const cachedData = marketCache.get(cacheKey);
    if (cachedData) return cachedData;
  }

  // Wait for rate limit
  await rateLimiter.wait();

  return retryHandler.execute(async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
          'Accept': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.status === 429) {
        rateLimiter.increaseDelay();
        throw new Error('RATE_LIMIT');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Cache successful responses
      if (cacheDuration) {
        marketCache.set(cacheKey, data, cacheDuration);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Coingecko API error:', error.message);
      }
      throw error;
    }
  });
}