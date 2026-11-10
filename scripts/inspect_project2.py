import json

with open("Editing Project/Project 2/transcript.json", encoding="utf-8") as f:
    d = json.load(f)

print(f"Total duration: {d['duration']}s")
print(f"Segments count: {len(d['segments'])}")
for i, s in enumerate(d['segments']):
    print(f"[{i:02d}] {s['start']:6.2f}s -> {s['end']:6.2f}s: {s['text']}")

