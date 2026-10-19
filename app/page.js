'use client';

import React, { useState } from 'react';
import Navbar from './sections/Navbar';
import Sidebar from './sections/Sidebar';
import MainStage from './sections/MainStage';
import ChatModal from './sections/ChatModal';
import InventionsModal from './sections/InventionsModal';
import PortfolioModal from './sections/PortfolioModal';
import StoryModal from './sections/StoryModal';
import GuestbookModal from './sections/GuestbookModal';
import AboutStoryModal from './sections/AboutStoryModal';
import EggEasterEgg from './sections/EggEasterEgg';
import StarTrail from './components/StarTrail';

export default function Home() {
  const [isMuted, setIsMuted] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [visitorCount] = useState(1337);

  // Web Audio Synthesizer
  const playPop = (freq = 523.25) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-700 font-sans relative overflow-x-hidden ${
        isNightMode ? 'bg-[#1c121e] text-[#fff8f1]' : 'bg-[#fff8f1] text-[#5c4033]'
      }`}
    >
      {/* Floating Sparkle Trail Cursor Overlay */}
      <StarTrail />

      <Navbar
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isNightMode={isNightMode}
        setIsNightMode={setIsNightMode}
        playPop={playPop}
      />

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} playPop={playPop} />

      <MainStage
        playPop={playPop}
        visitorCount={visitorCount}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      <EggEasterEgg playPop={playPop} />

      {/* Modals */}
      {isAboutOpen && <AboutStoryModal onClose={() => setIsAboutOpen(false)} />}
      {activeTab === 'chat' && <ChatModal onClose={() => setActiveTab(null)} playPop={playPop} />}
      {activeTab === 'inventions' && <InventionsModal onClose={() => setActiveTab(null)} playPop={playPop} />}
      {activeTab === 'portfolio' && <PortfolioModal onClose={() => setActiveTab(null)} playPop={playPop} />}
      {activeTab === 'story' && <StoryModal onClose={() => setActiveTab(null)} />}
      {activeTab === 'guestbook' && <GuestbookModal onClose={() => setActiveTab(null)} playPop={playPop} />}
    </div>
  );
}