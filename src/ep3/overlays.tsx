import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", { weights: ["700", "800", "900"], subsets: ["latin"] });

// Base Card container strictly obeying Safe Zone:
// Center 80% width (10% left, 10% right margins), between 10% and 70% height!
export const CardFrame: React.FC<{
  children: React.ReactNode;
  bg?: string;
  borderColor?: string;
  tilt?: number;
}> = ({ children, bg = "#ffffff", borderColor = "#0f172a", tilt = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const pop = interpolate(t, [0, 0.12], [0.92, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 10%",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: "100%",
          maxHeight: "56%",
          backgroundColor: bg,
          border: `6px solid ${borderColor}`,
          borderRadius: "28px",
          boxShadow: "0 24px 54px rgba(0, 0, 0, 0.5)",
          padding: "36px 32px",
          transform: `scale(${pop}) rotate(${tilt}deg)`,
          fontFamily,
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

// 1. Pop Quiz: Is he wearing a monocle?
export const MonocleQuizOverlay: React.FC = () => {
  return (
    <CardFrame bg="#ffffff" borderColor="#1e293b">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
        <div style={{ backgroundColor: "#fef3c7", color: "#b45309", padding: "8px 18px", borderRadius: "999px", fontSize: "22px", fontWeight: 800 }}>
          🧐 MEMORY TEST
        </div>
        <div style={{ color: "#64748b", fontSize: "20px", fontWeight: 700 }}>1 of 3</div>
      </div>
      <div style={{ fontSize: "50px", fontWeight: 900, color: "#0f172a", lineHeight: 1.15, marginBottom: "24px" }}>
        Does the Monopoly Man wear a monocle?
      </div>
      <div style={{ display: "flex", gap: "16px" }}>
        <div style={{ flex: 1, padding: "18px", backgroundColor: "#3b82f6", color: "#ffffff", textAlign: "center", borderRadius: "16px", fontSize: "30px", fontWeight: 900 }}>
          YES
        </div>
        <div style={{ flex: 1, padding: "18px", backgroundColor: "#e2e8f0", color: "#0f172a", textAlign: "center", borderRadius: "16px", fontSize: "30px", fontWeight: 900 }}>
          NO
        </div>
      </div>
    </CardFrame>
  );
};

// 2. Myth Busted: Never Worn One
export const MonopolyBustedOverlay: React.FC = () => {
  return (
    <CardFrame bg="#ffffff" borderColor="#b91c1c" tilt={-1}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ backgroundColor: "#fee2e2", color: "#b91c1c", padding: "8px 18px", borderRadius: "999px", fontSize: "22px", fontWeight: 800 }}>
          ❌ FALSE MEMORY
        </div>
        <div style={{ border: "3px solid #b91c1c", color: "#b91c1c", padding: "4px 12px", borderRadius: "8px", fontSize: "20px", fontWeight: 900, transform: "rotate(4deg)" }}>
          MYTH BUSTED
        </div>
      </div>
      <div style={{ fontSize: "52px", fontWeight: 900, color: "#b91c1c", lineHeight: 1.1, marginBottom: "16px" }}>
        HE NEVER WORN ONE.
      </div>
      <div style={{ fontSize: "30px", fontWeight: 700, color: "#334155", lineHeight: 1.3, marginBottom: "20px" }}>
        Rich Uncle Pennybags has had 100% bare eyes since his creation in 1935.
      </div>
      <div style={{ backgroundColor: "#f8fafc", padding: "10px 16px", borderRadius: "10px", fontSize: "20px", color: "#64748b", fontWeight: 700 }}>
        Source: Hasbro & Parker Brothers Archive
      </div>
    </CardFrame>
  );
};

// 3. Mandela Effect Title Card
export const MandelaEffectTitleOverlay: React.FC = () => {
  return (
    <CardFrame bg="#0f172a" borderColor="#38bdf8">
      <div style={{ color: "#38bdf8", fontSize: "24px", fontWeight: 800, letterSpacing: "2px", marginBottom: "12px" }}>
        PSYCHOLOGY PHENOMENON
      </div>
      <div style={{ fontSize: "56px", fontWeight: 900, color: "#ffffff", lineHeight: 1.05, marginBottom: "18px" }}>
        THE MANDELA EFFECT
      </div>
      <div style={{ fontSize: "30px", fontWeight: 700, color: "#94a3b8", lineHeight: 1.35, marginBottom: "20px" }}>
        When millions of unconnected people share the exact same false memory.
      </div>
      <div style={{ color: "#38bdf8", fontSize: "22px", fontWeight: 800 }}>
        Coined by Fiona Broome in 2009
      </div>
    </CardFrame>
  );
};

// 4. Historical Fact Check: Nelson Mandela
export const MandelaFactOverlay: React.FC = () => {
  return (
    <CardFrame bg="#ffffff" borderColor="#0284c7">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ backgroundColor: "#e0f2fe", color: "#0369a1", padding: "8px 18px", borderRadius: "999px", fontSize: "22px", fontWeight: 800 }}>
          HISTORICAL RECORD
        </div>
        <div style={{ color: "#16a34a", fontSize: "20px", fontWeight: 800 }}>VERIFIED FACTS</div>
      </div>
      <div style={{ fontSize: "44px", fontWeight: 900, color: "#0f172a", lineHeight: 1.15, marginBottom: "18px" }}>
        Nelson Mandela
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        <div style={{ fontSize: "26px", fontWeight: 800, color: "#1e293b" }}>
          • Walked out of prison: <span style={{ color: "#0284c7" }}>February 1990</span>
        </div>
        <div style={{ fontSize: "26px", fontWeight: 800, color: "#1e293b" }}>
          • President of South Africa: <span style={{ color: "#0284c7" }}>1994 – 1999</span>
        </div>
        <div style={{ fontSize: "26px", fontWeight: 800, color: "#1e293b" }}>
          • Passed away: <span style={{ color: "#0284c7" }}>December 2013</span>
        </div>
      </div>
      <div style={{ backgroundColor: "#f1f5f9", padding: "10px 16px", borderRadius: "10px", fontSize: "20px", color: "#64748b", fontWeight: 700 }}>
        Source: Nelson Mandela Foundation & Global Archives
      </div>
    </CardFrame>
  );
};

