import React from 'react';
import { CoinsIcon } from 'lucide-react';
import { BRAND } from '../../constants/branding';

interface LogoProps {
  size?: 'sm' | 'lg';
  variant?: 'light' | 'dark';
}

export default function Logo({ size = 'sm', variant = 'light' }: LogoProps) {
  const iconSize = size === 'sm' ? 'h-8 w-8' : 'h-16 w-16';
  const textColor = variant === 'light' ? 'text-white' : 'text-black';
  const subtitleColor = variant === 'light' ? 'text-gray-400' : 'text-gray-600';
  const titleSize = size === 'sm' ? 'text-2xl' : 'text-4xl';

  return (
    <div className="flex items-center space-x-3">
      <CoinsIcon className={iconSize} />
      <div className="flex flex-col">
        <span className={`${titleSize} font-bold ${textColor}`}>{BRAND.name}</span>
        <span className={`text-xs ${subtitleColor}`}>{BRAND.fullName}</span>
      </div>
    </div>
  );
}