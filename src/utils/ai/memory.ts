import { ConversationState } from './types';

export class ConversationMemory {
  private static MEMORY_DURATION = 30 * 60 * 1000; // 30 minutes

  static initialize(): ConversationState['memory'] {
    return {
      askedTopics: new Set(),
      userInterests: new Set(),
      conversationStartTime: Date.now(),
    };
  }

  static isExpired(state: ConversationState): boolean {
    return Date.now() - state.memory.conversationStartTime > this.MEMORY_DURATION;
  }

  static recordTopic(state: ConversationState, topic: string): void {
    state.memory.askedTopics.add(topic);
  }

  static recordInterest(state: ConversationState, interest: string): void {
    state.memory.userInterests.add(interest);
  }

  static getUnexploredTopics(state: ConversationState): string[] {
    const allTopics = ['technology', 'security', 'tokenomics', 'governance', 'scalability'];
    return allTopics.filter(topic => !state.memory.askedTopics.has(topic));
  }

  static suggestNextTopic(state: ConversationState): string | null {
    const unexplored = this.getUnexploredTopics(state);
    return unexplored.length > 0 ? unexplored[0] : null;
  }
}