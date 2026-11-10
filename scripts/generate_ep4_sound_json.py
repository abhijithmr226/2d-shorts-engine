import json

with open("episodes/ep4/timing.json", "r", encoding="utf-8") as f:
    timing = json.load(f)

# 1. shots.json
shots = []
for s in timing["shots"]:
    shots.append({
        "id": s["id"],
        "text": s["text"]
    })

with open("episodes/ep4/shots.json", "w", encoding="utf-8") as f:
    json.dump(shots, f, indent=2, ensure_ascii=False)

# 2. sound.json
# Ducking to 24 dB under voice (matches reference Short benchmark of -24.5 dB RMS, no irritating volume)
sound_data = {
    "bpm": 104,
    "key": "D",
    "music": 0.08,
    "bedDb": 24,
    "amb": {
        "1": "room",
        "2": "room",
        "3": "room",
        "6": "desk",
        "7": "desk",
        "11": "room",
        "12": "room",
        "13": "room",
        "16": "desk",
        "20": "desk",
        "27": "room",
        "28": "room",
        "32": "desk",
        "33": "desk",
        "34": "desk",
        "35": "desk",
        "39": "room",
        "40": "room"
    },
    "sfx": [
        {"shot": 1, "at": 0.05, "type": "whip"},
        {"shot": 1, "at": 0.2, "type": "phone_buzz"},
        {"shot": 2, "at": 0.2, "type": "tick"},
        {"shot": 2, "at": 0.6, "type": "blip"},
        {"shot": 3, "at": 0.3, "type": "wood_knock"},
        {"shot": 4, "at": 0.2, "type": "sub_drop"},
        {"shot": 5, "at": 0.3, "type": "card_slide"},
        {"shot": 5, "at": 2.5, "type": "blip"},
        {"shot": 5, "at": 4.2, "type": "ding"},
        {"shot": 6, "at": 0.1, "type": "whip"},
        {"shot": 6, "at": 0.8, "type": "phone_buzz"},
        {"shot": 7, "at": 0.5, "type": "phone_buzz"},
        {"shot": 7, "at": 2.6, "type": "whoosh"},
        {"shot": 8, "at": 0.2, "type": "sub_drop"},
        {"shot": 9, "at": 0.3, "type": "blip"},
        {"shot": 10, "at": 0.2, "type": "stamp"},
        {"shot": 10, "at": 1.6, "type": "ding"},
        {"shot": 11, "at": 0.1, "type": "whip"},
        {"shot": 12, "at": 0.3, "type": "tick"},
        {"shot": 12, "at": 1.4, "type": "blip"},
        {"shot": 13, "at": 0.4, "type": "wood_knock"},
        {"shot": 13, "at": 2.2, "type": "whoosh"},
        {"shot": 14, "at": 0.2, "type": "stamp"},
        {"shot": 14, "at": 0.9, "type": "ding"},
        {"shot": 15, "at": 0.1, "type": "whip"},
        {"shot": 16, "at": 0.3, "type": "card_slide"},
        {"shot": 16, "at": 3.2, "type": "sub_drop"},
        {"shot": 17, "at": 0.1, "type": "wood_knock"},
        {"shot": 18, "at": 0.3, "type": "tick"},
        {"shot": 18, "at": 1.5, "type": "tick"},
        {"shot": 19, "at": 0.2, "type": "stamp"},
        {"shot": 19, "at": 0.8, "type": "ding"},
        {"shot": 20, "at": 0.1, "type": "whip"},
        {"shot": 21, "at": 0.3, "type": "tick"},
        {"shot": 22, "at": 0.2, "type": "blip"},
        {"shot": 22, "at": 0.9, "type": "blip"},
        {"shot": 22, "at": 1.5, "type": "blip"},
        {"shot": 23, "at": 0.1, "type": "stamp"},
        {"shot": 24, "at": 0.3, "type": "whoosh"},
        {"shot": 25, "at": 0.2, "type": "sub_drop"},
        {"shot": 25, "at": 2.2, "type": "card_slide"},
        {"shot": 26, "at": 0.2, "type": "stamp"},
        {"shot": 26, "at": 1.1, "type": "ding"},
        {"shot": 27, "at": 0.1, "type": "whip"},
        {"shot": 28, "at": 0.3, "type": "shimmer"},
        {"shot": 29, "at": 0.2, "type": "blip"},
        {"shot": 29, "at": 0.8, "type": "pop"},
        {"shot": 29, "at": 1.4, "type": "ding"},
        {"shot": 30, "at": 0.3, "type": "card_slide"},
        {"shot": 31, "at": 0.4, "type": "phone_buzz"},
        {"shot": 32, "at": 0.2, "type": "stamp"},
        {"shot": 33, "at": 0.3, "type": "ding"},
        {"shot": 33, "at": 0.15, "type": "card_slide"},
        {"shot": 34, "at": 0.3, "type": "wood_knock"},
        {"shot": 34, "at": 0.15, "type": "card_slide"},
        {"shot": 35, "at": 0.2, "type": "sub_drop"},
        {"shot": 35, "at": 0.15, "type": "card_slide"},
        {"shot": 36, "at": 0.2, "type": "whoosh"},
        {"shot": 37, "at": 0.3, "type": "blip"},
        {"shot": 38, "at": 0.4, "type": "shimmer"},
        {"shot": 38, "at": 2.0, "type": "pop"},
        {"shot": 39, "at": 0.3, "type": "stamp"},
        {"shot": 39, "at": 1.5, "type": "card_slide"},
        {"shot": 40, "at": 0.1, "type": "whip"},
        {"shot": 41, "at": 0.2, "type": "phone_buzz"},
        {"shot": 42, "at": 0.3, "type": "sub_drop"},
        {"shot": 42, "at": 0.9, "type": "tick"}
    ]
}

with open("episodes/ep4/sound.json", "w", encoding="utf-8") as f:
    json.dump(sound_data, f, indent=2, ensure_ascii=False)

print(f"Generated shots.json (42 shots) and sound.json ({len(sound_data['sfx'])} SFX).")

