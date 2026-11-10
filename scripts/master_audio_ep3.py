import subprocess
import json
import os
import re

def master_audio():
    src_mp3 = r"Editing Project\Project 2\narration.mp3"
    out_wav = r"public\ep3\voice.wav"
    
    print("Pass 1: Measuring loudness...")
    cmd1 = [
        "ffmpeg", "-y", "-i", src_mp3,
        "-af", "loudnorm=I=-14:TP=-1.5:LRA=7:print_format=json",
        "-f", "null", "-"
    ]
    p1 = subprocess.Popen(cmd1, stderr=subprocess.PIPE, text=True)
    _, stderr1 = p1.communicate()
    
    # Parse json from stderr
    json_match = re.search(r"\{[\s\S]*\}", stderr1)
    if not json_match:
        print("Failed to parse loudnorm json stats")
        return
    stats = json.loads(json_match.group(0))
    print("Loudness stats:", stats)
    
    print("Pass 2: Normalizing audio...")
    cmd2 = [
        "ffmpeg", "-y", "-i", src_mp3,
        "-af", (
            f"loudnorm=I=-14:TP=-1.5:LRA=7:"
            f"measured_I={stats['input_i']}:"
            f"measured_LRA={stats['input_lra']}:"
            f"measured_TP={stats['input_tp']}:"
            f"measured_thresh={stats['input_thresh']}:"
            f"offset={stats['target_offset']}:linear=true"
        ),
        "-ar", "44100", "-ac", "1",
        out_wav
    ]
    subprocess.run(cmd2, check=True)
    print("Voice mastered to:", out_wav)

if __name__ == "__main__":
    master_audio()
