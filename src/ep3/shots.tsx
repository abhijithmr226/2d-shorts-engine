import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import type { CamKeys, Look } from "../engine/Stage";
import { Toon } from "../engine/Toon";
import { C } from "./cast";
import {
  victorianLook,
  conferenceLook,
  prisonLook,
  freedomLook,
  labLook,
  cosmicLook,
  MonopolyParlorSet,
  ConferenceHallSet,
  PrisonCorridorSet,
  SunlitGatesSet,
  NeuroscienceLabSet,
  CosmicVoidSet,
} from "./sets";
import {
  MonocleQuizOverlay,
  MonopolyBustedOverlay,
  MandelaEffectTitleOverlay,
  MandelaFactOverlay,
  PikachuTestOverlay,
  FruitOfTheLoomOverlay,
  CallToActionOverlay,
  BrainScienceOverlay,
  ChoiceInteractiveOverlay,
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

const vic = victorianLook();
const conf = conferenceLook();
const pris = prisonLook();
const free = freedomLook();
const lab = labLook();
const cosm = cosmicLook();

const B = (fn: (t: number, dur: number) => React.ReactNode): React.FC<{ dur: number }> => ({ dur }) => {
  const t = useT();
  return <>{fn(t, dur)}</>;
};

export const SHOTS: Record<number, Shot> = {
  // 1: Picture the Monopoly Man. The rich guy with the top hat and the mustache.
  1: {
    look: vic,
    cam: { from: [0, 1.8, 5.0], to: [0, 1.7, 3.8], lookFrom: [0, 1.3, -1.0] },
    focus: 4.2,
    Body: B((t) => (
      <>
        <MonopolyParlorSet />
        <Toon spec={C.monopolyMan} pose={{ t, walk: 0.4, armR: "hold", prop: "cane", mouth: "smile", look: 0 }} pos={[0, 0, -1.0]} />
      </>
    )),
  },

  // 2: Now tell me: is he wearing a monocle?
  2: {
    look: vic,
    cam: { from: [0, 1.8, 4.6], to: [0, 1.7, 3.8], lookFrom: [0, 1.3, -1.0] },
    focus: 4.0,
    overlay: <MonocleQuizOverlay />,
    captionPos: "top",
    Body: B(() => <MonopolyParlorSet />),
  },

  // 3: If you said yes, you're not alone.
  3: {
    look: vic,
    cam: { from: [-1.2, 1.9, 4.5], to: [0.8, 1.8, 4.2], lookFrom: [0, 1.2, -0.5] },
    focus: 4.0,
    Body: B((t) => (
      <>
        <MonopolyParlorSet />
        <Toon spec={C.stranger1} pose={{ t, armR: "wave", eyes: "happy", mouth: "smile" }} pos={[-1.6, 0, 0.5]} />
        <Toon spec={C.stranger2} pose={{ t, armL: "up", eyes: "happy", mouth: "smile" }} pos={[1.6, 0, 0.5]} />
        <Toon spec={C.detective} pose={{ t, armR: "point", mouth: "open", talk: true }} pos={[0, 0, -0.8]} />
      </>
    )),
  },

  // 4: And you're wrong. He has never worn one. Not once.
  4: {
    look: vic,
    cam: { from: [0, 1.8, 4.4], to: [0, 1.7, 3.8], lookFrom: [0, 1.3, -1.0] },
    focus: 4.0,
    overlay: <MonopolyBustedOverlay />,
    captionPos: "top",
    Body: B(() => <MonopolyParlorSet />),
  },

  // 5: So where did that picture in your head come from?
  5: {
    look: vic,
    cam: { from: [0.8, 1.8, 3.6], to: [0, 1.7, 3.0], lookFrom: [0, 1.3, -0.8] },
    focus: 3.2,
    Body: B((t) => (
      <>
        <MonopolyParlorSet />
        <Toon spec={C.detective} pose={{ t, armL: "hips", armR: "hold", prop: "lens", eyes: "wide", mouth: "o" }} pos={[0, 0, -0.8]} />
      </>
    )),
  },

  // 6: Let me tell you how this got famous.
  6: {
    look: vic,
    cam: { from: [0, 1.9, 4.8], to: [0, 1.7, 3.2], lookFrom: [0, 1.2, -1.5] },
    focus: 3.8,
    Body: B((t) => (
      <>
        <MonopolyParlorSet />
        <Toon spec={C.detective} pose={{ t, walk: 0.6, armR: "point", mouth: "smile", talk: true }} pos={[0, 0, -1.2]} />
      </>
    )),
  },

  // 7: In 2009, a woman named Fiona Broome was at a conference talking with strangers.
  7: {
    look: conf,
    cam: { from: [-1.5, 1.8, 4.6], to: [0.5, 1.7, 4.0], lookFrom: [0, 1.2, -1.5] },
    focus: 4.2,
    Body: B((t) => (
      <>
        <ConferenceHallSet />
        <Toon spec={C.fiona} pose={{ t, armR: "point", talk: true, mouth: "open" }} pos={[-0.8, 0, -1.2]} />
        <Toon spec={C.stranger1} pose={{ t, armL: "hips", mouth: "smile" }} pos={[1.2, 0, -1.0]} />
      </>
    )),
  },

  // 8: She brought up something she was sure of.
  8: {
    look: conf,
    cam: { from: [0, 1.6, 2.8], to: [0, 1.5, 2.2], lookFrom: [-0.6, 1.4, -1.2] },
    focus: 2.6,
    Body: B((t) => (
      <>
        <ConferenceHallSet />
        <Toon spec={C.fiona} pose={{ t, armR: "hold", prop: "teacup", talk: true, eyes: "dot", mouth: "open" }} pos={[-0.6, 0, -1.2]} />
      </>
    )),
  },

  // 9: Nelson Mandela died in prison in the 1980s.
  9: {
    look: pris,
    cam: { from: [0.8, 1.8, 4.4], to: [-0.4, 1.7, 3.6], lookFrom: [0, 1.3, -2.0] },
    focus: 4.0,
    Body: B((t) => (
      <>
        <PrisonCorridorSet />
        <Toon spec={C.mandelaPrison} pose={{ t, armL: "cross", armR: "cross", eyes: "sad", mouth: "flat" }} pos={[0, 0, -2.2]} />
      </>
    )),
  },

  // 10: She even remembered details of the funeral.
  10: {
    look: pris,
    cam: { from: [-1.2, 1.8, 4.0], to: [0.6, 1.7, 3.4], lookFrom: [0, 1.2, -1.8] },
    focus: 3.6,
    Body: B((t) => (
      <>
        <PrisonCorridorSet />
        <Toon spec={C.stranger2} pose={{ t, armL: "warm", eyes: "closed", mouth: "frown" }} pos={[-1.2, 0, -1.8]} />
        <Toon spec={C.stranger1} pose={{ t, armR: "hips", eyes: "sad", mouth: "flat" }} pos={[1.2, 0, -1.8]} />
      </>
    )),
  },

  // 11: Then something strange happened. Many of the strangers remembered it too.
  11: {
    look: conf,
    cam: { from: [0, 1.8, 4.6], to: [0, 1.7, 3.8], lookFrom: [0, 1.2, -1.2] },
    focus: 4.0,
    Body: B((t) => (
      <>
        <ConferenceHallSet />
        <Toon spec={C.fiona} pose={{ t, eyes: "wide", mouth: "o" }} pos={[-1.5, 0, -1.2]} />
        <Toon spec={C.stranger1} pose={{ t, eyes: "wide", armR: "point", mouth: "open" }} pos={[0, 0, -1.0]} />
        <Toon spec={C.stranger2} pose={{ t, eyes: "wide", armL: "up", mouth: "open" }} pos={[1.5, 0, -1.2]} />
      </>
    )),
  },

  // 12: Same story. Same details.
  12: {
    look: conf,
    cam: { from: [0, 1.6, 2.8], to: [0, 1.6, 2.2], lookFrom: [0, 1.4, -1.0] },
    focus: 2.6,
    Body: B((t) => (
      <>
        <ConferenceHallSet />
        <Toon spec={C.stranger1} pose={{ t, eyes: "half", armR: "shrug", mouth: "smile" }} pos={[0, 0, -1.0]} />
      </>
    )),
  },

  // 13: There was just one problem. Nelson Mandela did not die in prison.
  13: {
    look: free,
    cam: { from: [0, 1.9, 5.0], to: [0, 1.8, 4.0], lookFrom: [0, 1.3, -2.5] },
    focus: 4.4,
    overlay: <MandelaFactOverlay />,
    captionPos: "top",
    Body: B(() => <SunlitGatesSet />),
  },

  // 14: He walked out in 1990.
  14: {
    look: free,
    cam: { from: [-1.2, 1.8, 4.2], to: [0.4, 1.7, 3.4], lookFrom: [0, 1.3, -1.5] },
    focus: 3.6,
    Body: B((t) => (
      <>
        <SunlitGatesSet />
        <Toon spec={C.mandelaPresident} pose={{ t, walk: 0.7, armR: "up", eyes: "happy", mouth: "smile" }} pos={[0, 0, -1.5]} />
      </>
    )),
  },

  // 15: He became president of South Africa, and he died in 2013.
  15: {
    look: free,
    cam: { from: [0, 1.7, 3.4], to: [0, 1.6, 2.6], lookFrom: [0, 1.3, -1.2] },
    focus: 3.0,
    Body: B((t) => (
      <>
        <SunlitGatesSet />
        <Toon spec={C.mandelaPresident} pose={{ t, armL: "hips", armR: "wave", mouth: "smile", talk: true }} pos={[0, 0, -1.2]} />
      </>
    )),
  },

  // 16: So how did so many people share the same false memory?
  16: {
    look: conf,
    cam: { from: [0.8, 1.8, 3.8], to: [-0.6, 1.7, 3.2], lookFrom: [0, 1.2, -1.0] },
    focus: 3.4,
    Body: B((t) => (
      <>
        <ConferenceHallSet />
        <Toon spec={C.detective} pose={{ t, armL: "hips", armR: "hold", prop: "lens", eyes: "wide", mouth: "o" }} pos={[0, 0, -1.0]} />
      </>
    )),
  },

  // 17: Fiona gave it a name: the Mandela Effect.
  17: {
    look: conf,
    cam: { from: [0, 1.8, 4.6], to: [0, 1.7, 3.8], lookFrom: [0, 1.3, -1.0] },
    focus: 4.0,
    overlay: <MandelaEffectTitleOverlay />,
    captionPos: "top",
    Body: B(() => <ConferenceHallSet />),
  },

  // 18: Now test yourself again.
  18: {
    look: vic,
    cam: { from: [-0.8, 1.8, 3.4], to: [0.4, 1.7, 2.8], lookFrom: [0, 1.3, -0.8] },
    focus: 3.0,
    Body: B((t) => (
      <>
        <MonopolyParlorSet />
        <Toon spec={C.detective} pose={{ t, armR: "point", mouth: "smile", talk: true }} pos={[0, 0, -0.8]} />
      </>
    )),
  },

  // 19: Pikachu. Does he have a black tip on his tail?
  19: {
    look: vic,
    cam: { from: [0, 1.8, 4.4], to: [0, 1.7, 3.8], lookFrom: [0, 1.3, -1.0] },
    focus: 4.0,
    overlay: <PikachuTestOverlay />,
    captionPos: "top",
    Body: B(() => <MonopolyParlorSet />),
  },

  // 20: Most people say yes. Wrong.
  20: {
    look: vic,
    cam: { from: [0, 1.6, 2.4], to: [0, 1.6, 1.8], lookFrom: [0, 1.1, -0.8] },
    focus: 2.0,
    Body: B((t) => (
      <>
        <MonopolyParlorSet />
        <Toon spec={C.pikachuToon} pose={{ t, eyes: "wide", mouth: "o" }} pos={[0, 0, -0.8]} />
      </>
    )),
  },

  // 21: His tail is yellow, with a little brown at the bottom.
  21: {
    look: vic,
    cam: { from: [-0.6, 1.6, 2.8], to: [0.6, 1.5, 2.2], lookFrom: [0, 1.0, -0.8] },
    focus: 2.4,
    Body: B((t) => (
      <>
        <MonopolyParlorSet />
        <Toon spec={C.pikachuToon} pose={{ t, walk: 0.5, armL: "hips", mouth: "smile" }} pos={[0, 0, -0.8]} />
      </>
    )),
  },

  // 22: Fruit of the Loom. The fruit pouring out of a big horn, a cornucopia.
  22: {
    look: vic,
    cam: { from: [0, 1.8, 4.4], to: [0, 1.7, 3.8], lookFrom: [0, 1.3, -1.0] },
    focus: 4.0,
    overlay: <FruitOfTheLoomOverlay />,
    captionPos: "top",
    Body: B(() => <MonopolyParlorSet />),
  },

  // 23: Wrong again. It was never in the logo.
  23: {
    look: vic,
    cam: { from: [0.8, 1.7, 3.0], to: [-0.4, 1.7, 2.4], lookFrom: [0, 1.3, -1.0] },
    focus: 2.8,
    Body: B((t) => (
      <>
        <MonopolyParlorSet />
        <Toon spec={C.detective} pose={{ t, armL: "hips", eyes: "half", mouth: "flat" }} pos={[0, 0, -1.0]} />
      </>
    )),
  },

  // 24: In one survey, more than half of Americans pictured it anyway.
  24: {
    look: conf,
    cam: { from: [-1.2, 1.8, 4.4], to: [0.6, 1.7, 3.6], lookFrom: [0, 1.2, -1.2] },
    focus: 3.8,
    Body: B((t) => (
      <>
        <ConferenceHallSet />
        <Toon spec={C.stranger1} pose={{ t, armR: "shrug", eyes: "wide", mouth: "open" }} pos={[-1.2, 0, -1.2]} />
        <Toon spec={C.stranger2} pose={{ t, armL: "up", eyes: "wide", mouth: "open" }} pos={[1.2, 0, -1.2]} />
      </>
    )),
  },

  // 25: Before I tell you why this happens, follow this page on Instagram and subscribe here...
  25: {
    look: vic,
    cam: { from: [0, 1.8, 4.4], to: [0, 1.7, 3.8], lookFrom: [0, 1.3, -1.0] },
    focus: 4.0,
    overlay: <CallToActionOverlay />,
    captionPos: "top",
    Body: B(() => <MonopolyParlorSet />),
  },

  // 26: ...because the answer isn't what most people think, and you won't want to miss the next one.
  26: {
    look: vic,
    cam: { from: [-0.6, 1.7, 3.4], to: [0.6, 1.7, 2.8], lookFrom: [0, 1.3, -1.0] },
    focus: 3.0,
    Body: B((t) => (
      <>
        <MonopolyParlorSet />
        <Toon spec={C.detective} pose={{ t, armL: "hips", armR: "wave", mouth: "smile", talk: true }} pos={[0, 0, -1.0]} />
      </>
    )),
  },

  // 27: You see, your brain doesn't record the world like a camera.
  27: {
    look: lab,
    cam: { from: [0, 1.8, 4.4], to: [0, 1.7, 3.8], lookFrom: [0, 1.3, -1.5] },
    focus: 4.0,
    overlay: <BrainScienceOverlay />,
    captionPos: "top",
    Body: B(() => <NeuroscienceLabSet />),
  },

  // 28: It fills in the blanks.
  28: {
    look: lab,
    cam: { from: [0.6, 1.7, 3.0], to: [-0.4, 1.6, 2.4], lookFrom: [0, 1.4, -1.5] },
    focus: 2.8,
    Body: B((t) => (
      <>
        <NeuroscienceLabSet />
        <Toon spec={C.scientist} pose={{ t, armL: "hold", prop: "lens", eyes: "dot", mouth: "smile" }} pos={[0, 0, -1.5]} />
      </>
    )),
  },

  // 29: Some people think the monocle comes from mixing him up with Mr. Peanut, who really does wear one.
  29: {
    look: vic,
    cam: { from: [0, 1.8, 4.5], to: [0, 1.7, 3.6], lookFrom: [0, 1.3, -1.0] },
    focus: 4.0,
    Body: B((t) => (
      <>
        <MonopolyParlorSet />
        {/* Monopoly Man next to Mr Peanut */}
        <Toon spec={C.monopolyMan} pose={{ t, armL: "hips", mouth: "smile" }} pos={[-1.2, 0, -1.0]} />
        <Toon spec={C.mrPeanut} pose={{ t, armR: "hold", prop: "cane", mouth: "smile" }} pos={[1.2, 0, -1.0]} />
      </>
    )),
  },

  // 30: But here's the strange part. Researchers tested this.
  30: {
    look: lab,
    cam: { from: [-1.0, 1.8, 4.0], to: [0.4, 1.7, 3.2], lookFrom: [0, 1.3, -1.5] },
    focus: 3.6,
    Body: B((t) => (
      <>
        <NeuroscienceLabSet />
        <Toon spec={C.scientist} pose={{ t, armR: "point", talk: true, mouth: "open" }} pos={[0, 0, -1.5]} />
      </>
    )),
  },

  // 31: People didn't just make random mistakes.
  31: {
    look: lab,
    cam: { from: [0, 1.7, 3.2], to: [0, 1.6, 2.6], lookFrom: [0, 1.3, -1.5] },
    focus: 3.0,
    Body: B((t) => (
      <>
        <NeuroscienceLabSet />
        <Toon spec={C.stranger1} pose={{ t, armR: "shrug", eyes: "wide", mouth: "o" }} pos={[-1.0, 0, -1.5]} />
        <Toon spec={C.stranger2} pose={{ t, armL: "cross", eyes: "half", mouth: "flat" }} pos={[1.0, 0, -1.5]} />
      </>
    )),
  },

  // 32: They picked the same wrong picture again and again.
  32: {
    look: lab,
    cam: { from: [0.8, 1.7, 3.4], to: [-0.6, 1.7, 2.8], lookFrom: [0, 1.3, -1.5] },
    focus: 3.2,
    Body: B((t) => (
      <>
        <NeuroscienceLabSet />
        <Toon spec={C.scientist} pose={{ t, armR: "point", mouth: "smile", talk: true }} pos={[0, 0, -1.5]} />
      </>
    )),
  },

  // 33: Even some people who had never heard of the characters made the same mistakes.
  33: {
    look: conf,
    cam: { from: [-1.2, 1.8, 4.2], to: [0.6, 1.7, 3.4], lookFrom: [0, 1.2, -1.2] },
    focus: 3.8,
    Body: B((t) => (
      <>
        <ConferenceHallSet />
        <Toon spec={C.stranger2} pose={{ t, eyes: "wide", armR: "point", mouth: "o" }} pos={[0, 0, -1.2]} />
      </>
    )),
  },

  // 34: Scientists still can't fully explain it.
  34: {
    look: lab,
    cam: { from: [0, 1.7, 3.0], to: [0, 1.6, 2.4], lookFrom: [0, 1.4, -1.5] },
    focus: 2.8,
    Body: B((t) => (
      <>
        <NeuroscienceLabSet />
        <Toon spec={C.scientist} pose={{ t, armL: "shrug", armR: "shrug", eyes: "wide", mouth: "o" }} pos={[0, 0, -1.5]} />
      </>
    )),
  },

  // 35: So no, it's not proof of parallel worlds.
  35: {
    look: cosm,
    cam: { from: [0, 1.8, 5.0], to: [0, 1.7, 4.0], lookFrom: [0, 1.2, -1.0] },
    focus: 4.4,
    Body: B((t) => (
      <>
        <CosmicVoidSet />
        <Toon spec={C.detective} pose={{ t, armL: "cross", armR: "point", eyes: "half", mouth: "flat" }} pos={[0, 0, -1.0]} />
      </>
    )),
  },

  // 36: It's proof that memory is a story your brain tells you, and the story feels real.
  36: {
    look: cosm,
    cam: { from: [-0.8, 1.7, 4.2], to: [0.6, 1.7, 3.4], lookFrom: [0, 1.3, -1.0] },
    focus: 3.8,
    Body: B((t) => (
      <>
        <CosmicVoidSet />
        <Toon spec={C.detective} pose={{ t, armL: "warm", armR: "hips", mouth: "smile", talk: true }} pos={[0, 0, -1.0]} />
      </>
    )),
  },

  // 37: Now I want to know. Which one fooled you? Monocle, black tail, or cornucopia?
  37: {
    look: vic,
    cam: { from: [0, 1.8, 4.4], to: [0, 1.7, 3.8], lookFrom: [0, 1.3, -1.0] },
    focus: 4.0,
    overlay: <ChoiceInteractiveOverlay />,
    captionPos: "top",
    Body: B(() => <MonopolyParlorSet />),
  },

  // 38: Comment one word, and hit like if you got fooled by all three.
  38: {
    look: vic,
    cam: { from: [-0.6, 1.7, 3.2], to: [0.6, 1.7, 2.6], lookFrom: [0, 1.3, -1.0] },
    focus: 3.0,
    Body: B((t) => (
      <>
        <MonopolyParlorSet />
        <Toon spec={C.detective} pose={{ t, armL: "wave", armR: "point", eyes: "happy", mouth: "grin" }} pos={[0, 0, -1.0]} />
      </>
    )),
  },

  // 39: So if you pictured a monocle... it was never in the picture.
  39: {
    look: vic,
    cam: { from: [0, 1.7, 3.2], to: [0, 1.6, 2.4], lookFrom: [0, 1.3, -1.0] },
    focus: 2.8,
    Body: B((t) => (
      <>
        <MonopolyParlorSet />
        <Toon spec={C.monopolyMan} pose={{ t, armR: "hold", prop: "cane", eyes: "happy", mouth: "smile" }} pos={[0, 0, -1.0]} />
      </>
    )),
  },

  // 40: It was only in your head.
  40: {
    look: vic,
    cam: { from: [0, 1.8, 4.4], to: [0, 1.7, 3.8], lookFrom: [0, 1.3, -1.0] },
    focus: 4.0,
    overlay: <CallToActionOverlay />,
    captionPos: "top",
    Body: B(() => <MonopolyParlorSet />),
  },
};
