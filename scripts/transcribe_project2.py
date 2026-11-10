import json
from faster_whisper import WhisperModel

def transcribe():
    audio_path = r"Editing Project\Project 2\narration.mp3"
    print("Loading whisper model...")
    model = WhisperModel("base", device="cpu", compute_type="int8")
    segments, info = model.transcribe(audio_path, word_timestamps=True)
    print(f"Detected language '{info.language}' with probability {info.language_probability:.2f}")

    all_segments = []
    full_text_list = []
    for s in segments:
        words = []
        if s.words:
            for w in s.words:
                words.append({
                    "word": w.word.strip(),
                    "start": round(w.start, 3),
                    "end": round(w.end, 3),
                    "probability": round(w.probability, 3)
                })
        all_segments.append({
            "start": round(s.start, 3),
            "end": round(s.end, 3),
            "text": s.text.strip(),
            "words": words
        })
        full_text_list.append(s.text.strip())

    out_file = r"Editing Project\Project 2\transcript.json"
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump({
            "language": info.language,
            "duration": round(info.duration, 3),
            "full_text": " ".join(full_text_list),
            "segments": all_segments
        }, f, indent=2, ensure_ascii=False)

    print(f"Saved {len(all_segments)} segments to {out_file}")
    print("\n--- TRANSCRIPT PREVIEW ---")
    for s in all_segments[:10]:
        print(f"[{s['start']}s -> {s['end']}s]: {s['text']}")

if __name__ == "__main__":
    transcribe()

