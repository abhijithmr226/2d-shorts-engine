import * as fs from 'fs';

let code = fs.readFileSync('src/ep4/sets.tsx', 'utf8');

const newBedTimelapse = `export function BedTimelapseSet() {
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
      <Box size={[20, 14, 0.2]} pos={[-2.4, 6.0, -8.5]} color={skyColor} />

      {/* Horizon Silhouette */}
      <Box size={[18, 2.2, 0.2]} pos={[-2.4, 2.6, -8.0]} color={isNight ? "#050b14" : isSunset ? "#1c0d0a" : "#14532d"} />
      <Cyl r={0.8} h={1.4} pos={[-3.6, 3.4, -7.8]} color={isNight ? "#06101e" : "#166534"} />
      <Cyl r={1.1} h={1.8} pos={[-1.8, 3.6, -7.8]} color={isNight ? "#06101e" : "#15803d"} />

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
      <Box size={[4.4, 5.8, 0.25]} pos={[-2.4, 4.6, -5.9]} color="#0f172a" shadow />
      <Box size={[4.0, 5.4, 0.05]} pos={[-2.4, 4.6, -5.8]} color="rgba(255,255,255,0.02)" />
      <Box size={[0.12, 5.4, 0.2]} pos={[-2.4, 4.6, -5.75]} color="#1e293b" />
      <Box size={[4.0, 0.12, 0.2]} pos={[-2.4, 4.6, -5.75]} color="#1e293b" />
      <Box size={[4.8, 0.35, 0.6]} pos={[-2.4, 1.8, -5.6]} color="#1e293b" shadow />

      {/* Curtains */}
      <Box size={[0.7, 6.2, 0.3]} pos={[-4.5, 4.6, -5.6]} color="#f1f5f9" shadow />
      <Box size={[0.7, 6.2, 0.3]} pos={[-0.3, 4.6, -5.6]} color="#f1f5f9" shadow />
      <Cyl r={0.06} h={5.2} rot={[0, 0, 1.57]} pos={[-2.4, 7.6, -5.5]} color="#0f172a" />

      {/* COZY BEDROOM FURNITURE - Lower profile so character is completely clear & seated */}
      {/* Bed Headboard */}
      <Box size={[4.4, 3.2, 0.4]} pos={[1.6, 1.6, -4.6]} color="#292524" shadow />
      {/* Bed Base */}
      <Box size={[4.2, 0.4, 5.6]} pos={[1.6, 0.2, -1.8]} color="#1c1917" shadow />
      {/* Mattress */}
      <Box size={[4.0, 0.35, 5.4]} pos={[1.6, 0.55, -1.8]} color="#f8fafc" shadow />

      {/* Pillows against headboard */}
      <Box size={[1.5, 0.8, 0.3]} pos={[0.9, 1.05, -4.2]} rot={[-0.2, 0, 0]} color="#fef3c7" shadow />
      <Box size={[1.5, 0.8, 0.3]} pos={[2.3, 1.05, -4.2]} rot={[-0.2, 0, 0]} color="#e0e7ff" shadow />

      {/* Low folded blanket on lower half only */}
      <Box size={[4.1, 0.2, 3.0]} pos={[1.6, 0.8, 0.0]} color={isNight ? "#1e1b4b" : "#4338ca"} shadow />

      {/* Nightstand & Lamp */}
      <Box size={[1.2, 0.8, 1.2]} pos={[4.2, 0.4, -4.0]} color="#292524" shadow />
      <Cyl r={0.2} h={0.5} pos={[4.2, 1.05, -4.0]} color={isNight ? "#fde047" : "#e2e8f0"} />

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
}`;

const startMarker = 'export function BedTimelapseSet() {';
const startIdx = code.indexOf(startMarker);
const endMarker = '\n// 6. City Street / Commuter Sidewalk';
const endIdx = code.indexOf(endMarker, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + newBedTimelapse + '\n\n' + code.substring(endIdx);
  fs.writeFileSync('src/ep4/sets.tsx', code, 'utf8');
  console.log('Successfully replaced BedTimelapseSet!');
} else {
  console.error('Could not find markers: start=' + startIdx + ' end=' + endIdx);
}
