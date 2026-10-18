'use client';

import React, { useState, useEffect } from 'react';
import { HeartHandshake, Send, X, Cloud } from 'lucide-react';

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
    <div className="fixed top-0 right-0 h-screen w-full sm:w-[85vw] md:w-[70vw] lg:w-[55vw] pl-6 pb-6 pt-4 pr-0 z-50 pointer-events-none flex justify-end">
      <div className="bg-[#fff8f1] h-full w-full rounded-l-3xl border-l-4 border-y-4 border-[#a34063] p-8 shadow-2xl relative text-left overflow-y-auto pointer-events-auto">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#a34063]/20 mb-6">
          <div className="flex items-center gap-2">
            <Cloud className="w-6 h-6 text-[#a34063] fill-[#a34063]/20" />
            <h3 className="font-serif text-2xl font-bold text-[#a34063]">
              Leave a Note for Pip
            </h3>
          </div>
          <button onClick={onClose} className="text-[#a34063] font-bold p-1 rounded-full hover:bg-[#a34063]/10">
            <X className="w-7 h-7" />
          </button>
        </div>

        <form onSubmit={handleGuestSubmit} className="flex flex-col gap-3 mb-6">
          <input
            type="text"
            placeholder="Your Name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="p-3.5 rounded-xl border border-[#a34063]/30 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#a34063]"
          />
          <textarea
            rows="3"
            placeholder="Write a sweet message to Pip..."
            value={guestNote}
            onChange={(e) => setGuestNote(e.target.value)}
            className="p-3.5 rounded-xl border border-[#a34063]/30 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#a34063]"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#a34063] text-white font-bold rounded-xl shadow-xs hover:bg-[#8b3252] flex items-center justify-center gap-2 text-xs sm:text-sm disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> {isSubmitting ? "Sending..." : "Send Note to Pip"}
          </button>
        </form>

        <div className="space-y-2.5 max-h-[40vh] overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-xs opacity-60 italic">No notes signed yet. Be the first to leave a note for Pip!</p>
          ) : (
            messages.map((m, idx) => (
              <div key={idx} className="p-3.5 bg-white rounded-xl border border-[#a34063]/20 flex justify-between items-center text-xs sm:text-sm">
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