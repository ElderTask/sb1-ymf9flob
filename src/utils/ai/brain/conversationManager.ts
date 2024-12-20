import { ConversationState, Topic } from '../types';
import { AI_KNOWLEDGE } from '../knowledge';
import { PERSONALITY_TRAITS } from '../personality';

interface ConversationNode {
  topic: string;
  context: string[];
  followUps: string[];
  timestamp: number;
}

export class ConversationManager {
  private conversationHistory: ConversationNode[] = [];
  private readonly MAX_HISTORY = 10;

  addToHistory(topic: string, context: string[], followUps: string[]): void {
    this.conversationHistory.unshift({
      topic,
      context,
      followUps,
      timestamp: Date.now()
    });

    // Maintain history limit
    if (this.conversationHistory.length > this.MAX_HISTORY) {
      this.conversationHistory.pop();
    }
  }

  getRelevantFollowUp(currentTopic: string): string | null {
    const recentTopics = new Set(this.conversationHistory.map(node => node.topic));
    const topicData = AI_KNOWLEDGE[currentTopic] as Topic;

    if (!topicData?.followUps) return null;

    // Find a follow-up that leads to an unexplored topic
    return topicData.followUps.find(followUp => {
      const relatedTopic = this.extractTopicFromFollowUp(followUp);
      return relatedTopic && !recentTopics.has(relatedTopic);
    }) || null;
  }

  private extractTopicFromFollowUp(followUp: string): string | null {
    const topics = Object.keys(AI_KNOWLEDGE);
    return topics.find(topic => followUp.toLowerCase().includes(topic)) || null;
  }

  suggestNewTopic(state: ConversationState): string | null {
    const discussedTopics = new Set(this.conversationHistory.map(node => node.topic));
    const allTopics = Object.keys(AI_KNOWLEDGE).filter(topic => 
      typeof AI_KNOWLEDGE[topic] === 'object' && 
      topic !== 'greetings' && 
      topic !== 'casual'
    );

    const unexploredTopics = allTopics.filter(topic => !discussedTopics.has(topic));
    
    if (unexploredTopics.length === 0) return null;

    const randomTopic = unexploredTopics[Math.floor(Math.random() * unexploredTopics.length)];
    const topicData = AI_KNOWLEDGE[randomTopic] as Topic;

    return `By the way, would you like to learn about ${randomTopic.replace('_', ' ')}? ${
      topicData.followUps[0]
    }`;
  }

  shouldSuggestNewTopic(state: ConversationState): boolean {
    return (
      this.conversationHistory.length >= 2 && 
      Date.now() - this.conversationHistory[0].timestamp > 30000 && // 30 seconds
      !state.context.conversationFlow.followUpSent
    );
  }
}