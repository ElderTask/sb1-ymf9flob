import React from 'react';
import { whitepaperContent } from '../utils/whitepaperContent';
import { FileText, Check } from 'lucide-react';

export default function Whitepaper() {
  return (
    <section id="whitepaper" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <FileText className="h-12 w-12 mr-4" />
            <h2 className="text-4xl font-bold">Whitepaper</h2>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Abstract</h3>
            <p className="text-gray-600 mb-12 leading-relaxed">
              {whitepaperContent.abstract}
            </p>

            {whitepaperContent.sections.map((section, index) => (
              <div key={index} className="mb-12 last:mb-0">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Check className="h-5 w-5 mr-2 text-green-500" />
                  {section.title}
                </h3>
                <p className="text-gray-600 leading-relaxed pl-7">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}