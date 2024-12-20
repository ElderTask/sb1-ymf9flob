import { ConversationState } from './types';

export function analyzeContext(message: string, state: ConversationState): void {
  const normalizedMessage = message.toLowerCase();
  
  // Update greeting status
  if (!state.context.greeting) {
    state.context.greeting = normalizedMessage.match(/^(hi|hello|hey|greetings|hi there)/) !== null;
  }

  // Track question patterns
  if (normalizedMessage.includes('?')) {
    state.context.questionCount++;
  }

  // Detect casual conversation
  if (normalizedMessage.includes('how are you') || 
      normalizedMessage.includes('doing well') ||
      normalizedMessage.includes('nice to meet')) {
    state.context.lastTopic = 'casual';
  }
}