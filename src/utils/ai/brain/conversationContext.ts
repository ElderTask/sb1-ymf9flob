// Manages conversation context and flow
export class ConversationContext {
  private static readonly CONTEXT_DURATION = 5 * 60 * 1000; // 5 minutes
  private context: Map<string, any> = new Map();
  private lastUpdateTime: number = Date.now();

  updateContext(key: string, value: any): void {
    this.context.set(key, value);
    this.lastUpdateTime = Date.now();
  }

  getContext(key: string): any {
    return this.context.get(key);
  }

  isContextActive(): boolean {
    return Date.now() - this.lastUpdateTime < ConversationContext.CONTEXT_DURATION;
  }

  clearExpiredContext(): void {
    if (!this.isContextActive()) {
      this.context.clear();
    }
  }
}