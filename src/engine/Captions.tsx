// Word-by-word pop-up subtitle system (Shorts & Reels retention style).
// Each word pops into view with dynamic bounce scale as spoken.
// Anchored strictly in the lower third safe zone (Y = 0.68), completely clearing faces and platform UI.
import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", { weights: ["800", "900"], subsets: ["latin"] });

export type Word = { w: string; start: number; end: number };

export type CaptionChunk = {
  words: Word[];
  start: number;
  end: number;
};

// Keywords to prioritize highlighting
const KEYWORDS = new Set([
  "quick", "buzz", "vibrate", "pocket", "nothing", "phantom", "addicted",
  "touch", "minutes", "breakfast", "teeth", "bed", "186", "reviews", "survey",
  "hours", "screen", "time", "brain", "exciting", "reward", "dopamine",
  "points", "zero", "four", "medical", "subscribe", "comment", "waiting"
]);

// Build compact, punchy phrase chunks (2 to 5 words) for snappy word-by-word pop-ups
export function buildChunks(words: Word[]): CaptionChunk[] {
  const chunks: CaptionChunk[] = [];
  let cur: Word[] = [];

  for (let i = 0; i < words.length; i++) {
    cur.push(words[i]);
    const rem = words.length - 1 - i;
    const hasMajorPunc = /[.?!]$/.test(words[i].w);
    const hasComma = /[,;:]$/.test(words[i].w);
    const isExclamation = /^[A-Z][a-z]*[!]$/.test(words[i].w);

    let shouldFlush = false;
    if (i === words.length - 1) {
      shouldFlush = true;
    } else {
      const nextWord = words[i + 1];
      const gap = nextWord.start - words[i].end;

      if (gap > 0.45) {
        shouldFlush = true;
      } else if (isExclamation && cur.length <= 2) {
        shouldFlush = true;
      } else if (hasMajorPunc && cur.length >= 2) {
        shouldFlush = true;
      } else if (hasComma && cur.length >= 3) {
        shouldFlush = true;
      } else if (cur.length >= 4 && gap > 0.18) {
        shouldFlush = true;
      } else if (cur.length >= 5) {
        shouldFlush = true;
      }
    }

    if (shouldFlush && cur.length > 0) {
      chunks.push({
        words: cur,
        start: cur[0].start,
        end: cur[cur.length - 1].end,
      });
      cur = [];
    }
  }

  // Extend chunk linger slightly so words don't flash off abruptly
  for (let i = 0; i < chunks.length - 1; i++) {
    const gap = chunks[i + 1].start - chunks[i].end;
    if (gap < 0.35) {
      chunks[i].end = chunks[i + 1].start;
    } else {
      chunks[i].end += 0.22;
    }
  }

  return chunks;
}

export const Captions: React.FC<{
  words: Word[];
  topRanges?: Array<{ start: number; end: number }>;
  defaultY?: number;
  topY?: number;
  size?: number;
}> = ({ words, topRanges = [], defaultY = 0.76, topY = 0.16, size = 54 }) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const t = frame / fps;

  const chunks = useMemo(() => buildChunks(words), [words]);
  const cur = chunks.find((c) => t >= c.start && t < c.end + 0.08);
  if (!cur) return null;

  const isTop = topRanges.some((r) => t >= r.start && t < r.end);
  const activeY = isTop ? topY : defaultY;

  const scale = Math.min(width, height) / 1080;
  const fullText = cur.words.map((w) => w.w).join(" ");
  const charLen = fullText.length;
  // Responsive sizing to ensure chunk always stays compact and readable
  const baseSize = charLen > 24 ? 44 : charLen > 18 ? 50 : charLen > 12 ? 54 : 58;
  const computedSize = Math.min(size, baseSize) * scale;
  const strokeW = Math.max(6, Math.round(computedSize * 0.14));

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 100 }}>
      <div
        style={{
          position: "absolute",
          top: height * activeY,
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: width * 0.88,
          maxWidth: `${width * 0.88}px`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: `${4 * scale}px ${12 * scale}px`,
          }}
        >
          {cur.words.map((wordObj, idx) => {
            // Word-by-word revelation: word only appears once spoken
            if (t < wordObj.start) {
              return null;
            }

            const elapsed = t - wordObj.start;
            // Snappy pop-up spring bounce animation
            const pop = interpolate(elapsed, [0, 0.07, 0.15], [0.65, 1.25, 1.0], {
              extrapolateRight: "clamp",
            });

            const isActive = t >= wordObj.start && t < wordObj.end + 0.1;
            const cleanWord = wordObj.w.toLowerCase().replace(/[^a-z0-9]/g, "");
            const isKey = KEYWORDS.has(cleanWord);

            // Active word glowing electric yellow / cyan, previous words crisp white
            const color = isActive
              ? isKey
                ? "#00f0ff"
                : "#ffe600"
              : isKey
              ? "#fde047"
              : "#ffffff";

            const wordScale = isActive ? pop * 1.15 : 1.0;

            return (
              <span
                key={`${wordObj.start}-${idx}`}
                style={{
                  fontFamily,
                  fontWeight: 900,
                  fontSize: computedSize,
                  lineHeight: 1.15,
                  letterSpacing: -0.5,
                  color,
                  WebkitTextStroke: `${strokeW}px #000000`,
                  paintOrder: "stroke fill",
                  textShadow: isActive
                    ? `0 0 ${22 * scale}px rgba(255, 230, 0, 0.9), 0 ${6 * scale}px ${16 * scale}px #000000`
                    : `0 ${6 * scale}px ${14 * scale}px #000000`,
                  transform: `scale(${wordScale})`,
                  display: "inline-block",
                  transformOrigin: "center center",
                }}
              >
                {wordObj.w}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
