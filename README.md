# 2D Shorts Engine 🎬

A high-performance hybrid 2D/3D cartoon animation and video production engine for creating viral vertical shorts (1080 × 1920 @ 30 FPS). Built on **Remotion**, **Three.js** (`@react-three/fiber`), and **Canvas 2D** procedural graphics.

Inspired by the visual storytelling language of *Rick's Clips*, *Kurzgesagt*, and modern 3D documentary animation channels.

---

## 🚀 Key Architectural Pillars

### 1. Procedural 2D Cartoon Character Engine (`src/engine/draw.ts`)
- **Zero Heavy Rigs:** Characters are rendered frame-by-frame via Canvas 2D vectors, keeping bundle size microscopic and rendering lightning-fast.
- **Expressive Faces:** Dynamic eyes (`dot`, `wide`, `closed`, `half`, `happy`, `sad`), brows, and speech-synced mouths (`smile`, `open`, `o`, `frown`, `grin`, `smirk`).
- **Wardrobe & Styling:** Configurable suits, coats, shirts, ties, buttons, hats (fedora, top hat, beanie, etc.), hairstyles, glasses, and beards.
- **Interactive Handheld Props:** Briefcases, folders, burgers, coins, newspapers, phones, diplomas, coffee mugs, and custom items.
- **Natural Kinematics:** Automatic walking cycles, breathing/idle physics, and hand gestures (`point`, `wave`, `hold`, `cross`, `hips`).

### 2. 3D World Integration & Billboard Lighting (`src/engine/Toon.tsx`, `src/engine/Stage.tsx`)
- **Real 3D Shadows:** 2D characters cast dynamic shadows onto 3D floors, walls, and furniture via Three.js custom depth-packing materials.
- **Camera-Facing Billboarding:** Characters automatically orient to camera vectors while respecting fixed perspective angles.
- **Cinematic Stage & Looks:** Configurable atmospheric lighting looks with directional sun lights, ambient bounce, depth fog, saturation, exposure, and stylized post-processing ink outline passes.

### 3. Procedural 3D Environment Kit (`src/engine/kit.tsx`, `src/engine/tex.ts`)
- Modular 3D geometry primitives: buildings, roofs, windows with warm interior glow, gas lamps, streetlights, roads, curbs, and terrain.
- Procedural painted textures: wooden planks, brickwork, roof slates, and asphalt road markings generated mathematically without large external image assets.

### 4. Dynamic Kinetic Subtitles (`src/engine/Captions.tsx`)
- High-retention word-by-word karaoke pop-in animations synchronized to Whisper audio transcriptions.
- **Adaptive Safe-Zone Collision Avoidance:** Dynamically shifts subtitle position to upper headroom whenever lower graphics or cards are active.

---

## 📦 Project Structure

```
├── src/
│   ├── engine/                  # Core Animation & Rendering Engine
│   │   ├── draw.ts              # 2D procedural character drawing engine
│   │   ├── Toon.tsx             # 3D billboard character with shadow mapping
│   │   ├── Stage.tsx            # Three.js 3D stage, camera keys, ink pass
│   │   ├── kit.tsx              # Modular 3D architectural kit pieces
│   │   ├── tex.ts              # Procedural texture generators
│   │   └── Captions.tsx         # Dynamic kinetic word-by-word subtitles
│   ├── ep5/                     # Flagship Documentary Episode (McDonald's Real Estate)
│   │   ├── cast.ts              # Character definitions (Ray Kroc, Harry, etc.)
│   │   ├── sets.tsx             # 3D environments (Modern Restaurant, 1954 Drive-In)
│   │   ├── shots.tsx            # Shot-by-shot cameras, animation & staging
│   │   ├── overlays.tsx         # Motion graphics cards and titles
│   │   └── Episode.tsx          # Sequence assembly & master audio timeline
│   ├── Root.tsx                 # Remotion composition registry
│   └── index.ts                 # Remotion entry point
├── scripts/                     # Audio processing & Whisper alignment tools
├── package.json
├── remotion.config.ts
└── tsconfig.json
```

---

## 🛠️ Quick Start

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/abhijithmr226/2d-shorts-engine.git
cd 2d-shorts-engine

# Install dependencies
npm install
```

### 2. Live Interactive Preview
Launch Remotion's interactive Studio player to scrub frames, inspect camera angles, and preview animations in real time:
```bash
npx remotion preview src/index.ts
```

### 3. Render a Master Video
Render a 9:16 vertical MP4 video with multi-threaded Chromium workers and ANGLE OpenGL hardware acceleration:
```bash
npx remotion render src/index.ts Short out/video.mp4 --concurrency=4 --gl=angle
```

### 4. Render a Single High-Res Still / Thumbnail
```bash
npx remotion still src/index.ts Shot out/thumbnail.png --frame=550 --gl=angle
```

---

## 🎨 How to Build a Custom Short

### Step 1: Define Characters (`src/custom/cast.ts`)
```typescript
import type { ToonSpec } from "../engine/draw";

export const CAST: Record<string, ToonSpec> = {
  hero: {
    hat: "none",
    hair: "#0f172a",
    coat: "#2563eb",
    vest: "#ffffff",
    tie: "#dc2626",
    height: 1.0,
    wide: 0.98,
  },
};
```

### Step 2: Build 3D Sets (`src/custom/sets.tsx`)
```tsx
import { Box, Cyl } from "../engine/kit";

export function CitySet() {
  return (
    <group>
      <Box size={[20, 0.3, 14]} pos={[0, -0.15, 0]} color="#1e293b" shadow />
      <Box size={[6, 12, 6]} pos={[-6, 6, -4]} color="#334155" shadow />
      <pointLight position={[0, 4, 2]} intensity={3.5} color="#fef08a" />
    </group>
  );
}
```

### Step 3: Script Shots & Cameras (`src/custom/shots.tsx`)
```tsx
import { Toon } from "../engine/Toon";
import { CAST } from "./cast";

export const SHOTS = {
  1: {
    look: myLook(),
    cam: { from: [0, 1.8, 5.0], to: [0, 1.6, 4.0], lookFrom: [0, 1.3, 0], fov: 48 },
    focus: 3.5,
    Body: ({ dur }) => (
      <group>
        <CitySet />
        <Toon
          spec={CAST.hero}
          pos={[0, 0.1, 0.6]}
          pose={{ armL: "down", armR: "point", eyes: "wide", mouth: "smile" }}
        />
      </group>
    ),
  },
};
```

---

## 📜 License
MIT License. Created by [abhijithmr226](https://github.com/abhijithmr226).
