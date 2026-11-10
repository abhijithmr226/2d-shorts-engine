import json
import re

with open("episodes/ep4/raw_words.json", "r", encoding="utf-8") as f:
    words = json.load(f)

with open(r"Editing Project\Project 3\narration.txt", "r", encoding="utf-8") as f:
    script_lines = [l.strip() for l in f if l.strip()]

def norm(text):
    t = text.lower()
    t = t.replace("zero", "0").replace("one", "1").replace("two", "2").replace("three", "3")
    t = t.replace("four", "4").replace("five", "5").replace("six", "6").replace("seven", "7")
    t = t.replace("eight", "8").replace("nine", "9").replace("ten", "10")
    t = t.replace("126", "2026") # Whisper misheard 2026 as 126
    return re.sub(r"[^a-z0-9]", "", t)

# Build normalized tokens for words
word_tokens = [norm(w["w"]) for w in words]

shots = []
w_idx = 0
total_w = len(words)

for line_idx, line in enumerate(script_lines):
    line_tokens = [norm(w) for w in line.split() if norm(w)]
    if not line_tokens:
        continue

    # Find where this line starts
    best_start = w_idx
    # Look ahead up to 10 words for the first 1-2 tokens of this line
    for i in range(w_idx, min(w_idx + 10, total_w)):
        if word_tokens[i] == line_tokens[0] or (len(line_tokens[0]) > 3 and word_tokens[i].startswith(line_tokens[0][:3])):
            best_start = i
            break
            
    # Now find where this line ends (which is where the next line starts)
    if line_idx == len(script_lines) - 1:
        end_idx = total_w
    else:
        next_line = script_lines[line_idx + 1]
        next_tokens = [norm(w) for w in next_line.split() if norm(w)]
        t0 = next_tokens[0]
        t1 = next_tokens[1] if len(next_tokens) > 1 else None
        
        # Start searching after a reasonable minimum length for the current line
        min_words = max(1, len(line_tokens) - 2)
        end_idx = min(best_start + len(line_tokens), total_w)
        
        for j in range(best_start + min_words, min(best_start + len(line_tokens) + 12, total_w)):
            match0 = (word_tokens[j] == t0 or (len(t0) > 3 and word_tokens[j].startswith(t0[:3])))
            if match0:
                if t1:
                    if j + 1 < total_w and (word_tokens[j+1] == t1 or (len(t1) > 3 and word_tokens[j+1].startswith(t1[:3]))):
                        end_idx = j
                        break
                else:
                    end_idx = j
                    break

    matched = words[best_start:end_idx]
    w_idx = end_idx
    
    shots.append({
        "id": len(shots) + 1,
        "line_idx": line_idx + 1,
        "text": line,
        "start": matched[0]["start"] if matched else 0.0,
        "end": matched[-1]["end"] if matched else 0.0,
        "words": matched
    })

# Snap first shot start to 0.0s for instant hook
if shots:
    shots[0]["start"] = 0.0
    if shots[0]["words"]:
        shots[0]["words"][0]["start"] = 0.0

# Make shot cuts contiguous without gaps
for i in range(len(shots) - 1):
    shots[i]["end"] = shots[i+1]["start"]
    if shots[i]["words"]:
        shots[i]["words"][-1]["end"] = min(shots[i]["words"][-1]["end"], shots[i]["end"])

# Last shot padding (0.5s after last spoken word)
shots[-1]["end"] = round(words[-1]["end"] + 0.5, 2)
total_dur = shots[-1]["end"]

timing_json = {
    "total": round(total_dur, 2),
    "shots": shots
}

with open("episodes/ep4/timing.json", "w", encoding="utf-8") as f:
    json.dump(timing_json, f, indent=2, ensure_ascii=False)

print(f"Successfully aligned all {len(shots)} lines into continuous shots in episodes/ep4/timing.json (total {total_dur:.2f}s).")
for s in shots:
    w_count = len(s['words'])
    print(f"Shot {s['id']:02d}: [{s['start']:6.2f}s - {s['end']:6.2f}s] ({s['end'] - s['start']:4.2f}s, {w_count:2d} words) | {s['text']}")
