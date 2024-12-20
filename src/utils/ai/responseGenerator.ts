import { AI_KNOWLEDGE } from './knowledge';
import { ConversationState } from './types';
import { ConversationFlow } from './conversationFlow';
import { IntentAnalyzer } from './intentAnalyzer';
import { brain } from './brain';
import { NaturalLanguage } from './brain/naturalLanguage';
import { EmotionEngine } from './brain/emotions';

export class ResponseGenerator {
  static generateResponse(
    message: string,
    state: ConversationState,
    reasonedResponse: string | null,
    history: string[]
  ): string {
    const intent = IntentAnalyzer.analyzeIntent(message);
    const emotion = EmotionEngine.detectEmotion(message);
    let response = '';

    // Add emotional acknowledgment if detected
    if (emotion) {
      response += EmotionEngine.getEmotionalResponse(emotion);
    }

    // Use reasoned response if available
    if (reasonedResponse) {
      response += NaturalLanguage.addConversationalElements(reasonedResponse);
    } else {
      // Fallback to topic-based response with variation
      response += this.generateTopicResponse(message, state, history);
    }

    // Add follow-up based on context
    if (!state.context.conversationFlow.followUpSent && 
        state.context.conversationFlow.responseCount > 1) {
      const followUp = ConversationFlow.generateFollowUp(state, history);
      if (followUp) {
        response += `\n\n${followUp}`;
        state.context.conversationFlow.followUpSent = true;
      }
    }

    return response;
  }

  private static generateTopicResponse(
    message: string,
    state: ConversationState,
    history: string[]
  ): string {
    // Avoid repeating the last response
    const lastResponse = state.lastResponse;
    let candidates = this.getResponseCandidates(message, state);
    
    if (lastResponse) {
      candidates = candidates.filter(c => c !== lastResponse);
    }

    // If no valid candidates, generate a new response path
    if (candidates.length === 0) {
      return this.generateNewResponsePath(state, history);
    }

    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  private static getResponseCandidates(
    message: string,
    state: ConversationState
  ): string[] {
    const candidates: string[] = [];
    const normalizedMessage = message.toLowerCase();

    for (const [topic, data] of Object.entries(AI_KNOWLEDGE)) {
      if (topic === 'greetings' || topic === 'casual') continue;
      
      const topicData = data as any;
      if (topicData.keywords?.some((k: string) => normalizedMessage.includes(k))) {
        candidates.push(topicData.content);
      }
    }

    return candidates;
  }

  private static generateNewResponsePath(
    state: ConversationState,
    history: string[]
  ): string {
    // Generate a response that leads the conversation in a new direction
    const unexploredTopics = Object.entries(AI_KNOWLEDGE)
      .filter(([topic, _]) => !state.memory.askedTopics.has(topic))
      .map(([_, data]) => (data as any).content)
      .filter(Boolean);

    if (unexploredTopics.length > 0) {
      return unexploredTopics[Math.floor(Math.random() * unexploredTopics.length)];
    }

    return "I notice we've covered quite a bit about PAVE. Is there a specific aspect you'd like me to elaborate on, or would you like to explore a new topic?";
  }
}