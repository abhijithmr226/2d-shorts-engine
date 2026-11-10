import React, { useMemo } from "react";
import * as THREE from "three";
import { useCurrentFrame, useVideoConfig, interpolate, staticFile } from "remotion";
import type { Look } from "../engine/Stage";
import { Box, Cyl } from "../engine/kit";

// ==========================================
// LOOK DEFINITIONS
// ==========================================

// 1. Hook & Money Look: Dark navy, gold floor reflection, luxury corporate scale
export const hookLook = (): Look => ({
  sun: { pos: [6, 18, 10], color: "#fef08a", intensity: 2.8, shadow: 18 },
  hemi: { sky: "#eab308", ground: "#020617", intensity: 0.65 },
  fog: "#020617",
  fogNear: 16,
  fogFar: 50,
  exposure: 1.3,
  aperture: 0.35,
  saturation: 1.28,
  ink: 0.82,
});

// 2. Vintage 1950s Look: Warm cream, faded red, mustard yellow, vintage road brown
export const vintageLook = (): Look => ({
  sun: { pos: [-8, 16, 9], color: "#fef3c7", intensity: 2.5, shadow: 15 },
  hemi: { sky: "#fde047", ground: "#292524", intensity: 0.58 },
  fog: "#292524",
  fogNear: 15,
  fogFar: 46,
  exposure: 1.24,
  aperture: 0.32,
  saturation: 1.1,
  ink: 0.85,
});

// 3. Modern City & Restaurant Look: Bright red, golden yellow, green lawn, clear blue sky
export const modernLook = (): Look => ({
  sun: { pos: [8, 22, 12], color: "#ffffff", intensity: 2.6, shadow: 18 },
  hemi: { sky: "#38bdf8", ground: "#1e293b", intensity: 0.7 },
  fog: "#0f172a",
  fogNear: 18,
  fogFar: 55,
  exposure: 1.26,
  aperture: 0.3,
  saturation: 1.25,
  ink: 0.88,
});

// 4. Strategic Business & Real Estate Look: Deep navy, emerald green, gold accents
export const businessLook = (): Look => ({
  sun: { pos: [5, 18, 8], color: "#fef08a", intensity: 2.4, shadow: 15 },
  hemi: { sky: "#059669", ground: "#0f172a", intensity: 0.55 },
  fog: "#090d16",
  fogNear: 15,
  fogFar: 46,
  exposure: 1.22,
  aperture: 0.34,
  saturation: 1.22,
  ink: 0.88,
});

// 5. Global Empire & Brand Look: Vast dark navy space, glowing globe, premium gold lines
export const globalLook = (): Look => ({
  sun: { pos: [0, 20, 10], color: "#fef08a", intensity: 2.9, shadow: 18 },
  hemi: { sky: "#1e1b4b", ground: "#020617", intensity: 0.65 },
  fog: "#020617",
  fogNear: 20,
  fogFar: 60,
  exposure: 1.32,
  aperture: 0.32,
  saturation: 1.3,
  ink: 0.82,
});

// ==========================================
// 3D ARCHITECTURAL COMPONENTS
// ==========================================

/**
 * Authentic 3D Symmetrical Golden Arches 'M' Logo
 * Constructed via precision 2D curve extrusion for smooth, official parabolic geometry
 */
export function GoldenArches3D({
  scale = 1,
  pos = [0, 0, 0],
  rot = [0, 0, 0],
}: {
  scale?: number;
  pos?: [number, number, number];
  rot?: [number, number, number];
}) {
  const geo = useMemo(() => {
    const s = new THREE.Shape();
    const W = 0.85, H = 1.15, T = 0.20, C = 0.32;
    // Outer boundary
    s.moveTo(-W, 0);
    s.bezierCurveTo(-W, H * 0.95, -W * 0.5, H, -W * 0.5, H);
    s.bezierCurveTo(-W * 0.2, H, 0, C * 1.1, 0, C);
    s.bezierCurveTo(0, C * 1.1, W * 0.2, H, W * 0.5, H);
    s.bezierCurveTo(W * 0.5, H, W, H * 0.95, W, 0);
    // Inner cutout
    s.lineTo(W - T, 0);
    s.bezierCurveTo(W - T, H * 0.78, W * 0.5, H - T, W * 0.5, H - T);
    s.bezierCurveTo(W * 0.2, H - T, 0.08, C + T, 0, C + T);
    s.bezierCurveTo(-0.08, C + T, -W * 0.2, H - T, -W * 0.5, H - T);
    s.bezierCurveTo(-W * 0.5, H - T, -W + T, H * 0.78, -W + T, 0);
    s.closePath();

    return new THREE.ExtrudeGeometry(s, {
      depth: 0.16,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.03,
      bevelSegments: 3,
    });
  }, []);

  return (
    <group position={pos} rotation={rot} scale={[scale, scale, scale]}>
      <mesh geometry={geo} castShadow receiveShadow>
        <meshStandardMaterial
          color="#ffc72c"
          emissive="#d97706"
          emissiveIntensity={0.5}
          roughness={0.25}
          metalness={0.4}
        />
      </mesh>
      {/* Golden halo light */}
      <pointLight position={[0, 0.6, 0.4]} intensity={2.0} distance={4.0} color="#ffc72c" />
    </group>
  );
}

