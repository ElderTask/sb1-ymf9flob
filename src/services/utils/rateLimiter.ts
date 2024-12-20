export class RateLimiter {
  private lastRequestTime: number = 0;
  private minInterval: number;
  private baseInterval: number;
  private maxInterval: number = 60000; // Max 1 minute between requests

  constructor(minInterval: number) {
    this.minInterval = minInterval;
    this.baseInterval = minInterval;
  }

  increaseDelay(): void {
    this.minInterval = Math.min(this.minInterval * 2, this.maxInterval);
    
    // Reset after 5 minutes of increased delay
    setTimeout(() => {
      this.minInterval = this.baseInterval;
    }, 300000);
  }

  async wait(): Promise<void> {
    const now = Date.now();
    const timeToWait = Math.max(0, this.lastRequestTime + this.minInterval - now);
    
    if (timeToWait > 0) {
      await new Promise(resolve => setTimeout(resolve, timeToWait));
    }
    
    this.lastRequestTime = Date.now();
  }
}