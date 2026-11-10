from faster_whisper import WhisperModel
import json
import os

print("Loading Whisper model...")
model = WhisperModel("base.en", device="cpu", compute_type="int8")

audio_file = "public/ep5/voice.wav"
print(f"Transcribing {audio_file} with word-level timestamps...")

segments, info = model.transcribe(audio_file, word_timestamps=True)

seg_list = []
all_words = []

for s in segments:
    words = [{"w": w.word.strip(), "start": round(w.start, 2), "end": round(w.end, 2)} for w in s.words]
    all_words.extend(words)
    seg_list.append({
        "id": s.id,
        "start": round(s.start, 2),
        "end": round(s.end, 2),
        "text": s.text.strip(),
        "words": words
    })

res = {
    "duration": round(info.duration, 2),
    "total_words": len(all_words),
    "segments": seg_list
}

with open("episodes/ep5/raw_segments.json", "w", encoding="utf-8") as f:
    json.dump(res, f, indent=2, ensure_ascii=False)

with open("episodes/ep5/raw_words.json", "w", encoding="utf-8") as f:
    json.dump(all_words, f, indent=2, ensure_ascii=False)

print(f"Transcription complete: {len(all_words)} words across {len(seg_list)} segments. Duration: {info.duration:.2f}s")

