// Handles emotional intelligence and response tone
export class EmotionEngine {
  private static readonly EMOTIONS = {
    joy: ['excited', 'happy', 'glad', 'great'],
    curiosity: ['interesting', 'curious', 'tell me more', 'how does'],
    confusion: ['confused', "don't understand", 'unclear', 'what do you mean'],
    concern: ['worried', 'concerned', 'problem', 'issue']
  };

  static detectEmotion(message: string): string | null {
    const normalizedMessage = message.toLowerCase();
    
    for (const [emotion, indicators] of Object.entries(this.EMOTIONS)) {
      if (indicators.some(indicator => normalizedMessage.includes(indicator))) {
        return emotion;
      }
    }
    
    return null;
  }

  static getEmotionalResponse(emotion: string): string {
    switch (emotion) {
      case 'joy':
        return "I'm glad you're excited! ";
      case 'curiosity':
        return "That's a fascinating question! ";
      case 'confusion':
        return "Let me explain that more clearly. ";
      case 'concern':
        return "I understand your concern. Let me help address that. ";
      default:
        return "";
    }
  }
}