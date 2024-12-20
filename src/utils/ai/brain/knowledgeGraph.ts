export class KnowledgeGraph {
  private nodes: Map<string, Set<string>> = new Map();
  private relationships: Map<string, Map<string, number>> = new Map();

  addConcept(concept: string, relatedConcepts: string[]): void {
    if (!this.nodes.has(concept)) {
      this.nodes.set(concept, new Set());
    }
    
    relatedConcepts.forEach(related => {
      this.nodes.get(concept)!.add(related);
      this.updateRelationship(concept, related, 1);
    });
  }

  private updateRelationship(from: string, to: string, weight: number): void {
    if (!this.relationships.has(from)) {
      this.relationships.set(from, new Map());
    }
    
    const currentWeight = this.relationships.get(from)!.get(to) || 0;
    this.relationships.get(from)!.set(to, currentWeight + weight);
  }

  findRelatedConcepts(concept: string): string[] {
    return Array.from(this.nodes.get(concept) || [])
      .sort((a, b) => {
        const weightA = this.relationships.get(concept)?.get(a) || 0;
        const weightB = this.relationships.get(concept)?.get(b) || 0;
        return weightB - weightA;
      });
  }
}