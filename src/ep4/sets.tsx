import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import type { Look } from "../engine/Stage";
import { Box, Cyl, Lamp } from "../engine/kit";
import { planks, painted } from "../engine/tex";

// --- Measured Color & Light Profiles for Episode 4 (Phone Addiction & Screen Time) ---

// Modern Studio Look: Sleek deep slate & indigo background with warm soft keylight
export const studioLook = (): Look => ({
  sun: { pos: [6, 16, 9], color: "#f8fafc", intensity: 2.2, shadow: 14 },
  hemi: { sky: "#38bdf8", ground: "#0f172a", intensity: 0.65 },
  fog: "#090d16",
  fogNear: 15,
  fogFar: 48,
  exposure: 1.25,
  aperture: 0.32,
  saturation: 1.1,
  ink: 0.88,
});

// Cozy Bedroom Look: Morning dawn light filtering through window, warm amber accents
export const bedroomLook = (): Look => ({
  sun: { pos: [-8, 12, 8], color: "#ffedd5", intensity: 2.0, shadow: 12 },
  hemi: { sky: "#fed7aa", ground: "#1e1b4b", intensity: 0.6 },
  fog: "#18182b",
  fogNear: 12,
  fogFar: 42,
  exposure: 1.22,
  aperture: 0.35,
  saturation: 1.12,
  ink: 0.85,
});

// Night Bedroom Look: Deep midnight darkness with moon glow & screen illumination
export const nightLook = (): Look => ({
  sun: { pos: [-6, 10, 6], color: "#38bdf8", intensity: 1.2, shadow: 10 },
  hemi: { sky: "#1e1b4b", ground: "#020617", intensity: 0.4 },
  fog: "#030712",
  fogNear: 10,
  fogFar: 36,
  exposure: 1.15,
  aperture: 0.42,
  saturation: 1.2,
  ink: 0.95,
});

// Kitchen Breakfast Look: Bright morning kitchen with warm light
export const breakfastLook = (): Look => ({
  sun: { pos: [8, 15, 10], color: "#fef08a", intensity: 2.3, shadow: 14 },
  hemi: { sky: "#fed7aa", ground: "#1e293b", intensity: 0.7 },
  fog: "#1c1917",
  fogNear: 14,
  fogFar: 45,
  exposure: 1.24,
  aperture: 0.3,
  saturation: 1.1,
  ink: 0.88,
});

// Bathroom Vanity Look: Crisp clean white tile look with mirror reflection
export const bathroomLook = (): Look => ({
  sun: { pos: [0, 14, 8], color: "#f8fafc", intensity: 2.4, shadow: 12 },
  hemi: { sky: "#e0f2fe", ground: "#0f172a", intensity: 0.75 },
  fog: "#0f172a",
  fogNear: 12,
  fogFar: 40,
  exposure: 1.25,
  aperture: 0.3,
  saturation: 1.05,
  ink: 0.85,
});

// Urban Street / Sidewalk Look: Morning commute ambiance, crisp cool shadows
export const cityLook = (): Look => ({
  sun: { pos: [10, 18, 12], color: "#e0f2fe", intensity: 2.3, shadow: 16 },
  hemi: { sky: "#bae6fd", ground: "#1e293b", intensity: 0.7 },
  fog: "#0f172a",
  fogNear: 16,
  fogFar: 55,
  exposure: 1.2,
  aperture: 0.3,
  saturation: 1.05,
  ink: 0.9,
});

// Neuroscience Dopamine Lab Look: High-contrast dark room with glowing cyan and magenta accents
export const synapseLook = (): Look => ({
  sun: { pos: [0, 15, 6], color: "#38bdf8", intensity: 1.9, shadow: 12 },
  hemi: { sky: "#818cf8", ground: "#020617", intensity: 0.55 },
  fog: "#020617",
  fogNear: 10,
  fogFar: 38,
  exposure: 1.3,
  aperture: 0.4,
  saturation: 1.25,
  ink: 0.92,
});

// Evaluation / Scoreboard Studio Look: Focused warm spotlight with clean dark surround
export const scoreLook = (): Look => ({
  sun: { pos: [5, 15, 8], color: "#fef08a", intensity: 2.1, shadow: 14 },
  hemi: { sky: "#93c5fd", ground: "#0f172a", intensity: 0.65 },
  fog: "#0b0f19",
  fogNear: 14,
  fogFar: 46,
  exposure: 1.24,
  aperture: 0.34,
  saturation: 1.1,
  ink: 0.88,
});

