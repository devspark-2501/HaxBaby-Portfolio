'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Sun, Moon, Volume2, VolumeX, Music, Lamp, Rocket, Send, MessageSquare, Star } from 'lucide-react';

export default function PipCottonCandyOS() {
  const [isMuted, setIsMuted] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [activeScene, setActiveScene] = useState(0);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [visitorCount] = useState(1337);

  // Guestbook State
  const [messages, setMessages] = useState([
    { name: "Luna Owl", note: "Loved the lullaby music box! ✨" },
    { name: "Tiny Cub", note: "Nightlights keep my cave cozy! 🌙" }
  ]);
  const [guestName, setGuestName] = useState('');
  const [guestNote, setGuestNote] = useState('');

  const avatarRef = useRef(null);

  // Web Audio API Sound Generator
  const playPop = (freq = 523.25) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, ctx.currentTime + 0.12);

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

  // Eye tracking pupil logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!avatarRef.current) return;
      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const distance = Math.min(6, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 30);

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
    playPop(880);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.35 },
      colors: ['#ff85a1', '#fbcfe8', '#fef08a', '#93c5fd', '#a7f3d0']
    });
  };

  // Handle Guestbook Submit
  const handleGuestSubmit = (e) => {
    e.preventDefault();
    if (!guestName || !guestNote) return;
    playPop(880);
    setMessages([{ name: guestName, note: guestNote }, ...messages]);
    setGuestName('');
    setGuestNote('');
  };

  // Bedtime Story Scenes
  const storyScenes = [
    {
      title: "Scene 1: Born in Midnight Nursery",
      text: "Deep inside the cozy Midnight Nursery, Pip was born under a starry sky. Wearing a starry nightcap tied with a pink bow, Pip discovered glowing amber eyes that turn scary dark shadows into warm nightlights.",
      bg: "from-pink-400 to-purple-400"
    },
    {
      title: "Scene 2: Crafting the First Lullaby",
      text: "When forest creatures couldn't sleep, Pip constructed the first Lullaby Music Box from wooden blocks and starlight chime strings. Every gentle crank lulled sleeping bear cubs into sweet dreams.",
      bg: "from-purple-400 to-indigo-400"
    },
    {
      title: "Scene 3: Junior Dream Engineer",
      text: "Today, Pip works officially as Junior Dream Engineer! Mapping starry flight routes every night, Pip delivers custom dreams and cozy lanterns to nurseries everywhere. Good things start small!",
      bg: "from-pink-500 to-rose-400"
    }
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-700 font-sans relative overflow-x-hidden ${
        isNightMode
          ? 'bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-900 text-pink-100'
          : 'bg-gradient-to-br from-pink-100 via-rose-50 to-sky-100 text-[#5c2035]'
      }`}
    >
      {/* Top Navbar */}
      <header className="p-6 max-w-5xl mx-auto flex justify-between items-center relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-white p-1 shadow-md shadow-pink-200/50 flex items-center justify-center text-xl">
            ✨
          </div>
          <div>
            <h1 className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
              Pip's Nursery
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider text-pink-500/80">haX.baby Track 1</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mute Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-md shadow-pink-100 border-2 border-pink-200 hover:scale-110 active:scale-95 transition-all text-pink-600"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-gray-400" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Day / Night Shift */}
          <button
            onClick={() => {
              setIsNightMode(!isNightMode);
              playPop(659.25);
            }}
            className="p-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-md shadow-pink-100 border-2 border-pink-200 hover:scale-110 active:scale-95 transition-all text-purple-600"
            title="Toggle Night Shift"
          >
            {isNightMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-purple-600" />}
          </button>
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="max-w-4xl mx-auto px-4 py-4 flex flex-col items-center text-center relative z-10">
        
        {/* Floating Badge */}
        <div className="mb-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white font-bold text-xs shadow-md border-2 border-white animate-bounce">
          <Sparkles className="w-4 h-4" /> Official Track 1: Pip the Skull Baby
        </div>

        {/* Hero Avatar Stage */}
        <div
          ref={avatarRef}
          className="relative w-60 h-60 sm:w-68 sm:h-68 my-4 rounded-full p-4 bg-gradient-to-b from-white via-pink-100 to-pink-200 border-8 border-white shadow-2xl shadow-pink-300/40 flex items-center justify-center hover:scale-105 transition-transform"
        >
          {/* Easter Egg Bow */}
          <button
            onClick={triggerEasterEgg}
            className="absolute -top-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-lg border-2 border-white hover:scale-110 active:scale-90 transition-all cursor-pointer z-20"
          >
            🎀 Tap Pip's Ribbon!
          </button>

          <img
            src="/baby-assets/pip_avatar_cloud.png"
            alt="Pip Avatar"
            className="w-full h-full object-contain rounded-full"
          />

          {/* Pupil Eye Tracking Layer */}
          <div className="absolute top-[38%] flex gap-10 justify-center pointer-events-none">
            <div className="w-3 h-3 bg-amber-300 rounded-full shadow-[0_0_8px_#fde047]" style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }} />
            <div className="w-3 h-3 bg-amber-300 rounded-full shadow-[0_0_8px_#fde047]" style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }} />
          </div>
        </div>

        <h2 className="text-4xl sm:text-6xl font-black tracking-wide mb-2 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
          Pip The Skull Baby
        </h2>

        <p className="inline-block bg-white/80 border-2 border-pink-200 font-bold text-pink-600 px-4 py-1.5 rounded-full text-xs sm:text-sm mb-4 shadow-xs">
          🌙 Junior Dream Engineer @ Midnight Nursery
        </p>

        <p className="max-w-lg text-sm sm:text-base font-medium opacity-90 leading-relaxed mb-6">
          A gentle, sleepy creature with glowing amber eye sockets and a starry nightcap. Pip designs dreams and lullabies to help little creatures fall asleep!
        </p>

        {/* Visitor Hit Counter */}
        <div className="p-3 rounded-2xl bg-white/90 backdrop-blur-md border-2 border-pink-200 shadow-sm inline-flex items-center gap-3">
          <Heart className="w-5 h-5 text-pink-500 fill-pink-400 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-pink-600">Dream Travelers:</span>
          <div className="font-mono text-base font-black bg-pink-100 text-pink-700 px-3 py-1 rounded-xl border border-pink-300">
            {String(visitorCount).padStart(6, '0')}
          </div>
        </div>

        {/* Interactive Toy Showcase Cards */}
        <section className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5 my-10">
          <div
            onClick={() => { playPop(523.25); setActiveModal('lullaby'); }}
            className="cursor-pointer bg-white/90 backdrop-blur-md p-5 rounded-3xl border-4 border-white shadow-lg shadow-pink-200/40 hover:-translate-y-2 transition-all text-center group"
          >
            <div className="w-20 h-20 mx-auto mb-3 p-2 rounded-2xl bg-pink-50 flex items-center justify-center border-2 border-pink-200 group-hover:scale-105 transition-transform">
              <img src="/baby-assets/pip_lullaby_box.png" alt="Lullaby Box" className="w-full h-full object-contain" />
            </div>
            <h3 className="font-black text-lg text-pink-600 mb-1">1. Lullaby Lab</h3>
            <p className="text-xs font-medium opacity-75">Interactive music box with soothing chimes.</p>
          </div>

          <div
            onClick={() => { playPop(659.25); setActiveModal('nightlight'); }}
            className="cursor-pointer bg-white/90 backdrop-blur-md p-5 rounded-3xl border-4 border-white shadow-lg shadow-pink-200/40 hover:-translate-y-2 transition-all text-center group"
          >
            <div className="w-20 h-20 mx-auto mb-3 p-2 rounded-2xl bg-pink-50 flex items-center justify-center border-2 border-pink-200 group-hover:scale-105 transition-transform">
              <img src="/baby-assets/pip_dream_lantern.png" alt="Dream Lantern" className="w-full h-full object-contain" />
            </div>
            <h3 className="font-black text-lg text-pink-600 mb-1">2. Nightlights</h3>
            <p className="text-xs font-medium opacity-75">Glowing lamps & bedside lanterns.</p>
          </div>

          <div
            onClick={() => { playPop(783.99); setActiveModal('routes'); }}
            className="cursor-pointer bg-white/90 backdrop-blur-md p-5 rounded-3xl border-4 border-white shadow-lg shadow-pink-200/40 hover:-translate-y-2 transition-all text-center group"
          >
            <div className="w-20 h-20 mx-auto mb-3 p-2 rounded-2xl bg-pink-50 flex items-center justify-center border-2 border-pink-200 group-hover:scale-105 transition-transform">
              <Rocket className="w-10 h-10 text-pink-500 animate-bounce" />
            </div>
            <h3 className="font-black text-lg text-pink-600 mb-1">3. Dream Routes</h3>
            <p className="text-xs font-medium opacity-75">Interactive rooftop flight paths.</p>
          </div>
        </section>

        {/* Origin Story Section */}
        <section className="w-full p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border-4 border-white shadow-lg shadow-pink-200/40 my-4 text-left">
          <h3 className="text-2xl font-black text-pink-600 mb-4 text-center">Pip's Bedtime Origin Story</h3>
          
          <div className={`p-6 rounded-2xl bg-gradient-to-r ${storyScenes[activeScene].bg} text-white shadow-inner flex flex-col sm:flex-row gap-6 items-center`}>
            <img src="/baby-assets/pip_portrait.png" alt="Pip Portrait" className="w-28 h-28 object-contain bg-white/20 p-2 rounded-2xl border-2 border-white/40" />
            <div className="flex-1 w-full">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-white/20 rounded-full">{storyScenes[activeScene].title}</span>
                <span className="text-xs font-mono">{activeScene + 1} / {storyScenes.length}</span>
              </div>
              <p className="text-sm leading-relaxed font-medium opacity-95 my-2">"{storyScenes[activeScene].text}"</p>
              <div className="flex justify-between items-center mt-4 pt-2 border-t border-white/20">
                <button disabled={activeScene === 0} onClick={() => setActiveScene(prev => prev - 1)} className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold disabled:opacity-30">← Prev</button>
                <button disabled={activeScene === storyScenes.length - 1} onClick={() => setActiveScene(prev => prev + 1)} className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold disabled:opacity-30">Next →</button>
              </div>
            </div>
          </div>
        </section>

        {/* Visitor Guestbook Section */}
        <section className="w-full p-6 rounded-3xl bg-white/90 backdrop-blur-md border-4 border-white shadow-lg shadow-pink-200/40 my-6 text-left">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-pink-500" />
            <h3 className="text-xl font-black text-pink-600">Nursery Visitor Guestbook (+2 pts)</h3>
          </div>

          <form onSubmit={handleGuestSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              placeholder="Your Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="p-3 rounded-2xl border-2 border-pink-200 text-xs font-medium focus:outline-none focus:border-pink-400"
            />
            <input
              type="text"
              placeholder="Leave a sweet note..."
              value={guestNote}
              onChange={(e) => setGuestNote(e.target.value)}
              className="p-3 rounded-2xl border-2 border-pink-200 text-xs font-medium flex-1 focus:outline-none focus:border-pink-400"
            />
            <button type="submit" className="px-5 py-3 bg-pink-500 text-white font-bold rounded-2xl shadow-md hover:bg-pink-600 flex items-center justify-center gap-2 text-xs">
              <Send className="w-3.5 h-3.5" /> Sign
            </button>
          </form>

          <div className="space-y-2 max-h-36 overflow-y-auto">
            {messages.map((m, idx) => (
              <div key={idx} className="p-3 bg-pink-50/60 rounded-2xl border border-pink-200/50 flex justify-between items-center text-xs">
                <span className="font-bold text-pink-600">{m.name}</span>
                <span className="opacity-80 italic">"{m.note}"</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Pop-Up Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-4 border-pink-300 p-6 max-w-md w-full shadow-2xl relative text-center">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-pink-400 font-bold text-xl">✕</button>

            {activeModal === 'lullaby' && (
              <div>
                <img src="/baby-assets/pip_lullaby_box.png" alt="Lullaby Box" className="w-24 h-24 mx-auto mb-2 object-contain" />
                <h3 className="text-xl font-black text-pink-600 mb-1">🎵 Lullaby Box</h3>
                <p className="text-xs opacity-80 mb-6">Tap the keys to create your cozy melody!</p>
                <div className="flex justify-center gap-2">
                  <button onClick={() => playPop(440)} className="px-4 py-2 bg-pink-400 text-white font-bold rounded-xl shadow-sm">Note A</button>
                  <button onClick={() => playPop(523.25)} className="px-4 py-2 bg-pink-500 text-white font-bold rounded-xl shadow-sm">Note C</button>
                  <button onClick={() => playPop(659.25)} className="px-4 py-2 bg-rose-400 text-white font-bold rounded-xl shadow-sm">Note E</button>
                </div>
              </div>
            )}

            {activeModal === 'nightlight' && (
              <div>
                <img src="/baby-assets/pip_dream_lantern.png" alt="Dream Lantern" className="w-24 h-24 mx-auto mb-2 object-contain" />
                <h3 className="text-xl font-black text-pink-600 mb-1">💡 Dream Lantern</h3>
                <p className="text-xs opacity-80 mb-6">Pip's lantern illuminates cozy dreams across the forest.</p>
                <div className="w-16 h-16 mx-auto bg-amber-200 rounded-full shadow-[0_0_40px_#fde047] flex items-center justify-center text-2xl">🌙</div>
              </div>
            )}

            {activeModal === 'routes' && (
              <div>
                <h3 className="text-xl font-black text-pink-600 mb-2">🚀 Starlight Flight Map</h3>
                <p className="text-xs opacity-80 mb-4">Pip's rooftop path for tonight's dream deliveries!</p>
                <div className="p-3 bg-pink-50 rounded-2xl border-2 border-dashed border-pink-300 font-mono text-xs text-pink-600 font-bold">
                  ✨ PATH ACTIVE: Cloud Nursery → Star Ridge
                </div>
              </div>
            )}

            <button onClick={() => setActiveModal(null)} className="mt-6 px-6 py-2 bg-pink-500 text-white font-bold rounded-full shadow-md text-xs">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}