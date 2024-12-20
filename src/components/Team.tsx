import React from 'react';
import TeamMemberCard from './TeamMemberCard';
import { teamMembers } from '../data/teamMembers';
import { BACKING_INSTITUTIONS } from '../constants/institutions';

export default function Team() {
  return (
    <section id="team" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Led by world-class experts in cryptography, distributed systems, and blockchain technology, 
            our team brings decades of combined experience from leading institutions and tech companies.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Backed By Leading Institutions</h3>
          <div className="flex flex-wrap justify-center gap-12 items-center">
            {BACKING_INSTITUTIONS.map((institution) => (
              <a
                key={institution.name}
                href={institution.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold text-gray-600 hover:text-primary transition-colors"
              >
                {institution.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}