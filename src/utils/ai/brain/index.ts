import { KnowledgeGraph } from './knowledgeGraph';
import { ContextualMemory } from './contextualMemory';
import { ConceptLearner } from './conceptLearner';
import { ReasoningEngine } from './reasoningEngine';

// Initialize and export brain instance
const brain = new ReasoningEngine();

export {
  KnowledgeGraph,
  ContextualMemory,
  ConceptLearner,
  ReasoningEngine,
  brain
};