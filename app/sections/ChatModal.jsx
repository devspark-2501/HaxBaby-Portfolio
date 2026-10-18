'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function ChatModal({ onClose, playPop }) {
  const [chatHistory, setChatHistory] = useState([
    { sender: 'pip', text: "Yawn... Hi friend! I'm Pip! Tap one of the questions below to talk to me! 🌙" }
  ]);

  const handleAskPip = (questionType) => {
    if (playPop) playPop(659.25);
    let userText = "";
    let pipReply = "";

    if (questionType === 'who') {
      userText = "Who is Pip?";
      pipReply = "Name: Pip | Species: A cute baby with a smooth, round skull face, huge soft eye sockets with cozy glowing pinpricks of light, a tiny crooked smile, and a bedtime nightcap with stars and a little pink bow. Cute and friendly, never scary, creepy, or gory! Personality: Curious, sleepy, a little clumsy, easily delighted. Giggles at everything and hates silence! 🎀";
    } else if (questionType === 'what') {
      userText = "What does Pip do?";
      pipReply = "Profession: Junior Dream Engineer at Midnight Nursery! I design the dreams, lullabies, nightlights, and bedtime stories that help the neighborhood's little ghosts and creatures fall asleep peaceful and cozy! 🌙";
    } else if (questionType === 'tagline') {
      userText = "What is Pip's tagline?";
      pipReply = "✨ “I build the dreams you fall asleep inside.” ✨";
    }

    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: userText },
      { sender: 'pip', text: pipReply }
    ]);
    if (playPop) playPop(880);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#fff8f1] rounded-3xl border-4 border-[#a34063] p-6 max-w-lg w-full shadow-2xl relative text-left max-h-[85vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#a34063] font-bold p-1 rounded-full hover:bg-[#a34063]/10">
          <X className="w-6 h-6" />
        </button>

        <h3 className="font-serif text-2xl font-bold text-[#a34063] mb-3 flex items-center gap-2">
          <MessageCircle className="w-6 h-6" /> Chat With Pip
        </h3>

        <div className="space-y-2 max-h-56 overflow-y-auto mb-4 p-3 bg-white rounded-2xl border border-[#a34063]/20 shadow-inner">
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

        {/* Fixed 3 Option Choices */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-[#a34063]">Tap an option to ask Pip:</p>
          <button
            onClick={() => handleAskPip('who')}
            className="w-full text-left p-3 bg-white border border-[#a34063]/30 rounded-xl text-xs font-bold text-[#a34063] hover:bg-[#a34063]/10 transition-colors shadow-xs"
          >
            1. Who is Pip? (Look, species, personality)
          </button>
          <button
            onClick={() => handleAskPip('what')}
            className="w-full text-left p-3 bg-white border border-[#a34063]/30 rounded-xl text-xs font-bold text-[#a34063] hover:bg-[#a34063]/10 transition-colors shadow-xs"
          >
            2. What does Pip do? (Profession & craft)
          </button>
          <button
            onClick={() => handleAskPip('tagline')}
            className="w-full text-left p-3 bg-white border border-[#a34063]/30 rounded-xl text-xs font-bold text-[#a34063] hover:bg-[#a34063]/10 transition-colors shadow-xs"
          >
            3. What is Pip's tagline?
          </button>
        </div>
      </div>
    </div>
  );
}