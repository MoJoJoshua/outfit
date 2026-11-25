// Prepare a talking-head video for editing.
//
//   npm run new -- <path/to/video> [slug] [--model small] [--language auto] [--no-transcribe]
//
// Creates public/videos/<slug>/ with:
//   source.mp4        the footage (copied, or converted to H.264 if needed)
//   captions.json     word-level captions (Whisper)
//   transcript.txt    readable transcript with timestamps, for planning
//   plan.json         a starter plan: captions + end card, no overlays yet
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

const args = process.argv.slice(2);
const flag = (name, fallback) => {
	const i = args.indexOf(`--${name}`);
	if (i === -1) return fallback;
	const v = args[i + 1];
	args.splice(i, 2);
	return v;
};
const noTranscribe = args.includes("--no-transcribe");
if (noTranscribe) args.splice(args.indexOf("--no-transcribe"), 1);
const model = flag("model", "small");
const language = flag("language", "auto");
const [input, slugArg] = args;
if (!input || !fs.existsSync(input)) {
	console.error("Usage: npm run new -- <path/to/video> [slug] [--model small] [--language auto] [--no-transcribe]");
	process.exit(1);
}

const slug = (slugArg ?? path.basename(input, path.extname(input)))
	.toLowerCase()
	.replace(/[^a-z0-9]+/g, "-")
	.replace(/^-|-$/g, "");
const dir = path.join(root, "public", "videos", slug);
fs.mkdirSync(dir, { recursive: true });

const ff = (a) => execFileSync("ffmpeg", ["-v", "error", "-y", ...a], { stdio: "inherit" });
const probe = (file) =>
	JSON.parse(
		execFileSync("ffprobe", ["-v", "error", "-print_format", "json", "-show_streams", "-show_format", file]).toString(),
	);

// 1. Footage: keep H.264 MP4 as-is, convert anything else (HEVC from iPhones, MOV, ...).
const info = probe(input);
const v = info.streams.find((s) => s.codec_type === "video");
if (!v) throw new Error("No video stream found");
const target = path.join(dir, "source.mp4");
if (path.extname(input).toLowerCase() === ".mp4" && v.codec_name === "h264") {
	fs.copyFileSync(input, target);
} else {
	console.log(`Converting ${v.codec_name} to H.264...`);
	ff(["-i", input, "-c:v", "libx264", "-crf", "17", "-preset", "fast", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "256k", "-movflags", "+faststart", target]);
}

// Phone videos often store portrait as landscape + rotation metadata.
const out = probe(target);
const ov = out.streams.find((s) => s.codec_type === "video");
const rotation = Math.abs(Number(ov.tags?.rotate ?? ov.side_data_list?.find((d) => d.rotation !== undefined)?.rotation ?? 0));
const [w, h] = rotation === 90 || rotation === 270 ? [ov.height, ov.width] : [ov.width, ov.height];
const [num, den] = ov.r_frame_rate.split("/").map(Number);
const fps = Math.round((num / (den || 1)) * 100) / 100;
const duration = Math.round(Number(out.format.duration) * 100) / 100;

// 2. Transcribe.
const wav = path.join(dir, "audio.wav");
let words = 0;
if (!noTranscribe) {
	ff(["-i", target, "-vn", "-ac", "1", "-ar", "16000", "-c:a", "pcm_s16le", wav]);
	const r = spawnSync("python3", [path.join(here, "transcribe.py"), wav, path.join(dir, "captions.json"), "--model", model, "--language", language], {
		stdio: "inherit",
	});
	fs.rmSync(wav, { force: true });
	if (r.status !== 0) {
		console.error("\nTranscription failed. The video is imported; captions are off in plan.json.");
		console.error("Check: pip install pywhispercpp, and that huggingface.co is reachable for the model download.");
	}
}
const captionsFile = path.join(dir, "captions.json");
const hasCaptions = fs.existsSync(captionsFile);
if (hasCaptions) {
	const caps = JSON.parse(fs.readFileSync(captionsFile, "utf8"));
	words = caps.length;
	// readable transcript: one line per ~sentence/pause, with times
	const lines = [];
	let cur = null;
	for (const c of caps) {
		const gap = cur ? c.startMs - cur.end : 0;
		if (!cur || gap > 600 || /[.?!]$/.test(cur.text.trim())) {
			if (cur) lines.push(cur);
			cur = { start: c.startMs, end: c.endMs, text: c.text.trim() };
		} else {
			cur.end = c.endMs;
			cur.text += c.text;
		}
	}
	if (cur) lines.push(cur);
	const t = (ms) => `${String(Math.floor(ms / 60000)).padStart(2, "0")}:${((ms % 60000) / 1000).toFixed(1).padStart(4, "0")}`;
	fs.writeFileSync(path.join(dir, "transcript.txt"), lines.map((l) => `[${t(l.start)} - ${t(l.end)}] ${l.text}`).join("\n") + "\n");
}

// 3. Starter plan (never overwrite an existing plan: it may hold edits).
const planFile = path.join(dir, "plan.json");
if (!fs.existsSync(planFile)) {
	const vertical = h >= w;
	const plan = {
		title: slug,
		video: "source.mp4",
		source: { width: w, height: h, fps, durationInSeconds: duration },
		output: vertical ? { width: 1080, height: 1920, fps: 30 } : { width: 1920, height: 1080, fps: 30 },
		captions: { enabled: hasCaptions, file: "captions.json", combineWithinMs: 900 },
		trim: { startSeconds: 0 },
		overlays: [],
		endCard: { enabled: true, seconds: 4, props: {} },
	};
	fs.writeFileSync(planFile, JSON.stringify(plan, null, "\t") + "\n");
}

console.log(`
Ready: public/videos/${slug}/
  footage     ${w}x${h} @ ${fps} fps, ${duration}s
  captions    ${hasCaptions ? `${words} words (captions.json, transcript.txt)` : "none"}
  plan        plan.json

Next: add overlays to plan.json, then
  npm run stills -- ${slug}
  npm run render -- ${slug}`);
