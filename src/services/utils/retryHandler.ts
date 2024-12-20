export class RetryHandler {
  private maxRetries: number;
  private delayMs: number;

  constructor(maxRetries: number, delayMs: number) {
    this.maxRetries = maxRetries;
    this.delayMs = delayMs;
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          await new Promise(resolve => setTimeout(resolve, this.delayMs));
        }
        return await fn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (error instanceof Error && error.message === 'RATE_LIMIT') {
          // Wait longer for rate limit errors
          await new Promise(resolve => setTimeout(resolve, this.delayMs * 2));
        }
        
        // On last attempt, throw the error
        if (attempt === this.maxRetries) {
          throw lastError;
        }
      }
    }
    
    throw lastError;
  }
}