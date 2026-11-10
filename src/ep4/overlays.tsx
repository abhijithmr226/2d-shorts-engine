import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", { weights: ["700", "800", "900"], subsets: ["latin"] });

// Base Card container strictly obeying Safe Zones:
// Positioned in the middle band (top: 47%) so:
// 1. Character's face is 100% visible in the upper third (or framed to the side)
// 2. Subtitles sit cleanly beneath it at 67%
// 3. Platform UI (YouTube/Reels bottom 24%) is 100% clear!
export const CardFrame: React.FC<{
  children: React.ReactNode;
  bg?: string;
  borderColor?: string;
  tilt?: number;
  width?: string;
}> = ({ children, bg = "#ffffff", borderColor = "#0f172a", tilt = 0, width = "84%" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const pop = interpolate(t, [0, 0.15], [0.88, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "65px",
          left: "50%",
          transform: `translate(-50%, 0) scale(${pop}) rotate(${tilt}deg)`,
          width: width,
          maxHeight: "32%",
          backgroundColor: bg,
          border: `5px solid ${borderColor}`,
          borderRadius: "26px",
          boxShadow: "0 24px 50px rgba(0, 0, 0, 0.65)",
          padding: "20px 22px",
          fontFamily,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

// 1. Hook Buzz Ripple Overlay with animated concentric radar waves
export const HookBuzzOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const wave1 = (t % 0.6) / 0.6;
  const wave2 = ((t + 0.3) % 0.6) / 0.6;
  const pulse = Math.sin(t * 18) * (wave1 < 0.3 ? 8 : 2);

  return (
    <CardFrame bg="#090d16" borderColor="#38bdf8">
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          border: "4px solid rgba(56, 189, 248, 0.6)",
          transform: `translate(-50%, -50%) scale(${1 + wave1 * 1.8})`,
          opacity: 1 - wave1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          border: "4px solid rgba(56, 189, 248, 0.6)",
          transform: `translate(-50%, -50%) scale(${1 + wave2 * 1.8})`,
          opacity: 1 - wave2,
          pointerEvents: "none",
        }}
      />

      <div style={{ textAlign: "center", position: "relative", zIndex: 2, transform: `translateY(${pulse}px)` }}>
        <div style={{ display: "inline-block", backgroundColor: "#0284c7", color: "#ffffff", padding: "8px 24px", borderRadius: "999px", fontSize: "22px", fontWeight: 900, marginBottom: "14px", letterSpacing: "1.5px" }}>
          📳 SENSORY HOOK
        </div>
        <div style={{ fontSize: "44px", fontWeight: 900, color: "#f8fafc", lineHeight: 1.15, textTransform: "uppercase" }}>
          Did Your Phone <span style={{ color: "#38bdf8", textShadow: "0 0 24px rgba(56,189,248,0.8)" }}>Just Buzz?</span>
        </div>
        <div style={{ marginTop: "14px", fontSize: "24px", fontWeight: 800, color: "#cbd5e1" }}>
          Check it right now. Go.
        </div>
      </div>
    </CardFrame>
  );
};

// 2. Quiz Rules Intro Overlay
export const QuizIntroOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const badgeBounce = spring({ frame, fps, config: { damping: 10, mass: 0.6 } });

  return (
    <CardFrame bg="#ffffff" borderColor="#0284c7">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div style={{ backgroundColor: "#e0f2fe", color: "#0369a1", padding: "8px 20px", borderRadius: "999px", fontSize: "22px", fontWeight: 800 }}>
          📊 ADDICTION AUDIT
        </div>
        <div style={{ backgroundColor: "#fef08a", color: "#854d0e", padding: "6px 18px", borderRadius: "10px", fontSize: "22px", fontWeight: 900, transform: `scale(${badgeBounce})` }}>
          4 SIGNS
        </div>
      </div>
      <div style={{ fontSize: "36px", fontWeight: 900, color: "#0f172a", lineHeight: 1.25, marginBottom: "14px" }}>
        How Addicted To Your Phone Are You?
      </div>
      <div style={{ backgroundColor: "#f1f5f9", borderRadius: "16px", padding: "16px 20px", fontSize: "22px", fontWeight: 800, color: "#334155", borderLeft: "8px solid #0284c7" }}>
        Count your points: <span style={{ color: "#0284c7", fontWeight: 900 }}>+1 Point</span> for every sign that sounds like you!
      </div>
    </CardFrame>
  );
};

// 3. Sign One: The Ghost Buzz
export const SignOneOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stampSpring = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 9, mass: 0.5 } });

  return (
    <CardFrame bg="#ffffff" borderColor="#e11d48">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div style={{ backgroundColor: "#ffe4e6", color: "#be123c", padding: "8px 20px", borderRadius: "999px", fontSize: "22px", fontWeight: 800 }}>
          ⚠️ SIGN 01 / 04
        </div>
        <div style={{ backgroundColor: "#e11d48", color: "#ffffff", padding: "8px 20px", borderRadius: "999px", fontSize: "22px", fontWeight: 900, transform: `scale(${stampSpring})` }}>
          +1 POINT
        </div>
      </div>
      <div style={{ fontSize: "38px", fontWeight: 900, color: "#0f172a", lineHeight: 1.2, marginBottom: "12px" }}>
        The Ghost Buzz
      </div>
      <div style={{ fontSize: "22px", fontWeight: 700, color: "#475569", lineHeight: 1.4, marginBottom: "14px" }}>
        Felt a vibration in your pocket, reached down... and found absolutely nothing?
      </div>
      <div style={{ backgroundColor: "#fff1f2", borderLeft: "6px solid #e11d48", padding: "12px 18px", borderRadius: "10px", fontSize: "20px", fontWeight: 800, color: "#9f1239" }}>
        🔬 Diagnosis: "Phantom Vibration Syndrome"
      </div>
    </CardFrame>
  );
};

