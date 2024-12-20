import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { getAIResponse } from '../../utils/aiResponses';

interface Message {
  text: string;
  isBot: boolean;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm PAVE's AI assistant. I can help you understand our blockchain infrastructure and answer any questions you have about our technology. What would you like to know?", isBot: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    // Add user message
    setMessages(prev => [...prev, { text: message, isBot: false }]);
    setIsTyping(true);

    // Simulate AI response
    try {
      const response = await getAIResponse(message);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "I apologize, but I'm having trouble processing your request. Please try again.", 
        isBot: true 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isBot={message.isBot}
          />
        ))}
        {isTyping && (
          <div className="text-gray-500 animate-pulse p-4">
            AI is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSendMessage} disabled={isTyping} />
    </div>
  );
}