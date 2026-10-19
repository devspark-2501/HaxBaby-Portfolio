# 🌙 Pip the Skull Baby — "Midnight Nursery" Portfolio OS

> *"I build the dreams you fall asleep inside."*

Welcome to the official **Tier-3 Competitive Portfolio** for **Pip the Skull Baby**, built for the **haX.baby Hackathon (Track 1)**. This project is a feature-rich, high-polish Next.js web application engineered around a cozy **"Midnight Nursery"** editorial design aesthetic.

---

## 🎨 Design Philosophy & Visual Identity

The interface fuses 90s early-web whimsy with an editorial serif palette, soft glassmorphism, and cozy pastel tones:
* **Background Canvas:** Soft cream (`#fff8f1`) shifting seamlessly into Midnight Plum (`#1c121e`) during Night Shift.
* **Primary Accents:** Deep Berry (`#a34063`), Rose Pink, and Glowing Amber (`#fde047`).
* **Typography:** Bold editorial serif headers paired with crisp, highly legible sans-serif body text.
* **Motifs:** Custom cloud header borders, starry nightcaps, soft floating badges, and glowing ember lanterns.

---

## 📜 Canon Character Lore & Identity

* **Name:** Pip
* **Species:** A gentle, cute skull baby wearing cozy heart-patterned pajamas, a star-patterned nightcap, and a pink ribbon bow.
* **Look:** Smooth round skull face, soft eye sockets with warm glowing amber pinpricks, and a sweet crooked smile. *(100% friendly, never scary, creepy, or gory!)*
* **Personality:** Curious, sleepy, a little clumsy, easily delighted. Giggles at soft sounds and hates silence.
* **Profession:** **Junior Dream Engineer @ Midnight Nursery** — Pip designs the dreams, lullabies, nightlights, and bedtime stories that help the neighborhood's little ghosts and creatures fall asleep.

---

## ✨ Core Interactive Features & Problem Statement Coverage

### 1. What They Are (Identity & Quirks)
* **Eye-Tracking Pupil Engine:** Pip's glowing amber pupils continuously track the visitor's cursor across the screen using smooth trigonometric math (`Math.atan2` angle and hypotenuse distance capping).
* **Pip's Sitting Stage:** An animated sitting portrait resting on a cloud cushion, holding a dimmable bedside lantern and lullaby music box.

### 2. What They Do (Inventions & Works Showcase)
* **The Lullaby Lab:** An interactive Web Audio API synthesizer that plays gentle pentatonic chimes (Notes A, C, E) with a single click.
* **Dimmable Dream Lantern:** A dynamic range slider that real-time controls the radial box-shadow brightness and glow opacity of Pip's bedside lantern.
* **Starlight Dream Routes:** Interactive flight delivery maps used to drop custom dreams across rooftops.
* **Rattle & Block Toys:** Interactive click/stack sound toys invented for nursery creatures.
* **Bedtime Storybook:** Illustrated bedtime tales written and illustrated by Pip.
* **Pip's Growth Chart:** A vertical nursery wall height chart tracking Pip's skill progression from birth to Junior Dream Engineer.

### 3. What Their Story Is (Scroll-Driven Journey)
* **About & Origin Story Modal:** A dedicated, full-screen scroll-driven modal with gradient scene transitions (*Scene 1: Starlight Nursery Birth*, *Scene 2: Crafting Bedtime Chimes*, *Scene 3: Official Dream Engineer*).
* **World & Neighborhood Lore:** Details on Starlight Nursery, Whispering Woods, and supporting creatures like Barnaby the Bear Cub, Hootie the Owl, and friendly nursery ghosts.

### 4. Immersion & Audio-Visual Polish
* **60-Second Auto Day/Night Loop:** An automated background timer tracks site stay time. Every 60 seconds, it triggers a 1-minute **Night Shift** where Pip falls asleep (`zZz` floating animation, dimmed UI, and dark plum palette), followed by a morning wake-up cycle.
* **Animated Mode Banners:** Mode transitions trigger animated pop-up notification cards with custom icons and greetings (*"🌙 Night Shift Activated! Pip is sleeping for 1min..."*).
* **Floating Sleepiness Bar:** A semi-transparent vertical glassmorphism progress bar docked on the right side of the screen displaying real-time countdown to the next sleep shift.
* **Star Trail Cursor:** Custom cursor particle overlay emitting sparkling stars (`✨`, `⭐`, `🌸`, `🌙`) following user movement.
* **Web Audio Synthesizer:** Pure Web Audio API sine-wave sound generator driving UI sound effects, eliminating external MP3 dependencies. Includes an accessible header **Mute Switch**.

### 5. Hidden Easter Eggs
* **Confetti Ribbon:** Tapping Pip's nightcap bow triggers a multi-colored particle blast.
* **Interactive Crackable Egg (Bottom-Left):** A large pastel egg sitting on the bottom-left of the viewport. Visitors can click the egg 3 times to crack the shell, playing escalating audio pitches and exploding into a full-screen starburst celebration!

