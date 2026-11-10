import React, { useMemo } from "react";
import * as THREE from "three";
import type { Look, V3 } from "../engine/Stage";
import { Box, Cyl, Roof, Lamp } from "../engine/kit";
import { planks, painted } from "../engine/tex";
import { LAYER_CHAR, LAYER_FX } from "../engine/Stage";

// --- Measured Color & Light Profiles for Episode 3 ---

// Victorian parlor: warm amber chandelier, deep mahogany shadows
export const victorianLook = (): Look => ({
  sun: { pos: [6, 14, 8], color: "#ffdfa0", intensity: 2.2, shadow: 14 },
  hemi: { sky: "#fde68a", ground: "#2b1a16", intensity: 0.7 },
  fog: "#261714",
  fogNear: 14,
  fogFar: 45,
  exposure: 1.25,
  aperture: 0.35,
  saturation: 1.1,
  ink: 0.9,
});

// 2009 Academic Conference: bright interior, neutral shadows
export const conferenceLook = (): Look => ({
  sun: { pos: [8, 18, 10], color: "#fef9c3", intensity: 2.0, shadow: 15 },
  hemi: { sky: "#e0f2fe", ground: "#1e293b", intensity: 0.75 },
  fog: "#1e293b",
  fogNear: 15,
  fogFar: 50,
  exposure: 1.2,
  aperture: 0.32,
  saturation: 1.05,
  ink: 0.85,
});

// 1980s Prison Corridor: moody dark blue, high cinematic contrast
export const prisonLook = (): Look => ({
  sun: { pos: [-8, 12, 10], color: "#93c5fd", intensity: 1.6, shadow: 12 },
  hemi: { sky: "#1e3a8a", ground: "#0f172a", intensity: 0.55 },
  fog: "#0a0f1d",
  fogNear: 10,
  fogFar: 35,
  exposure: 1.15,
  aperture: 0.4,
  saturation: 0.95,
  ink: 0.95,
});

// Freedom 1990: golden dawn sunlight, hopeful high contrast
export const freedomLook = (): Look => ({
  sun: { pos: [12, 16, 12], color: "#fef08a", intensity: 2.4, shadow: 18 },
  hemi: { sky: "#bae6fd", ground: "#1c1917", intensity: 0.8 },
  fog: "#bae6fd",
  fogNear: 18,
  fogFar: 65,
  exposure: 1.25,
  aperture: 0.3,
  saturation: 1.15,
  ink: 0.85,
});

// Neuroscience Laboratory: clean modern teal/white look
export const labLook = (): Look => ({
  sun: { pos: [4, 15, 6], color: "#f8fafc", intensity: 2.1, shadow: 12 },
  hemi: { sky: "#bae6fd", ground: "#0f172a", intensity: 0.7 },
  fog: "#0f172a",
  fogNear: 12,
  fogFar: 42,
  exposure: 1.22,
  aperture: 0.35,
  saturation: 1.05,
  ink: 0.9,
});

// Cosmic Memory Void: deep midnight starlight
export const cosmicLook = (): Look => ({
  sun: { pos: [0, 16, 10], color: "#fde047", intensity: 1.8, shadow: 12 },
  hemi: { sky: "#312e81", ground: "#030712", intensity: 0.6 },
  fog: "#030712",
  fogNear: 10,
  fogFar: 40,
  exposure: 1.2,
  aperture: 0.42,
  saturation: 1.2,
  ink: 0.8,
});

