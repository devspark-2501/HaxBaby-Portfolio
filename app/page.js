'use client';

import StorySection from '../components/StorySection';
// or using import alias:
// import StorySection from '@/components/StorySection';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. Main Hero & Project Cards */}
      {/* Your HomePage content */}

      {/* 2. Pip's Interactive Story Section */}
      <StorySection />
    </main>
  );
}