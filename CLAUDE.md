# Animated Shorts (made with code)

This folder makes animated Shorts entirely on this computer: three.js worlds + drawn characters (Remotion), a free Kokoro voice, music made in code.
The workflow is the skill in `.claude/skills/animated-shorts/SKILL.md`. Read it before doing anything.

- Example episode: `episodes/ep1` + `src/ep1` (London's green taxi huts). Copy it for new episodes.
- Short (9:16): `npx remotion render src/index.ts Short episodes/ep1/out/episode_1.mp4 --codec=h264 --crf=18`
- Long version (16:9): composition `Long`.
- Always check stills before rendering: `node scripts/stills.mjs <shot ids>`.
- New video, new chat.