// 4. Sign Two: First Touch of Morning
export const SignTwoOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stampSpring = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 9, mass: 0.5 } });

  return (
    <CardFrame bg="#ffffff" borderColor="#f59e0b">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div style={{ backgroundColor: "#fef3c7", color: "#b45309", padding: "8px 20px", borderRadius: "999px", fontSize: "22px", fontWeight: 800 }}>
          ⏰ SIGN 02 / 04
        </div>
        <div style={{ backgroundColor: "#f59e0b", color: "#ffffff", padding: "8px 20px", borderRadius: "999px", fontSize: "22px", fontWeight: 900, transform: `scale(${stampSpring})` }}>
          +1 POINT
        </div>
      </div>
      <div style={{ fontSize: "38px", fontWeight: 900, color: "#0f172a", lineHeight: 1.2, marginBottom: "12px" }}>
        The First Touch
      </div>
      <div style={{ fontSize: "22px", fontWeight: 700, color: "#475569", lineHeight: 1.4, marginBottom: "14px" }}>
        Do you check your phone within <span style={{ color: "#b45309", fontWeight: 900 }}>10 minutes</span> of waking up?
      </div>
      <div style={{ backgroundColor: "#fffbeb", borderRadius: "14px", padding: "14px 18px", fontSize: "20px", fontWeight: 800, color: "#78350f" }}>
        • Before breakfast? 🍳 • Before brushing teeth? 🪥 • In bed? 🛏️
      </div>
    </CardFrame>
  );
};

// 3b. Point One Claimed Overlay (Shot 10 - Progression instead of duplicate)
export const PointOneClaimedOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stampSpring = spring({ frame: Math.max(0, frame - 4), fps, config: { damping: 9, mass: 0.5 } });

  return (
    <CardFrame bg="#ffffff" borderColor="#e11d48">
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", backgroundColor: "#ffe4e6", color: "#be123c", padding: "6px 20px", borderRadius: "999px", fontSize: "20px", fontWeight: 800, marginBottom: "10px" }}>
          SCORE AUDIT
        </div>
        <div>
          <div style={{ transform: `scale(${stampSpring})`, backgroundColor: "#e11d48", color: "#ffffff", padding: "10px 24px", borderRadius: "16px", fontSize: "30px", fontWeight: 900, display: "inline-block", marginBottom: "12px", boxShadow: "0 8px 24px rgba(225,29,72,0.35)" }}>
            +1 POINT CLAIMED [1/4]
          </div>
        </div>
        <div style={{ fontSize: "22px", fontWeight: 700, color: "#334155" }}>
          Phantom vibration confirmed! Give yourself one point.
        </div>
      </div>
    </CardFrame>
  );
};

// 4b. Point Two Claimed Overlay (Shot 14 - Progression instead of duplicate)
export const PointTwoClaimedOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stampSpring = spring({ frame: Math.max(0, frame - 4), fps, config: { damping: 9, mass: 0.5 } });

  return (
    <CardFrame bg="#ffffff" borderColor="#f59e0b">
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", backgroundColor: "#fef3c7", color: "#b45309", padding: "6px 20px", borderRadius: "999px", fontSize: "20px", fontWeight: 800, marginBottom: "10px" }}>
          SCORE AUDIT
        </div>
        <div>
          <div style={{ transform: `scale(${stampSpring})`, backgroundColor: "#f59e0b", color: "#ffffff", padding: "10px 24px", borderRadius: "16px", fontSize: "30px", fontWeight: 900, display: "inline-block", marginBottom: "12px", boxShadow: "0 8px 24px rgba(245,158,11,0.35)" }}>
            +1 POINT CLAIMED [2/4]
          </div>
        </div>
        <div style={{ fontSize: "22px", fontWeight: 700, color: "#334155" }}>
          Morning phone reflex confirmed! Add another point.
        </div>
      </div>
    </CardFrame>
  );
};

// 5a. Sign Three Intro Teaser (Shot 15)
export const SignThreeIntroOverlay: React.FC = () => {
  return (
    <CardFrame bg="#ffffff" borderColor="#2563eb">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div style={{ backgroundColor: "#dbeafe", color: "#1d4ed8", padding: "6px 18px", borderRadius: "999px", fontSize: "20px", fontWeight: 800 }}>
          📈 SIGN 03 / 04
        </div>
        <div style={{ backgroundColor: "#2563eb", color: "#ffffff", padding: "6px 18px", borderRadius: "999px", fontSize: "20px", fontWeight: 900 }}>
          THE DAILY COUNT
        </div>
      </div>
      <div style={{ fontSize: "34px", fontWeight: 900, color: "#0f172a", lineHeight: 1.25, marginBottom: "10px" }}>
        The Number Nobody Guesses
      </div>
      <div style={{ fontSize: "22px", fontWeight: 700, color: "#475569", lineHeight: 1.4 }}>
        How many times do you actually check your phone each day?
      </div>
    </CardFrame>
  );
};

