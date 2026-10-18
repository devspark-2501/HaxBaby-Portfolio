'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Cloud, BookOpen } from 'lucide-react';

export default function MainStage({ playPop, visitorCount, onOpenAbout }) {
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const avatarRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!avatarRef.current) return;
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
  }, []);

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

      {/* Tagline Banner */}
      <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#a34063]/10 border border-[#a34063]/30 text-[#a34063] font-bold text-xs shadow-xs">
        <Sparkles className="w-4 h-4" /> "I build the dreams you fall asleep inside."
      </div>

      {/* Main Avatar Stage */}
      <div
        ref={avatarRef}
        className="relative w-64 h-64 sm:w-72 sm:h-72 my-4 rounded-full p-4 bg-white border-4 border-[#a34063] shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
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
          className="w-full h-full object-contain rounded-full"
        />

        <div className="absolute top-[38%] flex gap-10 justify-center pointer-events-none">
          <div className="w-3 h-3 bg-amber-300 rounded-full shadow-[0_0_8px_#fde047]" style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }} />
          <div className="w-3 h-3 bg-amber-300 rounded-full shadow-[0_0_8px_#fde047]" style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }} />
        </div>
      </div>

      <h2 className="font-serif text-4xl sm:text-6xl font-black tracking-tight mb-2 text-[#a34063]">
        Pip The Skull Baby
      </h2>

      <p className="inline-block bg-[#a34063]/10 border border-[#a34063]/20 font-bold text-[#a34063] px-4 py-1.5 rounded-full text-xs sm:text-sm mb-4">
        🌙 Junior Dream Engineer @ Midnight Nursery
      </p>

      {/* BIG PRIMARY ABOUT PAGE BUTTON */}
      <button
        onClick={() => {
          if (playPop) playPop(783.99);
          onOpenAbout();
        }}
        className="my-4 px-8 py-4 bg-[#a34063] text-white font-serif font-black text-base sm:text-lg rounded-3xl shadow-xl hover:bg-[#8b3252] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border-2 border-white"
      >
        <BookOpen className="w-6 h-6" /> Open Pip's Full Story & About Page
      </button>

      {/* Odometer Hit Counter */}
      <div className="p-3 rounded-2xl bg-white border border-[#a34063]/20 shadow-xs inline-flex items-center gap-3 mb-8">
        <Heart className="w-5 h-5 text-[#a34063] fill-[#a34063] animate-pulse" />
        <span className="text-xs font-black uppercase tracking-wider text-[#a34063]">Dream Travelers:</span>
        <div className="font-mono text-base font-black bg-[#1c121e] text-pink-300 px-3 py-1 rounded-xl border border-[#a34063]">
          {String(visitorCount).padStart(6, '0')}
        </div>
      </div>

      {/* SITTING PIP STAGE WITH LANTERN */}
      <div className="w-full mt-2 p-6 rounded-3xl bg-white/80 border-2 border-[#a34063]/20 shadow-lg flex flex-col sm:flex-row items-center gap-6 text-left">
        <div className="w-32 h-32 flex-shrink-0 bg-[#fff8f1] rounded-2xl border-2 border-[#a34063]/30 p-2 shadow-inner">
          <img
            src="/baby-assets/pip_portrait.png"
            alt="Pip Sitting Stage"
            className="w-full h-full object-contain animate-bounce-slow"
          />
        </div>
        <div>
          <h3 className="font-serif font-bold text-xl text-[#a34063] mb-1">
            Pip Sitting At Midnight Nursery 🌙
          </h3>
          <p className="text-xs leading-relaxed opacity-85">
            Pip sits comfortably on a cloud cushion holding a dimmable bedside lantern and music box, ready for flight deliveries across Whispering Woods[cite: 6]!
          </p>
        </div>
      </div>
    </section>
  );
}