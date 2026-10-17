'use client';

import React, { useState } from 'react';
import { Music, Lamp, Rocket, Play, Volume2 } from 'lucide-react';

export default function ProjectShowcase({ playPop }) {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 relative z-10">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-black text-pink-600">Pip's Inventions & Projects</h3>
        <p className="text-sm font-medium opacity-75">Click on any project to interact!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Showcase Project 1: Lullaby Lab */}
        <div
          onClick={() => {
            if (playPop) playPop(523.25);
            setActiveModal('lullaby');
          }}
          className="cursor-pointer bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-6 rounded-3xl border-4 border-pink-300 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-center group"
        >
          <div className="w-24 h-24 mx-auto mb-4 p-2 rounded-2xl bg-pink-100 flex items-center justify-center border-2 border-pink-300 shadow-md group-hover:scale-105 transition-transform">
            <img src="/baby-assets/pip_lullaby_box.png" alt="Lullaby Box" className="w-full h-full object-contain" />
          </div>
          <h4 className="font-extrabold text-xl text-pink-600 mb-1">1. Lullaby Lab</h4>
          <p className="text-xs opacity-75 font-medium">Interactive music box playing soothing synth chimes.</p>
        </div>

        {/* Showcase Project 2: Nightlights */}
        <div
          onClick={() => {
            if (playPop) playPop(659.25);
            setActiveModal('nightlight');
          }}
          className="cursor-pointer bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-6 rounded-3xl border-4 border-purple-300 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-center group"
        >
          <div className="w-24 h-24 mx-auto mb-4 p-2 rounded-2xl bg-purple-100 flex items-center justify-center border-2 border-purple-300 shadow-md group-hover:scale-105 transition-transform">
            <img src="/baby-assets/pip_dream_lantern.png" alt="Dream Lantern" className="w-full h-full object-contain" />
          </div>
          <h4 className="font-extrabold text-xl text-purple-600 mb-1">2. Nightlight Collection</h4>
          <p className="text-xs opacity-75 font-medium">Dimmable bedside lamps & glowing lanterns.</p>
        </div>

        {/* Showcase Project 3: Dream Delivery Routes */}
        <div
          onClick={() => {
            if (playPop) playPop(783.99);
            setActiveModal('routes');
          }}
          className="cursor-pointer bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-6 rounded-3xl border-4 border-cyan-300 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-center group"
        >
          <div className="w-24 h-24 mx-auto mb-4 p-2 rounded-2xl bg-cyan-100 flex items-center justify-center border-2 border-cyan-300 shadow-md group-hover:scale-105 transition-transform">
            <Rocket className="w-12 h-12 text-cyan-600 animate-bounce" />
          </div>
          <h4 className="font-extrabold text-xl text-cyan-600 mb-1">3. Dream Delivery Routes</h4>
          <p className="text-xs opacity-75 font-medium">Interactive flight map over sleeping nursery rooftops.</p>
        </div>
      </div>

      {/* Pop-Up Interactive Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-4 border-pink-400 p-6 max-w-md w-full shadow-2xl relative text-center">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 font-bold text-xl"
            >
              ✕
            </button>

            {activeModal === 'lullaby' && (
              <div>
                <img src="/baby-assets/pip_lullaby_box.png" alt="Lullaby Box" className="w-28 h-28 mx-auto mb-3 object-contain" />
                <h3 className="text-2xl font-black text-pink-600 mb-1">🎵 Lullaby Synthesizer</h3>
                <p className="text-xs opacity-80 mb-6">Tap the keys to create your cozy bedtime melody!</p>
                <div className="flex justify-center gap-2">
                  <button onClick={() => playPop(440)} className="px-4 py-3 bg-pink-500 text-white font-bold rounded-2xl shadow-md hover:scale-105">Note A</button>
                  <button onClick={() => playPop(523.25)} className="px-4 py-3 bg-purple-500 text-white font-bold rounded-2xl shadow-md hover:scale-105">Note C</button>
                  <button onClick={() => playPop(659.25)} className="px-4 py-3 bg-cyan-500 text-white font-bold rounded-2xl shadow-md hover:scale-105">Note E</button>
                </div>
              </div>
            )}

            {activeModal === 'nightlight' && (
              <div>
                <img src="/baby-assets/pip_dream_lantern.png" alt="Dream Lantern" className="w-28 h-28 mx-auto mb-3 object-contain" />
                <h3 className="text-2xl font-black text-purple-600 mb-1">💡 Glowing Dream Lantern</h3>
                <p className="text-xs opacity-80 mb-6">Pip's lantern illuminates cozy dreams across the forest.</p>
                <div className="w-20 h-20 mx-auto bg-amber-200 rounded-full shadow-[0_0_50px_#fde047] flex items-center justify-center text-3xl">
                  🌙
                </div>
              </div>
            )}

            {activeModal === 'routes' && (
              <div>
                <h3 className="text-2xl font-black text-cyan-600 mb-2">🚀 Starlight Flight Map</h3>
                <p className="text-xs opacity-80 mb-4">Pip's rooftop path for tonight's dream deliveries!</p>
                <div className="p-4 bg-sky-50 dark:bg-slate-800 rounded-2xl border-2 border-dashed border-cyan-400 font-mono text-xs text-cyan-600 font-bold">
                  ✨ PATH ACTIVE: Cloud Nursery → Star Ridge
                </div>
              </div>
            )}

            <button
              onClick={() => setActiveModal(null)}
              className="mt-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full shadow-md"
            >
              Close Showcase
            </button>
          </div>
        </div>
      )}
    </section>
  );
}