// 5b. Sign Three: Animated Number Counter with Verified Source (Shot 16)
export const SignThreeStatsOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const count = Math.round(interpolate(t, [0.1, 1.4], [0, 186], { extrapolateRight: "clamp" }));
  const stampSpring = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 9, mass: 0.5 } });

  return (
    <CardFrame bg="#ffffff" borderColor="#2563eb">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <div style={{ backgroundColor: "#dbeafe", color: "#1d4ed8", padding: "6px 18px", borderRadius: "999px", fontSize: "18px", fontWeight: 800 }}>
          📊 RESEARCH BENCHMARK
        </div>
        <div style={{ backgroundColor: "#2563eb", color: "#ffffff", padding: "6px 18px", borderRadius: "999px", fontSize: "18px", fontWeight: 900, transform: `scale(${stampSpring})` }}>
          186× / DAY
        </div>
      </div>
      <div style={{ backgroundColor: "#eff6ff", borderRadius: "18px", padding: "12px", textAlign: "center", marginBottom: "10px", border: "2px solid #bfdbfe" }}>
        <div style={{ fontSize: "64px", fontWeight: 900, color: "#2563eb", lineHeight: 1 }}>
          {count}×
        </div>
        <div style={{ fontSize: "18px", fontWeight: 800, color: "#1e3a8a", marginTop: "4px" }}>
          Average Daily Phone Checks
        </div>
      </div>
      <div style={{ fontSize: "16px", fontWeight: 800, color: "#475569", textAlign: "center", borderTop: "1px solid #e2e8f0", paddingTop: "8px" }}>
        Verified Source: <span style={{ color: "#2563eb", fontWeight: 900 }}>Reviews.org (2026 Survey)</span>
      </div>
    </CardFrame>
  );
};

// 6. Sign Four: Screen Time Denial with growing comparison bars
export const SignFourOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const barGuess = interpolate(t, [0.1, 0.7], [0, 48], { extrapolateRight: "clamp" });
  const barReality = interpolate(t, [0.6, 1.3], [0, 96], { extrapolateRight: "clamp" });
  const stampSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 9, mass: 0.5 } });

  return (
    <CardFrame bg="#ffffff" borderColor="#7c3aed">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div style={{ backgroundColor: "#ede9fe", color: "#6d28d9", padding: "8px 20px", borderRadius: "999px", fontSize: "22px", fontWeight: 800 }}>
          📱 SIGN 04 / 04
        </div>
        <div style={{ backgroundColor: "#7c3aed", color: "#ffffff", padding: "8px 20px", borderRadius: "999px", fontSize: "22px", fontWeight: 900, transform: `scale(${stampSpring})` }}>
          +1 POINT
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "14px" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: 800, color: "#64748b", marginBottom: "4px" }}>
            <span>WHAT YOU GUESS</span>
            <span style={{ fontWeight: 900, color: "#334155" }}>3–4 hrs</span>
          </div>
          <div style={{ width: "100%", height: "18px", backgroundColor: "#e2e8f0", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ width: `${barGuess}%`, height: "100%", backgroundColor: "#94a3b8", borderRadius: "999px" }} />
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: 800, color: "#7c3aed", marginBottom: "4px" }}>
            <span>ACTUAL REALITY</span>
            <span style={{ fontWeight: 900, color: "#6d28d9" }}>2× HIGHER (7+ hrs)</span>
          </div>
          <div style={{ width: "100%", height: "22px", backgroundColor: "#ede9fe", borderRadius: "999px", overflow: "hidden", border: "2px solid #7c3aed" }}>
            <div style={{ width: `${barReality}%`, height: "100%", background: "linear-gradient(90deg, #7c3aed, #c026d3)", borderRadius: "999px" }} />
          </div>
        </div>
      </div>
      <div style={{ fontSize: "20px", fontWeight: 800, color: "#475569", textAlign: "center" }}>
        Young adults underestimate daily screen time by 50%!
      </div>
    </CardFrame>
  );
};

// 6b. Point Four Claimed Overlay (Shot 26 - Screen Time Surprise)
export const PointFourClaimedOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stampSpring = spring({ frame: Math.max(0, frame - 4), fps, config: { damping: 9, mass: 0.5 } });

  return (
    <CardFrame bg="#ffffff" borderColor="#7c3aed">
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", backgroundColor: "#ede9fe", color: "#6d28d9", padding: "6px 20px", borderRadius: "999px", fontSize: "20px", fontWeight: 800, marginBottom: "10px" }}>
          FINAL SIGN AUDIT
        </div>
        <div>
          <div style={{ transform: `scale(${stampSpring})`, backgroundColor: "#7c3aed", color: "#ffffff", padding: "10px 24px", borderRadius: "16px", fontSize: "30px", fontWeight: 900, display: "inline-block", marginBottom: "12px", boxShadow: "0 8px 24px rgba(124,58,237,0.35)" }}>
            +1 POINT CLAIMED [4/4]
          </div>
        </div>
        <div style={{ fontSize: "22px", fontWeight: 700, color: "#334155" }}>
          Screen Time surprises you? Give yourself another point.
        </div>
      </div>
    </CardFrame>
  );
};

