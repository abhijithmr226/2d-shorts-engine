import json

with open("Editing Project/Project 1/transcript.json", encoding="utf-8") as f:
    d = json.load(f)

print(f"Total duration: {d['duration']}s, Total segments: {len(d['segments'])}")
for i, s in enumerate(d["segments"], start=1):
    dur = s["end"] - s["start"]
    print(f"{i:02d}: [{s['start']:6.2f}s -> {s['end']:6.2f}s] ({dur:4.2f}s) {s['text']}")

