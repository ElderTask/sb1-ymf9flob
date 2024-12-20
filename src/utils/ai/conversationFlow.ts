import { ConversationState } from './types';
import { PERSONALITY_TRAITS } from './personality';

export class ConversationFlow {
  private static getRandomTrait(type: keyof typeof PERSONALITY_TRAITS): string {
    const responses = PERSONALITY_TRAITS[type].responses;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  static buildResponse(parts: string[]): string {
    return parts.filter(Boolean).join(' ');
  }

  static createNaturalResponse(
    mainContent: string,
    state: ConversationState,
    options: {
      useAcknowledgment?: boolean;
      useThinking?: boolean;
      useClarification?: boolean;
      useEngagement?: boolean;
    } = {}
  ): string {
    const parts: string[] = [];

    if (options.useAcknowledgment) {
      parts.push(this.getRandomTrait('acknowledgment'));
    }

    if (options.useThinking) {
      parts.push(this.getRandomTrait('thinking'));
    }

    if (options.useClarification) {
      parts.push(this.getRandomTrait('clarification'));
    }

    if (options.useEngagement) {
      parts.push(this.getRandomTrait('engagement'));
    }

    parts.push(mainContent);

    return this.buildResponse(parts);
  }

  static handleFollowUp(state: ConversationState): string {
    const { context, memory } = state;
    
    if (context.questionCount > 2 && !context.conversationFlow.followUpSent) {
      const unexploredTopics = Array.from(memory.askedTopics);
      if (unexploredTopics.length > 0) {
        return `\n\nWould you also like to know about our ${unexploredTopics[0]} features? I'd be happy to explain that as well.`;
      }
    }
    
    return '';
  }

  static addPersonalTouch(response: string, state: ConversationState): string {
    const { memory } = state;
    
    if (memory.userInterests.size > 0) {
      const interests = Array.from(memory.userInterests);
      response = response.replace(
        /(our|the) (technology|platform|system)/gi,
        `$1 ${interests[0]}-focused $2`
      );
    }
    
    return response;
  }
}