// 7. Authentic Instagram Reels Mockup Overlay (Reduced to ~70% scale, positioned safely on right)
export const InstagramReelsOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // Smooth upward swipe animation between reel 1 and reel 2 at 1.4s
  const swipeProgress = interpolate(t, [1.3, 1.7], [0, 460], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const heartScale = spring({ frame: (frame % 25), fps, config: { damping: 9, mass: 0.5 } });
  const discRotation = (frame * 4) % 360;

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 60 }}>
      {/* Sleek smartphone mockup positioned safely on the right third (74% X) */}
      {/* Reduced to ~70% scale (260px x 460px), subtle shadow, zero overlap with character */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "74%",
          transform: "translate(-50%, -50%)",
          width: "260px",
          height: "460px",
          backgroundColor: "#000000",
          border: "4px solid #334155",
          borderRadius: "32px",
          boxShadow: "0 22px 55px rgba(0,0,0,0.75), 0 0 0 1.5px rgba(255,255,255,0.12)",
          overflow: "hidden",
          fontFamily,
          boxSizing: "border-box",
        }}
      >
        {/* Dynamic Island Pill at top */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "68px",
            height: "14px",
            backgroundColor: "#000000",
            borderRadius: "999px",
            zIndex: 30,
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        />

        {/* Top Reels Header */}
        <div
          style={{
            position: "absolute",
            top: "22px",
            left: "0",
            right: "0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
            color: "#ffffff",
            zIndex: 25,
            textShadow: "0 1px 4px rgba(0,0,0,0.8)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "16px", fontWeight: 900 }}>
            <span>Reels</span>
            <span style={{ fontSize: "12px", opacity: 0.8 }}>▾</span>
          </div>
          <div style={{ display: "flex", gap: "10px", fontSize: "14px" }}>
            <span>📷</span>
            <span>🔍</span>
          </div>
        </div>

        {/* Video Reel Container with Upward Scroll Track */}
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: `translateY(-${swipeProgress}px)`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Reel 1 */}
          <div
            style={{
              width: "100%",
              height: "460px",
              minHeight: "460px",
              background: "linear-gradient(160deg, #1e1b4b 0%, #312e81 40%, #0f172a 100%)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "16px",
              boxSizing: "border-box",
            }}
          >
            {/* Ambient Graphic inside Reel */}
            <div style={{ position: "absolute", top: "110px", left: "20px", right: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "36px", marginBottom: "6px" }}>📱👀</div>
              <div style={{ fontSize: "15px", fontWeight: 900, color: "#f8fafc", lineHeight: 1.25 }}>
                POV: You opened phone for "just 2 seconds"
              </div>
              <div style={{ display: "inline-block", backgroundColor: "rgba(239,68,68,0.2)", border: "1px solid #ef4444", color: "#fca5a5", fontSize: "11px", fontWeight: 800, padding: "3px 8px", borderRadius: "6px", marginTop: "8px" }}>
                45 mins later...
              </div>
            </div>

            {/* Creator Information & Caption */}
            <div style={{ color: "#ffffff", zIndex: 10, maxWidth: "180px", marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "linear-gradient(45deg, #f09433, #dc2743, #bc1888)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>
                  👤
                </div>
                <div style={{ fontSize: "13px", fontWeight: 900 }}>@daily_scroll</div>
                <div style={{ backgroundColor: "#0284c7", color: "#fff", fontSize: "9px", fontWeight: 800, padding: "2px 6px", borderRadius: "4px" }}>Follow</div>
              </div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#e2e8f0", lineHeight: 1.3, marginBottom: "4px" }}>
                Checking notifications again? 😭 #relatable #viral
              </div>
              <div style={{ fontSize: "10px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px" }}>
                <span>🎵</span>
                <span>original sound - Trending Beat</span>
              </div>
            </div>
          </div>

          {/* Reel 2 (Swiped up into view) */}
          <div
            style={{
              width: "100%",
              height: "460px",
              minHeight: "460px",
              background: "linear-gradient(160deg, #0369a1 0%, #0f172a 60%, #1e1b4b 100%)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "16px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ position: "absolute", top: "110px", left: "20px", right: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "36px", marginBottom: "6px" }}>⏰📊</div>
              <div style={{ fontSize: "15px", fontWeight: 900, color: "#facc15", lineHeight: 1.25 }}>
                Average screen time: 5.4 hours
              </div>
            </div>
            <div style={{ color: "#ffffff", zIndex: 10, maxWidth: "180px", marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#38bdf8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>
                  📊
                </div>
                <div style={{ fontSize: "13px", fontWeight: 900 }}>@stat_hub</div>
              </div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#e2e8f0" }}>
                Swipe for Part 2! ➡️ #stats
              </div>
            </div>
          </div>
        </div>

        {/* Right Action Rail (Heart, Comment, Share, Spinning Audio Disc) */}
        <div
          style={{
            position: "absolute",
            right: "10px",
            bottom: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            alignItems: "center",
            zIndex: 20,
          }}
        >
          {/* Like */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "22px", transform: `scale(${heartScale})` }}>❤️</div>
            <div style={{ fontSize: "10px", fontWeight: 900, color: "#ffffff" }}>284K</div>
          </div>
          {/* Comment */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "20px" }}>💬</div>
            <div style={{ fontSize: "10px", fontWeight: 900, color: "#ffffff" }}>3,412</div>
          </div>
          {/* Share */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "20px" }}>✈️</div>
            <div style={{ fontSize: "10px", fontWeight: 900, color: "#ffffff" }}>48K</div>
          </div>
          {/* Spinning Vinyl Disc */}
          <div
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              backgroundColor: "#111827",
              border: "2px solid #ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `rotate(${discRotation}deg)`,
              marginTop: "4px",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
          </div>
        </div>

        {/* Bottom Home Indicator Bar */}
        <div
          style={{
            position: "absolute",
            bottom: "6px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "3px",
            backgroundColor: "rgba(255,255,255,0.7)",
            borderRadius: "999px",
            zIndex: 30,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// 7b. Point Three Claimed Overlay
export const PointThreeClaimedOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stampSpring = spring({ frame: Math.max(0, frame - 4), fps, config: { damping: 9, mass: 0.5 } });

  return (
    <CardFrame>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div style={{ backgroundColor: "#fef3c7", color: "#b45309", padding: "8px 20px", borderRadius: "999px", fontSize: "22px", fontWeight: 800 }}>
          FREQUENT CHECKING
        </div>
        <div style={{ backgroundColor: "#f59e0b", color: "#ffffff", padding: "8px 20px", borderRadius: "999px", fontSize: "22px", fontWeight: 900, transform: `scale(${stampSpring})` }}>
          +1 POINT
        </div>
      </div>
      <div style={{ fontSize: "38px", fontWeight: 900, color: "#0f172a", lineHeight: 1.2, marginBottom: "12px" }}>
        CHECKING EVERY FEW MINUTES
      </div>
      <div style={{ fontSize: "22px", fontWeight: 700, color: "#475569", lineHeight: 1.4, marginBottom: "14px" }}>
        If unlocking your phone has become an unconscious reflex, claim your point.
      </div>
      <div style={{ backgroundColor: "#fffbeb", borderRadius: "14px", padding: "14px 18px", fontSize: "20px", fontWeight: 800, color: "#78350f" }}>
        Your Current Score: <strong>3 out of 4</strong>
      </div>
    </CardFrame>
  );
};

// 8. Mobile Gaming HUD Overlay (Arcade phone gaming)
export const MobileGamingOverlay: React.FC = () => {
  return null;
};

// 9. Brain Excitement Notification Surge Overlay ("A message. A like. Something funny.")
export const BrainExcitedOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const zap1 = Math.sin(t * 30) > 0.3;
  const notif1Pop = spring({ frame: Math.max(0, frame - 5), fps });
  const notif2Pop = spring({ frame: Math.max(0, frame - 22), fps });
  const notif3Pop = spring({ frame: Math.max(0, frame - 40), fps });

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 60 }}>
      <div style={{ position: "absolute", top: "47%", left: "50%", transform: "translate(-50%, -50%)", width: "86%", display: "flex", flexDirection: "column", gap: "10px", fontFamily }}>
        {/* Notification 1: Text message */}
        <div style={{ transform: `scale(${notif1Pop})`, backgroundColor: "#0f172a", border: "3px solid #38bdf8", borderRadius: "18px", padding: "12px 18px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.6)" }}>
          <div style={{ fontSize: "28px" }}>💬</div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: 900, color: "#38bdf8" }}>Messages • Just now</div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#f8fafc" }}>"Bro, did you see this video?!"</div>
          </div>
        </div>

        {/* Notification 2: Social Like */}
        <div style={{ transform: `scale(${notif2Pop})`, backgroundColor: "#0f172a", border: "3px solid #ec4899", borderRadius: "18px", padding: "12px 18px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.6)" }}>
          <div style={{ fontSize: "28px" }}>❤️</div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: 900, color: "#ec4899" }}>Instagram • 1m ago</div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#f8fafc" }}>alex_99 and 42 others liked your reel</div>
          </div>
        </div>

        {/* Notification 3: Dopamine Spike Indicator */}
        <div style={{ transform: `scale(${notif3Pop})`, backgroundColor: "#1e1b4b", border: "3px solid #facc15", borderRadius: "18px", padding: "14px 18px", textAlign: "center", boxShadow: zap1 ? "0 0 35px #eab308" : "none" }}>
          <div style={{ fontSize: "22px", fontWeight: 900, color: "#facc15" }}>⚡ DOPAMINE RECEPTOR: +350% SPIKE</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 10. Dopamine Loop Science with stepped sequence reveals
