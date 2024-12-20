import { KnowledgeGraph } from './knowledgeGraph';
import { ContextualMemory } from './contextualMemory';
import { ConceptLearner } from './conceptLearner';
import { AI_KNOWLEDGE } from '../knowledge';
import { NaturalLanguage } from './naturalLanguage';

interface ReasoningContext {
  topic: string;
  concepts: string[];
  constraints: string[];
  history: string[];
}

export class ReasoningEngine {
  private knowledgeGraph: KnowledgeGraph;
  private contextualMemory: ContextualMemory;
  private conceptLearner: ConceptLearner;
  private readonly UNDERSTANDING_THRESHOLD = 0.4;

  constructor() {
    this.knowledgeGraph = new KnowledgeGraph();
    this.contextualMemory = new ContextualMemory();
    this.conceptLearner = new ConceptLearner();
    this.initializeKnowledge();
  }

  private initializeKnowledge(): void {
    // Initialize core concepts
    const concepts = {
      blockchain: ['technology', 'decentralized', 'secure', 'distributed'],
      security: ['encryption', 'protection', 'privacy', 'safe'],
      tokenomics: ['token', 'economics', 'value', 'distribution'],
      technology: ['innovation', 'system', 'platform', 'infrastructure']
    };

    // Add concepts to knowledge graph and concept learner
    Object.entries(concepts).forEach(([concept, attributes]) => {
      this.knowledgeGraph.addConcept(concept, attributes);
      this.conceptLearner.learnConcept(concept, attributes, AI_KNOWLEDGE[concept]?.content || '');
    });
  }

  private extractConcepts(input: string): string[] {
    const concepts: string[] = [];
    Object.entries(AI_KNOWLEDGE).forEach(([topic, data]) => {
      if (typeof data === 'object' && data.keywords) {
        if (data.keywords.some(keyword => input.includes(keyword))) {
          concepts.push(topic);
        }
      }
    });
    return concepts;
  }

  private findRelevantTopic(concepts: string[]): string | null {
    if (concepts.length === 0) return null;
    
    // Find the most relevant topic based on concept relationships
    const topicScores = concepts.map(concept => ({
      topic: concept,
      score: this.knowledgeGraph.findRelatedConcepts(concept).length
    }));

    const bestMatch = topicScores.sort((a, b) => b.score - a.score)[0];
    return bestMatch?.topic || null;
  }

  reason(input: string, context: ReasoningContext): string | null {
    const concepts = this.extractConcepts(input.toLowerCase());
    const understanding = this.assessUnderstanding(input, concepts);

    // If understanding is too low, return a clarification response
    if (understanding < this.UNDERSTANDING_THRESHOLD) {
      return this.generateClarificationResponse(input, context.history);
    }

    // Continue with normal reasoning if we understand the input
    const topic = this.findRelevantTopic(concepts);
    if (!topic) return this.generateFallbackResponse(context.history);

    const topicData = AI_KNOWLEDGE[topic];
    if (!topicData || typeof topicData === 'string') {
      return this.generateFallbackResponse(context.history);
    }

    this.contextualMemory.addMemory(input, concepts);
    return topicData.content;
  }

  private assessUnderstanding(input: string, concepts: string[]): number {
    const hasKnownConcepts = concepts.length > 0;
    const hasQuestionMark = input.includes('?');
    const hasCommonWords = this.checkCommonWords(input);
    
    let score = 0;
    if (hasKnownConcepts) score += 0.5;
    if (hasQuestionMark) score += 0.2;
    if (hasCommonWords) score += 0.3;
    
    return score;
  }

  private checkCommonWords(input: string): boolean {
    const commonWords = ['pave', 'blockchain', 'technology', 'security', 'token'];
    return commonWords.some(word => input.toLowerCase().includes(word));
  }

  private generateClarificationResponse(input: string, history: string[]): string {
    const isFirstUnclear = !history.slice(-4).some(msg => 
      msg.toLowerCase().includes("i'm not sure") || 
      msg.toLowerCase().includes("could you clarify")
    );

    if (isFirstUnclear) {
      return NaturalLanguage.addConversationalElements(
        "I apologize, but I'm not entirely sure what you're asking about. " +
        "As a trial AI assistant, I'm still learning! Could you rephrase your question " +
        "or specify if you're interested in PAVE's technology, security, or tokenomics?"
      );
    }

    return NaturalLanguage.addConversationalElements(
      "I'm still having trouble understanding. Let me share what I can help with: " +
      "I'm knowledgeable about PAVE's blockchain technology, security features, and tokenomics. " +
      "Which of these would you like to learn more about?"
    );
  }

  private generateFallbackResponse(history: string[]): string {
    const isRepeatedFallback = history.slice(-2).some(msg => 
      msg.includes("I'm a trial version") || 
      msg.includes("still learning")
    );

    if (!isRepeatedFallback) {
      return NaturalLanguage.addConversationalElements(
        "I'm a trial version of PAVE's AI assistant, and I'm still learning! " +
        "While I may not understand everything perfectly, I'd be happy to tell you about " +
        "our core features like blockchain technology, security, or tokenomics. " +
        "Which interests you most?"
      );
    }

    return NaturalLanguage.addConversationalElements(
      "Let me try to be more helpful. I can discuss specific topics like: \n" +
      "1. How PAVE's blockchain works\n" +
      "2. Our security features\n" +
      "3. Token economics and distribution\n" +
      "Would you like to explore any of these?"
    );
  }
}