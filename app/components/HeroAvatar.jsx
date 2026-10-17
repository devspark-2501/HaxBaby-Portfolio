'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

export default function HeroAvatar({ playPop, visitorCount }) {
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const avatarRef = useRef(null);

  // Pupil eye tracking
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

  // Hidden Easter Egg Trigger
  const triggerEasterEgg = () => {
    if (playPop) playPop(880);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.35 },
      colors: ['#a34063', '#ff69b4', '#fbcfe8', '#fef08a', '#93c5fd']
    });
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-6 flex flex-col items-center text-center relative z-10">
      
      {/* Floating Rainbow Badge */}
      <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white font-bold text-xs shadow-md border-2 border-white animate-bounce">
        <Sparkles className="w-4 h-4" /> Official Track 1: Pip the Skull Baby
      </div>

      {/* Official Pip Avatar Image Container */}
      <div
        ref={avatarRef}
        className="relative w-64 h-64 sm:w-72 sm:h-72 my-4 rounded-full p-3 bg-gradient-to-b from-pink-200 via-purple-100 to-sky-200 border-8 border-pink-400 shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
      >
        {/* Hidden Easter Egg Click Button */}
        <button
          onClick={triggerEasterEgg}
          className="absolute -top-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-lg border-2 border-white hover:scale-110 active:scale-90 transition-all cursor-pointer z-20"
        >
          🎀 Tap Pip's Ribbon!
        </button>

        {/* Official Image Asset */}
        <img
          src="/baby-assets/pip_avatar_cloud.png"
          alt="Pip Avatar Cloud"
          className="w-full h-full object-contain drop-shadow-md rounded-full"
        />

        {/* Pupil Eye Tracking Layer Overlay */}
        <div className="absolute top-[38%] flex gap-10 justify-center pointer-events-none">
          <div className="w-3 h-3 bg-amber-300 rounded-full shadow-[0_0_8px_#fde047]" style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }} />
          <div className="w-3 h-3 bg-amber-300 rounded-full shadow-[0_0_8px_#fde047]" style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }} />
        </div>
      </div>

      {/* Character Identity */}
      <h2 className="text-4xl sm:text-6xl font-black tracking-wide mb-2 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
        Pip The Skull Baby
      </h2>

      <p className="inline-block bg-pink-500/10 border border-pink-400/30 font-bold text-pink-600 px-4 py-1.5 rounded-full text-sm sm:text-base mb-4 shadow-sm">
        🌙 Junior Dream Engineer @ Midnight Nursery
      </p>

      <p className="max-w-xl text-base sm:text-lg font-medium opacity-90 leading-relaxed mb-6">
        A sleepy, gentle creature with a smooth round skull face, soft eye sockets with glowing amber pinpricks, and a starry nightcap. Pip designs dreams and lullabies to help little creatures fall asleep!
      </p>

      {/* Odometer Hit Counter (+1 pt Side Quest) */}
      <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-2 border-pink-300 shadow-lg inline-flex items-center gap-3">
        <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse" />
        <span className="text-xs font-black uppercase tracking-wider">Dream Travelers Visited:</span>
        <div className="font-mono text-lg font-black bg-purple-950 text-pink-300 px-3 py-1 rounded-xl shadow-inner border border-purple-800">
          {String(visitorCount).padStart(6, '0')}
        </div>
      </div>
    </section>
  );
}