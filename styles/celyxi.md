# Celyxi (@Celyxi): Measured Style Guide

Measured from 4 viral Shorts (`7bkP_oiFCQ4`, `H8ncBQ42m3A`, `w_ucy_7HNas`, `AlKH9kR_7bU`) via `scripts/measure.py` (numbers.json) + 30 fps contact sheet analysis.

---

## 1. Format & Overview
| Rule | Target (Measured) |
|---|---|
| Frame | 9:16 vertical (1080×1920 / 720×1280), 30 fps |
| Length | 58–75 seconds (average 66.8s) |
| Structure | Single narrator, high narrative tension, rapid visual escalation |

---

## 2. Pacing & Transitions
| Metric | Celyxi Target (Measured) |
|---|---|
| **Cuts per minute** | **32.8 cuts/min** (27.9–43.0 / min) — *~2x faster than Rick's Clips* |
| **Average setup length (`avg_shot_s`)** | **1.83 seconds** (1.37s–2.07s) |
| **First cut** | Within the first **0.5s–1.2s** (instant hook) |
| **Transitions** | Directional whip pans (5–8 frames with motion blur), rapid punch-in zooms, match cuts |
| **Rhythm** | Action shot (wide) → reaction / detail (tight punch-in) → walking / gliding narrative beat |

---

## 3. Camera Mechanics
| Metric | Target (Measured) |
|---|---|
| **Camera motion index** | **0.08** (high kinetic energy) |
| **Motion types** | Rapid tracking alongside walking characters, horizontal whip pans between perspectives, crash zooms into facial expressions |
| **Camera elevation** | Eye level to character chest level; low-angle Dutch tilts during suspense |
| **Vignette** | Subtle 12–18% circular darkening around outer edges directing eye flow to center screen |

---

## 4. Light & Palette
| Metric | Target (Measured) |
|---|---|
| **Shadow Hue & RGB** | Mean Hue **215.8°** (deep navy / charcoal violet: `RGB(16, 20, 44)` to `RGB(33, 31, 38)`) |
| **Highlight Hue & RGB** | Mean Hue **57.0°** (warm ivory / golden cream: `RGB(244, 238, 213)`) |
| **Saturation** | **0.40** (grounded historical / cinematic warmth, avoiding neon tones) |
| **Pure black (`pure_black_pct`)** | **0.74%** (almost no clipped black except inside deep pupil outlines) |
| **Atmospheric contrast** | Directional sunlight with soft ambient bounce; moody interiors with glowing lantern highlights |

---

## 5. Character Design & Rigging
| Component | Specification |
|---|---|
| **Style** | 2D illustrated puppet cutouts composited inside textured 3D environments |
| **Head Proportion** | **~35% of total body height**, large circular pure white face (`#FFFFFF`) |
| **Facial Expressions** | Expressive eye/brow variations: smug half-closed eyelids, winks, wide shocked pupils, pencil-thin curved mouth, stubble/beards for historical figures |
| **Costumes & Clothing** | Distinct textured attire (detective trench coats with visible lapels & buttons, fedora hats, sailor knit caps, canvas aprons, military flight gear) |
| **Limbs & Motion** | Clean black stick limbs (~6% head width); vertical hopping walk-cycle (bouncing on 1s); mitten hands clutching hero props (wallets, surgical needles, keys, steering wheels) |

---

## 6. Captions & Typography
| Component | Specification |
|---|---|
| **Placement** | Lower-center at **~65%–70% frame height** (leaving top 60% clear for character faces & 3D world action) |
| **Chunking** | **1 to 2 words per beat** timed tightly to narrator syllables |
| **Typeface** | Heavy bold geometric sans-serif (white text with subtle dark 2px drop shadow/stroke) |
| **Animation** | Rapid pop-in synced to speech cadence; zero distracting bouncing or rainbow colors |

---

## 7. How to Apply to Remotion Engine
- Set shot durations in `shots.tsx` between **1.4s and 2.2s**.
- Use `cam.whip(from, to, 6)` for transitions between connected rooms or character actions.
- Apply `shadow_hue: 216`, `highlight_hue: 57`, `exposure: 1.05`, `saturation: 0.40`.

