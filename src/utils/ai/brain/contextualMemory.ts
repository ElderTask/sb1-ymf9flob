interface MemoryNode {
  content: string;
  timestamp: number;
  importance: number;
  context: string[];
}

export class ContextualMemory {
  private shortTermMemory: MemoryNode[] = [];
  private longTermMemory: Map<string, MemoryNode[]> = new Map();
  private readonly STM_CAPACITY = 10;
  private readonly STM_DURATION = 5 * 60 * 1000; // 5 minutes

  addMemory(content: string, context: string[], importance: number = 1): void {
    const memory: MemoryNode = {
      content,
      timestamp: Date.now(),
      importance,
      context
    };

    // Add to short-term memory
    this.shortTermMemory.unshift(memory);
    this.shortTermMemory = this.shortTermMemory.slice(0, this.STM_CAPACITY);

    // Process long-term memory
    this.processLongTermMemory(memory);
  }

  private processLongTermMemory(memory: MemoryNode): void {
    memory.context.forEach(context => {
      if (!this.longTermMemory.has(context)) {
        this.longTermMemory.set(context, []);
      }
      
      if (memory.importance > 0.5) {
        this.longTermMemory.get(context)!.push(memory);
      }
    });
  }

  recall(context: string[], limit: number = 5): MemoryNode[] {
    const now = Date.now();
    const recentMemories = this.shortTermMemory
      .filter(m => now - m.timestamp < this.STM_DURATION);

    const contextualMemories = context.flatMap(ctx => 
      this.longTermMemory.get(ctx) || []
    );

    return [...recentMemories, ...contextualMemories]
      .sort((a, b) => b.importance - a.importance)
      .slice(0, limit);
  }
}