'use client';

import React from 'react';
import { Sparkles, Sun, Moon, Volume2, VolumeX } from 'lucide-react';

export default function Navbar({ isMuted, setIsMuted, isNightMode, setIsNightMode, playPop }) {
  return (
    <header className="p-6 max-w-6xl mx-auto flex justify-between items-center relative z-20 border-b border-[#a34063]/15">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-[#a34063] text-white flex items-center justify-center font-bold text-xl shadow-md animate-pulse">
          ✨
        </div>
        <div>
          <h1 className="font-serif font-black text-2xl tracking-tight text-[#a34063]">
            Pip's Nursery
          </h1>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#a34063]/70">
            haX.baby Official Track 1
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-md border-2 border-[#a34063]/20 hover:scale-110 active:scale-95 transition-all text-[#a34063]"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-gray-400" /> : <Volume2 className="w-5 h-5" />}
        </button>

        <button
          onClick={() => {
            setIsNightMode(!isNightMode);
            if (playPop) playPop(659.25);
          }}
          className="p-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-md border-2 border-[#a34063]/20 hover:scale-110 active:scale-95 transition-all text-[#a34063]"
          title="Toggle Night Shift"
        >
          {isNightMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}