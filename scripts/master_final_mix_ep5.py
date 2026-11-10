import subprocess
import json
import re
import shutil

def master_ep5_mix():
    mix_wav = r"public\ep5\mix.wav"
    temp_wav = r"public\ep5\mix_norm.wav"
    
    print("Pass 1: Measuring loudness on public/ep5/mix.wav...")
    cmd1 = [
        "ffmpeg", "-y", "-i", mix_wav,
        "-af", "loudnorm=I=-14:TP=-1.5:LRA=7:print_format=json",
        "-f", "null", "-"
    ]
    p1 = subprocess.Popen(cmd1, stderr=subprocess.PIPE, text=True)
    _, stderr1 = p1.communicate()
    
    json_match = re.search(r"\{[\s\S]*\}", stderr1)
    if not json_match:
        print("Failed to parse loudnorm stats")
        return
    stats = json.loads(json_match.group(0))
    print("Pre-master stats:", stats)
    
    print("Pass 2: Applying EBU R128 (-14.0 LUFS) normalization...")
    cmd2 = [
        "ffmpeg", "-y", "-i", mix_wav,
        "-af", (
            f"loudnorm=I=-14:TP=-1.5:LRA=7:"
            f"measured_I={stats['input_i']}:"
            f"measured_LRA={stats['input_lra']}:"
            f"measured_TP={stats['input_tp']}:"
            f"measured_thresh={stats['input_thresh']}:"
            f"offset={stats['target_offset']}:linear=true"
        ),
        "-ar", "48000", "-ac", "2",
        temp_wav
    ]
    subprocess.run(cmd2, check=True)
    
    shutil.move(temp_wav, mix_wav)
    print("Mastered public/ep5/mix.wav to -14.0 LUFS successfully!")

if __name__ == "__main__":
    master_ep5_mix()

