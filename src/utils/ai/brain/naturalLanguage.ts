// Handles natural language processing and response generation
export class NaturalLanguage {
  private static readonly FILLER_WORDS = [
    "um", "uh", "well", "you see", "you know",
    "actually", "basically", "essentially"
  ];

  private static readonly CONVERSATION_MARKERS = {
    thinking: ["Let me think about that...", "Hmm...", "Well..."],
    understanding: ["I see what you mean.", "That makes sense.", "I understand."],
    enthusiasm: ["That's fascinating!", "How interesting!", "Great question!"]
  };

  static addConversationalElements(response: string): string {
    const shouldAddFiller = Math.random() < 0.3;
    const shouldAddMarker = Math.random() < 0.4;

    let enhancedResponse = response;

    if (shouldAddFiller) {
      const filler = this.FILLER_WORDS[
        Math.floor(Math.random() * this.FILLER_WORDS.length)
      ];
      enhancedResponse = `${filler}, ${enhancedResponse}`;
    }

    if (shouldAddMarker) {
      const markerType = Object.keys(this.CONVERSATION_MARKERS)[
        Math.floor(Math.random() * Object.keys(this.CONVERSATION_MARKERS).length)
      ] as keyof typeof this.CONVERSATION_MARKERS;
      
      const marker = this.CONVERSATION_MARKERS[markerType][
        Math.floor(Math.random() * this.CONVERSATION_MARKERS[markerType].length)
      ];
      
      enhancedResponse = `${marker} ${enhancedResponse}`;
    }

    return enhancedResponse;
  }

  static addPersonalization(response: string, userName?: string): string {
    if (userName) {
      const personalizations = [
        `${userName}, `,
        `You know ${userName}, `,
        `I think, ${userName}, that `
      ];
      
      const personalization = personalizations[
        Math.floor(Math.random() * personalizations.length)
      ];
      
      return personalization + response;
    }
    
    return response;
  }
}