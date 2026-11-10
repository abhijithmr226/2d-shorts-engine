import React from "react";
import { Composition } from "remotion";
import { Episode, ShotStill, totalFrames } from "./ep1/Episode";
import { LongEpisode, longFrames } from "./ep1/Long";
import { Episode2, ShotStill2, totalFrames as totalFrames2 } from "./ep2/Episode";
import { Episode3, ShotStill3, totalFrames as totalFrames3 } from "./ep3/Episode";
import { Episode4, ShotStill4, totalFrames as totalFrames4 } from "./ep4/Episode";
import { Episode5, ShotStill5, totalFrames as totalFrames5 } from "./ep5/Episode";

export const Root: React.FC = () => (
  <>
    {/* Episode 5 - How McDonald's Made Billions From Real Estate (Project 4) */}
    <Composition
      id="Short"
      component={Episode5}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={totalFrames5(30)}
      defaultProps={{ captions: true, music: true }}
    />
    <Composition
      id="Shot"
      component={ShotStill5}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={300}
      defaultProps={{ id: 1 }}
    />
    <Composition
      id="Short5"
      component={Episode5}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={totalFrames5(30)}
      defaultProps={{ captions: true, music: true }}
    />
    <Composition
      id="Shot5"
      component={ShotStill5}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={300}
      defaultProps={{ id: 1 }}
    />

    {/* Episode 4 - How Addicted to Your Phone Are You? (Project 3) */}
    <Composition
      id="Short4"
      component={Episode4}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={totalFrames4(30)}
      defaultProps={{ captions: true, music: true }}
    />
    <Composition
      id="Shot4"
      component={ShotStill4}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={300}
      defaultProps={{ id: 1 }}
    />

    {/* Episode 3 - The Mandela Effect (Project 2) */}
    <Composition
      id="Short3"
      component={Episode3}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={totalFrames3(30)}
      defaultProps={{ captions: true, music: true }}
    />
    <Composition
      id="Shot3"
      component={ShotStill3}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={300}
      defaultProps={{ id: 1 }}
    />

    {/* Episode 2 - Kyushirataki Station (Project 1) */}
    <Composition
      id="Short2"
      component={Episode2}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={totalFrames2(30)}
      defaultProps={{ captions: true, music: true }}
    />
    <Composition
      id="Shot2"
      component={ShotStill2}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={300}
      defaultProps={{ id: 1 }}
    />

    {/* Episode 1 - Green Cabs */}
    <Composition
      id="Short1"
      component={Episode}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={totalFrames(30)}
      defaultProps={{ captions: true, music: true }}
    />
    <Composition
      id="Shot1"
      component={ShotStill}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={300}
      defaultProps={{ id: 1 }}
    />
    <Composition
      id="Long"
      component={LongEpisode}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={longFrames(30)}
    />
  </>
);