// --- Sets Components ---

// 1. Modern Presentation Studio
export function ModernStudioSet() {
  const floorTex = useMemo(() => planks("#1e293b", [2, 2]), []);
  const wallTex = useMemo(() => painted("#0f172a", [2, 2]), []);

  return (
    <group>
      <Box size={[24, 0.4, 18]} pos={[0, -0.2, 0]} map={floorTex} shadow />
      <Box size={[24, 14, 0.5]} pos={[0, 7, -8]} map={wallTex} />
      {[-8, -6, -4, -2, 0, 2, 4, 6, 8].map((x, i) => (
        <Box key={i} size={[0.3, 13.5, 0.2]} pos={[x, 6.8, -7.7]} color="#334155" />
      ))}
      <Box size={[18, 0.08, 0.1]} pos={[0, 4.2, -7.6]} color="#38bdf8" />
      <Box size={[18, 0.08, 0.1]} pos={[0, 7.8, -7.6]} color="#818cf8" />
      <Cyl r={0.5} h={1.6} pos={[2.8, 0.8, -1.5]} color="#1e293b" />
      <Box size={[0.3, 0.55, 0.04]} pos={[2.8, 1.9, -1.5]} color="#0ea5e9" />
      <Lamp pos={[-4.5, 0, -3]} />
      <Lamp pos={[4.5, 0, -3]} />
    </group>
  );
}

// 2. Morning Bedroom Set (With Plush Cushions, Duvet & Bedside Atmosphere)
export function BedroomSet() {
  const carpetTex = useMemo(() => painted("#334155", [2, 2]), []);
  const wallTex = useMemo(() => painted("#1e1b4b", [2, 2]), []);

  return (
    <group>
      <Box size={[20, 0.4, 16]} pos={[0, -0.2, 0]} map={carpetTex} shadow />
      <Box size={[20, 12, 0.5]} pos={[0, 6, -6]} map={wallTex} />
      {/* Window with warm morning sun */}
      <Box size={[5, 6, 0.1]} pos={[-4, 6, -5.7]} color="#fef08a" />
      <Box size={[5.2, 0.2, 0.2]} pos={[-4, 6, -5.6]} color="#312e81" />
      <Box size={[0.2, 6.2, 0.2]} pos={[-4, 6, -5.6]} color="#312e81" />

      {/* Bed Base & Wooden Headboard */}
      <Box size={[5.8, 4.2, 0.5]} pos={[1.2, 2.1, -4.6]} color="#1e293b" shadow />
      <Box size={[5.6, 0.8, 7.8]} pos={[1.2, 0.4, -1.0]} color="#0f172a" shadow />
      {/* Thick Comfortable Mattress */}
      <Box size={[5.3, 0.65, 7.4]} pos={[1.2, 0.95, -1.0]} color="#f8fafc" shadow />
      
      {/* Plush Backrest Pillows & Cushions propped against headboard */}
      <Box size={[2.2, 1.2, 0.45]} pos={[0.0, 1.75, -4.1]} rot={[-0.25, 0, 0]} color="#fef3c7" shadow />
      <Box size={[2.2, 1.2, 0.45]} pos={[2.4, 1.75, -4.1]} rot={[-0.25, 0, 0]} color="#e0e7ff" shadow />
      {/* Decorative Accent Throw Cushions */}
      <Box size={[1.4, 1.0, 0.35]} pos={[0.3, 1.55, -3.6]} rot={[-0.15, 0.2, 0.1]} color="#f59e0b" shadow />
      <Box size={[1.4, 1.0, 0.35]} pos={[2.1, 1.55, -3.6]} rot={[-0.15, -0.2, -0.1]} color="#0284c7" shadow />

      {/* Folded Soft Quilt / Duvet draped over lower half of mattress */}
      <Box size={[5.4, 0.4, 4.4]} pos={[1.2, 1.35, 0.6]} color="#4338ca" shadow />
      <Box size={[5.45, 0.15, 0.8]} pos={[1.2, 1.55, -1.5]} color="#6366f1" shadow />

      {/* Bedside Nightstand with warm glowing lamp & digital clock */}
      <Box size={[1.8, 1.4, 1.8]} pos={[-2.4, 0.7, -3.2]} color="#334155" shadow />
      <Lamp pos={[-2.4, 1.4, -3.2]} />
      <Box size={[0.7, 0.35, 0.3]} pos={[-2.4, 1.55, -2.4]} color="#090d16" />
      <Box size={[0.5, 0.18, 0.02]} pos={[-2.4, 1.55, -2.24]} color="#22c55e" />
    </group>
  );
}

