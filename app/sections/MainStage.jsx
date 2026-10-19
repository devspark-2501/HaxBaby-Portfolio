'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Cloud, BookOpen, Moon, Zzz } from 'lucide-react';

export default function MainStage({ playPop, visitorCount, onOpenAbout }) {
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [sleepiness, setSleepiness] = useState(20);
  const avatarRef = useRef(null);

  // Slowly increase sleepiness over time
  useEffect(() => {
    const timer = setInterval(() => {
      setSleepiness((prev) => Math.min(100, prev + 5));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!avatarRef.current || sleepiness >= 100) return;
      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const distance = Math.min(6, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 30);

      setPupilPos({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sleepiness]);

  const wakePipUp = () => {
    if (playPop) playPop(880);
    setSleepiness(0);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.4 },
      colors: ['#fbcfe8', '#fef08a', '#93c5fd']
    });
  };

  const triggerEasterEgg = () => {
    if (playPop) playPop(880);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.35 },
      colors: ['#a34063', '#fbcfe8', '#fef08a', '#93c5fd', '#a7f3d0']
    });
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-6 flex flex-col items-center text-center relative z-10">
      
      {/* Cloud Header Motif */}
      <div className="flex items-center gap-2 mb-2">
        <Cloud className="w-5 h-5 text-[#a34063]/40 fill-[#a34063]/10" />
        <span className="text-xs font-serif italic text-[#a34063]">Midnight Nursery Skies</span>
        <Cloud className="w-5 h-5 text-[#a34063]/40 fill-[#a34063]/10" />
      </div>

      {/* Sleepiness Meter Widget */}
      <div className="mb-4 w-full max-w-xs p-2.5 bg-white rounded-2xl border border-[#a34063]/20 shadow-xs flex items-center gap-3">
        <Moon className="w-4 h-4 text-[#a34063]" />
        <div className="flex-1 text-left">
          <div className="flex justify-between items-center text-[10px] font-bold text-[#a34063] mb-1">
            <span>Pip's Sleepiness:</span>
            <span>{sleepiness}%</span>
          </div>
          <div className="w-full h-2 bg-[#fff8f1] rounded-full overflow-hidden border border-[#a34063]/20">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-[#a34063] transition-all duration-500"
              style={{ width: `${sleepiness}%` }}
            />
          </div>
        </div>
        {sleepiness >= 80 && (
          <button
            onClick={wakePipUp}
            className="px-2 py-1 bg-[#a34063] text-white text-[10px] font-bold rounded-lg shadow-xs hover:scale-105 active:scale-95"
          >
            Wake Pip! 🎀
          </button>
        )}
      </div>

      {/* Main Avatar Stage */}
      <div
        ref={avatarRef}
        className="relative w-64 h-64 sm:w-72 sm:h-72 my-2 rounded-full p-4 bg-white border-4 border-[#a34063] shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
      >
        <button
          onClick={triggerEasterEgg}
          className="absolute -top-3 bg-[#a34063] text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-md border-2 border-white hover:scale-110 active:scale-90 transition-all cursor-pointer z-20"
        >
          🎀 Tap Pip's Ribbon!
        </button>

        <img
          src="/baby-assets/pip_avatar_cloud.png"
          alt="Pip Avatar"
          className={`w-full h-full object-contain rounded-full ${sleepiness >= 100 ? 'opacity-70 blur-[0.5px]' : ''}`}
        />

        {/* Pupil Eye Tracking Layer (or Sleeping ZZZ Overlay) */}
        {sleepiness < 100 ? (
          <div className="absolute top-[38%] flex gap-10 justify-center pointer-events-none">
            <div className="w-3 h-3 bg-amber-300 rounded-full shadow-[0_0_8px_#fde047]" style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }} />
            <div className="w-3 h-3 bg-amber-300 rounded-full shadow-[0_0_8px_#fde047]" style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }} />
          </div>
        ) : (
          <div className="absolute top-8 right-10 text-2xl font-black text-[#a34063] animate-bounce">
            zZz...
          </div>
        )}
      </div>

      <h2 className="font-serif text-4xl sm:text-6xl font-black tracking-tight mb-1 text-[#a34063]">
        Pip The Skull Baby
      </h2>

      <p className="inline-block bg-[#a34063]/10 border border-[#a34063]/20 font-bold text-[#a34063] px-4 py-1 rounded-full text-xs sm:text-sm mb-4">
        🌙 Junior Dream Engineer @ Midnight Nursery
      </p>

      {/* Primary About Page Button */}
      <button
        onClick={() => {
          if (playPop) playPop(783.99);
          onOpenAbout();
        }}
        className="my-3 px-8 py-3.5 bg-[#a34063] text-white font-serif font-black text-base sm:text-lg rounded-3xl shadow-xl hover:bg-[#8b3252] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border-2 border-white"
      >
        <BookOpen className="w-6 h-6" /> Open Pip's Full Story & About Page
      </button>

      {/* Odometer Hit Counter */}
      <div className="p-3 rounded-2xl bg-white border border-[#a34063]/20 shadow-xs inline-flex items-center gap-3 mb-6">
        <Heart className="w-5 h-5 text-[#a34063] fill-[#a34063] animate-pulse" />
        <span className="text-xs font-black uppercase tracking-wider text-[#a34063]">Dream Travelers:</span>
        <div className="font-mono text-base font-black bg-[#1c121e] text-pink-300 px-3 py-1 rounded-xl border border-[#a34063]">
          {String(visitorCount).padStart(6, '0')}
        </div>
      </div>

      {/* Sitting Pip Stage */}
      <div className="w-full mt-2 p-5 rounded-3xl bg-white/80 border-2 border-[#a34063]/20 shadow-lg flex flex-col sm:flex-row items-center gap-5 text-left">
        <div className="w-28 h-28 flex-shrink-0 bg-[#fff8f1] rounded-2xl border-2 border-[#a34063]/30 p-2 shadow-inner">
          <img
            src="/baby-assets/pip_portrait.png"
            alt="Pip Sitting Stage"
            className="w-full h-full object-contain animate-bounce-slow"
          />
        </div>
        <div>
          <h3 className="font-serif font-bold text-lg text-[#a34063] mb-1">
            Pip Sitting At Midnight Nursery 🌙
          </h3>
          <p className="text-xs leading-relaxed opacity-85">
            Pip sits comfortably on a cloud cushion holding a dimmable bedside lantern and music box, ready for flight deliveries across Whispering Woods!
          </p>
        </div>
      </div>
    </section>
  );
}