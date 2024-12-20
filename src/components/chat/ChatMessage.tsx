import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

export default function ChatMessage({ message, isBot }: ChatMessageProps) {
  return (
    <div className={`flex items-start space-x-3 ${isBot ? 'bg-gray-50' : ''} p-4 rounded-lg animate-fade-in`}>
      <div className={`p-2 rounded-full ${isBot ? 'bg-black text-white' : 'bg-purple-600 text-white'}`}>
        {isBot ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
      </div>
      <div className="flex-1">
        <p className="text-gray-900 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}