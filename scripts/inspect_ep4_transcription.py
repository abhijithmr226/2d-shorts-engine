from faster_whisper import WhisperModel
import json

model = WhisperModel("base.en", device="cpu", compute_type="int8")
segments, info = model.transcribe(r"Editing Project\Project 3\narration1.mp3", word_timestamps=True)

all_words = []
seg_texts = []
for s in segments:
    seg_texts.append(s.text.strip())
    for w in s.words:
        all_words.append({
            "w": w.word.strip(),
            "start": round(w.start, 2),
            "end": round(w.end, 2)
        })

with open("episodes/ep4/raw_words.json", "w", encoding="utf-8") as f:
    json.dump(all_words, f, indent=2)

with open("episodes/ep4/raw_segments.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(seg_texts))

print(f"Dumped {len(all_words)} words and {len(seg_texts)} segments.")

