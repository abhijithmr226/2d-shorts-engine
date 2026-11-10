import json
import re

def norm(t):
    return re.sub(r"[^a-z0-9]", "", t.lower())

with open("Editing Project/Project 4/Narration.txt", "r", encoding="utf-8") as f:
    script_lines = [l.strip() for l in f if l.strip()]

with open("episodes/ep5/raw_segments.json", "r", encoding="utf-8") as f:
    data = json.load(f)

raw_words = []
for s in data["segments"]:
    raw_words.extend(s["words"])

print(f"Loaded {len(script_lines)} script lines and {len(raw_words)} words.")

# Map each script line to words by matching sequential words
shots = []
w_idx = 0

for idx, line in enumerate(script_lines):
    line_words = [w for w in line.split() if norm(w)]
    matched = []
    
    # Advance w_idx until we match first word (or phonetic equivalent like crock -> kroc)
    def word_match(w1, w2):
        n1 = norm(w1)
        n2 = norm(w2)
        if n1 == n2:
            return True
        if (n1 == 'kroc' and n2 == 'crock') or (n1 == 'crock' and n2 == 'kroc'):
            return True
        if (n1 == '10' and n2 == '10') or (n1 == '104' and n2 == '104'):
            return True
        return False

    # Find start
    first_target = line_words[0]
    while w_idx < len(raw_words) and not word_match(raw_words[w_idx]["w"], first_target):
        w_idx += 1
        
    start_idx = w_idx
    # Consume line words
    target_idx = 0
    while w_idx < len(raw_words) and target_idx < len(line_words):
        if word_match(raw_words[w_idx]["w"], line_words[target_idx]):
            target_idx += 1
        matched.append(raw_words[w_idx])
        w_idx += 1
        if target_idx == len(line_words):
            break
            
    shot_id = idx + 1
    shot_start = matched[0]["start"] if matched else 0
    shot_end = matched[-1]["end"] if matched else 0
    
    shots.append({
        "id": shot_id,
        "text": line,
        "start": shot_start,
        "end": shot_end,
        "words": matched
    })
    print(f"Shot {shot_id}: [{shot_start:.2f} - {shot_end:.2f}] {line[:35]}... ({len(matched)} words)")

# Set first shot to 0.0s
shots[0]["start"] = 0.0
shots[0]["words"][0]["start"] = 0.0

# Chain boundaries so there are no negative gaps or dead time
for i in range(len(shots) - 1):
    next_start = shots[i+1]["start"]
    shots[i]["end"] = next_start

shots[-1]["end"] = data["duration"]

timing_data = {
    "total": data["duration"],
    "shots": shots
}

with open("episodes/ep5/timing.json", "w", encoding="utf-8") as f:
    json.dump(timing_data, f, indent=2, ensure_ascii=False)

with open("episodes/ep5/shots.json", "w", encoding="utf-8") as f:
    json.dump([{"id": s["id"], "text": s["text"]} for s in shots], f, indent=2, ensure_ascii=False)

print(f"SUCCESS: Saved {len(shots)} aligned shots to episodes/ep5/timing.json.")

