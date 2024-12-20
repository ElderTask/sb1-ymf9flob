import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Countdown from '../components/Countdown';
import Team from '../components/Team';
import Market from '../components/Market';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light via-background to-background-dark">
      <Navbar />
      <Hero />
      <About />
      <Countdown />
      <Team />
      <Market />
    </div>
  );
}