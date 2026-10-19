'use client';

import React, { useEffect, useState } from 'react';

export default function StarTrail() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (Math.random() > 0.4) return; // Limit density

      const newStar = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        symbol: ['✨', '⭐', '🌸', '🌙'][Math.floor(Math.random() * 4)],
        size: Math.random() * 12 + 10,
      };

      setStars((prev) => [...prev.slice(-15), newStar]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute animate-ping opacity-80 transition-opacity duration-700"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            fontSize: `${star.size}px`,
          }}
        >
          {star.symbol}
        </span>
      ))}
    </div>
  );
}