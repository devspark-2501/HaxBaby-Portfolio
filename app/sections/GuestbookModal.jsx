'use client';

import React, { useState, useEffect } from 'react';
import { HeartHandshake, Send, X } from 'lucide-react';

export default function GuestbookModal({ onClose, playPop }) {
  const [messages, setMessages] = useState([]);
  const [guestName, setGuestName] = useState('');
  const [guestNote, setGuestNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchGuestbook();
  }, []);

  const fetchGuestbook = async () => {
    try {
      const res = await fetch('/api/guestbook');
      const json = await res.json();
      if (json.success) setMessages(json.data);
    } catch (err) {
      console.log('Guestbook fetch error:', err);
    }
  };

  const handleGuestSubmit = async (e) => {
    e.preventDefault();
    if (!guestName || !guestNote || isSubmitting) return;

    setIsSubmitting(true);
    if (playPop) playPop(880);

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
      console.log('Guestbook error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#fff8f1] rounded-3xl border-4 border-[#a34063] p-6 max-w-lg w-full shadow-2xl relative text-left max-h-[85vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#a34063] font-bold p-1 rounded-full hover:bg-[#a34063]/10">
          <X className="w-6 h-6" />
        </button>

        <h3 className="font-serif text-2xl font-bold text-[#a34063] mb-4 flex items-center gap-2">
          <HeartHandshake className="w-6 h-6" /> Leave a Note for Pip
        </h3>

        <form onSubmit={handleGuestSubmit} className="flex flex-col gap-3 mb-4">
          <input
            type="text"
            placeholder="Your Name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="p-3 rounded-xl border border-[#a34063]/30 text-xs font-medium focus:outline-none focus:border-[#a34063]"
          />
          <textarea
            rows="2"
            placeholder="Write a sweet message to Pip..."
            value={guestNote}
            onChange={(e) => setGuestNote(e.target.value)}
            className="p-3 rounded-xl border border-[#a34063]/30 text-xs font-medium focus:outline-none focus:border-[#a34063]"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-3 bg-[#a34063] text-white font-bold rounded-xl shadow-xs hover:bg-[#8b3252] flex items-center justify-center gap-2 text-xs disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" /> {isSubmitting ? "Sending..." : "Send Note to Pip"}
          </button>
        </form>

        <div className="space-y-2 max-h-40 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-xs opacity-60 italic">No notes signed yet. Be the first to leave a note for Pip!</p>
          ) : (
            messages.map((m, idx) => (
              <div key={idx} className="p-3 bg-white rounded-xl border border-[#a34063]/20 flex justify-between items-center text-xs">
                <span className="font-bold text-[#a34063]">{m.name}</span>
                <span className="opacity-80 italic">"{m.note}"</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}