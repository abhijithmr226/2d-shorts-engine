import fs from "fs";

// 1. Fix cast.ts
let cast = fs.readFileSync("src/ep5/cast.ts", "utf8");
cast = cast.replace(/tie: "[^"]+",?\n/g, "");
fs.writeFileSync("src/ep5/cast.ts", cast, "utf8");

// 2. Fix sets.tsx (replace rot={[...]} on <group> with rotation={[...]})
let sets = fs.readFileSync("src/ep5/sets.tsx", "utf8");
sets = sets.replace(/<group position={\[-5.6, 0.65, 1.8\]} rot=\{/g, "<group position={[-5.6, 0.65, 1.8]} rotation={");
sets = sets.replace(/<group position={\[0.6, 1.32, -0.6\]} rot=\{/g, "<group position={[0.6, 1.32, -0.6]} rotation={");
fs.writeFileSync("src/ep5/sets.tsx", sets, "utf8");

// 3. Fix Episode.tsx topRanges structure
let ep = fs.readFileSync("src/ep5/Episode.tsx", "utf8");
ep = ep.replace(
  "const topRanges: Array<{ from: number; to: number }> = [];",
  "const topRanges: Array<{ start: number; end: number }> = [];"
);
ep = ep.replace(
  "topRanges.push({ from: s.start, to: s.end });",
  "topRanges.push({ start: s.start, end: s.end });"
);
fs.writeFileSync("src/ep5/Episode.tsx", ep, "utf8");

// 4. Fix shots.tsx (invoke look functions hk(), vin(), mod(), biz(), glo())
let shots = fs.readFileSync("src/ep5/shots.tsx", "utf8");
shots = shots.replace(/look: hk,/g, "look: hk(),");
shots = shots.replace(/look: vin,/g, "look: vin(),");
shots = shots.replace(/look: mod,/g, "look: mod(),");
shots = shots.replace(/look: biz,/g, "look: biz(),");
shots = shots.replace(/look: glo,/g, "look: glo(),");
fs.writeFileSync("src/ep5/shots.tsx", shots, "utf8");

console.log("Fixed all TypeScript types successfully!");

