import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Remotion downloads its own headless Chrome; where that is blocked (cloud
// containers) use a preinstalled Chromium instead.
const browserCandidates = [process.env.REMOTION_BROWSER, "/opt/pw-browsers/chromium"].filter(Boolean);
export const browserArgs = () => {
	const b = browserCandidates.find((p) => fs.existsSync(p));
	return b ? [`--browser-executable=${b}`] : [];
};

export const remotion = (args) => {
	const r = spawnSync("npx", ["remotion", ...args, ...browserArgs(), "--log=error"], { cwd: root, stdio: "inherit" });
	if (r.status !== 0) process.exit(r.status ?? 1);
};

export const loadPlan = (slug) => {
	const file = path.join(root, "public", "videos", slug ?? "", "plan.json");
	if (!slug || !fs.existsSync(file)) {
		const have = fs.existsSync(path.join(root, "public", "videos")) ? fs.readdirSync(path.join(root, "public", "videos")) : [];
		console.error(`No plan for "${slug ?? ""}". Videos: ${have.join(", ") || "(none)"}`);
		process.exit(1);
	}
	return JSON.parse(fs.readFileSync(file, "utf8"));
};
