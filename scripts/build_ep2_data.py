import json
import os

with open("Editing Project/Project 1/transcript.json", encoding="utf-8") as f:
    raw = json.load(f)

# Grouping definitions: which segment indices (0-based) belong to which shot
shot_groups = [
    [0],          # 1: People all over the world cried over this train station.
    [1],          # 2: And the story they cried about wasn't true.
    [2],          # 3: It's called Kyushirataki.
    [3],          # 4: It's in a tiny town in Hokkaido, Japan.
    [4],          # 5: No staff, one short platform, almost nobody around.
    [5],          # 6: A high school girl named Kanaharada used it every morning.
    [6],          # 7: She stood on that quiet platform, a train came, and it took her to school.
    [7, 8],       # 8: Then a post went viral. It said the station was supposed to close years ago.
    [9],          # 9: But the railway company found out about her and kept it open, just for her.
    [10],         # 10: And they'd close it the day she graduated.
    [11],         # 11: And that's exactly what happened.
    [12],         # 12: Kanah graduated in March 2016.
    [13],         # 13: The station closed in March 2016.
    [14],         # 14: News channels around the world ran the story.
    [15],         # 15: People called it the kindest thing a railway ever did.
    [16, 17],     # 16: But wait, before I tell you what really happened, follow this page on Instagram and subscribe here.
    [18, 19],     # 17: Because the real story is stranger than the viral one. And most videos never tell it.
    [20],         # 18: You see, the railway never kept that station open for her.
    [21],         # 19: In July 2015, months before the story went viral,
    [22],         # 20: the railway company announced it was closing four stations on that line.
    [23],         # 21: The reason was boring, almost nobody used them.
    [24, 25],     # 22: And the date? In Japan, train timetables change every March.
    [26],         # 23: March is also when the school year ends.
    [27],         # 24: Two things landed in the same month and the internet drew a line between them.
    [28, 29],     # 25: There's more. She wasn't riding an empty train.
    [30],         # 26: When she got on, dozens of passengers were already inside,
    [31],         # 27: mostly students from her own school.
    [32],         # 28: And she said the station simply let her sleep a little longer in the morning.
    [33],         # 29: So the station wasn't saved for her.
    [34],         # 30: It was closing quietly, like many small stations do.
    [35],         # 31: She was just the person still using it.
    [36],         # 32: That October, the building was torn down.
    [37],         # 33: The sweet story was never true, but a lot of people believed it anyway.
    [38],         # 34: So the station that stayed open for one girl never stayed open for her at all.
    [39, 40],     # 35: Here's what I can't figure out. If it was never true, why did so many of us believe it so fast?
    [41],         # 36: Tell me in the comments, I really want to know.
]

shots_data = []
timing_shots = []

for shot_id, group in enumerate(shot_groups, start=1):
    combined_words = []
    text_pieces = []
    
    first_seg = raw["segments"][group[0]]
    last_seg = raw["segments"][group[-1]]
    
    shot_start = first_seg["start"]
    shot_end = last_seg["end"]
    
    for seg_idx in group:
        seg = raw["segments"][seg_idx]
        text_pieces.append(seg["text"])
        for w in seg["words"]:
            combined_words.append({
                "w": w["word"],
                "start": w["start"],
                "end": w["end"]
            })
            
    full_shot_text = " ".join(text_pieces)
    shots_data.append({
        "id": shot_id,
        "text": full_shot_text
    })
    
    timing_shots.append({
        "id": shot_id,
        "start": shot_start,
        "end": shot_end,
        "words": combined_words
    })

os.makedirs("episodes/ep2", exist_ok=True)

with open("episodes/ep2/shots.json", "w", encoding="utf-8") as f:
    json.dump(shots_data, f, indent=2, ensure_ascii=False)

timing_data = {
    "voice": "Voice.mp3",
    "speed": 1.0,
    "total": raw["duration"],
    "shots": timing_shots
}

with open("episodes/ep2/timing.json", "w", encoding="utf-8") as f:
    json.dump(timing_data, f, indent=2, ensure_ascii=False)

# Sound design
sound_data = {
    "bpm": 104,
    "key": "D",
    "music": 0.12,
    "bedDb": 18,
    "amb": {
        "1": "wind",
        "2": "wind",
        "3": "wind",
        "4": "wind",
        "5": "wind",
        "6": "wind",
        "7": "wind",
        "8": "room",
        "9": "room",
        "10": "room",
        "11": "wind",
        "12": "wind",
        "13": "wind",
        "14": "room",
        "15": "room",
        "16": "room",
        "17": "room",
        "18": "desk",
        "19": "desk",
        "20": "desk",
        "21": "desk",
        "22": "desk",
        "23": "room",
        "24": "desk",
        "25": "wind",
        "26": "room",
        "27": "room",
        "28": "room",
        "29": "wind",
        "30": "wind",
        "31": "wind",
        "32": "wind",
        "33": "room",
        "34": "wind",
        "35": "room",
        "36": "room"
    },
    "sfx": [
        {"shot": 1, "at": 0.3, "type": "shimmer"},
        {"shot": 8, "at": 0.2, "type": "pop"},
        {"shot": 9, "at": 1.2, "type": "knock"},
        {"shot": 12, "at": 0.4, "type": "bell", "type": "shimmer"},
        {"shot": 13, "at": 0.8, "type": "thump"},
        {"shot": 16, "at": 2.5, "type": "pop"},
        {"shot": 18, "at": 0.3, "type": "thump"},
        {"shot": 22, "at": 0.4, "type": "tick"},
        {"shot": 24, "at": 1.5, "type": "pop"},
        {"shot": 26, "at": 0.5, "type": "chatter"},
        {"shot": 28, "at": 0.6, "type": "pop"},
        {"shot": 32, "at": 0.8, "type": "thump"},
        {"shot": 36, "at": 0.2, "type": "whoosh"}
    ]
}

with open("episodes/ep2/sound.json", "w", encoding="utf-8") as f:
    json.dump(sound_data, f, indent=2, ensure_ascii=False)

print(f"Generated {len(shots_data)} shots in episodes/ep2/shots.json and timing.json")

