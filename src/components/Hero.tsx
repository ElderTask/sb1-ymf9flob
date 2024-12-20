import React from 'react';
import { Shield, Lock, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './common/Logo';
import { BRAND } from '../constants/branding';

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="mb-8">
              <Logo size="lg" variant="dark" />
            </div>
            <p className="text-xl text-gray-600 mb-8">
              {BRAND.description}
            </p>
            <div>
              <Link 
                to="/whitepaper"
                className="border-2 border-primary-light bg-white/80 backdrop-blur-sm text-primary-light 
                  px-8 py-3 rounded-lg inline-block transition-all duration-300 
                  hover:bg-primary-light hover:text-white hover:shadow-lg 
                  hover:scale-105 font-display"
              >
                View Whitepaper
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 stagger">
            <div className="card-gradient p-6 rounded-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
              <Shield className="h-8 w-8 mb-4 text-accent-1" />
              <h3 className="font-bold mb-2">Secure</h3>
              <p className="text-gray-600">Military-grade encryption protocols</p>
            </div>
            <div className="card-gradient p-6 rounded-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
              <Lock className="h-8 w-8 mb-4 text-accent-2" />
              <h3 className="font-bold mb-2">Private</h3>
              <p className="text-gray-600">Zero-knowledge proof technology</p>
            </div>
            <div className="card-gradient p-6 rounded-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
              <Cpu className="h-8 w-8 mb-4 text-accent-3" />
              <h3 className="font-bold mb-2">Scalable</h3>
              <p className="text-gray-600">Advanced neural processing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}