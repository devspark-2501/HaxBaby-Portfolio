'use client';

import React, { useState } from 'react';
import { Wand2, X, Cloud } from 'lucide-react';

export default function InventionsModal({ onClose, playPop }) {
  const [lanternBrightness, setLanternBrightness] = useState(85);

  return (
    <div className="fixed top-0 right-0 h-screen w-full sm:w-[85vw] md:w-[70vw] lg:w-[55vw] pl-6 pb-6 pt-4 pr-0 z-50 pointer-events-none flex justify-end">
      <div className="bg-[#fff8f1] h-full w-full rounded-l-3xl border-l-4 border-y-4 border-[#a34063] p-8 shadow-2xl relative text-left overflow-y-auto pointer-events-auto">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#a34063]/20 mb-6">
          <div className="flex items-center gap-2">
            <Cloud className="w-6 h-6 text-[#a34063] fill-[#a34063]/20" />
            <h3 className="font-serif text-2xl font-bold text-[#a34063]">
              Pip's Nursery Inventions
            </h3>
          </div>
          <button onClick={onClose} className="text-[#a34063] font-bold p-1 rounded-full hover:bg-[#a34063]/10">
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="p-5 bg-white rounded-2xl border border-[#a34063]/20 shadow-xs">
            <div className="flex items-center gap-4 mb-3">
              <img src="/baby-assets/pip_lullaby_box.png" alt="Lullaby Box" className="w-16 h-16 object-contain" />
              <div>
                <h4 className="font-serif font-bold text-base text-[#a34063]">1. Lullaby Lab Synthesizer</h4>
                <p className="text-xs opacity-75">Click keys to tune pentatonic chimes!</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => playPop && playPop(440)} className="px-4 py-2 bg-[#a34063] text-white text-xs font-bold rounded-xl shadow-xs">Note A</button>
              <button onClick={() => playPop && playPop(523.25)} className="px-4 py-2 bg-[#8b3252] text-white text-xs font-bold rounded-xl shadow-xs">Note C</button>
              <button onClick={() => playPop && playPop(659.25)} className="px-4 py-2 bg-[#5c4033] text-white text-xs font-bold rounded-xl shadow-xs">Note E</button>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#a34063]/20 shadow-xs">
            <div className="flex items-center gap-4 mb-3">
              <img src="/baby-assets/pip_dream_lantern.png" alt="Dream Lantern" className="w-16 h-16 object-contain" />
              <div>
                <h4 className="font-serif font-bold text-base text-[#a34063]">2. Dimmable Dream Lantern</h4>
                <p className="text-xs opacity-75">Adjust the slider below to control light intensity!</p>
              </div>
            </div>

            <div 
              className="w-20 h-20 mx-auto rounded-full transition-all duration-300 flex items-center justify-center text-2xl my-4"
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