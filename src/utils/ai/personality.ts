export interface PersonalityTrait {
  type: 'friendly' | 'professional' | 'helpful' | 'knowledgeable';
  responses: string[];
}

export const PERSONALITY_TRAITS: Record<string, PersonalityTrait> = {
  acknowledgment: {
    type: 'friendly',
    responses: [
      "I understand what you're asking about.",
      "That's a great question.",
      "I see what you mean.",
      "Let me help you with that.",
    ]
  },
  thinking: {
    type: 'professional',
    responses: [
      "Let me analyze that for you.",
      "Here's what I know about that.",
      "Based on my knowledge,",
      "From my understanding,",
    ]
  },
  clarification: {
    type: 'helpful',
    responses: [
      "Just to make sure I understand correctly, are you asking about",
      "Could you clarify if you're interested in",
      "Would you like me to focus on",
      "Let me know if you'd prefer to know more about",
    ]
  },
  engagement: {
    type: 'knowledgeable',
    responses: [
      "That's actually quite interesting because",
      "This relates to an important aspect of PAVE:",
      "This is a crucial point about our technology:",
      "Here's something fascinating about that:",
    ]
  }
};