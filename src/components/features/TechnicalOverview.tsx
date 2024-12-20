import React from 'react';
import { CheckCircle } from 'lucide-react';

const features = [
  {
    title: "Natural Language Processing",
    points: [
      "Context-aware understanding across multiple languages",
      "Advanced sentiment analysis and emotion detection",
      "Real-time translation and cultural adaptation"
    ]
  },
  {
    title: "Machine Learning Capabilities",
    points: [
      "Automated pattern recognition and anomaly detection",
      "Predictive analytics with 95%+ accuracy",
      "Reinforcement learning for optimal decision-making"
    ]
  },
  {
    title: "Security Features",
    points: [
      "End-to-end encryption for all data processing",
      "Privacy-preserving computation techniques",
      "Regular security audits and compliance checks"
    ]
  }
];

export default function TechnicalOverview() {
  return (
    <div className="space-y-8 animate-fade-in">
      {features.map((feature, index) => (
        <div key={index} className="mb-6">
          <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
          <ul className="space-y-3">
            {feature.points.map((point, idx) => (
              <li key={idx} className="flex items-center animate-slide-in">
                <CheckCircle className="h-5 w-5 mr-2 text-black" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}