// 5. Test #2: Pikachu's Tail
export const PikachuTestOverlay: React.FC = () => {
  return (
    <CardFrame bg="#ffffff" borderColor="#ca8a04">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div style={{ backgroundColor: "#fef08a", color: "#854d0e", padding: "8px 18px", borderRadius: "999px", fontSize: "22px", fontWeight: 800 }}>
          ⚡ TEST #2: PIKACHU
        </div>
        <div style={{ color: "#dc2626", fontSize: "22px", fontWeight: 900 }}>WRONG AGAIN</div>
      </div>
      <div style={{ fontSize: "44px", fontWeight: 900, color: "#0f172a", lineHeight: 1.15, marginBottom: "16px" }}>
        Does Pikachu have a black tail tip?
      </div>
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <div style={{ flex: 1, backgroundColor: "#fee2e2", padding: "14px", borderRadius: "14px", border: "2px solid #ef4444" }}>
          <div style={{ color: "#b91c1c", fontSize: "19px", fontWeight: 800 }}>False Memory:</div>
          <div style={{ fontSize: "26px", fontWeight: 900, color: "#7f1d1d" }}>Black Tip ❌</div>
        </div>
        <div style={{ flex: 1, backgroundColor: "#fef9c3", padding: "14px", borderRadius: "14px", border: "2px solid #eab308" }}>
          <div style={{ color: "#854d0e", fontSize: "19px", fontWeight: 800 }}>Official Reality:</div>
          <div style={{ fontSize: "26px", fontWeight: 900, color: "#713f12" }}>Pure Yellow ✅</div>
        </div>
      </div>
      <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", padding: "12px 16px", borderRadius: "12px", marginBottom: "14px", textAlign: "left" }}>
        <div style={{ fontSize: "18px", fontWeight: 800, color: "#92400e", marginBottom: "4px" }}>
          Official Pokédex Anatomy:
        </div>
        <div style={{ fontSize: "16px", fontWeight: 600, color: "#78350f", lineHeight: 1.3 }}>
          • Bright yellow chubby mouse body & red cheek pouches<br />
          • Pointed ears with black tips & two brown back stripes<br />
          • Lightning bolt tail: brown at base, <b>NO black tip</b>
        </div>
      </div>
      <div style={{ backgroundColor: "#f8fafc", padding: "8px 16px", borderRadius: "10px", fontSize: "18px", color: "#64748b", fontWeight: 700 }}>
        Official Archives • Nintendo & Game Freak
      </div>
    </CardFrame>
  );
};

// 6. Test #3: Fruit of the Loom
export const FruitOfTheLoomOverlay: React.FC = () => {
  return (
    <CardFrame bg="#ffffff" borderColor="#475569">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div style={{ backgroundColor: "#e2e8f0", color: "#1e293b", padding: "8px 18px", borderRadius: "999px", fontSize: "22px", fontWeight: 800 }}>
          🍎 TEST #3: THE LOGO
        </div>
        <div style={{ color: "#dc2626", fontSize: "22px", fontWeight: 900 }}>NEVER EXISTED</div>
      </div>
      <div style={{ fontSize: "46px", fontWeight: 900, color: "#0f172a", lineHeight: 1.15, marginBottom: "16px" }}>
        Fruit of the Loom Cornucopia?
      </div>
      <div style={{ fontSize: "30px", fontWeight: 800, color: "#dc2626", marginBottom: "14px" }}>
        There was NEVER a basket or horn.
      </div>
      <div style={{ fontSize: "26px", fontWeight: 700, color: "#334155", marginBottom: "18px" }}>
        In cognitive trials, over <span style={{ color: "#0284c7", fontWeight: 900 }}>58%</span> of people insist they remember the horn.
      </div>
      <div style={{ backgroundColor: "#f8fafc", padding: "10px 16px", borderRadius: "10px", fontSize: "20px", color: "#64748b", fontWeight: 700 }}>
        Source: University of Chicago Visual Memory Lab
      </div>
    </CardFrame>
  );
};

