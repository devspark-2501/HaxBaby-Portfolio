'use client';

import React, { useState } from 'react';
import { Wand2, X, Lamp, Music } from 'lucide-react';

export default function InventionsModal({ onClose, playPop }) {
  const [lanternBrightness, setLanternBrightness] = useState(85);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#fff8f1] rounded-3xl border-4 border-[#a34063] p-6 max-w-lg w-full shadow-2xl relative text-left max-h-[85vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#a34063] font-bold p-1 rounded-full hover:bg-[#a34063]/10">
          <X className="w-6 h-6" />
        </button>

        <h3 className="font-serif text-2xl font-bold text-[#a34063] mb-4 flex items-center gap-2">
          <Wand2 className="w-6 h-6" /> Pip's Inventions
        </h3>

        <div className="space-y-4">
          {/* Invention 1: Lullaby Synthesizer */}
          <div className="p-4 bg-white rounded-2xl border border-[#a34063]/20 shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <img src="/baby-assets/pip_lullaby_box.png" alt="Lullaby Box" className="w-12 h-12 object-contain" />
              <div>
                <h4 className="font-bold text-sm text-[#a34063]">1. Lullaby Lab Synthesizer</h4>
                <p className="text-xs opacity-75">Click keys to tune pentatonic chimes!</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => playPop && playPop(440)} className="px-3 py-1.5 bg-[#a34063] text-white text-xs font-bold rounded-lg shadow-xs">Note A</button>
              <button onClick={() => playPop && playPop(523.25)} className="px-3 py-1.5 bg-[#8b3252] text-white text-xs font-bold rounded-lg shadow-xs">Note C</button>
              <button onClick={() => playPop && playPop(659.25)} className="px-3 py-1.5 bg-[#5c4033] text-white text-xs font-bold rounded-lg shadow-xs">Note E</button>
            </div>
          </div>

          {/* Invention 2: Dimmable Dream Lantern */}
          <div className="p-4 bg-white rounded-2xl border border-[#a34063]/20 shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <img src="/baby-assets/pip_dream_lantern.png" alt="Dream Lantern" className="w-12 h-12 object-contain" />
              <div>
                <h4 className="font-bold text-sm text-[#a34063]">2. Dimmable Dream Lantern</h4>
                <p className="text-xs opacity-75">Adjust the light glow below!</p>
              </div>
            </div>

            <div 
              className="w-16 h-16 mx-auto rounded-full transition-all duration-300 flex items-center justify-center text-xl my-2"
              style={{
                backgroundColor: '#fde047',
                boxShadow: `0 0 ${lanternBrightness / 1.5}px #fde047`,
                opacity: lanternBrightness / 100
              }}
            >
              🌙
            </div>

            <input 
              type="range" 
              min="10" 
              max="100" 
              value={lanternBrightness} 
              onChange={(e) => setLanternBrightness(Number(e.target.value))}
              className="w-full accent-[#a34063]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}