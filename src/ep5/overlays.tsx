import React from "react";
import { useCurrentFrame, useVideoConfig, spring, staticFile } from "remotion";

/**
 * Standard Bottom-Anchored Card Frame
 * Positioned in the bottom-third (bottom: 70px) so the upper 70% remains completely unobstructed
 * for character animation and 3D visual storytelling.
 */
export const CardFrame: React.FC<{
  children: React.ReactNode;
  width?: number;
  glow?: string;
}> = ({ children, width = 940, glow = "rgba(234, 179, 8, 0.25)" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: "70px",
        left: "50%",
        transform: `translateX(-50%) scale(${scale})`,
        width: `${width}px`,
        background: "rgba(10, 15, 29, 0.94)",
        backdropFilter: "blur(20px)",
        border: "2px solid rgba(250, 204, 21, 0.4)",
        borderRadius: "28px",
        padding: "24px 32px",
        boxShadow: `0 24px 50px rgba(0, 0, 0, 0.75), 0 0 40px ${glow}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      {children}
    </div>
  );
};

// 1. SHOT 01: $10 BILLION HOOK
export const TenBillionHookOverlay: React.FC = () => {
  return (
    <CardFrame width={920} glow="rgba(250, 204, 21, 0.35)">
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "22px",
          fontWeight: 800,
          letterSpacing: "4px",
          color: "#facc15",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}
      >
        RENTAL REVENUE
      </div>
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "64px",
          fontWeight: 900,
          color: "#ffffff",
          letterSpacing: "-1px",
          textShadow: "0 6px 20px rgba(0, 0, 0, 0.8)",
        }}
      >
        $10 BILLION
      </div>
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "20px",
          fontWeight: 700,
          color: "#94a3b8",
          marginTop: "6px",
        }}
      >
        FROM RENT ALONE
      </div>
    </CardFrame>
  );
};

// 2. SHOT 02: THE BUSINESS BEHIND THE BURGER
export const BurgersVsRealEstateOverlay: React.FC = () => {
  return (
    <CardFrame width={920}>
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "22px",
          fontWeight: 800,
          letterSpacing: "3px",
          color: "#f87171",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}
      >
        HIDDEN EMPIRE
      </div>
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "46px",
          fontWeight: 900,
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        BURGERS <span style={{ color: "#facc15" }}>VS</span> REAL ESTATE
      </div>
    </CardFrame>
  );
};

// 3. SHOT 04: 1954 — RAY KROC
export const Vintage1954RayKrocOverlay: React.FC = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Vintage 1953 McDonald's Logo Badge on Top Left Safe Zone */}
      <div
        style={{
          position: "absolute",
          top: "85px",
          left: "50px",
          background: "#fffbeb",
          border: "3px solid #dc2626",
          borderRadius: "18px",
          padding: "10px 16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          zIndex: 40,
        }}
      >
        <img
          src={staticFile("ep5/mcdonalds_logo_1953.png")}
          alt="1953 Vintage Logo"
          style={{ width: "65px", height: "auto", display: "block" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "12px", fontWeight: 800, color: "#dc2626", letterSpacing: "1px" }}>
            ORIGINAL 1953
          </span>
          <span style={{ fontSize: "16px", fontWeight: 900, color: "#0f172a" }}>
            SAN BERNARDINO
          </span>
        </div>
      </div>

      <CardFrame width={880}>
        <div
          style={{
            fontFamily: "Inter, Montserrat, sans-serif",
            fontSize: "22px",
            fontWeight: 800,
            letterSpacing: "4px",
            color: "#38bdf8",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}
        >
          THE DISCOVERY
        </div>
        <div
          style={{
            fontFamily: "Inter, Montserrat, sans-serif",
            fontSize: "52px",
            fontWeight: 900,
            color: "#ffffff",
          }}
        >
          1954 — RAY KROC
        </div>
      </CardFrame>
    </div>
  );
};

// 4. SHOT 05: THE DISCOVERY
export const ExtraordinaryOverlay: React.FC = () => {
  return (
    <CardFrame width={880}>
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "44px",
          fontWeight: 900,
          color: "#facc15",
          letterSpacing: "1px",
        }}
      >
        SOMETHING EXTRAORDINARY
      </div>
    </CardFrame>
  );
};

// 5. SHOT 06: THE EFFICIENT SYSTEM
export const SystemFormulaOverlay: React.FC = () => {
  return (
    <CardFrame width={920}>
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "22px",
          fontWeight: 800,
          letterSpacing: "3px",
          color: "#4ade80",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        SPEEDEE SERVICE SYSTEM
      </div>
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "42px",
          fontWeight: 900,
          color: "#ffffff",
          letterSpacing: "1px",
        }}
      >
        FAST • CONSISTENT • REPEATABLE
      </div>
    </CardFrame>
  );
};

// 6. SHOT 08: THE PROBLEM
export const TheProblemOverlay: React.FC = () => {
  return (
    <CardFrame width={840} glow="rgba(239, 68, 68, 0.35)">
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "50px",
          fontWeight: 900,
          color: "#ef4444",
          letterSpacing: "2px",
        }}
      >
        THE BOTTLENECK
      </div>
    </CardFrame>
  );
};

// 7. SHOT 09: LAND, MONEY AND RISK
export const LandMoneyRiskOverlay: React.FC = () => {
  return (
    <CardFrame width={920} glow="rgba(239, 68, 68, 0.4)">
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "20px",
          fontWeight: 800,
          letterSpacing: "3px",
          color: "#f87171",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        FRANCHISING CRISIS
      </div>
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "48px",
          fontWeight: 900,
          color: "#ffffff",
          letterSpacing: "2px",
        }}
      >
        LAND • MONEY • RISK
      </div>
    </CardFrame>
  );
};

// 8. SHOT 10: HARRY SONNEBORN
export const HarrySonnebornOverlay: React.FC = () => {
  return (
    <CardFrame width={920} glow="rgba(56, 189, 248, 0.35)">
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "22px",
          fontWeight: 800,
          letterSpacing: "3px",
          color: "#38bdf8",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}
      >
        FINANCIAL ARCHITECT
      </div>
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "52px",
          fontWeight: 900,
          color: "#ffffff",
        }}
      >
        HARRY SONNEBORN
      </div>
    </CardFrame>
  );
};

// 9. SHOT 11: THE BIG QUESTION
export const SplitScreenStrategyOverlay: React.FC = () => {
  return (
    <CardFrame width={940}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center", flex: 1 }}>
          <div style={{ fontSize: "18px", fontWeight: 800, color: "#f87171", marginBottom: "4px" }}>
            SHORT TERM
          </div>
          <div style={{ fontSize: "34px", fontWeight: 900, color: "#ffffff" }}>
            SELL BURGERS
          </div>
        </div>
        <div style={{ fontSize: "28px", fontWeight: 900, color: "#facc15", padding: "0 18px" }}>
          VS
        </div>
        <div style={{ textAlign: "center", flex: 1 }}>
          <div style={{ fontSize: "18px", fontWeight: 800, color: "#4ade80", marginBottom: "4px" }}>
            LONG TERM
          </div>
          <div style={{ fontSize: "34px", fontWeight: 900, color: "#ffffff" }}>
            OWN THE LAND
          </div>
        </div>
      </div>
    </CardFrame>
  );
};

// 10. SHOT 16: ONE RESTAURANT • TWO REVENUE STREAMS
export const TwoRevenueStreamsOverlay: React.FC = () => {
  return (
    <CardFrame width={920}>
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "22px",
          fontWeight: 800,
          letterSpacing: "3px",
          color: "#4ade80",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}
      >
        THE CASH-FLOW ENGINE
      </div>
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "44px",
          fontWeight: 900,
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        RENT <span style={{ color: "#facc15" }}>+</span> ROYALTIES
      </div>
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "20px",
          fontWeight: 700,
          color: "#94a3b8",
          marginTop: "6px",
        }}
      >
        ONE RESTAURANT • TWO REVENUE STREAMS
      </div>
    </CardFrame>
  );
};

// 11. SHOT 18: $10.4 BILLION REVEAL
export const TenPointFourBillionOverlay: React.FC = () => {
  return (
    <CardFrame width={920} glow="rgba(250, 204, 21, 0.45)">
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "22px",
          fontWeight: 800,
          letterSpacing: "4px",
          color: "#facc15",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}
      >
        2025 RENTAL REVENUE
      </div>
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "66px",
          fontWeight: 900,
          color: "#ffffff",
          letterSpacing: "-1px",
        }}
      >
        $10.4 BILLION
      </div>
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "20px",
          fontWeight: 700,
          color: "#94a3b8",
          marginTop: "6px",
        }}
      >
        FROM FRANCHISED RESTAURANTS ALONE
      </div>
    </CardFrame>
  );
};

// 12. SHOT 19: REVENUE ≠ PROFIT
export const RevenueNotProfitOverlay: React.FC = () => {
  return (
    <CardFrame width={880} glow="rgba(250, 204, 21, 0.3)">
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "54px",
          fontWeight: 900,
          color: "#ffffff",
          letterSpacing: "2px",
        }}
      >
        REVENUE <span style={{ color: "#ef4444" }}>≠</span> PROFIT
      </div>
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "20px",
          fontWeight: 700,
          color: "#facc15",
          marginTop: "6px",
        }}
      >
        PURE RENT COLLECTION
      </div>
    </CardFrame>
  );
};

// 13. SHOT 22: GLOBAL REAL-ESTATE EMPIRE
export const GlobalEmpireOverlay: React.FC = () => {
  return (
    <CardFrame width={920} glow="rgba(56, 189, 248, 0.35)">
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "20px",
          fontWeight: 800,
          letterSpacing: "4px",
          color: "#38bdf8",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}
      >
        WORLDWIDE DOMINANCE
      </div>
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "46px",
          fontWeight: 900,
          color: "#ffffff",
        }}
      >
        GLOBAL REAL-ESTATE EMPIRE
      </div>
    </CardFrame>
  );
};

// 14. SHOT 23: THE PRODUCT VS THE ASSET
export const ProductVsAssetOverlay: React.FC = () => {
  return (
    <CardFrame width={920}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#94a3b8" }}>SELLING</div>
          <div style={{ fontSize: "36px", fontWeight: 900, color: "#f87171" }}>THE PRODUCT</div>
        </div>
        <div style={{ fontSize: "28px", fontWeight: 900, color: "#facc15" }}>→</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#94a3b8" }}>OWNING</div>
          <div style={{ fontSize: "36px", fontWeight: 900, color: "#4ade80" }}>THE ASSET</div>
        </div>
      </div>
    </CardFrame>
  );
};

// 15. SHOT 24: THE FINAL LESSON
export const FinalLessonOverlay: React.FC = () => {
  return (
    <CardFrame width={920}>
      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "38px",
          fontWeight: 900,
          color: "#ffffff",
          textAlign: "center",
          lineHeight: "1.25",
        }}
      >
        OWN WHAT MAKES THE BUSINESS POSSIBLE
      </div>
    </CardFrame>
  );
};

// 16. SHOTS 25–26: BEYOND HUNCH BRAND OUTRO
export const BeyondHunchOutroOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sweep = (frame / fps) * 120;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at center, rgba(15, 23, 42, 0.85) 0%, rgba(2, 6, 23, 0.98) 80%)",
        zIndex: 50,
      }}
    >
      {/* Beyond Hunch Premium Brand Logo - Circular Cropped Avatar with Golden Ring */}
      <div
        style={{
          position: "relative",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          border: "4px solid #facc15",
          boxShadow: "0 0 50px rgba(250, 204, 21, 0.5), inset 0 0 20px rgba(250, 204, 21, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "32px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
        }}
      >
        <img
          src={staticFile("ep5/logo.png")}
          alt="Beyond Hunch Logo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            borderRadius: "50%",
          }}
        />
        {/* Golden light sweep effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `-${sweep}%`,
            width: "50%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
            transform: "skewX(-25deg)",
          }}
        />
      </div>

      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "56px",
          fontWeight: 900,
          color: "#ffffff",
          letterSpacing: "4px",
          textTransform: "uppercase",
          textShadow: "0 6px 25px rgba(0,0,0,0.8)",
          marginBottom: "16px",
        }}
      >
        BEYOND HUNCH
      </div>

      <div
        style={{
          fontFamily: "Inter, Montserrat, sans-serif",
          fontSize: "26px",
          fontWeight: 700,
          color: "#facc15",
          letterSpacing: "6px",
          textTransform: "uppercase",
          marginBottom: "40px",
        }}
      >
        NEVER STOP THINKING DEEPER
      </div>

      {/* Subscribe Pill Button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "#dc2626",
          border: "2px solid #ef4444",
          borderRadius: "999px",
          padding: "16px 44px",
          boxShadow: "0 12px 30px rgba(220, 38, 38, 0.5)",
        }}
      >
        <div
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "#ffffff",
          }}
        />
        <span
          style={{
            fontFamily: "Inter, Montserrat, sans-serif",
            fontSize: "22px",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "2px",
          }}
        >
          SUBSCRIBE
        </span>
      </div>
    </div>
  );
};
