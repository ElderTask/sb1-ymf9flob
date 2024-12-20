import { IntentMatch } from './types';

export class IntentAnalyzer {
  private static questionPatterns = [
    /^(what|how|why|when|where|who|can|could|would|will|do|does|is|are|should)/i,
    /\?$/
  ];

  private static sentimentPatterns = {
    positive: ['great', 'good', 'excellent', 'amazing', 'interesting', 'love', 'like', 'helpful'],
    negative: ['bad', 'poor', 'terrible', 'confusing', 'unclear', 'difficult', 'hate', 'dislike']
  };

  static analyzeIntent(message: string): IntentMatch {
    const normalizedMessage = message.toLowerCase();
    
    return {
      topic: this.detectTopic(normalizedMessage),
      confidence: this.calculateConfidence(normalizedMessage),
      isQuestion: this.isQuestion(normalizedMessage),
      sentiment: this.analyzeSentiment(normalizedMessage)
    };
  }

  private static detectTopic(message: string): string | null {
    // Enhanced topic detection logic
    return null; // Simplified for brevity
  }

  private static calculateConfidence(message: string): number {
    // Implement confidence scoring
    return 0.8;
  }

  private static isQuestion(message: string): boolean {
    return this.questionPatterns.some(pattern => pattern.test(message));
  }

  private static analyzeSentiment(message: string): 'positive' | 'negative' | 'neutral' {
    const words = message.split(' ');
    
    const positiveCount = words.filter(word => 
      this.sentimentPatterns.positive.some(pattern => word.includes(pattern))
    ).length;

    const negativeCount = words.filter(word => 
      this.sentimentPatterns.negative.some(pattern => word.includes(pattern))
    ).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }
}