from faster_whisper import WhisperModel
import glob
import os
import json

model = WhisperModel("base.en", device="cpu", compute_type="int8")
videos = sorted(glob.glob("ref/study_nov9/*.mp4"))

for v in videos:
    name = os.path.splitext(os.path.basename(v))[0]
    out_json = f"ref/study_nov9/{name}_transcript.json"
    print(f"Transcribing {name}...")
    segments, info = model.transcribe(v, word_timestamps=True)
    
    seg_list = []
    total_words = 0
    for s in segments:
        words = [{"w": w.word.strip(), "start": round(w.start, 2), "end": round(w.end, 2)} for w in s.words]
        total_words += len(words)
        seg_list.append({
            "id": s.id,
            "start": round(s.start, 2),
            "end": round(s.end, 2),
            "text": s.text.strip(),
            "words": words
        })
    
    res = {
        "video": name,
        "duration": round(info.duration, 2),
        "total_words": total_words,
        "words_per_minute": round((total_words / info.duration) * 60, 1),
        "words_per_second": round(total_words / info.duration, 2),
        "segments": seg_list
    }
    
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(res, f, indent=2, ensure_ascii=False)
    print(f"-> {name}: {total_words} words, {res['words_per_minute']} WPM ({res['words_per_second']} words/s)")
