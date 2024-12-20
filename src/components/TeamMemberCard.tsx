import React from 'react';
import { TeamMember } from '../types/team';

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in">
      <img
        src={member.image}
        alt={member.name}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover hover:scale-105 transition-transform duration-300"
      />
      <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
      <p className="text-gray-600 text-center mb-3">{member.role}</p>
      <p className="text-sm text-gray-600 text-center">{member.bio}</p>
    </div>
  );
}