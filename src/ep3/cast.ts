import type { ToonSpec } from "../engine/draw";

export const C: Record<string, ToonSpec> = {
  // Rich Uncle Pennybags / The Monopoly Man (top hat, black morning suit, white mustache)
  monopolyMan: {
    hat: "top",
    hatColor: "#181820",
    band: "#b91c1c",
    coat: "#1c1c24",
    vest: "#d4af37",
    buttons: "#f59e0b",
    hair: "#f4f4f5",
    moustache: true,
    height: 0.95,
    wide: 1.15,
  },
  // Fiona Broome (discovered the Mandela Effect in 2009)
  fiona: {
    hat: "none",
    hair: "#854d0e",
    coat: "#881337",
    scarf: "#fbbf24",
    glasses: true,
    buttons: "#fef08a",
    height: 0.9,
  },
  // Nelson Mandela (1980s prison years)
  mandelaPrison: {
    hat: "none",
    hair: "#52525b",
    coat: "#475569",
    buttons: "#94a3b8",
    height: 1.02,
    wide: 0.95,
  },
  // Nelson Mandela (1994 President)
  mandelaPresident: {
    hat: "none",
    hair: "#e4e4e7",
    coat: "#1e3a8a",
    vest: "#ca8a04",
    buttons: "#facc15",
    height: 1.02,
    wide: 1.0,
  },
  // Pikachu representation (cute round yellow character, black ear tips, red cheeks, lightning tail with NO black tip)
  pikachuToon: {
    creature: "pikachu",
    hat: "none",
    coat: "#ffde00",
    height: 0.88,
    wide: 1.0,
  },
  // Mr. Peanut (Planters mascot with top hat & cane)
  mrPeanut: {
    hat: "top",
    hatColor: "#1e1e24",
    band: "#eab308",
    coat: "#ca8a04",
    buttons: "#18181b",
    height: 0.98,
    wide: 0.85,
  },
  // Investigative Narrator / Detective (Celyxi style)
  detective: {
    hat: "bowler",
    hatColor: "#78716c",
    band: "#292524",
    coat: "#a8a29e",
    vest: "#44403c",
    buttons: "#292524",
    height: 1.0,
    wide: 1.05,
  },
  // Cognitive Scientist / Researcher
  scientist: {
    hat: "none",
    hair: "#3f3f46",
    coat: "#f8fafc",
    vest: "#0284c7",
    glasses: true,
    buttons: "#0f172a",
    height: 0.98,
  },
  // Conference Stranger 1
  stranger1: {
    hat: "flatcap",
    hatColor: "#334155",
    coat: "#1e293b",
    scarf: "#38bdf8",
    height: 0.95,
  },
  // Conference Stranger 2
  stranger2: {
    hat: "none",
    hair: "#1c1917",
    coat: "#065f46",
    buttons: "#a7f3d0",
    height: 0.92,
  },
};