// 2b. Modern Living Room Lounge Couch Set (Rich Seating & Atmosphere)
export function LivingRoomCouchSet() {
  const floorTex = useMemo(() => planks("#1e293b", [2, 2]), []);
  const wallTex = useMemo(() => painted("#0f172a", [2, 2]), []);

  return (
    <group>
      <Box size={[24, 0.4, 18]} pos={[0, -0.2, 0]} map={floorTex} shadow />
      <Box size={[24, 14, 0.5]} pos={[0, 7, -6]} map={wallTex} />

      {/* Modern Accent Wall with Warm Wood Slats */}
      {[-7, -5, -3, 3, 5, 7].map((x, i) => (
        <Box key={i} size={[0.4, 13.5, 0.2]} pos={[x, 6.8, -5.7]} color="#334155" />
      ))}
      <Lamp pos={[-5.5, 0, -3.5]} />
      <Lamp pos={[5.5, 0, -3.5]} />

      {/* Premium Modular Living Room Sofa with Plush Cushions */}
      {/* Couch Main Frame */}
      <Box size={[7.6, 1.0, 3.8]} pos={[0, 0.5, -2.2]} color="#1e293b" shadow />
      {/* Backrest Structure */}
      <Box size={[7.6, 2.4, 0.8]} pos={[0, 1.8, -3.6]} color="#1e293b" shadow />
      {/* Padded Left and Right Armrests */}
      <Box size={[0.8, 1.6, 3.8]} pos={[-3.4, 1.0, -2.2]} color="#334155" shadow />
      <Box size={[0.8, 1.6, 3.8]} pos={[3.4, 1.0, -2.2]} color="#334155" shadow />

      {/* 3 Modular Thick Seat Cushions */}
      <Box size={[2.0, 0.5, 3.0]} pos={[-2.0, 0.95, -2.0]} color="#475569" shadow />
      <Box size={[2.0, 0.5, 3.0]} pos={[0.0, 0.95, -2.0]} color="#475569" shadow />
      <Box size={[2.0, 0.5, 3.0]} pos={[2.0, 0.95, -2.0]} color="#475569" shadow />

      {/* 3 Plush Ergonomic Backrest Cushions */}
      <Box size={[2.0, 1.4, 0.5]} pos={[-2.0, 1.85, -3.1]} rot={[-0.2, 0, 0]} color="#64748b" shadow />
      <Box size={[2.0, 1.4, 0.5]} pos={[0.0, 1.85, -3.1]} rot={[-0.2, 0, 0]} color="#64748b" shadow />
      <Box size={[2.0, 1.4, 0.5]} pos={[2.0, 1.85, -3.1]} rot={[-0.2, 0, 0]} color="#64748b" shadow />

      {/* Vibrant Decorative Accent Cushions */}
      <Box size={[1.2, 1.0, 0.4]} pos={[-2.7, 1.6, -2.6]} rot={[-0.1, 0.4, 0.2]} color="#f59e0b" shadow />
      <Box size={[1.2, 1.0, 0.4]} pos={[2.7, 1.6, -2.6]} rot={[-0.1, -0.4, -0.2]} color="#0ea5e9" shadow />

      {/* Modern Low Coffee Table in front */}
      <Box size={[4.2, 0.6, 2.0]} pos={[0, 0.3, 0.8]} color="#090d16" shadow />
      <Cyl r={0.2} h={0.35} pos={[-0.8, 0.75, 0.8]} color="#38bdf8" />
    </group>
  );
}

