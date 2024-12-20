import React from 'react';
import AICapabilities from './features/AICapabilities';
import TechnicalOverview from './features/TechnicalOverview';

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center animate-fade-in">About PAVE</h2>
        
        <div className="max-w-3xl mx-auto mb-16 animate-fade-in">
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            PAVE represents a breakthrough in artificial intelligence, combining advanced neural 
            architectures with ethical AI principles to create a system that truly understands 
            and adapts to human needs. Our AI goes beyond simple pattern recognition, 
            employing sophisticated reasoning capabilities that enable it to handle complex 
            tasks while maintaining transparency and accountability.
          </p>
          <p className="text-xl text-gray-600 leading-relaxed">
            Built on a foundation of cutting-edge research in machine learning, natural 
            language processing, and cognitive science, PAVE sets new standards for AI 
            performance and reliability. Our system continuously learns and evolves while 
            maintaining strict ethical guidelines and privacy standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-8">Core Capabilities</h3>
            <AICapabilities />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-8">Technical Features</h3>
            <TechnicalOverview />
          </div>
        </div>
      </div>
    </section>
  );
}