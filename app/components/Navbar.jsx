'use client';

import React from 'react';
import { Sparkles, Sun, Moon, Volume2, VolumeX } from 'lucide-react';

export default function Navbar({ isMuted, setIsMuted, isDreamMode, setIsDreamMode, playPop }) {
  return (
    <header className="p-4 sm:p-6 max-w-6xl mx-auto flex justify-between items-center relative z-20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-300 p-1 shadow-lg animate-pulse">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-bold text-pink-600 text-lg">
            ✨
          </div>
        </div>
        <div>
          <h1 className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Pip's Nursery
          </h1>
          <p className="text-[10px] font-bold text-pink-500 tracking-wider uppercase">haX.baby Official Portfolio</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Mute Toggle (+3 Pts Side Quest Requirement) */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-md border-2 border-pink-300 hover:scale-110 active:scale-95 transition-all text-pink-600"
          title={isMuted ? "Unmute sounds" : "Mute sounds"}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-gray-400" /> : <Volume2 className="w-5 h-5 text-pink-600" />}
        </button>

        {/* Day / Dream Night Shift */}
        <button
          onClick={() => {
            setIsDreamMode(!isDreamMode);
            if (playPop) playPop(659.25);
          }}
          className="p-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-md border-2 border-purple-300 hover:scale-110 active:scale-95 transition-all text-purple-600"
          title="Toggle Dream Night Shift"
        >
          {isDreamMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-purple-600" />}
        </button>
      </div>
    </header>
  );
}