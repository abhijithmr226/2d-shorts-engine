# PRODUCTION LEARNING LOG & RETROSPECTIVE ARCHIVE

**Project Repository:** `animated-shorts-skill_2`  
**Standard:** Master System for Elite YouTube Shorts & Reels Video Direction  
**Status:** Live & Continuously Maintained

---

## Retrospective 1: Episode 1 & 2 (Green Cabs & Kyushirataki Train Station)

### Issues Identified
1. **Audio Masking:** Early background music was synthesised at full volume and occasionally overpowered whispery dialogue.
2. **Subtitle Overflow:** Long sentence-level subtitle blocks sometimes crowded the lower third and clashed with vertical platform interfaces.
3. **Pacing Lulls:** Stationary wide shots extended beyond 4 seconds without character micro-movements.

### Actionable Rule Changes Established
- Chunk subtitles into 2–3 words maximum.
- Implement strict audio bed ducking formula: Voice integrated at -17 dB, music bed at -24 dB RMS under voice.
- Introduce dynamic camera glides (`CamKeys`: `from`, `to`, `lookFrom`) so the camera never remains completely frozen.

---

## Retrospective 2: Episode 3 (The Mandela Effect & Monopoly Man)

### Issues Identified
1. **Pikachu Tail Accuracy:** Initial character rendering of Pikachu had a black tail tip, violating the true design (yellow lightning tail with brown base, no black tip). Bench was also overlapping awkwardly with the head.
2. **Card Occlusion:** Large information cards placed in the center occasionally collided with captions positioned at 60% height.

### Actionable Rule Changes Established
- **Corrected Pikachu Spec:** Dedicated `drawPikachu` renderer with authentic yellow lightning bolt tail, brown lower stripes, red circular cheek pouches, and black ear tips.
- **Dual-Zone Safe Caption Engine:** Created `topRanges` logic in `Episode.tsx`. Captions default to `top: 60%`, but automatically jump up to `top: 14%` whenever an interactive card or diagram occupies the screen.
- **Bench / Prop Z-Ordering:** Explicitly separated seating and bench props to eliminate head overlap.

---

## Retrospective 3: Viral Reference Study (Ricks Clips & Sky3dFilms)

### Benchmarks Extracted (Nov 9, 2026 Analysis)
1. **Ricks Clips (*What the Grave Bell Really Meant*):**
   - 14 shots across 59.5s (4.25s avg, 13.1 cuts/min).
   - Audio: -14.05 LUFS, LRA 1.90 LU, True Peak -2.01 dBTP.
   - Ducking: Music sits at -24.6 dB RMS under voice (10.6 dB ducking offset).
   - SFX: 48 crisp physical Foley hits.
2. **Sky3dFilms (*The Chess Machine That Caught Napoleon*):**
   - 67 shots across 68.5s (1.02s avg, 57.8 cuts/min).
   - Audio: -14.01 LUFS, LRA 2.20 LU, True Peak -3.57 dBTP.
   - SFX: 55 rapid tactile clicks, cogs, and stamp impacts.

### Synthesizers Added to `scripts/sound.mjs`
- `phone_buzz`: Dual-frequency modulated tactile vibration (165 Hz / 32 Hz AM).
- `scanner_beep`: High-tech 1,850 Hz barcode confirmation pip.
- `ticket_scratch`: High-friction bandpass noise burst.
- `gear_cog`: Crisp mechanical tooth click.
- `wood_knock`: Dense wooden rap with hollow body resonance.
- `ding`: Crystalline 1,760 Hz bell chime for score increments.

---

## Retrospective 4: Episode 4 (Phone Addiction & Phantom Buzz Quiz)

### Initial Implementation Challenges
1. **Face Clearance & Top Captions:** Setting top captions to $Y=0.12$ placed text directly over characters' foreheads and hair in eye-level shots.
2. **Platform UI Occlusion:** Docking cards to `pos="bottom"` placed them into the bottom 20% zone, clashing with YouTube Shorts / Instagram Reels titles and like button columns.
3. **Low-Angle Camera Pitfall:** Angling cameras down pushed faces into the subtitle region, causing overlap.

### Architectural Rules Codified
1. **Golden 4-Tier Vertical Hierarchy (1080×1920):**
   - **Tier 1 (0.14 – 0.35):** Character Head, Face & Scene Atmosphere (headroom preserved).
   - **Tier 2 (0.32 – 0.62):** Middle-Space Information Cards & Interactive Overlays.
   - **Tier 3 (0.65 – 0.72):** Subtitles (anchored at $Y=0.67$), completely clear of face above and platform UI below.
   - **Tier 4 (0.76 – 1.00):** Platform UI Safe Zone (completely reserved for YouTube/Instagram titles, sound credits, and buttons).
2. **Side-Staged Presentation Law:** Whenever a card, infographic, or phone mockup is displayed, stage the character to the side (`pos={[-0.85, 0, 0]}` to `[-1.0, 0, 0]`) in a 3/4 angle looking at the card. Never center a character behind a card.
3. **Tender Grounded Seating with Plush Cushions:**
   - Bed shots must feature headboards, plush backrest cushions/pillows, and draped duvets with the character seated (`sit: true`).
   - Living room couch shots must include 3 modular seat cushions, back cushions, and decorative accent throw pillows with grounded character posture.
   - Dining tables must feature chairs with backrests and foreground props (bowls, mugs).
4. **Camera Elevation Law:** `lookFrom` must maintain $Y \ge 1.85$ for standing shots and $Y \ge 1.95$ for seated bed/couch shots so the camera never points down onto the character's face.

### Successes
1. **Pacing:** 42 contiguous shots over 130.6s (3.11s average cut frequency) perfectly synchronised to word-level Whisper timestamps.
2. **Gamification:** Running 4-point quiz framework kept retention high throughout the 2-minute duration.
3. **Audio Quality:** Zero harshness. Warm felt-piano and sub-bass filtered at 1,200 Hz, mastered to exact -14.0 LUFS integrated with 2.5 LU LRA.
4. **Subtitles:** 100% safe-zone compliant with dynamic elevation to 14% height during card reveals.
5. **Full Cycle Loop:** Ending line *"That buzz at the beginning? It probably never happened. You were just waiting for it."* connects seamlessly back to the opening hook.

---

## Active Pre-Flight Checklist for All Future Episodes

- [ ] Script analyzed for emotional beats, curiosity gaps, and sensory hooks.
- [ ] Shot variety contains ECUs, medium shots, POVs, and Dutch angles (no repetitive postures).
- [ ] Subtitles strictly 2–3 words, centered horizontally, and routed to top safe zone when cards appear.
- [ ] Music lowpassed at 1,200 Hz and ducked to -24 dB under dialogue.
- [ ] Audio mastered with two-pass loudnorm to -14.0 LUFS and true peak $\le -1.5\text{ dBTP}$.
- [ ] Verified with `npx tsc --noEmit` (0 errors) before rendering.
- [ ] 1080×1920 30fps Rec.709 video and high-CTR thumbnail delivered to project folder.

