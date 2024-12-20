export class RateLimiter {
  private lastRequestTime: number = 0;
  private readonly minInterval: number;

  constructor(requestsPerSecond: number) {
    this.minInterval = 1000 / requestsPerSecond;
  }

  async waitForNext(): Promise<void> {
    const now = Date.now();
    const timeToWait = Math.max(0, this.lastRequestTime + this.minInterval - now);
    
    if (timeToWait > 0) {
      await new Promise(resolve => setTimeout(resolve, timeToWait));
    }
    
    this.lastRequestTime = Date.now();
  }
}