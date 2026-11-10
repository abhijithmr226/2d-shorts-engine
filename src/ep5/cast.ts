import type { ToonSpec } from "../engine/draw";

export const C: Record<string, ToonSpec> = {
  // RAY KROC
  // Middle-aged businessman, early 50s. Round white head, slicked-back grey hair.
  // Dark navy suit, white shirt, red tie, black shoes, carries briefcase.
  ray: {
    hat: "none",
    hair: "#94a3b8", // slicked-back grey hair
    coat: "#0f172a", // dark navy suit
    vest: "#ffffff", // white shirt
    tie: "#dc2626",  // red tie
    buttons: "#0284c7",
    height: 1.02,
    wide: 0.98,
  },

  // HARRY SONNEBORN
  // Middle-aged strategic businessman. Round white head, short dark hair, rectangular glasses.
  // Charcoal-grey suit, light blue shirt, dark tie, carries brown folder.
  harry: {
    hat: "none",
    hair: "#1e293b", // short dark hair
    glasses: true,   // rectangular glasses
    coat: "#334155", // charcoal-grey suit
    vest: "#93c5fd", // light blue shirt
    tie: "#0f172a",  // dark tie
    buttons: "#64748b",
    height: 1.04,
    wide: 0.96,
  },

  // McDONALD BROTHERS
  // Richard (Dick) McDonald: Light blue shirt, 1950s trousers.
  brother_blue: {
    hat: "none",
    hair: "#475569",
    coat: "#38bdf8", // light blue shirt
    vest: "#f8fafc",
    buttons: "#0284c7",
    height: 0.98,
    wide: 1.0,
  },
  // Maurice (Mac) McDonald: Mustard-yellow shirt, 1950s trousers.
  brother_yellow: {
    hat: "none",
    hair: "#334155",
    coat: "#eab308", // mustard-yellow shirt
    vest: "#fef08a",
    buttons: "#ca8a04",
    height: 0.98,
    wide: 1.02,
  },

  // FRANCHISE OWNER
  // Green shirt, brown trousers, friendly business owner.
  franchisee: {
    hat: "none",
    hair: "#78350f", // short brown hair
    coat: "#16a34a", // green shirt
    vest: "#dcfce7",
    buttons: "#15803d",
    height: 0.97,
    wide: 0.98,
  },

  // MODERN CUSTOMER
  // Blue jacket, dark trousers, white sneakers, entering modern restaurant.
  customer: {
    hat: "none",
    hair: "#18181b",
    coat: "#2563eb", // blue jacket
    vest: "#ffffff",
    buttons: "#93c5fd",
    height: 0.96,
    wide: 0.95,
  },

  // 1950s SPEEDEE KITCHEN CREW
  // White uniform shirt, red apron
  crew: {
    hat: "none",
    hair: "#334155",
    coat: "#dc2626", // red apron
    vest: "#f8fafc", // white shirt
    buttons: "#991b1b",
    height: 0.96,
    wide: 0.95,
  },
};
