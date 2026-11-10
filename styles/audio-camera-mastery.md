# Master Sound Design, Mixing & Camera Kinematics Guide
*Learned and measured from viral benchmark channels (Celyxi, Rick's Clips, SevMotion)*

---

## Part 1: Sound Effects (SFX) Engineering & Timing

### 1. The 3 Audio Layers
Every viral animated Short consists of three distinct, balanced audio layers:
1. **The Voice Track (`vox`):**
   - Loudness: Anchored strictly between **-14.0 LUFS and -16.0 LUFS**.
   - Dynamic Range: Tight **LRA $\le 3.0\text{ LU}$** (heavy broadcast compression, true peak $\le -1.0\text{ dBTP}$).
   - EQ: High-pass filter at **85 Hz** to cut rumble; slight 3 kHz presence boost (+1.5 dB) for vocal intelligibility on smartphone speakers.

2. **The Foley & Diegetic Layer (In-World Physics):**
   - **Footsteps (`tap`, `step`):** Timed exactly to the bottom of the walk-cycle (every 0.25s–0.30s). Low gain (-18 dB under voice).
   - **Hand Interactions (`wallet_snatch`, `needle_poke`, `coin_toss`):** Triggered at frame-exact contact points.
   - **Atmosphere / Ambience (`amb`):** Low-pass filtered noise (< 400 Hz) at -22 dB to -26 dB under voice. Provides continuous room glue without hiss.

3. **The Kinetic / Cinematic FX Layer (Cuts & Transitions):**
   - **Camera Whip Pan (`whip`):** 0.18s bandpass noise sweep (800 Hz – 2200 Hz). Placed starting **2 frames BEFORE the cut** and ending **3 frames AFTER the cut**. This creates subconscious continuity across rapid cuts.
   - **Dramatic Reveal / Impact (`sub_drop` / `thump`):** Low-frequency pitch sweep (85 Hz $\to$ 38 Hz). Placed on shocking story pivots or reveal moments.
   - **Cards & Documents (`card_slide`):** Quick 0.2s friction swoosh as fact cards slide into safe zones.
   - **Fact Check Stamp (`stamp`):** Crisp 110 Hz transient impact for "MYTH" or "FACT" overlays.

---

## Part 2: Background Music & Dynamic Sidechain Ducking

### 1. Rhythm & Composition
- **Tempo:** 104–112 BPM (matches rapid speaking rates of 3.4–3.8 words/second).
- **Instrumentation:** Staccato pizzicato strings (Karplus-Strong pluck), light marimba/bells, acoustic muted bass, and subtle Rhodes chords. Avoid sustained brass or heavy electric guitars that compete with vocal frequencies.
- **Tonal Key:** Keys of **D**, **G**, or **A minor** provide emotional curiosity and historical intrigue.

### 2. Frequency Carve-Out (Vocal EQ Pocket)
- Apply a parametric bell cut on the music track:
  - Center Frequency: **1.8 kHz – 2.8 kHz**
  - Q Factor: **1.4**
  - Gain Reduction: **-4.0 dB to -6.0 dB**
- This ensures the vocal consonants (T, K, S, P) remain 100% crisp without needing to lower the whole music track too far.

### 3. Dynamic Sidechain Ducking Architecture
| Scenario | Music Level Relative to Voice | Transition Curve |
| :--- | :--- | :--- |
| **Normal Narration** | **-14 dB to -17 dB** | Constant compression |
| **Sentence Gaps (0.3s–0.8s pause)** | **Switches up +4 dB to +6 dB** | Eased linear swell over 0.2s |
| **The "You see..." Reveal Pivot** | **Drops by -15 dB to -20 dB (near silence)** | Sharp 0.3s dip, holds for 3–5 seconds |
| **Final Loop / Ending Question** | **Resolves to tonic chord** | 1.2s smooth fadeout to video end |

---

## Part 3: Camera Angles & Kinematic Motion

### 1. The 3-Beat Camera Formula (1.8s Average Pacing)
1. **Beat 1: Establishing Action (1.5s–2.0s)**
   - Angle: Eye-level (camera $Y = 1.8\text{m} - 2.2\text{m}$), 28mm wide feel.
   - Movement: Continuous slow push-in (2–4% scale glide per second).
2. **Beat 2: Tight Reaction / Macro Detail (0.8s–1.2s)**
   - Angle: Chest-to-face medium close-up ($Y = 1.5\text{m}$).
   - Movement: Immediate crash zoom or cut; character expressions pop.
3. **Beat 3: Tracking / Parallax (1.2s–1.8s)**
   - Angle: Side profile or 3/4 front tracking along walking puppet.
   - Movement: Dynamic horizontal slide with 3D foreground/background parallax.

### 2. Safe-Zone Protection Rules (Mobile YouTube Shorts)
- **Top Safe Zone (0%–12%):** Keep clear of faces and cards (occupied by search, back button, and channel menu).
- **Bottom Safe Zone (75%–100%):** Keep 100% clear of all critical text and character faces (occupied by title, channel handle, subscribe button, audio pill).
- **Right Safe Zone (88%–100%):** Keep clear of text (occupied by Like, Dislike, Comment, Share icons).
- **The Sweet Spot ($Y = 25\%\text{ to }65\%$):**
  - All character eyes and faces must live between **$Y = 30\%\text{ and }45\%$**.
  - All captions must live at **$Y = 60\%\text{ to }65\%$** (or top $14\%$ when documents are shown).