/**
 * Tall Freestanding Roadside Pylon Sign with Golden Arches and Brand Badge
 */
export function RoadsidePylonSign({
  pos = [0, 0, 0],
  scale = 1,
}: {
  pos?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={pos} scale={[scale, scale, scale]}>
      {/* Concrete pedestal base */}
      <Box size={[1.4, 0.4, 1.4]} pos={[0, 0.2, 0]} color="#475569" shadow />
      {/* Twin tall steel pylon columns */}
      <Box size={[0.22, 5.0, 0.22]} pos={[-0.45, 2.7, 0]} color="#1e293b" shadow />
      <Box size={[0.22, 5.0, 0.22]} pos={[0.45, 2.7, 0]} color="#1e293b" shadow />

      {/* Red illuminated brand box header */}
      <Box size={[2.2, 1.6, 0.45]} pos={[0, 5.2, 0]} color="#dc2626" shadow />
      <Box size={[2.0, 1.4, 0.48]} pos={[0, 5.2, 0]} color="#b91c1c" />

      {/* Prominent Golden Arches on Sign */}
      <group position={[0, 4.75, 0.26]}>
        <GoldenArches3D scale={0.7} pos={[0, 0, 0]} />
      </group>

      {/* Lower white LED message board */}
      <Box size={[2.0, 0.5, 0.42]} pos={[0, 3.9, 0]} color="#f8fafc" />
      <Box size={[1.8, 0.12, 0.45]} pos={[0, 3.9, 0]} color="#0f172a" />

      {/* Sign illumination */}
      <pointLight position={[0, 5.2, 0.8]} intensity={3.0} distance={5.0} color="#fef08a" />
    </group>
  );
}

/**
 * Full Modern Architectural McDonald's Restaurant Building & Landscaped Lot
 */