### 6. Live Persistence Backend (MongoDB)
* **Live Visitor Guestbook:** Integrated Next.js API routes coupled with MongoDB persistence allow visitors to sign notes that remain visible to all future travelers in real-time.

---

## 📂 File Architecture & Functionality Breakdown

```text
babys-portfolio/
├── lib/
│   └── mongodb.js               # Global MongoDB Client Promise helper for connection pooling
├── app/
│   ├── layout.js                # Root application layout wrapper
│   ├── page.js                  # Main orchestrator & parent state container
│   ├── api/
│   │   └── guestbook/
│   │       └── route.js         # GET (fetch notes) & POST (save note) REST API handlers
│   ├── components/
│   │   ├── StarTrail.jsx        # Cursor sparkle particle emitter overlay
│   │   └── ConstellationCanvas.jsx # Interactive star-connecting canvas toy
│   └── sections/
│       ├── Navbar.jsx           # Top header bar with Mute & Day/Night manual switches
│       ├── Sidebar.jsx          # Fixed left cylinder navigation bar with quick pop-up triggers
│       ├── MainStage.jsx        # Primary hero container with eye-tracking, sitting Pip, & sleep bar
│       ├── ChatModal.jsx        # Fixed 3-option Q&A dialogue system in Pip's exact character voice
│       ├── InventionsModal.jsx  # Interactive Lullaby Synthesizer & Dimmable Lantern controls
│       ├── PortfolioModal.jsx   # 6-project canon portfolio & nursery growth chart
│       ├── StoryModal.jsx       # Origin story, world lore, & visual art style summary
│       ├── GuestbookModal.jsx   # MongoDB live sign wall & note submission form
│       ├── AboutStoryModal.jsx  # Scroll-driven origin journey modal with gradient scene cards
│       └── EggEasterEgg.jsx     # Crackable surprise egg component with confett
```


🛠️ Detailed Function & Component Breakdown
1. app/page.js (Root Orchestrator)
playPop(freq): Generates real-time audio tones using window.AudioContext without external sound files.

siteTimer Effect: Runs a 1-second interval loop. At 60 seconds, it toggles isNightMode to true and triggers the sleep notification banner. At 120 seconds, it wakes Pip up and resets the cycle.

sleepBanner State: Controls the visibility, title, and message for the mode-shift banner.

2. app/sections/MainStage.jsx (Hero & Stage Container)
Eye Tracking Logic: Computes distance and angle relative to the avatar container's bounding box to set pupilPos.x and pupilPos.y.

Right-Side Sleep Bar: Displays a vertical glassmorphism track indicating the percentage toward the next sleep shift.

Sitting Pip Stage: Displays Pip sitting on a cloud holding a dimmable lantern and music box.

3. app/sections/EggEasterEgg.jsx (Crackable Egg Component)
handleEggClick(): Increments crackLevel from 0 to 3, playing rising frequency chimes and rendering SVG crack paths over the egg shell. On the 3rd tap, it invokes canvas-confetti for a full-screen starburst.

4. app/sections/ChatModal.jsx (Pre-Set Dialogue Engine)
handleAskPip(questionType): Handles fixed Q&A options ("Who is Pip?", "What does Pip do?", "What is Pip's tagline?"), updating chatHistory with Pip's exact lore responses.

5. app/sections/InventionsModal.jsx (Interactive Toys)
Lullaby Synth Keys: Buttons calling playPop() at 440Hz (Note A), 523.25Hz (Note C), and 659.25Hz (Note E).

Lantern Dimmer: Real-time range input controlling inline styles for lantern shadow spread and element opacity.

6. app/sections/GuestbookModal.jsx & app/api/guestbook/route.js (MongoDB Backend)
GET() Handler: Connects to the pip_nursery database, sorts notes by createdAt: -1, and returns the latest 20 signatures.

POST() Handler: Validates visitor name and note inputs, sanitizes string lengths, and inserts the signature into MongoDB.

7. app/components/StarTrail.jsx (Particle Trail)
Tracks mousemove events and pushes random star emojis (✨, ⭐, 🌸, 🌙) to an array with CSS ping animations, automatically trimming old particles to maintain 60 FPS performance.

🏆 Hackathon Tier Breakdown & Score Summary
Tier 1 (Complete Portfolio): 100% Met (Eye tracking, scroll-driven story, day/night shift, mobile layout, Easter egg).

Tier 2 (Memorable Standout): 100% Met (Lullaby synth, dimmable lantern, delivery routes, storybook, mini-game soundboard).

Tier 3 (Boss Level Legendary): Met (Live MongoDB guestbook, returning visitor memory, character dialogue bot, high performance, and high-polish responsive UI).i blast
