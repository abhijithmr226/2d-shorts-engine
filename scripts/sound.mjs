// Music + ambience + sound effects, all made in code (free, no licence worries).
// Usage: node scripts/sound.mjs ep1   -> public/ep1/bed.wav (everything except the voice)
// Reads episodes/<ep>/timing.json (shot start times) and episodes/<ep>/sound.json:
//   { "bpm": 108, "key": "D", "music": 0.16, "amb": { "<shot id>": "wind" | "pub" | "room" | "desk" },
//     "sfx": [ { "shot": 12, "at": 0.9, "type": "coin" }, ... ] }
import fs from "node:fs";
import path from "node:path";

const ep = process.argv[2] || "ep1";
const SR = 44100;
const T = JSON.parse(fs.readFileSync(path.join("episodes", ep, "timing.json"), "utf8"));
const S = JSON.parse(fs.readFileSync(path.join("episodes", ep, "sound.json"), "utf8"));
const TAIL = 2.4, total = T.total + TAIL, N = Math.ceil(total * SR);
const L = new Float32Array(N), R = new Float32Array(N);
let seed = 12345; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const shotStart = (id) => { const i = T.shots.findIndex((s) => s.id === id); return i <= 0 ? 0 : T.shots[i].start; };
const shotEnd = (id) => { const i = T.shots.findIndex((s) => s.id === id); return i + 1 < T.shots.length ? T.shots[i + 1].start : total; };
const add = (buf, t0, gain = 1, pan = 0) => {
  const o = Math.round(t0 * SR); const gl = gain * Math.min(1, 1 - pan), gr = gain * Math.min(1, 1 + pan);
  for (let i = 0; i < buf.length && o + i < N; i++) if (o + i >= 0) { L[o + i] += buf[i] * gl; R[o + i] += buf[i] * gr; }
};

// ---- warm cinematic piano & ambient instruments ----
const warmKey = (f, dur = 1.4) => {
  const n = Math.round(dur * SR), o = new Float32Array(n);
  const att = Math.round(0.025 * SR);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = i < att ? i / att : Math.exp(-(t - 0.025) * 2.2);
    const s1 = Math.sin(2 * Math.PI * f * t);
    const s2 = 0.22 * Math.sin(2 * Math.PI * f * 2 * t) * Math.exp(-t * 4);
    const s3 = 0.06 * Math.sin(2 * Math.PI * f * 3 * t) * Math.exp(-t * 6);
    o[i] = (s1 + s2 + s3) * env * 0.65;
  }
  return o;
};

const warmBass = (f, dur = 2.4) => {
  const n = Math.round(dur * SR), o = new Float32Array(n);
  const att = Math.round(0.04 * SR);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = i < att ? i / att : Math.exp(-(t - 0.04) * 1.4);
    const s1 = Math.sin(2 * Math.PI * f * t);
    const s2 = 0.12 * Math.sin(2 * Math.PI * f * 2 * t);
    o[i] = (s1 + s2) * env * 0.8;
  }
  return o;
};

const bell = (f, dur = 0.8) => {
  const n = Math.round(dur * SR), o = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    o[i] = Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 5.0) * Math.min(1, t * 200);
  }
  return o;
};

const noise = (dur, shape) => { const n = Math.round(dur * SR), o = new Float32Array(n); for (let i = 0; i < n; i++) o[i] = (rnd() * 2 - 1) * shape(i / SR, dur); return o; };
const lowpass = (x, fc) => { const a = 1 - Math.exp((-2 * Math.PI * fc) / SR); let y = 0; const o = new Float32Array(x.length); for (let i = 0; i < x.length; i++) { y += a * (x[i] - y); o[i] = y; } return o; };
const bandpass = (x, lo, hi) => { const l = lowpass(x, hi), h = lowpass(l, lo); return l.map((v, i) => v - h[i]); };
const tone = (f0, f1, dur, decay = 8) => { const n = Math.round(dur * SR), o = new Float32Array(n); let ph = 0; for (let i = 0; i < n; i++) { const t = i / SR, f = f0 + (f1 - f0) * (t / dur); ph += (2 * Math.PI * f) / SR; o[i] = Math.sin(ph) * Math.exp(-t * decay) * Math.min(1, t * 300); } return o; };

