'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroAvatar from '../components/HeroAvatar';
import ProjectShowcase from '../components/ProjectShowcase';
import StorySection from '../components/StorySection';
import Guestbook from '../components/Guestbook';

export default function Home() {
  const [isMuted, setIsMuted] = useState(false);
  const [isDreamMode, setIsDreamMode] = useState(false);
  const [visitorCount] = useState(1337);

  // Web Audio Chime Generator
  const playPop = (freq = 523.25) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans relative overflow-x-hidden ${
      isDreamMode
        ? 'bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-900 text-pink-100'
        : 'bg-gradient-to-br from-pink-200 via-purple-100 to-sky-200 text-purple-950'
    }`}>
      {/* 1. Navbar */}
      <Navbar
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isDreamMode={isDreamMode}
        setIsDreamMode={setIsDreamMode}
        playPop={playPop}
      />

      {/* 2. Hero Avatar */}
      <HeroAvatar playPop={playPop} visitorCount={visitorCount} />

      {/* 3. Project Showcase */}
      <ProjectShowcase playPop={playPop} />

      {/* 4. Bedtime Origin Story */}
      <StorySection />

      {/* 5. Visitor Guestbook */}
      <Guestbook playPop={playPop} />
    </div>
  );
}