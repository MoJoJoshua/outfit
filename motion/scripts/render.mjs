// Render the final video for social upload (H.264, AAC).
//
//   npm run render -- <slug>        -> out/<slug>/outfit_<slug>_<V|H>_<yyyymmdd>.mp4
import fs from "node:fs";
import path from "node:path";
import { loadPlan, remotion, root } from "./_remotion.mjs";

const slug = process.argv[2];
const plan = loadPlan(slug);
const fmt = plan.output.height > plan.output.width ? "V" : plan.output.height === plan.output.width ? "S" : "H";
const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const dir = path.join(root, "out", slug);
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, `outfit_${slug}_${fmt}_${date}.mp4`);
remotion([
	"render", "src/index.ts", "TalkingHead", file,
	`--props=${JSON.stringify({ slug })}`,
	"--codec=h264", "--crf=18", "--pixel-format=yuv420p", "--audio-codec=aac", "--audio-bitrate=320k",
]);
console.log(`\nRendered ${path.relative(root, file)}`);