export const DopamineLoopOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const step1 = interpolate(t, [0.0, 0.3], [0, 1], { extrapolateRight: "clamp" });
  const step2 = interpolate(t, [0.5, 0.8], [0, 1], { extrapolateRight: "clamp" });
  const step3 = interpolate(t, [1.0, 1.3], [0, 1], { extrapolateRight: "clamp" });

  return (
    <CardFrame bg="#090d16" borderColor="#38bdf8">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div style={{ backgroundColor: "#0369a1", color: "#ffffff", padding: "6px 18px", borderRadius: "999px", fontSize: "20px", fontWeight: 800 }}>
          🧠 COGNITIVE SCIENCE
        </div>
        <div style={{ color: "#38bdf8", fontSize: "18px", fontWeight: 900 }}>
          THE DOPAMINE LOOP
        </div>
      </div>
      <div style={{ fontSize: "30px", fontWeight: 900, color: "#f8fafc", lineHeight: 1.25, marginBottom: "12px" }}>
        Why Does This Happen?
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "10px 16px", color: "#f8fafc", fontSize: "18px", fontWeight: 800, opacity: step1, transform: `translateX(${(1 - step1) * -30}px)` }}>
          🔔 <span style={{ color: "#38bdf8" }}>Notification:</span> A ping, like, or text message
        </div>
        <div style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "10px 16px", color: "#f8fafc", fontSize: "18px", fontWeight: 800, opacity: step2, transform: `translateX(${(1 - step2) * -30}px)` }}>
          ⚡ <span style={{ color: "#facc15" }}>Anticipation:</span> Dopamine spikes BEFORE you look
        </div>
        <div style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "10px 16px", color: "#f8fafc", fontSize: "18px", fontWeight: 800, opacity: step3, transform: `translateX(${(1 - step3) * -30}px)` }}>
          🎰 <span style={{ color: "#f43f5e" }}>Variable Reward:</span> The craving loop restarts
        </div>
      </div>
    </CardFrame>
  );
};

