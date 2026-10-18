'use client';

import React from 'react';
import { BookOpen, X, Cloud, Sparkles } from 'lucide-react';

export default function StoryModal({ onClose }) {
  return (
    <div className="fixed top-0 right-0 h-screen w-full sm:w-[85vw] md:w-[70vw] lg:w-[55vw] pl-6 pb-6 pt-4 pr-0 z-50 pointer-events-none flex justify-end">
      <div className="bg-[#fff8f1] h-full w-full rounded-l-3xl border-l-4 border-y-4 border-[#a34063] p-8 shadow-2xl relative text-left overflow-y-auto pointer-events-auto">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#a34063]/20 mb-6">
          <div className="flex items-center gap-2">
            <Cloud className="w-6 h-6 text-[#a34063] fill-[#a34063]/20" />
            <h3 className="font-serif text-2xl font-bold text-[#a34063]">
              Pip's Origin & World
            </h3>
          </div>
          <button onClick={onClose} className="text-[#a34063] font-bold p-1 rounded-full hover:bg-[#a34063]/10">
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="space-y-5 text-xs sm:text-sm leading-relaxed">
          {/* Expanded Origin Story */}
          <div className="p-5 bg-white rounded-2xl border border-[#a34063]/20 shadow-xs">
            <div className="flex items-center gap-2 mb-2 text-[#a34063]">
              <Sparkles className="w-4 h-4" />
              <h4 className="font-serif font-bold text-base">Pip's Expanded Origin Story</h4>
            </div>
            <p className="opacity-85 leading-relaxed">
              Long ago, during a midnight shower of falling stars over Whispering Woods, Pip popped into existence right on a bed of fluffy cotton clouds in Midnight Nursery! While typical skulls in old tales were spooky, Pip was born with a round face, soft eye sockets, and a starry nightcap with a pink ribbon. When night fell, Pip discovered that glowing amber eye pinpricks could light up dark corners and calm scared forest creatures.
            </p>
          </div>

          {/* Town & World */}
          <div className="p-5 bg-white rounded-2xl border border-[#a34063]/20 shadow-xs">
            <h4 className="font-serif font-bold text-base text-[#a34063] mb-2">The Town & Supporting Creatures</h4>
            <p className="opacity-85 leading-relaxed">
              Pip lives in Starlight Nursery, a hilltop town nestled between Cloud Ridge and Sleepy Hollow. Pip's best friends are Barnaby the Little Bear Cub, Barnaby's nocturnal owl friend Hootie, and glowing forest fireflies who help deliver bedtime dreams across every chimney!
            </p>
          </div>

          {/* Visual Style */}
          <div className="p-5 bg-white rounded-2xl border border-[#a34063]/20 shadow-xs">
            <h4 className="font-serif font-bold text-base text-[#a34063] mb-2">Art Style & Aesthetic</h4>
            <p className="opacity-85 leading-relaxed">
              Built with editorial serif headers, soft cream canvas backgrounds (#fff8f1), rich berry accents (#a34063), early-web whimsy, and cozy custom cloud motifs!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}