// -------------------------------------------------------------
// SET 1: Monopoly Victorian Parlor
// -------------------------------------------------------------
export const MonopolyParlorSet: React.FC = () => {
  const woodFloor = useMemo(() => planks("#54301d", [2, 2]), []);
  const wallMat = useMemo(() => painted("#3b1e16", [2, 2]), []);

  return (
    <group>
      {/* Floor */}
      <Box size={[24, 0.2, 24]} pos={[0, -0.1, 0]} color="#452417" />
      <Box size={[16, 0.05, 16]} pos={[0, 0.02, 0]} map={woodFloor} />

      {/* Red Carpet runner */}
      <Box size={[5.5, 0.04, 12]} pos={[0, 0.06, 0]} color="#881337" />
      <Box size={[5.8, 0.02, 12.2]} pos={[0, 0.05, 0]} color="#d97706" />

      {/* Back Wall */}
      <Box size={[18, 8, 0.6]} pos={[0, 4, -6.5]} map={wallMat} />
      {/* Wainscoting lower wall */}
      <Box size={[18.2, 2.2, 0.7]} pos={[0, 1.1, -6.4]} color="#2d150f" />
      <Box size={[18.4, 0.15, 0.8]} pos={[0, 2.2, -6.35]} color="#d97706" />

      {/* Side Wall Left */}
      <Box size={[0.6, 8, 16]} pos={[-8, 4, 0]} map={wallMat} />
      <Box size={[0.7, 2.2, 16.2]} pos={[-7.9, 1.1, 0]} color="#2d150f" />

      {/* Side Wall Right */}
      <Box size={[0.6, 8, 16]} pos={[8, 4, 0]} map={wallMat} />
      <Box size={[0.7, 2.2, 16.2]} pos={[7.9, 1.1, 0]} color="#2d150f" />

      {/* Ornate Gold Frame Painting on Back Wall */}
      <Box size={[3.6, 2.6, 0.15]} pos={[0, 4.8, -6.1]} color="#b45309" />
      <Box size={[3.2, 2.2, 0.18]} pos={[0, 4.8, -6.08]} color="#1e293b" />
      
      {/* Golden Chandelier / Ceiling Light */}
      <Cyl r={0.8} r2={0.2} h={0.6} pos={[0, 6.8, 0]} color="#f59e0b" seg={16} />
      <Cyl r={0.05} r2={0.05} h={1.8} pos={[0, 7.8, 0]} color="#b45309" seg={8} />

      {/* Victorian Desk / Game Table behind character */}
      <group position={[0, 0, -3.2]}>
        <Box size={[4.2, 0.18, 2.0]} pos={[0, 1.3, 0]} color="#1c1917" />
        <Box size={[4.0, 0.05, 1.8]} pos={[0, 1.4, 0]} color="#065f46" /> {/* Green baize */}
        {/* Legs */}
        <Cyl r={0.1} r2={0.08} h={1.3} pos={[-1.9, 0.65, -0.8]} color="#292524" seg={10} />
        <Cyl r={0.1} r2={0.08} h={1.3} pos={[1.9, 0.65, -0.8]} color="#292524" seg={10} />
        <Cyl r={0.1} r2={0.08} h={1.3} pos={[-1.9, 0.65, 0.8]} color="#292524" seg={10} />
        <Cyl r={0.1} r2={0.08} h={1.3} pos={[1.9, 0.65, 0.8]} color="#292524" seg={10} />

        {/* Stack of Gold Coins & Banknotes on table */}
        <Cyl r={0.25} r2={0.25} h={0.2} pos={[-1.2, 1.5, 0.2]} color="#facc15" seg={12} />
        <Cyl r={0.2} r2={0.2} h={0.25} pos={[-0.8, 1.52, 0.4]} color="#fbbf24" seg={12} />
        <Box size={[0.6, 0.12, 0.4]} pos={[1.2, 1.48, 0.1]} color="#22c55e" /> {/* Money stack */}
      </group>

      {/* Warm Standing Floor Lamps */}
      <Lamp pos={[-5.0, 0, -4.5]} light={35} />
      <Lamp pos={[5.0, 0, -4.5]} light={35} />
    </group>
  );
};

// -------------------------------------------------------------
// SET 2: Conference Hall (Fiona Broome 2009)
// -------------------------------------------------------------
export const ConferenceHallSet: React.FC = () => {
  const carpetMat = useMemo(() => painted("#1e293b", [2, 2]), []);

  return (
    <group>
      <Box size={[24, 0.2, 24]} pos={[0, -0.1, 0]} color="#0f172a" />
      <Box size={[18, 0.05, 16]} pos={[0, 0.02, 0]} map={carpetMat} />

      {/* Stage Backdrop Wall */}
      <Box size={[18, 7, 0.5]} pos={[0, 3.5, -6]} color="#334155" />
      {/* Conference Banner */}
      <Box size={[9, 3.2, 0.1]} pos={[0, 4.2, -5.7]} color="#0284c7" />
      <Box size={[8.6, 0.2, 0.12]} pos={[0, 5.2, -5.68]} color="#ffffff" />
      <Box size={[6.0, 0.15, 0.12]} pos={[0, 4.5, -5.68]} color="#93c5fd" />

      {/* Discussion Round Tables */}
      <group position={[-2.8, 0, -2.2]}>
        <Cyl r={1.5} r2={1.5} h={0.15} pos={[0, 1.2, 0]} color="#f1f5f9" seg={24} />
        <Cyl r={0.18} r2={0.25} h={1.2} pos={[0, 0.6, 0]} color="#475569" seg={12} />
        <Cyl r={0.7} r2={0.7} h={0.06} pos={[0, 0.03, 0]} color="#334155" seg={16} />
        {/* Coffee cups */}
        <Cyl r={0.1} r2={0.08} h={0.16} pos={[-0.4, 1.35, 0.2]} color="#ffffff" seg={10} />
        <Cyl r={0.1} r2={0.08} h={0.16} pos={[0.5, 1.35, -0.3]} color="#ffffff" seg={10} />
      </group>

      <group position={[2.8, 0, -2.2]}>
        <Cyl r={1.5} r2={1.5} h={0.15} pos={[0, 1.2, 0]} color="#f1f5f9" seg={24} />
        <Cyl r={0.18} r2={0.25} h={1.2} pos={[0, 0.6, 0]} color="#475569" seg={12} />
        <Cyl r={0.7} r2={0.7} h={0.06} pos={[0, 0.03, 0]} color="#334155" seg={16} />
      </group>

      {/* Ceiling strip lights */}
      <Box size={[12, 0.1, 0.4]} pos={[0, 6.8, -2]} color="#ffffff" />
      <Box size={[12, 0.1, 0.4]} pos={[0, 6.8, 2]} color="#ffffff" />
    </group>
  );
};

