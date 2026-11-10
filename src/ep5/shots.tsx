import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import type { CamKeys, Look } from "../engine/Stage";
import { Toon } from "../engine/Toon";
import { Box, Cyl } from "../engine/kit";
import { C } from "./cast";
import {
  hookLook,
  vintageLook,
  modernLook,
  businessLook,
  globalLook,
  GoldenArches3D,
  RoadsidePylonSign,
  ModernMcDonaldsBuilding,
  GoldenHookSet,
  Vintage1954DriveInSet,
  SpeedeeKitchenSet,
  ExecutivePlanningSet,
  CityUndergroundPropertySet,
  GlobalNetworkSet,
  BeyondHunchSet,
} from "./sets";
import {
  TenBillionHookOverlay,
  BurgersVsRealEstateOverlay,
  Vintage1954RayKrocOverlay,
  ExtraordinaryOverlay,
  SystemFormulaOverlay,
  TheProblemOverlay,
  LandMoneyRiskOverlay,
  HarrySonnebornOverlay,
  SplitScreenStrategyOverlay,
  TwoRevenueStreamsOverlay,
  TenPointFourBillionOverlay,
  RevenueNotProfitOverlay,
  GlobalEmpireOverlay,
  ProductVsAssetOverlay,
  FinalLessonOverlay,
  BeyondHunchOutroOverlay,
} from "./overlays";

export type Shot = {
  look: Look;
  cam: CamKeys;
  focus: number;
  Body: React.FC<{ dur: number }>;
  overlay?: React.ReactNode;
  captionPos?: "top" | "bottom";
};

// Look definitions
const hk = hookLook;
const vin = vintageLook;
const mod = modernLook;
const biz = businessLook;
const glo = globalLook;

const useT = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return f / fps;
};

const B = (fn: (t: number, dur: number) => React.ReactNode): React.FC<{ dur: number }> => ({ dur }) => {
  const t = useT();
  return <>{fn(t, dur)}</>;
};

