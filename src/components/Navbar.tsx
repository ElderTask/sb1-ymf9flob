import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';
import Logo from './common/Logo';
import WaitlistModal from './WaitlistModal';

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full bg-gradient-primary text-white z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="sm" variant="light" />
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="hover:text-gray-200 transition-colors">About</a>
              <a href="#team" className="hover:text-gray-200 transition-colors">Team</a>
              <Link 
                to="/sample-ai"
                className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-black/40 transition-all shadow-md hover:shadow-lg"
              >
                <Bot className="h-4 w-4" />
                <span>Sample AI</span>
              </Link>
              <button 
                onClick={() => setShowModal(true)}
                className="bg-white text-primary-dark px-4 py-2 rounded-lg hover:bg-gray-100 transition-all hover:shadow-lg"
              >
                Join our Waitlist
              </button>
            </div>
          </div>
        </div>
      </nav>
      <WaitlistModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}