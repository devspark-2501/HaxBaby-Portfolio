'use client';

import React from 'react';
import { MessageCircle, Wand2, Briefcase, BookOpen, HeartHandshake } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, playPop }) {
  const tabs = [
    { id: 'chat', icon: MessageCircle, label: 'Chat with Pip' },
    { id: 'inventions', icon: Wand2, label: "Pip's Inventions" },
    { id: 'portfolio', icon: Briefcase, label: "Pip's Portfolio" },
    { id: 'story', icon: BookOpen, label: 'Origin & World' },
    { id: 'guestbook', icon: HeartHandshake, label: 'Sign Wall / Note to Pip' },
  ];

  return (
    <aside className="fixed left-4 top-1/2 -translate-y-1/2 z-40 bg-white/90 backdrop-blur-md border-2 border-[#a34063]/30 shadow-2xl rounded-full p-2.5 flex flex-col gap-4 items-center">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              if (playPop) playPop(523.25);
              setActiveTab(tab.id);
            }}
            className={`p-3 rounded-full transition-all relative group ${
              isActive
                ? 'bg-[#a34063] text-white scale-110 shadow-lg shadow-[#a34063]/40'
                : 'text-[#a34063] hover:bg-[#a34063]/10'
            }`}
            title={tab.label}
          >
            <Icon className="w-5 h-5" />
            <span className="absolute left-14 bg-[#a34063] text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
              {tab.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
}