export const SHOTS: Record<number, Shot> = {
  // -------------------------------------------------------------
  // SHOT 01 — THE $10 BILLION HOOK (00:00–05.98)
  // "In 2025, McDonald's made over $10 billion from rent alone."
  // -------------------------------------------------------------
  1: {
    look: hk(),
    cam: { from: [0, 1.7, 5.8], to: [0, 2.0, 4.8], lookFrom: [0, 1.4, 0], fov: 48 },
    focus: 4.5,
    overlay: <TenBillionHookOverlay />,
    captionPos: "top",
    Body: B((t) => (
      <group>
        <Box size={[26, 0.4, 20]} pos={[0, -0.2, 0]} color="#020617" shadow />
        {/* Modern McDonald's Architectural Building Centered */}
        <ModernMcDonaldsBuilding scale={0.65} showPylon={false} pos={[0, 0.2, 0]} />
        {/* Sculpted 3D Golden $10 BILLION Text rising behind */}
        <group position={[0, 4.4, -2.8]}>
          <Box size={[6.8, 1.4, 0.35]} pos={[0, 0, 0]} color="#eab308" shadow />
          <Box size={[6.5, 1.1, 0.38]} pos={[0, 0, 0]} color="#facc15" />
          <pointLight position={[0, 0.5, 1.0]} intensity={4.0} distance={6.0} color="#fef08a" />
        </group>
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SHOT 02 — THE BUSINESS BEHIND THE BURGER (05.98–13.46)
  // "Yes. The company famous for selling burgers has a massive real-estate business hiding behind those golden arches."
  // -------------------------------------------------------------
  2: {
    look: mod(),
    // Eye-level hero angle: Customer in open space, arches clear in background
    cam: { from: [-1.4, 1.7, 4.2], to: [0, 1.6, 3.8], lookFrom: [0, 1.35, 0], fov: 48 },
    focus: 3.5,
    overlay: <BurgersVsRealEstateOverlay />,
    captionPos: "top",
    Body: B((t, dur) => {
      const p = t / dur;
      return (
        <group>
          {/* Ground & Background McDonald's Building */}
          <Box size={[26, 0.4, 18]} pos={[0, -0.2, 0]} color="#0f172a" shadow />
          <group position={[0, 0.1, -4.5]}>
            <ModernMcDonaldsBuilding scale={0.7} showPylon={false} />
          </group>

          {/* Subterranean Property Grid lights up as narration progresses */}
          {p > 0.4 && (
            <group position={[0, 0.05, 0]}>
              <Box size={[8.0, 0.04, 6.0]} pos={[0, 0, 0]} color="#15803d" />
              <Box size={[8.2, 0.02, 0.1]} pos={[0, 0.04, 3.0]} color="#facc15" />
              <Box size={[8.2, 0.02, 0.1]} pos={[0, 0.04, -3.0]} color="#facc15" />
              <Box size={[0.1, 0.02, 6.0]} pos={[4.1, 0.04, 0]} color="#facc15" />
              <Box size={[0.1, 0.02, 6.0]} pos={[-4.1, 0.04, 0]} color="#facc15" />
            </group>
          )}

          {/* Customer standing completely in the open, holding a burger, looking up at Arches */}
          <Toon
            spec={C.customer}
            pos={[0, 0.1, 1.2]}
            h={1.72}
            pose={{
              armL: "down",
              armR: "hold",
              prop: "burger",
              propHand: "R",
              eyes: "dot",
              mouth: "smile",
            }}
          />
        </group>
      );
    }),
  },

  // -------------------------------------------------------------
  // SHOT 03 — 1950s ORIGIN (13.46–15.66)
  // "But this wasn't always the plan."
  // -------------------------------------------------------------
  3: {
    look: vin(),
    cam: { from: [0, 1.8, 7.5], to: [0, 1.7, 6.2], lookFrom: [0, 1.4, -1.0], fov: 48 },
    focus: 5.5,
    captionPos: "bottom",
    Body: B((t) => (
      <group>
        <Vintage1954DriveInSet carX={0} />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SHOT 04 — RAY KROC ARRIVES (15.66–23.64)
  // "Back in 1954, a milkshake machine salesman named Ray Kroc discovered a small burger restaurant run by two brothers."
  // -------------------------------------------------------------
  4: {
    look: vin(),
    // Wide 3-character framing: Ray Kroc on left, brothers on right, clear pavement
    cam: { from: [-0.8, 1.65, 4.8], to: [0.4, 1.6, 4.4], lookFrom: [0.2, 1.35, 0], fov: 48 },
    focus: 4.2,
    overlay: <Vintage1954RayKrocOverlay />,
    captionPos: "top",
    Body: B((t, dur) => {
      const p = t / dur;
      return (
        <group>
          {/* Background: 1954 San Bernardino Drive-in & Parked Car */}
          <group position={[0, 0, -3.8]}>
            <Vintage1954DriveInSet carX={1.5} carDoorOpen={true} />
          </group>

          {/* Ray Kroc standing in clear foreground (Left) */}
          <Toon
            spec={C.ray}
            pos={[-1.2, 0.1, 1.2]}
            h={1.75}
            pose={{
              walk: p < 0.25 ? 1 : 0,
              armL: "hips",
              armR: "down",
              prop: "briefcase",
              propHand: "R",
              eyes: "wide",
              mouth: "smile",
            }}
          />

          {/* The McDonald Brothers standing in clear foreground (Right) */}
          <Toon
            spec={C.brother_blue}
            pos={[0.6, 0.1, 1.2]}
            h={1.68}
            pose={{ armL: "down", armR: "wave", eyes: "dot", mouth: "smile" }}
          />
          <Toon
            spec={C.brother_yellow}
            pos={[1.6, 0.1, 1.2]}
            h={1.68}
            pose={{ armL: "hips", armR: "down", eyes: "dot", mouth: "smile" }}
          />
        </group>
      );
    }),
  },

  // -------------------------------------------------------------
  // SHOT 05 — THE DISCOVERY (23.64–25.28)
  // "He saw something extraordinary."
  // -------------------------------------------------------------
  5: {
    look: vin(),
    // Ray Kroc Hero Medium Close-Up: Eye level, filling frame cleanly
    cam: { from: [0, 1.6, 2.6], to: [0, 1.55, 2.1], lookFrom: [0, 1.45, 0], fov: 44 },
    focus: 2.1,
    overlay: <ExtraordinaryOverlay />,
    captionPos: "top",
    Body: B((t) => (
      <group>
        {/* Soft Warm Kitchen Background */}
        <Box size={[14, 8, 0.3]} pos={[0, 4, -4]} color="#fffbeb" />
        <pointLight position={[0, 2.2, -1.0]} intensity={3.5} distance={5.0} color="#fef08a" />

        {/* Ray Kroc: Astonished, wide eyes, hand pointing up in discovery */}
        <Toon
          spec={C.ray}
          pos={[0, 0.1, 0.2]}
          h={1.75}
          pose={{
            armL: "down",
            armR: "point",
            prop: "briefcase",
            propHand: "L",
            eyes: "wide",
            mouth: "open",
          }}
        />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SHOT 06 — THE EFFICIENT SYSTEM (25.28–30.90)
  // "A restaurant that was fast, efficient, and could be copied across the country."
  // -------------------------------------------------------------
  6: {
    look: mod(),
    // Two McDonald brothers standing in front of the kitchen, demonstrating the system
    cam: { from: [0, 1.6, 4.2], to: [0, 1.55, 3.8], lookFrom: [0, 1.3, 0], fov: 48 },
    focus: 3.5,
    overlay: <SystemFormulaOverlay />,
    captionPos: "top",
    Body: B((t) => (
      <group>
        {/* Checkered Floor & Kitchen Equipment in Background */}
        <Box size={[18, 0.3, 14]} pos={[0, -0.15, 0]} color="#1e293b" shadow />
        {/* Background prep station (placed BEHIND the characters at z = -2.5) */}
        <group position={[0, 0, -2.5]}>
          <Box size={[8.0, 1.0, 1.4]} pos={[0, 0.5, 0]} color="#94a3b8" />
          <Box size={[8.2, 0.1, 1.5]} pos={[0, 1.05, 0]} color="#f1f5f9" />
          <Cyl r={0.25} h={0.06} pos={[-2.0, 1.15, 0]} color="#451a03" />
          <Cyl r={0.25} h={0.06} pos={[-1.4, 1.15, 0]} color="#451a03" />
          <Box size={[0.8, 0.4, 0.8]} pos={[1.6, 1.25, 0]} color="#eab308" />
        </group>

        {/* Dick McDonald (Left) pointing to the system */}
        <Toon
          spec={C.brother_blue}
          pos={[-0.8, 0.1, 0.6]}
          h={1.7}
          pose={{
            armL: "hips",
            armR: "point",
            eyes: "dot",
            mouth: "smile",
          }}
        />

        {/* Mac McDonald (Right) holding up the packaged burger */}
        <Toon
          spec={C.brother_yellow}
          pos={[0.8, 0.1, 0.6]}
          h={1.7}
          pose={{
            armL: "down",
            armR: "hold",
            prop: "burger",
            propHand: "R",
            eyes: "happy",
            mouth: "smile",
          }}
        />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SHOT 07 — THE EMPIRE VISION (30.90–34.00)
  // "He wanted to turn it into a massive empire."
  // -------------------------------------------------------------
  7: {
    look: biz(),
    cam: { from: [-1.0, 1.5, 4.4], to: [0, 1.8, 4.6], lookFrom: [0, 1.4, 0], fov: 50 },
    focus: 4.2,
    captionPos: "bottom",
    Body: B((t, dur) => {
      const p = t / dur;
      return (
        <group>
          <Box size={[22, 0.4, 16]} pos={[0, -0.2, 0]} color="#0f172a" shadow />
          {/* Ray Kroc commanding the vision, holding briefcase */}
          <Toon
            spec={C.ray}
            pos={[-1.0, 0.1, 1.2]}
            h={1.75}
            pose={{
              armL: "point",
              armR: "down",
              prop: "briefcase",
              propHand: "R",
              eyes: "wide",
              mouth: "smile",
            }}
          />
          {/* Mini Branded Restaurants Rising in Background */}
          <group position={[-1.8, p > 0.2 ? 0.1 : -2, -2.5]}>
            <ModernMcDonaldsBuilding scale={0.35} showPylon={false} />
          </group>
          <group position={[0.8, p > 0.4 ? 0.1 : -2, -3.0]}>
            <ModernMcDonaldsBuilding scale={0.4} showPylon={false} />
          </group>
          <group position={[2.6, p > 0.6 ? 0.1 : -2, -2.5]}>
            <ModernMcDonaldsBuilding scale={0.35} showPylon={false} />
          </group>
        </group>
      );
    }),
  },

  // -------------------------------------------------------------
  // SHOT 08 — THE PROBLEM (34.00–35.58)
  // "But there was a problem."
  // -------------------------------------------------------------
  8: {
    look: biz(),
    // Ray Kroc Medium Hero: Facing the camera, concerned, clean space
    cam: { from: [0, 1.6, 2.8], to: [0, 1.55, 2.2], lookFrom: [0, 1.45, 0], fov: 44 },
    focus: 2.2,
    overlay: <TheProblemOverlay />,
    captionPos: "top",
    Body: B((t) => (
      <group>
        <Box size={[16, 0.3, 12]} pos={[0, -0.15, 0]} color="#1e1b4b" shadow />
        {/* Ray Kroc with concerned expression, hands on hips */}
        <Toon
          spec={C.ray}
          pos={[0, 0.1, 0.2]}
          h={1.75}
          pose={{
            armL: "hips",
            armR: "point",
            eyes: "half",
            mouth: "frown",
          }}
        />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SHOT 09 — LAND, MONEY AND RISK (35.58–40.40)
  // "Opening more restaurants meant more land, more money and more risk."
  // -------------------------------------------------------------
  9: {
    look: biz(),
    // Ray Kroc in center, three problems floating clearly beside him
    cam: { from: [0, 1.6, 4.4], to: [0, 1.55, 3.8], lookFrom: [0, 1.3, 0], fov: 48 },
    focus: 3.5,
    overlay: <LandMoneyRiskOverlay />,
    captionPos: "top",
    Body: B((t, dur) => {
      const p = t / dur;
      return (
        <group>
          <Box size={[20, 0.3, 14]} pos={[0, -0.15, 0]} color="#0f172a" shadow />

          {/* 1. Miniature Land Plot (Left) */}
          {p > 0.1 && (
            <group position={[-2.4, 0.8, -0.5]}>
              <Box size={[1.6, 0.15, 1.6]} pos={[0, 0, 0]} color="#15803d" shadow />
              <Box size={[1.7, 0.02, 0.06]} pos={[0, 0.1, 0.8]} color="#facc15" />
            </group>
          )}

          {/* Ray Kroc: Center hero, reacting to the 3 issues */}
          <Toon
            spec={C.ray}
            pos={[0, 0.1, 0.6]}
            h={1.75}
            pose={{
              armL: "cross",
              armR: "point",
              eyes: "dot",
              mouth: "frown",
            }}
          />

          {/* 2. Stack of Cash (Right) */}
          {p > 0.4 && (
            <group position={[2.2, 0.8, -0.5]}>
              <Box size={[1.4, 0.35, 0.9]} pos={[0, 0, 0]} color="#16a34a" shadow />
              <Box size={[0.3, 0.4, 0.92]} pos={[-0.3, 0, 0]} color="#fef08a" />
              <Box size={[0.3, 0.4, 0.92]} pos={[0.3, 0, 0]} color="#fef08a" />
            </group>
          )}

          {/* 3. Red Warning Risk Beacon (Top Center) */}
          {p > 0.7 && (
            <group position={[0, 2.6, -1.0]}>
              <Box size={[0.3, 0.8, 0.15]} pos={[0, 0.1, 0]} color="#dc2626" />
              <Cyl r={0.12} h={0.15} pos={[0, -0.45, 0]} color="#dc2626" />
              <pointLight position={[0, 0, 0.5]} intensity={3.5} distance={3.0} color="#ef4444" />
            </group>
          )}
        </group>
      );
    }),
  },

  // -------------------------------------------------------------
  // SHOT 10 — HARRY SONNEBORN (40.40–44.42)
  // "Then a man named Harry Sonneborn spotted an opportunity."
  // -------------------------------------------------------------
  10: {
    look: biz(),
    // Ray Kroc and Harry Sonneborn side by side in open space
    cam: { from: [0, 1.6, 4.4], to: [0.3, 1.55, 3.8], lookFrom: [0, 1.3, 0], fov: 48 },
    focus: 3.5,
    overlay: <HarrySonnebornOverlay />,
    captionPos: "top",
    Body: B((t) => (
      <group>
        <Box size={[20, 0.3, 14]} pos={[0, -0.15, 0]} color="#1e1b4b" shadow />

        {/* Ray Kroc listening intently */}
        <Toon
          spec={C.ray}
          pos={[-0.9, 0.1, 0.6]}
          h={1.75}
          pose={{
            armL: "hips",
            armR: "down",
            eyes: "wide",
            mouth: "smile",
          }}
        />

        {/* Harry Sonneborn with glasses and brown folder */}
        <Toon
          spec={C.harry}
          pos={[0.9, 0.1, 0.6]}
          h={1.78}
          pose={{
            armL: "point",
            armR: "down",
            prop: "folder",
            propHand: "R",
            eyes: "dot",
            mouth: "smile",
          }}
        />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SHOT 11 — THE BIG QUESTION (44.42–49.62)
  // "Why make money only from burgers when McDonald's could make money from the land too?"
  // -------------------------------------------------------------
  11: {
    look: biz(),
    // Harry Sonneborn in center, gesturing from burger to land
    cam: { from: [0, 1.6, 4.5], to: [0, 1.55, 3.8], lookFrom: [0, 1.3, 0], fov: 48 },
    focus: 3.5,
    overlay: <SplitScreenStrategyOverlay />,
    captionPos: "top",
    Body: B((t) => (
      <group>
        <Box size={[22, 0.3, 16]} pos={[0, -0.15, 0]} color="#0f172a" shadow />

        {/* Left Side: Burger Item */}
        <group position={[-2.2, 0.8, -0.5]}>
          <Cyl r={0.5} h={0.2} pos={[0, 0, 0]} color="#facc15" shadow />
          <Box size={[0.4, 0.2, 0.3]} pos={[0, 0.15, 0]} color="#dc2626" />
        </group>

        {/* Center: Harry Sonneborn gesturing to both sides */}
        <Toon
          spec={C.harry}
          pos={[0, 0.1, 0.6]}
          h={1.78}
          pose={{
            armL: "point",
            armR: "point",
            prop: "folder",
            propHand: "L",
            eyes: "wide",
            mouth: "smile",
          }}
        />

        {/* Right Side: Land Plot with Model */}
        <group position={[2.2, 0.8, -0.5]}>
          <Box size={[1.6, 0.15, 1.6]} pos={[0, 0, 0]} color="#15803d" shadow />
          <Box size={[1.7, 0.02, 0.06]} pos={[0, 0.1, 0.8]} color="#facc15" />
          <ModernMcDonaldsBuilding scale={0.18} showPylon={false} pos={[0, 0.15, 0]} />
        </group>
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SHOT 12 — SELLING FRANCHISES TO BUYERS (49.62–53.82)
  // "McDonald's began securing restaurant properties and leasing them to franchisees."
  // -------------------------------------------------------------
  12: {
    look: biz(),
    // Harry & Ray selling the franchise to a buyer with briefcase and contract
    cam: { from: [0, 1.6, 4.4], to: [0, 1.55, 3.8], lookFrom: [0, 1.3, 0], fov: 48 },
    focus: 3.5,
    captionPos: "bottom",
    Body: B((t, dur) => {
      const p = t / dur;
      return (
        <group>
          <Box size={[20, 0.3, 14]} pos={[0, -0.15, 0]} color="#0f172a" shadow />

          {/* Harry Sonneborn handing over the franchise agreement document */}
          <Toon
            spec={C.harry}
            pos={[-1.1, 0.1, 0.6]}
            h={1.78}
            pose={{
              armL: "point",
              armR: "down",
              prop: "folder",
              propHand: "R",
              eyes: "dot",
              mouth: "smile",
            }}
          />

          {/* Ray Kroc shaking hands and closing the deal */}
          <Toon
            spec={C.ray}
            pos={[-0.2, 0.1, 0.6]}
            h={1.75}
            pose={{
              armL: "down",
              armR: "point",
              eyes: "wide",
              mouth: "smile",
            }}
          />

          {/* Franchise Buyer (Right) holding payment briefcase, excited */}
          <Toon
            spec={C.franchisee}
            pos={[1.1, 0.1, 0.6]}
            h={1.7}
            pose={{
              armL: "hold",
              armR: "point",
              prop: "briefcase",
              propHand: "L",
              eyes: "happy",
              mouth: "smile",
            }}
          />

          {/* Model of New Restaurant on the Land Plot behind them */}
          <group position={[0, 0.1, -2.8]}>
            <ModernMcDonaldsBuilding scale={0.38} showPylon={false} />
          </group>
        </group>
      );
    }),
  },

  // -------------------------------------------------------------
  // SHOT 13 — THINK ABOUT IT (53.82–55.56)
  // "Now think about it."
  // -------------------------------------------------------------
  13: {
    look: mod(),
    // Franchisee Hero Medium Shot: Direct eye contact, thoughtful smile
    cam: { from: [0, 1.6, 2.8], to: [0, 1.55, 2.2], lookFrom: [0, 1.45, 0], fov: 44 },
    focus: 2.2,
    captionPos: "bottom",
    Body: B((t) => (
      <group>
        <Box size={[14, 0.3, 10]} pos={[0, -0.15, 0]} color="#1e293b" shadow />
        <Toon
          spec={C.franchisee}
          pos={[0, 0.1, 0.2]}
          h={1.72}
          pose={{
            armL: "hips",
            armR: "point",
            eyes: "wide",
            mouth: "smile",
          }}
        />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SHOT 14 — PEOPLE VISITING MCDONALD'S & BUYING BURGERS (55.56–57.78)
  // "The franchisee sells the burgers."
  // -------------------------------------------------------------
  14: {
    look: mod(),
    // Bustling restaurant: Line of customers visiting and buying burgers
    cam: { from: [0, 1.6, 4.4], to: [0, 1.55, 3.8], lookFrom: [0, 1.3, 0], fov: 48 },
    focus: 3.5,
    captionPos: "bottom",
    Body: B((t) => (
      <group>
        <Box size={[20, 0.3, 14]} pos={[0, -0.15, 0]} color="#1e293b" shadow />

        {/* Franchisee offering burger */}
        <Toon
          spec={C.franchisee}
          pos={[-1.1, 0.1, 0.6]}
          h={1.72}
          pose={{
            armL: "down",
            armR: "hold",
            prop: "burger",
            propHand: "R",
            eyes: "dot",
            mouth: "smile",
          }}
        />

        {/* Customer 1 (Center) buying and paying with coin */}
        <Toon
          spec={C.customer}
          pos={[0.1, 0.1, 0.6]}
          h={1.68}
          pose={{
            armL: "hold",
            armR: "down",
            prop: "coin",
            propHand: "L",
            eyes: "happy",
            mouth: "smile",
          }}
        />

        {/* Customer 2 (Right) waiting in line with a smile */}
        <Toon
          spec={C.brother_yellow}
          pos={[1.2, 0.1, 0.6]}
          h={1.68}
          pose={{
            armL: "hips",
            armR: "wave",
            eyes: "dot",
            mouth: "smile",
          }}
        />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SHOT 15 — COLLECTING RENT FROM THE FRANCHISEES (57.78–60.84)
  // "McDonald's collects rent and royalties."
  // -------------------------------------------------------------
  15: {
    look: biz(),
    // Franchisee brings rent money stack to Ray Kroc & Harry at HQ
    cam: { from: [0, 1.6, 4.4], to: [0, 1.55, 3.8], lookFrom: [0, 1.3, 0], fov: 48 },
    focus: 3.5,
    captionPos: "top",
    Body: B((t, dur) => {
      const p = t / dur;
      return (
        <group>
          <Box size={[20, 0.3, 14]} pos={[0, -0.15, 0]} color="#020617" shadow />

          {/* Franchisee (Left) handing over rent cash stack */}
          <Toon
            spec={C.franchisee}
            pos={[-1.0, 0.1, 0.6]}
            h={1.7}
            pose={{
              armL: "down",
              armR: "hold",
              prop: "wallet",
              propHand: "R",
              eyes: "dot",
              mouth: "smile",
            }}
          />

          {/* Ray Kroc (Center) collecting the rent with open arms & big smile */}
          <Toon
            spec={C.ray}
            pos={[0.1, 0.1, 0.6]}
            h={1.75}
            pose={{
              armL: "hold",
              armR: "point",
              prop: "briefcase",
              propHand: "L",
              eyes: "wide",
              mouth: "smile",
            }}
          />

          {/* Harry Sonneborn (Right) holding the corporate ledger folder */}
          <Toon
            spec={C.harry}
            pos={[1.2, 0.1, 0.6]}
            h={1.78}
            pose={{
              armL: "down",
              armR: "point",
              prop: "folder",
              propHand: "L",
              eyes: "dot",
              mouth: "smile",
            }}
          />

          {/* Floating Rent stacks */}
          <group position={[0.1, 1.8, 0]}>
            <Box size={[1.0, 0.3, 0.6]} pos={[0, 0, 0]} color="#16a34a" shadow />
            <Box size={[0.2, 0.32, 0.62]} pos={[0, 0, 0]} color="#fef08a" />
          </group>
        </group>
      );
    }),
  },

  // -------------------------------------------------------------
  // SHOT 16 — TWO REVENUE STREAMS (60.84–63.18)
  // "One restaurant. Two revenue streams."
  // -------------------------------------------------------------
  16: {
    look: biz(),
    cam: { from: [0, 1.8, 5.0], to: [0, 1.8, 4.2], lookFrom: [0, 1.1, 0], fov: 48 },
    focus: 3.8,
    overlay: <TwoRevenueStreamsOverlay />,
    captionPos: "top",
    Body: B((t) => (
      <group>
        <Box size={[20, 0.3, 14]} pos={[0, -0.15, 0]} color="#0f172a" shadow />
        <ModernMcDonaldsBuilding scale={0.52} showPylon={false} pos={[0, 0.2, 0]} />
        {/* Outward Flow Beams */}
        <Box size={[1.8, 0.1, 0.2]} pos={[-2.2, 0.8, 1.2]} rot={[0, -0.4, 0]} color="#4ade80" />
        <Box size={[1.8, 0.1, 0.2]} pos={[2.2, 0.8, 1.2]} rot={[0, 0.4, 0]} color="#facc15" />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SHOT 17 — THE SUSPENSE (63.18–65.22)
  // "And here's the crazy part."
  // -------------------------------------------------------------
  17: {
    look: hk(),
    // Ray Kroc Hero Medium Close-Up: Sly, knowing smile, whispering secret
    cam: { from: [0, 1.6, 2.6], to: [0, 1.55, 2.0], lookFrom: [0, 1.45, 0], fov: 44 },
    focus: 2.0,
    captionPos: "bottom",
    Body: B((t) => (
      <group>
        <Box size={[14, 0.3, 10]} pos={[0, -0.15, 0]} color="#020617" shadow />
        <Toon
          spec={C.ray}
          pos={[0, 0.1, 0.2]}
          h={1.75}
          pose={{
            armL: "hips",
            armR: "point",
            eyes: "wide",
            mouth: "smile",
          }}
        />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SHOT 18 — THE $10.4 BILLION REVEAL (65.22–71.30)
  // "In 2025, McDonald's reported $10.4 billion in rental revenue from franchised restaurants alone."
  // -------------------------------------------------------------
  18: {
    look: glo(),
    cam: { from: [0, 2.0, 5.5], to: [0, 2.6, 7.2], lookFrom: [0, 1.8, -1.0], fov: 52 },
    focus: 5.0,
    overlay: <TenPointFourBillionOverlay />,
    captionPos: "top",
    Body: B((t) => (
      <group>
        <GlobalNetworkSet />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SHOT 19 — REVENUE IS NOT PROFIT (71.30–73.46)
  // "That's rent. Not profit."
  // -------------------------------------------------------------
  19: {
    look: hk(),
    cam: { from: [0, 1.8, 4.4], to: [0, 1.75, 4.0], lookFrom: [0, 1.2, 0], fov: 46 },
    focus: 3.5,
    overlay: <RevenueNotProfitOverlay />,
    captionPos: "top",
    Body: B((t) => (
      <group>
        <Box size={[20, 0.3, 14]} pos={[0, -0.15, 0]} color="#020617" shadow />
        {/* Comparison pedestals */}
        <group position={[-1.8, 0.6, 0]}>
          <Box size={[2.2, 1.2, 1.6]} pos={[0, 0, 0]} color="#15803d" shadow />
          <Cyl r={0.4} h={0.12} pos={[0, 0.7, 0]} color="#facc15" />
        </group>
        <group position={[1.8, 0.6, 0]}>
          <Box size={[2.2, 1.2, 1.6]} pos={[0, 0, 0]} color="#dc2626" shadow />
          <Cyl r={0.4} h={0.12} pos={[0, 0.7, 0]} color="#f87171" />
        </group>
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SHOT 20 — WALKING INTO MCDONALD'S (73.46–77.34)
  // "So the next time you walk into McDonald's, remember..."
  // -------------------------------------------------------------
  20: {
    look: mod(),
    // Fixed 1:16 bug: Customer walking cleanly in open space, ZERO black blocks or pillars blocking his face!
    cam: { from: [-1.2, 1.7, 4.8], to: [-0.6, 1.65, 4.0], lookFrom: [0.2, 1.4, 0.8], fov: 48 },
    focus: 3.8,
    captionPos: "bottom",
    Body: B((t, dur) => {
      const p = t / dur;
      return (
        <group>
          {/* Street ground */}
          <Box size={[22, 0.3, 16]} pos={[0, -0.15, 0]} color="#0f172a" shadow />
          {/* Modern Restaurant Building in Clear Background (Pushed back to z = -4.5 so no geometry touches character) */}
          <group position={[0, 0.1, -4.5]}>
            <ModernMcDonaldsBuilding scale={0.75} showPylon={false} />
          </group>

          {/* Customer walking cleanly along open foreground sidewalk, 100% visible face & body */}
          <Toon
            spec={C.customer}
            pos={[0.4, 0.1, 2.5 - p * 1.5]}
            h={1.72}
            pose={{
              walk: 1,
              armL: "down",
              armR: p > 0.5 ? "wave" : "down",
              eyes: "dot",
              mouth: "smile",
            }}
          />
        </group>
      );
    }),
  },

  // -------------------------------------------------------------
  // SHOT 21 — THE BURGER (77.34–80.12)
  // "You might think you're buying a burger."
  // -------------------------------------------------------------
  21: {
    look: mod(),
    // Customer Hero Shot: Joyfully holding up the burger, perfectly framed
    cam: { from: [0, 1.6, 2.6], to: [0, 1.55, 2.0], lookFrom: [0, 1.45, 0], fov: 44 },
    focus: 2.0,
    captionPos: "bottom",
    Body: B((t) => (
      <group>
        <Box size={[14, 0.3, 10]} pos={[0, -0.15, 0]} color="#1e293b" shadow />
        <Toon
          spec={C.customer}
          pos={[0, 0.1, 0.2]}
          h={1.72}
          pose={{
            armL: "hold",
            armR: "hold",
            prop: "burger",
            propHand: "R",
            eyes: "happy",
            mouth: "smile",
          }}
        />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SHOT 22 — GLOBAL PROPERTY AND FRANCHISE NETWORK (80.12–85.18)
  // "But behind those golden arches is a global real-estate and franchise empire."
  // -------------------------------------------------------------
  22: {
    look: glo(),
    // Fixed 1:21 bug: Eye-level camera, Ray Kroc and Harry Sonneborn 100% visible from head to toe, ZERO cropping!
    cam: { from: [0, 1.65, 4.4], to: [0, 1.6, 3.8], lookFrom: [0, 1.35, 0], fov: 48 },
    focus: 3.8,
    overlay: <GlobalEmpireOverlay />,
    captionPos: "top",
    Body: B((t) => (
      <group>
        {/* Background Rotating Earth Globe & Network Pins */}
        <group position={[0, 0, -3.2]}>
          <GlobalNetworkSet />
        </group>

        {/* Ray Kroc (Left) in clear foreground */}
        <Toon
          spec={C.ray}
          pos={[-0.85, 0.1, 0.8]}
          h={1.75}
          pose={{
            armL: "point",
            armR: "down",
            prop: "briefcase",
            propHand: "R",
            eyes: "wide",
            mouth: "smile",
          }}
        />

        {/* Harry Sonneborn (Right) in clear foreground */}
        <Toon
          spec={C.harry}
          pos={[0.85, 0.1, 0.8]}
          h={1.78}
          pose={{
            armL: "down",
            armR: "point",
            prop: "folder",
            propHand: "L",
            eyes: "dot",
            mouth: "smile",
          }}
        />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SHOT 23 — THE PRODUCT VS THE ASSET (85.18–89.54)
  // "Because sometimes, the biggest fortune isn't made by selling the product..."
  // -------------------------------------------------------------
  23: {
    look: biz(),
    // Customer with burger (Left) vs Ray Kroc with real estate asset (Right)
    cam: { from: [0, 1.6, 4.4], to: [0, 1.55, 3.8], lookFrom: [0, 1.3, 0], fov: 48 },
    focus: 3.5,
    overlay: <ProductVsAssetOverlay />,
    captionPos: "top",
    Body: B((t) => (
      <group>
        <Box size={[20, 0.3, 14]} pos={[0, -0.15, 0]} color="#0f172a" shadow />

        {/* Customer with burger */}
        <Toon
          spec={C.customer}
          pos={[-1.0, 0.1, 0.6]}
          h={1.7}
          pose={{
            armL: "down",
            armR: "hold",
            prop: "burger",
            propHand: "R",
            eyes: "dot",
            mouth: "smile",
          }}
        />

        {/* Ray Kroc with briefcase */}
        <Toon
          spec={C.ray}
          pos={[1.0, 0.1, 0.6]}
          h={1.75}
          pose={{
            armL: "point",
            armR: "down",
            prop: "briefcase",
            propHand: "R",
            eyes: "wide",
            mouth: "smile",
          }}
        />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SHOT 24 — THE BUSINESS FOUNDATION (89.54–93.42)
  // "It's made by owning what makes the business possible."
  // -------------------------------------------------------------
  24: {
    look: biz(),
    // Ray, Harry, Franchisee standing together on the business foundation
    cam: { from: [0, 1.6, 4.6], to: [0, 1.55, 4.0], lookFrom: [0, 1.3, 0], fov: 48 },
    focus: 3.8,
    overlay: <FinalLessonOverlay />,
    captionPos: "top",
    Body: B((t) => (
      <group>
        <Box size={[20, 0.3, 14]} pos={[0, -0.15, 0]} color="#0f172a" shadow />

        {/* Ray Kroc */}
        <Toon
          spec={C.ray}
          pos={[-1.2, 0.1, 0.6]}
          h={1.75}
          pose={{ armL: "point", armR: "down", eyes: "wide", mouth: "smile" }}
        />

        {/* Harry Sonneborn */}
        <Toon
          spec={C.harry}
          pos={[0, 0.1, 0.6]}
          h={1.78}
          pose={{ armL: "hips", armR: "point", eyes: "dot", mouth: "smile" }}
        />

        {/* Franchise Owner */}
        <Toon
          spec={C.franchisee}
          pos={[1.2, 0.1, 0.6]}
          h={1.7}
          pose={{ armL: "down", armR: "point", eyes: "happy", mouth: "smile" }}
        />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SHOTS 25 & 26 — BEYOND HUNCH BRAND OUTRO (93.42–97.96)
  // "This is Beyond Hunch. Never stop thinking deeper."
  // -------------------------------------------------------------
  25: {
    look: glo(),
    cam: { from: [0, 1.8, 4.2], to: [0, 1.8, 3.8], lookFrom: [0, 1.5, 0], fov: 46 },
    focus: 3.5,
    overlay: <BeyondHunchOutroOverlay />,
    Body: B(() => <BeyondHunchSet />),
  },

  26: {
    look: glo(),
    cam: { from: [0, 1.8, 3.8], to: [0, 1.8, 3.6], lookFrom: [0, 1.5, 0], fov: 46 },
    focus: 3.5,
    overlay: <BeyondHunchOutroOverlay />,
    Body: B(() => <BeyondHunchSet />),
  },
};
