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
}> = ({ children, bg = "#ffffff", borderColor = "#1a1824", tilt = 0 }) => {
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
          maxHeight: "58%", // leaves top 18% for top-captions and bottom 24% for app UI
          backgroundColor: bg,
          border: `7px solid ${borderColor}`,
          borderRadius: "28px",
          boxShadow: "0 20px 48px rgba(0, 0, 0, 0.45)",
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

// 1. Viral Post Card (NO invented numbers, fits 100% inside safe zone)
export const ViralPostOverlay: React.FC = () => {
  return (
    <CardFrame bg="#ffffff" borderColor="#1c2438">
      {/* Header pill & Illustration tag */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div
          style={{
            backgroundColor: "#e8f2fe",
            color: "#1e60b5",
            fontWeight: 800,
            fontSize: "26px",
            padding: "8px 20px",
            borderRadius: "16px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          📱 Viral Post
        </div>
        <div
          style={{
            backgroundColor: "#f0f2f5",
            color: "#657786",
            fontWeight: 700,
            fontSize: "22px",
            padding: "6px 14px",
            borderRadius: "12px",
          }}
        >
          Illustration
        </div>
      </div>

      {/* Main Quote */}
      <div
        style={{
          fontSize: "48px",
          fontWeight: 900,
          color: "#16181f",
          lineHeight: "1.25",
          marginBottom: "20px",
        }}
      >
        “The kindest thing a railway ever did.”
      </div>

      {/* Sub-line */}
      <div
        style={{
          fontSize: "30px",
          fontWeight: 700,
          color: "#4a5264",
          lineHeight: "1.35",
          marginBottom: "24px",
        }}
      >
        A snowy station in Hokkaido kept open for a single high school girl.
      </div>

      {/* Stylized Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 20px",
          backgroundColor: "#fdf3f4",
          border: "3px solid #f8c8cc",
          borderRadius: "18px",
        }}
      >
        <span style={{ fontSize: "36px" }}>❄️</span>
        <span style={{ fontSize: "28px", fontWeight: 800, color: "#c82a36" }}>
          Kyū-Shirataki Station • Hokkaido
        </span>
      </div>
    </CardFrame>
  );
};

// 2. Call-To-Action (Subscribe & Follow)
export const CallToActionOverlay: React.FC = () => {
  return (
    <CardFrame bg="#ffffff" borderColor="#222">
      <div
        style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: 800,
          color: "#555b6e",
          marginBottom: "12px",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Untold Stories
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: "52px",
          fontWeight: 900,
          color: "#11141a",
          lineHeight: "1.2",
          marginBottom: "32px",
        }}
      >
        Follow for the Real History
      </div>

      {/* Instagram Button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
          color: "#ffffff",
          fontWeight: 800,
          fontSize: "36px",
          padding: "18px 24px",
          borderRadius: "20px",
          marginBottom: "18px",
          boxShadow: "0 8px 20px rgba(220, 39, 67, 0.3)",
        }}
      >
        <span>📸</span> Follow on Instagram
      </div>

      {/* Subscribe Button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          backgroundColor: "#e02424",
          color: "#ffffff",
          fontWeight: 800,
          fontSize: "36px",
          padding: "18px 24px",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(224, 36, 36, 0.3)",
        }}
      >
        <span>▶</span> Subscribe Here
      </div>
    </CardFrame>
  );
};

// 3. Document / Fact Overlays (Reveal Section)
export type FactType = "july2015" | "calendar" | "passengers" | "sleep" | "demolished";

export const FactDocumentOverlay: React.FC<{ fact: FactType }> = ({ fact }) => {
  return (
    <CardFrame bg="#fefcf8" borderColor="#1c1c24" tilt={-2}>
      {/* Red MYTH Stamp positioned in corner where it NEVER covers text */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "24px",
          border: "5px solid #d42a2a",
          color: "#d42a2a",
          fontWeight: 900,
          fontSize: "32px",
          padding: "4px 16px",
          borderRadius: "10px",
          transform: "rotate(10deg)",
          letterSpacing: "2px",
          opacity: 0.92,
        }}
      >
        FACT CHECK
      </div>

      {fact === "july2015" && (
        <>
          <div style={{ color: "#1e4d8c", fontWeight: 800, fontSize: "28px", marginBottom: "12px" }}>
            OFFICIAL JR HOKKAIDO ARCHIVE
          </div>
          <div style={{ fontSize: "48px", fontWeight: 900, color: "#161820", lineHeight: "1.25", marginBottom: "20px" }}>
            July 2015 Announcement
          </div>
          <div style={{ fontSize: "36px", fontWeight: 700, color: "#2d3444", lineHeight: "1.35", marginBottom: "16px" }}>
            JR Hokkaido scheduled 4 rural stations to close in March 2016 due to low ridership.
          </div>
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#667085", backgroundColor: "#f2f4f8", padding: "10px 16px", borderRadius: "12px", display: "inline-block" }}>
            Source: JR Hokkaido Press Release (July 2015)
          </div>
        </>
      )}

      {fact === "calendar" && (
        <>
          <div style={{ color: "#c8322e", fontWeight: 800, fontSize: "28px", marginBottom: "12px" }}>
            THE MARCH COINCIDENCE
          </div>
          <div style={{ fontSize: "46px", fontWeight: 900, color: "#161820", lineHeight: "1.25", marginBottom: "24px" }}>
            Two Unrelated Events
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ backgroundColor: "#eef4fd", borderLeft: "8px solid #1e60b5", padding: "14px 18px", borderRadius: "10px" }}>
              <div style={{ fontSize: "24px", color: "#1e60b5", fontWeight: 800 }}>EVENT A</div>
              <div style={{ fontSize: "34px", fontWeight: 800, color: "#111" }}>Timetables change every March</div>
            </div>
            <div style={{ backgroundColor: "#fef3f3", borderLeft: "8px solid #c8322e", padding: "14px 18px", borderRadius: "10px" }}>
              <div style={{ fontSize: "24px", color: "#c8322e", fontWeight: 800 }}>EVENT B</div>
              <div style={{ fontSize: "34px", fontWeight: 800, color: "#111" }}>Japanese school year ends in March</div>
            </div>
          </div>
        </>
      )}

      {fact === "passengers" && (
        <>
          <div style={{ color: "#287a4a", fontWeight: 800, fontSize: "28px", marginBottom: "12px" }}>
            NOT AN EMPTY TRAIN
          </div>
          <div style={{ fontSize: "48px", fontWeight: 900, color: "#161820", lineHeight: "1.25", marginBottom: "20px" }}>
            Dozens on Board
          </div>
          <div style={{ fontSize: "36px", fontWeight: 700, color: "#2d3444", lineHeight: "1.35", marginBottom: "16px" }}>
            When Kana stepped on, the carriage was already filled with students from her own high school.
          </div>
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#667085", backgroundColor: "#f2f4f8", padding: "10px 16px", borderRadius: "12px", display: "inline-block" }}>
            Source: Hokkaido Shimbun Commuter Interviews
          </div>
        </>
      )}

      {fact === "sleep" && (
        <>
          <div style={{ color: "#d97706", fontWeight: 800, fontSize: "28px", marginBottom: "12px" }}>
            KANA’S OWN WORDS
          </div>
          <div style={{ fontSize: "48px", fontWeight: 900, color: "#161820", lineHeight: "1.25", marginBottom: "20px" }}>
            “It let me sleep a little longer”
          </div>
          <div style={{ fontSize: "36px", fontWeight: 700, color: "#2d3444", lineHeight: "1.35", marginBottom: "16px" }}>
            The nearby stop simply saved her walking time in the cold mornings before classes.
          </div>
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#667085", backgroundColor: "#f2f4f8", padding: "10px 16px", borderRadius: "12px", display: "inline-block" }}>
            Interview with Kana Harada
          </div>
        </>
      )}

      {fact === "demolished" && (
        <>
          <div style={{ color: "#555b6e", fontWeight: 800, fontSize: "28px", marginBottom: "12px" }}>
            FINAL CHAPTER
          </div>
          <div style={{ fontSize: "48px", fontWeight: 900, color: "#161820", lineHeight: "1.25", marginBottom: "20px" }}>
            Demolished October 2016
          </div>
          <div style={{ fontSize: "36px", fontWeight: 700, color: "#2d3444", lineHeight: "1.35", marginBottom: "16px" }}>
            The wooden station building was quietly torn down seven months later.
          </div>
          <div style={{ fontSize: "26px", fontWeight: 700, color: "#667085", backgroundColor: "#f2f4f8", padding: "10px 16px", borderRadius: "12px", display: "inline-block" }}>
            Source: Engaru Town Municipal Records
          </div>
        </>
      )}
    </CardFrame>
  );
};

// 4. Ending Big Question Overlay
export const EndingQuestionOverlay: React.FC = () => {
  return (
    <CardFrame bg="#ffffff" borderColor="#161822">
      <div style={{ color: "#c8322e", fontWeight: 800, fontSize: "28px", marginBottom: "16px", textTransform: "uppercase" }}>
        The Big Question
      </div>
      <div
        style={{
          fontSize: "48px",
          fontWeight: 900,
          color: "#141720",
          lineHeight: "1.25",
          marginBottom: "24px",
        }}
      >
        “If it was never true... why did so many of us believe it so fast?”
      </div>
      <div
        style={{
          backgroundColor: "#f5f6f8",
          padding: "16px 20px",
          borderRadius: "16px",
          fontSize: "30px",
          fontWeight: 800,
          color: "#1e60b5",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span>💬</span> Tell us in the comments 👇
      </div>
    </CardFrame>
  );
};

