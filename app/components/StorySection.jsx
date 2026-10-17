'use client';

import React, { useState } from 'react';

export default function StorySection() {
  const [activeScene, setActiveScene] = useState(0);

  const scenes = [
    {
      title: "Scene 1: Born in Midnight Nursery",
      text: "Deep inside the cozy Midnight Nursery, Pip was born under a starry sky. Wearing a starry nightcap tied with a pink bow, Pip discovered glowing amber eyes that turn scary dark shadows into warm nightlights.",
      bg: "from-purple-900 to-indigo-900"
    },
    {
      title: "Scene 2: Crafting the First Lullaby",
      text: "When forest creatures couldn't sleep, Pip constructed the first Lullaby Music Box from wooden blocks and starlight chime strings. Every gentle crank lulled sleeping bear cubs into sweet dreams.",
      bg: "from-pink-900 to-purple-900"
    },
    {
      title: "Scene 3: Junior Dream Engineer",
      text: "Today, Pip works officially as Junior Dream Engineer! Mapping starry flight routes every night, Pip delivers custom dreams and cozy lanterns to nurseries everywhere. Good things start small!",
      bg: "from-slate-900 to-purple-950"
    }
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 my-8 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-3xl border-4 border-pink-300 shadow-xl relative z-10">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-black text-pink-600">Pip's Bedtime Origin Story</h3>
        <p className="text-xs font-medium opacity-75 mt-1">Interactive scrollable scenes (&lt;150 words per scene)</p>
      </div>

      <div className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${scenes[activeScene].bg} text-white shadow-inner transition-all duration-500 flex flex-col sm:flex-row gap-6 items-center`}>
        <img
          src="/baby-assets/pip_portrait.png"
          alt="Pip Portrait"
          className="w-32 h-32 object-contain bg-white/10 p-2 rounded-2xl border-2 border-pink-300/40"
        />

        <div className="flex-1 flex flex-col justify-between w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
              {scenes[activeScene].title}
            </span>
            <span className="text-xs font-mono text-pink-300">{activeScene + 1} / {scenes.length}</span>
          </div>

          <p className="text-sm sm:text-base leading-relaxed font-medium my-3 opacity-95">
            "{scenes[activeScene].text}"
          </p>

          <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/20">
            <button
              disabled={activeScene === 0}
              onClick={() => setActiveScene((prev) => Math.max(0, prev - 1))}
              className="px-4 py-1 rounded-full bg-white/20 text-xs font-bold disabled:opacity-30 hover:bg-white/30"
            >
              ← Prev
            </button>

            <div className="flex gap-2">
              {scenes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveScene(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${activeScene === idx ? 'bg-pink-400 w-6' : 'bg-white/40'}`}
                />
              ))}
            </div>

            <button
              disabled={activeScene === scenes.length - 1}
              onClick={() => setActiveScene((prev) => Math.min(scenes.length - 1, prev + 1))}
              className="px-4 py-1 rounded-full bg-white/20 text-xs font-bold disabled:opacity-30 hover:bg-white/30"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}