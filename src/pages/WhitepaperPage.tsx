import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { whitepaperContent } from '../utils/whitepaperContent';
import Logo from '../components/common/Logo';

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light via-background to-background-dark">
      <nav className="bg-gradient-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="sm" variant="light" />
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <FileText className="h-12 w-12 mr-4 text-primary" />
            <h1 className="text-4xl font-bold text-gray-800">Whitepaper</h1>
          </div>

          <div className="card-gradient rounded-lg shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Abstract</h2>
            <p className="text-gray-600 mb-12 leading-relaxed text-lg">
              {whitepaperContent.abstract}
            </p>

            {whitepaperContent.sections.map((section, index) => (
              <section key={index} className="mb-12 last:mb-0">
                <div className="flex items-center mb-6">
                  <div className="h-8 w-1 bg-gradient-primary rounded-full mr-4"></div>
                  <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-600 pl-5">
                  {section.content.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4 leading-relaxed hover:text-gray-800 transition-colors">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}