'use client';

import React from 'react';
import { BookOpen, X } from 'lucide-react';

export default function StoryModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#fff8f1] rounded-3xl border-4 border-[#a34063] p-6 max-w-lg w-full shadow-2xl relative text-left max-h-[85vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#a34063] font-bold p-1 rounded-full hover:bg-[#a34063]/10">
          <X className="w-6 h-6" />
        </button>

        <h3 className="font-serif text-2xl font-bold text-[#a34063] mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6" /> Pip's Origin & World
        </h3>

        <div className="space-y-3 text-xs leading-relaxed">
          <div className="p-3.5 bg-white rounded-2xl border border-[#a34063]/20">
            <h4 className="font-bold text-[#a34063] mb-1">Pip's Origin Story</h4>
            <p className="opacity-80">Born under Midnight Nursery stars, Pip discovered glowing amber eyes that turn dark room shadows into comforting bedside lamps!</p>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-[#a34063]/20">
            <h4 className="font-bold text-[#a34063] mb-1">The Town & World</h4>
            <p className="opacity-80">The Midnight Nursery neighborhood is home to sleepy owls, forest cubs, and supporting little creatures who look forward to Pip's nightly dream drops!</p>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-[#a34063]/20">
            <h4 className="font-bold text-[#a34063] mb-1">Visual Art Style</h4>
            <p className="opacity-80">Editorial serif headers, warm cream palette (#fff8f1), rich berry accents (#a34063), and retro early-web soul!</p>
          </div>
        </div>
      </div>
    </div>
  );
}