// ---- music: warm, gentle, cinematic progression (no harsh plucking, no piercing bells) ----
const KEYS = { C: 261.63, D: 293.66, E: 329.63, F: 349.23, G: 392.0, A: 440.0 };
const root = KEYS[S.key || "D"] / 2, semi = (n) => root * 2 ** (n / 12);
const prog = [[0, 4, 7], [7, 11, 14], [9, 12, 16], [5, 9, 12]];
const scale = [0, 2, 4, 7, 9, 12, 14];
const beat = 60 / (S.bpm || 108);
const mus = { L: new Float32Array(N), R: new Float32Array(N) };
const addM = (buf, t0, g, pan = 0) => { const o = Math.round(t0 * SR); for (let i = 0; i < buf.length && o + i < N; i++) { mus.L[o + i] += buf[i] * g * (1 - Math.max(0, pan)); mus.R[o + i] += buf[i] * g * (1 + Math.min(0, pan)); } };

for (let bar = 0, t = 0; t < total; bar++, t = bar * 4 * beat) {
  const ch = prog[bar % 4];
  // Warm deep bass note on downbeat
  addM(warmBass(semi(ch[0] - 12), 3.8 * beat), t, 0.7);

  // Soft lush triad chords on beat 1 and beat 3
  for (const n of ch) {
    addM(warmKey(semi(n), 2.2 * beat), t, 0.28, n % 2 ? 0.25 : -0.25);
    addM(warmKey(semi(n), 2.0 * beat), t + 2 * beat, 0.22, n % 2 ? -0.2 : 0.2);
  }

  // Sparse, gentle melodic accents (only 2 soft notes per bar, never high-register)
  const mel1 = ch[bar % 3] + 12;
  const mel2 = scale[(bar * 2 + 1) % scale.length] + 12;
  addM(warmKey(semi(mel1), 1.5 * beat), t + 1.5 * beat, 0.25, 0.1);
  addM(warmKey(semi(mel2), 1.5 * beat), t + 3.0 * beat, 0.22, -0.1);
}

// Lowpass filter entire music layer at 1200 Hz to remove all high-frequency harshness
mus.L = lowpass(mus.L, 1200);
mus.R = lowpass(mus.R, 1200);

// Smooth warm studio space reverb on the music
for (const ch of [mus.L, mus.R]) for (const [dt, g] of [[0.045, 0.28], [0.082, 0.2], [0.125, 0.14]]) { const d = Math.round(dt * SR); for (let i = N - 1; i >= d; i--) ch[i] += ch[i - d] * g; }
const fadeIn = 0.25 * SR, fadeOut = 1.4 * SR;
for (let i = 0; i < N; i++) {
  const tSec = i / SR;
  let duckK = 1.0;
  for (const d of S.duck || []) {
    if (tSec >= d.start - 0.5 && tSec <= d.end + 0.5) {
      if (tSec < d.start + 0.5) duckK = Math.min(duckK, 1.0 - (1.0 - (d.gain ?? 0.25)) * ((tSec - (d.start - 0.5)) / 1.0));
      else if (tSec > d.end - 0.5) duckK = Math.min(duckK, (d.gain ?? 0.25) + (1.0 - (d.gain ?? 0.25)) * ((tSec - (d.end - 0.5)) / 1.0));
      else duckK = Math.min(duckK, d.gain ?? 0.25);
    }
  }
  const k = Math.min(1, i / fadeIn, (N - i) / fadeOut) * duckK;
  L[i] += mus.L[i] * k * (S.music ?? 0.08);
  R[i] += mus.R[i] * k * (S.music ?? 0.08);
}

