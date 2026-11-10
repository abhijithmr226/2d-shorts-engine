import type { ToonSpec } from "../engine/draw";

export const C: Record<string, ToonSpec> = {
  // Kana Harada - Hokkaido high school girl
  kana: {
    hat: "bob",
    hair: "#1a1822",
    coat: "#243252",
    skirt: "#182238",
    scarf: "#c4302b",
    buttons: "#f0f0f5",
    height: 0.86,
  },
  kanaEarmuffs: {
    hat: "earmuffs",
    hatColor: "#c4302b",
    hair: "#1a1822",
    coat: "#243252",
    skirt: "#182238",
    scarf: "#c4302b",
    buttons: "#f0f0f5",
    height: 0.86,
  },
  // JR Hokkaido train conductor / station master
  conductor: {
    hat: "cap",
    hatColor: "#161e33",
    band: "#d4af37",
    coat: "#1a2542",
    vest: "#161e33",
    buttons: "#d4af37",
    hair: "#2b2a30",
    height: 0.98,
    moustache: true,
  },
  // Storyteller / Host
  narrator: {
    hat: "none",
    hair: "#48362a",
    coat: "#6a5242",
    vest: "#c89a38",
    scarf: "#4a6878",
    glasses: true,
    height: 1.0,
  },
  // Students on the train
  studentGirl: {
    hat: "bob",
    hair: "#4a3528",
    coat: "#243252",
    skirt: "#182238",
    scarf: "#e0ad38",
    height: 0.85,
  },
  studentBoy: {
    hat: "none",
    hair: "#222026",
    coat: "#1e283e",
    buttons: "#d8d8d8",
    height: 0.92,
  },
  // JR Hokkaido Executive
  boardExec: {
    hat: "none",
    hair: "#686c75",
    coat: "#282c36",
    vest: "#424856",
    glasses: true,
    height: 0.98,
  },
  // Demolition Worker
  worker: {
    hat: "helmet",
    hatColor: "#f2b705",
    band: "#e8e8e8",
    coat: "#293c54",
    height: 0.95,
  },
};

