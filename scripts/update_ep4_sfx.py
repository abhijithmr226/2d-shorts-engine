import json

with open("episodes/ep4/sound.json", "r", encoding="utf-8") as f:
    sound_data = json.load(f)

# Add rich cinematic SFX matching user requests
extra_sfx = [
    {"shot": 1, "at": 0.05, "type": "fast_whoosh"},
    {"shot": 2, "at": 0.08, "type": "fast_whoosh"},
    {"shot": 6, "at": 0.05, "type": "fast_whoosh"},
    {"shot": 11, "at": 0.05, "type": "fast_whoosh"},
    {"shot": 13, "at": 0.08, "type": "fast_whoosh"},
    {"shot": 13, "at": 1.2, "type": "phone_buzz"},
    {"shot": 14, "at": 0.08, "type": "fast_whoosh"},
    {"shot": 14, "at": 0.9, "type": "blip"},
    {"shot": 16, "at": 0.08, "type": "fast_whoosh"},
    {"shot": 18, "at": 0.15, "type": "reels_swipe"},
    {"shot": 18, "at": 1.1, "type": "reels_swipe"},
    {"shot": 18, "at": 2.0, "type": "pop"},
    {"shot": 19, "at": 0.15, "type": "game_coin"},
    {"shot": 19, "at": 0.7, "type": "blip"},
    {"shot": 21, "at": 0.08, "type": "fast_whoosh"},
    {"shot": 21, "at": 0.9, "type": "tick"},
    {"shot": 21, "at": 1.8, "type": "tick"},
    {"shot": 22, "at": 0.1, "type": "fast_whoosh"},
    {"shot": 22, "at": 1.1, "type": "sub_drop"},
    {"shot": 25, "at": 0.08, "type": "fast_whoosh"},
    {"shot": 27, "at": 0.08, "type": "fast_whoosh"},
    {"shot": 28, "at": 0.18, "type": "notification_ping"},
    {"shot": 28, "at": 0.85, "type": "electric_zap"},
    {"shot": 28, "at": 2.2, "type": "electric_zap"},
    {"shot": 29, "at": 0.15, "type": "notification_ping"},
    {"shot": 29, "at": 0.9, "type": "pop"},
    {"shot": 30, "at": 0.08, "type": "fast_whoosh"},
    {"shot": 32, "at": 0.08, "type": "fast_whoosh"},
    {"shot": 38, "at": 0.12, "type": "fast_whoosh"},
    {"shot": 38, "at": 0.8, "type": "click_subscribe"},
    {"shot": 38, "at": 0.85, "type": "ding"},
    {"shot": 38, "at": 1.4, "type": "shimmer"},
    {"shot": 39, "at": 0.08, "type": "fast_whoosh"},
    {"shot": 40, "at": 0.08, "type": "fast_whoosh"}
]

sound_data["sfx"].extend(extra_sfx)

with open("episodes/ep4/sound.json", "w", encoding="utf-8") as f:
    json.dump(sound_data, f, indent=2, ensure_ascii=False)

print(f"Total SFX updated to: {len(sound_data['sfx'])}")

