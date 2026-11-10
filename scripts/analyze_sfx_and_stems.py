import subprocess
import os
import glob
import numpy as np

def analyze_audio_track(video_path):
    wav_path = video_path.replace(".mp4", "_audio.wav")
    if not os.path.exists(wav_path):
        subprocess.run([
            "ffmpeg", "-v", "error", "-y", "-i", video_path,
            "-ar", "44100", "-ac", "1", wav_path
        ], check=True)
    
    # Read raw audio samples with numpy
    # Read 16-bit PCM wav
    import wave
    with wave.open(wav_path, "rb") as wf:
        n_samples = wf.getnframes()
        sr = wf.getframerate()
        raw = wf.readframes(n_samples)
        samples = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0

    # 100ms window RMS envelope
    win = int(sr * 0.1)
    n_windows = len(samples) // win
    rms_vals = []
    for i in range(n_windows):
        chunk = samples[i * win : (i + 1) * win]
        rms = np.sqrt(np.mean(chunk**2) + 1e-12)
        rms_db = 20 * np.log10(rms)
        rms_vals.append(rms_db)
    
    rms_arr = np.array(rms_vals)
    # Speech usually sits around top 30-80% percentiles, music alone in silent pauses sits in lower 10-30%
    peak_speech_db = np.percentile(rms_arr[rms_arr > -45], 85)
    pause_music_db = np.percentile(rms_arr[rms_arr > -45], 15)
    ducking_depth_db = peak_speech_db - pause_music_db
    
    # Detect transient spikes (potential SFX like whooshes, drops, dings)
    diff = np.diff(rms_arr)
    spikes = np.where(diff > 9.0)[0] # sudden jumps > 9 dB
    sfx_times = [round((idx * win) / sr, 2) for idx in spikes]
    
    return {
        "duration_s": round(len(samples) / sr, 2),
        "peak_speech_db": round(float(peak_speech_db), 1),
        "bed_music_db": round(float(pause_music_db), 1),
        "measured_ducking_contrast_db": round(float(ducking_depth_db), 1),
        "transient_sfx_count": len(sfx_times),
        "sample_sfx_timestamps": sfx_times[:12]
    }

videos = sorted(glob.glob("ref/study_nov9/*.mp4"))
for v in videos:
    name = os.path.basename(v)
    res = analyze_audio_track(v)
    print(f"\n--- {name} ---")
    for k, val in res.items():
        print(f"  {k}: {val}")

