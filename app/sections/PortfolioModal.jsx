'use client';

import React from 'react';
import { Briefcase, X, Cloud } from 'lucide-react';

export default function PortfolioModal({ onClose }) {
  const projects = [
    { title: "1. The Lullaby Lab", desc: "A music box or generative soothing lullaby that Pip composed." },
    { title: "2. Nightlight Collection", desc: "A gallery of glowing lamps and bedside lanterns Pip designed." },
    { title: "3. Dream Delivery Routes", desc: "The interactive map Pip uses to fly across rooftops delivering dreams." },
    { title: "4. Rattle & Block Toys", desc: "Playable, interactive toys Pip invented that visitors can click or stack." },
    { title: "5. Bedtime Storybook", desc: "A cozy bedtime story Pip wrote and illustrated." },
    { title: "6. Pip's Growth Chart", desc: "Pip's skills shown as a baby height growth-chart on a nursery wall." }
  ];

  return (
    <div className="fixed top-0 right-0 h-screen w-full sm:w-[85vw] md:w-[70vw] lg:w-[55vw] pl-6 pb-6 pt-4 pr-0 z-50 pointer-events-none flex justify-end">
      <div className="bg-[#fff8f1] h-full w-full rounded-l-3xl border-l-4 border-y-4 border-[#a34063] p-8 shadow-2xl relative text-left overflow-y-auto pointer-events-auto">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#a34063]/20 mb-6">
          <div className="flex items-center gap-2">
            <Cloud className="w-6 h-6 text-[#a34063] fill-[#a34063]/20" />
            <h3 className="font-serif text-2xl font-bold text-[#a34063]">
              Pip's Portfolio Works
            </h3>
          </div>
          <button onClick={onClose} className="text-[#a34063] font-bold p-1 rounded-full hover:bg-[#a34063]/10">
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          {projects.map((p, idx) => (
            <div key={idx} className="p-4 bg-white rounded-2xl border border-[#a34063]/20 shadow-xs">
              <h4 className="font-bold text-[#a34063] mb-1.5">{p.title}</h4>
              <p className="opacity-80 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}