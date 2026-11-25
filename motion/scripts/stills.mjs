// Preview images of a talking-head video: one per overlay (at the moment it
// is fully on screen), one of plain captions, and one of the end card.
//
//   npm run stills -- <slug>        -> out/<slug>/stills/*.jpg
import fs from "node:fs";
import path from "node:path";
import { loadPlan, remotion, root } from "./_remotion.mjs";

const slug = process.argv[2];
const plan = loadPlan(slug);
const fps = plan.output.fps;
const start = plan.trim?.startSeconds ?? 0;
const end = plan.trim?.endSeconds ?? plan.source.durationInSeconds;
const footage = Math.round((end - start) * fps);
const dir = path.join(root, "out", slug, "stills");
fs.rmSync(dir, { recursive: true, force: true });
fs.mkdirSync(dir, { recursive: true });

const shots = [];
plan.overlays.forEach((o, i) => {
	const a = Math.round((o.from - start) * fps);
	const b = Math.round((o.to - start) * fps);
	// late enough for entrances to land, before the exit starts
	shots.push([`${String(i + 1).padStart(2, "0")}-${o.type}${o.template ? "-" + o.template : ""}`, Math.min(b - 12, a + Math.max(45, Math.round((b - a) * 0.6)))]);
});
const covered = (f) => plan.overlays.some((o) => f >= (o.from - start) * fps && f < (o.to - start) * fps);
const free = [Math.round(footage * 0.35), Math.round(footage * 0.5), Math.round(footage * 0.7)].find((f) => !covered(f));
if (free !== undefined) shots.push(["00-captions", free]);
if (plan.endCard.enabled) shots.push(["99-end-card", footage + Math.round(plan.endCard.seconds * fps) - 10]);

const props = JSON.stringify({ slug });
for (const [name, frame] of shots) {
	console.log(`${name} (frame ${frame})`);
	remotion(["still", "src/index.ts", "TalkingHead", path.join(dir, `${name}.jpg`), `--frame=${Math.max(0, frame)}`, `--props=${props}`, "--scale=0.5", "--image-format=jpeg"]);
}
console.log(`\nStills in out/${slug}/stills/`);