export function ModernMcDonaldsBuilding({
  pos = [0, 0, 0],
  scale = 1,
  showPylon = true,
}: {
  pos?: [number, number, number];
  scale?: number;
  showPylon?: boolean;
}) {
  return (
    <group position={pos} scale={[scale, scale, scale]}>
      {/* 1. Asphalt Ground Lot with Road Markings */}
      <Box size={[16, 0.3, 14]} pos={[0, -0.15, 0]} color="#1e293b" shadow />
      {/* Concrete Sidewalk & Curb */}
      <Box size={[13, 0.25, 9.5]} pos={[0, 0.12, 0]} color="#94a3b8" shadow />
      <Box size={[12.6, 0.08, 9.1]} pos={[0, 0.28, 0]} color="#cbd5e1" />

      {/* Yellow Parking Stall Lines */}
      <Box size={[0.1, 0.02, 3.2]} pos={[-4.5, 0.33, 3.8]} color="#facc15" />
      <Box size={[0.1, 0.02, 3.2]} pos={[-2.5, 0.33, 3.8]} color="#facc15" />
      <Box size={[0.1, 0.02, 3.2]} pos={[-0.5, 0.33, 3.8]} color="#facc15" />
      <Box size={[0.1, 0.02, 3.2]} pos={[1.5, 0.33, 3.8]} color="#facc15" />

      {/* Landscaped Green Lawn Strips & Manicured Hedges */}
      <Box size={[11.8, 0.15, 1.2]} pos={[0, 0.35, -3.8]} color="#15803d" />
      <Box size={[1.2, 0.15, 6.0]} pos={[-5.6, 0.35, 0]} color="#15803d" />
      <Box size={[1.2, 0.15, 6.0]} pos={[5.6, 0.35, 0]} color="#15803d" />

      {/* Stylised Hedges */}
      <Box size={[2.2, 0.5, 0.6]} pos={[-4.2, 0.55, 1.4]} color="#166534" shadow />
      <Box size={[2.2, 0.5, 0.6]} pos={[4.2, 0.55, 1.4]} color="#166534" shadow />

      {/* 2. Main Architectural Building Body */}
      {/* Dark Slate Grey Lower Shell */}
      <Box size={[8.4, 3.2, 6.0]} pos={[0, 1.8, -0.6]} color="#1e293b" shadow />

      {/* Warm Timber Slat McCafé Accent Wall */}
      <Box size={[3.2, 3.2, 6.05]} pos={[2.5, 1.8, -0.6]} color="#b45309" shadow />
      {/* Vertical Slat lines */}
      {[-1.2, -0.6, 0, 0.6, 1.2].map((ox, i) => (
        <Box key={i} size={[0.08, 3.2, 0.05]} pos={[2.5 + ox, 1.8, 2.45]} color="#78350f" />
      ))}

      {/* Iconic Red Cantilever Fascia Ribbon Wrapping Front & Roof */}
      <Box size={[9.2, 0.75, 6.6]} pos={[0, 3.45, -0.5]} color="#dc2626" shadow />
      <Box size={[9.4, 0.15, 6.8]} pos={[0, 3.85, -0.5]} color="#f8fafc" />
      <Box size={[5.4, 1.1, 0.25]} pos={[-1.2, 3.2, 2.85]} color="#dc2626" shadow />

      {/* 3. Golden Arches Mounted Centrally on the Red Fascia */}
      <group position={[-1.2, 2.85, 3.0]}>
        <GoldenArches3D scale={0.72} pos={[0, 0, 0]} />
      </group>

      {/* 4. Large Panoramic Glass Front & Entrance Doors */}
      <Box size={[4.8, 2.1, 0.15]} pos={[-1.4, 1.35, 2.42]} color="#0284c7" />
      {/* Glass reflections & frames */}
      <Box size={[4.8, 0.08, 0.2]} pos={[-1.4, 2.42, 2.44]} color="#e2e8f0" />
      <Box size={[4.8, 0.08, 0.2]} pos={[-1.4, 0.32, 2.44]} color="#e2e8f0" />
      <Box size={[0.08, 2.1, 0.2]} pos={[-1.4, 1.35, 2.44]} color="#e2e8f0" />
      {/* Double Entry Door Handles */}
      <Box size={[0.05, 0.5, 0.1]} pos={[-1.5, 1.35, 2.52]} color="#ffffff" />
      <Box size={[0.05, 0.5, 0.1]} pos={[-1.3, 1.35, 2.52]} color="#ffffff" />

      {/* Warm Interior Glow Lighting */}
      <pointLight position={[-1.4, 1.8, 1.2]} intensity={3.5} distance={5.5} color="#fed7aa" />

      {/* 5. Outdoor Dining Patio Area */}
      <group position={[3.8, 0.28, 2.4]}>
        {/* Patio Umbrella */}
        <Cyl r={0.06} h={2.2} pos={[0, 1.1, 0]} color="#94a3b8" />
        <Cyl r={1.1} r2={0.1} h={0.4} pos={[0, 2.1, 0]} color="#dc2626" shadow />
        {/* Round Table & Chairs */}
        <Cyl r={0.45} h={0.7} pos={[0, 0.35, 0]} color="#f8fafc" shadow />
        <Cyl r={0.2} h={0.45} pos={[-0.65, 0.22, 0]} color="#1e293b" />
        <Cyl r={0.2} h={0.45} pos={[0.65, 0.22, 0]} color="#1e293b" />
      </group>

      {/* 6. Freestanding Roadside Pylon Sign on Corner */}
      {showPylon && (
        <group position={[-5.2, 0.12, 3.8]}>
          <RoadsidePylonSign scale={0.75} />
        </group>
      )}

      {/* Modern Streetlight */}
      <group position={[5.4, 0.12, 4.0]}>
        <Cyl r={0.08} h={4.2} pos={[0, 2.1, 0]} color="#334155" />
        <Box size={[0.8, 0.15, 0.3]} pos={[-0.3, 4.15, 0]} color="#1e293b" />
        <pointLight position={[-0.4, 4.0, 0]} intensity={3.5} distance={8.0} color="#ffedd5" />
      </group>
    </group>
  );
}

// ==========================================
// SCENE-SPECIFIC 3D SETS
// ==========================================

/**
 * 1. The $10 Billion Hook Set (Shot 1 & Shot 17)
 * Dark navy luxury showcase with rolling gold coins, illuminated restaurant model, and golden light
 */
