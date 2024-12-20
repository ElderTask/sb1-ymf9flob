import { ConversationState } from './ai/types';
import { analyzeContext } from './ai/contextAnalyzer';
import { ResponseGenerator } from './ai/responseGenerator';
import { ConversationMemory } from './ai/memory';
import { brain } from './ai/brain';

// Create a singleton conversation state
const conversationState: ConversationState = {
  context: {
    questionCount: 0,
    greeting: false,
    topics: [],
    userPreferences: new Set(),
    conversationFlow: {
      followUpSent: false,
      lastResponseTime: Date.now(),
      responseCount: 0
    }
  },
  memory: ConversationMemory.initialize(),
  lastResponse: undefined
};

// Track conversation history
const conversationHistory: string[] = [];

export async function getAIResponse(message: string): Promise<string> {
  // Add message to history
  conversationHistory.push(message);
  
  // Reset follow-up flag if enough time has passed
  const timeSinceLastResponse = Date.now() - conversationState.context.conversationFlow.lastResponseTime;
  if (timeSinceLastResponse > 30000) { // 30 seconds
    conversationState.context.conversationFlow.followUpSent = false;
  }

  // Analyze context with history
  analyzeContext(message, conversationState, conversationHistory);
  
  // Generate response using brain and context
  const reasonedResponse = brain.reason(message, {
    topic: conversationState.context.lastTopic || 'general',
    concepts: Array.from(conversationState.memory.userInterests),
    constraints: [],
    history: conversationHistory
  });

  // Get response with variation
  const response = ResponseGenerator.generateResponse(
    message,
    conversationState,
    reasonedResponse,
    conversationHistory
  );

  // Update state
  conversationState.lastResponse = response;
  conversationState.context.conversationFlow.lastResponseTime = Date.now();
  conversationState.context.conversationFlow.responseCount++;

  // Trim history if too long
  if (conversationHistory.length > 20) {
    conversationHistory.shift();
  }

  return response;
}