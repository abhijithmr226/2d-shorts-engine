import os
import json
import math
from pydub import AudioSegment

def build_audio_ep5():
    with open("episodes/ep5/timing.json", "r", encoding="utf-8") as f:
        timing = json.load(f)
        
    shots = timing["shots"]
    total_ms = int(timing["total"] * 1000) + 1000
    
    print(f"Total episode length: {timing['total']}s ({total_ms}ms)")
    
    # Base stereo bed (silence)
    bed = AudioSegment.silent(duration=total_ms, frame_rate=48000).set_channels(2)
    
    sfx_dir = r"Editing Project\Project 4\Soud Effects"
    
    # Load all provided sound files
    sfx = {
        "impact": AudioSegment.from_file(os.path.join(sfx_dir, "cinematic-impact-boom.mp3")).set_frame_rate(48000).set_channels(2),
        "coin": AudioSegment.from_file(os.path.join(sfx_dir, "coin-drop.mp3")).set_frame_rate(48000).set_channels(2),
        "whoosh_deep": AudioSegment.from_file(os.path.join(sfx_dir, "deep-whoosh-cinematic.mp3")).set_frame_rate(48000).set_channels(2),
        "whoosh_fast": AudioSegment.from_file(os.path.join(sfx_dir, "whoosh-cinematic.mp3")).set_frame_rate(48000).set_channels(2),
        "whoosh_rev": AudioSegment.from_file(os.path.join(sfx_dir, "sdanezis-deep-low-end-reverse-whoosh-3-592502.mp3")).set_frame_rate(48000).set_channels(2),
        "riser": AudioSegment.from_file(os.path.join(sfx_dir, "dragon-studio-cinematic-riser-01-414574.mp3")).set_frame_rate(48000).set_channels(2),
        "register": AudioSegment.from_file(os.path.join(sfx_dir, "universfield-cash-register-open-567194.mp3")).set_frame_rate(48000).set_channels(2),
        "money_counter": AudioSegment.from_file(os.path.join(sfx_dir, "freesound_community-money-counter-95830.mp3")).set_frame_rate(48000).set_channels(2),
        "car": AudioSegment.from_file(os.path.join(sfx_dir, "u_sdjy4zhhbd-car-straring-sound-126708.mp3")).set_frame_rate(48000).set_channels(2),
        "footsteps": AudioSegment.from_file(os.path.join(sfx_dir, "freesound_community-footsteps-in-a-hallway-47842.mp3")).set_frame_rate(48000).set_channels(2),
        "kitchen": AudioSegment.from_file(os.path.join(sfx_dir, "audiopapkin-ambience-in-small-restaurant-kitchen-297871.mp3")).set_frame_rate(48000).set_channels(2),
        "heartbeat": AudioSegment.from_file(os.path.join(sfx_dir, "brvhrtz-heartbeat-02-225103.mp3")).set_frame_rate(48000).set_channels(2),
        "mail": AudioSegment.from_file(os.path.join(sfx_dir, "freesound_community-mail-107741.mp3")).set_frame_rate(48000).set_channels(2),
        "pen": AudioSegment.from_file(os.path.join(sfx_dir, "freesound_community-writingpensignaturepaper-102967.mp3")).set_frame_rate(48000).set_channels(2),
        "uplifting": AudioSegment.from_file(os.path.join(sfx_dir, "koiroylers-uplifting-sound-356041.mp3")).set_frame_rate(48000).set_channels(2),
        "logo": AudioSegment.from_file(os.path.join(sfx_dir, "universfield-logo-reveal-intro-352299.mp3")).set_frame_rate(48000).set_channels(2),
    }

    # Helper function to overlay at specific shot timestamp
    def overlay_sfx(shot_id, offset_sec, key, gain_db=0.0):
        s = next(x for x in shots if x["id"] == shot_id)
        pos_ms = int((s["start"] + offset_sec) * 1000)
        sound_clip = sfx[key] + gain_db
        nonlocal bed
        bed = bed.overlay(sound_clip, position=pos_ms)
        print(f"Overlay {key} (gain {gain_db:+.1f}dB) at {pos_ms/1000:.2f}s (Shot {shot_id})")

    # 1. SHOT 01 — THE MONEY HOOK (00:00 - 05.98)
    overlay_sfx(1, 0.05, "impact", gain_db=-2.0)
    overlay_sfx(1, 0.6, "coin", gain_db=-1.0)
    overlay_sfx(1, 1.4, "whoosh_deep", gain_db=-4.0)

    # 2. SHOT 02 — THE HIDDEN BUSINESS (05.98 - 13.46)
    overlay_sfx(2, 0.1, "whoosh_fast", gain_db=-4.0)
    overlay_sfx(2, 1.8, "whoosh_deep", gain_db=-3.0)

    # 3. SHOT 03 — BEFORE THE EMPIRE (13.46 - 15.66)
    overlay_sfx(3, 0.1, "whoosh_fast", gain_db=-6.0)

    # 4. SHOT 04 — RAY KROC ARRIVES (15.66 - 23.64)
    overlay_sfx(4, 0.1, "car", gain_db=-4.0)
    overlay_sfx(4, 3.8, "footsteps", gain_db=-3.0)

    # 5. SHOT 05 — SOMETHING EXTRAORDINARY (23.64 - 25.28)
    overlay_sfx(5, 0.1, "heartbeat", gain_db=-1.0)
    overlay_sfx(5, 0.6, "uplifting", gain_db=-2.0)

    # 6. SHOT 06 — THE SYSTEM (25.28 - 30.90)
    kitchen_clip = sfx["kitchen"][:5000] - 6.0
    bed = bed.overlay(kitchen_clip, position=int(shots[5]["start"] * 1000))
    overlay_sfx(6, 1.2, "register", gain_db=-3.0)
    overlay_sfx(6, 2.8, "whoosh_fast", gain_db=-5.0)

    # 7. SHOT 07 — THE EMPIRE IDEA (30.90 - 34.00)
    overlay_sfx(7, 0.1, "riser", gain_db=-4.0)
    overlay_sfx(7, 1.8, "impact", gain_db=-3.0)

    # 8. SHOT 08 — THE PROBLEM (34.00 - 35.58)
    overlay_sfx(8, 0.1, "whoosh_deep", gain_db=-4.0)

    # 9. SHOT 09 — LAND, MONEY AND RISK (35.58 - 40.40)
    overlay_sfx(9, 0.3, "money_counter", gain_db=-3.0)
    overlay_sfx(9, 2.2, "impact", gain_db=-4.0)

    # 10. SHOT 10 — HARRY SONNEBORN (40.40 - 44.42)
    overlay_sfx(10, 0.2, "mail", gain_db=-2.0)
    overlay_sfx(10, 1.6, "uplifting", gain_db=-2.0)

    # 11. SHOT 11 — THE BIG QUESTION (44.42 - 49.62)
    overlay_sfx(11, 0.4, "register", gain_db=-3.0)
    overlay_sfx(11, 2.2, "coin", gain_db=-1.0)
    overlay_sfx(11, 3.4, "whoosh_deep", gain_db=-4.0)

    # 12. SHOT 12 — THE REAL-ESTATE STRATEGY (49.62 - 53.82)
    overlay_sfx(12, 0.3, "pen", gain_db=-2.0)
    overlay_sfx(12, 2.2, "uplifting", gain_db=-3.0)

    # 13. SHOT 13 — THINK ABOUT IT (53.82 - 55.56)
    overlay_sfx(13, 0.1, "whoosh_fast", gain_db=-5.0)

    # 14. SHOT 14 — THE FRANCHISEE SELLS (55.56 - 57.84)
    overlay_sfx(14, 0.3, "register", gain_db=-3.0)

    # 15. SHOT 15 — THE COMPANY COLLECTS (57.84 - 60.46)
    overlay_sfx(15, 0.2, "coin", gain_db=-1.0)
    overlay_sfx(15, 1.2, "money_counter", gain_db=-4.0)

    # 16. SHOT 16 — TWO REVENUE STREAMS (60.46 - 63.40)
    overlay_sfx(16, 0.2, "whoosh_deep", gain_db=-4.0)
    overlay_sfx(16, 1.4, "impact", gain_db=-3.0)

    # 17. SHOT 17 — THE BIG REVEAL SETUP (63.40 - 65.00)
    overlay_sfx(17, 0.1, "whoosh_rev", gain_db=-3.0)

    # 18. SHOT 18 — $10.4 BILLION (65.00 - 73.14)
    overlay_sfx(18, 0.1, "impact", gain_db=-1.0)
    overlay_sfx(18, 1.0, "coin", gain_db=-1.0)
    overlay_sfx(18, 3.5, "uplifting", gain_db=-3.0)

    # 19. SHOT 19 — IMPORTANT DISTINCTION (73.14 - 75.48)
    overlay_sfx(19, 0.2, "whoosh_fast", gain_db=-5.0)

    # 20. SHOT 20 — THE VIEWER CONNECTION (75.48 - 78.52)
    overlay_sfx(20, 0.2, "footsteps", gain_db=-3.0)

    # 21. SHOT 21 — WHAT YOU THINK YOU'RE BUYING (78.52 - 80.66)
    overlay_sfx(21, 0.2, "whoosh_deep", gain_db=-4.0)

    # 22. SHOT 22 — THE REAL EMPIRE (80.66 - 85.90)
    overlay_sfx(22, 0.1, "uplifting", gain_db=-2.0)
    overlay_sfx(22, 2.5, "impact", gain_db=-3.0)

    # 23. SHOT 23 — THE BIGGER LESSON (85.90 - 90.36)
    overlay_sfx(23, 0.2, "register", gain_db=-3.0)
    overlay_sfx(23, 2.2, "impact", gain_db=-2.0)

    # 24. SHOT 24 — THE FINAL MESSAGE (90.36 - 93.78)
    overlay_sfx(24, 0.2, "uplifting", gain_db=-2.0)

    # 25. SHOT 25 — BEYOND HUNCH BRAND REVEAL (93.78 - 96.20)
    overlay_sfx(25, 0.1, "logo", gain_db=-1.0)

    # 26. SHOT 26 — FINAL SIGNATURE (96.20 - 97.96)
    overlay_sfx(26, 0.2, "impact", gain_db=-4.0)

    # Export bed.wav
    bed_out = r"public\ep5\bed.wav"
    bed.export(bed_out, format="wav")
    print(f"Exported soundbed to {bed_out}")

    # Now load mastered voice.wav and mix with bed
    voice = AudioSegment.from_file(r"public\ep5\voice.wav").set_frame_rate(48000).set_channels(2)
    # Master voice level
    voice = voice - 1.5
    # Blend bed under voice
    mix = bed.overlay(voice)
    mix_out = r"public\ep5\mix.wav"
    mix.export(mix_out, format="wav")
    print(f"Exported combined mix to {mix_out}")

if __name__ == "__main__":
    build_audio_ep5()
