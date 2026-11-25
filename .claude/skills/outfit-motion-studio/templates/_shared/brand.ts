import { Easing, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

// Montserrat is the only brand typeface (outfit.ph loads it via next/font).
export const { fontFamily } = loadFont("normal", {
	weights: ["300", "500", "700", "800"],
	subsets: ["latin"],
});

export const colors = {
	ink: "#0B0B0B", // black panel
	ivory: "#F6F3EC", // ivory panel
	charcoal: "#201F1D", // site theme-secondary
	bronze: "#8A6238", // site theme-primary: the one accent
	copper: "#AB7539", // site theme-accent
	espresso: "#241408", // site theme-base
	stone: "#8C8780", // muted labels, empty bar tracks on ink
	scrim: "rgba(32,31,29,0.72)", // charcoal scrim over photos
} as const;

export const tierColors = {
	S: colors.bronze,
	A: colors.copper,
	B: colors.charcoal,
	C: colors.stone,
} as const;

export const ease = {
	install: Easing.bezier(0.16, 1, 0.3, 1),
	remove: Easing.bezier(0.7, 0, 0.84, 0),
	slide: Easing.bezier(0.65, 0, 0.35, 1),
	draw: Easing.bezier(0.33, 1, 0.68, 1),
};

// Seconds -> frames helper; always pass fps from useVideoConfig().
export const s = (seconds: number, fps: number) => Math.round(seconds * fps);

export const clamp = {
	extrapolateLeft: "clamp",
	extrapolateRight: "clamp",
} as const;

// Assets are expected in the Remotion project's public/outfit/ folder.
export const assets = {
	fullLogo: () => staticFile("outfit/outfit-full-logo.png"),
	panelLogo: () => staticFile("outfit/outfit-panel-logo.png"),
	blackFlutes: () => staticFile("outfit/outfit-black-flutes.png"),
	ivoryFlutes: () => staticFile("outfit/outfit-ivory-flutes.png"),
	splitPanel: () => staticFile("outfit/outfit-split-panel.png"),
};

export const isVertical = (width: number, height: number) => height > width;

// Base unit: sizes in references/typography.md are for a 1080-wide frame.
// Landscape frames get 1.25x (references/typography.md).
export const unit = (width: number, height: number) =>
	isVertical(width, height) || width === height ? width / 1080 : (height / 1080) * 1.25;

// Text-safe insets (references/rendering-standards.md).
// Vertical: the user's Instagram Reels safe zone at 1080x1920, measured from a
// Reels screenshot (green box): clear of the top bar, the username/caption
// block at the bottom and the like/comment/share column on the right. One
// rectangle, x 155-930, y 230-1604.
export const safeArea = (width: number, height: number) => {
	const u = width / 1080;
	if (isVertical(width, height)) {
		return { top: 230 * u, bottom: 316 * u, left: 155 * u, right: 150 * u };
	}
	const m = width >= 1920 ? 120 * (width / 1920) : 80 * u;
	return { top: m, bottom: m, left: m, right: m };
};

// Layout thirds inside the vertical safe zone (the user's grid):
//   hook     y 300-690   text hook / headline / point graphics
//   eyes     y 690-1119  the speaker's eyes: keep clear
//   captions y 1119-1547 captions, lower thirds
// Columns at x 352 and 725 (centre column ~540). Landscape/square: thirds of the safe area.
export const layoutBands = (width: number, height: number) => {
	const u = width / 1080;
	if (isVertical(width, height)) {
		const y = (v: number) => v * u;
		return { hook: [y(300), y(690)], eyes: [y(690), y(1119)], captions: [y(1119), y(1547)], cols: [352 * u, 725 * u] } as const;
	}
	const s = safeArea(width, height);
	const h = (height - s.top - s.bottom) / 3;
	return {
		hook: [s.top, s.top + h],
		eyes: [s.top + h, s.top + 2 * h],
		captions: [s.top + 2 * h, height - s.bottom],
		cols: [width / 3, (2 * width) / 3],
	} as const;
};

// Kept for templates written against the old zone (which had a lower-right
// notch). The new zone has none: notchTop is the frame bottom, notchRight is
// the normal right inset, centerX is the safe box centre. crop = phones that
// fill the screen cut ~50 px off each side of a 1080-wide video.
export const reelsZone = (width: number, height: number) => {
	const u = width / 1080;
	const safe = safeArea(width, height);
	return {
		notchTop: height,
		notchRight: safe.right,
		centerX: (safe.left + width - safe.right) / 2,
		crop: isVertical(width, height) ? 50 * u : 0,
	};
};

// Right inset for content whose bottom edge reaches y.
export const safeRightAt = (width: number, height: number, y: number) => {
	const z = reelsZone(width, height);
	return y > z.notchTop ? z.notchRight : safeArea(width, height).right;
};

// Flute pitch: 48 px at 1080 wide.
export const flutePitch = (width: number) => Math.round((48 * width) / 1080);

export const type = {
	display: { fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 0.95 },
	headline: { fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1 },
	subhead: { fontWeight: 700, textTransform: "uppercase", lineHeight: 1.1 },
	eyebrow: { fontWeight: 300, textTransform: "uppercase", letterSpacing: "0.18em", lineHeight: 1.2 },
	body: { fontWeight: 500, lineHeight: 1.3 },
	label: { fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", lineHeight: 1.2 },
} as const;

// Image props accept a public/ path ("outfit/kitchen.jpg"), an absolute URL or a
// staticFile() result. Plain paths are wrapped in staticFile().
export const src = (path: string) => (/^(https?:|data:|blob:|\/)/.test(path) ? path : staticFile(path));

// Shrinks a headline's font size until its longest line fits maxWidth.
// Estimate for Montserrat ExtraBold uppercase (~0.74em per character incl.
// spacing); errs on the small side so text never crosses the safe edge.
export const fitFontSize = (text: string, maxWidth: number, target: number, emPerChar = 0.74) => {
	const longest = Math.max(1, ...text.split("\n").map((l) => l.trim().length));
	return Math.min(target, maxWidth / (longest * emPerChar));
};