// 3. Breakfast Table Set ("Before breakfast")
export function BreakfastSet() {
  const floorTex = useMemo(() => planks("#78350f", [2, 2]), []);
  const wallTex = useMemo(() => painted("#451a03", [2, 2]), []);

  return (
    <group>
      <Box size={[20, 0.4, 16]} pos={[0, -0.2, 0]} map={floorTex} shadow />
      <Box size={[20, 12, 0.5]} pos={[0, 6, -6]} map={wallTex} />
      
      {/* Kitchen window with morning light */}
      <Box size={[4, 5, 0.1]} pos={[-3.5, 6, -5.7]} color="#fef08a" />
      <Box size={[4.2, 0.2, 0.2]} pos={[-3.5, 6, -5.6]} color="#292524" />
      <Box size={[0.2, 5.2, 0.2]} pos={[-3.5, 6, -5.6]} color="#292524" />

      {/* Dining Chair Behind Character */}
      <Box size={[1.8, 0.15, 1.8]} pos={[0, 0.8, -1.0]} color="#7c2d12" shadow />
      <Box size={[1.8, 2.2, 0.15]} pos={[0, 1.9, -1.9]} color="#7c2d12" shadow />
      <Box size={[1.6, 1.8, 0.1]} pos={[0, 1.9, -1.8]} color="#fed7aa" />
      <Cyl r={0.06} h={0.8} pos={[-0.8, 0.4, -1.8]} color="#451a03" />
      <Cyl r={0.06} h={0.8} pos={[0.8, 0.4, -1.8]} color="#451a03" />
      <Cyl r={0.06} h={0.8} pos={[-0.8, 0.4, -0.2]} color="#451a03" />
      <Cyl r={0.06} h={0.8} pos={[0.8, 0.4, -0.2]} color="#451a03" />

      {/* Dining Table in front (Low profile so character upper body & face are 100% visible) */}
      <Box size={[5.5, 0.16, 2.6]} pos={[0, 0.95, 0.6]} color="#9a3412" shadow />
      <Cyl r={0.10} h={0.95} pos={[-2.3, 0.47, -0.4]} color="#7c2d12" />
      <Cyl r={0.10} h={0.95} pos={[2.3, 0.47, -0.4]} color="#7c2d12" />
      <Cyl r={0.10} h={0.95} pos={[-2.3, 0.47, 1.6]} color="#7c2d12" />
      <Cyl r={0.10} h={0.95} pos={[2.3, 0.47, 1.6]} color="#7c2d12" />

      {/* Cereal Bowl & Mug off to the sides - zero obstruction of face */}
      <Cyl r={0.38} h={0.18} pos={[-0.9, 1.12, 0.6]} color="#f8fafc" />
      <Cyl r={0.16} h={0.24} pos={[-1.3, 1.15, 0.9]} color="#0284c7" />

      {/* Smartphone resting flat on table off to the right side */}
      <Box size={[0.42, 0.04, 0.65]} pos={[0.85, 1.05, 0.6]} color="#1e293b" />
      <Box size={[0.38, 0.02, 0.60]} pos={[0.85, 1.07, 0.6]} color="#38bdf8" />
    </group>
  );
}

// 4. Bathroom Vanity Set ("Before brushing teeth")
export function BathroomSet() {
  const tileTex = useMemo(() => painted("#0e7490", [2, 2]), []);
  const wallTex = useMemo(() => painted("#082f49", [2, 2]), []);

  return (
    <group>
      <Box size={[20, 0.4, 16]} pos={[0, -0.2, 0]} map={tileTex} shadow />
      <Box size={[20, 12, 0.5]} pos={[0, 6, -5]} map={wallTex} />

      {/* Vanity Countertop & Basin */}
      <Box size={[5.5, 1.4, 2.6]} pos={[0, 0.7, -2.4]} color="#f8fafc" shadow />
      <Box size={[2.2, 0.3, 1.4]} pos={[0, 1.5, -2.2]} color="#cbd5e1" />
      {/* Chrome faucet */}
      <Cyl r={0.06} h={0.5} pos={[0, 1.7, -2.8]} color="#94a3b8" />
      <Box size={[0.08, 0.08, 0.35]} pos={[0, 1.9, -2.6]} color="#94a3b8" />

      {/* Big Vanity Mirror with illuminated frame */}
      <Box size={[4.2, 4.8, 0.1]} pos={[0, 5.0, -4.7]} color="#e0f2fe" />
      <Box size={[4.4, 5.0, 0.05]} pos={[0, 5.0, -4.75]} color="#38bdf8" />

      {/* Phone propped beside sink faucet */}
      <Box size={[0.45, 0.75, 0.05]} pos={[1.6, 1.75, -2.2]} rot={[-0.2, -0.3, 0]} color="#1e293b" />
      <Box size={[0.4, 0.68, 0.02]} pos={[1.6, 1.75, -2.17]} rot={[-0.2, -0.3, 0]} color="#38bdf8" />
    </group>
  );
}

