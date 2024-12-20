import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WhitepaperPage from './pages/WhitepaperPage';
import SampleAIPage from './pages/SampleAIPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/whitepaper" element={<WhitepaperPage />} />
        <Route path="/sample-ai" element={<SampleAIPage />} />
      </Routes>
    </BrowserRouter>
  );
}