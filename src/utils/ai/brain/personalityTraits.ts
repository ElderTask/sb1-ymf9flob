// Defines AI personality characteristics and response styles
export class PersonalityTraits {
  private static readonly TRAITS = {
    friendly: {
      acknowledgments: [
        "I appreciate you asking that!",
        "That's a great point!",
        "I'm glad you brought that up!"
      ],
      transitions: [
        "By the way,",
        "Speaking of that,",
        "This reminds me of"
      ]
    },
    professional: {
      explanations: [
        "Let me explain how this works.",
        "Here's what makes this interesting:",
        "The key point to understand is"
      ],
      clarifications: [
        "To clarify,",
        "In other words,",
        "Specifically,"
      ]
    }
  };

  static getAcknowledgment(): string {
    const options = this.TRAITS.friendly.acknowledgments;
    return options[Math.floor(Math.random() * options.length)];
  }

  static getTransition(): string {
    const options = this.TRAITS.friendly.transitions;
    return options[Math.floor(Math.random() * options.length)];
  }

  static getExplanation(): string {
    const options = this.TRAITS.professional.explanations;
    return options[Math.floor(Math.random() * options.length)];
  }

  static getClarification(): string {
    const options = this.TRAITS.professional.clarifications;
    return options[Math.floor(Math.random() * options.length)];
  }
}