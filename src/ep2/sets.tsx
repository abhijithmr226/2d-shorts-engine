import React, { useMemo } from "react";
import * as THREE from "three";
import type { Look, V3 } from "../engine/Stage";
import { Box, Cyl, Roof, Ground, Snow, Lamp } from "../engine/kit";
import { planks, painted, roofSlate } from "../engine/tex";
import { LAYER_CHAR, LAYER_FX } from "../engine/Stage";

// --- Measured Color & Light Profiles (Lifted contrast, warm lamps, Rec.709 safe) ---
export const snowDayLook = (): Look => ({
  sun: { pos: [10, 22, 14], color: "#fff7eb", intensity: 2.2, shadow: 16 },
  hemi: { sky: "#c2dcfa", ground: "#2b2a3d", intensity: 0.8 }, // Blue-violet shadow hue ~250°
  fog: "#cde0f5",
  fogNear: 16,
  fogFar: 60,
  exposure: 1.25,
  aperture: 0.32,
  saturation: 1.05,
  ink: 0.9,
});

export const twilightLook = (): Look => ({
  sun: { pos: [14, 6, -10], color: "#ff9055", intensity: 1.7, shadow: 14 },
  hemi: { sky: "#52446e", ground: "#1a1628", intensity: 0.65 },
  fog: "#2e2444",
  fogNear: 10,
  fogFar: 45,
  exposure: 1.15,
  aperture: 0.35,
  saturation: 1.08,
  ink: 0.9,
});

export const warmCarriageLook = (): Look => ({
  sun: { pos: [4, 12, 6], color: "#ffeed6", intensity: 1.8, shadow: 10 },
  hemi: { sky: "#ffe3b8", ground: "#241a24", intensity: 0.75 },
  fog: "#1c161d",
  fogNear: 12,
  fogFar: 38,
  exposure: 1.25,
  aperture: 0.4,
  saturation: 1.05,
  ink: 0.85,
});

// Solid Pine Tree (on LAYER_CHAR so world ink edge detector doesn't create wireframe lines)
export const SolidPineTree: React.FC<{ pos: V3; scale?: number }> = ({ pos, scale = 1 }) => (
  <group position={pos} scale={[scale, scale, scale]} layers={LAYER_CHAR}>
    <Cyl r={0.24} r2={0.18} h={2.0} pos={[0, 1.0, 0]} color="#38251a" seg={16} />
    {/* Tier 1 */}
    <Cyl r={1.8} r2={0.3} h={1.8} pos={[0, 2.4, 0]} color="#1b3826" seg={18} />
    <Cyl r={1.84} r2={0.4} h={0.4} pos={[0, 2.2, 0]} color="#f2f7fc" seg={18} />
    {/* Tier 2 */}
    <Cyl r={1.4} r2={0.2} h={1.6} pos={[0, 3.5, 0]} color="#21422d" seg={18} />
    <Cyl r={1.44} r2={0.3} h={0.35} pos={[0, 3.35, 0]} color="#f2f7fc" seg={18} />
    {/* Tier 3 */}
    <Cyl r={0.95} r2={0.08} h={1.4} pos={[0, 4.5, 0]} color="#284e36" seg={18} />
    <Cyl r={0.98} r2={0.12} h={0.3} pos={[0, 4.4, 0]} color="#f2f7fc" seg={18} />
  </group>
);

