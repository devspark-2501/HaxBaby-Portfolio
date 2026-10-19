'use client';

import React from 'react';
import { Briefcase, X, Cloud, Ruler } from 'lucide-react';
import ConstellationCanvas from '../components/ConstellationCanvas';

export default function PortfolioModal({ onClose, playPop }) {
  const growthChart = [
    { height: "12 cm", milestone: "0 Months: Born in Midnight Nursery", note: "Discovered glowing amber eyes" },
    { height: "20 cm", milestone: "3 Months: First Lullaby Box Built", note: "Composed pentatonic sleep chimes" },
    { height: "28 cm", milestone: "6 Months: Mastered Dream Lanterns", note: "Created dimmable warm nightlights" },
    { height: "35 cm", milestone: "12 Months: Junior Dream Engineer!", note: "Flies rooftop routes nightly" }
  ];

  return (
    <div className="fixed top-0 right-0 h-screen w-full sm:w-[85vw] md:w-[70vw] lg:w-[55vw] pl-6 pb-6 pt-4 pr-0 z-50 pointer-events-none flex justify-end">
      <div className="bg-[#fff8f1] h-full w-full rounded-l-3xl border-l-4 border-y-4 border-[#a34063] p-8 shadow-2xl relative text-left overflow-y-auto pointer-events-auto space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#a34063]/20">
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

        {/* Nursery Wall Growth Chart */}
        <section className="p-4 bg-white rounded-2xl border-2 border-[#a34063]/20 shadow-xs">
          <div className="flex items-center gap-2 text-[#a34063] mb-3">
            <Ruler className="w-5 h-5" />
            <h4 className="font-serif font-bold text-base">Pip's Growth Height Chart</h4>
          </div>

          <div className="space-y-2 border-l-4 border-[#a34063]/40 pl-3">
            {growthChart.map((g, idx) => (
              <div key={idx} className="text-xs">
                <span className="font-bold text-[#a34063]">{g.height}</span> — <span className="font-semibold">{g.milestone}</span>
                <p className="text-[10px] opacity-75">{g.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Constellation Mini-Toy Canvas */}
        <ConstellationCanvas playPop={playPop} />

      </div>
    </div>
  );
}