// ---- ambience per shot ----
for (const [id, kind] of Object.entries(S.amb || {})) {
  const a = shotStart(+id), b = shotEnd(+id), d = b - a + 0.15;
  if (kind === "wind") { const w = lowpass(noise(d, (t) => (0.6 + 0.4 * Math.sin(t * 1.3 + +id)) * Math.min(1, t / 0.08, (d - t) / 0.1)), 500); add(w, a, 0.22 * 0.4, -0.1); /* 2026-11-05: softer wind, no hiss layer */ }
  // 2026-11-05 user: the pub sounded noisy. Now a soft, low murmur only (no glass clinks), much quieter.
  if (kind === "pub") { const m = lowpass(noise(d, (t) => (0.75 + 0.25 * Math.sin(t * 2.1)) * Math.min(1, t / 0.15, (d - t) / 0.2)), 420); add(m, a, 0.14); }
  if (kind === "room") { add(lowpass(noise(d, (t) => Math.min(1, t / 0.08, (d - t) / 0.1)), 300), a, 0.12); }
  if (kind === "desk") add(lowpass(noise(d, (t) => Math.min(1, t / 0.08, (d - t) / 0.1)), 200), a, 0.06);
}

// ---- sound effects ----
const FX = {
  whoosh: () => lowpass(noise(0.45, (t, d) => Math.sin((Math.PI * t) / d) ** 2), 1400),
  coin: () => { const o = bell(2637, 0.6); const b = bell(3520, 0.5); return o.map((v, i) => v + (b[i] || 0) * 0.6); },
  pop: () => tone(900 + rnd() * 500, 300, 0.09, 30),
  thump: () => { const o = tone(120, 45, 0.35, 9); const n = lowpass(noise(0.12, (t, d) => 1 - t / d), 900); return o.map((v, i) => v + (n[i] || 0) * 0.8); },
  knock: () => tone(260, 180, 0.12, 35),
  tick: () => tone(1800, 1500, 0.05, 60),
  hoof: () => { const o = tone(380, 220, 0.08, 45); return o.map((v) => v * 0.9); },
  chatter: () => { const o = new Float32Array(Math.round(0.9 * SR)); for (let k = 0; k < 14; k++) { const c = tone(2000 + rnd() * 300, 1600, 0.02, 120); o.set(c.map((v, i) => v + (o[Math.round(k * 0.06 * SR) + i] || 0)), Math.round(k * 0.06 * SR)); } return o; },
  bite: () => lowpass(noise(0.12, (t, d) => (1 - t / d) * (t < 0.01 ? t / 0.01 : 1)), 2500),
  shimmer: () => { const o = new Float32Array(Math.round(1.6 * SR));[0, 4, 7, 12, 16].forEach((n, k) => { const b = bell(semi(n + 24), 1.2); for (let i = 0; i < b.length && i + k * 3000 < o.length; i++) o[i + k * 3000] += b[i] * 0.6; }); return o; },
  // ---- New cinematic SFX learned from Celyxi & SevMotion ----
  whip: () => lowpass(noise(0.18, (t, d) => Math.sin((Math.PI * t) / d) ** 3), 2200),
  sub_drop: () => tone(85, 38, 0.65, 5),
  card_slide: () => bandpass(noise(0.22, (t, d) => (1 - t / d) * Math.sin(t * 12)), 800, 3200),
  stamp: () => { const o = tone(110, 42, 0.4, 10); const n = lowpass(noise(0.08, (t, d) => 1 - t / d), 1400); return o.map((v, i) => v + (n[i] || 0) * 0.9); },
  blip: () => tone(1850, 1400, 0.06, 50),
  // ---- New SFX learned from Ricks Clips (Grave Bell, Lottery) & Sky3dFilms (Napoleon Chess) ----
  grave_bell: () => {
    const o = bell(1320, 2.0);
    const b = bell(2640, 1.4);
    return o.map((v, i) => v * 0.8 + (b[i] || 0) * 0.35);
  },
  scanner_beep: () => tone(1850, 1850, 0.08, 40),
  ticket_scratch: () => bandpass(noise(0.12, (t, d) => (1 - t / d) * Math.sin(t * 26)), 1200, 3800),
  gear_cog: () => {
    const o = tone(380, 160, 0.04, 60);
    const n = bandpass(noise(0.03, (t, d) => 1 - t / d), 1800, 4000);
    return o.map((v, i) => v + (n[i] || 0) * 0.7);
  },
  wood_knock: () => {
    const o = tone(220, 95, 0.08, 30);
    const n = lowpass(noise(0.04, (t, d) => 1 - t / d), 1200);
    return o.map((v, i) => v + (n[i] || 0) * 0.85);
  },
  phone_buzz: () => {
    const dur = 0.35, n = Math.round(dur * SR), o = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      const mod = Math.sin(2 * Math.PI * 32 * t);
      const carrier = Math.sin(2 * Math.PI * 165 * t);
      const sub = Math.sin(2 * Math.PI * 82 * t) * 0.4;
      const env = Math.sin((Math.PI * t) / dur) ** 2;
      o[i] = (carrier + sub) * (0.6 + 0.4 * mod) * env * 0.7;
    }
    return o;
  },
  double_buzz: () => {
    const dur = 0.58, n = Math.round(dur * SR), o = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      const p1 = t < 0.22 ? Math.sin((Math.PI * t) / 0.22) ** 2 : 0;
      const p2 = t > 0.30 && t < 0.52 ? Math.sin((Math.PI * (t - 0.30)) / 0.22) ** 2 : 0;
      const env = p1 + p2;
      const mod = Math.sin(2 * Math.PI * 34 * t);
      const carrier = Math.sin(2 * Math.PI * 170 * t) + 0.35 * Math.sin(2 * Math.PI * 85 * t);
      o[i] = carrier * (0.6 + 0.4 * mod) * env * 0.8;
    }
    return o;
  },
  table_vibration: () => {
    const dur = 0.45, n = Math.round(dur * SR), o = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      const env = Math.sin((Math.PI * t) / dur) ** 2;
      const rattle = (rnd() * 2 - 1) * 0.25 * Math.sin(2 * Math.PI * 40 * t);
      const wood = Math.sin(2 * Math.PI * 110 * t) * Math.exp(-t * 6);
      const buzz = Math.sin(2 * Math.PI * 180 * t) * (0.5 + 0.5 * Math.sin(2 * Math.PI * 30 * t));
      o[i] = (buzz * 0.6 + wood * 0.4 + rattle) * env * 0.85;
    }
    return o;
  },
  iphone_ping: () => {
    const n = Math.round(0.45 * SR), o = new Float32Array(n);
    const b1 = bell(1318.5, 0.22);
    const b2 = bell(1760.0, 0.35);
    const offset = Math.round(0.08 * SR);
    for (let i = 0; i < b1.length; i++) o[i] += b1[i] * 0.6;
    for (let i = 0; i < b2.length && i + offset < n; i++) o[i + offset] += b2[i] * 0.75;
    return o;
  },
  android_ping: () => {
    const n = Math.round(0.5 * SR), o = new Float32Array(n);
    [523.25, 659.25, 783.99].forEach((f, k) => {
      const b = bell(f, 0.25);
      const off = Math.round(k * 0.07 * SR);
      for (let i = 0; i < b.length && i + off < n; i++) o[i + off] += b[i] * 0.5;
    });
    return o;
  },
  phone_unlock: () => tone(1400, 2600, 0.035, 80),
  touchscreen_tap: () => tone(2400, 900, 0.022, 120),
  message_pop: () => tone(850, 1650, 0.06, 40),
  digital_error: () => {
    const n = Math.round(0.3 * SR), o = new Float32Array(n);
    const t1 = tone(320, 220, 0.12, 15);
    const off = Math.round(0.12 * SR);
    for (let i = 0; i < t1.length; i++) o[i] += t1[i] * 0.7;
    for (let i = 0; i < t1.length && i + off < n; i++) o[i + off] += t1[i] * 0.7;
    return o;
  },
  cartoon_pop: () => tone(450, 1600, 0.08, 25),
  cartoon_boing: () => {
    const dur = 0.55, n = Math.round(dur * SR), o = new Float32Array(n);
    let ph = 0;
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      const f = 260 + 180 * Math.sin(2 * Math.PI * 14 * t) * Math.exp(-t * 3.5);
      ph += (2 * Math.PI * f) / SR;
      o[i] = Math.sin(ph) * Math.exp(-t * 4.5) * 0.7;
    }
    return o;
  },
  record_scratch: () => {
    const dur = 0.35, n = Math.round(dur * SR), o = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      const speed = Math.max(0, 1 - t / dur);
      const f = (1200 + 800 * Math.sin(t * 80)) * speed;
      const nse = (rnd() * 2 - 1) * 0.5;
      o[i] = (Math.sin(2 * Math.PI * f * t) * 0.5 + nse) * Math.sin((Math.PI * t) / dur) * 0.75;
    }
    return bandpass(o, 800, 4500);
  },
  morning_birds: () => {
    const dur = 1.2, n = Math.round(dur * SR), o = new Float32Array(n);
    for (let k = 0; k < 3; k++) {
      const t0 = k * 0.32, bDur = 0.18;
      for (let i = 0; i < Math.round(bDur * SR); i++) {
        const t = i / SR, f = 2800 + 1200 * Math.sin(2 * Math.PI * 22 * t);
        const env = Math.sin((Math.PI * t) / bDur) ** 2, idx = Math.round((t0 + t) * SR);
        if (idx < n) o[idx] += Math.sin(2 * Math.PI * f * t) * env * 0.35;
      }
    }
    return o;
  },
  morning_breeze: () => lowpass(noise(1.4, (t, d) => Math.sin((Math.PI * t) / d) ** 2), 650),
  clock_tick: () => {
    const t1 = tone(3200, 1800, 0.02, 110);
    const n = bandpass(noise(0.015, (t, d) => 1 - t / d), 2500, 6000);
    return t1.map((v, i) => v * 0.6 + (n[i] || 0) * 0.4);
  },
  fast_clock_tick: () => {
    const dur = 0.8, n = Math.round(dur * SR), o = new Float32Array(n);
    for (let k = 0; k < 6; k++) {
      const off = Math.round(k * 0.12 * SR);
      const t1 = tone(3400 + (k % 2) * 400, 2000, 0.018, 120);
      for (let i = 0; i < t1.length && i + off < n; i++) o[i + off] += t1[i] * 0.5;
    }
    return o;
  },
  day_night_whoosh: () => {
    const dur = 1.2, n = Math.round(dur * SR), o = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      const env = Math.sin((Math.PI * t) / dur) ** 2;
      const sweep = Math.sin(2 * Math.PI * (180 + 350 * (t / dur)) * t);
      const nse = (rnd() * 2 - 1) * 0.4;
      o[i] = (sweep * 0.5 + nse) * env * 0.6;
    }
    return lowpass(o, 1200);
  },
  evening_crickets: () => {
    const dur = 1.4, n = Math.round(dur * SR), o = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / SR, pulse = Math.sin(2 * Math.PI * 18 * t) > 0.3 ? 1 : 0;
      o[i] = Math.sin(2 * Math.PI * 4600 * t) * pulse * 0.25 * Math.sin((Math.PI * t) / dur);
    }
    return o;
  },
  night_wind: () => bandpass(noise(1.8, (t, d) => Math.sin((Math.PI * t) / d) ** 2), 250, 950),
  toothbrush: () => {
    const dur = 0.9, n = Math.round(dur * SR), o = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / SR, stroke = Math.sin(2 * Math.PI * 6.5 * t);
      o[i] = (rnd() * 2 - 1) * (0.4 + 0.6 * Math.abs(stroke)) * Math.sin((Math.PI * t) / dur) * 0.4;
    }
    return bandpass(o, 1200, 3800);
  },
  plate_clink: () => {
    const b1 = bell(3136, 0.35), b2 = bell(4186, 0.22);
    return b1.map((v, i) => v * 0.6 + (b2[i] || 0) * 0.4);
  },
  water_tap: () => bandpass(noise(0.8, (t, d) => Math.sin((Math.PI * t) / d)), 400, 2200),
  phantom_buzz: () => {
    const dur = 0.65, n = Math.round(dur * SR), o = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      const buzz = Math.sin(2 * Math.PI * 155 * t) * (0.5 + 0.5 * Math.sin(2 * Math.PI * 28 * t));
      const eerie = Math.sin(2 * Math.PI * 880 * t) * 0.25;
      o[i] = (buzz * 0.7 + eerie) * (Math.sin((Math.PI * t) / dur) ** 2) * 0.75;
    }
    return o;
  },
  glitch_pop: () => {
    const o = tone(3400, 400, 0.05, 70);
    const n = (noise(0.04, () => 1)).map((v) => v * 0.4);
    return o.map((v, i) => v + (n[i] || 0));
  },
  counter_tick: () => {
    const dur = 0.45, n = Math.round(dur * SR), o = new Float32Array(n);
    for (let k = 0; k < 5; k++) {
      const off = Math.round(k * 0.08 * SR);
      const t1 = tone(2400 + k * 120, 1600, 0.02, 100);
      for (let i = 0; i < t1.length && i + off < n; i++) o[i + off] += t1[i] * 0.45;
    }
    return o;
  },
  dramatic_riser: () => {
    const dur = 1.4, n = Math.round(dur * SR), o = new Float32Array(n);
    let ph = 0;
    for (let i = 0; i < n; i++) {
      const t = i / SR, progress = t / dur;
      ph += (2 * Math.PI * (90 + 380 * (progress ** 2))) / SR;
      o[i] = (Math.sin(ph) * 0.6 + (rnd() * 2 - 1) * 0.2 * progress) * (progress ** 1.5) * 0.8;
    }
    return o;
  },
  bass_drop: () => tone(95, 32, 0.85, 4),
  neural_hum: () => {
    const dur = 0.9, n = Math.round(dur * SR), o = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / SR, f = 440 + 80 * Math.sin(2 * Math.PI * 12 * t);
      o[i] = Math.sin(2 * Math.PI * f * t) * (Math.sin((Math.PI * t) / dur) ** 2) * 0.55;
    }
    return o;
  },
  sparkle: () => {
    const n = Math.round(0.7 * SR), o = new Float32Array(n);
    [1046, 1318, 1567, 2093, 2637].forEach((f, k) => {
      const b = bell(f, 0.35);
      const off = Math.round(k * 0.08 * SR);
      for (let i = 0; i < b.length && i + off < n; i++) o[i + off] += b[i] * 0.4;
    });
    return o;
  },
  heart_pop: () => tone(520, 1300, 0.07, 30),
  gameshow_countdown: () => {
    const b1 = bell(1046.5, 0.2), b2 = bell(2093.0, 0.35);
    return b1.map((v, i) => v * 0.6 + (b2[i] || 0) * 0.6);
  },
  arcade_ding: () => bell(2349.3, 0.45),
  success_chime: () => {
    const n = Math.round(0.6 * SR), o = new Float32Array(n);
    [587.33, 739.99, 880.0, 1174.66].forEach((f, k) => {
      const b = bell(f, 0.35);
      const off = Math.round(k * 0.07 * SR);
      for (let i = 0; i < b.length && i + off < n; i++) o[i + off] += b[i] * 0.45;
    });
    return o;
  },
  warning_tone: () => {
    const n = Math.round(0.4 * SR), o = new Float32Array(n);
    const t1 = tone(880, 880, 0.14, 20);
    const off = Math.round(0.18 * SR);
    for (let i = 0; i < t1.length; i++) o[i] += t1[i] * 0.65;
    for (let i = 0; i < t1.length && i + off < n; i++) o[i + off] += t1[i] * 0.65;
    return o;
  },
  bell_ding: () => {
    const b1 = bell(1760, 0.65), b2 = bell(3520, 0.45);
    return b1.map((v, i) => v * 0.7 + (b2[i] || 0) * 0.35);
  },
  mouse_click: () => tone(1800, 950, 0.02, 130),
  keyboard_tap: () => {
    const dur = 0.5, n = Math.round(dur * SR), o = new Float32Array(n);
    for (let k = 0; k < 4; k++) {
      const off = Math.round(k * 0.11 * SR);
      const t1 = tone(1400 + (k % 3) * 200, 600, 0.025, 90);
      for (let i = 0; i < t1.length && i + off < n; i++) o[i + off] += t1[i] * 0.45;
    }
    return o;
  },
  ding: () => bell(1760, 0.45),
  notification_ping: () => bell(2093, 0.35),
  electric_zap: () => tone(2800, 380, 0.14, 25),
  fast_whoosh: () => bandpass(noise(0.22, (t, d) => Math.sin((Math.PI * t) / d) ** 3), 600, 3200),
  reels_swipe: () => lowpass(noise(0.14, (t, d) => Math.sin((Math.PI * t) / d) ** 3), 1800),
  game_coin: () => bell(2637, 0.38),
  click_subscribe: () => tone(850, 420, 0.06, 45),
};
// 2026-11-05 user: effects were too loud -> all about 5 dB lower
const SFXK = 0.45;
const GAIN = {
  whoosh: 0.35 * SFXK, coin: 0.25 * SFXK, pop: 0.15 * SFXK, thump: 0.6 * SFXK, knock: 0.35 * SFXK,
  tick: 0.18 * SFXK, hoof: 0.22 * SFXK, chatter: 0.12 * SFXK, bite: 0.25 * SFXK, shimmer: 0.14 * SFXK,
  whip: 0.45 * SFXK, sub_drop: 0.7 * SFXK, card_slide: 0.3 * SFXK, stamp: 0.65 * SFXK, blip: 0.2 * SFXK,
  grave_bell: 0.5 * SFXK, scanner_beep: 0.25 * SFXK, ticket_scratch: 0.35 * SFXK, gear_cog: 0.3 * SFXK, wood_knock: 0.5 * SFXK,
  phone_buzz: 0.65 * SFXK, double_buzz: 0.7 * SFXK, table_vibration: 0.75 * SFXK,
  iphone_ping: 0.4 * SFXK, android_ping: 0.4 * SFXK, phone_unlock: 0.35 * SFXK, touchscreen_tap: 0.3 * SFXK,
  message_pop: 0.35 * SFXK, digital_error: 0.45 * SFXK, cartoon_pop: 0.35 * SFXK, cartoon_boing: 0.5 * SFXK,
  record_scratch: 0.55 * SFXK, morning_birds: 0.3 * SFXK, morning_breeze: 0.25 * SFXK, clock_tick: 0.25 * SFXK,
  fast_clock_tick: 0.3 * SFXK, day_night_whoosh: 0.6 * SFXK, evening_crickets: 0.25 * SFXK, night_wind: 0.3 * SFXK,
  toothbrush: 0.35 * SFXK, plate_clink: 0.4 * SFXK, water_tap: 0.3 * SFXK, phantom_buzz: 0.65 * SFXK,
  glitch_pop: 0.35 * SFXK, counter_tick: 0.35 * SFXK, dramatic_riser: 0.65 * SFXK, bass_drop: 0.75 * SFXK,
  neural_hum: 0.4 * SFXK, sparkle: 0.35 * SFXK, heart_pop: 0.35 * SFXK, gameshow_countdown: 0.4 * SFXK,
  arcade_ding: 0.4 * SFXK, success_chime: 0.45 * SFXK, warning_tone: 0.55 * SFXK, bell_ding: 0.55 * SFXK,
  mouse_click: 0.35 * SFXK, keyboard_tap: 0.35 * SFXK,
  ding: 0.25 * SFXK, notification_ping: 0.3 * SFXK, electric_zap: 0.35 * SFXK, fast_whoosh: 0.4 * SFXK,
  reels_swipe: 0.35 * SFXK, game_coin: 0.3 * SFXK, click_subscribe: 0.4 * SFXK
};
for (const c of S.sfx || []) {
  const t0 = shotStart(c.shot) + (c.at || 0);
  const n = c.repeat || 1;
  for (let k = 0; k < n; k++) add(FX[c.type](), t0 + k * (c.every || 0.25) + (c.jitter ? rnd() * c.jitter : 0), (c.gain ?? 1) * GAIN[c.type], c.pan || 0);
}

