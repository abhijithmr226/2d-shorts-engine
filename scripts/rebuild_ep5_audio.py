import os
import json
import subprocess
from pydub import AudioSegment

def build_rebuilt_audio():
    with open("episodes/ep5/timing.json", "r", encoding="utf-8") as f:
        timing = json.load(f)
        
    shots = timing["shots"]
    total_ms = int(timing["total"] * 1000) + 1200
    
    print(f"Total episode length: {timing['total']}s ({total_ms}ms)")
    
    # Base stereo bed (silence)
    bed = AudioSegment.silent(duration=total_ms, frame_rate=48000).set_channels(2)
    sfx_dir = r"Editing Project\Project 4\Soud Effects"
    
    # Load all 16 provided SFX files
    sfx = {
        "impact": AudioSegment.from_file(os.path.join(sfx_dir, "cinematic-impact-boom.mp3")).set_frame_rate(48000).set_channels(2),
        "coin": AudioSegment.from_file(os.path.join(sfx_dir, "coin-drop.mp3")).set_frame_rate(48000).set_channels(2),
        "deep_whoosh": AudioSegment.from_file(os.path.join(sfx_dir, "deep-whoosh-cinematic.mp3")).set_frame_rate(48000).set_channels(2),
        "whoosh": AudioSegment.from_file(os.path.join(sfx_dir, "whoosh-cinematic.mp3")).set_frame_rate(48000).set_channels(2),
        "rev_whoosh": AudioSegment.from_file(os.path.join(sfx_dir, "sdanezis-deep-low-end-reverse-whoosh-3-592502.mp3")).set_frame_rate(48000).set_channels(2),
        "riser": AudioSegment.from_file(os.path.join(sfx_dir, "dragon-studio-cinematic-riser-01-414574.mp3")).set_frame_rate(48000).set_channels(2),
        "register": AudioSegment.from_file(os.path.join(sfx_dir, "universfield-cash-register-open-567194.mp3")).set_frame_rate(48000).set_channels(2),
        "money": AudioSegment.from_file(os.path.join(sfx_dir, "freesound_community-money-counter-95830.mp3")).set_frame_rate(48000).set_channels(2),
        "car": AudioSegment.from_file(os.path.join(sfx_dir, "u_sdjy4zhhbd-car-straring-sound-126708.mp3")).set_frame_rate(48000).set_channels(2),
        "footsteps": AudioSegment.from_file(os.path.join(sfx_dir, "freesound_community-footsteps-in-a-hallway-47842.mp3")).set_frame_rate(48000).set_channels(2),
        "kitchen": AudioSegment.from_file(os.path.join(sfx_dir, "audiopapkin-ambience-in-small-restaurant-kitchen-297871.mp3")).set_frame_rate(48000).set_channels(2),
        "heartbeat": AudioSegment.from_file(os.path.join(sfx_dir, "brvhrtz-heartbeat-02-225103.mp3")).set_frame_rate(48000).set_channels(2),
        "paper": AudioSegment.from_file(os.path.join(sfx_dir, "freesound_community-mail-107741.mp3")).set_frame_rate(48000).set_channels(2),
        "pen": AudioSegment.from_file(os.path.join(sfx_dir, "freesound_community-writingpensignaturepaper-102967.mp3")).set_frame_rate(48000).set_channels(2),
        "uplifting": AudioSegment.from_file(os.path.join(sfx_dir, "koiroylers-uplifting-sound-356041.mp3")).set_frame_rate(48000).set_channels(2),
        "logo": AudioSegment.from_file(os.path.join(sfx_dir, "universfield-logo-reveal-intro-352299.mp3")).set_frame_rate(48000).set_channels(2),
    }

    def add_cue(t_sec, sound_key, gain_db=0.0, max_dur_ms=None):
        nonlocal bed
        clip = sfx[sound_key]
        if max_dur_ms:
            clip = clip[:max_dur_ms].fade_out(min(200, max_dur_ms // 2))
        clip = clip + gain_db
        pos_ms = int(t_sec * 1000)
        bed = bed.overlay(clip, position=pos_ms)
        print(f"Cue: {sound_key} at {t_sec:.2f}s ({pos_ms}ms) with gain {gain_db:+.1f}dB")

    # Map all cues from the exact PART 5 Cue Sheet:
    # 00:00 - Coin rolls into frame: Metallic coin roll
    add_cue(0.05, "coin", gain_db=-2.0, max_dur_ms=1800)
    # 00:02 - $10 billion appears: Deep cinematic impact
    add_cue(2.20, "impact", gain_db=-1.5)
    # 00:04 - Camera moves around restaurant: Short air whoosh
    add_cue(4.20, "whoosh", gain_db=-5.0)
    # 00:07 - Ground opens: Low mechanical rumble
    add_cue(7.20, "deep_whoosh", gain_db=-3.0)
    # 00:11 - Vintage car passes: Old car engine
    add_cue(11.20, "car", gain_db=-4.0, max_dur_ms=3500)
    # 00:14 - Ray's car stops / idling
    add_cue(14.20, "car", gain_db=-5.0, max_dur_ms=2500)
    # 00:16 - Car door opens / transition
    add_cue(16.50, "whoosh", gain_db=-6.0)
    # 00:18 - Ray walks: Footsteps
    add_cue(18.20, "footsteps", gain_db=-4.0, max_dur_ms=3000)
    # 00:22 - Ray sees kitchen: Short discovery shimmer
    add_cue(22.20, "uplifting", gain_db=-3.0)
    # 00:24 - Burger hits grill: Food sizzling (kitchen ambience)
    add_cue(24.10, "kitchen", gain_db=-6.0, max_dur_ms=6500)
    # 00:26 - Fry basket moves
    add_cue(26.40, "whoosh", gain_db=-6.0)
    # 00:28 - Restaurant models multiply: soft building impacts
    add_cue(28.20, "impact", gain_db=-7.0, max_dur_ms=1000)
    # 00:30 - Buildings rise: Construction / cinematic rise
    add_cue(30.80, "riser", gain_db=-4.0)
    # 00:33 - Problem is revealed: Low suspense impact
    add_cue(33.20, "heartbeat", gain_db=-1.0)
    # 00:35 - Land plot appears
    add_cue(35.20, "whoosh", gain_db=-5.0)
    # 00:37 - Money stack appears: Banknote handling
    add_cue(37.00, "money", gain_db=-3.0, max_dur_ms=2500)
    # 00:39 - Warning symbol appears: Short impact
    add_cue(39.20, "impact", gain_db=-4.0)
    # 00:40 - Harry enters: Footsteps
    add_cue(40.50, "footsteps", gain_db=-4.0, max_dur_ms=2500)
    # 00:42 - Folder opens: Leather folder & paper movement
    add_cue(42.20, "paper", gain_db=-2.0)
    # 00:45 - Burger comparison: Cash register ding
    add_cue(45.00, "register", gain_db=-3.0)
    # 00:48 - Property comparison: Single gold coin drop
    add_cue(48.00, "coin", gain_db=-2.0)
    # 00:50 - Agreement placed: Paper slide
    add_cue(50.00, "paper", gain_db=-2.0)
    # 00:52 - Agreement signed: Pen writing
    add_cue(52.00, "pen", gain_db=-1.5, max_dur_ms=3000)
    # 00:56 - Burger handover: Wrapper rustle
    add_cue(56.00, "paper", gain_db=-5.0, max_dur_ms=1500)
    # 00:57 - Customer pays: Cash register ding
    add_cue(57.20, "register", gain_db=-3.0)
    # 00:58 - Rent stream appears: Coin flow
    add_cue(58.40, "coin", gain_db=-2.0)
    # 00:59 - Royalties stream appears: Second coin flow
    add_cue(59.80, "money", gain_db=-4.0, max_dur_ms=2000)
    # 01:01 - Two arrows appear: Two short whooshes
    add_cue(61.00, "whoosh", gain_db=-5.0)
    add_cue(61.80, "whoosh", gain_db=-5.0)
    # 01:03 - Suspense begins: Reverse whoosh and riser
    add_cue(63.20, "rev_whoosh", gain_db=-3.0)
    add_cue(63.80, "riser", gain_db=-3.5)
    # 01:05 - $10.4 billion appears: Powerful cinematic impact
    add_cue(65.20, "impact", gain_db=-1.0)
    # 01:08 - Global network illuminates: Soft electronic pulses
    add_cue(68.00, "uplifting", gain_db=-3.0)
    # 01:11 - Revenue/profit distinction: Short bass impact
    add_cue(71.40, "impact", gain_db=-5.0)
    # 01:13 - Customer walks: Footsteps
    add_cue(73.50, "footsteps", gain_db=-4.0, max_dur_ms=3000)
    # 01:16 - Restaurant door opens / whoosh
    add_cue(76.20, "whoosh", gain_db=-5.0)
    # 01:18 - Burger wrapper opens: Paper rustle
    add_cue(78.00, "paper", gain_db=-4.0)
    # 01:20 - Global network revealed: Cinematic reveal
    add_cue(80.20, "deep_whoosh", gain_db=-3.0)
    add_cue(80.80, "uplifting", gain_db=-2.5)
    # 01:25 - Product-to-asset transition: Smooth whoosh
    add_cue(85.20, "whoosh", gain_db=-4.0)
    # 01:29 - Business ecosystem appears: Soft connection sounds
    add_cue(89.50, "uplifting", gain_db=-4.0)
    # 01:33 - Logo appears: Premium logo impact and shimmer
    add_cue(93.40, "logo", gain_db=-1.0)
    # 01:35 - Final slogan appears: Soft final musical resolve
    add_cue(95.20, "uplifting", gain_db=-2.0)

    # Save SFX bed
    os.makedirs("public/ep5", exist_ok=True)
    bed.export("public/ep5/bed.wav", format="wav")
    print("Exported public/ep5/bed.wav successfully")

    # Load Voice
    voice = AudioSegment.from_file("public/ep5/voice.wav")
    print(f"Voice length: {len(voice)}ms")

    # Mix voice + SFX bed (bed ducked slightly under speech)
    mixed = voice.overlay(bed)
    raw_mix_path = "public/ep5/raw_mix.wav"
    mixed.export(raw_mix_path, format="wav")
    print("Exported public/ep5/raw_mix.wav")

    # Master to EBU R128 (-14.0 LUFS) using ffmpeg loudnorm 2-pass
    final_mix_path = "public/ep5/mix.wav"
    cmd = [
        "ffmpeg", "-y", "-i", raw_mix_path,
        "-af", "loudnorm=I=-14:LRA=7:tp=-1.0",
        "-ar", "48000", "-ac", "2",
        final_mix_path
    ]
    subprocess.run(cmd, check=True)
    print("Mastered public/ep5/mix.wav to -14.0 LUFS successfully!")

if __name__ == "__main__":
    build_rebuilt_audio()

