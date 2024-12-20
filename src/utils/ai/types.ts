export interface Topic {
  keywords: string[];
  content: string;
  followUps: string[];
}

export interface AIKnowledge {
  [key: string]: string[] | Topic;
}

export interface ConversationContext {
  lastTopic?: string;
  questionCount: number;
  greeting: boolean;
  topics: string[];
  userPreferences: Set<string>;
  conversationFlow: {
    lastQuestion?: string;
    followUpSent: boolean;
  };
}

export interface ConversationState {
  context: ConversationContext;
  lastResponse?: string;
  memory: {
    askedTopics: Set<string>;
    userInterests: Set<string>;
    conversationStartTime: number;
  };
}

export interface IntentMatch {
  topic: string | null;
  confidence: number;
  isQuestion: boolean;
  sentiment: 'positive' | 'negative' | 'neutral';
}