import subprocess
import json
import glob
import os
import re

videos = sorted(glob.glob("ref/study_nov9/*.mp4"))

results = {}

for v in videos:
    name = os.path.basename(v)
    print(f"\n=== Analyzing {name} ===")
    
    # 1. ffprobe format and streams
    probe_cmd = [
        "ffprobe", "-v", "error", "-show_format", "-show_streams", "-of", "json", v
    ]
    probe_out = subprocess.run(probe_cmd, capture_output=True, text=True, check=True).stdout
    meta = json.loads(probe_out)
    
    v_stream = next((s for s in meta["streams"] if s["codec_type"] == "video"), {})
    a_stream = next((s for s in meta["streams"] if s["codec_type"] == "audio"), {})
    
    # 2. loudnorm analysis
    ln_cmd = [
        "ffmpeg", "-v", "error", "-i", v,
        "-af", "loudnorm=I=-14:TP=-1.0:print_format=json",
        "-f", "null", "-"
    ]
    p = subprocess.Popen(ln_cmd, stderr=subprocess.PIPE, text=True)
    _, stderr = p.communicate()
    
    ln_match = re.search(r"\{[\s\S]*\}", stderr)
    ln_stats = json.loads(ln_match.group(0)) if ln_match else {}
    
    # 3. Audio volume stats (mean_volume, max_volume)
    vol_cmd = [
        "ffmpeg", "-v", "error", "-i", v,
        "-af", "volumedetect",
        "-f", "null", "-"
    ]
    p_vol = subprocess.Popen(vol_cmd, stderr=subprocess.PIPE, text=True)
    _, stderr_vol = p_vol.communicate()
    
    mean_vol_m = re.search(r"mean_volume:\s*([-\d.]+)\s*dB", stderr_vol)
    max_vol_m = re.search(r"max_volume:\s*([-\d.]+)\s*dB", stderr_vol)
    
    results[name] = {
        "duration": float(meta["format"].get("duration", 0)),
        "bitrate_kbps": round(float(meta["format"].get("bit_rate", 0)) / 1000, 1),
        "video": {
            "codec": v_stream.get("codec_name"),
            "width": v_stream.get("width"),
            "height": v_stream.get("height"),
            "fps": eval(v_stream.get("r_frame_rate", "30/1")),
            "pix_fmt": v_stream.get("pix_fmt"),
            "color_space": v_stream.get("color_space") or v_stream.get("color_primaries"),
        },
        "audio": {
            "codec": a_stream.get("codec_name"),
            "sample_rate": int(a_stream.get("sample_rate", 0)),
            "channels": int(a_stream.get("channels", 0)),
            "mean_volume_db": float(mean_vol_m.group(1)) if mean_vol_m else None,
            "max_volume_db": float(max_vol_m.group(1)) if max_vol_m else None,
            "integrated_lufs": float(ln_stats.get("input_i", 0)),
            "true_peak_dbtp": float(ln_stats.get("input_tp", 0)),
            "loudness_range_lra": float(ln_stats.get("input_lra", 0)),
            "threshold_db": float(ln_stats.get("input_thresh", 0)),
        }
    }

print("\n--- SUMMARY RESULTS ---")
print(json.dumps(results, indent=2))
with open("ref/study_nov9/audio_analysis.json", "w") as f:
    json.dump(results, f, indent=2)