export function GoldenHookSet({
  coinProgress = 0,
  revealNumbers = false,
}: {
  coinProgress?: number;
  revealNumbers?: boolean;
}) {
  return (
    <group>
      {/* Luxury Dark Navy Floor with Subtle Specular Sheen */}
      <Box size={[24, 0.4, 20]} pos={[0, -0.2, 0]} color="#020617" shadow />

      {/* Elevated Polished Podium */}
      <Cyl r={5.2} h={0.3} pos={[0, 0.15, 0]} color="#0f172a" shadow />
      <Cyl r={5.3} h={0.06} pos={[0, 0.31, 0]} color="#eab308" />

      {/* Centerpiece Modern Branded Restaurant */}
      <group position={[0, 0.32, -0.5]}>
        <ModernMcDonaldsBuilding scale={0.62} showPylon={false} />
      </group>

      {/* Dynamic Animated Gold Coins rolling into foreground */}
      <group position={[-1.2 + coinProgress * 1.2, 0.6, 2.8 - coinProgress * 0.8]} rotation={[0.4, coinProgress * 6, 0.2]}>
        <Cyl r={0.55} h={0.12} color="#facc15" shadow />
      </group>
      <group position={[1.4, 0.5, 2.2]} rotation={[-0.3, 0.8, 0.6]}>
        <Cyl r={0.48} h={0.1} color="#eab308" shadow />
      </group>
      <group position={[-2.2, 0.4, 1.6]} rotation={[0.5, -0.4, 0.1]}>
        <Cyl r={0.42} h={0.09} color="#facc15" shadow />
      </group>

      {/* Gold Rim & Spotlight */}
      <pointLight position={[0, 4.5, 2.0]} intensity={4.5} distance={10.0} color="#fef08a" />
      <pointLight position={[-3, 2.0, -1.0]} intensity={2.5} distance={6.0} color="#eab308" />
    </group>
  );
}

/**
 * 2. 1954 Vintage San Bernardino Drive-In Set (Shots 3, 4, 5)
 * Authentic 1950s roadside drive-in with twin giant arches through the roof,
 * vintage cars, telephone poles, and the 1953 Speedee roadside sign
 */
export function Vintage1954DriveInSet({
  carX = 0,
  carDoorOpen = false,
}: {
  carX?: number;
  carDoorOpen?: boolean;
}) {
  return (
    <group>
      {/* 1950s Road Asphalt & Sandy Shoulder */}
      <Box size={[28, 0.3, 18]} pos={[0, -0.15, 0]} color="#292524" shadow />
      {/* Road Pavement with Vintage Yellow Center Stripe */}
      <Box size={[28, 0.1, 7.0]} pos={[0, 0.05, 4.5]} color="#1c1917" />
      <Box size={[28, 0.02, 0.2]} pos={[0, 0.12, 4.5]} color="#eab308" />

      {/* Concrete Curb & Drive-in Apron */}
      <Box size={[20, 0.2, 8.5]} pos={[0, 0.1, -3.5]} color="#d6d3d1" shadow />

      {/* Historic 1950s Octagonal/Rectangular Drive-In Building */}
      {/* Red & White Striped Lower Tiled Body */}
      <Box size={[8.2, 0.8, 5.4]} pos={[0, 0.6, -4.5]} color="#dc2626" shadow />
      <Box size={[8.2, 1.8, 5.2]} pos={[0, 1.9, -4.5]} color="#fffbeb" shadow />

      {/* Slanted 1950s Glass Order Counter Windows */}
      <Box size={[7.2, 1.3, 0.15]} pos={[0, 1.85, -1.85]} color="#bae6fd" />
      <Box size={[7.4, 0.12, 0.3]} pos={[0, 1.15, -1.8]} color="#94a3b8" />

      {/* Slanted 1950s Cantilever Wedge Canopy */}
      <Box size={[9.2, 0.35, 6.2]} pos={[0, 3.0, -4.2]} rot={[0.12, 0, 0]} color="#fef08a" shadow />

      {/* THE TWO GIANT HISTORIC 1953 YELLOW ARCHES (Flanking through the roof!) */}
      <group position={[-3.6, 2.5, -4.2]} rotation={[0, 0, -0.08]}>
        <Cyl r={2.0} r2={1.9} h={0.35} rot={[0, 0, 1.57]} color="#facc15" />
        <pointLight position={[0, 1.5, 0.4]} intensity={2.0} distance={4.0} color="#facc15" />
      </group>
      <group position={[3.6, 2.5, -4.2]} rotation={[0, 0, 0.08]}>
        <Cyl r={2.0} r2={1.9} h={0.35} rot={[0, 0, 1.57]} color="#facc15" />
        <pointLight position={[0, 1.5, 0.4]} intensity={2.0} distance={4.0} color="#facc15" />
      </group>

      {/* Vintage 1953 Speedee Roadside Sign */}
      <group position={[-6.2, 0.1, 1.2]}>
        {/* Steel Signpost */}
        <Cyl r={0.15} h={5.0} pos={[0, 2.5, 0]} color="#44403c" />
        {/* Vintage Sign Frame */}
        <Box size={[2.4, 1.8, 0.3]} pos={[0, 4.6, 0]} color="#dc2626" shadow />
        <Box size={[2.2, 1.6, 0.32]} pos={[0, 4.6, 0]} color="#fffbeb" />
        {/* 15¢ Hamburger Sub-badge */}
        <Box size={[1.6, 0.5, 0.35]} pos={[0, 3.4, 0]} color="#eab308" />
        <pointLight position={[0, 4.6, 0.6]} intensity={2.5} distance={4.0} color="#fef08a" />
      </group>

      {/* Ray Kroc's 1950s Blue Two-Tone Sedan Car */}
      <group position={[-3.5 + carX, 0.6, 2.4]} rotation={[0, 0.08, 0]}>
        {/* Car Lower Chassis & Fenders */}
        <Box size={[3.8, 0.75, 1.8]} pos={[0, 0.15, 0]} color="#0369a1" shadow />
        {/* Cream Roof Cab */}
        <Box size={[2.1, 0.65, 1.5]} pos={[-0.2, 0.8, 0]} color="#fef9c3" />
        {/* Chrome Grille & Bumpers */}
        <Box size={[0.2, 0.3, 1.6]} pos={[1.9, 0.1, 0]} color="#e2e8f0" />
        <Box size={[0.2, 0.3, 1.6]} pos={[-1.9, 0.1, 0]} color="#e2e8f0" />
        {/* Whitewall Tires & Hubcaps */}
        <Cyl r={0.38} h={0.25} rot={[1.57, 0, 0]} pos={[1.1, -0.08, 0.92]} color="#0f172a" />
        <Cyl r={0.22} h={0.28} rot={[1.57, 0, 0]} pos={[1.1, -0.08, 0.92]} color="#e2e8f0" />
        <Cyl r={0.38} h={0.25} rot={[1.57, 0, 0]} pos={[-1.1, -0.08, 0.92]} color="#0f172a" />
        <Cyl r={0.22} h={0.28} rot={[1.57, 0, 0]} pos={[-1.1, -0.08, 0.92]} color="#e2e8f0" />
        <Cyl r={0.38} h={0.25} rot={[1.57, 0, 0]} pos={[1.1, -0.08, -0.92]} color="#0f172a" />
        <Cyl r={0.22} h={0.28} rot={[1.57, 0, 0]} pos={[1.1, -0.08, -0.92]} color="#e2e8f0" />
        <Cyl r={0.38} h={0.25} rot={[1.57, 0, 0]} pos={[-1.1, -0.08, -0.92]} color="#0f172a" />
        <Cyl r={0.22} h={0.28} rot={[1.57, 0, 0]} pos={[-1.1, -0.08, -0.92]} color="#e2e8f0" />

        {/* Milkshake Machine Catalogue on Passenger Seat */}
        <Box size={[0.4, 0.05, 0.5]} pos={[0.3, 0.6, -0.4]} color="#fef08a" />

        {/* Driver Door (Can open when carDoorOpen is true) */}
        {carDoorOpen && (
          <Box size={[0.9, 0.6, 0.08]} pos={[-0.3, 0.45, 1.25]} rot={[0, -0.6, 0]} color="#0284c7" />
        )}
      </group>

      {/* Vintage Wooden Telephone Pole & Crossbars */}
      <group position={[7.5, 0.1, 2.0]}>
        <Cyl r={0.16} h={8.0} pos={[0, 4.0, 0]} color="#573a24" />
        <Box size={[2.2, 0.15, 0.15]} pos={[0, 7.2, 0]} color="#442a18" />
        <Cyl r={0.06} h={0.2} pos={[-0.8, 7.4, 0]} color="#22c55e" />
        <Cyl r={0.06} h={0.2} pos={[0, 7.4, 0]} color="#22c55e" />
        <Cyl r={0.06} h={0.2} pos={[0.8, 7.4, 0]} color="#22c55e" />
      </group>
    </group>
  );
}

