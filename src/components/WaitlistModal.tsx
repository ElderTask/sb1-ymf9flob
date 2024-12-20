import React, { useState } from 'react';
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { submitToWaitlist } from '../services/waitlist/api';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    const response = await submitToWaitlist(email);
    
    if (response.success) {
      setStatus('success');
      setMessage(response.message);
    } else {
      setStatus('error');
      setMessage(response.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
        >
          <X className="h-6 w-6" />
        </button>
        
        {status === 'success' ? (
          <div className="text-center animate-fade-in">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Successfully Joined</h3>
          </div>
        ) : status === 'error' ? (
          <div className="text-center animate-fade-in">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Oops!</h3>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={() => setStatus('idle')}
              className="text-primary-dark hover:text-primary transition-colors"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-4">Join the PAVE Waitlist</h3>
            <p className="text-gray-600 mb-6">
              Be among the first to experience the future of AI infrastructure.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 
                  focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300
                  disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gradient-primary text-white py-2 rounded-lg 
                  hover:opacity-90 transition-all duration-300 hover:shadow-lg
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center space-x-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Joining...</span>
                  </>
                ) : (
                  <span>Join Waitlist</span>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}