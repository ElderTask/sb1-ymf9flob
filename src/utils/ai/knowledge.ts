import { whitepaperContent } from '../whitepaperContent';
import { AIKnowledge } from './types';

export const AI_KNOWLEDGE: AIKnowledge = {
  greetings: [
    "Hello! I'm PAVE's AI assistant. I'd love to chat about our technology or anything else you're curious about!",
    "Hi there! I'm here to help you learn about PAVE and have engaging conversations. What's on your mind?",
    "Welcome! Whether you want to discuss PAVE's technology or just chat, I'm here to help!"
  ],
  casual: [
    "I'm doing great, thanks for asking! I love having interesting conversations. What would you like to chat about?",
    "I'm excellent! I enjoy learning from our conversations while helping people understand PAVE's innovations. How are you?",
    "I'm doing well! I find human interaction fascinating. How has your day been?"
  ],
  personal: {
    keywords: ['you', 'yourself', 'who are you', 'what are you'],
    content: "I'm an AI assistant created by PAVE. While I'm primarily knowledgeable about blockchain and PAVE's technology, I enjoy having broader conversations and learning from our interactions. I aim to be helpful while being transparent about my AI nature.",
    followUps: [
      "What interests you about AI and blockchain technology?",
      "I'd love to hear your thoughts on AI assistants like myself."
    ]
  },
  pave_overview: {
    keywords: ['pave', 'about', 'what is', 'explain'],
    content: "PAVE (Protocol for Advanced Value Exchange) is a revolutionary blockchain infrastructure that combines cutting-edge AI with secure distributed systems. We're solving the blockchain trilemma - achieving scalability, security, and decentralization simultaneously. Our launch is scheduled for December 2024, and we're backed by leading institutions including MIT and Stanford.",
    followUps: [
      "Would you like to know more about our specific technological innovations?",
      "Are you interested in how PAVE achieves this balance?"
    ]
  },
  // ... rest of the knowledge base remains the same
};