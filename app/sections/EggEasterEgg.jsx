'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

export default function EggEasterEgg({ playPop }) {
  const [crackLevel, setCrackLevel] = useState(0);
  const [isHatching, setIsHatching] = useState(false);

  const handleEggClick = () => {
    if (isHatching) return;
    const nextCrack = crackLevel + 1;
    
    if (playPop) playPop(400 + nextCrack * 150);
    setCrackLevel(nextCrack);

    // Boom blast on 3rd click!
    if (nextCrack >= 3) {
      setIsHatching(true);
      if (playPop) playPop(987.77);

      // Full screen burst animation
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.15, y: 0.85 },
        colors: ['#a34063', '#fbcfe8', '#fef08a', '#93c5fd', '#a7f3d0']
      });

      setTimeout(() => {
        setCrackLevel(0);
        setIsHatching(false);
      }, 3000);
    }
  };

  return (
    <div className="fixed left-4 bottom-4 z-40 flex flex-col items-center">
      {/* Tooltip */}
      <div className="mb-2 px-3 py-1 bg-white border border-[#a34063]/30 rounded-full text-[10px] font-bold text-[#a34063] shadow-md animate-bounce">
        ✨ Crack Pip's Surprise Egg!
      </div>

      {/* Interactive Egg Asset */}
      <button
        onClick={handleEggClick}
        className={`relative w-20 h-28 sm:w-24 sm:h-32 transition-transform active:scale-90 ${
          crackLevel > 0 ? 'animate-wiggle' : 'hover:scale-105'
        }`}
      >
        {/* Cute Pastel Egg Shell SVG */}
        <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-xl">
          <ellipse cx="50" cy="70" rx="45" ry="55" fill="#fbcfe8" stroke="#a34063" strokeWidth="4" />
          <path d="M 10,70 Q 50,20 90,70 Q 50,120 10,70 Z" fill="#fff8f1" opacity="0.6" />
          
          {/* Egg Shell Polka Dots */}
          <circle cx="35" cy="50" r="6" fill="#a34063" opacity="0.3" />
          <circle cx="65" cy="80" r="8" fill="#a34063" opacity="0.3" />
          <circle cx="50" cy="95" r="5" fill="#a34063" opacity="0.3" />

          {/* Dynamic Cracks Overlay */}
          {crackLevel >= 1 && (
            <path d="M 40,25 L 50,45 L 35,60" stroke="#a34063" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}
          {crackLevel >= 2 && (
            <path d="M 60,35 L 45,55 L 65,75 L 50,90" stroke="#a34063" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          )}
        </svg>

        {/* Hatching Starburst Overlay */}
        {isHatching && (
          <div className="absolute inset-0 flex items-center justify-center animate-ping text-3xl">
            ✨
          </div>
        )}
      </button>
    </div>
  );
}