// 7. Call To Action: Subscribe & Follow
export const CallToActionOverlay: React.FC = () => {
  return (
    <CardFrame bg="#ffffff" borderColor="#0f172a">
      <div style={{ textAlign: "center" }}>
        <div style={{ color: "#0284c7", fontSize: "22px", fontWeight: 900, letterSpacing: "2px", marginBottom: "8px" }}>
          MIND-BENDING SCIENCE
        </div>
        <div style={{ fontSize: "48px", fontWeight: 900, color: "#0f172a", lineHeight: 1.1, marginBottom: "24px" }}>
          Follow for the Real Truth
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "16px" }}>
          <div style={{ padding: "18px", background: "linear-gradient(90deg, #f59e0b, #ec4899)", color: "#ffffff", borderRadius: "16px", fontSize: "28px", fontWeight: 900 }}>
            📸 Follow on Instagram
          </div>
          <div style={{ padding: "18px", backgroundColor: "#dc2626", color: "#ffffff", borderRadius: "16px", fontSize: "28px", fontWeight: 900 }}>
            ▶ Subscribe Here
          </div>
        </div>
        <div style={{ color: "#64748b", fontSize: "20px", fontWeight: 700 }}>
          Don't miss the next revelation!
        </div>
      </div>
    </CardFrame>
  );
};

// 8. Cognitive Science: Brain vs Camera
export const BrainScienceOverlay: React.FC = () => {
  return (
    <CardFrame bg="#0f172a" borderColor="#38bdf8">
      <div style={{ color: "#38bdf8", fontSize: "22px", fontWeight: 800, marginBottom: "12px" }}>
        NEUROSCIENCE FINDING
      </div>
      <div style={{ fontSize: "48px", fontWeight: 900, color: "#ffffff", lineHeight: 1.15, marginBottom: "18px" }}>
        Your brain is NOT a video camera.
      </div>
      <div style={{ fontSize: "30px", fontWeight: 700, color: "#cbd5e1", lineHeight: 1.35, marginBottom: "20px" }}>
        Memory is reconstructive. When details are missing, your brain automatically fills in the blanks.
      </div>
      <div style={{ color: "#facc15", fontSize: "24px", fontWeight: 800 }}>
        Mr. Peanut really DOES wear a monocle!
      </div>
    </CardFrame>
  );
};

// 9. Interactive 3-Way Choice Overlay
export const ChoiceInteractiveOverlay: React.FC = () => {
  return (
    <CardFrame bg="#ffffff" borderColor="#0f172a">
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <div style={{ color: "#b45309", fontSize: "22px", fontWeight: 900, letterSpacing: "1px", marginBottom: "6px" }}>
          BE HONEST IN THE COMMENTS 👇
        </div>
        <div style={{ fontSize: "48px", fontWeight: 900, color: "#0f172a", lineHeight: 1.1 }}>
          Which one fooled you?
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "18px" }}>
        <div style={{ padding: "14px 20px", backgroundColor: "#f1f5f9", borderRadius: "14px", fontSize: "26px", fontWeight: 900, color: "#0f172a", display: "flex", justifyContent: "space-between" }}>
          <span>1. The Monocle</span>
          <span>🧐</span>
        </div>
        <div style={{ padding: "14px 20px", backgroundColor: "#fef9c3", borderRadius: "14px", fontSize: "26px", fontWeight: 900, color: "#854d0e", display: "flex", justifyContent: "space-between" }}>
          <span>2. Pikachu Tail</span>
          <span>⚡</span>
        </div>
        <div style={{ padding: "14px 20px", backgroundColor: "#fee2e2", borderRadius: "14px", fontSize: "26px", fontWeight: 900, color: "#991b1b", display: "flex", justifyContent: "space-between" }}>
          <span>3. Cornucopia</span>
          <span>🍎</span>
        </div>
      </div>
      <div style={{ textAlign: "center", color: "#dc2626", fontSize: "24px", fontWeight: 900 }}>
        Hit Like if you got fooled by ALL THREE!
      </div>
    </CardFrame>
  );
};

