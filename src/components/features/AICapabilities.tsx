import React from 'react';
import { Brain, Sparkles, Shield, Zap } from 'lucide-react';

const capabilities = [
  {
    icon: Brain,
    title: "Advanced Neural Architecture",
    description: "Multi-layered transformer models with over 100 billion parameters, enabling human-like understanding and reasoning across diverse domains."
  },
  {
    icon: Sparkles,
    title: "Adaptive Learning",
    description: "Real-time model adaptation and continuous learning from interactions, ensuring up-to-date knowledge and improved performance over time."
  },
  {
    icon: Shield,
    title: "Ethical AI Framework",
    description: "Built-in bias detection and mitigation systems, with transparent decision-making processes and explainable AI mechanisms."
  },
  {
    icon: Zap,
    title: "Enterprise Integration",
    description: "Seamless integration with existing business systems through robust APIs and customizable interfaces."
  }
];

export default function AICapabilities() {
  return (
    <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
      {capabilities.map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
          <item.icon className="h-8 w-8 mb-4" />
          <h4 className="font-bold mb-2">{item.title}</h4>
          <p className="text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
}