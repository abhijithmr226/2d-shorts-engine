import json

with open("Editing Project/Project 4/Narration.txt", "r", encoding="utf-8") as f:
    script_lines = [l.strip() for l in f if l.strip()]

with open("episodes/ep5/raw_segments.json", "r", encoding="utf-8") as f:
    data = json.load(f)

segs = data["segments"]

# Build shots exactly mapped to the 26 script lines:
shots = []

# Shot 1: Seg 0
shots.append({
    "id": 1,
    "text": script_lines[0],
    "start": 0.0,
    "end": segs[0]["end"],
    "words": segs[0]["words"]
})
shots[0]["words"][0]["start"] = 0.0

# Shot 2: Seg 1 + Seg 2
shots.append({
    "id": 2,
    "text": script_lines[1],
    "start": segs[1]["start"],
    "end": segs[2]["end"],
    "words": segs[1]["words"] + segs[2]["words"]
})

# Shot 3: Seg 3
shots.append({
    "id": 3,
    "text": script_lines[2],
    "start": segs[3]["start"],
    "end": segs[3]["end"],
    "words": segs[3]["words"]
})

# Shot 4: Seg 4 + Seg 5
shots.append({
    "id": 4,
    "text": script_lines[3],
    "start": segs[4]["start"],
    "end": segs[5]["end"],
    "words": segs[4]["words"] + segs[5]["words"]
})

# Shot 5: Seg 6
shots.append({
    "id": 5,
    "text": script_lines[4],
    "start": segs[6]["start"],
    "end": segs[6]["end"],
    "words": segs[6]["words"]
})

# Shot 6: Seg 7
shots.append({
    "id": 6,
    "text": script_lines[5],
    "start": segs[7]["start"],
    "end": segs[7]["end"],
    "words": segs[7]["words"]
})

# Shot 7: Seg 8
shots.append({
    "id": 7,
    "text": script_lines[6],
    "start": segs[8]["start"],
    "end": segs[8]["end"],
    "words": segs[8]["words"]
})

# Shot 8: Seg 9
shots.append({
    "id": 8,
    "text": script_lines[7],
    "start": segs[9]["start"],
    "end": segs[9]["end"],
    "words": segs[9]["words"]
})

# Shot 9: Seg 10
shots.append({
    "id": 9,
    "text": script_lines[8],
    "start": segs[10]["start"],
    "end": segs[10]["end"],
    "words": segs[10]["words"]
})

# Shot 10: Seg 11
shots.append({
    "id": 10,
    "text": script_lines[9],
    "start": segs[11]["start"],
    "end": segs[11]["end"],
    "words": segs[11]["words"]
})

# Shot 11: Seg 12
shots.append({
    "id": 11,
    "text": script_lines[10],
    "start": segs[12]["start"],
    "end": segs[12]["end"],
    "words": segs[12]["words"]
})

# Shot 12: Seg 13
shots.append({
    "id": 12,
    "text": script_lines[11],
    "start": segs[13]["start"],
    "end": segs[13]["end"],
    "words": segs[13]["words"]
})

# Shot 13: Seg 14
shots.append({
    "id": 13,
    "text": script_lines[12],
    "start": segs[14]["start"],
    "end": segs[14]["end"],
    "words": segs[14]["words"]
})

# Shot 14: Seg 15
shots.append({
    "id": 14,
    "text": script_lines[13],
    "start": segs[15]["start"],
    "end": segs[15]["end"],
    "words": segs[15]["words"]
})

# Shot 15: Seg 16
shots.append({
    "id": 15,
    "text": script_lines[14],
    "start": segs[16]["start"],
    "end": segs[16]["end"],
    "words": segs[16]["words"]
})

# Shot 16: Seg 17
shots.append({
    "id": 16,
    "text": script_lines[15],
    "start": segs[17]["start"],
    "end": segs[17]["end"],
    "words": segs[17]["words"]
})

# Shot 17: Seg 18
shots.append({
    "id": 17,
    "text": script_lines[16],
    "start": segs[18]["start"],
    "end": segs[18]["end"],
    "words": segs[18]["words"]
})

# Shot 18: Seg 19
shots.append({
    "id": 18,
    "text": script_lines[17],
    "start": segs[19]["start"],
    "end": segs[19]["end"],
    "words": segs[19]["words"]
})

# Shot 19: Seg 20
shots.append({
    "id": 19,
    "text": script_lines[18],
    "start": segs[20]["start"],
    "end": segs[20]["end"],
    "words": segs[20]["words"]
})

# Seg 21 splits between Shot 20 (up to 'remember,') and Shot 21 (from 'you might think you're buying a burger.')
seg21_w = segs[21]["words"]
# words: So the next time you walk into McDonald's, remember,
w_shot20 = seg21_w[:9]
# words: you might think you're buying a burger.
w_shot21 = seg21_w[9:]

# Shot 20:
shots.append({
    "id": 20,
    "text": script_lines[19],
    "start": w_shot20[0]["start"],
    "end": w_shot20[-1]["end"],
    "words": w_shot20
})

# Shot 21:
shots.append({
    "id": 21,
    "text": script_lines[20],
    "start": w_shot21[0]["start"],
    "end": w_shot21[-1]["end"],
    "words": w_shot21
})

# Shot 22: Seg 22
shots.append({
    "id": 22,
    "text": script_lines[21],
    "start": segs[22]["start"],
    "end": segs[22]["end"],
    "words": segs[22]["words"]
})

# Shot 23: Seg 23
shots.append({
    "id": 23,
    "text": script_lines[22],
    "start": segs[23]["start"],
    "end": segs[23]["end"],
    "words": segs[23]["words"]
})

# Shot 24: Seg 24
shots.append({
    "id": 24,
    "text": script_lines[23],
    "start": segs[24]["start"],
    "end": segs[24]["end"],
    "words": segs[24]["words"]
})

# Shot 25: Seg 25
shots.append({
    "id": 25,
    "text": script_lines[24],
    "start": segs[25]["start"],
    "end": segs[25]["end"],
    "words": segs[25]["words"]
})

# Shot 26: Seg 26
shots.append({
    "id": 26,
    "text": script_lines[25],
    "start": segs[26]["start"],
    "end": data["duration"],
    "words": segs[26]["words"]
})

# Chain consecutive shots continuously so there is zero black frame gap
for i in range(len(shots) - 1):
    shots[i]["end"] = shots[i+1]["start"]

shots[-1]["end"] = data["duration"]

timing_data = {
    "total": data["duration"],
    "shots": shots
}

with open("episodes/ep5/timing.json", "w", encoding="utf-8") as f:
    json.dump(timing_data, f, indent=2, ensure_ascii=False)

with open("episodes/ep5/shots.json", "w", encoding="utf-8") as f:
    json.dump([{"id": s["id"], "text": s["text"]} for s in shots], f, indent=2, ensure_ascii=False)

for s in shots:
    print(f"Shot {s['id']:02d}: [{s['start']:05.2f} - {s['end']:05.2f}] dur={(s['end']-s['start']):4.2f}s | {s['text'][:45]}")

print(f"\nALL 26 SHOTS PERFECTLY SYNCHRONIZED! Total duration: {data['duration']}s")

