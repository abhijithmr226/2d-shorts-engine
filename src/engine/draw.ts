// 2D cartoon people drawn in code (the measured style: round white head ~1/3 of the height, small hat,
// dot eyes + thick brows, bean-shaped coat, thin black stick limbs, round white hands, ink outline everywhere).
// Drawn fresh every frame, so walking, blinking, talking and props are just numbers.

export type Hat = "none" | "top" | "bowler" | "flatcap" | "stripecap" | "cabbie" | "boater" | "helmet" | "cap" | "earmuffs" | "bob" | "fedora" | "beanie";
export type Eyes = "dot" | "wide" | "closed" | "half" | "angry" | "happy" | "sad" | "wink" | "anime";
export type Mouth = "smile" | "flat" | "open" | "frown" | "o" | "grin" | "wavy" | "smirk";
export type Arm = "down" | "hips" | "wave" | "point" | "hold" | "up" | "cross" | "shrug" | "drink" | "warm";
export type Prop = "none" | "newspaper" | "mug" | "teacup" | "sandwich" | "coin" | "cane" | "whip" | "plate" | "diploma" | "phone" | "flowers" | "ticket" | "wallet" | "needle" | "lens" | "scanner" | "chess_piece" | "toothbrush" | "cereal_bowl" | "briefcase" | "folder" | "burger";

export type ToonSpec = {
  creature?: "pikachu";
  hat: Hat; hatColor?: string; band?: string;
  coat: string; vest?: string; scarf?: string; buttons?: string; skirt?: string; tie?: string;
  hair?: string; moustache?: boolean; whiskers?: boolean; beard?: boolean; glasses?: boolean;
  height?: number; // 0.6 (child) .. 1.0
  wide?: number; // body width factor
};
export type ToonPose = {
  t: number; // seconds (drives blink, idle, walk)
  walk?: number; // 0 = stand, 1 = walk cycle speed
  eyes?: Eyes; mouth?: Mouth; talk?: boolean;
  armL?: Arm; armR?: Arm; prop?: Prop; propHand?: "L" | "R";
  look?: number; // -1 .. 1 pupils left/right
  shiver?: boolean; sit?: boolean;
};

const INK = "#161212";
const LW = 9;

const darker = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * k), g = Math.round(((n >> 8) & 255) * k), b = Math.round((n & 255) * k);
  return `rgb(${Math.min(255, r)},${Math.min(255, g)},${Math.min(255, b)})`;
};

function hand(g: CanvasRenderingContext2D, x: number, y: number, r = 15) {
  g.fillStyle = "#fbfaf6"; g.strokeStyle = INK; g.lineWidth = 6;
  g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); g.stroke();
}

function limb(g: CanvasRenderingContext2D, pts: number[][], w = LW) {
  g.strokeStyle = INK; g.lineWidth = w; g.lineCap = "round"; g.lineJoin = "round";
  g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
  if (pts.length === 3) g.quadraticCurveTo(pts[1][0], pts[1][1], pts[2][0], pts[2][1]);
  else for (const p of pts.slice(1)) g.lineTo(p[0], p[1]);
  g.stroke();
}