// Kyu-Shirataki Station Signboard (Double-sided Japanese station plaque)
export const StationSign: React.FC<{ pos: V3; rotY?: number }> = ({ pos, rotY = 0 }) => {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 256;
    const g = c.getContext("2d")!;
    g.fillStyle = "#faf7f0";
    g.fillRect(0, 0, 512, 256);
    g.strokeStyle = "#1a1614";
    g.lineWidth = 14;
    g.strokeRect(10, 10, 492, 236);

    // Blue band
    g.fillStyle = "#1e4d8c";
    g.fillRect(17, 160, 478, 30);

    // Japanese: 旧白滝
    g.fillStyle = "#161414";
    g.font = "bold 82px sans-serif";
    g.textAlign = "center";
    g.fillText("旧 白 滝", 256, 110);

    // Romaji
    g.font = "bold 32px sans-serif";
    g.fillStyle = "#ffffff";
    g.fillText("KYŪ-SHIRATAKI", 256, 185);

    // Arrow text
    g.fillStyle = "#333333";
    g.font = "24px sans-serif";
    g.fillText("しらたき ←", 120, 226);
    g.fillText("→ かみしらたき", 380, 226);

    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  return (
    <group position={pos} rotation={[0, rotY, 0]}>
      <Box size={[0.12, 2.5, 0.12]} pos={[-0.95, 1.25, 0]} color="#4a3628" />
      <Box size={[0.12, 2.5, 0.12]} pos={[0.95, 1.25, 0]} color="#4a3628" />
      <mesh position={[0, 1.85, 0.04]} castShadow>
        <planeGeometry args={[2.0, 1.0]} />
        <meshStandardMaterial map={tex} roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
      <Box size={[2.08, 1.08, 0.06]} pos={[0, 1.85, 0]} color="#38281e" />
    </group>
  );
};

// Wooden Station Waiting Shed (Real Kyū-Shirataki hut)
export const StationHut: React.FC<{
  pos?: V3;
  rotY?: number;
  closedTape?: boolean;
}> = ({ pos = [0, 0, 0], rotY = 0, closedTape = false }) => {
  const wallWood = useMemo(() => planks("#523e30", [1, 1], true), []);
  const roofWood = useMemo(() => roofSlate("#383d48", [1.5, 1]), []);

  return (
    <group position={pos} rotation={[0, rotY, 0]}>
      {/* Foundation concrete slab */}
      <Box size={[5.2, 0.4, 3.2]} pos={[0, 0.2, 0]} color="#7a808a" />

      {/* Wooden walls */}
      <Box size={[5.0, 2.8, 3.0]} pos={[0, 1.8, 0]} map={wallWood} />

      {/* Front open entrance */}
      <Box size={[1.4, 2.1, 0.1]} pos={[0.8, 1.45, 1.51]} color="#1a1412" />
      <Box size={[0.12, 2.2, 0.15]} pos={[0.05, 1.5, 1.52]} color="#38261a" />
      <Box size={[0.12, 2.2, 0.15]} pos={[1.55, 1.5, 1.52]} color="#38261a" />
      <Box size={[1.6, 0.12, 0.15]} pos={[0.8, 2.6, 1.52]} color="#38261a" />

      {/* Station Window */}
      <group position={[-1.3, 1.75, 1.51]}>
        <Box size={[1.1, 1.1, 0.06]} color="#241a14" />
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[0.9, 0.9]} />
          <meshStandardMaterial
            color="#ffe294"
            emissive="#ffaf38"
            emissiveIntensity={1.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Pitched Roof */}
      <Roof w={5.4} d={3.4} h={1.65} pos={[0, 3.22, 0]} over={0.3} map={roofWood} />
      {/* Snow on roof */}
      <Roof w={5.46} d={3.46} h={1.66} pos={[0, 3.28, 0]} over={0.32} color="#f4f8fe" />

      {/* Warm Glowing Entrance Lantern */}
      <group position={[0.3, 2.45, 1.62]}>
        <Box size={[0.24, 0.36, 0.24]} color="#1f1e24" />
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.18, 0.28, 0.18]} />
          <meshStandardMaterial color="#ffe699" emissive="#ffaa33" emissiveIntensity={3.2} />
        </mesh>
        <pointLight position={[0, -0.1, 0.3]} intensity={35} distance={12} color="#ffb85c" />
      </group>

      {/* Closed tape across doorway */}
      {closedTape ? (
        <group position={[0.8, 1.45, 1.56]}>
          <Box size={[1.6, 0.14, 0.02]} pos={[0, 0.3, 0]} rot={[0, 0, -0.16]} color="#f0d024" />
          <Box size={[1.6, 0.14, 0.02]} pos={[0, -0.2, 0]} rot={[0, 0, 0.18]} color="#f0d024" />
        </group>
      ) : null}
    </group>
  );
};

