import os
import json
import subprocess
from faster_whisper import WhisperModel

def main():
    audio_path = r"Editing Project\Project 3\narration1.mp3"
    txt_path = r"Editing Project\Project 3\narration.txt"
    
    with open(txt_path, "r", encoding="utf-8") as f:
        script_lines = [l.strip() for l in f if l.strip()]
        
    print(f"Loaded {len(script_lines)} lines from script.")
    
    # 1. Transcribe audio with base.en model
    print("Transcribing audio with faster-whisper...")
    model = WhisperModel("base.en", device="cpu", compute_type="int8")
    segments, info = model.transcribe(audio_path, word_timestamps=True)
    
    words = []
    for s in segments:
        for w in s.words:
            clean = w.word.strip()
            if clean:
                words.append({
                    "w": clean,
                    "start": round(w.start, 2),
                    "end": round(w.end, 2)
                })
                
    print(f"Extracted {len(words)} words over {info.duration:.2f}s.")
    
    # Normalize text for alignment
    import re
    def norm(t):
        return re.sub(r"[^a-z0-9]", "", t.lower())
        
    shots = []
    w_idx = 0
    total_words_count = len(words)
    
    for line_id, line in enumerate(script_lines, 1):
        line_norm_words = [norm(x) for x in line.split() if norm(x)]
        if not line_norm_words:
            continue
            
        matched_words = []
        start_w = w_idx
        
        target_norm = line_norm_words[0]
        # find start of line
        found = False
        for i in range(w_idx, min(w_idx + 15, total_words_count)):
            if norm(words[i]["w"]) == target_norm:
                w_idx = i
                found = True
                break
                
        # collect words until all line words matched or next line begins
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
            
    # Fix first shot start to 0.0s for instant hook
    if shots:
        shots[0]["start"] = 0.0
        if shots[0]["words"]:
            shots[0]["words"][0]["start"] = 0.0
            
    # Ensure continuous timeline without gaps
    for i in range(len(shots) - 1):
        if shots[i]["end"] > shots[i+1]["start"]:
            shots[i]["end"] = shots[i+1]["start"]
            
    total_dur = round(info.duration, 2)
    timing_data = {
        "total": total_dur,
        "shots": shots
    }
    
    os.makedirs(r"episodes\ep4", exist_ok=True)
    with open(r"episodes\ep4\timing.json", "w", encoding="utf-8") as f:
        json.dump(timing_data, f, indent=2, ensure_ascii=False)
        
    print(f"Saved {len(shots)} aligned shots to episodes/ep4/timing.json (total {total_dur}s).")
    
    # 2. Extract and master voice.wav with 85Hz HPF and subtle presence
    voice_wav = r"public\ep4\voice.wav"
    os.makedirs(r"public\ep4", exist_ok=True)
    cmd = [
        "ffmpeg", "-y", "-i", audio_path,
        "-af", "highpass=f=85,equalizer=f=3000:t=q:w=1.2:g=1.5",
        "-ar", "44100", "-ac", "1", voice_wav
    ]
    subprocess.run(cmd, check=True)
    print("Exported mastered dialogue to public/ep4/voice.wav.")

if __name__ == "__main__":
    main()

