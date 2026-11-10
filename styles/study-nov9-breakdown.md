# Multi-Channel Benchmark Analysis: Ricks Clips & Sky3dFilms
*Measured and extracted from reference shorts: `VKsamN3Fk4U` (Lottery Cashiers), `GM9UKnZ6JFw` (Grave Bell), and `QAJIugrpfPQ` (Napoleon's Chess Automaton)*

---

## 1. Measured Benchmarks & Quality Settings

| Metric | Ricks Clips: Grave Bell (`GM9UKnZ6JFw`) | Ricks Clips: Lottery (`VKsamN3Fk4U`) | Sky3dFilms: Chess Turk (`QAJIugrpfPQ`) | Production Target |
| :--- | :--- | :--- | :--- | :--- |
| **Duration** | 59.5s | 57.8s | 68.5s | 55s – 75s |
| **Cuts per Minute** | **13.1 cuts/min** | **17.7 cuts/min** | **57.8 cuts/min** | 16–30 cuts/min (story), 50+ (kinetic) |
| **Average Shot Length** | **4.25 seconds** | **3.21 seconds** | **1.02 seconds** | 1.0s – 3.5s |
| **Total Shots** | 14 shots | 18 shots | 67 shots | 18–45 shots |
| **Camera Motion Index** | 0.095 (subtle glide) | 0.076 (push-in) | 0.080 (rapid tracking) | 0.075 – 0.095 |
| **Speech Rate** | 221.7 WPM (3.7 words/s) | 206.7 WPM (3.4 words/s) | 184.0 WPM (3.1 words/s) | 185 – 220 WPM |
| **Integrated Loudness** | **-14.05 LUFS** | **-15.12 LUFS** | **-14.01 LUFS** | **-14.0 LUFS exact** |
| **Loudness Range (LRA)**| **1.90 LU** | **2.00 LU** | **2.20 LU** | **1.8 – 2.8 LU** |
| **True Peak (TP)** | -2.01 dBTP | -3.31 dBTP | -3.57 dBTP | $\le -1.5\text{ dBTP}$ |
| **Speech Peak Level** | -14.3 dB RMS | -15.6 dB RMS | -14.2 dB RMS | -14.0 dB RMS |
| **Music Bed Level** | -24.8 dB RMS | -24.3 dB RMS | -25.5 dB RMS | **-24.0 dB to -25.0 dB RMS** |
| **Ducking Contrast** | **-10.6 dB** | **-8.8 dB** | **-11.2 dB** | **-10.0 dB to -12.0 dB** |
| **SFX Count** | 48 effects (~0.81/sec) | 32 effects (~0.55/sec) | 55 effects (~0.80/sec) | 0.6 – 1.0 SFX/second |
| **Shadow Hue / RGB** | 253° (`#1e1639` Indigo) | 263° (`#2c233b` Plum) | 352° (`#341317` Mahogany) | Lifted cool or warm shadows |
| **Highlight Hue / RGB**| 13° (`#efd2c9` Peach) | 343° (`#f0e9eb` Rose-Ivory)| 42° (`#f2dca7` Brass Gold) | Rich ambient highlights |
| **Overall Saturation** | 0.50 | 0.47 | 0.50 | 0.46 – 0.52 (balanced) |
| **Pure Black Void %** | 0.09% | 0.01% | 1.74% | < 2.0% (no harsh blackouts) |

---

## 2. Character Actions & Comedic Timing

### Ricks Clips Discipline (2D Puppet in 3D Staged World)
1. **The Tex Avery Comedic Reaction:**
   - **Anticipation (3 frames):** Eyes narrow or character crouches slightly.
   - **Impact / Shock (6 frames):** Eyes pop out ("wide" / "anime"), mouth widens into an open 'O' or wavy grimace, limbs snap outward.
   - **Recovery / Settling (10 frames):** Smooth ease into a panting or trembling idle pose (`shiver: true`).
2. **Prop Handling Physics:**
   - Props do not float; they snap to the puppet's hand coordinates (`H2.hx, H2.hy`).
   - In *Lottery Cashiers*, the cashier holds the scanner gun at a 45° angle, fires a visible red laser scan beam on the ticket barcode, and tilts his head left/right with shifty pupils (`look: -1 -> 1`).
   - In *Grave Bell*, the buried character's arm pulls a taught string tied to his index finger, pulling downward as the bell swings above ground.
3. **Mouth & Speech Animation:**
   - Not literal phonetic lip-sync; instead, **speech cadence gating**:
   - Mouth oscillates between `open`, `smile`, and `flat` only during active speech frames ($t \in [\text{start}, \text{end}]$), holding closed or smiling on pauses.

### Sky3dFilms Discipline (Mechanical 3D Clockwork & Intrigue)
1. **Clockwork Precision Movement:**
   - The mechanical automaton moves with stepped, jerky robotic ease (rapid linear motion followed by sudden micro-damped stops).
   - Wooden fingers close around chess pieces with tactile precision.
2. **Human vs. Automaton Contrast:**
   - Napoleon: Fluid, organic, proud body language (chest puffed, smirk, casual leaning on table).
   - Automaton: Rigid spine, mechanical neck rotation (stops at 45° increments), glowing or vacant eyes.
3. **The Climax Action:**
   - When Napoleon cheats, the automaton doesn't hesitate: one swift, violent sweep knocks the chess pieces scattering across the board.

---

## 3. Color Grading & Quality Settings

### 1. Palette Architecture by Emotion
- **Mystery / Gothic (*Grave Bell*):**
  - Shadows: Hue 253° (`#1e1639`), deep twilight indigo.
  - Highlights: Hue 13° (`#efd2c9`), warm bone/candlelight.
  - Palette creates high complementary contrast between the cold blue underground earth and the warm lantern above.
- **Modern Suspense / True Crime (*Lottery Cashiers*):**
  - Shadows: Hue 263° (`#2c233b`), moody purple-navy.
  - Midtones: Cool fluorescent store lighting (`#d1d5db`).
  - Accents: High-visibility neon yellow lottery banners and red laser lines.
- **Historical Royalty / Clockwork (*Napoleon's Chess Turk*):**
  - Shadows: Hue 352° (`#341317`), rich polished mahogany wood and imperial red velvet.
  - Highlights: Hue 42° (`#f2dca7`), brass gears, gold leaf, and beeswax candlelight.

### 2. Rec.709 & Render Encoding Settings
- **Resolution:** 1080 × 1920 (Vertical 9:16).
- **Framerate:** 30.0 fps progressive.
- **Color Space:** Rec.709 (`--color-space=bt709`, `yuv420p(tv, bt709)`).
- **Shadow Floor:** Black levels lifted so pure `#000000` is kept under **1% of screen area**; dark areas have rich color tints rather than dead digital black.

---

## 4. Audio Mastering, Narration & Sound Effects

### 1. The Exact Audio Hierarchy
```
+-------------------------------------------------------------+
|  1. VOICE NARRATION: -14.0 LUFS Integrated                   |
|     (Crisp presence boost at 2.5–3.5 kHz, HPF at 85 Hz)     |
+-------------------------------------------------------------+
              | -10.5 dB dynamic ducking offset
              v
+-------------------------------------------------------------+
|  2. MUSIC BED: -24.5 dB RMS (-10 dB under voice)            |
|     (Smooth acoustic piano/strings, notch cut at 2 kHz)     |
+-------------------------------------------------------------+
              ^
              | synchronous layer
+-------------------------------------------------------------+
|  3. SFX & FOLEY: Placed on cuts (60%) & actions (40%)       |
|     (Whips, sub-drops, coin scrapes, gear ticks, bell tolls) |
+-------------------------------------------------------------+
```

### 2. Sound Effect Library & Recipes Learned

1. **The Grave Bell Toll (`grave_bell`):**
   - Fundamental: 1,320 Hz dual-sine with 2,640 Hz octave ping.
   - Envelope: 0.005s attack, 2.2s exponential decay.
   - Reverb: Medium wet plate space.
2. **Barcode Scanner Beep (`scanner_beep`):**
   - Fundamental: 1,850 Hz pure square/sine hybrid.
   - Envelope: 0.05s short gate, zero reverb.
3. **Ticket Coin Scratch (`ticket_scratch`):**
   - Texture: Bandpassed noise (1,400 Hz – 3,600 Hz).
   - Envelope: Rapid 0.08s bursts, modulated by $t \times 24$.
4. **Clockwork Cog Wheel Tick (`gear_cog`):**
   - Fundamental: Pitch drop 420 Hz $\to$ 180 Hz over 0.03s.
   - Metallic click layer: 2,400 Hz impulse burst.
5. **Chess Piece Impact (`wood_chess_knock`):**
   - Fundamental: 220 Hz hollow resonant wood tone + 80 Hz weight thump.
   - Envelope: 0.09s decay.
6. **The Story Pivot Sub-Drop (`sub_drop`):**
   - Frequency: 85 Hz sweeping down to 36 Hz over 0.65s.
   - Sits on every major plot reveal or twist.

---

## 5. Camera Kinematics & Subtitle Safe Zones

1. **Camera Angles:**
   - **Eye Level ($Y = 1.6\text{m} - 2.0\text{m}$):** Used for 80% of all narrative dialogue.
   - **Low Angle Hero Shot ($Y = 1.1\text{m} - 1.3\text{m}$):** Tilted upward by 6°–10° when revealing a grand machine, high judge, or towering antagonist.
   - **Extreme Close-Up Zoom (ECU):** Used on micro-actions (the finger tied to the string, the razor blade scratching the barcode, the pawn sliding across the board).
2. **Subtitle Safe Zones:**
   - **Chunk Size:** Strictly **2 to 3 words** per on-screen burst.
   - **Placement:** Exactly centered at **60% of height** ($Y = 0.60$).
   - **When Props / Documents Appear:** Captions instantly jump to **14% of height** ($Y = 0.14$) so neither covers the other.
   - **Styling:** Bold 900 sans-serif (Montserrat), golden highlight (`#ffdb4d`) on key operative word, 12px deep dark outline (`#111014`) for 100% legibility on any background.

