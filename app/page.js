'use client';

import React, { useState, useEffect } from 'react';
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
import { Moon, Sun, Sparkles } from 'lucide-react';

export default function Home() {
  const [isMuted, setIsMuted] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [visitorCount] = useState(1337);
  const [siteTimer, setSiteTimer] = useState(0);

  // Animated Pop-up Notification State
  const [sleepBanner, setSleepBanner] = useState({
    show: false,
    title: '',
    message: '',
    isNight: true
  });

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

  // Safely manage site timer loop inside parent component
  useEffect(() => {
    const interval = setInterval(() => {
      setSiteTimer((prev) => {
        const nextTime = prev + 1;

        if (nextTime === 60) {
          setIsNightMode(true);
          playPop(440);
          setSleepBanner({
            show: true,
            title: "🌙 Night Shift Activated!",
            message: "Pip is sleeping for 1 minute... Goodnight! ✨",
            isNight: true
          });

          setTimeout(() => {
            setSleepBanner((banner) => ({ ...banner, show: false }));
          }, 4000);
        }

        if (nextTime >= 120) {
          setIsNightMode(false);
          playPop(880);
          setSleepBanner({
            show: true,
            title: "☀️ Good Morning!",
            message: "Pip woke up rested and ready to build dreams! 🎀",
            isNight: false
          });

          setTimeout(() => {
            setSleepBanner((banner) => ({ ...banner, show: false }));
          }, 4000);

          return 0;
        }

        return nextTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isMuted]);

  return (
    <div
      className={`min-h-screen transition-colors duration-700 font-sans relative overflow-x-hidden ${
        isNightMode ? 'bg-[#1c121e] text-[#fff8f1]' : 'bg-[#fff8f1] text-[#5c4033]'
      }`}
    >
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
        isNightMode={isNightMode}
        siteTimer={siteTimer}
      />

      {/* Secret Crackable Easter Egg */}
      <EggEasterEgg playPop={playPop} />

      {/* ANIMATED POP-UP NOTIFICATION BANNER */}
      {sleepBanner.show && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="px-6 py-4 rounded-3xl bg-white/95 backdrop-blur-md border-4 border-[#a34063] shadow-2xl flex items-center gap-4 text-left max-w-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#a34063] text-white flex items-center justify-center text-2xl flex-shrink-0 shadow-md">
              {sleepBanner.isNight ? <Moon className="w-6 h-6 text-amber-300" /> : <Sun className="w-6 h-6 text-amber-300" />}
            </div>
            <div>
              <h4 className="font-serif font-black text-base text-[#a34063] flex items-center gap-1.5">
                {sleepBanner.title} <Sparkles className="w-4 h-4" />
              </h4>
              <p className="text-xs font-bold text-[#5c4033] opacity-90 leading-tight mt-0.5">
                {sleepBanner.message}
              </p>
            </div>
          </div>
        </div>
      )}

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