function drawProp(g: CanvasRenderingContext2D, p: Prop, x: number, y: number, t: number, side = 1) {
  if (p === "newspaper") x += side < 0 ? 0 : -124;
  g.lineWidth = 6; g.strokeStyle = INK;
  if (p === "newspaper") {
    g.save(); g.translate(x + 62, y - 10); g.rotate(-0.08);
    g.fillStyle = "#efe8d6"; g.fillRect(-70, -95, 140, 170); g.strokeRect(-70, -95, 140, 170);
    g.fillStyle = INK; g.font = "900 22px Georgia"; g.textAlign = "center"; g.fillText("THE GLOBE", 0, -62);
    g.fillRect(-55, -50, 110, 4);
    for (let i = 0; i < 7; i++) { g.fillStyle = "rgba(20,20,20,0.55)"; g.fillRect(-55, -36 + i * 14, i % 3 === 2 ? 70 : 110, 6); }
    g.restore();
  } else if (p === "mug") {
    g.fillStyle = "#d9c89a"; g.beginPath(); g.roundRect(x - 22, y - 50, 44, 58, 6); g.fill(); g.stroke();
    g.fillStyle = "#fff8e6"; g.beginPath(); g.ellipse(x, y - 52, 26, 12, 0, 0, Math.PI * 2); g.fill(); g.stroke();
    g.beginPath(); g.arc(x + 26, y - 22, 14, -1.2, 1.2); g.stroke();
  } else if (p === "teacup") {
    g.fillStyle = "#f4f1ea"; g.beginPath(); g.moveTo(x - 26, y - 34); g.quadraticCurveTo(x - 24, y + 4, x, y + 4); g.quadraticCurveTo(x + 24, y + 4, x + 26, y - 34); g.closePath(); g.fill(); g.stroke();
    g.beginPath(); g.ellipse(x, y + 8, 36, 8, 0, 0, Math.PI * 2); g.fill(); g.stroke();
    for (let i = 0; i < 2; i++) { // steam
      g.strokeStyle = "rgba(255,255,255,0.7)"; g.lineWidth = 5;
      g.beginPath(); const sx = x - 8 + i * 16; g.moveTo(sx, y - 44);
      g.bezierCurveTo(sx - 12, y - 64 - Math.sin(t * 3 + i) * 6, sx + 12, y - 80, sx, y - 100); g.stroke();
    }
  } else if (p === "sandwich") {
    g.fillStyle = "#e9c27a"; g.beginPath(); g.moveTo(x - 40, y + 10); g.lineTo(x + 40, y + 10); g.lineTo(x, y - 40); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = "#7cb24a"; g.fillRect(x - 30, y - 2, 60, 7);
    g.fillStyle = "#d65a4a"; g.fillRect(x - 24, y + 4, 48, 5);
  } else if (p === "coin") {
    g.fillStyle = "#f2c64b"; g.beginPath(); g.arc(x, y - 12, 18, 0, Math.PI * 2); g.fill(); g.stroke();
  } else if (p === "cane") {
    limb(g, [[x, y], [x + 6, y + 260]], 10);
  } else if (p === "whip") {
    limb(g, [[x, y], [x + 30, y - 160]], 6);
    limb(g, [[x + 30, y - 160], [x + 100 + Math.sin(t * 4) * 20, y - 200], [x + 150, y - 140]], 3);
  } else if (p === "plate") {
    g.fillStyle = "#f4f1ea"; g.beginPath(); g.ellipse(x, y - 4, 48, 14, 0, 0, Math.PI * 2); g.fill(); g.stroke();
    g.fillStyle = "#c98b4a"; g.beginPath(); g.ellipse(x - 8, y - 14, 22, 10, 0, 0, Math.PI * 2); g.fill(); g.stroke();
  } else if (p === "diploma") {
    g.save(); g.translate(x, y - 10); g.rotate(-0.15);
    g.fillStyle = "#fefbf2"; g.beginPath(); g.roundRect(-42, -14, 84, 28, 6); g.fill(); g.stroke();
    g.fillStyle = "#b82626"; g.fillRect(-8, -14, 16, 28); // red ribbon
    g.beginPath(); g.moveTo(0, 14); g.lineTo(-12, 36); g.lineTo(0, 28); g.lineTo(12, 36); g.closePath(); g.fill();
    g.restore();
  } else if (p === "phone") {
    g.save(); g.translate(x, y - 18);
    g.fillStyle = "#1e1e24"; g.beginPath(); g.roundRect(-24, -44, 48, 88, 8); g.fill(); g.stroke();
    g.fillStyle = "#4ecdc4"; g.beginPath(); g.roundRect(-20, -38, 40, 76, 4); g.fill(); // glowing screen
    g.fillStyle = "#ffffff"; g.beginPath(); g.arc(0, 0, 10, 0, Math.PI * 2); g.fill(); // heart icon or play
    g.restore();
  } else if (p === "flowers") {
    g.save(); g.translate(x, y - 20);
    g.fillStyle = "#e8c99b"; g.beginPath(); g.moveTo(-16, 28); g.lineTo(16, 28); g.lineTo(28, -10); g.lineTo(-28, -10); g.closePath(); g.fill(); g.stroke(); // wrap
    g.fillStyle = "#ff758f"; for (let i = -1; i <= 1; i++) { g.beginPath(); g.arc(i * 18, -24, 14, 0, Math.PI * 2); g.fill(); g.stroke(); }
    g.fillStyle = "#ffb3c1"; g.beginPath(); g.arc(0, -34, 14, 0, Math.PI * 2); g.fill(); g.stroke();
    g.restore();
  } else if (p === "ticket") {
    g.fillStyle = "#fbf4d9"; g.beginPath(); g.roundRect(x - 28, y - 18, 56, 36, 4); g.fill(); g.stroke();
    g.fillStyle = "#b83030"; g.fillRect(x - 16, y - 10, 32, 6);
  } else if (p === "wallet") {
    g.save(); g.translate(x, y - 10);
    g.fillStyle = "#5c3d2e"; g.beginPath(); g.roundRect(-24, -18, 48, 36, 4); g.fill(); g.stroke();
    g.fillStyle = "#e9c35a"; g.beginPath(); g.arc(0, 0, 5, 0, Math.PI * 2); g.fill(); // gold clasp
    g.restore();
  } else if (p === "needle") {
    g.strokeStyle = "#d4d4d8"; g.lineWidth = 4;
    g.beginPath(); g.moveTo(x - 15, y - 35); g.lineTo(x + 15, y + 15); g.stroke();
    g.strokeStyle = "#facc15"; g.lineWidth = 2; // thread
    g.beginPath(); g.moveTo(x - 15, y - 35); g.quadraticCurveTo(x - 30, y - 50, x - 10, y - 65); g.stroke();
  } else if (p === "lens") {
    g.strokeStyle = "#b45309"; g.lineWidth = 5;
    g.beginPath(); g.moveTo(x + 10, y + 10); g.lineTo(x + 28, y + 28); g.stroke(); // handle
    g.fillStyle = "rgba(186, 230, 253, 0.4)"; g.beginPath(); g.arc(x, y, 22, 0, Math.PI * 2); g.fill(); g.stroke(); // lens
  } else if (p === "scanner") {
    g.save(); g.translate(x, y - 10);
    g.fillStyle = "#1e293b"; g.beginPath(); g.roundRect(-14, -8, 28, 45, 4); g.fill(); g.stroke(); // handle
    g.fillStyle = "#facc15"; g.beginPath(); g.roundRect(-24, -28, 48, 22, 5); g.fill(); g.stroke(); // scanner head
    g.strokeStyle = "#ef4444"; g.lineWidth = 3; g.beginPath(); g.moveTo(-24, -18); g.lineTo(-65, -18); g.stroke(); // laser line
    g.restore();
  } else if (p === "chess_piece") {
    g.save(); g.translate(x, y - 10);
    g.fillStyle = "#78350f"; g.strokeStyle = INK; g.lineWidth = 4;
    g.beginPath(); g.ellipse(0, 18, 16, 7, 0, 0, Math.PI * 2); g.fill(); g.stroke(); // base
    g.beginPath(); g.moveTo(-10, 16); g.quadraticCurveTo(-4, 0, -8, -12); g.lineTo(8, -12); g.quadraticCurveTo(4, 0, 10, 16); g.closePath(); g.fill(); g.stroke(); // body
    g.beginPath(); g.arc(0, -20, 10, 0, Math.PI * 2); g.fill(); g.stroke(); // head
    g.restore();
  } else if (p === "toothbrush") {
    g.save(); g.translate(x, y - 10);
    g.strokeStyle = "#38bdf8"; g.lineWidth = 6; g.lineCap = "round";
    g.beginPath(); g.moveTo(-5, 25); g.lineTo(5, -20); g.stroke(); // handle
    g.fillStyle = "#ffffff"; g.strokeStyle = INK; g.lineWidth = 3;
    g.beginPath(); g.roundRect(0, -32, 14, 12, 3); g.fill(); g.stroke(); // bristle head
    g.fillStyle = "#38bdf8"; g.beginPath(); g.arc(7, -35, 4, 0, Math.PI * 2); g.fill(); // toothpaste dollop
    g.restore();
  } else if (p === "cereal_bowl") {
    g.save(); g.translate(x, y);
    g.fillStyle = "#f8fafc"; g.strokeStyle = INK; g.lineWidth = 5;
    g.beginPath(); g.arc(0, 0, 32, 0, Math.PI); g.closePath(); g.fill(); g.stroke(); // bowl
    g.fillStyle = "#fde047"; g.beginPath(); g.ellipse(0, -2, 28, 8, 0, 0, Math.PI * 2); g.fill(); // cereal rings
    g.strokeStyle = "#94a3b8"; g.lineWidth = 4;
    g.beginPath(); g.moveTo(8, -2); g.lineTo(26, -24); g.stroke(); // spoon
    g.restore();
  } else if (p === "briefcase") {
    g.save(); g.translate(x, y + 16);
    g.fillStyle = "#0f172a"; g.strokeStyle = INK; g.lineWidth = 5;
    g.beginPath(); g.roundRect(-28, -22, 56, 42, 4); g.fill(); g.stroke();
    g.fillStyle = "#eab308"; g.fillRect(-5, -20, 10, 7); // brass clasp
    g.strokeStyle = "#0f172a"; g.lineWidth = 5;
    g.beginPath(); g.arc(0, -26, 11, Math.PI, 0); g.stroke(); // handle
    g.restore();
  } else if (p === "folder") {
    g.save(); g.translate(x, y + 10); g.rotate(-0.12);
    g.fillStyle = "#78350f"; g.strokeStyle = INK; g.lineWidth = 5;
    g.beginPath(); g.roundRect(-22, -30, 44, 60, 4); g.fill(); g.stroke();
    g.fillStyle = "#f8fafc"; g.fillRect(-18, -26, 36, 10); // paper inside
    g.fillStyle = "#d97706"; g.beginPath(); g.arc(0, 0, 7, 0, Math.PI * 2); g.fill(); // gold seal
    g.restore();
  } else if (p === "burger") {
    g.save(); g.translate(x, y - 8);
    // Burger packaging / wrapper
    g.fillStyle = "#fef08a"; g.strokeStyle = INK; g.lineWidth = 4;
    g.beginPath(); g.roundRect(-24, -18, 48, 34, 5); g.fill(); g.stroke();
    // Red brand banner on wrapper
    g.fillStyle = "#dc2626"; g.fillRect(-22, -4, 44, 8);
    // Golden arch mini M
    g.strokeStyle = "#facc15"; g.lineWidth = 3;
    g.beginPath();
    g.arc(-5, 0, 4, Math.PI, 0);
    g.arc(5, 0, 4, Math.PI, 0);
    g.stroke();
    g.restore();
  }
}

