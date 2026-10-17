'use client';

import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';

export default function Guestbook({ playPop }) {
  const [messages, setMessages] = useState([
    { name: "Luna Owl", note: "Loved the lullaby music box! ✨" },
    { name: "Tiny Cub", note: "Nightlights keep my cave cozy! 🌙" }
  ]);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !note) return;
    if (playPop) playPop(880);
    setMessages([{ name, note }, ...messages]);
    setName('');
    setNote('');
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 my-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border-4 border-purple-300 shadow-xl relative z-10">
      <div className="flex items-center justify-center gap-2 mb-4">
        <MessageSquare className="w-6 h-6 text-purple-600" />
        <h3 className="text-2xl font-black text-purple-600">Nursery Visitor Guestbook (+2 pts)</h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Your Cute Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 rounded-2xl border-2 border-purple-200 dark:bg-slate-800 text-sm font-medium focus:outline-none focus:border-purple-500"
        />
        <input
          type="text"
          placeholder="Leave a sweet note for Pip..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="p-3 rounded-2xl border-2 border-purple-200 dark:bg-slate-800 text-sm font-medium flex-1 focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-md hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm"
        >
          <Send className="w-4 h-4" /> Sign Wall
        </button>
      </form>

      <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
        {messages.map((m, idx) => (
          <div key={idx} className="p-3 bg-purple-50 dark:bg-slate-800 rounded-2xl border border-purple-200/50 flex justify-between items-center text-xs sm:text-sm">
            <span className="font-bold text-purple-600">{m.name}</span>
            <span className="opacity-80 italic">"{m.note}"</span>
          </div>
        ))}
      </div>
    </section>
  );
}