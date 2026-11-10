import json
import subprocess
import os

def master_audio():
    # 1. Run sound.mjs to generate mix.wav and bed.wav
    print("Running node scripts/sound.mjs ep2...")
    subprocess.run(["node", "scripts/sound.mjs", "ep2"], check=True)

    input_mix = "public/ep2/mix.wav"
    output_master = "public/ep2/mix_master.wav"

    # 2. Use ffmpeg loudnorm with target -14 LUFS, true peak -1.5 dBTP (guaranteeing <= -1.0 dBTP)
    print("Applying two-pass EBU R128 loudness normalization (-14 LUFS, <= -1.0 dBTP)...")
    # Pass 1: analyze
    p1 = subprocess.run([
        "ffmpeg", "-y", "-i", input_mix,
        "-af", "loudnorm=I=-14:TP=-1.5:LRA=7:print_format=json",
        "-f", "null", "-"
    ], capture_output=True, text=True)

    # Extract JSON output from stderr
    stderr = p1.stderr
    json_start = stderr.rfind("{")
    json_end = stderr.rfind("}") + 1
    stats = json.loads(stderr[json_start:json_end])
    print("Measured stats:", stats)

    # Pass 2: apply
    subprocess.run([
        "ffmpeg", "-y", "-i", input_mix,
        "-af", f"loudnorm=I=-14:TP=-1.5:LRA=7:measured_I={stats['input_i']}:measured_TP={stats['input_tp']}:measured_LRA={stats['input_lra']}:measured_thresh={stats['input_thresh']}:offset={stats['target_offset']}:linear=true",
        "-ar", "44100", output_master
    ], check=True)

    # Overwrite public/ep2/mix.wav with the mastered file
    os.replace(output_master, input_mix)
    print("Final mastered audio replaced public/ep2/mix.wav successfully!")

    # Verify final loudness
    verify = subprocess.run([
        "ffmpeg", "-i", input_mix,
        "-af", "loudnorm=I=-14:TP=-1.0:LRA=7:print_format=json",
        "-f", "null", "-"
    ], capture_output=True, text=True)
    v_start = verify.stderr.rfind("{")
    v_end = verify.stderr.rfind("}") + 1
    v_stats = json.loads(verify.stderr[v_start:v_end])
    print(f"VERIFIED FINAL: Integrated {v_stats['input_i']} LUFS, True Peak {v_stats['input_tp']} dBTP")

if __name__ == "__main__":
    master_audio()
