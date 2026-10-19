'use client';

import React, { useState } from 'react';

export default function ConstellationCanvas({ playPop }) {
  const [points, setPoints] = useState([]);

  const handleCanvasClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (playPop) playPop(500 + points.length * 60);
    setPoints([...points, { x, y }]);
  };

  const clearCanvas = () => {
    setPoints([]);
    if (playPop) playPop(300);
  };

  return (
    <div className="p-4 bg-[#1c121e] rounded-2xl border-2 border-[#a34063]/30 text-white text-left">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-pink-300">✨ Draw Pip's Dream Constellation</span>
        <button
          onClick={clearCanvas}
          className="text-[10px] bg-pink-900/50 hover:bg-pink-800 text-pink-200 px-2 py-1 rounded-md"
        >
          Clear Stars
        </button>
      </div>

      <div
        onClick={handleCanvasClick}
        className="w-full h-36 bg-purple-950/60 rounded-xl border border-pink-500/30 relative cursor-crosshair overflow-hidden shadow-inner"
      >
        <p className="absolute bottom-2 left-2 text-[10px] text-pink-300/60 pointer-events-none">
          Click inside to place glowing stars and connect lines!
        </p>

        {/* SVG Connective Lines */}
        <svg className="w-full h-full absolute inset-0 pointer-events-none">
          {points.map((pt, idx) => {
            if (idx === 0) return null;
            const prev = points[idx - 1];
            return (
              <line
                key={idx}
                x1={prev.x}
                y1={prev.y}
                x2={pt.x}
                y2={pt.y}
                stroke="#fbcfe8"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
            );
          })}
        </svg>

        {/* Render Glowing Star Nodes */}
        {points.map((pt, idx) => (
          <div
            key={idx}
            className="absolute w-3 h-3 bg-amber-300 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#fde047] animate-pulse"
            style={{ left: `${pt.x}px`, top: `${pt.y}px` }}
          />
        ))}
      </div>
    </div>
  );
}