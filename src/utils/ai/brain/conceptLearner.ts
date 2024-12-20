interface Concept {
  name: string;
  attributes: Set<string>;
  examples: string[];
  relationships: Map<string, number>;
}

export class ConceptLearner {
  private concepts: Map<string, Concept> = new Map();
  private readonly MIN_CONFIDENCE = 0.7;

  learnConcept(name: string, attributes: string[], example: string): void {
    if (!this.concepts.has(name)) {
      this.concepts.set(name, {
        name,
        attributes: new Set(),
        examples: [],
        relationships: new Map()
      });
    }

    const concept = this.concepts.get(name)!;
    attributes.forEach(attr => concept.attributes.add(attr));
    concept.examples.push(example);
  }

  findSimilarConcepts(attributes: string[]): string[] {
    const matches = Array.from(this.concepts.entries())
      .map(([name, concept]) => ({
        name,
        confidence: this.calculateSimilarity(concept.attributes, new Set(attributes))
      }))
      .filter(match => match.confidence >= this.MIN_CONFIDENCE)
      .sort((a, b) => b.confidence - a.confidence);

    return matches.map(m => m.name);
  }

  private calculateSimilarity(set1: Set<string>, set2: Set<string>): number {
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
  }
}