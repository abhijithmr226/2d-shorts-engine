import json
import glob
import os
from PIL import Image
import numpy as np

# Load numbers.json
with open("ref/study_nov9/measure/numbers.json", "r") as f:
    numbers = json.load(f)

print("=== MEASURED METRICS ===")
for v in numbers["videos"]:
    print(f"\nVideo: {v['video']}")
    print(f"  Duration: {v['seconds']}s | Shots: {v['shots']} | Avg Shot: {v['avg_shot_s']}s | Cuts/Min: {v['cuts_per_min']}")
    print(f"  Camera Motion: {v['camera_motion']}")
    print(f"  Shadows: RGB {v['shadow_rgb']} (Hue {v['shadow_hue']}°) | Highlights: RGB {v['highlight_rgb']} (Hue {v['highlight_hue']}°)")
    print(f"  Saturation: {v['saturation']} | Pure Black: {v['pure_black_pct']}%")

# Audio details
if os.path.exists("ref/study_nov9/audio_analysis.json"):
    with open("ref/study_nov9/audio_analysis.json", "r") as f:
        audio = json.load(f)
    print("\n=== AUDIO METRICS ===")
    for k, val in audio.items():
        print(f"\n{k}:")
        print(f"  Video: {val['video']['codec']}, {val['video']['width']}x{val['video']['height']} @ {val['video']['fps']}fps, color: {val['video']['color_space']}")
        print(f"  Audio: {val['audio']['codec']} {val['audio']['sample_rate']}Hz")

