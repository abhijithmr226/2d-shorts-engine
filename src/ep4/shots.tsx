import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import type { CamKeys, Look } from "../engine/Stage";
import { Toon } from "../engine/Toon";
import { C } from "./cast";
import {
  studioLook,
  bedroomLook,
  breakfastLook,
  bathroomLook,
  nightLook,
  cityLook,
  synapseLook,
  scoreLook,
  ModernStudioSet,
  BedroomSet,
  LivingRoomCouchSet,
  BreakfastSet,
  BathroomSet,
  BedTimelapseSet,
  CityStreetSet,
  SynapseLabSet,
  ScoreStudioSet,
} from "./sets";
import {
  HookBuzzOverlay,
  QuizIntroOverlay,
  SignOneOverlay,
  PointOneClaimedOverlay,
  SignTwoOverlay,
  PointTwoClaimedOverlay,
  SignThreeIntroOverlay,
  SignThreeStatsOverlay,
  SignFourOverlay,
  PointFourClaimedOverlay,
  InstagramReelsOverlay,
  MobileGamingOverlay,
  BrainExcitedOverlay,
  DopamineLoopOverlay,
  TimelapseClockOverlay,
  ScoreZeroOneOverlay,
  ScoreTwoThreeOverlay,
  ScoreFourOverlay,
  MedicalDisclaimerOverlay,
  DSM5ClarificationOverlay,
  SubscribeFollowOverlay,
  CommentScreenTimeOverlay,
  EndingBuzzOverlay,
  EmptyNotificationInsert,
  TopDownScreenTimeClockInsert,
  ComparisonDiagramInsert,
  PointThreeClaimedOverlay,
} from "./overlays";

export type Shot = {
  look: Look;
  cam: CamKeys;
  focus: number;
  Body: React.FC<{ dur: number }>;
  overlay?: React.ReactNode;
  captionPos?: "top" | "bottom";
};

const Shot7TimedInsertOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t >= 1.6 && t < 3.8) {
    return <EmptyNotificationInsert />;
  }
  return null;
};

const useT = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return f / fps;
};

const stud = studioLook();
const bed = bedroomLook();
const bkfst = breakfastLook();
const bthrm = bathroomLook();
const nite = nightLook();
const city = cityLook();
const syn = synapseLook();
const scr = scoreLook();

const B = (fn: (t: number, dur: number) => React.ReactNode): React.FC<{ dur: number }> => ({ dur }) => {
  const t = useT();
  return <>{fn(t, dur)}</>;
};

