'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Cloud } from 'lucide-react';

export default function ChatModal({ onClose, playPop }) {
  const [chatHistory, setChatHistory] = useState([
    { sender: 'pip', text: "Yawn... Hi friend! I'm Pip! Tap one of the options below to chat with me! 🌙" }
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
      pipReply = "Profession: Junior Dream Engineer at Midnight Nursery! I design the dreams, lullabies, nightlights, and bedtime stories that help the neighborhood's little ghosts and creatures fall asleep peacefully! 🌙";
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
    <div className="fixed top-0 right-0 h-screen w-full sm:w-[85vw] md:w-[70vw] lg:w-[55vw] pl-6 pb-6 pt-4 pr-0 z-50 pointer-events-none flex justify-end">
      <div className="bg-[#fff8f1] h-full w-full rounded-l-3xl border-l-4 border-y-4 border-[#a34063] p-8 shadow-2xl relative text-left overflow-y-auto pointer-events-auto flex flex-col justify-between">
        
        <div>
          {/* Header with Cloud Motif */}
          <div className="flex items-center justify-between pb-4 border-b border-[#a34063]/20 mb-6">
            <div className="flex items-center gap-2">
              <Cloud className="w-6 h-6 text-[#a34063] fill-[#a34063]/20" />
              <h3 className="font-serif text-2xl font-bold text-[#a34063]">
                Chat With Pip
              </h3>
            </div>
            <button onClick={onClose} className="text-[#a34063] font-bold p-1 rounded-full hover:bg-[#a34063]/10">
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="space-y-3 max-h-[50vh] overflow-y-auto mb-6 p-4 bg-white rounded-2xl border border-[#a34063]/20 shadow-inner">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`text-xs sm:text-sm p-3.5 rounded-xl max-w-[90%] leading-relaxed ${
                  msg.sender === 'pip' ? 'bg-[#a34063] text-white self-start' : 'bg-[#fff8f1] border border-[#a34063]/30 ml-auto text-[#5c4033]'
                }`}
              >
                <span className="font-bold opacity-80">{msg.sender === 'pip' ? 'Pip: ' : 'You: '}</span>
                {msg.text}
              </div>
            ))}
          </div>
        </div>

        {/* 3 Fixed Question Buttons */}
        <div className="space-y-2 mt-auto">
          <p className="text-xs font-bold text-[#a34063] uppercase tracking-wider">Tap a question to ask Pip:</p>
          <button
            onClick={() => handleAskPip('who')}
            className="w-full text-left p-3.5 bg-white border border-[#a34063]/30 rounded-xl text-xs sm:text-sm font-bold text-[#a34063] hover:bg-[#a34063]/10 transition-colors shadow-xs"
          >
            1. Who is Pip? (Look, species, personality)
          </button>
          <button
            onClick={() => handleAskPip('what')}
            className="w-full text-left p-3.5 bg-white border border-[#a34063]/30 rounded-xl text-xs sm:text-sm font-bold text-[#a34063] hover:bg-[#a34063]/10 transition-colors shadow-xs"
          >
            2. What does Pip do? (Profession & craft)
          </button>
          <button
            onClick={() => handleAskPip('tagline')}
            className="w-full text-left p-3.5 bg-white border border-[#a34063]/30 rounded-xl text-xs sm:text-sm font-bold text-[#a34063] hover:bg-[#a34063]/10 transition-colors shadow-xs"
          >
            3. What is Pip's tagline?
          </button>
        </div>

      </div>
    </div>
  );
}