// Railway Tracks with ballast bed & steel rails
export const RailwayTracks: React.FC<{ length?: number; pos?: V3 }> = ({ length = 80, pos = [0, 0, 0] }) => {
  const sleepers = useMemo(() => {
    const list: JSX.Element[] = [];
    const count = Math.floor(length / 0.85);
    for (let i = -count / 2; i <= count / 2; i++) {
      list.push(
        <Box
          key={i}
          size={[2.2, 0.15, 0.32]}
          pos={[0, 0.075, i * 0.85]}
          color="#38261c"
          shadow={false}
        />
      );
    }
    return list;
  }, [length]);

  return (
    <group position={pos}>
      {/* Gravel ballast */}
      <Box size={[3.0, 0.15, length]} pos={[0, 0.05, 0]} color="#4a4c56" shadow />
      {sleepers}
      {/* Rails (standard 1.067m Japanese Cape gauge) */}
      <Box size={[0.09, 0.16, length]} pos={[-0.53, 0.22, 0]} color="#98a2ad" />
      <Box size={[0.09, 0.16, length]} pos={[0.53, 0.22, 0]} color="#98a2ad" />
    </group>
  );
};

// Japanese KiHa 40 Single-Car Railcar (With detailed bogies, cab face, AC units, zero clipping)
export const JapaneseTrain: React.FC<{
  pos?: V3;
  rotY?: number;
  lightsOn?: boolean;
}> = ({ pos = [0, 0, 0], rotY = 0, lightsOn = true }) => {
  return (
    <group position={pos} rotation={[0, rotY, 0]}>
      {/* Bogies (Trucks) with steel wheel cylinders */}
      {[-4.5, 4.5].map((z, i) => (
        <group key={i} position={[0, 0.35, z]}>
          <Box size={[2.1, 0.4, 3.2]} color="#181a20" />
          {/* 4 Wheels */}
          {[-1.0, 1.0].map((wz, j) => (
            <React.Fragment key={j}>
              <Cyl r={0.42} h={0.16} pos={[-0.85, 0.05, wz]} rot={[Math.PI / 2, 0, 0]} color="#50545c" />
              <Cyl r={0.42} h={0.16} pos={[0.85, 0.05, wz]} rot={[Math.PI / 2, 0, 0]} color="#50545c" />
            </React.Fragment>
          ))}
        </group>
      ))}

      {/* Carriage Body: Width 2.3m, Height 2.8m, Length 14m (stops well short of platform edge at 1.6m!) */}
      <Box size={[2.3, 2.7, 14]} pos={[0, 2.05, 0]} color="#f4f6fa" />
      {/* JR Hokkaido Livery: Dark Green & Red horizontal stripes */}
      <Box size={[2.32, 0.32, 14]} pos={[0, 1.15, 0]} color="#2d7845" />
      <Box size={[2.32, 0.12, 14]} pos={[0, 0.88, 0]} color="#c42820" />

      {/* Roof & Air-Conditioning vents */}
      <Cyl r={1.22} h={14} pos={[0, 3.15, 0]} rot={[Math.PI / 2, 0, 0]} color="#858c96" />
      <Box size={[1.1, 0.35, 3.5]} pos={[0, 3.65, -1.5]} color="#646a74" />
      <Box size={[1.1, 0.35, 3.5]} pos={[0, 3.65, 3.0]} color="#646a74" />

      {/* Passenger Windows (Side facing platform) */}
      {[-4.5, -2.5, -0.5, 1.5, 3.5].map((z, idx) => (
        <group key={idx}>
          <Box size={[0.08, 1.0, 1.4]} pos={[1.16, 2.15, z]} color="#1a1c22" />
          <mesh position={[1.17, 2.15, z]}>
            <planeGeometry args={[1.3, 0.9]} />
            <meshStandardMaterial
              color="#ffdf94"
              emissive="#ffa832"
              emissiveIntensity={1.8}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}

      {/* Front Cab Face at +z */}
      <group position={[0, 2.05, 7.02]}>
        <Box size={[0.85, 0.85, 0.08]} pos={[-0.55, 0.3, 0]} color="#1c2430" />
        <Box size={[0.85, 0.85, 0.08]} pos={[0.55, 0.3, 0]} color="#1c2430" />
        <Box size={[0.7, 1.9, 0.06]} pos={[0, -0.2, 0]} color="#2d7845" />

        {/* Powerful Twin Headlights */}
        {[-0.75, 0.75].map((x, i) => (
          <group key={i} position={[x, -0.45, 0.05]}>
            <Cyl r={0.18} h={0.12} rot={[Math.PI / 2, 0, 0]} color="#222" />
            <mesh position={[0, 0, 0.07]}>
              <circleGeometry args={[0.16, 16]} />
              <meshStandardMaterial color="#ffffff" emissive="#fff9e6" emissiveIntensity={lightsOn ? 5 : 0} />
            </mesh>
            {lightsOn ? (
              <spotLight
                position={[0, 0, 0.1]}
                target-position={[x, -0.45, 25]}
                angle={0.45}
                penumbra={0.5}
                intensity={90}
                color="#fff8db"
                distance={40}
              />
            ) : null}
          </group>
        ))}
      </group>
    </group>
  );
};

// Full Snowy Platform Set (Clean framing: tracks at 0, platform at 1.6-5.6, hut at 7.2)
export const SnowyStationSet: React.FC<{
  children?: React.ReactNode;
  snowing?: boolean;
  trainZ?: number;
  closedTape?: boolean;
  night?: boolean;
}> = ({ children, snowing = true, trainZ, closedTape = false, night = false }) => {
  const snowGround = useMemo(() => painted("#edf3fb", [2, 2], 200), []);

  return (
    <group>
      {/* Snowy Ground */}
      <Ground map={snowGround} size={160} y={0} />

      {/* Solid Pine Trees in background (no wireframe lines) */}
      <group position={[0, 0, -25]}>
        <SolidPineTree pos={[-14, 0, 0]} scale={1.8} />
        <SolidPineTree pos={[-8, 0, -3]} scale={2.2} />
        <SolidPineTree pos={[6, 0, -2]} scale={2.0} />
        <SolidPineTree pos={[14, 0, 1]} scale={1.7} />
        <SolidPineTree pos={[20, 0, -4]} scale={2.3} />
      </group>

      {/* Tracks */}
      <RailwayTracks length={100} pos={[0, 0, 0]} />

      {/* Safe Raised Platform: X from 1.6 to 5.6 (width 4.0, center 3.6), height 0.4 */}
      <Box size={[4.0, 0.4, 32]} pos={[3.6, 0.2, 0]} color="#6a707c" shadow />
      <Box size={[3.95, 0.06, 31.8]} pos={[3.6, 0.43, 0]} color="#f2f6fc" shadow />

      {/* Station Hut: Set back at X = 7.2 (away from platform walking zone & camera!) */}
      <StationHut pos={[7.2, 0.43, -1.0]} rotY={Math.PI / 2} closedTape={closedTape} />

      {/* Signboard on the platform */}
      <StationSign pos={[4.2, 0.43, 4.5]} rotY={Math.PI / 2} />

      {/* Warm Platform Lamp */}
      <Lamp pos={[4.2, 0.43, -6.5]} light={42} />

      {/* Arriving Train if specified */}
      {trainZ !== undefined ? <JapaneseTrain pos={[0, 0, trainZ]} lightsOn={true} /> : null}

      {/* Snow Particles */}
      {snowing ? <Snow count={260} area={[28, 16, 30]} center={[0, 8, 0]} /> : null}

      {children}
    </group>
  );
};

// Train Interior Set (Tight carriage framing, plush green seats, windows looking out at snow)
export const TrainInteriorSet: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <group>
      {/* Floor */}
      <Box size={[5.2, 0.2, 18]} pos={[0, 0, 0]} color="#3e424a" />
      {/* Ceiling */}
      <Box size={[5.2, 0.2, 18]} pos={[0, 3.4, 0]} color="#f4f5f8" />
      {[-5, -1.5, 2, 5.5].map((z, i) => (
        <mesh key={i} position={[0, 3.28, z]}>
          <boxGeometry args={[1.2, 0.06, 2.0]} />
          <meshStandardMaterial color="#fffbe8" emissive="#ffd98a" emissiveIntensity={2.0} />
        </mesh>
      ))}

      {/* Left Wall with Windows */}
      <Box size={[0.2, 3.4, 18]} pos={[-2.5, 1.7, 0]} color="#e8eaee" />
      {[-4, 0, 4].map((z, i) => (
        <group key={i} position={[-2.38, 1.8, z]}>
          <mesh>
            <planeGeometry args={[0.1, 1.4, 2.6]} />
            <meshStandardMaterial
              color="#b8d6f8"
              emissive="#84b2e8"
              emissiveIntensity={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}

      {/* Right Wall */}
      <Box size={[0.2, 3.4, 18]} pos={[2.5, 1.7, 0]} color="#e8eaee" />

      {/* Plush Green Seats (Aligned with passenger seating, zero camera occlusion) */}
      {[0, -2.2, -4.4].map((z, i) => (
        <group key={i}>
          {/* Left seat */}
          <Box size={[0.9, 0.32, 1.3]} pos={[-1.6, 0.18, z]} color="#2a7545" />
          <Box size={[0.12, 0.65, 1.3]} pos={[-2.1, 0.60, z]} color="#215e37" />
          {/* Right seat */}
          <Box size={[0.9, 0.32, 1.3]} pos={[1.6, 0.18, z]} color="#2a7545" />
          <Box size={[0.12, 0.65, 1.3]} pos={[2.1, 0.60, z]} color="#215e37" />
        </group>
      ))}

      {children}
    </group>
  );
};

// Kana's Cozy Morning Bedroom Set
export const BedroomSet: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <group>
      <Box size={[8, 0.2, 8]} pos={[0, 0, 0]} color="#c29b68" />
      <Box size={[8, 4, 0.2]} pos={[0, 2, -4]} color="#f7f4ea" />
      <mesh position={[-1.5, 2.2, -3.88]}>
        <planeGeometry args={[2.0, 2.0]} />
        <meshStandardMaterial color="#fff4d4" emissive="#ffd680" emissiveIntensity={1.8} />
      </mesh>
      {/* Futon Bed */}
      <Box size={[2.4, 0.25, 4.0]} pos={[1.2, 0.15, -0.5]} color="#eae6de" />
      <Box size={[2.5, 0.35, 2.8]} pos={[1.2, 0.35, 0.2]} color="#4a709c" />
      <Box size={[1.4, 0.2, 0.8]} pos={[1.2, 0.32, -1.8]} color="#fefefe" />
      {/* Bedside table & clock */}
      <Box size={[0.9, 0.8, 0.9]} pos={[-1.0, 0.4, -1.8]} color="#7a5438" />
      <Cyl r={0.2} h={0.15} pos={[-1.0, 0.9, -1.8]} rot={[Math.PI / 2, 0, 0]} color="#c4302b" />
      {children}
    </group>
  );
};
