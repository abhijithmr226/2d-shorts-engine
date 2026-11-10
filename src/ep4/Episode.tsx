import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { Stage } from "../engine/Stage";
import { Captions } from "../engine/Captions";
import { SHOTS } from "./shots";
import timing from "../../episodes/ep4/timing.json";

export const TAIL = 2.2; // seconds of settling tail after last word for natural musical resolution and outro settle
export const totalFrames = (fps: number) => Math.ceil((timing.total + TAIL) * fps);

// shot i is on screen from its first word until the next shot's first word
export const shotSpans = (fps: number) =>
  timing.shots.map((s, i) => {
    const a = i === 0 ? 0 : Math.round(s.start * fps);
    const b = i + 1 < timing.shots.length ? Math.round(timing.shots[i + 1].start * fps) : totalFrames(fps);
    return { id: s.id, from: a, dur: b - a };
  });

export const ShotView: React.FC<{ id: number; dur: number }> = ({ id, dur }) => {
  const S = SHOTS[id];
  if (!S) return null;
  return (
    <AbsoluteFill>
      <Stage look={S.look} cam={S.cam} dur={dur} focus={S.focus}>
        <S.Body dur={dur} />
      </Stage>
      {S.overlay ? S.overlay : null}
    </AbsoluteFill>
  );
};

export const Episode4: React.FC<{ captions?: boolean; music?: boolean }> = ({
  captions = true,
  music = true,
}) => {
  const { fps } = useVideoConfig();
  const words = timing.shots.flatMap((s) => s.words);

  // Compute top ranges where captions should sit at top safe zone (Y = 0.16)
  // to avoid covering cards, sitting characters, or lower graphics
  const topRanges = timing.shots
    .filter((s) => SHOTS[s.id]?.captionPos === "top")
    .map((s) => {
      const next = timing.shots.find((x) => x.id === s.id + 1);
      return {
        start: s.start,
        end: next ? next.start : s.end + 0.8,
      };
    });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {shotSpans(fps).map((s) => (
        <Sequence key={s.id} from={s.from} durationInFrames={s.dur} name={"shot " + s.id}>
          <ShotView id={s.id} dur={s.dur} />
        </Sequence>
      ))}
      {captions ? (
        <Captions
          words={words}
          topRanges={topRanges}
          defaultY={0.76}
          topY={0.16}
          size={52}
        />
      ) : null}
      <Audio src={staticFile(music ? "ep4/mix.wav" : "ep4/voice.wav")} />
    </AbsoluteFill>
  );
};

// One shot on its own (for checking stills before full render)
export const ShotStill4: React.FC<{ id: number }> = ({ id }) => {
  const { fps } = useVideoConfig();
  const s = shotSpans(fps).find((x) => x.id === id);
  const dur = s ? s.dur : 90;
  return <ShotView id={id} dur={dur} />;
};

