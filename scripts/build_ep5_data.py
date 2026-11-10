import os
import json
import re

def norm(t):
    return re.sub(r"[^a-z0-9]", "", t.lower())

def main():
    txt_path = r"Editing Project\Project 4\Narration.txt"
    raw_words_path = r"episodes\ep5\raw_words.json"
    raw_segs_path = r"episodes\ep5\raw_segments.json"
    
    with open(txt_path, "r", encoding="utf-8") as f:
        script_lines = [l.strip() for l in f if l.strip()]
        
    print(f"Loaded {len(script_lines)} lines from script.")
    
    with open(raw_words_path, "r", encoding="utf-8") as f:
        words = json.load(f)
        
    with open(raw_segs_path, "r", encoding="utf-8") as f:
        segs_info = json.load(f)
        
    total_dur = segs_info["duration"]
    print(f"Loaded {len(words)} words over {total_dur}s.")
    
    shots = []
    w_idx = 0
    total_words_count = len(words)
    
    for line_id, line in enumerate(script_lines, 1):
        line_norm_words = [norm(x) for x in line.split() if norm(x)]
        if not line_norm_words:
            continue
            
        matched_words = []
        target_norm = line_norm_words[0]
        
        # Look ahead for start of line
        found = False
        for i in range(w_idx, min(w_idx + 25, total_words_count)):
            if norm(words[i]["w"]) == target_norm:
                w_idx = i
                found = True
                break
                
        # Collect words until all line words matched
        matched_count = 0
        while w_idx < total_words_count and matched_count < len(line_norm_words):
            cur_w = words[w_idx]
            cur_norm = norm(cur_w["w"])
            if cur_norm == line_norm_words[matched_count]:
                matched_count += 1
            matched_words.append(cur_w)
            w_idx += 1
            if matched_count == len(line_norm_words):
                break
                
        if matched_words:
            shots.append({
                "id": line_id,
                "text": line,
                "start": matched_words[0]["start"],
                "end": matched_words[-1]["end"],
                "words": matched_words
            })
        else:
            print(f"Warning: could not match line {line_id}: {line}")
            
    # Fix first shot start to 0.0s for immediate hook
    if shots:
        shots[0]["start"] = 0.0
        if shots[0]["words"]:
            shots[0]["words"][0]["start"] = 0.0
            
    # Snap shot boundaries so timeline is continuous and clean
    for i in range(len(shots) - 1):
        # Extend current shot end to next shot start if gap is small
        next_start = shots[i+1]["start"]
        shots[i]["end"] = next_start
        
    # Extend last shot to total duration
    if shots:
        shots[-1]["end"] = total_dur
        
    timing_data = {
        "total": total_dur,
        "shots": shots
    }
    
    with open(r"episodes\ep5\timing.json", "w", encoding="utf-8") as f:
        json.dump(timing_data, f, indent=2, ensure_ascii=False)
        
    # Also save shots.json for reference
    with open(r"episodes\ep5\shots.json", "w", encoding="utf-8") as f:
        json.dump([{"id": s["id"], "text": s["text"]} for s in shots], f, indent=2, ensure_ascii=False)
        
    print(f"Successfully generated 26 shots in episodes/ep5/timing.json (total {total_dur}s).")

if __name__ == "__main__":
    main()