// 11. Passing Time Sun-to-Moon Clock Overlay
export const TimelapseClockOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  // Clock cycles from 07:15 AM -> 02:45 PM -> 11:30 PM
  const p = interpolate(t, [0, 3], [0, 1], { extrapolateRight: "clamp" });
  const timeStr = p < 0.35 ? "07:15 AM ☀️" : p < 0.7 ? "02:45 PM 🌤️" : "11:30 PM 🌙";

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 60 }}>
      <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#020617", border: "4px solid #facc15", borderRadius: "24px", padding: "18px 32px", textAlign: "center", fontFamily, boxShadow: "0 20px 50px rgba(0,0,0,0.85)" }}>
        <div style={{ fontSize: "18px", fontWeight: 800, color: "#94a3b8", marginBottom: "4px" }}>TIME PASSING IN BED</div>
        <div style={{ fontSize: "44px", fontWeight: 900, color: "#facc15", letterSpacing: "1px" }}>{timeStr}</div>
        <div style={{ fontSize: "18px", fontWeight: 700, color: "#cbd5e1", marginTop: "6px" }}>Still scrolling... Hours slipping away.</div>
      </div>
    </AbsoluteFill>
  );
};

// 12. Score 0 - 1: Doing Okay
export const ScoreZeroOneOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const fill = interpolate(t, [0.1, 0.8], [0, 25], { extrapolateRight: "clamp" });

  return (
    <CardFrame bg="#ffffff" borderColor="#16a34a">
      <div style={{ display: "inline-block", backgroundColor: "#dcfce7", color: "#15803d", padding: "6px 20px", borderRadius: "999px", fontSize: "20px", fontWeight: 900, marginBottom: "12px" }}>
        🏆 YOUR SCORE: 0 – 1 POINT
      </div>
      <div style={{ fontSize: "34px", fontWeight: 900, color: "#15803d", lineHeight: 1.2, marginBottom: "10px" }}>
        You're Doing Great!
      </div>
      <div style={{ width: "100%", height: "16px", backgroundColor: "#e2e8f0", borderRadius: "999px", overflow: "hidden", marginBottom: "12px" }}>
        <div style={{ width: `${fill}%`, height: "100%", backgroundColor: "#16a34a", borderRadius: "999px" }} />
      </div>
      <div style={{ fontSize: "20px", fontWeight: 700, color: "#334155", lineHeight: 1.35 }}>
        You maintain healthy digital boundaries. Your phone is a tool, not a constant reflex.
      </div>
    </CardFrame>
  );
};

// 13. Score 2 - 3: Strong Grip
export const ScoreTwoThreeOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const fill = interpolate(t, [0.1, 0.8], [0, 68], { extrapolateRight: "clamp" });

  return (
    <CardFrame bg="#ffffff" borderColor="#ea580c">
      <div style={{ display: "inline-block", backgroundColor: "#ffedd5", color: "#c2410c", padding: "6px 20px", borderRadius: "999px", fontSize: "20px", fontWeight: 900, marginBottom: "12px" }}>
        ⚠️ YOUR SCORE: 2 – 3 POINTS
      </div>
      <div style={{ fontSize: "34px", fontWeight: 900, color: "#c2410c", lineHeight: 1.2, marginBottom: "10px" }}>
        Strong Grip On Attention
      </div>
      <div style={{ width: "100%", height: "16px", backgroundColor: "#e2e8f0", borderRadius: "999px", overflow: "hidden", marginBottom: "12px" }}>
        <div style={{ width: `${fill}%`, height: "100%", backgroundColor: "#ea580c", borderRadius: "999px" }} />
      </div>
      <div style={{ fontSize: "20px", fontWeight: 700, color: "#334155", lineHeight: 1.35 }}>
        Your phone commands a major share of your daily focus and subconscious autopilot.
      </div>
    </CardFrame>
  );
};

// 14. Score 4: Serious Life Share
export const ScoreFourOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const fill = interpolate(t, [0.1, 0.8], [0, 100], { extrapolateRight: "clamp" });

  return (
    <CardFrame bg="#ffffff" borderColor="#dc2626">
      <div style={{ display: "inline-block", backgroundColor: "#fee2e2", color: "#b91c1c", padding: "6px 20px", borderRadius: "999px", fontSize: "20px", fontWeight: 900, marginBottom: "12px" }}>
        🚨 YOUR SCORE: 4 / 4 POINTS
      </div>
      <div style={{ fontSize: "34px", fontWeight: 900, color: "#b91c1c", lineHeight: 1.2, marginBottom: "10px" }}>
        Heavy Screen Time Share
      </div>
      <div style={{ width: "100%", height: "18px", backgroundColor: "#fee2e2", borderRadius: "999px", overflow: "hidden", marginBottom: "12px", border: "2px solid #dc2626" }}>
        <div style={{ width: `${fill}%`, height: "100%", background: "linear-gradient(90deg, #ea580c, #dc2626)", borderRadius: "999px" }} />
      </div>
      <div style={{ fontSize: "20px", fontWeight: 700, color: "#334155", lineHeight: 1.35 }}>
        You might be spending far more of your conscious waking life on your screen than you realize!
      </div>
    </CardFrame>
  );
};

// 15. Medical Disclaimer
export const MedicalDisclaimerOverlay: React.FC = () => {
  return (
    <CardFrame bg="#090d16" borderColor="#64748b">
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", backgroundColor: "#334155", color: "#cbd5e1", padding: "6px 20px", borderRadius: "999px", fontSize: "20px", fontWeight: 800, marginBottom: "12px" }}>
          ℹ️ SCIENTIFIC CLARIFICATION
        </div>
        <div style={{ fontSize: "30px", fontWeight: 900, color: "#f8fafc", lineHeight: 1.25, marginBottom: "10px" }}>
          Just For Fun • Not A Diagnosis
        </div>
        <div style={{ fontSize: "18px", fontWeight: 700, color: "#94a3b8", lineHeight: 1.35 }}>
          This self-check is for educational insight and reflection, not a medical test.
        </div>
      </div>
    </CardFrame>
  );
};

