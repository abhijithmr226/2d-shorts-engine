import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { Stage } from "../engine/Stage";
import { Captions } from "../engine/Captions";
import { SHOTS } from "./shots";
import timing from "../../episodes/ep5/timing.json";

export const TAIL = 1.0; // Settling tail
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

export const Episode5: React.FC<{ captions?: boolean; music?: boolean }> = ({
  captions = true,
  music = true,
}) => {
  const { fps } = useVideoConfig();
  const words = timing.shots.flatMap((s) => s.words);

  // Compute top ranges where captions should sit at top safe zone (Y = 0.16)
  // to avoid covering bottom-third cards or lower graphics
  const topRanges: Array<{ start: number; end: number }> = [];
  timing.shots.forEach((s) => {
    const shotDef = SHOTS[s.id];
    if (shotDef && shotDef.captionPos === "top") {
      topRanges.push({ start: s.start, end: s.end });
    }
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      {/* 3D Visual Sequences for all 26 storyboard shots */}
      {shotSpans(fps).map((s) => (
        <Sequence key={s.id} from={s.from} durationInFrames={s.dur}>
          <ShotView id={s.id} dur={s.dur} />
        </Sequence>
      ))}

      {/* Synchronized dynamic word-by-word captions */}
      {captions && <Captions words={words} topRanges={topRanges} />}

      {/* Professionally Mastered -14 LUFS Audio Bed & Dialogue */}
      {music && <Audio src={staticFile("ep5/mix.wav")} />}
    </AbsoluteFill>
  );
};

export const ShotStill5: React.FC<{ id: number }> = ({ id }) => {
  const { fps } = useVideoConfig();
  const s = shotSpans(fps).find((x) => x.id === id);
  const dur = s ? s.dur : 90;
  return <ShotView id={id} dur={dur} />;
};
