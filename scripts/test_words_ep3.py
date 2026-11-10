import json
import re

with open("Editing Project/Project 2/transcript.json", encoding="utf-8") as f:
    tr = json.load(f)

# Collect all word objects in chronological sequence
all_words = []
for seg in tr["segments"]:
    for w in seg.get("words", []):
        all_words.append({
            "w": w["word"].strip(),
            "start": w["start"],
            "end": w["end"]
        })

print(f"Total words: {len(all_words)}")
for i, w in enumerate(all_words[:25]):
    print(f"{i:03d}: [{w['start']:.2f} - {w['end']:.2f}] {w['w']}")