/**
 * 3. The Speedee System Assembly Line Kitchen Set (Shot 6)
 * Checkered floor, stainless steel grills with sizzling patties, fryers, condiment dispensers,
 * and heat lamps
 */
export function SpeedeeKitchenSet() {
  return (
    <group>
      {/* Checkered Commercial Kitchen Floor */}
      <Box size={[20, 0.3, 16]} pos={[0, -0.15, 0]} color="#1e293b" shadow />
      <Box size={[20, 10, 0.4]} pos={[0, 5, -5.5]} color="#f8fafc" />
      {/* Red ceramic wall wainscoting */}
      <Box size={[20, 1.6, 0.45]} pos={[0, 3.2, -5.4]} color="#dc2626" />

      {/* Long Stainless Steel Central Prep Counter */}
      <Box size={[10.5, 1.15, 2.2]} pos={[0, 0.58, -1.0]} color="#94a3b8" shadow />
      <Box size={[10.8, 0.12, 2.4]} pos={[0, 1.18, -1.0]} color="#f1f5f9" shadow />

      {/* Station 1: Commercial Burger Griddle & Sizzling Patties */}
      <Box size={[2.6, 0.35, 1.6]} pos={[-3.6, 1.35, -1.0]} color="#334155" />
      {/* 4 Burger Patties */}
      <Cyl r={0.28} h={0.08} pos={[-4.2, 1.55, -1.2]} color="#451a03" />
      <Cyl r={0.28} h={0.08} pos={[-3.5, 1.55, -1.2]} color="#451a03" />
      <Cyl r={0.28} h={0.08} pos={[-4.2, 1.55, -0.7]} color="#451a03" />
      <Cyl r={0.28} h={0.08} pos={[-3.5, 1.55, -0.7]} color="#451a03" />
      {/* Metal Spatula */}
      <Box size={[0.2, 0.04, 0.6]} pos={[-2.8, 1.56, -0.8]} rot={[0, 0.3, 0]} color="#e2e8f0" />

      {/* Station 2: Deep Fryer & Golden Fry Baskets */}
      <Box size={[2.2, 0.5, 1.4]} pos={[-0.6, 1.42, -1.0]} color="#64748b" />
      <Box size={[0.8, 0.35, 1.0]} pos={[-1.0, 1.65, -1.0]} color="#eab308" />
      <Box size={[0.8, 0.35, 1.0]} pos={[-0.2, 1.65, -1.0]} color="#eab308" />

      {/* Station 3: Condiment Dispenser Carousel (Ketchup & Mustard) */}
      <Cyl r={0.18} h={0.65} pos={[1.2, 1.6, -1.2]} color="#dc2626" />
      <Cyl r={0.18} h={0.65} pos={[1.6, 1.6, -1.2]} color="#eab308" />

      {/* Station 4: Wrapping & Assembly Station (Wrapped Burgers in Trays) */}
      <Box size={[1.8, 0.1, 1.2]} pos={[3.4, 1.25, -1.0]} color="#e2e8f0" />
      <Box size={[0.55, 0.3, 0.45]} pos={[3.0, 1.4, -1.0]} color="#fef08a" />
      <Box size={[0.55, 0.3, 0.45]} pos={[3.7, 1.4, -1.0]} color="#fef08a" />

      {/* Overhead Stainless Ventilation Hood & Warm Heat Lamps */}
      <Box size={[9.6, 0.8, 2.6]} pos={[0, 3.8, -1.0]} color="#64748b" shadow />
      <Cyl r={0.3} h={0.5} pos={[-2.6, 3.2, -1.0]} color="#f59e0b" />
      <Cyl r={0.3} h={0.5} pos={[0, 3.2, -1.0]} color="#f59e0b" />
      <Cyl r={0.3} h={0.5} pos={[2.6, 3.2, -1.0]} color="#f59e0b" />

      <pointLight position={[0, 2.6, -1.0]} intensity={4.0} distance={5.5} color="#fbbf24" />
      <pointLight position={[-3.6, 2.2, -1.0]} intensity={3.0} distance={4.0} color="#f97316" />
    </group>
  );
}

