'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Sun, Moon, Volume2, VolumeX, Star, Wand2, Music, Lamp, Rocket } from 'lucide-react';

export default function HomePage() {
  const [isMuted, setIsMuted] = useState(false);
  const [isDreamMode, setIsDreamMode] = useState(false);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [activeModal, setActiveModal] = useState(null);
  const [visitorCount, setVisitorCount] = useState(1337);
  const avatarRef = useRef(null);

  // Web Audio API Sound Generator (No audio files required!)
  const playPopSound = (freq = 523.25) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  // Pupil eye-tracking cursor logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!avatarRef.current) return;
      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const distance = Math.min(8, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 25);

      setPupilPos({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Easter Egg Confetti Trigger
  const triggerEasterEgg = () => {
    playPopSound(880);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.35 },
      colors: ['#ff69b4', '#ff1493', '#ff007f', '#a855f7', '#3b82f6', '#fde047']
    });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-700 font-sans relative overflow-x-hidden ${
        isDreamMode
          ? 'bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-900 text-pink-100'
          : 'bg-gradient-to-br from-pink-200 via-purple-100 to-sky-200 text-purple-950'
      }`}
    >
      {/* Decorative Wavy Curved Background Elements */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none opacity-40">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-24 fill-pink-300">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Floating Rainbow Badges */}
      <div className="absolute top-12 left-6 sm:left-12 animate-bounce pointer-events-none">
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white font-black text-xs sm:text-sm px-4 py-2 rounded-full shadow-lg border-2 border-white flex items-center gap-1">
          <Sparkles className="w-4 h-4" /> Rainbow Magic
        </span>
      </div>

      <div className="absolute top-20 right-6 sm:right-12 animate-pulse pointer-events-none hidden sm:block">
        <span className="bg-yellow-300 text-purple-900 font-black text-xs px-3 py-1.5 rounded-full shadow-md border-2 border-white flex items-center gap-1">
          <Star className="w-4 h-4 fill-amber-400" /> Tiny Dreamer
        </span>
      </div>

      {/* Top Controls Header */}
      <header className="p-6 max-w-6xl mx-auto flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-300 p-1 shadow-md">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-bold text-pink-600 text-lg">
              ✨
            </div>
          </div>
          <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Pip's Pop-Up World
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Mute Switch */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 rounded-2xl bg-white/80 backdrop-blur-md shadow-md border-2 border-pink-300 hover:scale-110 active:scale-95 transition-all text-pink-600"
            title={isMuted ? "Unmute sounds" : "Mute sounds"}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-gray-400" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Dream Night / Day Mood Toggle */}
          <button
            onClick={() => {
              setIsDreamMode(!isDreamMode);
              playPopSound(659.25);
            }}
            className="p-3 rounded-2xl bg-white/80 backdrop-blur-md shadow-md border-2 border-purple-300 hover:scale-110 active:scale-95 transition-all text-purple-600"
            title="Toggle Dream Night Shift"
          >
            {isDreamMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-4 py-8 flex flex-col items-center text-center relative z-10">
        
        {/* Cartoon Baby Avatar Container */}
        <div
          ref={avatarRef}
          className="relative w-56 h-56 sm:w-64 sm:h-64 bg-gradient-to-b from-pink-100 to-purple-100 rounded-full border-8 border-pink-400 shadow-2xl flex items-center justify-center my-6 hover:scale-105 transition-transform group"
        >
          {/* Interactive Easter Egg Bow */}
          <button
            onClick={triggerEasterEgg}
            className="absolute -top-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-lg border-2 border-white hover:scale-110 active:scale-90 transition-all animate-bounce cursor-pointer"
          >
            🎀 Tap My Bow!
          </button>

          {/* Eyes with Animated Pupil Tracking */}
          <div className="flex gap-10 items-center justify-center">
            {/* Left Eye */}
            <div className="w-12 h-16 bg-purple-950 rounded-full relative flex items-center justify-center overflow-hidden border-2 border-pink-300">
              <div
                className="w-4 h-4 bg-yellow-300 rounded-full shadow-[0_0_10px_#fde047]"
                style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }}
              />
            </div>
            {/* Right Eye */}
            <div className="w-12 h-16 bg-purple-950 rounded-full relative flex items-center justify-center overflow-hidden border-2 border-pink-300">
              <div
                className="w-4 h-4 bg-yellow-300 rounded-full shadow-[0_0_10px_#fde047]"
                style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }}
              />
            </div>
          </div>

          {/* Cheeks */}
          <div className="absolute bottom-14 left-10 w-8 h-5 bg-pink-300/80 rounded-full blur-xs" />
          <div className="absolute bottom-14 right-10 w-8 h-5 bg-pink-300/80 rounded-full blur-xs" />

          {/* Smile */}
          <div className="absolute bottom-10 w-8 h-4 border-b-4 border-purple-950 rounded-b-full" />
        </div>

        {/* Character Title & Bio */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-wide mb-3 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
          Pip The Skull Baby
        </h1>

        <p className="inline-block bg-pink-500/10 border border-pink-400/30 font-bold text-pink-600 px-4 py-1.5 rounded-full text-sm sm:text-base mb-6 shadow-sm">
          🌙 Junior Dream Engineer @ Midnight Nursery
        </p>

        <p className="max-w-xl text-base sm:text-lg font-medium opacity-90 leading-relaxed mb-8">
          Welcome to my cozy interactive playground! I build soothing lullabies, glowing bedside lanterns, and magical dream paths to help little creatures fall asleep.
        </p>

        {/* Action Showcase Grid (Pop-Up Cards) */}
        <section className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 my-6">
          {/* Card 1: Lullaby Lab */}
          <div
            onClick={() => {
              playPopSound(523.25);
              setActiveModal('lullaby');
            }}
            className="cursor-pointer bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-6 rounded-3xl border-4 border-pink-300 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all group"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <Music className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-xl mb-1 text-pink-600">Lullaby Lab</h3>
            <p className="text-xs opacity-75 font-medium">Interactive music box with soothing synth notes.</p>
          </div>

          {/* Card 2: Nightlight Collection */}
          <div
            onClick={() => {
              playPopSound(659.25);
              setActiveModal('nightlight');
            }}
            className="cursor-pointer bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-6 rounded-3xl border-4 border-purple-300 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all group"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-purple-400 to-indigo-400 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <Lamp className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-xl mb-1 text-purple-600">Nightlights</h3>
            <p className="text-xs opacity-75 font-medium">Glowing lanterns & bedside lamps collection.</p>
          </div>

          {/* Card 3: Dream Routes */}
          <div
            onClick={() => {
              playPopSound(783.99);
              setActiveModal('routes');
            }}
            className="cursor-pointer bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-6 rounded-3xl border-4 border-cyan-300 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all group"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-cyan-400 to-sky-400 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <Rocket className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-xl mb-1 text-cyan-600">Dream Routes</h3>
            <p className="text-xs opacity-75 font-medium">Rooftop flight maps for starlight delivery.</p>
          </div>
        </section>

        {/* Vintage Odometer Counter */}
        <div className="mt-6 p-4 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-2 border-pink-300 shadow-lg flex items-center gap-3">
          <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider">Dream Travelers Visited:</span>
          <div className="font-mono text-lg font-black bg-purple-950 text-pink-300 px-3 py-1 rounded-xl shadow-inner border border-purple-800">
            {String(visitorCount).padStart(6, '0')}
          </div>
        </div>
      </main>

      {/* Pop-Up Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-4 border-pink-400 p-6 max-w-md w-full shadow-2xl relative text-center animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 font-bold text-xl"
            >
              ✕
            </button>

            {activeModal === 'lullaby' && (
              <div>
                <h3 className="text-2xl font-black text-pink-600 mb-2">🎵 Lullaby Box</h3>
                <p className="text-sm opacity-80 mb-6">Tap the buttons to compose a cozy lullaby melody!</p>
                <div className="flex justify-center gap-3">
                  <button onClick={() => playPopSound(440)} className="px-4 py-3 bg-pink-400 text-white font-bold rounded-2xl shadow-md hover:scale-105 active:scale-95">Note A</button>
                  <button onClick={() => playPopSound(523.25)} className="px-4 py-3 bg-purple-400 text-white font-bold rounded-2xl shadow-md hover:scale-105 active:scale-95">Note C</button>
                  <button onClick={() => playPopSound(659.25)} className="px-4 py-3 bg-cyan-400 text-white font-bold rounded-2xl shadow-md hover:scale-105 active:scale-95">Note E</button>
                </div>
              </div>
            )}

            {activeModal === 'nightlight' && (
              <div>
                <h3 className="text-2xl font-black text-purple-600 mb-2">💡 Nightlight Glow</h3>
                <p className="text-sm opacity-80 mb-6">Pip's lanterns glow warm and cozy in the night sky.</p>
                <div className="w-24 h-24 mx-auto bg-amber-200 rounded-full shadow-[0_0_40px_#fde047] flex items-center justify-center text-3xl">
                  🌙
                </div>
              </div>
            )}

            {activeModal === 'routes' && (
              <div>
                <h3 className="text-2xl font-black text-cyan-600 mb-2">🚀 Dream Route Map</h3>
                <p className="text-sm opacity-80 mb-6">Flight path clear! All sleep routes active tonight.</p>
                <div className="p-4 bg-sky-50 dark:bg-slate-800 rounded-2xl border-2 border-dashed border-cyan-300 font-mono text-xs text-cyan-600 font-bold">
                  ROUTE #09: Cloud Nursery → Starlight Ridge
                </div>
              </div>
            )}

            <button
              onClick={() => setActiveModal(null)}
              className="mt-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full shadow-md hover:opacity-90 transition-opacity"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}