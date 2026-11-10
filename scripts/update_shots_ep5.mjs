import fs from "fs";

let s = fs.readFileSync("src/ep5/shots.tsx", "utf8");

// Add imports
if (!s.includes("useCurrentFrame")) {
  s = s.replace(
    'import React from "react";',
    'import React from "react";\nimport { useCurrentFrame, useVideoConfig } from "remotion";'
  );
}

// Replace B definition
const oldB = `// Helper to inject frame time t into Body
const B = (fn: (t: number) => React.ReactNode) => {
  return function BodyWrapper({ dur }: { dur: number }) {
    return <>{fn(dur)}</>;
  };
};`;

const newB = `const useT = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return f / fps;
};

const B = (fn: (t: number, dur: number) => React.ReactNode): React.FC<{ dur: number }> => ({ dur }) => {
  const t = useT();
  return <>{fn(t, dur)}</>;
};`;

s = s.replace(oldB, newB);

// Update cameras to proper distance so whole characters and buildings are in frame
// Shot 1
s = s.replace(
  "cam: { from: [0, 1.4, 5.4], to: [0, 1.3, 4.8], lookFrom: [0, 0.8, 0], fov: 52 },",
  "cam: { from: [0, 2.2, 8.4], to: [0, 2.0, 7.6], lookFrom: [0, 1.2, 0], fov: 50 },"
);

// Shot 4
s = s.replace(
  "cam: { from: [0, 1.6, 6.4], to: [0, 1.55, 5.8], lookFrom: [0, 1.2, 0], fov: 50 },",
  "cam: { from: [0, 2.2, 9.2], to: [0, 2.0, 8.4], lookFrom: [0, 1.2, 0], fov: 52 },"
);

fs.writeFileSync("src/ep5/shots.tsx", s, "utf8");
console.log("Updated ep5/shots.tsx with correct B helper and cameras!");