/**
 * 4. Executive Real Estate Planning Table Set (Shots 8, 9, 10)
 * Blueprint drafting table with interactive 3D miniature objects:
 * 1. Grassy land plot with yellow boundary survey lines
 * 2. Bundled stacks of banknotes
 * 3. Miniature restaurant model with red warning badge
 */
export function ExecutivePlanningSet({
  showLand = true,
  showMoney = true,
  showRisk = false,
  showFolder = false,
}: {
  showLand?: boolean;
  showMoney?: boolean;
  showRisk?: boolean;
  showFolder?: boolean;
}) {
  return (
    <group>
      {/* Executive Boardroom Hardwood Floor & Wood Wainscot Wall */}
      <Box size={[20, 0.3, 16]} pos={[0, -0.15, 0]} color="#1e1b4b" shadow />
      <Box size={[20, 10, 0.4]} pos={[0, 5, -5.5]} color="#0f172a" />
      <Box size={[20, 1.4, 0.45]} pos={[0, 2.5, -5.4]} color="#451a03" />

      {/* Large Walnut Drafting / Planning Table */}
      <Box size={[8.4, 1.1, 5.0]} pos={[0, 0.55, -0.8]} color="#292524" shadow />
      <Box size={[8.6, 0.15, 5.2]} pos={[0, 1.15, -0.8]} color="#44403c" shadow />

      {/* Architectural Blueprint Sheet */}
      <Box size={[6.4, 0.04, 3.8]} pos={[0, 1.25, -0.8]} color="#0284c7" />
      {/* White Grid Lines on Blueprint */}
      <Box size={[5.8, 0.01, 0.04]} pos={[0, 1.28, -1.8]} color="#bae6fd" />
      <Box size={[5.8, 0.01, 0.04]} pos={[0, 1.28, -0.8]} color="#bae6fd" />
      <Box size={[5.8, 0.01, 0.04]} pos={[0, 1.28, 0.2]} color="#bae6fd" />
      <Box size={[0.04, 0.01, 3.2]} pos={[-1.8, 1.28, -0.8]} color="#bae6fd" />
      <Box size={[0.04, 0.01, 3.2]} pos={[0, 1.28, -0.8]} color="#bae6fd" />
      <Box size={[0.04, 0.01, 3.2]} pos={[1.8, 1.28, -0.8]} color="#bae6fd" />

      {/* 1. Miniature 3D Land Plot Object (Left) */}
      {showLand && (
        <group position={[-2.2, 1.35, -0.8]}>
          <Box size={[1.8, 0.18, 1.8]} pos={[0, 0.09, 0]} color="#15803d" shadow />
          {/* Yellow Property Boundary Survey Outline */}
          <Box size={[1.9, 0.04, 0.08]} pos={[0, 0.2, 0.9]} color="#facc15" />
          <Box size={[1.9, 0.04, 0.08]} pos={[0, 0.2, -0.9]} color="#facc15" />
          <Box size={[0.08, 0.04, 1.8]} pos={[0.9, 0.2, 0]} color="#facc15" />
          <Box size={[0.08, 0.04, 1.8]} pos={[-0.9, 0.2, 0]} color="#facc15" />
        </group>
      )}

      {/* 2. Realistic Stack of Bundled Banknotes (Center) */}
      {showMoney && (
        <group position={[0, 1.35, -0.8]}>
          <Box size={[1.4, 0.35, 0.9]} pos={[0, 0.18, 0]} color="#16a34a" shadow />
          <Box size={[1.3, 0.3, 0.85]} pos={[0, 0.48, 0]} color="#22c55e" shadow />
          {/* Paper bands */}
          <Box size={[0.3, 0.65, 0.92]} pos={[-0.3, 0.33, 0]} color="#fef08a" />
          <Box size={[0.3, 0.65, 0.92]} pos={[0.3, 0.33, 0]} color="#fef08a" />
        </group>
      )}

      {/* 3. Miniature Restaurant Model with Red Warning Badge (Right) */}
      <group position={[2.2, 1.35, -0.8]}>
        <ModernMcDonaldsBuilding scale={0.22} showPylon={false} />
        {showRisk && (
          <group position={[0, 1.6, 0]}>
            {/* Red Warning Triangle Badge */}
            <Box size={[0.4, 1.2, 0.15]} pos={[0, 0.2, 0]} color="#dc2626" />
            <Cyl r={0.16} h={0.15} pos={[0, -0.65, 0]} color="#dc2626" />
            <pointLight position={[0, 0, 0.5]} intensity={4.5} distance={3.5} color="#ef4444" />
          </group>
        )}
      </group>

      {/* Harry's Brown Leather Strategy Folder */}
      {showFolder && (
        <group position={[0.6, 1.32, -0.5]} rotation={[0, -0.2, 0]}>
          <Box size={[2.2, 0.05, 1.6]} pos={[0, 0, 0]} color="#78350f" shadow />
          {/* Property Contract Paper inside */}
          <Box size={[1.9, 0.03, 1.3]} pos={[0.1, 0.04, 0]} color="#f8fafc" />
          <Box size={[1.5, 0.01, 0.12]} pos={[0.1, 0.06, 0.3]} color="#eab308" />
          <Box size={[1.5, 0.01, 0.12]} pos={[0.1, 0.06, -0.2]} color="#059669" />
        </group>
      )}

      {/* Warm Brass Desk Lamp Glow */}
      <pointLight position={[0, 3.2, -0.8]} intensity={3.5} distance={6.0} color="#fef08a" />
    </group>
  );
}

