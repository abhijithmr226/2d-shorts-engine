import json
import os

with open("Editing Project/Project 2/transcript.json", encoding="utf-8") as f:
    tr = json.load(f)

all_words = []
for seg in tr["segments"]:
    for w in seg.get("words", []):
        all_words.append({
            "w": w["word"].strip(),
            "start": round(w["start"], 3),
            "end": round(w["end"], 3)
        })

# Total 40 shots with continuous timeline
shot_plan = [
    (1, 0, 14, "Picture the Monopoly Man. The rich guy with the top hat and the mustache."),
    (2, 14, 22, "Now tell me: is he wearing a monocle?"),
    (3, 22, 30, "If you said yes, you're not alone."),
    (4, 30, 41, "And you're wrong. He has never worn one. Not once."),
    (5, 41, 51, "So where did that picture in your head come from?"),
    (6, 51, 59, "Let me tell you how this got famous."),
    (7, 59, 73, "In 2009, a woman named Fiona Broome was at a conference talking with strangers."),
    (8, 73, 81, "She brought up something she was sure of."),
    (9, 81, 89, "Nelson Mandela died in prison in the 1980s."),
    (10, 89, 96, "She even remembered details of the funeral."),
    (11, 96, 107, "Then something strange happened. Many of the strangers remembered it too."),
    (12, 107, 111, "Same story. Same details."),
    (13, 111, 123, "There was just one problem. Nelson Mandela did not die in prison."),
    (14, 123, 128, "He walked out in 1990."),
    (15, 128, 138, "He became president of South Africa, and he died in 2013."),
    (16, 138, 149, "So how did so many people share the same false memory?"),
    (17, 149, 157, "Fiona gave it a name: the Mandela Effect."),
    (18, 157, 161, "Now test yourself again."),
    (19, 161, 171, "Pikachu. Does he have a black tip on his tail?"),
    (20, 171, 176, "Most people say yes. Wrong."),
    (21, 176, 186, "His tail is yellow, with a little brown at the bottom."),
    (22, 186, 199, "Fruit of the Loom. The fruit pouring out of a big horn, a cornucopia."),
    (23, 199, 207, "Wrong again. It was never in the logo."),
    (24, 207, 217, "In one survey, more than half of Americans pictured it anyway."),
    (25, 217, 230, "Before I tell you why this happens, follow this page on Instagram and subscribe here..."),
    (26, 230, 246, "...because the answer isn't what most people think, and you won't want to miss the next one."),
    (27, 246, 257, "You see, your brain doesn't record the world like a camera."),
    (28, 257, 262, "It fills in the blanks."),
    (29, 262, 279, "Some people think the monocle comes from mixing him up with Mr. Peanut, who really does wear one."),
    (30, 279, 287, "But here's the strange part. Researchers tested this."),
    (31, 287, 293, "People didn't just make random mistakes."),
    (32, 293, 302, "They picked the same wrong picture again and again."),
    (33, 302, 315, "Even some people who had never heard of the characters made the same mistakes."),
    (34, 315, 321, "Scientists still can't fully explain it."),
    (35, 321, 329, "So no, it's not proof of parallel worlds."),
    (36, 329, 345, "It's proof that memory is a story your brain tells you, and the story feels real."),
    (37, 345, 359, "Now I want to know. Which one fooled you? Monocle, black tail, or cornucopia?"),
    (38, 359, 372, "Comment one word, and hit like if you got fooled by all three."),
    (39, 372, 387, "So if you pictured a monocle... it was never in the picture."),
    (40, 387, 397, "It was only in your head."),
]

# Continuous shot boundaries
shots_data = []
timing_shots = []

total_duration = round(tr["duration"], 3)

for i, (sid, s_w, e_w, clean_text) in enumerate(shot_plan):
    w_list = all_words[s_w:e_w]
    raw_start = w_list[0]["start"]
    raw_end = w_list[-1]["end"]
    
    # Connect boundaries continuously
    if i == 0:
        s_start = 0.0
    else:
        prev_end = timing_shots[-1]["end"]
        # Use midpoint or raw_start
        s_start = prev_end
        
    if i == len(shot_plan) - 1:
        s_end = total_duration
    else:
        next_raw_start = all_words[shot_plan[i+1][1]]["start"]
        s_end = round((raw_end + next_raw_start) / 2.0, 3)
        if s_end <= s_start:
            s_end = round(s_start + (raw_end - raw_start), 3)

    shots_data.append({
        "id": sid,
        "text": clean_text
    })
    
    timing_shots.append({
        "id": sid,
        "start": s_start,
        "end": s_end,
        "words": [{"w": w["w"], "start": w["start"], "end": w["end"]} for w in w_list]
    })

os.makedirs("episodes/ep3", exist_ok=True)

with open("episodes/ep3/shots.json", "w", encoding="utf-8") as f:
    json.dump(shots_data, f, indent=2, ensure_ascii=False)

timing_data = {
    "voice": "voice.wav",
    "speed": 1.0,
    "total": total_duration,
    "shots": timing_shots
}

with open("episodes/ep3/timing.json", "w", encoding="utf-8") as f:
    json.dump(timing_data, f, indent=2, ensure_ascii=False)

print(f"Generated 40 continuous shots in episodes/ep3/shots.json and timing.json!")
print(f"Total duration: {total_duration}s")

