'use client';

import React from 'react';
import { Briefcase, X } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#fff8f1] rounded-3xl border-4 border-[#a34063] p-6 max-w-lg w-full shadow-2xl relative text-left max-h-[85vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#a34063] font-bold p-1 rounded-full hover:bg-[#a34063]/10">
          <X className="w-6 h-6" />
        </button>

        <h3 className="font-serif text-2xl font-bold text-[#a34063] mb-4 flex items-center gap-2">
          <Briefcase className="w-6 h-6" /> Pip's Portfolio Works
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {projects.map((p, idx) => (
            <div key={idx} className="p-3 bg-white rounded-2xl border border-[#a34063]/20 shadow-xs">
              <h4 className="font-bold text-[#a34063] mb-1">{p.title}</h4>
              <p className="opacity-80 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}