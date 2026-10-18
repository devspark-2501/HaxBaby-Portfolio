'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Sun, Moon, Volume2, VolumeX, Lamp, Rocket, Send, MessageSquare, User, Wrench, BookOpen, Bot, Sparkle } from 'lucide-react';

export default function UltimatePipPortfolio() {
  const [isMuted, setIsMuted] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [lanternBrightness, setLanternBrightness] = useState(85);
  const [activeModal, setActiveModal] = useState(null);
  const [activeScene, setActiveScene] = useState(0);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

  // Tier 3: Returning Visitor Memory (LocalStorage)
  const [visitorName, setVisitorName] = useState('');
  const [isReturningVisitor, setIsReturningVisitor] = useState(false);

  // Tier 3: Rule-Based Pip AI Chat Bot State
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'pip', text: "Yawn... Hi friend! I'm Pip! Ask me about my dreams, nightlights, or lullabies! 🌙" }
  ]);

  // MongoDB Live Guestbook State
  const [messages, setMessages] = useState([]);
  const [guestName, setGuestName] = useState('');
  const [guestNote, setGuestNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const avatarRef = useRef(null);

  // Check returning visitor memory on load
  useEffect(() => {
    const savedName = localStorage.getItem('pip_visitor_name');
    if (savedName) {
      setVisitorName(savedName);
      setIsReturningVisitor(true);
    }
    fetchGuestbook();
  }, []);

  const saveVisitorName = (name) => {
    localStorage.setItem('pip_visitor_name', name);
    setVisitorName(name);
    setIsReturningVisitor(true);
  };

  const fetchGuestbook = async () => {
    try {
      const res = await fetch('/api/guestbook');
      const json = await res.json();
      if (json.success) setMessages(json.data);
    } catch (err) {
      console.log('Guestbook error:', err);
    }
  };

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
      console.log(e);
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

  // Easter Egg Trigger
  const triggerEasterEgg = () => {
    playPop(880);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.35 },
      colors: ['#a34063', '#fbcfe8', '#fef08a', '#93c5fd', '#a7f3d0']
    });
  };

  // Pip Chat Dialogue Logic
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatHistory((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    playPop(659.25);

    setTimeout(() => {
      let pipReply = "I love quiet night skies and gentle melodies! 🌟";
      const query = userMsg.toLowerCase();

      if (query.includes('hello') || query.includes('hi')) {
        pipReply = `Welcome back ${visitorName || 'friend'}! Ready to build cozy dreams together? 🎀`;
      } else if (query.includes('lullaby') || query.includes('music')) {
        pipReply = "My Lullaby Box uses soft wooden chimes to tune pentatonic sleep scales! 🎵";
      } else if (query.includes('lantern') || query.includes('light')) {
        pipReply = "My bedside lanterns use warm amber filaments so night monsters run away! 💡";
      } else if (query.includes('who') || query.includes('pip')) {
        pipReply = "I'm Pip! Junior Dream Engineer at Midnight Nursery! 🌙";
      }

      setChatHistory((prev) => [...prev, { sender: 'pip', text: pipReply }]);
      playPop(880);
    }, 600);
  };

  // MongoDB Guestbook Submit
  const handleGuestSubmit = async (e) => {
    e.preventDefault();
    if (!guestName || !guestNote || isSubmitting) return;

    setIsSubmitting(true);
    playPop(880);
    saveVisitorName(guestName);

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: guestName, note: guestNote }),
      });

      const json = await res.json();
      if (json.success) {
        setGuestName('');
        setGuestNote('');
        fetchGuestbook();
      }
    } catch (err) {
      console.log('Error submitting signature:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Bedtime Story Scenes
  const storyScenes = [
    {
      title: "Scene 1: Born in Midnight Nursery",
      text: "Deep inside the cozy Midnight Nursery, Pip was born under a starry sky. Wearing a starry nightcap tied with a pink bow, Pip discovered glowing amber eyes that turn scary dark shadows into warm nightlights.",
      bg: "from-[#a34063] to-[#5c4033]"
    },
    {
      title: "Scene 2: Crafting the First Lullaby",
      text: "When forest creatures couldn't sleep, Pip constructed the first Lullaby Music Box from wooden blocks and starlight chime strings. Every gentle crank lulled sleeping bear cubs into sweet dreams.",
      bg: "from-[#8b3252] to-[#4a2a38]"
    },
    {
      title: "Scene 3: Junior Dream Engineer",
      text: "Today, Pip works officially as Junior Dream Engineer! Mapping starry flight routes every night, Pip delivers custom dreams and cozy lanterns to nurseries everywhere. Good things start small!",
      bg: "from-[#a34063] to-[#8b3252]"
    }
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-700 font-sans relative overflow-x-hidden ${
        isNightMode ? 'bg-[#1c121e] text-[#fff8f1]' : 'bg-[#fff8f1] text-[#5c4033]'
      }`}
    >
      {/* Top Navbar */}
      <header className="p-6 max-w-5xl mx-auto flex justify-between items-center relative z-20 border-b border-[#a34063]/15">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#a34063] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            ✨
          </div>
          <div>
            <h1 className="font-serif font-black text-2xl tracking-tight text-[#a34063]">
              Pip's Nursery
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a34063]/70">haX.baby Track 1</span>
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col items-center text-center relative z-10">
        
        {/* Tier 3: Returning Visitor Memory Greeting */}
        {isReturningVisitor && (
          <div className="mb-3 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs shadow-xs animate-pulse">
            ✨ Welcome back, {visitorName}! Pip remembered your visit!
          </div>
        )}

        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#a34063]/10 border border-[#a34063]/30 text-[#a34063] font-bold text-xs shadow-xs">
          <Sparkles className="w-4 h-4" /> Good things start small.
        </div>

        {/* Hero Character Stage */}
        <div
          ref={avatarRef}
          className="relative w-60 h-60 sm:w-68 sm:h-68 my-4 rounded-full p-4 bg-white border-4 border-[#a34063] shadow-xl flex items-center justify-center hover:scale-105 transition-transform animate-bounce-slow"
        >
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

        <p className="inline-block bg-[#a34063]/10 border border-[#a34063]/20 font-bold text-[#a34063] px-4 py-1.5 rounded-full text-xs sm:text-sm mb-4">
          🌙 Junior Dream Engineer @ Midnight Nursery
        </p>

        <p className="max-w-lg text-sm sm:text-base font-medium opacity-90 leading-relaxed mb-6">
          A gentle, sleepy creature with a smooth round skull face, soft eye sockets with glowing warm amber pinpricks, and a bedtime nightcap with stars and a pink bow.
        </p>

        {/* Tier 3 Feature: Live Character AI Chat Bot */}
        <section className="w-full p-6 rounded-3xl bg-white border-2 border-[#a34063]/20 shadow-xs mb-10 text-left">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-5 h-5 text-[#a34063]" />
            <h3 className="font-serif text-xl font-bold text-[#a34063]">Chat With Pip (Tier 3 Boss Feature)</h3>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto mb-3 p-3 bg-[#fff8f1] rounded-2xl border border-[#a34063]/20">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`text-xs p-2 rounded-xl max-w-[85%] ${msg.sender === 'pip' ? 'bg-[#a34063] text-white self-start' : 'bg-white border border-[#a34063]/30 ml-auto'}`}>
                <span className="font-bold opacity-75">{msg.sender === 'pip' ? 'Pip: ' : 'You: '}</span>
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleChatSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask Pip about dreams, nightlights, or lullabies..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="p-2.5 rounded-xl border border-[#a34063]/30 text-xs font-medium flex-1 focus:outline-none focus:border-[#a34063]"
            />
            <button type="submit" className="px-4 py-2.5 bg-[#a34063] text-white font-bold rounded-xl text-xs hover:bg-[#8b3252]">
              Send
            </button>
          </form>
        </section>

        {/* Showcase Toys */}
        <section className="w-full text-left mb-10">
          <div className="mb-4 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a34063]">Section 02</span>
            <h3 className="font-serif text-3xl font-bold text-[#a34063] mt-1">Pip's Inventions & Crafts</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div
              onClick={() => { playPop(523.25); setActiveModal('lullaby'); }}
              className="cursor-pointer bg-white p-5 rounded-2xl border-2 border-[#a34063]/20 shadow-xs hover:-translate-y-1 transition-all text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-3 p-2 rounded-2xl bg-[#fff8f1] flex items-center justify-center border border-[#a34063]/20 group-hover:scale-105 transition-transform">
                <img src="/baby-assets/pip_lullaby_box.png" alt="Lullaby Box" className="w-full h-full object-contain" />
              </div>
              <h4 className="font-bold text-base text-[#a34063] mb-1">1. Lullaby Lab</h4>
              <p className="text-xs opacity-75">Generative music box with soothing synth chimes.</p>
            </div>

            <div
              onClick={() => { playPop(659.25); setActiveModal('nightlight'); }}
              className="cursor-pointer bg-white p-5 rounded-2xl border-2 border-[#a34063]/20 shadow-xs hover:-translate-y-1 transition-all text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-3 p-2 rounded-2xl bg-[#fff8f1] flex items-center justify-center border border-[#a34063]/20 group-hover:scale-105 transition-transform">
                <img src="/baby-assets/pip_dream_lantern.png" alt="Dream Lantern" className="w-full h-full object-contain" />
              </div>
              <h4 className="font-bold text-base text-[#a34063] mb-1">2. Nightlight Collection</h4>
              <p className="text-xs opacity-75">Dimmable lamps & bedside lanterns.</p>
            </div>

            <div
              onClick={() => { playPop(783.99); setActiveModal('routes'); }}
              className="cursor-pointer bg-white p-5 rounded-2xl border-2 border-[#a34063]/20 shadow-xs hover:-translate-y-1 transition-all text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-3 p-2 rounded-2xl bg-[#fff8f1] flex items-center justify-center border border-[#a34063]/20 group-hover:scale-105 transition-transform">
                <Rocket className="w-10 h-10 text-[#a34063] animate-bounce" />
              </div>
              <h4 className="font-bold text-base text-[#a34063] mb-1">3. Dream Delivery Routes</h4>
              <p className="text-xs opacity-75">Rooftop flight maps for starlight delivery.</p>
            </div>
          </div>
        </section>

        {/* Origin Story Section */}
        <section className="w-full p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#a34063]/20 shadow-xs my-4 text-left">
          <h3 className="font-serif text-2xl font-bold text-[#a34063] mb-4 text-center">Pip's Bedtime Origin Story</h3>
          
          <div className={`p-6 rounded-2xl bg-gradient-to-r ${storyScenes[activeScene].bg} text-white shadow-inner flex flex-col sm:flex-row gap-6 items-center`}>
            <img src="/baby-assets/pip_portrait.png" alt="Pip Portrait" className="w-28 h-28 object-contain bg-white/20 p-2 rounded-2xl border border-white/40" />
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

        {/* Live MongoDB Guestbook */}
        <section className="w-full p-6 rounded-3xl bg-white border-2 border-[#a34063]/20 shadow-xs my-6 text-left">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-[#a34063]" />
            <h3 className="font-serif text-xl font-bold text-[#a34063]">Live MongoDB Visitor Guestbook (+2 pts)</h3>
          </div>

          <form onSubmit={handleGuestSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              placeholder="Your Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="p-3 rounded-xl border border-[#a34063]/30 text-xs font-medium focus:outline-none focus:border-[#a34063]"
            />
            <input
              type="text"
              placeholder="Leave a sweet note for Pip..."
              value={guestNote}
              onChange={(e) => setGuestNote(e.target.value)}
              className="p-3 rounded-xl border border-[#a34063]/30 text-xs font-medium flex-1 focus:outline-none focus:border-[#a34063]"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-3 bg-[#a34063] text-white font-bold rounded-xl shadow-xs hover:bg-[#8b3252] flex items-center justify-center gap-2 text-xs disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" /> {isSubmitting ? "Saving..." : "Sign Wall"}
            </button>
          </form>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-xs opacity-60 italic">No notes signed yet. Be the first to leave a message!</p>
            ) : (
              messages.map((m, idx) => (
                <div key={idx} className="p-3 bg-[#fff8f1] rounded-xl border border-[#a34063]/20 flex justify-between items-center text-xs">
                  <span className="font-bold text-[#a34063]">{m.name}</span>
                  <span className="opacity-80 italic">"{m.note}"</span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Pop-Up Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#fff8f1] rounded-3xl border-4 border-[#a34063] p-6 max-w-md w-full shadow-2xl relative text-center">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-[#a34063] font-bold text-xl">✕</button>

            {activeModal === 'lullaby' && (
              <div>
                <img src="/baby-assets/pip_lullaby_box.png" alt="Lullaby Box" className="w-24 h-24 mx-auto mb-2 object-contain" />
                <h3 className="font-serif text-xl font-bold text-[#a34063] mb-1">🎵 Lullaby Synthesizer</h3>
                <p className="text-xs opacity-80 mb-6">Tap keys to compose a soothing lullaby note!</p>
                <div className="flex justify-center gap-2">
                  <button onClick={() => playPop(440)} className="px-4 py-2 bg-[#a34063] text-white font-bold rounded-xl shadow-xs">Note A</button>
                  <button onClick={() => playPop(523.25)} className="px-4 py-2 bg-[#8b3252] text-white font-bold rounded-xl shadow-xs">Note C</button>
                  <button onClick={() => playPop(659.25)} className="px-4 py-2 bg-[#5c4033] text-white font-bold rounded-xl shadow-xs">Note E</button>
                </div>
              </div>
            )}

            {activeModal === 'nightlight' && (
              <div>
                <img src="/baby-assets/pip_dream_lantern.png" alt="Dream Lantern" className="w-24 h-24 mx-auto mb-2 object-contain" />
                <h3 className="font-serif text-xl font-bold text-[#a34063] mb-1">💡 Dimmable Dream Lantern</h3>
                <p className="text-xs opacity-80 mb-4">Adjust the slider to control the bedside glow!</p>
                
                <div 
                  className="w-20 h-20 mx-auto rounded-full transition-all duration-300 flex items-center justify-center text-2xl mb-4"
                  style={{
                    backgroundColor: '#fde047',
                    boxShadow: `0 0 ${lanternBrightness / 1.5}px #fde047`,
                    opacity: lanternBrightness / 100
                  }}
                >
                  🌙
                </div>

                <div className="flex items-center gap-3 px-4">
                  <span className="text-xs font-bold">Dim</span>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={lanternBrightness} 
                    onChange={(e) => setLanternBrightness(Number(e.target.value))}
                    className="w-full accent-[#a34063]"
                  />
                  <span className="text-xs font-bold">Bright</span>
                </div>
              </div>
            )}

            {activeModal === 'routes' && (
              <div>
                <h3 className="font-serif text-xl font-bold text-[#a34063] mb-2">🚀 Starlight Flight Map</h3>
                <p className="text-xs opacity-80 mb-4">Pip's rooftop path for tonight's dream deliveries!</p>
                <div className="p-3 bg-white rounded-2xl border-2 border-dashed border-[#a34063]/40 font-mono text-xs text-[#a34063] font-bold">
                  ✨ PATH ACTIVE: Cloud Nursery → Star Ridge
                </div>
              </div>
            )}

            <button onClick={() => setActiveModal(null)} className="mt-6 px-6 py-2 bg-[#a34063] text-white font-bold rounded-full shadow-md text-xs">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}