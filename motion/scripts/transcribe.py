"""Transcribe a 16 kHz mono WAV with whisper.cpp (pywhispercpp) into Remotion captions.

Usage: python3 transcribe.py <audio.wav> <captions.json> [--model small] [--language auto]

Writes word-level captions in the @remotion/captions `Caption` format
({text, startMs, endMs, timestampMs, confidence}). Each word except the first
starts with a space, as createTikTokStyleCaptions() expects.

The model is downloaded from huggingface.co on first use and cached.
Whisper has no Cebuano/Bisaya model: mixed Bisaya speech is transcribed
phonetically or as Tagalog/English, so captions need a human check.
"""

import argparse
import json
import sys


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("audio")
    ap.add_argument("out")
    ap.add_argument("--model", default="small", help="tiny, base, small, medium (bigger = better, slower)")
    ap.add_argument("--language", default="auto", help="auto, en, tl, ...")
    ap.add_argument("--threads", type=int, default=4)
    args = ap.parse_args()

    try:
        from pywhispercpp.model import Model
    except ImportError:
        print("pywhispercpp is not installed: pip install pywhispercpp", file=sys.stderr)
        return 2

    model = Model(
        args.model,
        n_threads=args.threads,
        print_progress=False,
        print_realtime=False,
        redirect_whispercpp_logs_to=None,
    )
    # One segment per word gives word-level timestamps.
    segments = model.transcribe(
        args.audio,
        language=args.language,
        token_timestamps=True,
        max_len=1,
        split_on_word=True,
    )

    captions = []
    for seg in segments:
        word = seg.text.strip()
        if not word:
            continue
        start_ms = int(seg.t0) * 10  # whisper.cpp times are in 10 ms units
        end_ms = max(start_ms + 40, int(seg.t1) * 10)
        captions.append(
            {
                "text": (" " if captions else "") + word,
                "startMs": start_ms,
                "endMs": end_ms,
                "timestampMs": (start_ms + end_ms) // 2,
                "confidence": None,
            }
        )

    with open(args.out, "w", encoding="utf-8") as fh:
        json.dump(captions, fh, ensure_ascii=False, indent=1)
    print(f"{len(captions)} words -> {args.out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
