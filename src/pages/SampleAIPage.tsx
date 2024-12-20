import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '../components/common/Logo';
import ChatWindow from '../components/chat/ChatWindow';

export default function SampleAIPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-black text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="sm" variant="light" />
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">AI Assistant Demo</h1>
          <div className="prose prose-lg mb-8">
            <p className="text-gray-600">
              Experience PAVE's AI capabilities through our interactive chatbot. 
              Ask questions about our technology, security measures, or tokenomics 
              to see how our AI understands and responds to complex queries.
            </p>
          </div>
          
          <ChatWindow />
        </div>
      </main>
    </div>
  );
}