/**
 * 5. Modern City Street & Underground Real Estate Network Set (Shots 2, 20, 23)
 * Full street level with McDonald's building, curbs, customers, and underground cadastral plot reveal
 */
export function CityUndergroundPropertySet({
  revealUnderground = false,
}: {
  revealUnderground?: boolean;
}) {
  return (
    <group>
      {/* Modern City Asphalt Avenue */}
      <Box size={[26, 0.4, 18]} pos={[0, -0.2, 0]} color="#0f172a" shadow />
      <Box size={[26, 0.05, 5.0]} pos={[0, 0.05, 5.5]} color="#1e293b" />
      <Box size={[26, 0.02, 0.25]} pos={[0, 0.1, 5.5]} color="#f8fafc" />

      {/* Centred Modern McDonald's Restaurant on Land Plot */}
      <group position={[0, 0.1, -1.0]}>
        <ModernMcDonaldsBuilding scale={1.05} />
      </group>

      {/* Surrounding City Buildings (Skyscrapers in Background) */}
      <Box size={[3.8, 12.0, 4.0]} pos={[-7.5, 6.0, -4.5]} color="#334155" shadow />
      <Box size={[4.2, 14.0, 4.0]} pos={[7.5, 7.0, -4.5]} color="#1e293b" shadow />
      <Box size={[4.5, 9.0, 3.5]} pos={[-8.5, 4.5, 2.5]} color="#475569" shadow />
      <Box size={[4.0, 10.5, 3.5]} pos={[8.5, 5.2, 2.5]} color="#334155" shadow />

      {/* UNDERGROUND SUBTERRANEAN CADATRAL PROPERTY MATRIX */}
      {revealUnderground && (
        <group position={[0, -3.8, 0]}>
          {/* Subterranean Vault Floor */}
          <Box size={[24, 0.3, 16]} pos={[0, 0, 0]} color="#020617" />
          {/* Glowing Green Cadastral Land Plots */}
          <Box size={[5.6, 0.12, 4.5]} pos={[-5.8, 0.1, -2.5]} color="#059669" />
          <Box size={[5.6, 0.12, 4.5]} pos={[0, 0.1, -2.5]} color="#047857" />
          <Box size={[5.6, 0.12, 4.5]} pos={[5.8, 0.1, -2.5]} color="#059669" />
          <Box size={[5.6, 0.12, 4.5]} pos={[-5.8, 0.1, 3.0]} color="#047857" />
          <Box size={[5.6, 0.12, 4.5]} pos={[0, 0.1, 3.0]} color="#059669" />
          <Box size={[5.6, 0.12, 4.5]} pos={[5.8, 0.1, 3.0]} color="#047857" />

          {/* Golden Subterranean Network Pipelines connecting the land parcels */}
          <Box size={[22, 0.1, 0.15]} pos={[0, 0.22, -2.5]} color="#facc15" />
          <Box size={[22, 0.1, 0.15]} pos={[0, 0.22, 3.0]} color="#facc15" />
          <Box size={[0.15, 0.1, 14]} pos={[0, 0.22, 0]} color="#facc15" />

          {/* Subterranean Green Ambient Illumination */}
          <pointLight position={[0, 2.0, 0]} intensity={5.0} distance={12.0} color="#10b981" />
        </group>
      )}
    </group>
  );
}