// ---- final mix: voice at a loud, clear level, everything else BED_DB under it, soft limiter ----
const readWav = (f) => {
  const b = fs.readFileSync(f); let o = 12, fmt = null, data = null;
  while (o < b.length - 8) { const id = b.toString("ascii", o, o + 4), sz = b.readUInt32LE(o + 4); if (id === "fmt ") fmt = { ch: b.readUInt16LE(o + 10), sr: b.readUInt32LE(o + 12) }; if (id === "data") data = b.subarray(o + 8, o + 8 + sz); o += 8 + sz + (sz % 2); }
  const n = data.length / 2 / fmt.ch, x = new Float32Array(n); for (let i = 0; i < n; i++) { let v = 0; for (let c = 0; c < fmt.ch; c++) v += data.readInt16LE((i * fmt.ch + c) * 2); x[i] = v / fmt.ch / 32768; } return { x, sr: fmt.sr };
};
const V = readWav(path.join("public", ep, "voice.wav"));
const vox = new Float32Array(N); for (let i = 0; i < N; i++) { const p = (i * V.sr) / SR, j = Math.floor(p), f = p - j; vox[i] = j + 1 < V.x.length ? V.x[j] * (1 - f) + V.x[j + 1] * f : 0; }
const med = (a) => { const F = Math.round(SR * 0.05), d = []; for (let i = 0; i + F <= a.length; i += F) { let s = 0; for (let j = 0; j < F; j++) s += a[i + j] ** 2; const db = 10 * Math.log10(s / F + 1e-12); if (db > -50) d.push(db); } d.sort((a, b) => a - b); return d[Math.floor(d.length / 2)] ?? -60; };
const bedMono = new Float32Array(N); for (let i = 0; i < N; i++) bedMono[i] = (L[i] + R[i]) / 2;
const vg = 10 ** ((-17 - med(vox)) / 20), bg = 10 ** ((-17 - (S.bedDb ?? 17) - med(bedMono)) / 20);
const ML = new Float32Array(N), MR = new Float32Array(N);
const lim = (v) => (Math.abs(v) < 0.7 ? v : Math.sign(v) * (0.7 + 0.28 * Math.tanh((Math.abs(v) - 0.7) / 0.28)));
for (let i = 0; i < N; i++) { ML[i] = lim(vox[i] * vg + L[i] * bg); MR[i] = lim(vox[i] * vg + R[i] * bg); }
const wr = (f, A, B) => {
  const b = Buffer.alloc(44 + N * 4); b.write("RIFF", 0); b.writeUInt32LE(36 + N * 4, 4); b.write("WAVEfmt ", 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(2, 22);
  b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 4, 28); b.writeUInt16LE(4, 32); b.writeUInt16LE(16, 34); b.write("data", 36); b.writeUInt32LE(N * 4, 40);
  for (let i = 0; i < N; i++) { b.writeInt16LE(Math.round(Math.max(-1, Math.min(1, A[i])) * 32767), 44 + i * 4); b.writeInt16LE(Math.round(Math.max(-1, Math.min(1, B[i])) * 32767), 46 + i * 4); } fs.writeFileSync(f, b);
};
wr(path.join("public", ep, "mix.wav"), ML, MR);
console.log("mix.wav: voice at -17 dB, bed", S.bedDb ?? 17, "dB under");

// ---- write the bed on its own (peak-safe) ----
let pk = 0; for (let i = 0; i < N; i++) pk = Math.max(pk, Math.abs(L[i]), Math.abs(R[i]));
const k = pk > 0.95 ? 0.95 / pk : 1;
const buf = Buffer.alloc(44 + N * 4);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * k)) * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * k)) * 32767), 46 + i * 4); }
fs.mkdirSync(path.join("public", ep), { recursive: true });
fs.writeFileSync(path.join("public", ep, "bed.wav"), buf);
console.log("bed.wav", total.toFixed(1) + "s", "peak scale", k.toFixed(2));