// Draws one character into a 768 x 1024 canvas (room for pointing arms); feet stand on y = 1000.
export function drawToon(g: CanvasRenderingContext2D, s: ToonSpec, p: ToonPose) {
  if (s.creature === "pikachu") {
    return drawPikachu(g, s, p);
  }

  g.clearRect(0, 0, 768, 1024);
  const H = 940 * (s.height ?? 1), cx = 384, ground = 1000;
  const W = s.wide ?? 1;
  const walk = p.walk ?? 0, ph = p.t * 7.5 * (walk || 1);
  const bob = walk ? Math.abs(Math.sin(ph)) * 10 : Math.sin(p.t * 2.2) * 3;
  const shiverX = p.shiver ? Math.sin(p.t * 60) * 3 : 0;
  const sit = !!p.sit;

  const headR = H * 0.16;
  const legLen = sit ? H * 0.2 : H * 0.34;
  const hipY = ground - legLen - bob * 0.3;
  const torsoH = H * 0.3, torsoW = H * 0.22 * W;
  const torsoTop = hipY - torsoH + 12;
  const neckY = torsoTop + 6;
  const headY = torsoTop - headR * 0.82 - bob * 0.2;
  const hx = cx + shiverX;

  // ---- legs ----
  const legSpread = torsoW * 0.22;
  for (const side of [-1, 1]) {
    const sw = walk ? Math.sin(ph + (side > 0 ? Math.PI : 0)) : 0;
    const fx = cx + side * legSpread + sw * 46, fy = ground - (walk ? Math.max(0, Math.cos(ph + (side > 0 ? Math.PI : 0))) * 18 : 0);
    if (sit) {
      const kx = cx + side * legSpread + 60, ky = hipY + 6;
      limb(g, [[cx + side * legSpread, hipY - 4], [kx, ky], [kx + 6, ground - 6]]);
      g.fillStyle = INK; g.beginPath(); g.ellipse(kx + 22, ground - 4, 24, 11, 0, 0, Math.PI * 2); g.fill();
    } else {
      limb(g, [[cx + side * legSpread, hipY - 4], [(cx + side * legSpread + fx) / 2 + sw * 8, (hipY + fy) / 2], [fx, fy - 6]]);
      g.fillStyle = INK; g.beginPath(); g.ellipse(fx + 12, fy - 6, 25, 11, 0, 0, Math.PI * 2); g.fill();
    }
  }

  // ---- arms (behind/around the body): shoulder points ----
  const shY = torsoTop + torsoH * 0.18;
  const arm = (side: -1 | 1, a: Arm) => {
    const sx = hx + side * torsoW * 0.42, sy = shY;
    const swing = walk ? Math.sin(ph + (side < 0 ? 0 : Math.PI)) * 40 : Math.sin(p.t * 2.2 + side) * 4;
    let ex: number, ey: number, hx2: number, hy: number;
    const L = H * 0.27;
    switch (a) {
      case "hips": ex = sx + side * 62; ey = sy + L * 0.45; hx2 = sx + side * 18; hy = sy + L * 0.8; break;
      case "wave": { const w = Math.sin(p.t * 9) * 18; ex = sx + side * 84; ey = sy - 24; hx2 = sx + side * 112 + w; hy = sy - L * 0.85; break; }
      case "point": ex = sx + side * L * 0.5; ey = sy - 6; hx2 = sx + side * L * 0.95; hy = sy - 30; break;
      case "hold": ex = sx + side * 52; ey = sy + L * 0.55; hx2 = sx + side * 16 + side * -60; hy = sy + L * 0.42; break;
      case "up": ex = sx + side * 78; ey = sy - L * 0.45; hx2 = sx + side * 104; hy = sy - L * 0.98; break;
      case "cross": ex = sx + side * 40; ey = sy + L * 0.45; hx2 = cx - side * torsoW * 0.15; hy = sy + L * 0.35; break;
      case "shrug": ex = sx + side * 66; ey = sy + L * 0.2; hx2 = sx + side * 100; hy = sy - 10; break;
      case "drink": ex = sx + side * 60; ey = sy + L * 0.4; hx2 = hx + side * headR * 0.55; hy = headY + headR * 0.75; break;
      case "warm": ex = sx + side * 46; ey = sy + L * 0.5; hx2 = cx + side * 18; hy = sy + L * 0.25; break;
      default: ex = sx + side * 18 + swing * 0.3; ey = sy + L * 0.5; hx2 = sx + side * 14 + swing; hy = sy + L;
    }
    return { sx, sy, ex, ey, hx: hx2, hy };
  };
  const aL = arm(-1, p.armL ?? "down"), aR = arm(1, p.armR ?? "down");
  const front = (a: Arm) => ["hold", "cross", "drink", "warm"].includes(a);
  const drawArm = (A: ReturnType<typeof arm>) => { limb(g, [[A.sx, A.sy], [A.ex, A.ey], [A.hx, A.hy]]); };
  if (!front(p.armL ?? "down")) { drawArm(aL); hand(g, aL.hx, aL.hy); }
  if (!front(p.armR ?? "down")) { drawArm(aR); hand(g, aR.hx, aR.hy); }

  // ---- body (bean coat) ----
  g.lineWidth = LW; g.strokeStyle = INK;
  const bx = hx - torsoW / 2;
  const grd = g.createLinearGradient(bx, 0, bx + torsoW, 0);
  grd.addColorStop(0, s.coat); grd.addColorStop(0.7, s.coat); grd.addColorStop(1, darker(s.coat, 0.72));
  g.fillStyle = grd;
  g.beginPath(); g.roundRect(bx, torsoTop, torsoW, torsoH + 18, [torsoW * 0.42, torsoW * 0.42, torsoW * 0.3, torsoW * 0.3]); g.fill(); g.stroke();
  if (s.vest) {
    g.fillStyle = s.vest;
    g.beginPath(); g.moveTo(hx - torsoW * 0.2, torsoTop + 8); g.lineTo(hx, torsoTop + torsoH * 0.55); g.lineTo(hx + torsoW * 0.2, torsoTop + 8);
    g.lineTo(hx + torsoW * 0.16, torsoTop + torsoH + 10); g.lineTo(hx - torsoW * 0.16, torsoTop + torsoH + 10); g.closePath(); g.fill(); g.lineWidth = 5; g.stroke();
  }
  if (s.skirt) {
    g.fillStyle = s.skirt; g.lineWidth = 5;
    g.beginPath();
    g.moveTo(bx - 4, torsoTop + torsoH);
    g.lineTo(bx + torsoW + 4, torsoTop + torsoH);
    g.lineTo(bx + torsoW + 18, torsoTop + torsoH + legLen * 0.42);
    g.lineTo(bx - 18, torsoTop + torsoH + legLen * 0.42);
    g.closePath(); g.fill(); g.stroke();
    for (let k = 1; k < 5; k++) {
      g.beginPath();
      g.moveTo(bx + (torsoW * k) / 5, torsoTop + torsoH);
      g.lineTo(bx - 18 + ((torsoW + 36) * k) / 5, torsoTop + torsoH + legLen * 0.42);
      g.stroke();
    }
  }
  // lapels
  g.lineWidth = 5; g.strokeStyle = INK;
  g.beginPath(); g.moveTo(hx - torsoW * 0.22, torsoTop + 10); g.lineTo(hx - 4, torsoTop + torsoH * 0.5); g.moveTo(hx + torsoW * 0.22, torsoTop + 10); g.lineTo(hx + 4, torsoTop + torsoH * 0.5); g.stroke();
  if (s.tie) {
    g.fillStyle = s.tie; g.lineWidth = 4; g.strokeStyle = INK;
    // Tie knot
    g.beginPath();
    g.moveTo(hx - 8, torsoTop + 10);
    g.lineTo(hx + 8, torsoTop + 10);
    g.lineTo(hx + 6, torsoTop + 22);
    g.lineTo(hx - 6, torsoTop + 22);
    g.closePath();
    g.fill(); g.stroke();
    // Tie body
    g.beginPath();
    g.moveTo(hx - 6, torsoTop + 22);
    g.lineTo(hx + 6, torsoTop + 22);
    g.lineTo(hx + 10, torsoTop + torsoH * 0.65);
    g.lineTo(hx, torsoTop + torsoH * 0.82);
    g.lineTo(hx - 10, torsoTop + torsoH * 0.65);
    g.closePath();
    g.fill(); g.stroke();
  }
  // buttons
  g.fillStyle = s.buttons ?? "#e9c35a";
  for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(hx + 2, torsoTop + torsoH * (0.58 + i * 0.13), 7, 0, Math.PI * 2); g.fill(); g.lineWidth = 3; g.stroke(); }
  if (s.scarf) {
    g.fillStyle = s.scarf; g.lineWidth = 5;
    g.beginPath(); g.ellipse(hx, neckY + 6, torsoW * 0.3, 18, 0, 0, Math.PI * 2); g.fill(); g.stroke();
    g.beginPath(); g.roundRect(hx + 8, neckY + 8, 26, 70, 8); g.fill(); g.stroke();
  }

  if (front(p.armL ?? "down")) { drawArm(aL); }
  if (front(p.armR ?? "down")) { drawArm(aR); }

  // ---- head ----
  g.fillStyle = "#fbfaf6"; g.strokeStyle = INK; g.lineWidth = 10;
  g.beginPath(); g.ellipse(hx, headY, headR * 1.04, headR, 0, 0, Math.PI * 2); g.fill(); g.stroke();
  // soft cheek shade
  const sh = g.createRadialGradient(hx - headR * 0.3, headY - headR * 0.4, headR * 0.2, hx, headY, headR * 1.05);
  sh.addColorStop(0, "rgba(255,255,255,0)"); sh.addColorStop(1, "rgba(120,110,150,0.22)");
  g.fillStyle = sh; g.beginPath(); g.ellipse(hx, headY, headR * 0.98, headR * 0.94, 0, 0, Math.PI * 2); g.fill();

  // hair tufts at the sides
  if (s.hair) {
    g.fillStyle = s.hair; g.lineWidth = 5;
    for (const side of [-1, 1]) {
      g.beginPath(); g.moveTo(hx + side * headR * 0.98, headY - headR * 0.35);
      g.quadraticCurveTo(hx + side * headR * 1.15, headY + headR * 0.1, hx + side * headR * 0.86, headY + headR * 0.35);
      g.quadraticCurveTo(hx + side * headR * 0.7, headY - headR * 0.1, hx + side * headR * 0.98, headY - headR * 0.35); g.fill(); g.stroke();
    }
  }
  if (s.whiskers) {
    g.fillStyle = "#e8e3da"; g.lineWidth = 5;
    for (const side of [-1, 1]) {
      g.beginPath(); g.moveTo(hx + side * headR * 0.95, headY - headR * 0.2);
      g.quadraticCurveTo(hx + side * headR * 1.25, headY + headR * 0.55, hx + side * headR * 0.45, headY + headR * 0.8);
      g.quadraticCurveTo(hx + side * headR * 0.75, headY + headR * 0.2, hx + side * headR * 0.95, headY - headR * 0.2); g.fill(); g.stroke();
    }
  }

  // ---- face ----
  const blink = (p.t % 3.7) < 0.12;
  const eyes: Eyes = blink ? "closed" : p.eyes ?? "dot";
  const ex = headR * 0.36, ey = headY - headR * 0.05, look = (p.look ?? 0) * 6;
  g.fillStyle = INK; g.strokeStyle = INK;
  for (const side of [-1, 1]) {
    const x = hx + side * ex + look;
    if (eyes === "closed") { g.lineWidth = 6; g.beginPath(); g.moveTo(x - 13, ey); g.lineTo(x + 13, ey); g.stroke(); }
    else if (eyes === "happy") { g.lineWidth = 6; g.beginPath(); g.arc(x, ey + 6, 12, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); }
    else if (eyes === "wide") { g.fillStyle = "#fff"; g.lineWidth = 5; g.beginPath(); g.arc(x, ey, 20, 0, Math.PI * 2); g.fill(); g.stroke(); g.fillStyle = INK; g.beginPath(); g.arc(x + look * 0.5, ey, 8, 0, Math.PI * 2); g.fill(); }
    else if (eyes === "half") { g.beginPath(); g.ellipse(x, ey + 3, 9, 7, 0, 0, Math.PI * 2); g.fill(); g.lineWidth = 6; g.beginPath(); g.moveTo(x - 15, ey - 3); g.lineTo(x + 15, ey - 3); g.stroke(); }
    else { g.beginPath(); g.ellipse(x, ey, 8.5, 11.5, 0, 0, Math.PI * 2); g.fill(); }
    // brows
    g.lineWidth = 8; g.lineCap = "round";
    const by = ey - headR * 0.3;
    g.beginPath();
    if (eyes === "angry") { g.moveTo(x - side * 16, by - 6); g.lineTo(x + side * 14, by + 8); }
    else if (eyes === "sad") { g.moveTo(x - side * 16, by + 6); g.lineTo(x + side * 14, by - 6); }
    else if (eyes === "wide") { g.moveTo(x - 14, by - 10); g.quadraticCurveTo(x, by - 18, x + 14, by - 10); }
    else { g.moveTo(x - 14, by); g.lineTo(x + 14, by - 2); }
    g.stroke();
  }
  // moustache
  if (s.moustache) {
    g.fillStyle = s.hair ?? "#4a2f22"; g.lineWidth = 4;
    for (const side of [-1, 1]) {
      g.beginPath(); g.moveTo(hx, headY + headR * 0.28);
      g.quadraticCurveTo(hx + side * headR * 0.32, headY + headR * 0.15, hx + side * headR * 0.52, headY + headR * 0.36);
      g.quadraticCurveTo(hx + side * headR * 0.28, headY + headR * 0.45, hx, headY + headR * 0.36); g.fill(); g.stroke();
    }
  }
  // mouth
  let mouth: Mouth = p.mouth ?? "smile";
  if (p.talk) mouth = Math.sin(p.t * 22) > 0.1 ? "open" : "flat";
  const my = headY + headR * (s.moustache ? 0.52 : 0.42);
  g.lineWidth = 6; g.strokeStyle = INK; g.fillStyle = "#6b1e1e";
  g.beginPath();
  if (mouth === "smile") { g.arc(hx, my - 14, 18, Math.PI * 0.2, Math.PI * 0.8); g.stroke(); }
  else if (mouth === "grin") { g.moveTo(hx - 24, my - 6); g.quadraticCurveTo(hx, my + 22, hx + 24, my - 6); g.closePath(); g.fill(); g.stroke(); }
  else if (mouth === "open") { g.ellipse(hx, my, 13, 11, 0, 0, Math.PI * 2); g.fill(); g.stroke(); }
  else if (mouth === "o") { g.ellipse(hx, my, 9, 12, 0, 0, Math.PI * 2); g.fill(); g.stroke(); }
  else if (mouth === "frown") { g.arc(hx, my + 14, 16, Math.PI * 1.2, Math.PI * 1.8); g.stroke(); }
  else if (mouth === "wavy") { g.moveTo(hx - 18, my); g.quadraticCurveTo(hx - 9, my - 8, hx, my); g.quadraticCurveTo(hx + 9, my + 8, hx + 18, my); g.stroke(); }
  else { g.moveTo(hx - 14, my); g.lineTo(hx + 14, my); g.stroke(); }
  if (s.beard) {
    g.fillStyle = s.hair ?? "#5a3a26"; g.lineWidth = 5;
    g.beginPath(); g.moveTo(hx - headR * 0.6, headY + headR * 0.5); g.quadraticCurveTo(hx, headY + headR * 1.5, hx + headR * 0.6, headY + headR * 0.5);
    g.quadraticCurveTo(hx, headY + headR * 0.85, hx - headR * 0.6, headY + headR * 0.5); g.fill(); g.stroke();
  }
  if (s.glasses) { g.lineWidth = 5; for (const side of [-1, 1]) { g.beginPath(); g.arc(hx + side * ex + look, ey, 20, 0, Math.PI * 2); g.stroke(); } }

  // ---- hat ----
  const hc = s.hatColor ?? "#2a2a33";
  const top = headY - headR * 0.78;
  g.lineWidth = 7; g.strokeStyle = INK;
  if (s.hat === "top") {
    g.fillStyle = hc; g.beginPath(); g.roundRect(hx - headR * 0.62, top - headR * 1.15, headR * 1.24, headR * 1.2, 6); g.fill(); g.stroke();
    if (s.band) { g.fillStyle = s.band; g.fillRect(hx - headR * 0.62 + 4, top - headR * 0.3, headR * 1.24 - 8, headR * 0.2); }
    g.fillStyle = hc; g.beginPath(); g.ellipse(hx, top + 2, headR * 1.0, headR * 0.17, 0, 0, Math.PI * 2); g.fill(); g.stroke();
  } else if (s.hat === "bowler") {
    g.fillStyle = hc; g.beginPath(); g.ellipse(hx, top + 4, headR * 1.05, headR * 0.17, 0, 0, Math.PI * 2); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(hx - headR * 0.72, top + 2); g.bezierCurveTo(hx - headR * 0.75, top - headR * 0.85, hx + headR * 0.75, top - headR * 0.85, hx + headR * 0.72, top + 2); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = "rgba(255,255,255,0.18)"; g.beginPath(); g.ellipse(hx - headR * 0.25, top - headR * 0.4, headR * 0.16, headR * 0.1, -0.5, 0, Math.PI * 2); g.fill();
  } else if (s.hat === "flatcap" || s.hat === "stripecap") {
    g.fillStyle = hc; g.beginPath();
    g.moveTo(hx - headR * 0.95, top + headR * 0.25); g.bezierCurveTo(hx - headR * 0.9, top - headR * 0.55, hx + headR * 0.9, top - headR * 0.6, hx + headR * 1.0, top + headR * 0.2);
    g.quadraticCurveTo(hx + headR * 1.45, top + headR * 0.35, hx + headR * 1.25, top + headR * 0.42); g.lineTo(hx - headR * 0.95, top + headR * 0.32); g.closePath(); g.fill(); g.stroke();
    if (s.hat === "stripecap") {
      g.save(); g.clip(); g.strokeStyle = s.band ?? "#e8e4dc"; g.lineWidth = 7;
      for (let i = -6; i <= 6; i++) { g.beginPath(); g.moveTo(hx + i * 22, top - headR); g.quadraticCurveTo(hx + i * 26, top, hx + i * 28, top + headR * 0.5); g.stroke(); }
      g.restore(); g.lineWidth = 7; g.strokeStyle = INK; g.stroke();
    }
  } else if (s.hat === "cabbie") {
    g.fillStyle = hc; g.beginPath(); g.roundRect(hx - headR * 0.85, top - headR * 0.45, headR * 1.7, headR * 0.6, [headR * 0.3, headR * 0.3, 4, 4]); g.fill(); g.stroke();
    g.fillStyle = INK; g.beginPath(); g.ellipse(hx + headR * 0.3, top + headR * 0.17, headR * 0.7, headR * 0.12, 0.05, 0, Math.PI * 2); g.fill();
    if (s.band) { g.fillStyle = s.band; g.fillRect(hx - headR * 0.82, top - headR * 0.05, headR * 1.64, headR * 0.12); }
  } else if (s.hat === "helmet") {
    g.fillStyle = hc; g.beginPath(); g.ellipse(hx, top + 6, headR * 0.95, headR * 0.15, 0, 0, Math.PI * 2); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(hx - headR * 0.72, top + 4); g.bezierCurveTo(hx - headR * 0.8, top - headR * 1.25, hx + headR * 0.8, top - headR * 1.25, hx + headR * 0.72, top + 4); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = hc; g.beginPath(); g.arc(hx, top - headR * 0.98, headR * 0.12, 0, Math.PI * 2); g.fill(); g.stroke();
    g.fillStyle = s.band ?? "#d9d9e0"; g.beginPath(); g.moveTo(hx, top - headR * 0.6); g.lineTo(hx + headR * 0.18, top - headR * 0.3); g.lineTo(hx, top - headR * 0.05); g.lineTo(hx - headR * 0.18, top - headR * 0.3); g.closePath(); g.fill(); g.lineWidth = 4; g.stroke();
  } else if (s.hat === "boater") {
    g.fillStyle = hc; g.beginPath(); g.ellipse(hx, top + 2, headR * 1.15, headR * 0.16, 0, 0, Math.PI * 2); g.fill(); g.stroke();
    g.beginPath(); g.roundRect(hx - headR * 0.6, top - headR * 0.4, headR * 1.2, headR * 0.42, 4); g.fill(); g.stroke();
    if (s.band) { g.fillStyle = s.band; g.fillRect(hx - headR * 0.6 + 3, top - headR * 0.12, headR * 1.2 - 6, headR * 0.12); }
  } else if (s.hat === "cap") { // Railway conductor peaked cap
    g.fillStyle = hc; g.beginPath(); g.roundRect(hx - headR * 0.82, top - headR * 0.5, headR * 1.64, headR * 0.62, [headR * 0.25, headR * 0.25, 4, 4]); g.fill(); g.stroke();
    // shiny black visor
    g.fillStyle = "#121216"; g.beginPath(); g.ellipse(hx, top + headR * 0.16, headR * 0.85, headR * 0.22, 0, 0, Math.PI * 2); g.fill(); g.stroke();
    if (s.band) { g.fillStyle = s.band; g.fillRect(hx - headR * 0.8, top - headR * 0.08, headR * 1.6, headR * 0.16); } // gold band
    g.fillStyle = "#e8c95a"; g.beginPath(); g.arc(hx, top - headR * 0.25, headR * 0.12, 0, Math.PI * 2); g.fill(); g.stroke(); // gold JR badge
  } else if (s.hat === "earmuffs") { // Fluffy winter earmuffs
    g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.arc(hx, headY - headR * 0.1, headR * 1.12, Math.PI * 1.1, Math.PI * 1.9); g.stroke();
    g.fillStyle = hc; g.lineWidth = 5;
    for (const side of [-1, 1]) {
      g.beginPath(); g.ellipse(hx + side * headR * 1.05, headY - headR * 0.05, headR * 0.32, headR * 0.42, 0, 0, Math.PI * 2); g.fill(); g.stroke();
    }
  } else if (s.hat === "bob") { // Japanese student bob hair with bangs
    const hairC = s.hair ?? "#221e22";
    g.fillStyle = hairC; g.lineWidth = 6; g.strokeStyle = INK;
    // top volume
    g.beginPath();
    g.arc(hx, headY - headR * 0.1, headR * 1.1, Math.PI, 0);
    g.lineTo(hx + headR * 1.15, headY + headR * 0.6);
    g.quadraticCurveTo(hx + headR * 0.95, headY + headR * 0.8, hx + headR * 0.75, headY + headR * 0.5);
    g.lineTo(hx + headR * 0.6, headY - headR * 0.2); // bangs start
    g.quadraticCurveTo(hx + headR * 0.2, headY - headR * 0.1, hx, headY - headR * 0.22);
    g.quadraticCurveTo(hx - headR * 0.2, headY - headR * 0.1, hx - headR * 0.6, headY - headR * 0.2);
    g.lineTo(hx - headR * 0.75, headY + headR * 0.5);
    g.quadraticCurveTo(hx - headR * 0.95, headY + headR * 0.8, hx - headR * 1.15, headY + headR * 0.6);
    g.closePath(); g.fill(); g.stroke();
  }

  // props held in hand
  const prop = p.prop ?? "none";
  if (prop !== "none") {
    const H2 = (p.propHand ?? "R") === "R" ? aR : aL;
    drawProp(g, prop, H2.hx, H2.hy, p.t, (p.propHand ?? "R") === "R" ? 1 : -1);
  }
  if (front(p.armL ?? "down")) hand(g, aL.hx, aL.hy);
  if (front(p.armR ?? "down")) hand(g, aR.hx, aR.hy);
  for (const [A, a] of [[aL, p.armL], [aR, p.armR]] as const) if (["up", "wave"].includes(a ?? "")) { drawArm(A); hand(g, A.hx, A.hy); }
  return { headTopY: top - headR, headY, hipY };
}

