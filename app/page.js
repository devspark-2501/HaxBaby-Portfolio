'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, Heart, Sun, Moon, Volume2, VolumeX, 
  MessageCircle, Briefcase, Wand2, BookOpen, Send, X, Lamp, Music, Rocket, Blocks, Ruler
} from 'lucide-react';

export default function PipCleanSidebarOS() {
  const [isMuted, setIsMuted] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [lanternBrightness, setLanternBrightness] = useState(85);
  const [activeSidebarTab, setActiveSidebarTab] = useState(null); // 'chat' | 'inventions' | 'portfolio' | 'story'
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [visitorCount] = useState(1337);

  // Pre-configured Chat State (3 fixed option choices)
  const [chatHistory, setChatHistory] = useState([
    { sender: 'pip', text: "Yawn... Hi friend! I'm Pip! Tap one of the questions below to talk to me! 🌙" }
  ]);

  const avatarRef = useRef(null);

  // Web Audio API Synthesizer
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

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  // Pupil cursor tracking
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
      particleCount: 100,
      spread: 80,
      origin: { y: 0.35 },
      colors: ['#a34063', '#fbcfe8', '#fef08a', '#93c5fd', '#a7f3d0']
    });
  };

  // Handle Fixed Chat Questions
  const handleAskPip = (questionType) => {
    playPop(659.25);
    let userText = "";
    let pipReply = "";

    if (questionType === 'who') {
      userText = "Who is Pip?";
      pipReply = "Name: Pip | Species: Cute Skull Baby. I have a smooth, round skull face, huge soft eye sockets with cozy glowing pinpricks of light, a tiny crooked smile, and a starry nightcap with a pink bow! Personality: Curious, sleepy, clumsy, easily delighted. I giggle at everything and hate silence! 🎀";
    } else if (questionType === 'what') {
      userText = "What does Pip do?";
      pipReply = "Profession: Junior Dream Engineer at Midnight Nursery! I design the dreams, lullabies, nightlights, and bedtime stories that help the neighborhood's little ghosts and creatures fall asleep peacefully! 🌙";
    } else if (questionType === 'tagline') {
      userText = "What is Pip's tagline?";
      pipReply = "✨ \"I build the dreams you fall asleep inside.\" ✨";
    }

    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: userText },
      { sender: 'pip', text: pipReply }
    ]);
    playPop(880);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-700 font-sans relative overflow-x-hidden ${
        isNightMode ? 'bg-[#1c121e] text-[#fff8f1]' : 'bg-[#fff8f1] text-[#5c4033]'
      }`}
    >
      {/* Top Header */}
      <header className="p-6 max-w-5xl mx-auto flex justify-between items-center relative z-20 border-b border-[#a34063]/15">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#a34063] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            ✨
          </div>
          <div>
            <h1 className="font-serif font-black text-2xl tracking-tight text-[#a34063]">
              Pip's Nursery
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a34063]/70">haX.baby Official Portfolio</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 rounded-2xl bg-white/80 shadow-sm border border-[#a34063]/20 hover:scale-105 active:scale-95 transition-all text-[#a34063]"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-gray-400" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button
            onClick={() => {
              setIsNightMode(!isNightMode);
              playPop(659.25);
            }}
            className="p-3 rounded-2xl bg-white/80 shadow-sm border border-[#a34063]/20 hover:scale-105 active:scale-95 transition-all text-[#a34063]"
            title="Toggle Night Shift"
          >
            {isNightMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-[#a34063]" />}
          </button>
        </div>
      </header>

      {/* FIXED FLOATING CYLINDER SIDEBAR */}
      <aside className="fixed left-4 top-1/2 -translate-y-1/2 z-40 bg-white/90 backdrop-blur-md border-2 border-[#a34063]/30 shadow-xl rounded-full p-2 flex flex-col gap-4 items-center">
        {/* Chat Option */}
        <button
          onClick={() => { playPop(523.25); setActiveSidebarTab('chat'); }}
          className={`p-3 rounded-full transition-all ${
            activeSidebarTab === 'chat' ? 'bg-[#a34063] text-white scale-110' : 'text-[#a34063] hover:bg-[#a34063]/10'
          }`}
          title="Chat with Pip"
        >
          <MessageCircle className="w-5 h-5" />
        </button>

        {/* Inventions Option */}
        <button
          onClick={() => { playPop(659.25); setActiveSidebarTab('inventions'); }}
          className={`p-3 rounded-full transition-all ${
            activeSidebarTab === 'inventions' ? 'bg-[#a34063] text-white scale-110' : 'text-[#a34063] hover:bg-[#a34063]/10'
          }`}
          title="Pip's Inventions"
        >
          <Wand2 className="w-5 h-5" />
        </button>

        {/* Portfolio Option */}
        <button
          onClick={() => { playPop(783.99); setActiveSidebarTab('portfolio'); }}
          className={`p-3 rounded-full transition-all ${
            activeSidebarTab === 'portfolio' ? 'bg-[#a34063] text-white scale-110' : 'text-[#a34063] hover:bg-[#a34063]/10'
          }`}
          title="Pip's Portfolio Works"
        >
          <Briefcase className="w-5 h-5" />
        </button>

        {/* Origin Story Option */}
        <button
          onClick={() => { playPop(880); setActiveSidebarTab('story'); }}
          className={`p-3 rounded-full transition-all ${
            activeSidebarTab === 'story' ? 'bg-[#a34063] text-white scale-110' : 'text-[#a34063] hover:bg-[#a34063]/10'
          }`}
          title="Pip's Origin & World"
        >
          <BookOpen className="w-5 h-5" />
        </button>
      </aside>

      {/* CLEAN MAIN STAGE */}
      <main className="max-w-3xl mx-auto px-4 py-12 flex flex-col items-center text-center relative z-10">
        
        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#a34063]/10 border border-[#a34063]/30 text-[#a34063] font-bold text-xs shadow-xs">
          <Sparkles className="w-4 h-4" /> "I build the dreams you fall asleep inside."
        </div>

        {/* Hero Character Stage */}
        <div
          ref={avatarRef}
          className="relative w-64 h-64 sm:w-72 sm:h-72 my-6 rounded-full p-4 bg-white border-4 border-[#a34063] shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
        >
          {/* Easter Egg Ribbon */}
          <button
            onClick={triggerEasterEgg}
            className="absolute -top-3 bg-[#a34063] text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-md border-2 border-white hover:scale-110 active:scale-90 transition-all cursor-pointer z-20"
          >
            🎀 Tap Pip's Ribbon!
          </button>

          <img
            src="/baby-assets/pip_avatar_cloud.png"
            alt="Pip Avatar"
            className="w-full h-full object-contain rounded-full"
          />

          <div className="absolute top-[38%] flex gap-10 justify-center pointer-events-none">
            <div className="w-3 h-3 bg-amber-300 rounded-full shadow-[0_0_8px_#fde047]" style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }} />
            <div className="w-3 h-3 bg-amber-300 rounded-full shadow-[0_0_8px_#fde047]" style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }} />
          </div>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl font-black tracking-tight mb-2 text-[#a34063]">
          Pip The Skull Baby
        </h2>

        <p className="inline-block bg-[#a34063]/10 border border-[#a34063]/20 font-bold text-[#a34063] px-4 py-1.5 rounded-full text-xs sm:text-sm mb-6">
          🌙 Junior Dream Engineer @ Midnight Nursery
        </p>

        <p className="max-w-md text-sm sm:text-base font-medium opacity-90 leading-relaxed mb-8">
          Welcome to Pip's cozy space! Tap the icons in the sidebar to chat with Pip, view inventions, open the portfolio, or discover Pip's origin story!
        </p>

        <div className="p-3 rounded-2xl bg-white border border-[#a34063]/20 shadow-xs inline-flex items-center gap-3">
          <Heart className="w-5 h-5 text-[#a34063] fill-[#a34063] animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-[#a34063]">Dream Travelers:</span>
          <div className="font-mono text-base font-black bg-[#1c121e] text-pink-300 px-3 py-1 rounded-xl border border-[#a34063]">
            {String(visitorCount).padStart(6, '0')}
          </div>
        </div>
      </main>

      {/* POP-UP PANELS FOR SIDEBAR SELECTIONS */}
      {activeSidebarTab && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#fff8f1] rounded-3xl border-4 border-[#a34063] p-6 max-w-lg w-full shadow-2xl relative text-left max-h-[85vh] overflow-y-auto">
            
            <button 
              onClick={() => setActiveSidebarTab(null)}
              className="absolute top-4 right-4 text-[#a34063] font-bold p-1 rounded-full hover:bg-[#a34063]/10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* TAB 1: FIXED CHAT PANEL */}
            {activeSidebarTab === 'chat' && (
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#a34063] mb-3 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6" /> Chat With Pip
                </h3>

                <div className="space-y-2 max-h-52 overflow-y-auto mb-4 p-3 bg-white rounded-2xl border border-[#a34063]/20">
                  {chatHistory.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`text-xs p-3 rounded-xl max-w-[88%] ${
                        msg.sender === 'pip' ? 'bg-[#a34063] text-white self-start' : 'bg-[#fff8f1] border border-[#a34063]/30 ml-auto text-[#5c4033]'
                      }`}
                    >
                      <span className="font-bold opacity-80">{msg.sender === 'pip' ? 'Pip: ' : 'You: '}</span>
                      {msg.text}
                    </div>
                  ))}
                </div>

                {/* 3 PRE-SET FIXED QUESTION BUTTONS (No manual typing) */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-[#a34063]">Select a question to ask Pip:</p>
                  <button 
                    onClick={() => handleAskPip('who')} 
                    className="w-full text-left p-2.5 bg-white border border-[#a34063]/30 rounded-xl text-xs font-bold text-[#a34063] hover:bg-[#a34063]/10 transition-colors"
                  >
                    1. Who is Pip? (Look, species, quirks)
                  </button>
                  <button 
                    onClick={() => handleAskPip('what')} 
                    className="w-full text-left p-2.5 bg-white border border-[#a34063]/30 rounded-xl text-xs font-bold text-[#a34063] hover:bg-[#a34063]/10 transition-colors"
                  >
                    2. What does Pip do? (Profession & Craft)
                  </button>
                  <button 
                    onClick={() => handleAskPip('tagline')} 
                    className="w-full text-left p-2.5 bg-white border border-[#a34063]/30 rounded-xl text-xs font-bold text-[#a34063] hover:bg-[#a34063]/10 transition-colors"
                  >
                    3. What is Pip's tagline?
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: INVENTIONS */}
            {activeSidebarTab === 'inventions' && (
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#a34063] mb-3 flex items-center gap-2">
                  <Wand2 className="w-6 h-6" /> Pip's Inventions
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-2xl border border-[#a34063]/20 flex items-center gap-3">
                    <Music className="w-8 h-8 text-[#a34063]" />
                    <div>
                      <h4 className="font-bold text-sm text-[#a34063]">Lullaby Music Box</h4>
                      <p className="text-xs opacity-80">Generates soothing pentatonic melody chimes.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-[#a34063]/20 flex items-center gap-3">
                    <Lamp className="w-8 h-8 text-[#a34063]" />
                    <div>
                      <h4 className="font-bold text-sm text-[#a34063]">Dream Lantern</h4>
                      <p className="text-xs opacity-80">Dimmable warm glow to banish room shadows.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PIP'S PORTFOLIO WORKS (6 CANON PROJECTS) */}
            {activeSidebarTab === 'portfolio' && (
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#a34063] mb-3 flex items-center gap-2">
                  <Briefcase className="w-6 h-6" /> Pip's Portfolio
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-2xl border border-[#a34063]/20">
                    <h4 className="font-bold text-[#a34063]">1. The Lullaby Lab</h4>
                    <p className="opacity-80">Music box playing generative soothing lullabies.</p>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-[#a34063]/20">
                    <h4 className="font-bold text-[#a34063]">2. Nightlight Collection</h4>
                    <p className="opacity-80">Gallery of dimmable bedside lamps and lanterns.</p>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-[#a34063]/20">
                    <h4 className="font-bold text-[#a34063]">3. Dream Delivery Routes</h4>
                    <p className="opacity-80">Rooftop flight maps for starlight delivery.</p>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-[#a34063]/20">
                    <h4 className="font-bold text-[#a34063]">4. Rattle & Block Toys</h4>
                    <p className="opacity-80">Clickable toys Pip created for nursery creatures.</p>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-[#a34063]/20">
                    <h4 className="font-bold text-[#a34063]">5. Bedtime Storybook</h4>
                    <p className="opacity-80">Illustrated bedtime stories written by Pip.</p>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-[#a34063]/20">
                    <h4 className="font-bold text-[#a34063]">6. Pip's Growth Chart</h4>
                    <p className="opacity-80">Skills tracked on a nursery wall height chart.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: ORIGIN STORY & WORLD */}
            {activeSidebarTab === 'story' && (
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#a34063] mb-3 flex items-center gap-2">
                  <BookOpen className="w-6 h-6" /> Pip's Origin & World
                </h3>
                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3 bg-white rounded-2xl border border-[#a34063]/20">
                    <h4 className="font-bold text-[#a34063]">Origin Story</h4>
                    <p className="opacity-80">Born in the Midnight Nursery under starlight, Pip discovered glowing eyes that turn darkness into comforting warm lamps!</p>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-[#a34063]/20">
                    <h4 className="font-bold text-[#a34063]">World & Supporting Creatures</h4>
                    <p className="opacity-80">The Midnight Nursery neighborhood is home to sleepy owls, forest cubs, and little friendly ghosts who look forward to Pip's nightly dream drops!</p>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-[#a34063]/20">
                    <h4 className="font-bold text-[#a34063]">Visual Art Style</h4>
                    <p className="opacity-80">A whimsical mix of editorial serif typography, warm cream tones (#fff8f1), berry accents (#a34063), retro early-web soul, and cozy soft pastel art!</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}