/**
 * 6. Global Real Estate Empire & Rotating 3D Globe Set (Shots 18, 22, 24)
 * Earth globe surrounded by golden franchise network arcs and glowing beacons
 */
export function GlobalNetworkSet() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const rotY = t * 0.32;

  return (
    <group>
      {/* Deep Space Background */}
      <Box size={[32, 22, 0.5]} pos={[0, 7, -10]} color="#020617" />

      {/* Central 3D Stylised Earth Globe */}
      <group position={[0, 2.8, -2.8]} rotation={[0.2, rotY, 0]}>
        {/* Ocean Core */}
        <Cyl r={3.2} h={4.8} rot={[1.57, 0, 0]} color="#0369a1" />
        {/* Continents & Land Masses */}
        <Box size={[2.6, 2.8, 0.25]} pos={[0, 0.6, 3.2]} color="#15803d" />
        <Box size={[2.0, 1.8, 0.25]} pos={[-2.0, -0.7, 2.9]} color="#16a34a" />
        <Box size={[2.8, 2.2, 0.25]} pos={[1.8, 0.5, 2.9]} color="#15803d" />
        <Box size={[2.4, 2.5, 0.25]} pos={[0, 0.3, -3.2]} color="#16a34a" />

        {/* Golden Franchise Location Pins around Globe */}
        <group position={[0.8, 2.1, 3.2]}>
          <Cyl r={0.18} h={0.45} color="#facc15" />
          <pointLight intensity={2.0} distance={2.5} color="#facc15" />
        </group>
        <group position={[-1.4, 1.4, 3.1]}>
          <Cyl r={0.18} h={0.45} color="#facc15" />
          <pointLight intensity={2.0} distance={2.5} color="#facc15" />
        </group>
        <group position={[1.6, -0.5, 3.0]}>
          <Cyl r={0.18} h={0.45} color="#facc15" />
          <pointLight intensity={2.0} distance={2.5} color="#facc15" />
        </group>
      </group>

      {/* Golden Orbital Franchise Connection Rings */}
      <group position={[0, 2.8, -2.8]} rotation={[0.5, rotY * 1.3, 0.2]}>
        <Cyl r={4.2} h={0.08} rot={[1.57, 0, 0]} color="#facc15" />
      </group>

      {/* Foreground Executive Viewing Platform */}
      <Box size={[18, 0.4, 6]} pos={[0, -0.2, 2.2]} color="#0f172a" shadow />
      <Box size={[18, 0.06, 0.25]} pos={[0, 0.05, -0.7]} color="#facc15" />
    </group>
  );
}

/**
 * 7. Beyond Hunch Brand Studio Set (Shots 25, 26)
 */
export function BeyondHunchSet() {
  return (
    <group>
      <Box size={[24, 0.4, 16]} pos={[0, -0.2, 0]} color="#020617" shadow />
      <Box size={[24, 14, 0.5]} pos={[0, 7, -6]} color="#020617" />
      <pointLight position={[0, 3.5, -1.8]} intensity={5.0} distance={9.0} color="#facc15" />
    </group>
  );
}