// A cartoon horse (side view), drawn in the same ink style. Faces right.
export function drawHorse(g: CanvasRenderingContext2D, t: number, walk = 0, color = "#7a4a2c", blanket?: string) {
  g.clearRect(0, 0, 1024, 1024);
  const ground = 1000, ph = t * 6 * (walk || 1), bob = walk ? Math.sin(ph * 2) * 6 : Math.sin(t * 1.8) * 2;
  const bodyY = 560 + bob, bx = 470;
  g.lineCap = "round"; g.strokeStyle = INK;
  const leg = (x: number, phase: number, back: boolean) => {
    const sw = walk ? Math.sin(ph + phase) * 40 : 0;
    const kx = x + sw * 0.5, ky = bodyY + 220, fx = x + sw, fy = ground - 14 - (walk ? Math.max(0, Math.cos(ph + phase)) * 22 : 0);
    g.lineWidth = 34; g.strokeStyle = back ? darker(color, 0.75) : color;
    g.beginPath(); g.moveTo(x, bodyY + 60); g.quadraticCurveTo(kx, ky, fx, fy); g.stroke();
    g.lineWidth = 6; g.strokeStyle = INK; g.beginPath(); g.moveTo(x - 17, bodyY + 60); g.quadraticCurveTo(kx - 17, ky, fx - 17, fy); g.stroke();
    g.beginPath(); g.moveTo(x + 17, bodyY + 60); g.quadraticCurveTo(kx + 17, ky, fx + 17, fy); g.stroke();
    g.fillStyle = INK; g.beginPath(); g.roundRect(fx - 22, fy - 6, 46, 24, 6); g.fill();
  };
  leg(bx - 190, Math.PI, true); leg(bx + 170, 0, true);
  // tail
  g.strokeStyle = "#2b1b12"; g.lineWidth = 26; g.beginPath(); g.moveTo(bx - 280, bodyY - 40); g.quadraticCurveTo(bx - 360, bodyY + 40 + Math.sin(t * 3) * 10, bx - 330, bodyY + 200); g.stroke();
  // body
  g.fillStyle = color; g.lineWidth = 9; g.strokeStyle = INK;
  g.beginPath(); g.ellipse(bx, bodyY, 300, 135, 0, 0, Math.PI * 2); g.fill(); g.stroke();
  if (blanket) { g.fillStyle = blanket; g.beginPath(); g.roundRect(bx - 120, bodyY - 132, 220, 170, 20); g.fill(); g.lineWidth = 6; g.stroke(); }
  // neck + head
  g.fillStyle = color; g.lineWidth = 9;
  g.beginPath(); g.moveTo(bx + 180, bodyY - 70); g.lineTo(bx + 290, bodyY - 300); g.lineTo(bx + 380, bodyY - 270); g.lineTo(bx + 300, bodyY + 10); g.closePath(); g.fill(); g.stroke();
  g.beginPath(); g.ellipse(bx + 370, bodyY - 280, 120, 62, 0.45, 0, Math.PI * 2); g.fill(); g.stroke();
  g.fillStyle = "#2b1b12"; g.beginPath(); g.moveTo(bx + 230, bodyY - 250); g.quadraticCurveTo(bx + 280, bodyY - 380, bx + 320, bodyY - 330); g.lineTo(bx + 220, bodyY - 120); g.closePath(); g.fill(); g.lineWidth = 5; g.stroke();
  // ear, eye, nostril
  g.fillStyle = color; g.lineWidth = 7; g.beginPath(); g.moveTo(bx + 300, bodyY - 320); g.lineTo(bx + 310, bodyY - 390); g.lineTo(bx + 340, bodyY - 325); g.fill(); g.stroke();
  g.fillStyle = INK; g.beginPath(); g.ellipse(bx + 360, bodyY - 300, 10, 13, 0, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.ellipse(bx + 455, bodyY - 238, 7, 5, 0.4, 0, Math.PI * 2); g.fill();
  // bridle
  g.strokeStyle = "#3a2214"; g.lineWidth = 8; g.beginPath(); g.moveTo(bx + 320, bodyY - 310); g.lineTo(bx + 430, bodyY - 210); g.stroke();
  leg(bx - 150, 0, false); leg(bx + 210, Math.PI, false);
}

// Custom Pikachu: small, chubby mouse, bright yellow fur, long pointed ears with black tips,
// small black eyes, tiny nose, smiling mouth, red cheek pouches, two brown back stripes,
// short paws, lightning bolt tail with brown base and NO black tip.
export function drawPikachu(g: CanvasRenderingContext2D, _s: ToonSpec, p: ToonPose) {
  g.clearRect(0, 0, 768, 1024);
  const cx = 384, ground = 940;
  const walk = p.walk ?? 0, ph = p.t * 8 * (walk || 1);
  const bob = walk ? Math.abs(Math.sin(ph)) * 14 : Math.sin(p.t * 2.5) * 4;
  const tailSway = Math.sin(p.t * 3.5) * 8;
  const earTwitch = Math.sin(p.t * 2.8) * 0.04;

  const bodyY = ground - 260 - bob;
  const headY = bodyY - 145;

  g.lineCap = "round";
  g.lineJoin = "round";

  // ---- 1. TAIL (Behind Body, Zigzag Lightning Bolt) ----
  // Base is brown, rest is bright electric yellow, NO BLACK TIP!
  g.save();
  g.translate(cx - 70, bodyY + 50);
  g.rotate(tailSway * 0.02);

  // Brown base segment
  g.fillStyle = "#7a3810";
  g.strokeStyle = INK;
  g.lineWidth = 8;
  g.beginPath();
  g.moveTo(0, 0);
  g.lineTo(-45, -50);
  g.lineTo(-20, -75);
  g.lineTo(15, -25);
  g.closePath();
  g.fill();
  g.stroke();

  // Zigzag segments (Bright Electric Yellow)
  g.fillStyle = "#ffde00";
  // Segment 2
  g.beginPath();
  g.moveTo(-45, -50);
  g.lineTo(-90, -110);
  g.lineTo(-60, -135);
  g.lineTo(-20, -75);
  g.closePath();
  g.fill();
  g.stroke();

  // Segment 3
  g.beginPath();
  g.moveTo(-90, -110);
  g.lineTo(-145, -180);
  g.lineTo(-105, -215);
  g.lineTo(-60, -135);
  g.closePath();
  g.fill();
  g.stroke();

  // Broad lightning blade tip (PURE YELLOW, NO BLACK TIP!)
  g.beginPath();
  g.moveTo(-145, -180);
  g.lineTo(-210, -260);
  g.lineTo(-205, -380); // top tip
  g.lineTo(-110, -320); // right edge
  g.lineTo(-125, -270);
  g.lineTo(-75, -250);
  g.lineTo(-105, -215);
  g.closePath();
  g.fill();
  g.stroke();
  g.restore();

  // ---- 2. BACK BROWN STRIPES ----
  // Two brown curved horizontal stripes on lower back
  g.strokeStyle = "#7a3810";
  g.lineWidth = 18;
  g.beginPath();
  g.moveTo(cx - 110, bodyY + 20);
  g.quadraticCurveTo(cx, bodyY + 45, cx + 110, bodyY + 20);
  g.stroke();
  g.beginPath();
  g.moveTo(cx - 100, bodyY + 70);
  g.quadraticCurveTo(cx, bodyY + 95, cx + 100, bodyY + 70);
  g.stroke();

  // ---- 3. EARS (Long, Pointed, Standing Up, Black Tips) ----
  const drawEar = (side: number, angle: number) => {
    g.save();
    const bx = cx + side * 90;
    const by = headY - 60;
    g.translate(bx, by);
    g.rotate(angle + earTwitch * side);

    // Full Ear Path
    g.beginPath();
    g.moveTo(-25, 0);
    g.quadraticCurveTo(-30, -130, 0, -230); // pointed tip
    g.quadraticCurveTo(30, -130, 25, 0);
    g.closePath();

    // Fill Yellow
    g.fillStyle = "#ffde00";
    g.fill();

    // Clip and Fill Black Tip (Top 35% of ear)
    g.save();
    g.clip();
    g.fillStyle = "#18181b"; // black tip
    g.fillRect(-45, -240, 90, 85);
    g.restore();

    // Stroke Outline
    g.strokeStyle = INK;
    g.lineWidth = 8;
    g.stroke();
    g.restore();
  };
  drawEar(-1, -0.28); // Left ear pointing up-left
  drawEar(1, 0.28);   // Right ear pointing up-right

  // ---- 4. CHUBBY MOUSE-LIKE BODY & HEAD ----
  g.fillStyle = "#ffde00";
  g.strokeStyle = INK;
  g.lineWidth = 9;

  // Lower round body
  g.beginPath();
  g.ellipse(cx, bodyY + 40, 160, 150, 0, 0, Math.PI * 2);
  g.fill();
  g.stroke();

  // Chubby Head
  g.beginPath();
  g.ellipse(cx, headY, 145, 125, 0, 0, Math.PI * 2);
  g.fill();
  g.stroke();

  // Subtle belly warmth highlight
  g.fillStyle = "rgba(254, 240, 138, 0.45)";
  g.beginPath();
  g.ellipse(cx, bodyY + 45, 105, 95, 0, 0, Math.PI * 2);
  g.fill();

  // ---- 5. CHEEKS (Two Round Red Circles, Store Electricity) ----
  g.fillStyle = "#e60012";
  g.strokeStyle = INK;
  g.lineWidth = 6;
  // Left cheek
  g.beginPath();
  g.arc(cx - 100, headY + 38, 34, 0, Math.PI * 2);
  g.fill();
  g.stroke();
  // Right cheek
  g.beginPath();
  g.arc(cx + 100, headY + 38, 34, 0, Math.PI * 2);
  g.fill();
  g.stroke();

  // ---- 6. FACE (Eyes, Tiny Nose, Smiling Mouth) ----
  // Small black eyes with white highlight dots
  const eyeR = 15;
  for (const side of [-1, 1]) {
    const ex = cx + side * 58;
    const ey = headY - 10;
    g.fillStyle = "#18181b";
    g.beginPath();
    g.arc(ex, ey, eyeR, 0, Math.PI * 2);
    g.fill();

    // White shine/reflection dot
    g.fillStyle = "#ffffff";
    g.beginPath();
    g.arc(ex - side * 4, ey - 4, 5.5, 0, Math.PI * 2);
    g.fill();
  }

  // Tiny Black Nose
  g.fillStyle = "#18181b";
  g.beginPath();
  g.moveTo(cx, headY + 16);
  g.lineTo(cx - 4, headY + 12);
  g.lineTo(cx + 4, headY + 12);
  g.closePath();
  g.fill();

  // Cute Smiling Mouth (w-shape / open smile)
  g.strokeStyle = INK;
  g.lineWidth = 6;
  g.beginPath();
  g.moveTo(cx - 24, headY + 32);
  g.quadraticCurveTo(cx - 12, headY + 45, cx, headY + 34);
  g.quadraticCurveTo(cx + 12, headY + 45, cx + 24, headY + 32);
  g.stroke();

  // Tongue if talking or grinning
  if (p.talk || p.mouth === "grin" || p.mouth === "open") {
    g.fillStyle = "#f43f5e";
    g.beginPath();
    g.arc(cx, headY + 42, 11, 0, Math.PI);
    g.fill();
  }

  // ---- 7. SHORT ARMS WITH SMALL PAWS ----
  const drawArm = (side: number) => {
    const ax = cx + side * 75;
    const ay = bodyY - 30;
    const reach = side * (p.armR === "wave" && side > 0 ? -15 : 10);
    g.fillStyle = "#ffde00";
    g.strokeStyle = INK;
    g.lineWidth = 7;
    g.beginPath();
    g.ellipse(ax + reach, ay + 35, 28, 48, side * 0.45, 0, Math.PI * 2);
    g.fill();
    g.stroke();

    // Tiny paw lines
    g.strokeStyle = INK;
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(ax + reach - 8, ay + 72);
    g.lineTo(ax + reach - 8, ay + 80);
    g.moveTo(ax + reach, ay + 74);
    g.lineTo(ax + reach, ay + 82);
    g.moveTo(ax + reach + 8, ay + 72);
    g.lineTo(ax + reach + 8, ay + 80);
    g.stroke();
  };
  drawArm(-1);
  drawArm(1);

  // ---- 8. SHORT LEGS / FEET ----
  const drawFoot = (side: number) => {
    const sw = walk ? Math.sin(ph + (side > 0 ? Math.PI : 0)) * 25 : 0;
    const fx = cx + side * 70 + sw;
    const fy = ground - 70;
    g.fillStyle = "#ffde00";
    g.strokeStyle = INK;
    g.lineWidth = 7;
    g.beginPath();
    g.ellipse(fx, fy, 40, 24, side * 0.1, 0, Math.PI * 2);
    g.fill();
    g.stroke();

    // Tiny toe notches
    g.strokeStyle = INK;
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(fx - 10, fy + 16);
    g.lineTo(fx - 10, fy + 22);
    g.moveTo(fx + 10, fy + 16);
    g.lineTo(fx + 10, fy + 22);
    g.stroke();
  };
  drawFoot(-1);
  drawFoot(1);

  return { headTopY: headY - 240, headY, hipY: bodyY };
}