// 5. Exterior Window Timelapse Set ("From Outside Window: Sun changes to Moon Long Shot")
export function ExteriorWindowTimelapseSet() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // Timelapse progression across day -> sunset -> night
  // cycle: 0 (morning dawn) -> 0.35 (golden day) -> 0.65 (orange twilight sunset) -> 1.0 (midnight starry sky)
  const cycle = interpolate(t, [0, 3.6], [0, 1], { extrapolateRight: "clamp" });

  const skyColor =
    cycle < 0.32
      ? "#38bdf8"
      : cycle < 0.62
      ? "#f97316"
      : cycle < 0.8
      ? "#312e81"
      : "#030712";

  // Celestial arc: Sun rising, peaking, and dipping; Moon rising at night
  const sunX = interpolate(cycle, [0, 0.55], [-4.2, 3.8], { extrapolateRight: "clamp" });
  const sunY = interpolate(cycle, [0, 0.28, 0.55], [4.5, 7.8, 3.8], { extrapolateRight: "clamp" });
  const sunVisible = cycle < 0.6;

  const moonX = interpolate(cycle, [0.62, 1.0], [-3.0, 2.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const moonY = interpolate(cycle, [0.62, 0.82, 1.0], [3.8, 7.5, 7.0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const moonVisible = cycle >= 0.6;

  // Room interior light: Warm morning daylight, then dark room with glowing cyan phone light
  const roomLight = cycle < 0.6 ? "#fed7aa" : "#020617";
  const phoneScreenGlow = cycle >= 0.55 ? "#00f0ff" : "#38bdf8";

  return (
    <group>
      {/* Expansive Sky Backdrop */}
      <Box size={[38, 22, 0.5]} pos={[0, 8.5, -11]} color={skyColor} />

      {/* Sun with golden radiant corona */}
      {sunVisible && (
        <group position={[sunX, sunY, -10]}>
          <Cyl r={1.1} h={0.05} rot={[1.57, 0, 0]} color="#fde047" />
          <Cyl r={1.5} h={0.02} rot={[1.57, 0, 0]} color="#fef08a" />
        </group>
      )}

      {/* Drifting Clouds during daytime */}
      {cycle < 0.62 && (
        <group>
          <Box size={[4.0, 1.0, 0.2]} pos={[-4 + cycle * 4, 8.2, -9.5]} color="#ffffff" />
          <Box size={[3.2, 0.8, 0.2]} pos={[3 - cycle * 3, 7.0, -9.5]} color="#ffffff" />
        </group>
      )}

      {/* Crescent Moon & Stars during Night */}
      {moonVisible && (
        <group position={[moonX, moonY, -10]}>
          <Cyl r={0.85} h={0.05} rot={[1.57, 0, 0]} color="#fef08a" />
          {/* Subtle star points in night sky */}
          <Box size={[0.15, 0.15, 0.05]} pos={[-3.2, 1.6, 0]} color="#ffffff" />
          <Box size={[0.12, 0.12, 0.05]} pos={[2.5, 1.0, 0]} color="#ffffff" />
          <Box size={[0.18, 0.18, 0.05]} pos={[-1.5, -1.4, 0]} color="#ffffff" />
          <Box size={[0.14, 0.14, 0.05]} pos={[3.6, -0.8, 0]} color="#ffffff" />
        </group>
      )}

      {/* Exterior Apartment Building Brick/Stone Facade with Window Cutout */}
      {/* Lower Facade Wall */}
      <Box size={[24, 3.6, 1.0]} pos={[0, -0.2, -2.0]} color="#1e293b" shadow />
      {/* Left Wall Beside Window */}
      <Box size={[9.5, 8.5, 1.0]} pos={[-7.4, 5.85, -2.0]} color="#1e293b" shadow />
      {/* Right Wall Beside Window */}
      <Box size={[9.5, 8.5, 1.0]} pos={[7.4, 5.85, -2.0]} color="#1e293b" shadow />
      {/* Upper Wall Above Window */}
      <Box size={[24, 6.0, 1.0]} pos={[0, 13.1, -2.0]} color="#1e293b" shadow />

      {/* Architectural Window Sill & Frame Trim */}
      <Box size={[5.6, 0.45, 1.4]} pos={[0, 1.8, -1.7]} color="#0f172a" shadow />
      <Box size={[5.6, 0.35, 1.2]} pos={[0, 8.0, -1.7]} color="#0f172a" shadow />
      <Box size={[0.35, 6.2, 1.2]} pos={[-2.7, 4.9, -1.7]} color="#0f172a" shadow />
      <Box size={[0.35, 6.2, 1.2]} pos={[2.7, 4.9, -1.7]} color="#0f172a" shadow />
      {/* Center cross mullions */}
      <Box size={[0.16, 6.2, 0.3]} pos={[0, 4.9, -1.8]} color="#0f172a" />
      <Box size={[5.4, 0.16, 0.3]} pos={[0, 5.2, -1.8]} color="#0f172a" />

      {/* Decorative Window Flower Box on Sill */}
      <Box size={[4.4, 0.7, 0.8]} pos={[0, 1.5, -1.3]} color="#7c2d12" shadow />
      <Box size={[4.0, 0.3, 0.6]} pos={[0, 1.85, -1.3]} color="#15803d" />

      {/* Interior Room (Visible through the window aperture!) */}
      <Box size={[14, 0.4, 12]} pos={[0, 0.1, -6.0]} color="#334155" />
      <Box size={[14, 9.0, 0.5]} pos={[0, 4.8, -9.0]} color={roomLight} />

      {/* Cozy Bed Inside Room */}
      <Box size={[4.8, 3.2, 0.4]} pos={[0, 2.4, -7.5]} color="#1e293b" />
      <Box size={[4.6, 0.7, 5.5]} pos={[0, 0.8, -5.2]} color="#e2e8f0" shadow />
      {/* Bed Pillows & Cushions */}
      <Box size={[1.8, 0.9, 0.4]} pos={[-1.1, 2.0, -7.0]} rot={[-0.2, 0, 0]} color="#fed7aa" />
      <Box size={[1.8, 0.9, 0.4]} pos={[1.1, 2.0, -7.0]} rot={[-0.2, 0, 0]} color="#c7d2fe" />
      {/* Duvet blanket */}
      <Box size={[4.5, 0.5, 3.2]} pos={[0, 1.2, -4.2]} color={cycle >= 0.6 ? "#312e81" : "#4f46e5"} shadow />

      {/* Nightstand & Lamp inside room */}
      <Box size={[1.2, 1.4, 1.2]} pos={[-2.8, 0.8, -6.5]} color="#1e293b" />
      <Cyl r={0.35} h={0.5} pos={[-2.8, 1.75, -6.5]} color={cycle >= 0.6 ? "#fef08a" : "#cbd5e1"} />

      {/* Glowing Smartphone in hands casting dynamic light */}
      <pointLight position={[0, 2.2, -4.5]} intensity={cycle >= 0.55 ? 3.0 : 1.2} color={phoneScreenGlow} distance={6} />
    </group>
  );
}

// 5. Bedroom Sun-to-Moon Passing Time Timelapse Set (Cinematic Cozy Bedroom with Large Window)
export function BedTimelapseSet() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // Timelapse progression from sunrise dawn (0s) -> golden noon (1.4s) -> sunset (2.8s) -> midnight moon (4.2s)
  const cycle = interpolate(t, [0, 4.5], [0, 1], { extrapolateRight: "clamp" });
  
  // Sky color palette: sunrise gold -> blue sky -> dramatic orange sunset -> deep midnight
  const skyColor = cycle < 0.25
    ? "#fbbf24"
    : cycle < 0.55
    ? "#38bdf8"
    : cycle < 0.75
    ? "#ea580c"
    : "#020617";

  const isNight = cycle >= 0.70;
  const isSunset = cycle >= 0.52 && cycle < 0.70;
  const isMorning = cycle < 0.25;

  const roomWallColor = isNight
    ? "#090d16"
    : isSunset
    ? "#3f1a14"
    : isMorning
    ? "#2e2137"
    : "#1e1b4b";

  // Celestial arc outside window
  const sunX = interpolate(cycle, [0, 0.65], [-3.8, -1.0], { extrapolateRight: "clamp" });
  const sunY = interpolate(cycle, [0, 0.35, 0.65], [3.2, 5.8, 2.8], { extrapolateRight: "clamp" });

  const moonX = interpolate(cycle, [0.7, 1.0], [-3.2, -1.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const moonY = interpolate(cycle, [0.7, 0.85, 1.0], [2.8, 5.6, 5.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const screenGlowIntensity = isNight ? 4.8 : isSunset ? 2.6 : 1.0;

  return (
    <group>
      {/* Floor: Warm hardwood bedroom planks */}
      <Box size={[24, 0.4, 20]} pos={[0, -0.2, 0]} color="#3e2723" shadow />
      {/* Back Wall */}
      <Box size={[24, 14, 0.5]} pos={[0, 7, -6]} color={roomWallColor} />
      {/* Right Wall */}
      <Box size={[0.5, 14, 20]} pos={[6.5, 7, 0]} color={roomWallColor} />

      {/* OUTSIDE WINDOW BACKDROP */}
      <Box size={[20, 14, 0.2]} pos={[-1.2, 6.0, -8.5]} color={skyColor} />

      {/* Horizon Silhouette */}
      <Box size={[18, 2.2, 0.2]} pos={[-1.2, 2.6, -8.0]} color={isNight ? "#050b14" : isSunset ? "#1c0d0a" : "#14532d"} />
      <Cyl r={0.8} h={1.4} pos={[-2.4, 3.4, -7.8]} color={isNight ? "#06101e" : "#166534"} />
      <Cyl r={1.1} h={1.8} pos={[-0.6, 3.6, -7.8]} color={isNight ? "#06101e" : "#15803d"} />

      {/* Sun */}
      {!isNight && (
        <group position={[sunX, sunY, -7.5]}>
          <Cyl r={0.75} h={0.05} rot={[1.57, 0, 0]} color={isSunset ? "#f97316" : "#fde047"} />
          <Cyl r={1.05} h={0.02} rot={[1.57, 0, 0]} color={isSunset ? "#fdba74" : "#fef08a"} />
        </group>
      )}

      {/* Glowing Moon & Stars */}
      {isNight && (
        <group position={[moonX, moonY, -7.5]}>
          <Cyl r={0.65} h={0.05} rot={[1.57, 0, 0]} color="#fef08a" />
          <Box size={[0.08, 0.08, 0.02]} pos={[-1.2, 1.2, 0]} color="#ffffff" />
          <Box size={[0.10, 0.10, 0.02]} pos={[1.4, 0.9, 0]} color="#ffffff" />
          <Box size={[0.07, 0.07, 0.02]} pos={[-0.6, -1.0, 0]} color="#ffffff" />
          <Box size={[0.09, 0.09, 0.02]} pos={[1.0, -1.3, 0]} color="#ffffff" />
        </group>
      )}

      {/* LARGE RECTANGULAR BEDROOM WINDOW (Left side) */}
      <Box size={[4.4, 5.8, 0.25]} pos={[-1.2, 4.6, -5.9]} color="#0f172a" shadow />
      <Box size={[4.0, 5.4, 0.05]} pos={[-1.2, 4.6, -5.8]} color="rgba(255,255,255,0.02)" />
      <Box size={[0.12, 5.4, 0.2]} pos={[-1.2, 4.6, -5.75]} color="#1e293b" />
      <Box size={[4.0, 0.12, 0.2]} pos={[-1.2, 4.6, -5.75]} color="#1e293b" />
      <Box size={[4.8, 0.35, 0.6]} pos={[-1.2, 1.8, -5.6]} color="#1e293b" shadow />

      {/* Curtains */}
      <Box size={[0.7, 6.2, 0.3]} pos={[-3.3, 4.6, -5.6]} color="#f1f5f9" shadow />
      <Box size={[0.7, 6.2, 0.3]} pos={[0.9, 4.6, -5.6]} color="#f1f5f9" shadow />
      <Cyl r={0.06} h={5.2} rot={[0, 0, 1.57]} pos={[-1.2, 7.6, -5.5]} color="#0f172a" />

      {/* COZY BEDROOM FURNITURE - Lower profile so character is completely clear & seated */}
      {/* Bed Headboard */}
      <Box size={[4.4, 3.2, 0.4]} pos={[3.2, 1.6, -4.6]} color="#292524" shadow />
      {/* Bed Base */}
      <Box size={[4.2, 0.4, 5.6]} pos={[3.2, 0.2, -1.8]} color="#1c1917" shadow />
      {/* Mattress */}
      <Box size={[4.0, 0.35, 5.4]} pos={[3.2, 0.55, -1.8]} color="#f8fafc" shadow />

      {/* Pillows against headboard */}
      <Box size={[1.5, 0.8, 0.3]} pos={[2.5, 1.05, -4.2]} rot={[-0.2, 0, 0]} color="#fef3c7" shadow />
      <Box size={[1.5, 0.8, 0.3]} pos={[3.9, 1.05, -4.2]} rot={[-0.2, 0, 0]} color="#e0e7ff" shadow />

      {/* Low folded blanket on lower half only */}
      <Box size={[4.1, 0.2, 3.0]} pos={[3.2, 0.8, 0.0]} color={isNight ? "#1e1b4b" : "#4338ca"} shadow />

      {/* Nightstand & Lamp */}
      <Box size={[1.2, 0.8, 1.2]} pos={[5.6, 0.4, -4.0]} color="#292524" shadow />
      <Cyl r={0.2} h={0.5} pos={[5.6, 1.05, -4.0]} color={isNight ? "#fde047" : "#e2e8f0"} />

      {/* Lighting */}
      <directionalLight
        position={[-2.4, isNight ? 5.0 : 7.0, -4.0]}
        intensity={isNight ? 0.8 : isSunset ? 2.6 : 3.0}
        color={skyColor}
      />
      {/* Smartphone screen glow illuminating character's face in night */}
      <pointLight position={[1.6, 1.35, -2.2]} intensity={screenGlowIntensity} distance={3.8} color="#38bdf8" />
    </group>
  );
}


// 6. City Street / Commuter Sidewalk
export function CityStreetSet() {
  const sidewalkTex = useMemo(() => painted("#475569", [2, 2]), []);
  const roadTex = useMemo(() => painted("#1e293b", [2, 2]), []);
  const brickTex = useMemo(() => planks("#7c2d12", [2, 2]), []);

  return (
    <group>
      <Box size={[24, 0.4, 8]} pos={[0, -0.2, -1]} map={sidewalkTex} shadow />
      <Box size={[24, 0.25, 6]} pos={[0, -0.3, 6]} map={roadTex} />
      <Box size={[24, 14, 0.6]} pos={[0, 7, -5]} map={brickTex} />
      <Box size={[8, 5, 0.2]} pos={[-4, 3, -4.6]} color="#0284c7" />
      <Box size={[8, 0.25, 0.3]} pos={[-4, 5.6, -4.5]} color="#1e293b" />
      <Box size={[4.5, 1.2, 0.1]} pos={[5, 0.6, -2.5]} color="#334155" />
      <Cyl r={0.15} h={4.5} pos={[7, 2.25, -2.5]} color="#334155" />
      <Box size={[1.2, 0.4, 0.1]} pos={[7, 4.3, -2.5]} color="#0284c7" />
      <Lamp pos={[-2.5, 0, -1]} />
    </group>
  );
}

// 7. Neuroscience / Dopamine Synapse Laboratory
export function SynapseLabSet() {
  const darkFloor = useMemo(() => painted("#020617", [2, 2]), []);
  
  return (
    <group>
      <Box size={[24, 0.4, 18]} pos={[0, -0.2, 0]} map={darkFloor} shadow />
      <Cyl r={0.8} h={8} pos={[-4.5, 4, -4]} color="#0369a1" />
      <Cyl r={0.65} h={7.6} pos={[-4.5, 4, -4]} color="#38bdf8" />
      <Cyl r={0.8} h={8} pos={[4.5, 4, -4]} color="#701a75" />
      <Cyl r={0.65} h={7.6} pos={[4.5, 4, -4]} color="#e879f9" />

      {[-3, -1.5, 0, 1.5, 3].map((x, i) => (
        <group key={i}>
          <Cyl r={0.06} h={7} pos={[x, 4.5, -6]} rot={[0, 0, (i - 2) * 0.15]} color="#0284c7" />
          <Box size={[0.3, 0.3, 0.3]} pos={[x * 1.2, 4.2 + (i % 2) * 1.2, -5.5]} color={i % 2 === 0 ? "#38bdf8" : "#f43f5e"} />
        </group>
      ))}

      <Box size={[3.5, 1.2, 1.5]} pos={[0, 0.6, -2]} color="#0f172a" shadow />
      <Box size={[2.8, 1.2, 0.08]} pos={[0, 1.8, -1.8]} color="#0ea5e9" />
    </group>
  );
}

// 8. Scoreboard & Final Assessment Studio
export function ScoreStudioSet() {
  const floorTex = useMemo(() => planks("#0f172a", [2, 2]), []);
  const wallTex = useMemo(() => painted("#090d16", [2, 2]), []);

  return (
    <group>
      <Box size={[24, 0.4, 18]} pos={[0, -0.2, 0]} map={floorTex} shadow />
      <Box size={[24, 14, 0.5]} pos={[0, 7, -7]} map={wallTex} />
      <Cyl r={2.8} h={0.05} pos={[0, 0.02, 0]} color="#1e293b" />
      <Cyl r={2.6} h={0.06} pos={[0, 0.03, 0]} color="#0284c7" />
      {[-5, -3, 3, 5].map((x, i) => (
        <Cyl key={i} r={0.08} h={9} pos={[x, 4.5, -5]} color="#38bdf8" />
      ))}
    </group>
  );
}
