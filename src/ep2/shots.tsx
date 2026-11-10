import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { CamKeys, Look } from "../engine/Stage";
import { Toon } from "../engine/Toon";
import { C } from "./cast";
import {
  snowDayLook,
  twilightLook,
  warmCarriageLook,
  SnowyStationSet,
  TrainInteriorSet,
  BedroomSet,
} from "./sets";
import {
  ViralPostOverlay,
  CallToActionOverlay,
  FactDocumentOverlay,
  EndingQuestionOverlay,
} from "./overlays";

export type Shot = {
  look: Look;
  cam: CamKeys;
  focus: number;
  Body: React.FC<{ dur: number }>;
  overlay?: React.ReactNode;
  captionPos?: "top" | "bottom";
};

const useT = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return f / fps;
};

const day = snowDayLook();
const twilight = twilightLook();
const carriage = warmCarriageLook();

const B = (fn: (t: number, dur: number) => React.ReactNode): React.FC<{ dur: number }> => ({ dur }) => {
  const t = useT();
  return <>{fn(t, dur)}</>;
};

export const SHOTS: Record<number, Shot> = {
  // 1: People all over the world cried over this train station.
  // 0:00-0:05 HOOK: Clean wide shot of snowy platform with Kana visible, warm lamp, slow push-in.
  // NO dark panel or roof cutting into top frame! Camera eye-level across tracks.
  1: {
    look: day,
    focus: 6.5,
    cam: { from: [-1.2, 1.9, 7.5], to: [0.4, 1.8, 5.0], lookFrom: [3.4, 1.3, 0], lookTo: [3.4, 1.3, 0], fov: 48 },
    Body: B(() => (
      <SnowyStationSet snowing={true}>
        <Toon spec={C.kana} pos={[3.4, 0.43, 0]} pose={{ armL: "down", armR: "down", eyes: "dot", mouth: "smile" }} />
      </SnowyStationSet>
    )),
  },

  // 2: And the story they cried about wasn't true.
  // Slow glide towards station sign & building
  2: {
    look: day,
    focus: 4.8,
    cam: { from: [0.8, 1.8, 5.2], to: [1.8, 1.75, 4.2], lookFrom: [4.2, 1.7, 3.8], lookTo: [4.2, 1.7, 3.8], fov: 46 },
    Body: B(() => (
      <SnowyStationSet>
        <Toon spec={C.kana} pos={[3.4, 0.43, 0.5]} pose={{ armL: "down", armR: "down", eyes: "half", mouth: "flat" }} />
      </SnowyStationSet>
    )),
  },

  // 3: It's called Kyushirataki.
  // Medium shot showing station hut entrance and signboard clearly
  3: {
    look: day,
    focus: 5.5,
    cam: { from: [1.5, 2.0, 3.5], to: [2.5, 1.8, 2.2], lookFrom: [7.2, 1.7, -1.0], lookTo: [7.2, 1.7, -1.0], fov: 48 },
    Body: B(() => <SnowyStationSet />),
  },

  // 4: It's in a tiny town in Hokkaido, Japan.
  // Wide vista of snowy mountains, solid pine trees, and Hokkaido tracks
  4: {
    look: day,
    focus: 12,
    cam: { from: [-8.0, 4.5, 12.0], to: [-4.5, 3.2, 8.5], lookFrom: [0, 1.5, -4], lookTo: [2, 1.5, 0], fov: 52 },
    Body: B(() => <SnowyStationSet />),
  },

  // 5: No staff, one short platform, almost nobody around.
  // Looking down the quiet snowy platform
  5: {
    look: day,
    focus: 7.0,
    cam: { from: [2.8, 1.8, -7.0], to: [2.8, 1.7, -3.5], lookFrom: [2.8, 1.5, 5], lookTo: [2.8, 1.5, 8], fov: 48 },
    Body: B(() => <SnowyStationSet />),
  },

  // 6: A high school girl named Kanaharada used it every morning.
  // Kana Harada walking along the platform, clear of all walls
  6: {
    look: day,
    focus: 4.5,
    cam: { from: [0.5, 1.7, 4.5], to: [1.2, 1.6, 2.8], lookFrom: [3.4, 1.3, 0], lookTo: [3.4, 1.3, 0], fov: 46 },
    Body: B(() => (
      <SnowyStationSet>
        <Toon
          spec={C.kana}
          pos={[3.4, 0.43, 0]}
          path={{ from: [3.4, 0.43, -3.5], to: [3.4, 0.43, 0], start: 0, end: 3.0 }}
          pose={{ armL: "down", armR: "down", eyes: "dot", mouth: "smile" }}
        />
      </SnowyStationSet>
    )),
  },

  // 7: She stood on that quiet platform, a train came, and it took her to school.
  // Detailed train car arrives smoothly with zero platform clipping
  7: {
    look: day,
    focus: 5.5,
    cam: { from: [4.2, 1.8, 4.5], to: [3.2, 1.7, 2.8], lookFrom: [1.2, 1.4, 0], lookTo: [0.8, 1.4, 0], fov: 48 },
    Body: B((t) => {
      const trainZ = interpolate(t, [0.4, 4.0], [-18, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      return (
        <SnowyStationSet trainZ={trainZ}>
          <Toon spec={C.kana} pos={[3.4, 0.43, 0]} pose={{ armR: t > 2 ? "wave" : "down", eyes: "happy", mouth: "smile" }} />
        </SnowyStationSet>
      );
    }),
  },

  // 8: Then a post went viral. It said the station was supposed to close years ago.
  // Clean Viral Post Card overlay (safe margins, no invented stats, caption at top)
  8: {
    look: day,
    focus: 6.0,
    cam: { from: [0.5, 1.8, 5.0], to: [0.5, 1.8, 4.5], lookFrom: [3.4, 1.3, 0] },
    captionPos: "top",
    overlay: <ViralPostOverlay />,
    Body: B(() => <SnowyStationSet />),
  },

  // 9: Cut away: Board executive in JR Hokkaido
  9: {
    look: day,
    focus: 4.5,
    cam: { from: [1.0, 1.8, 3.5], to: [1.8, 1.75, 2.5], lookFrom: [3.4, 1.3, 0], lookTo: [3.4, 1.3, 0], fov: 46 },
    Body: B(() => (
      <SnowyStationSet>
        <Toon spec={C.boardExec} pos={[3.4, 0.43, 0]} pose={{ armL: "point", eyes: "happy", mouth: "smile" }} />
      </SnowyStationSet>
    )),
  },

  // 10: And they'd close it the day she graduated.
  // Fact Document B: Calendar preview
  10: {
    look: day,
    focus: 5.0,
    cam: { from: [0, 1.8, 4.0], to: [0, 1.8, 3.5], lookFrom: [0, 1.3, 0] },
    captionPos: "top",
    overlay: <FactDocumentOverlay fact="calendar" />,
    Body: B(() => <SnowyStationSet />),
  },

  // 11: And that's exactly what happened.
  // Conductor bowing to Kana on snowy platform
  11: {
    look: day,
    focus: 4.5,
    cam: { from: [0.8, 1.8, 3.4], to: [1.4, 1.7, 2.4], lookFrom: [3.2, 1.4, 0], lookTo: [3.2, 1.4, 0], fov: 48 },
    Body: B(() => (
      <SnowyStationSet>
        <Toon spec={C.conductor} pos={[2.5, 0.43, 0]} pose={{ armR: "point", eyes: "happy", mouth: "smile" }} />
        <Toon spec={C.kana} pos={[3.8, 0.43, 0]} pose={{ armL: "down", armR: "wave", eyes: "happy", mouth: "smile" }} />
      </SnowyStationSet>
    )),
  },

  // 12: Kanah graduated in March 2016.
  // Kana holding diploma scroll on snowy platform with wide mountain vista
  12: {
    look: day,
    focus: 3.8,
    cam: { from: [-0.4, 1.7, 3.2], to: [0.4, 1.6, 2.2], lookFrom: [3.2, 1.4, 0.5], lookTo: [3.2, 1.4, 0.5], fov: 46 },
    Body: B(() => (
      <SnowyStationSet>
        <Toon
          spec={C.kana}
          pos={[3.2, 0.43, 0.5]}
          pose={{ armR: "hold", prop: "diploma", armL: "hold", propHand: "L", eyes: "happy", mouth: "grin" }}
        />
      </SnowyStationSet>
    )),
  },

  // 13: The station closed in March 2016.
  // Station with closed tape & quiet snow
  13: {
    look: day,
    focus: 5.5,
    cam: { from: [2.2, 1.9, 1.5], to: [3.0, 1.8, 0.5], lookFrom: [7.2, 1.7, -1.0], lookTo: [7.2, 1.7, -1.0], fov: 48 },
    Body: B(() => <SnowyStationSet closedTape={true} />),
  },

  // 14: News channels around the world ran the story.
  // Brief return of viral card overlay
  14: {
    look: day,
    focus: 5.0,
    cam: { from: [0, 1.8, 4.0], to: [0, 1.8, 3.5], lookFrom: [0, 1.3, 0] },
    captionPos: "top",
    overlay: <ViralPostOverlay />,
    Body: B(() => <SnowyStationSet />),
  },

  // 15: People called it the kindest thing a railway ever did.
  // Narrator on snowy platform speaking with warmth
  15: {
    look: day,
    focus: 4.2,
    cam: { from: [0.8, 1.8, 3.5], to: [1.5, 1.75, 2.5], lookFrom: [3.4, 1.4, 0], lookTo: [3.4, 1.4, 0], fov: 48 },
    Body: B(() => (
      <SnowyStationSet>
        <Toon spec={C.narrator} pos={[3.4, 0.43, 0]} pose={{ armL: "warm", armR: "warm", eyes: "happy", mouth: "smile" }} />
      </SnowyStationSet>
    )),
  },

  // 16: But wait, before I tell you what really happened, follow this page on Instagram and subscribe here.
  // Clean, centered Subscribe & Follow Card (held 3s, safe margins, caption at top)
  16: {
    look: day,
    focus: 5.0,
    cam: { from: [0, 1.8, 4.0], to: [0, 1.8, 3.6], lookFrom: [0, 1.3, 0] },
    captionPos: "top",
    overlay: <CallToActionOverlay />,
    Body: B(() => <SnowyStationSet />),
  },

  // 17: Because the real story is stranger than the viral one. And most videos never tell it.
  // Cut back to story: Narrator leaning in inquisitively under the warm station lamp
  17: {
    look: day,
    focus: 4.0,
    cam: { from: [1.0, 1.8, 3.8], to: [1.8, 1.75, 2.6], lookFrom: [3.4, 1.4, 0], lookTo: [3.4, 1.4, 0], fov: 48 },
    Body: B(() => (
      <SnowyStationSet>
        <Toon spec={C.narrator} pos={[3.4, 0.43, 0]} pose={{ armL: "hips", armR: "point", eyes: "dot", mouth: "open" }} />
      </SnowyStationSet>
    )),
  },

  // 18: You see, the railway never kept that station open for her.
  // REVEAL FACT A: July 2015 announcement overlay
  18: {
    look: day,
    focus: 5.0,
    cam: { from: [0, 1.8, 4.0], to: [0, 1.8, 3.5], lookFrom: [0, 1.3, 0] },
    captionPos: "top",
    overlay: <FactDocumentOverlay fact="july2015" />,
    Body: B(() => <SnowyStationSet />),
  },

  // 19: In July 2015, months before the story went viral,
  // Cut away to Kana waiting quietly in snow
  19: {
    look: day,
    focus: 4.2,
    cam: { from: [0.8, 1.7, 3.8], to: [1.4, 1.6, 2.6], lookFrom: [3.4, 1.3, 0], lookTo: [3.4, 1.3, 0], fov: 46 },
    Body: B(() => (
      <SnowyStationSet>
        <Toon spec={C.kana} pos={[3.4, 0.43, 0]} pose={{ armL: "down", armR: "down", eyes: "half", mouth: "flat" }} />
      </SnowyStationSet>
    )),
  },

  // 20: the railway company announced it was closing four stations on that line.
  // REVEAL FACT A repeat / archive record
  20: {
    look: day,
    focus: 5.0,
    cam: { from: [0, 1.8, 4.0], to: [0, 1.8, 3.5], lookFrom: [0, 1.3, 0] },
    captionPos: "top",
    overlay: <FactDocumentOverlay fact="july2015" />,
    Body: B(() => <SnowyStationSet />),
  },

  // 21: The reason was boring, almost nobody used them.
  // Cut away to quiet empty platform & tracks
  21: {
    look: day,
    focus: 6.5,
    cam: { from: [1.2, 1.9, 4.5], to: [2.0, 1.8, 2.8], lookFrom: [4.2, 1.5, 0], lookTo: [4.2, 1.5, 0], fov: 48 },
    Body: B(() => <SnowyStationSet />),
  },

  // 22: And the date? In Japan, train timetables change every March.
  // REVEAL FACT B: Japanese Calendar overlay
  22: {
    look: day,
    focus: 5.0,
    cam: { from: [0, 1.8, 4.0], to: [0, 1.8, 3.5], lookFrom: [0, 1.3, 0] },
    captionPos: "top",
    overlay: <FactDocumentOverlay fact="calendar" />,
    Body: B(() => <SnowyStationSet />),
  },

  // 23: March is also when the school year ends.
  // Cut away to Kana in school uniform
  23: {
    look: day,
    focus: 4.0,
    cam: { from: [0.6, 1.7, 3.5], to: [1.2, 1.6, 2.5], lookFrom: [3.4, 1.3, 0], lookTo: [3.4, 1.3, 0], fov: 46 },
    Body: B(() => (
      <SnowyStationSet>
        <Toon spec={C.kana} pos={[3.4, 0.43, 0]} pose={{ armR: "point", eyes: "dot", mouth: "smile" }} />
      </SnowyStationSet>
    )),
  },

  // 24: Two things landed in the same month and the internet drew a line between them.
  // REVEAL FACT B: Calendar overlay
  24: {
    look: day,
    focus: 5.0,
    cam: { from: [0, 1.8, 4.0], to: [0, 1.8, 3.5], lookFrom: [0, 1.3, 0] },
    captionPos: "top",
    overlay: <FactDocumentOverlay fact="calendar" />,
    Body: B(() => <SnowyStationSet />),
  },

  // 25: There's more. She wasn't riding an empty train.
  // REVEAL FACT C: "Dozens of passengers were already on the train"
  25: {
    look: carriage,
    focus: 5.0,
    cam: { from: [0, 1.8, 4.0], to: [0, 1.8, 3.5], lookFrom: [0, 1.3, 0] },
    captionPos: "top",
    overlay: <FactDocumentOverlay fact="passengers" />,
    Body: B(() => <TrainInteriorSet />),
  },

  // 26: When she got on, dozens of passengers were already inside,
  // 1:35-1:50 Train Interior: High school friends chatting, Kana walking down aisle, subtle camera motion
  26: {
    look: carriage,
    focus: 4.2,
    cam: { from: [0, 1.85, 4.8], to: [0, 1.75, 3.6], lookFrom: [0, 1.3, 0], lookTo: [0, 1.3, 0], fov: 50 },
    Body: B(() => (
      <TrainInteriorSet>
        <Toon spec={C.studentGirl} pos={[-1.5, 0.32, 0]} pose={{ sit: true, armR: "wave", eyes: "happy", mouth: "smile" }} />
        <Toon spec={C.studentBoy} pos={[1.5, 0.32, 0]} pose={{ sit: true, armL: "down", eyes: "dot", mouth: "smile" }} />
        <Toon
          spec={C.kana}
          pos={[0, 0.2, 1.6]}
          path={{ from: [0, 0.2, 3.0], to: [0, 0.2, 0.6], start: 0, end: 2.8 }}
          pose={{ armL: "down", armR: "down", eyes: "happy", mouth: "smile" }}
        />
      </TrainInteriorSet>
    )),
  },

  // 27: mostly students from her own school.
  // Kana seated with her friend waving across the aisle
  27: {
    look: carriage,
    focus: 3.5,
    cam: { from: [0, 1.75, 2.8], to: [0, 1.7, 2.0], lookFrom: [0, 1.3, 0], lookTo: [0, 1.3, 0], fov: 50 },
    Body: B(() => (
      <TrainInteriorSet>
        <Toon spec={C.studentGirl} pos={[-1.5, 0.32, 0]} pose={{ sit: true, armR: "wave", eyes: "happy", mouth: "grin" }} />
        <Toon spec={C.kana} pos={[1.5, 0.32, 0]} pose={{ sit: true, armL: "wave", eyes: "happy", mouth: "smile" }} />
      </TrainInteriorSet>
    )),
  },

  // 28: And she said the station simply let her sleep a little longer in the morning.
  // REVEAL FACT D: "She said the station let her sleep a little longer"
  28: {
    look: day,
    focus: 5.0,
    cam: { from: [0, 1.8, 4.0], to: [0, 1.8, 3.5], lookFrom: [0, 1.3, 0] },
    captionPos: "top",
    overlay: <FactDocumentOverlay fact="sleep" />,
    Body: B(() => <BedroomSet />),
  },

  // 29: So the station wasn't saved for her.
  // Kana cozy in bed smiling happily
  29: {
    look: day,
    focus: 3.8,
    cam: { from: [0, 2.1, 4.2], to: [0, 1.85, 3.0], lookFrom: [1.2, 1.1, 0], lookTo: [1.2, 1.1, 0], fov: 48 },
    Body: B(() => (
      <BedroomSet>
        <Toon spec={C.kana} pos={[1.2, 0.35, 0]} pose={{ sit: true, eyes: "happy", mouth: "grin" }} />
      </BedroomSet>
    )),
  },

  // 30: It was closing quietly, like many small stations do.
  // Quiet twilight snowy platform
  30: {
    look: twilight,
    focus: 6.5,
    cam: { from: [1.5, 2.0, 3.5], to: [2.5, 1.8, 2.0], lookFrom: [7.2, 1.7, -1.0], lookTo: [7.2, 1.7, -1.0], fov: 48 },
    Body: B(() => <SnowyStationSet night={true} />),
  },

  // 31: She was just the person still using it.
  // Kana stepping onto the train, conductor waiting politely
  31: {
    look: day,
    focus: 4.8,
    cam: { from: [0.6, 1.8, 3.0], to: [1.2, 1.7, 1.8], lookFrom: [2.4, 1.4, -0.5], lookTo: [2.4, 1.4, -0.5], fov: 48 },
    Body: B(() => (
      <SnowyStationSet trainZ={-1.5}>
        <Toon spec={C.kana} pos={[1.8, 0.43, 0]} pose={{ armR: "wave", eyes: "happy", mouth: "smile" }} />
        <Toon spec={C.conductor} pos={[2.6, 0.43, -1.8]} pose={{ armL: "down", eyes: "dot", mouth: "smile" }} />
      </SnowyStationSet>
    )),
  },

  // 32: That October, the building was torn down.
  // REVEAL FACT E: Demolished October 2016 overlay
  32: {
    look: day,
    focus: 5.0,
    cam: { from: [0, 1.8, 4.0], to: [0, 1.8, 3.5], lookFrom: [0, 1.3, 0] },
    captionPos: "top",
    overlay: <FactDocumentOverlay fact="demolished" />,
    Body: B(() => <SnowyStationSet snowing={false} closedTape={true} />),
  },

  // 33: The sweet story was never true, but a lot of people believed it anyway.
  // Autumn scene with demolition worker
  33: {
    look: day,
    focus: 5.0,
    cam: { from: [0.8, 1.8, 3.5], to: [1.5, 1.7, 2.2], lookFrom: [3.4, 1.4, 0], lookTo: [3.4, 1.4, 0], fov: 48 },
    Body: B(() => (
      <SnowyStationSet snowing={false} closedTape={true}>
        <Toon spec={C.worker} pos={[3.4, 0.43, 0]} pose={{ armL: "hips", armR: "point", eyes: "dot", mouth: "flat" }} />
      </SnowyStationSet>
    )),
  },

  // 34: So the station that stayed open for one girl never stayed open for her at all.
  // Poetic wide shot: snow falling down the vanishing tracks into twilight horizon
  34: {
    look: twilight,
    focus: 14,
    cam: { from: [0, 3.2, -10], to: [0, 2.2, -3], lookFrom: [0, 1.5, 20], lookTo: [0, 1.5, 25], fov: 52 },
    Body: B(() => <SnowyStationSet snowing={true} night={true} />),
  },

  // 35: Here's what I can't figure out. If it was never true, why did so many of us believe it so fast?
  // Large readable ending question card inside safe zone (no cropping)
  35: {
    look: twilight,
    focus: 5.0,
    cam: { from: [0.8, 1.8, 3.8], to: [0.8, 1.8, 3.4], lookFrom: [3.2, 1.4, 0] },
    captionPos: "top",
    overlay: <EndingQuestionOverlay />,
    Body: B(() => (
      <SnowyStationSet night={true}>
        <Toon spec={C.narrator} pos={[3.2, 0.43, 0]} pose={{ armL: "hips", armR: "point", eyes: "wide", mouth: "open" }} />
      </SnowyStationSet>
    )),
  },

  // 36: Tell me in the comments, I really want to know.
  // Clean final Subscribe Card centered in frame for the last 3 seconds
  36: {
    look: twilight,
    focus: 5.0,
    cam: { from: [0, 1.8, 4.0], to: [0, 1.8, 3.6], lookFrom: [0, 1.3, 0] },
    captionPos: "top",
    overlay: <CallToActionOverlay />,
    Body: B(() => (
      <SnowyStationSet night={true}>
        <Toon spec={C.narrator} pos={[2.2, 0.43, 0]} pose={{ armR: "wave", eyes: "happy", mouth: "smile" }} />
      </SnowyStationSet>
    )),
  },
};
