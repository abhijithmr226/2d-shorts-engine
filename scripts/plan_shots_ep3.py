import json

with open("Editing Project/Project 2/transcript.json", encoding="utf-8") as f:
    tr = json.load(f)

all_words = []
for seg in tr["segments"]:
    for w in seg.get("words", []):
        all_words.append({
            "w": w["word"].strip(),
            "start": w["start"],
            "end": w["end"]
        })

# Target sentences / phrases for shots:
shot_definitions = [
    # (id, start_word_idx, end_word_idx, text)
    ("Picture the Monopoly Man. The rich guy with the top hat and the mustache.", 0, 14),
    ("Now tell me: is he wearing a monocle?", 14, 22),
    ("If you said yes, you're not alone.", 22, 30),
    ("And you're wrong. He has never worn one. Not once.", 30, 41),
    ("So where did that picture in your head come from?", 41, 51),
    ("Let me tell you how this got famous.", 51, 59),
    ("In 2009, a woman named Fiona Broome was at a conference talking with strangers.", 59, 73),
    ("She brought up something she was sure of.", 73, 81),
    ("Nelson Mandela died in prison in the 1980s.", 81, 89),
    ("She even remembered details of the funeral.", 89, 96),
    ("Then something strange happened. Many of the strangers remembered it too.", 96, 107),
    ("Same story. Same details.", 107, 111),
    ("There was just one problem. Nelson Mandela did not die in prison.", 111, 123),
    ("He walked out in 1990.", 123, 128),
    ("He became president of South Africa, and he died in 2013.", 128, 138),
    ("So how did so many people share the same false memory?", 138, 149),
    ("Fiona gave it a name: the Mandela Effect.", 149, 157),
    ("Now test yourself again.", 157, 161),
    ("Pikachu. Does he have a black tip on his tail?", 161, 171),
    ("Most people say yes. Wrong.", 171, 176),
    ("His tail is yellow, with a little brown at the bottom.", 176, 186),
    ("Fruit of the Loom. The fruit pouring out of a big horn, a cornucopia.", 186, 199),
    ("Wrong again. It was never in the logo.", 199, 207),
    ("In one survey, more than half of Americans pictured it anyway.", 207, 217),
    ("Before I tell you why this happens, follow this page on Instagram and subscribe here...", 217, 230),
    ("...because the answer isn't what most people think, and you won't want to miss the next one.", 230, 246),
    ("You see, your brain doesn't record the world like a camera.", 246, 257),
    ("It fills in the blanks.", 257, 262),
    ("Some people think the monocle comes from mixing him up with Mr. Peanut, who really does wear one.", 262, 279),
    ("But here's the strange part. Researchers tested this.", 279, 287),
    ("People didn't just make random mistakes.", 287, 293),
    ("They picked the same wrong picture again and again.", 293, 302),
    ("Even some people who had never heard of the characters made the same mistakes.", 302, 315),
    ("Scientists still can't fully explain it.", 315, 321),
    ("So no, it's not proof of parallel worlds.", 321, 329),
    ("It's proof that memory is a story your brain tells you, and the story feels real.", 329, 345),
    ("Now I want to know. Which one fooled you? Monocle, black tail, or cornucopia?", 345, 359),
    ("Comment one word, and hit like if you got fooled by all three.", 359, 372),
    ("So if you pictured a monocle... it was never in the picture. It was only in your head.", 372, 397),
]

print(f"Total planned shots: {len(shot_definitions)}")
for idx, (txt, s_idx, e_idx) in enumerate(shot_definitions, 1):
    w_start = all_words[s_idx]["start"]
    w_end = all_words[e_idx - 1]["end"]
    dur = w_end - w_start
    w_slice = " ".join([w["w"] for w in all_words[s_idx:e_idx]])
    print(f"Shot {idx:02d} [{w_start:6.2f}s - {w_end:6.2f}s] ({dur:4.2f}s): {txt}")

