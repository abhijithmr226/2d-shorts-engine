import type { ToonSpec } from "../engine/draw";

export const C: Record<string, ToonSpec> = {
  // Main Host / Presenter (Crisp modern jacket, focused posture, relatable narrator)
  narrator: {
    hat: "none",
    hair: "#27272a",
    coat: "#1e293b",
    buttons: "#38bdf8",
    height: 1.0,
    wide: 0.96,
  },
  // Sleeper in Bed (Cozy relaxed hoodie, messy bed hair, waking up reaching for screen)
  sleeper: {
    hat: "beanie",
    hatColor: "#64748b",
    hair: "#52525b",
    coat: "#475569",
    buttons: "#cbd5e1",
    height: 0.94,
    wide: 1.05,
  },
  // Commuter on City Sidewalk (Warm coat, scarf, feels phantom buzz in pocket)
  commuter: {
    hat: "cap",
    hatColor: "#0f172a",
    band: "#f97316",
    hair: "#3f3f46",
    coat: "#334155",
    scarf: "#ea580c",
    buttons: "#f1f5f9",
    height: 1.02,
    wide: 1.0,
  },
  // Heavy Phone Scroller (Casual street hoodie, eyes glued to glowing mobile display)
  scroller: {
    hat: "none",
    hair: "#713f12",
    coat: "#0284c7",
    buttons: "#bae6fd",
    height: 0.96,
    wide: 0.98,
  },
  // Cognitive Neuroscientist (White research lab coat, stylish glasses, explaining dopamine loop)
  scientist: {
    hat: "none",
    hair: "#e4e4e7",
    coat: "#f8fafc",
    vest: "#0284c7",
    buttons: "#0284c7",
    glasses: true,
    height: 1.04,
    wide: 0.94,
  },
};