// =========================================================================
// EPISODE 4 — MASTER TIMESTAMP-BY-TIMESTAMP DIRECTOR'S EDIT
// Runtime: 00:00–02:13 · 9:16 Vertical
// Wide -> Medium -> Close-Up -> Insert -> OTS -> Reaction choreography
// =========================================================================
export const SHOTS: Record<number, Shot> = {
  // -------------------------------------------------------------
  // SCENE 1 — OPENING (00:00–00:14)
  // -------------------------------------------------------------

  // 1: Quick! Did your phone just buzz? (00:00–00:03)
  // Wide establishing shot of environment, full body visible with headroom.
  1: {
    look: stud,
    cam: { from: [0, 1.6, 4.6], to: [0, 1.55, 4.6], lookFrom: [0, 1.1, 0], fov: 52 },
    focus: 4.2,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "open", talk: true, eyes: "wide", armR: "hold", prop: "phone", propHand: "R", shiver: true }} />
      </group>
    )),
  },

  // 2: Check it! Go! (00:03–00:04)
  // Medium shot, eye-level camera (35mm equivalent). Full upper body visible.
  2: {
    look: stud,
    cam: { from: [0, 1.6, 3.6], to: [0, 1.55, 3.6], lookFrom: [0, 1.3, 0], fov: 50 },
    focus: 3.4,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "smile", talk: true, armR: "point", armL: "hold", prop: "phone", propHand: "L" }} />
      </group>
    )),
  },

  // 3: ...Yeah. You checked. (00:04–00:06)
  // Close-up reaction with smirk, wink, eye movement (50mm equivalent).
  3: {
    look: stud,
    cam: { from: [0, 1.6, 2.8], to: [0, 1.55, 2.8], lookFrom: [0, 1.45, 0], fov: 46 },
    focus: 2.6,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "smirk", talk: true, eyes: "wink", armL: "hips", armR: "hold", prop: "phone", propHand: "R" }} />
      </group>
    )),
  },

  // 4: Okay, let's see how addicted to your phone you might be. (00:06–00:10)
  // Slow push-in to close-up as character reacts thoughtfully.
  4: {
    look: stud,
    cam: { from: [-0.3, 1.6, 3.4], to: [0, 1.55, 3.4], lookFrom: [0, 1.35, 0], fov: 48 },
    focus: 3,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "open", talk: true, eyes: "dot", armL: "cross", armR: "point" }} />
      </group>
    )),
  },

  // 5: I'm giving you four signs. Keep count. (00:10–00:14)
  // Over-the-shoulder (OTS) shot looking past shoulder at phone displaying rules!
  5: {
    look: stud,
    cam: { from: [0, 1.45, 3.2], to: [0, 1.42, 3.2], lookFrom: [0, 1.25, 0], fov: 48 },
    focus: 2.2,
    captionPos: "top",
    overlay: <QuizIntroOverlay />,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "open", talk: true, armL: "hold", armR: "point", prop: "phone", propHand: "L" }} />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SCENE 2 — FIRST INFORMATION SEQUENCE (00:14–00:22)
  // -------------------------------------------------------------

  // 6: Sign one. The ghost buzz. (00:14–00:16)
  // Medium-wide shot revealing new city sidewalk environment with horizontal pan.
  6: {
    look: city,
    cam: { from: [-1.2, 1.6, 4.8], to: [0.2, 1.55, 4.8], lookFrom: [0, 1.2, 0], fov: 52 },
    focus: 4.4,
    captionPos: "top",
    overlay: <SignOneOverlay />,
    Body: B((t) => (
      <group>
        <CityStreetSet />
        <Toon spec={C.commuter} pos={[0, 0, 0]} pose={{ t, mouth: "flat", eyes: "wide", armR: "hold", shiver: true }} />
      </group>
    )),
  },

  // 7: Ever felt your phone vibrate in your pocket, grabbed it, and found absolutely nothing? (00:16–00:22)
  // Choreography: 00:16–00:18 Close-up -> 00:18–00:20 Phone screen insert -> 00:20–00:22 Low-angle reaction!
  7: {
    look: city,
    cam: { from: [0, 1.6, 3.4], to: [0, 1.55, 3.4], lookFrom: [0, 1.35, 0], fov: 48 },
    focus: 3,
    captionPos: "top",
    overlay: <Shot7TimedInsertOverlay />,
    Body: B((t) => (
      <group>
        <CityStreetSet />
        <Toon
          spec={C.commuter}
          pos={[0, 0, 0]}
          pose={{
            t,
            mouth: t < 1.8 ? "o" : "open",
            talk: true,
            eyes: "wide",
            armL: "hold",
            armR: "hold",
            prop: "phone",
            propHand: "R",
          }}
        />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SCENE 3 — BLUE-BACKGROUND EXPLANATION (00:22–00:30)
  // -------------------------------------------------------------

  // 8: That's called phantom vibration. (00:22–00:24)
  // Character entering the scene. Wide, eye-level.
  8: {
    look: syn,
    cam: { from: [1.2, 1.6, 4.6], to: [0, 1.55, 4.6], lookFrom: [0, 1.2, 0], fov: 52 },
    focus: 4.2,
    Body: B((t) => (
      <group>
        <SynapseLabSet />
        <Toon spec={C.scientist} pos={[0, 0, 0]} pose={{ t, mouth: "open", talk: true, armR: "point", armL: "hips" }} />
      </group>
    )),
  },

  // 9: Studies suggest it happens to a surprisingly large number of people. (00:24–00:28)
  // Medium, three-quarter angle with slight camera dolly-in & meaningful gesture.
  9: {
    look: syn,
    cam: { from: [0.4, 1.6, 3.5], to: [0.1, 1.55, 3.5], lookFrom: [0, 1.35, 0], fov: 48 },
    focus: 3.2,
    Body: B((t) => (
      <group>
        <SynapseLabSet />
        <Toon spec={C.scientist} pos={[0, 0, 0]} pose={{ t, mouth: "open", talk: true, armR: "hold", armL: "point" }} />
      </group>
    )),
  },

  // 10: If that's happened to you, give yourself one point. (00:28–00:30)
  // Over-the-shoulder shot showing visual concept badge (+1 POINT CLAIMED [1/4]).
  10: {
    look: stud,
    cam: { from: [0, 1.45, 3.2], to: [0, 1.42, 3.2], lookFrom: [0, 1.25, 0], fov: 48 },
    focus: 2.2,
    captionPos: "top",
    overlay: <PointOneClaimedOverlay />,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "smile", talk: true, armR: "point", armL: "hips" }} />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SCENE 4 — YELLOW & PURPLE INFORMATION SECTION (00:30–00:40)
  // -------------------------------------------------------------

  // 11: Sign two. The first thing you touch. (00:30–00:33)
  // Wide shot, establish the character in morning room. Slow left-to-right slider.
  11: {
    look: bed,
    cam: { from: [-1.2, 1.6, 4.8], to: [0.2, 1.55, 4.8], lookFrom: [0, 1.2, -2.5], fov: 52 },
    focus: 4.4,
    captionPos: "top",
    overlay: <SignTwoOverlay />,
    Body: B((t) => (
      <group>
        <BedroomSet />
        <Toon spec={C.sleeper} pos={[0, 0.95, -2.5]} pose={{ t, sit: true, mouth: "flat", eyes: "half", armR: "hold", armL: "down" }} />
      </group>
    )),
  },

  // 12: Do you check your phone within ten minutes of waking up? (00:33–00:35)
  // Medium close-up, three-quarter right angle (50mm close-up).
  12: {
    look: bed,
    cam: { from: [0.6, 1.6, 3.4], to: [0.3, 1.55, 3.4], lookFrom: [0.4, 1.35, -2.5], fov: 48 },
    focus: 3,
    captionPos: "top",
    Body: B((t) => (
      <group>
        <BedroomSet />
        <Toon spec={C.sleeper} pos={[0, 0.95, -2.5]} pose={{ t, sit: true, mouth: "open", talk: true, eyes: "half", armR: "point", armL: "hold", prop: "phone", propHand: "L" }} />
      </group>
    )),
  },

  // 13: Before breakfast. Before brushing your teeth. Sometimes before even getting out of bed? (00:35–00:40)
  // Insert shot: breakfast table (00:35–00:37) -> bathroom mirror (00:37–00:40).
  13: {
    look: bkfst,
    cam: { from: [0.6, 1.6, 3.6], to: [0.2, 1.55, 3.6], lookFrom: [0, 1.3, -1], fov: 50 },
    focus: 3.2,
    Body: B((t) => {
      if (t > 2.4) {
        return (
          <group>
            <BathroomSet />
            <Toon spec={C.sleeper} pos={[0, 0, -2.0]} pose={{ t, mouth: "open", talk: true, eyes: "wide", armR: "hold", armL: "hold", prop: "toothbrush", propHand: "L" }} />
          </group>
        );
      }
      return (
        <group>
          <BreakfastSet />
          <Toon spec={C.sleeper} pos={[0, 0.75, -1.0]} pose={{ t, sit: true, mouth: "flat", talk: true, eyes: "half", armR: "hold", armL: "hold", prop: "phone", propHand: "R" }} />
        </group>
      );
    }),
  },

  // 14: If yes, add a point. (00:40–00:44)
  // Return to medium shot, character gestures toward information (+1 POINT CLAIMED [2/4]).
  14: {
    look: bthrm,
    cam: { from: [0, 1.45, 3.4], to: [0, 1.42, 3.4], lookFrom: [0, 1.25, -2], fov: 48 },
    focus: 3.2,
    captionPos: "top",
    overlay: <PointTwoClaimedOverlay />,
    Body: B((t) => (
      <group>
        <BathroomSet />
        <Toon spec={C.sleeper} pos={[0, 0, -2.0]} pose={{ t, mouth: "open", talk: true, eyes: "wide", armR: "hold", armL: "point", prop: "toothbrush", propHand: "L" }} />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SCENE 5 — TRANSITION & INTERFACE DEMONSTRATION (00:44–01:02)
  // -------------------------------------------------------------

  // 15: Sign three. The number. (00:44–00:47)
  // Quick scene reveal with a lateral camera pan into studio.
  15: {
    look: stud,
    cam: { from: [-1.8, 1.6, 4.5], to: [0, 1.55, 4.5], lookFrom: [0, 1.2, 0], fov: 52 },
    focus: 4.2,
    captionPos: "top",
    overlay: <SignThreeIntroOverlay />,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "open", talk: true, armR: "up", armL: "hips" }} />
      </group>
    )),
  },

  // 16: One 2026 Reviews.org survey reports that Americans check their phones around 186 times a day. (00:47–00:54)
  // Full-screen insert shot of interface: animated numbers appearing sequentially (186x).
  16: {
    look: stud,
    cam: { from: [0, 1.6, 4.5], to: [0, 1.55, 4.5], lookFrom: [0, 1.2, 0], fov: 52 },
    focus: 4.2,
    captionPos: "top",
    overlay: <SignThreeStatsOverlay />,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "open", talk: true, armR: "point", armL: "hold", prop: "phone", propHand: "L" }} />
      </group>
    )),
  },

  // 17: That's a lot. (00:54–00:55)
  // Three-quarter character shot reacting to the numbers. Eye-level close-up shock!
  17: {
    look: stud,
    cam: { from: [0.25, 1.6, 2.9], to: [0, 1.55, 2.9], lookFrom: [0, 1.45, 0], fov: 46 },
    focus: 2.6,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "o", talk: true, eyes: "wide", armL: "hips", armR: "hips" }} />
      </group>
    )),
  },

  // 18: Do you find yourself checking your phone every few minutes? (00:55–00:58)
  // Side-by-side composition: Character on LEFT, 70% scaled Realistic Instagram Reels Phone on RIGHT.
  // 100% unobstructed view of character's face, eyes, and mouth with zero forward zoom.
  18: {
    look: city,
    cam: { from: [0, 1.55, 3.8], to: [0, 1.55, 3.8], lookFrom: [0, 1.25, 0], fov: 50 },
    focus: 3.4,
    overlay: <InstagramReelsOverlay />,
    Body: B((t) => (
      <group>
        <CityStreetSet />
        <Toon
          spec={C.scroller}
          pos={[-0.85, 0, 0]}
          pose={{
            t,
            mouth: "flat",
            talk: true,
            eyes: "half",
            armR: "hold",
            armL: "down",
            prop: "phone",
            propHand: "R",
          }}
        />
      </group>
    )),
  },

  // 19: Add another point. (00:58–01:02)
  // Clean reaction shot + Point Three Claimed badge (captions on top to avoid card)
  19: {
    look: stud,
    cam: { from: [0, 1.55, 3.6], to: [0, 1.55, 3.6], lookFrom: [0, 1.25, 0], fov: 50 },
    focus: 3.4,
    captionPos: "top",
    overlay: <PointThreeClaimedOverlay />,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "smile", talk: true, armR: "point", armL: "hips" }} />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SCENE 6 — DARK DESK / ENVIRONMENT SHOT (01:02–01:10)
  // -------------------------------------------------------------

  // 20: Sign four. The one most people get wrong. (01:02–01:04)
  // 1. Wide establishing shot of the desk and room.
  20: {
    look: stud,
    cam: { from: [0, 1.6, 5], to: [0, 1.55, 5], lookFrom: [0, 1.15, 0], fov: 54 },
    focus: 4.6,
    captionPos: "top",
    overlay: <SignFourOverlay />,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "open", talk: true, armL: "cross", armR: "point" }} />
      </group>
    )),
  },

  // 21: How many hours do you spend on your phone every day? (01:04–01:08)
  // Director's Specification: Locked-off wide 3/4 establishing shot from front-left corner (~1.4m height).
  // Shows entire bed, seated character continuously scrolling, bedside table, and large window.
  // Stationary camera, zero zoom, zero panning, pure cinematic day-to-night transformation!
  21: {
    look: nite,
    cam: { from: [-1.8, 1.4, 3.8], to: [-1.8, 1.4, 3.8], lookFrom: [1.4, 1.2, -2.6], fov: 64 },
    focus: 3.8,
    captionPos: "top",
    Body: B((t) => (
      <group>
        <BedTimelapseSet />
        <Toon
          spec={C.sleeper}
          pos={[2.6, 0.75, -3.4]}
          pose={{
            t,
            sit: true,
            mouth: "flat",
            talk: true,
            eyes: "half",
            armR: "hold",
            armL: "hold",
            prop: "phone",
            propHand: "R",
          }}
        />
      </group>
    )),
  },

  // 22: Three? Four? Five? (01:06–01:08)
  // 3. Top-down insert of the object/timer on the desk (3h... 4h... 5h?).
  22: {
    look: nite,
    cam: { from: [0, 3.2, 1.5], to: [0, 2.8, 1.5], lookFrom: [0, 1, -0.5], fov: 52 },
    focus: 3,
    captionPos: "top",
    overlay: <TopDownScreenTimeClockInsert />,
    Body: B((t) => (
      <group>
        <BedTimelapseSet />
      </group>
    )),
  },

  // 23: Don't guess. (01:08–01:10)
  // 4. Eye-level close-up of character reacting with firm stop hand gesture.
  23: {
    look: stud,
    cam: { from: [0, 1.6, 2.8], to: [0, 1.55, 2.8], lookFrom: [0, 1.45, 0], fov: 46 },
    focus: 2.6,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "flat", talk: true, armR: "point", armL: "hips" }} />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SCENE 7 — RETURN TO DARK ENVIRONMENT & 2X REALITY (01:10–01:22)
  // -------------------------------------------------------------

  // 24: Your phone might tell a very different story. (01:10–01:13)
  // Medium-wide shot, character on the right third of frame.
  24: {
    look: stud,
    cam: { from: [0.2, 1.6, 4.5], to: [0.4, 1.55, 4.5], lookFrom: [0.35, 1.2, 0], fov: 52 },
    focus: 4.2,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0.45, 0, 0]} pose={{ t, mouth: "open", talk: true, armR: "hold", armL: "point", prop: "phone", propHand: "R" }} />
      </group>
    )),
  },

  // 25: Research suggests young adults use their phones about twice as much as they think. (01:13–01:19)
  // 01:13–01:16 Close-up push-in -> 01:16–01:19 Insert shot with animated 2x diagram!
  25: {
    look: stud,
    cam: { from: [0.2, 1.6, 3.4], to: [0.1, 1.55, 3.4], lookFrom: [0, 1.35, 0], fov: 48 },
    focus: 3,
    captionPos: "top",
    overlay: <ComparisonDiagramInsert />,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "open", talk: true, armR: "point", armL: "hips" }} />
      </group>
    )),
  },

  // 26: If your Screen Time surprises you, add a point. (01:19–01:22)
  // Reverse angle: character looking toward diagram (+1 POINT CLAIMED [4/4]).
  26: {
    look: stud,
    cam: { from: [-0.35, 1.6, 3.8], to: [-0.15, 1.55, 3.8], lookFrom: [0, 1.3, 0], fov: 50 },
    focus: 3.4,
    captionPos: "top",
    overlay: <PointFourClaimedOverlay />,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "smile", talk: true, armR: "point", armL: "hips" }} />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SCENE 8 — BLUE INTERFACE & NOTIFICATION SECTION (01:22–01:32)
  // -------------------------------------------------------------

  // 27: And here's why this happens. (01:22–01:24)
  // Medium shot of character in Synapse Lab noticing notification.
  27: {
    look: syn,
    cam: { from: [0, 1.6, 4.4], to: [0, 1.55, 4.4], lookFrom: [0, 1.25, 0], fov: 50 },
    focus: 4,
    Body: B((t) => (
      <group>
        <SynapseLabSet />
        <Toon spec={C.scientist} pos={[0, 0, 0]} pose={{ t, mouth: "open", talk: true, armR: "point", armL: "hips" }} />
      </group>
    )),
  },

  // 28: Your brain learns that every notification might bring something exciting. (01:24–01:27)
  // Extreme close-up of notification appearing & dopamine surge.
  28: {
    look: syn,
    cam: { from: [0, 1.6, 2.8], to: [0, 1.55, 2.8], lookFrom: [0, 1.45, 0], fov: 46 },
    focus: 2.6,
    captionPos: "top",
    overlay: <BrainExcitedOverlay />,
    Body: B((t) => (
      <group>
        <SynapseLabSet />
        <Toon spec={C.scientist} pos={[0, 0, 0]} pose={{ t, mouth: "open", talk: true, armR: "up", armL: "point" }} />
      </group>
    )),
  },

  // 29: A message. A like. Something funny. (01:27–01:29)
  // Over-the-shoulder shot showing full interface (chat, heart, laugh).
  29: {
    look: syn,
    cam: { from: [0.65, 1.8, -0.6], to: [0.55, 1.75, -0.6], lookFrom: [-0.15, 1.3, 0.8], fov: 50 },
    focus: 2.2,
    captionPos: "top",
    overlay: <DopamineLoopOverlay />,
    Body: B((t) => (
      <group>
        <SynapseLabSet />
        <Toon spec={C.scientist} pos={[0, 0, 0]} pose={{ t, mouth: "smile", talk: true, armR: "hold", armL: "point", prop: "phone", propHand: "R" }} />
      </group>
    )),
  },

  // 30: So you start looking for that next little reward. (01:29–01:31)
  // Character reaction close-up: curled on sofa cushions scrolling eagerly.
  30: {
    look: city,
    cam: { from: [0.6, 1.6, 3.6], to: [0.2, 1.55, 3.6], lookFrom: [0, 1.3, -2], fov: 50 },
    focus: 3.2,
    captionPos: "top",
    Body: B((t) => (
      <group>
        <LivingRoomCouchSet />
        <Toon spec={C.scroller} pos={[0, 0.95, -2.0]} pose={{ t, sit: true, mouth: "smile", talk: true, eyes: "half", armR: "hold", armL: "hold", prop: "phone", propHand: "R" }} />
      </group>
    )),
  },

  // 31: Sometimes, you even feel a buzz that never happened. (01:31–01:34)
  // Close-up phantom buzz reaction: touches pocket, feels nothing, confused reaction.
  31: {
    look: city,
    cam: { from: [0.2, 1.6, 2.9], to: [0, 1.55, 2.9], lookFrom: [0, 1.45, 0], fov: 46 },
    focus: 2.6,
    Body: B((t) => (
      <group>
        <CityStreetSet />
        <Toon spec={C.commuter} pos={[0, 0, 0]} pose={{ t, mouth: "o", talk: true, eyes: "wide", armR: "hold", shiver: true }} />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SCENE 9 — REBUILT SCORECARD & VISUAL DIAGRAMS (01:34–01:54)
  // -------------------------------------------------------------

  // 32: Okay. Count your points. (01:34–01:37)
  // Wide shot: character standing in Score Studio.
  32: {
    look: scr,
    cam: { from: [0, 1.6, 4.8], to: [0, 1.55, 4.8], lookFrom: [0, 1.15, 0], fov: 52 },
    focus: 4.4,
    Body: B((t) => (
      <group>
        <ScoreStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "open", talk: true, armR: "point", armL: "hips" }} />
      </group>
    )),
  },

  // 33: Zero or one. You're probably doing okay. (01:37–01:40)
  // Close-up: character explaining calmly (Score 0-1 Green badge).
  33: {
    look: scr,
    cam: { from: [0, 1.6, 3.4], to: [0, 1.55, 3.4], lookFrom: [0, 1.35, 0], fov: 48 },
    focus: 3,
    captionPos: "top",
    overlay: <ScoreZeroOneOverlay />,
    Body: B((t) => (
      <group>
        <ScoreStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "smile", talk: true, armR: "up", armL: "hips" }} />
      </group>
    )),
  },

  // 34: Two or three. Your phone has a pretty strong grip on your attention. (01:40–01:44)
  // Full-screen graphic: Attention Grip diagram with animated dial.
  34: {
    look: scr,
    cam: { from: [0, 1.6, 4.4], to: [0, 1.55, 4.4], lookFrom: [0, 1.25, 0], fov: 50 },
    focus: 4,
    captionPos: "top",
    overlay: <ScoreTwoThreeOverlay />,
    Body: B((t) => (
      <group>
        <ScoreStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "open", talk: true, armR: "point", armL: "cross" }} />
      </group>
    )),
  },

  // 35: Four. You might be spending more of your life on your phone than you realize. (01:44–01:49)
  // Top-down / angled insert: Red alert warning diagram (4/4 points).
  35: {
    look: scr,
    cam: { from: [0, 1.6, 4.2], to: [0, 1.55, 4.2], lookFrom: [0, 1.25, 0], fov: 50 },
    focus: 3.8,
    captionPos: "top",
    overlay: <ScoreFourOverlay />,
    Body: B((t) => (
      <group>
        <ScoreStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "o", talk: true, eyes: "wide", armR: "hold", armL: "hold", prop: "phone", propHand: "R" }} />
      </group>
    )),
  },

  // 36: And remember, this is just for fun. It's not a medical test. (01:49–01:52)
  // Medium reaction shot: Character smile and friendly shrug.
  36: {
    look: scr,
    cam: { from: [0, 1.6, 3.8], to: [0, 1.55, 3.8], lookFrom: [0, 1.3, 0], fov: 50 },
    focus: 3.4,
    overlay: <MedicalDisclaimerOverlay />,
    Body: B((t) => (
      <group>
        <ScoreStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "smile", talk: true, armR: "shrug", armL: "shrug" }} />
      </group>
    )),
  },

  // 37: Smartphone addiction isn't an official standalone medical diagnosis. (01:52–01:57)
  // Short transition: Split framing with scientist pointing to DSM-5 clarification.
  37: {
    look: scr,
    cam: { from: [0, 1.6, 4.8], to: [0, 1.55, 4.8], lookFrom: [0, 1.2, 0], fov: 52 },
    focus: 4.4,
    captionPos: "top",
    overlay: <DSM5ClarificationOverlay />,
    Body: B((t) => (
      <group>
        <ScoreStudioSet />
        <Toon spec={C.scientist} pos={[-0.55, 0, 0]} pose={{ t, mouth: "open", talk: true, armR: "point", armL: "hips" }} />
        <Toon spec={C.narrator} pos={[0.55, 0, 0]} pose={{ t, mouth: "smile", talk: false, armR: "hips", armL: "hips" }} />
      </group>
    )),
  },

  // -------------------------------------------------------------
  // SCENE 10 — FINAL EXPLANATION & ENDING (01:54–02:13)
  // -------------------------------------------------------------

  // 38: If you enjoyed this, follow and subscribe. (01:57–02:02)
  // Medium shot, character facing camera, full upper body visible, waving warmly.
  38: {
    look: stud,
    cam: { from: [0, 1.6, 4], to: [0, 1.55, 4], lookFrom: [0, 1.25, 0], fov: 50 },
    focus: 3.6,
    captionPos: "top",
    overlay: <SubscribeFollowOverlay />,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "smile", talk: true, eyes: "happy", armR: "wave", armL: "hips" }} />
      </group>
    )),
  },

  // 39: Now check your Screen Time and comment your daily hours below. (02:02–02:06)
  // Close-up, slow camera push-in: Narrator holding up phone, inviting comments.
  39: {
    look: stud,
    cam: { from: [0, 1.6, 2.8], to: [0, 1.55, 2.8], lookFrom: [0, 1.45, 0], fov: 46 },
    focus: 2.6,
    captionPos: "top",
    overlay: <CommentScreenTimeOverlay />,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "open", talk: true, armR: "point", armL: "hold", prop: "phone", propHand: "L" }} />
      </group>
    )),
  },

  // 40: And that buzz at the beginning? (02:06–02:07)
  // Full-screen visual showing main takeaway: Phantom Buzz mystery pulse.
  40: {
    look: stud,
    cam: { from: [0, 1.6, 3.8], to: [0, 1.55, 3.8], lookFrom: [0, 1.3, 0], fov: 50 },
    focus: 3.4,
    captionPos: "top",
    overlay: <EndingBuzzOverlay />,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
      </group>
    )),
  },

  // 41: It probably never happened. (02:07–02:09)
  // Return to character, slight three-quarter angle with realization smirk.
  41: {
    look: stud,
    cam: { from: [0.3, 1.6, 3.4], to: [0.1, 1.55, 3.4], lookFrom: [0, 1.35, 0], fov: 48 },
    focus: 3,
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "smile", talk: true, armR: "hold", armL: "hips", prop: "phone", propHand: "R" }} />
      </group>
    )),
  },

  // 42: You were just waiting for it. (02:09–02:13)
  // Clean ending shot, hold final composition and fade out.
  42: {
    look: stud,
    cam: { from: [0, 1.6, 3], to: [0, 1.55, 3], lookFrom: [0, 1.4, 0], fov: 46 },
    focus: 2.8,
    captionPos: "top",
    Body: B((t) => (
      <group>
        <ModernStudioSet />
        <Toon spec={C.narrator} pos={[0, 0, 0]} pose={{ t, mouth: "smile", talk: t < 1.6, eyes: t > 1.2 ? "wink" : "dot", armR: "point", armL: "hips" }} />
      </group>
    )),
  },
};