// -------------------------------------------------------------
// SET 3: 1980s Stone Prison Corridor
// -------------------------------------------------------------
export const PrisonCorridorSet: React.FC = () => {
  const stoneMat = useMemo(() => planks("#334155", [2, 2]), []);

  return (
    <group>
      <Box size={[24, 0.2, 24]} pos={[0, -0.1, 0]} color="#090d16" />
      {/* Stone Floor */}
      <Box size={[16, 0.05, 20]} pos={[0, 0.02, 0]} color="#1e293b" />

      {/* High Stone Wall Back */}
      <Box size={[18, 8, 0.8]} pos={[0, 4, -5.5]} map={stoneMat} />

      {/* Iron Cell Bars */}
      <group position={[0, 0, -2.8]}>
        <Box size={[16, 0.25, 0.25]} pos={[0, 4.5, 0]} color="#0f172a" />
        <Box size={[16, 0.25, 0.25]} pos={[0, 0.2, 0]} color="#0f172a" />
        {/* Vertical Iron Bars */}
        {[-4.5, -3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3.5, 4.5].map((x, i) => (
          <Cyl key={i} r={0.06} r2={0.06} h={4.3} pos={[x, 2.35, 0]} color="#0f172a" seg={8} />
        ))}
      </group>

      {/* Hanging Iron Lantern with blueish flame */}
      <Cyl r={0.25} r2={0.2} h={0.6} pos={[-2.5, 3.8, -1.8]} color="#0f172a" seg={10} />
      <Cyl r={0.1} r2={0.1} h={0.2} pos={[-2.5, 3.8, -1.8]} color="#93c5fd" seg={8} />
      <Cyl r={0.03} r2={0.03} h={1.2} pos={[-2.5, 4.7, -1.8]} color="#0f172a" seg={6} />
    </group>
  );
};

// -------------------------------------------------------------
// SET 4: Sunlit Freedom Gates (1990 Victor Verster)
// -------------------------------------------------------------
export const SunlitGatesSet: React.FC = () => {
  return (
    <group>
      {/* Green lawn */}
      <Box size={[40, 0.2, 40]} pos={[0, -0.1, 0]} color="#15803d" />
      {/* Gravel entrance road */}
      <Box size={[7, 0.05, 24]} pos={[0, 0.03, 0]} color="#e2e8f0" />

      {/* Brick Gate Pillars */}
      <Box size={[1.4, 5.0, 1.4]} pos={[-4.2, 2.5, -3]} color="#7c2d12" />
      <Box size={[1.6, 0.4, 1.6]} pos={[-4.2, 5.2, -3]} color="#e2e8f0" />
      <Cyl r={0.35} r2={0.35} h={0.6} pos={[-4.2, 5.6, -3]} color="#e2e8f0" seg={12} />

      <Box size={[1.4, 5.0, 1.4]} pos={[4.2, 2.5, -3]} color="#7c2d12" />
      <Box size={[1.6, 0.4, 1.6]} pos={[4.2, 5.2, -3]} color="#e2e8f0" />
      <Cyl r={0.35} r2={0.35} h={0.6} pos={[4.2, 5.6, -3]} color="#e2e8f0" seg={12} />

      {/* Open Wrought Iron Gates */}
      <group position={[-4.2, 0, -3]} rotation={[0, -Math.PI * 0.4, 0]}>
        <Box size={[3.6, 0.15, 0.1]} pos={[1.8, 4.2, 0]} color="#0f172a" />
        <Box size={[3.6, 0.15, 0.1]} pos={[1.8, 0.3, 0]} color="#0f172a" />
        {[0.4, 1.1, 1.8, 2.5, 3.2].map((gx, i) => (
          <Cyl key={i} r={0.04} r2={0.04} h={4.0} pos={[gx, 2.25, 0]} color="#0f172a" seg={8} />
        ))}
      </group>

      <group position={[4.2, 0, -3]} rotation={[0, Math.PI * 0.4, 0]}>
        <Box size={[3.6, 0.15, 0.1]} pos={[-1.8, 4.2, 0]} color="#0f172a" />
        <Box size={[3.6, 0.15, 0.1]} pos={[-1.8, 0.3, 0]} color="#0f172a" />
        {[-0.4, -1.1, -1.8, -2.5, -3.2].map((gx, i) => (
          <Cyl key={i} r={0.04} r2={0.04} h={4.0} pos={[gx, 2.25, 0]} color="#0f172a" seg={8} />
        ))}
      </group>

      {/* Trees along perimeter */}
      {[-7, 7].map((tx, idx) => (
        <group key={idx} position={[tx, 0, -5]} layers={LAYER_CHAR}>
          <Cyl r={0.3} r2={0.25} h={2.5} pos={[0, 1.25, 0]} color="#451a03" seg={12} />
          <Cyl r={2.0} r2={0.4} h={3.2} pos={[0, 3.8, 0]} color="#166534" seg={16} />
        </group>
      ))}
    </group>
  );
};