// 15b. DSM-5 Clinical Clarification (Shot 37)
export const DSM5ClarificationOverlay: React.FC = () => {
  return (
    <CardFrame bg="#090d16" borderColor="#38bdf8">
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", backgroundColor: "#0369a1", color: "#ffffff", padding: "6px 20px", borderRadius: "999px", fontSize: "20px", fontWeight: 800, marginBottom: "12px" }}>
          🔬 CLINICAL PSYCHOLOGY FACT
        </div>
        <div style={{ fontSize: "30px", fontWeight: 900, color: "#f8fafc", lineHeight: 1.25, marginBottom: "10px" }}>
          DSM-5 Classification Status
        </div>
        <div style={{ fontSize: "18px", fontWeight: 700, color: "#94a3b8", lineHeight: 1.35 }}>
          "Smartphone addiction" is not currently classified as an official standalone disorder in the DSM-5.
        </div>
      </div>
    </CardFrame>
  );
};

// 16. Subscribe & Follow Animated Button Overlay
export const SubscribeFollowOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const isClicked = t > 0.8;
  const bellRing = isClicked ? Math.sin(t * 24) * 15 : 0;
  const btnScale = spring({ frame: Math.max(0, frame - 24), fps, config: { damping: 9, mass: 0.5 } });

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 60 }}>
      <div style={{ position: "absolute", top: "48%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", fontFamily }}>
        {/* Animated Subscribe Pill */}
        <div
          style={{
            transform: `scale(${btnScale})`,
            backgroundColor: isClicked ? "#27272a" : "#dc2626",
            color: "#ffffff",
            padding: "16px 44px",
            borderRadius: "999px",
            fontSize: "30px",
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: isClicked ? "0 10px 30px rgba(0,0,0,0.5)" : "0 14px 40px rgba(220,38,38,0.6)",
            transition: "all 0.2s ease",
          }}
        >
          <span>{isClicked ? "SUBSCRIBED" : "SUBSCRIBE"}</span>
          <span style={{ transform: `rotate(${bellRing}deg)`, display: "inline-block" }}>🔔</span>
        </div>
        {/* Hand Pointer Animation */}
        {!isClicked && (
          <div style={{ fontSize: "38px", transform: "translateY(-6px)" }}>
            👆
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// 17. Call To Action & Comment Prompt with bouncing comment arrow
export const CommentScreenTimeOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const arrowBounce = Math.sin(t * 10) * 6;

  return (
    <CardFrame bg="#ffffff" borderColor="#0284c7">
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block", backgroundColor: "#e0f2fe", color: "#0369a1", padding: "6px 20px", borderRadius: "999px", fontSize: "20px", fontWeight: 800, marginBottom: "10px" }}>
          💬 COMMUNITY CHALLENGE
        </div>
        <div style={{ fontSize: "32px", fontWeight: 900, color: "#0f172a", lineHeight: 1.2, marginBottom: "10px" }}>
          Check Your Screen Time!
        </div>
        <div style={{ backgroundColor: "#0284c7", color: "#ffffff", padding: "14px 18px", borderRadius: "16px", fontSize: "22px", fontWeight: 900, marginBottom: "10px", transform: `translateY(${arrowBounce}px)`, boxShadow: "0 8px 24px rgba(2,132,199,0.4)" }}>
          Comment Your Daily Hours Below ⬇️
        </div>
        <div style={{ fontSize: "18px", fontWeight: 800, color: "#64748b" }}>
          What does your phone ACTUALLY say?
        </div>
      </div>
    </CardFrame>
  );
};

// 18. Ending Punchline
export const EndingBuzzOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const pulse = Math.sin(t * 14) * 4;

  return (
    <CardFrame bg="#090d16" borderColor="#38bdf8">
      <div style={{ textAlign: "center", transform: `translateY(${pulse}px)` }}>
        <div style={{ fontSize: "32px", fontWeight: 900, color: "#f8fafc", lineHeight: 1.25, marginBottom: "10px" }}>
          And That Buzz At The Start?
        </div>
        <div style={{ fontSize: "28px", fontWeight: 900, color: "#38bdf8", marginBottom: "8px", textShadow: "0 0 20px rgba(56,189,248,0.7)" }}>
          It Probably Never Happened.
        </div>
        <div style={{ fontSize: "20px", fontWeight: 800, color: "#94a3b8" }}>
          You were just waiting for it. 📳
        </div>
      </div>
    </CardFrame>
  );
};

// ==========================================
// FULL-SCREEN CINEMATIC INSERTS & DIAGRAMS
// (For Director's Cut: straight-on, clean, readable)
// ==========================================

