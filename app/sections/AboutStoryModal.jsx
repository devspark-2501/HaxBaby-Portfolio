'use client';

import React from 'react';
import { X, Cloud, Sparkles, BookOpen, User, Wrench, Heart } from 'lucide-react';

export default function AboutStoryModal({ onClose }) {
  return (
    <div className="fixed top-0 right-0 h-screen w-full sm:w-[90vw] md:w-[75vw] lg:w-[60vw] pl-4 sm:pl-8 pb-6 pt-4 pr-0 z-50 pointer-events-none flex justify-end">
      <div className="bg-[#fff8f1] h-full w-full rounded-l-3xl border-l-4 border-y-4 border-[#a34063] p-6 sm:p-10 shadow-2xl relative text-left overflow-y-auto pointer-events-auto">
        
        {/* Sticky Header with Cloud Motif */}
        <div className="sticky top-0 bg-[#fff8f1]/95 backdrop-blur-md pt-2 pb-4 border-b border-[#a34063]/20 mb-8 z-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cloud className="w-7 h-7 text-[#a34063] fill-[#a34063]/20" />
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#a34063]">
                About Pip & Origin Journey
              </h2>
              <p className="text-[11px] font-bold text-[#a34063]/70">Scroll down to unlock Pip's world story!</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#a34063] font-bold p-2 rounded-full hover:bg-[#a34063]/10">
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* SCROLL-DRIVEN STORY & IDENTITY CONTAINER */}
        <div className="space-y-12 pb-12">

          {/* SECTION 1: WHAT THEY ARE */}
          <section className="p-6 bg-white rounded-3xl border-2 border-[#a34063]/20 shadow-md">
            <div className="flex items-center gap-2 text-[#a34063] mb-3">
              <User className="w-5 h-5" />
              <h3 className="font-serif font-bold text-xl">1. What Pip Is (Identity & Quirks)</h3>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <img
                src="/baby-assets/pip_portrait.png"
                alt="Pip Portrait"
                className="w-36 h-36 object-contain rounded-2xl bg-[#fff8f1] p-2 border-2 border-[#a34063]/30 shadow-inner"
              />
              <div className="space-y-2 text-xs sm:text-sm text-[#5c4033] leading-relaxed">
                <p><strong>Species:</strong> A sweet baby skull creature wearing cozy heart-patterned pajamas and a starry nightcap tied with a pink ribbon[cite: 6].</p>
                <p><strong>Look:</strong> Smooth round skull face, huge soft eye sockets with warm glowing amber pinpricks, and a gentle crooked smile[cite: 6]. Never scary or creepy!</p>
                <p><strong>Personality:</strong> Sleepy, curious, easily delighted, clumsy, and loves making soft chimes.</p>
              </div>
            </div>
          </section>

          {/* SECTION 2: WHAT THEY DO */}
          <section className="p-6 bg-white rounded-3xl border-2 border-[#a34063]/20 shadow-md">
            <div className="flex items-center gap-2 text-[#a34063] mb-3">
              <Wrench className="w-5 h-5" />
              <h3 className="font-serif font-bold text-xl">2. What Pip Does (Profession & Inventions)</h3>
            </div>
            
            <p className="text-xs sm:text-sm leading-relaxed mb-4">
              Pip serves as <strong>Junior Dream Engineer</strong> at Midnight Nursery! Pip designs bedtime routines, lullaby chimes, and nightlights so forest creatures fall asleep peacefully.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#fff8f1] rounded-2xl border border-[#a34063]/20">
                <h4 className="font-bold text-[#a34063]">🎵 Lullaby Lab</h4>
                <p className="opacity-80">Pentatonic music boxes that play soothing sleep chimes.</p>
              </div>
              <div className="p-3 bg-[#fff8f1] rounded-2xl border border-[#a34063]/20">
                <h4 className="font-bold text-[#a34063]">💡 Nightlight Lanterns</h4>
                <p className="opacity-80">Dimmable bedside lamps that scare dark shadows away[cite: 3].</p>
              </div>
            </div>
          </section>

          {/* SECTION 3: SCROLL-BASED ORIGIN STORY SCENES */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-[#a34063]">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-serif font-bold text-xl">3. Pip's Origin Journey (Scroll Story)</h3>
            </div>

            {/* Story Scene 1 */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#a34063] to-[#8b3252] text-white shadow-lg space-y-2">
              <span className="text-[10px] font-extrabold uppercase px-3 py-1 bg-white/20 rounded-full">
                Scene 1: Starlight Nursery Birth
              </span>
              <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                Pip popped into existence during a midnight star shower right onto a soft cloud in Whispering Woods. While traditional skulls were feared, Pip was born with warm glowing amber eye sockets that radiated comfort!
              </p>
            </div>

            {/* Story Scene 2 */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#8b3252] to-[#5c4033] text-white shadow-lg space-y-2">
              <span className="text-[10px] font-extrabold uppercase px-3 py-1 bg-white/20 rounded-full">
                Scene 2: Crafting Bedtime Chimes
              </span>
              <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                When little bear cubs and forest creatures couldn't sleep, Pip combined wooden blocks with starlight strings to create the first Lullaby Box. Every gentle chime lulled the entire valley into sweet dreams.
              </p>
            </div>

            {/* Story Scene 3 */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#a34063] to-[#4a2a38] text-white shadow-lg space-y-2">
              <span className="text-[10px] font-extrabold uppercase px-3 py-1 bg-white/20 rounded-full">
                Scene 3: Official Dream Engineer
              </span>
              <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                Today, Pip flies across rooftop delivery routes delivering bedside lanterns and dreams. Tagline: "I build the dreams you fall asleep inside."
              </p>
            </div>
          </section>

          {/* SECTION 4: IMMERSION & ART STYLE */}
          <section className="p-6 bg-white rounded-3xl border-2 border-[#a34063]/20 shadow-md">
            <div className="flex items-center gap-2 text-[#a34063] mb-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-serif font-bold text-xl">4. Art Style & Aesthetic</h3>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed opacity-85">
              Rendered in an early-web 90s aesthetic mixed with 3D soft pastel cloud art, warm cream backgrounds (#fff8f1), berry accents (#a34063), and interactive Web Audio synthesizers[cite: 3]!
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}