// -------------------------------------------------------------
// SET 5: Neuroscience Research Lab
// -------------------------------------------------------------
export const NeuroscienceLabSet: React.FC = () => {
  return (
    <group>
      <Box size={[24, 0.2, 24]} pos={[0, -0.1, 0]} color="#0f172a" />
      <Box size={[16, 0.05, 16]} pos={[0, 0.02, 0]} color="#1e293b" />

      {/* Whiteboard Wall */}
      <Box size={[16, 7, 0.5]} pos={[0, 3.5, -5.5]} color="#0f172a" />
      <Box size={[7.5, 3.4, 0.08]} pos={[0, 4.2, -5.2]} color="#f8fafc" />
      <Box size={[7.7, 3.6, 0.04]} pos={[0, 4.2, -5.24]} color="#94a3b8" />
      {/* Brain memory diagram lines on whiteboard */}
      <Box size={[4.0, 0.08, 0.1]} pos={[-0.5, 4.6, -5.15]} color="#0284c7" />
      <Box size={[3.2, 0.08, 0.1]} pos={[0.2, 4.0, -5.15]} color="#e11d48" />

      {/* Lab Research Desk */}
      <group position={[0, 0, -2.6]}>
        <Box size={[4.2, 0.15, 2.2]} pos={[0, 1.35, 0]} color="#e2e8f0" />
        <Cyl r={0.08} r2={0.08} h={1.3} pos={[-1.9, 0.65, -0.9]} color="#334155" seg={8} />
        <Cyl r={0.08} r2={0.08} h={1.3} pos={[1.9, 0.65, -0.9]} color="#334155" seg={8} />
        <Cyl r={0.08} r2={0.08} h={1.3} pos={[-1.9, 0.65, 0.9]} color="#334155" seg={8} />
        <Cyl r={0.08} r2={0.08} h={1.3} pos={[1.9, 0.65, 0.9]} color="#334155" seg={8} />

        {/* Vintage Camera / Memory Scanner on tripod */}
        <group position={[-1.1, 1.45, 0.2]}>
          <Box size={[0.4, 0.3, 0.5]} pos={[0, 0.2, 0]} color="#18181b" />
          <Cyl r={0.12} r2={0.15} h={0.25} pos={[0, 0.2, 0.32]} rot={[Math.PI * 0.5, 0, 0]} color="#b45309" seg={14} />
        </group>

        {/* Holographic glowing brain pedestal */}
        <group position={[1.0, 1.45, 0.2]} layers={LAYER_FX}>
          <Cyl r={0.35} r2={0.35} h={0.08} pos={[0, 0.04, 0]} color="#0284c7" seg={16} />
          {/* Glowing brain sphere */}
          <Cyl r={0.32} r2={0.3} h={0.45} pos={[0, 0.38, 0]} color="#38bdf8" seg={16} />
        </group>
      </group>
    </group>
  );
};

// -------------------------------------------------------------
// SET 6: Cosmic Memory Void
// -------------------------------------------------------------
export const CosmicVoidSet: React.FC = () => {
  return (
    <group>
      <Box size={[40, 0.2, 40]} pos={[0, -0.1, 0]} color="#030712" />
      {/* Floating platform */}
      <Cyl r={4.5} r2={4.2} h={0.3} pos={[0, 0.15, -1]} color="#1e1b4b" seg={32} />
      <Cyl r={4.6} r2={4.6} h={0.08} pos={[0, 0.32, -1]} color="#6366f1" seg={32} />

      {/* Floating glowing question marks / starlight pillars */}
      {[-3.5, 3.5].map((px, idx) => (
        <group key={idx} position={[px, 1.5, -3]}>
          <Cyl r={0.15} r2={0.15} h={2.2} pos={[0, 0, 0]} color="#818cf8" seg={12} />
          <Cyl r={0.25} r2={0.25} h={0.25} pos={[0, 1.3, 0]} color="#facc15" seg={12} />
        </group>
      ))}
    </group>
  );
};