// Insert 1: Empty Notification Phone Screen (Shot 7 Insert)
export const EmptyNotificationInsert: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const ripple = (t % 0.8) / 0.8;

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 60 }}>
      <div
        style={{
          width: "480px",
          height: "820px",
          backgroundColor: "#030712",
          border: "8px solid #334155",
          borderRadius: "44px",
          padding: "24px",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.9)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Phantom Vibration Ripple behind clock */}
        <div
          style={{
            position: "absolute",
            top: "35%",
            left: "50%",
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            border: "3px solid rgba(56, 189, 248, 0.5)",
            transform: `translate(-50%, -50%) scale(${1 + ripple * 1.5})`,
            opacity: 1 - ripple,
          }}
        />

        {/* Status Bar */}
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", color: "#94a3b8", fontSize: "16px", fontWeight: 800, padding: "0 8px" }}>
          <span>9:41</span>
          <span>5G 📶 88% 🔋</span>
        </div>

        {/* Clock & Lockscreen */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <div style={{ fontSize: "64px", fontWeight: 900, color: "#ffffff", letterSpacing: "-1px" }}>12:42</div>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#94a3b8" }}>Wednesday, October 14</div>
        </div>

        {/* Empty Notification Banner */}
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(30, 41, 59, 0.8)",
            border: "2px solid rgba(56, 189, 248, 0.4)",
            borderRadius: "20px",
            padding: "24px 16px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>📳❓</div>
          <div style={{ fontSize: "24px", fontWeight: 900, color: "#38bdf8", marginBottom: "6px" }}>No New Notifications</div>
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#cbd5e1" }}>Screen was blank. Pocket was still.</div>
        </div>

        {/* Home Indicator bar */}
        <div style={{ width: "140px", height: "5px", backgroundColor: "#64748b", borderRadius: "999px", marginBottom: "8px" }} />
      </div>
    </AbsoluteFill>
  );
};

// Insert 2: Top-Down Screen Time Clock Usage Surge (Shot 22 Insert)
export const TopDownScreenTimeClockInsert: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // Progressive count from 3 -> 4 -> 5 hours
  const hours = t < 0.7 ? "3" : t < 1.4 ? "4" : "5";
  const progress = interpolate(t, [0, 2.2], [45, 92], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 60 }}>
      <div
        style={{
          width: "500px",
          backgroundColor: "#090d16",
          border: "5px solid #0284c7",
          borderRadius: "32px",
          padding: "32px 24px",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.85)",
          textAlign: "center",
          fontFamily,
        }}
      >
        <div style={{ display: "inline-block", backgroundColor: "#0369a1", color: "#ffffff", padding: "6px 22px", borderRadius: "999px", fontSize: "18px", fontWeight: 900, marginBottom: "16px" }}>
          ⏱️ DAILY USAGE TELEMETRY
        </div>
        <div style={{ fontSize: "24px", fontWeight: 800, color: "#94a3b8", marginBottom: "6px" }}>
          TOTAL TIME ON SCREEN
        </div>
        <div style={{ fontSize: "76px", fontWeight: 900, color: "#f8fafc", lineHeight: 1.1, marginBottom: "12px", letterSpacing: "-1px" }}>
          {hours}h <span style={{ color: "#38bdf8", fontSize: "48px" }}>24m</span>
        </div>
        {/* Animated Progress Arc Bar */}
        <div style={{ width: "100%", height: "16px", backgroundColor: "#1e293b", borderRadius: "999px", overflow: "hidden", marginBottom: "14px" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #0284c7, #38bdf8, #f59e0b)", borderRadius: "999px" }} />
        </div>
        <div style={{ fontSize: "18px", fontWeight: 800, color: "#f59e0b" }}>
          Three? Four? Five hours every single day?
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Insert 3: Perception vs Reality 2x Comparison Diagram (Shot 25 Insert)
export const ComparisonDiagramInsert: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const bar1 = interpolate(t, [0, 0.6], [0, 48], { extrapolateRight: "clamp" });
  const bar2 = interpolate(t, [0.4, 1.2], [0, 96], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 60 }}>
      <div
        style={{
          width: "520px",
          backgroundColor: "#090d16",
          border: "5px solid #6366f1",
          borderRadius: "32px",
          padding: "30px 24px",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.85)",
          fontFamily,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <div style={{ display: "inline-block", backgroundColor: "#312e81", color: "#a5b4fc", padding: "6px 20px", borderRadius: "999px", fontSize: "18px", fontWeight: 900, marginBottom: "8px" }}>
            📊 BEHAVIORAL RESEARCH
          </div>
          <div style={{ fontSize: "30px", fontWeight: 900, color: "#ffffff", lineHeight: 1.2 }}>
            Perception vs. Reality
          </div>
        </div>

        {/* Bar 1: What You Think */}
        <div style={{ marginBottom: "18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: 800, color: "#94a3b8", marginBottom: "6px" }}>
            <span>💭 What People Guess</span>
            <span style={{ color: "#38bdf8", fontWeight: 900 }}>~2.5 Hours</span>
          </div>
          <div style={{ width: "100%", height: "20px", backgroundColor: "#1e293b", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ width: `${bar1}%`, height: "100%", backgroundColor: "#0284c7", borderRadius: "999px" }} />
          </div>
        </div>

        {/* Bar 2: Actual Reality (2x) */}
        <div style={{ marginBottom: "18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: 800, color: "#94a3b8", marginBottom: "6px" }}>
            <span>📱 Actual Screen Time</span>
            <span style={{ color: "#f43f5e", fontWeight: 900 }}>5.4 Hours (2×!)</span>
          </div>
          <div style={{ width: "100%", height: "20px", backgroundColor: "#1e293b", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ width: `${bar2}%`, height: "100%", background: "linear-gradient(90deg, #f59e0b, #f43f5e)", borderRadius: "999px" }} />
          </div>
        </div>

        <div style={{ textAlign: "center", fontSize: "18px", fontWeight: 800, color: "#fde047" }}>
          Young adults use phones about twice as much as they think!
        </div>
      </div>
    </AbsoluteFill>
  );
};
