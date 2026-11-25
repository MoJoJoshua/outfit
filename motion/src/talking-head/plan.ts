import { z } from "zod";

// One plan.json per video, in public/videos/<slug>/plan.json.
// Times are in seconds of the source footage.

const punch = z.object({
	type: z.literal("punch"),
	from: z.number(),
	to: z.number(),
	text: z.string().describe("Big text over the speaker; \\n breaks lines, max 3 lines"),
	eyebrow: z.string().optional(),
	accentWords: z.array(z.string()).optional(),
	position: z.enum(["top", "center"]).optional(),
});

const lowerThird = z.object({
	type: z.literal("lowerThird"),
	from: z.number(),
	to: z.number(),
	name: z.string(),
	role: z.string().optional(),
	tone: z.enum(["charcoal", "ivory"]).optional(),
});

// Point graphics: times (`at`, `strikeAt`, `replaceAt`) are source-footage
// seconds, normally the moment the word is spoken (from captions.json).
const at = z.number().describe("Source seconds when this item appears (the spoken word's start)");

const steps = z.object({
	type: z.literal("steps"),
	from: z.number(),
	to: z.number(),
	title: z.string().optional(),
	items: z.array(z.object({ label: z.string(), icon: z.string(), at })).min(2).max(5),
});

const question = z.object({
	type: z.literal("question"),
	from: z.number(),
	to: z.number(),
	items: z.array(z.object({ text: z.string(), at, icon: z.string().optional() })).min(1).max(3),
	place: z.enum(["chest", "top"]).optional(),
});

const strike = z.object({
	type: z.literal("strike"),
	from: z.number(),
	to: z.number(),
	text: z.string(),
	replacement: z.string().optional(),
	strikeAt: z.number().optional(),
	replaceAt: z.number().optional(),
	place: z.enum(["chest", "top"]).optional(),
});

const photos = z.object({
	type: z.literal("photos"),
	from: z.number(),
	to: z.number(),
	items: z.array(z.object({ src: z.string(), at, caption: z.string().optional() })).min(1).max(4),
	place: z.enum(["chest", "top"]).optional(),
});

// Speaker moves to the bottom part of the frame; photos/renders fill the top.
const split = z.object({
	type: z.literal("split"),
	from: z.number(),
	to: z.number(),
	ratio: z.number().min(0.35).max(0.6).optional().describe("Share of the height for the top panel (default 0.5)"),
	focusY: z.number().min(0).max(100).optional().describe("Vertical focus of the speaker footage in %, 0 = keep the top (default 8)"),
	items: z.array(z.object({ src: z.string(), at, caption: z.string().optional() })).min(1),
});

export const pointGraphicTypes = ["steps", "question", "strike", "photos", "split"] as const;

export const templateNames = [
	"kinetic-typography",
	"material-ranking",
	"tier-list",
	"architectural-diagram",
	"before-after",
	"logo-reveal",
] as const;

const cutaway = z.object({
	type: z.literal("cutaway"),
	from: z.number(),
	to: z.number(),
	template: z.enum(templateNames),
	// partial props; missing keys fall back to the template defaults
	props: z.record(z.string(), z.unknown()).optional(),
});

export const overlaySchema = z.discriminatedUnion("type", [punch, lowerThird, cutaway, steps, question, strike, photos, split]);
export type Overlay = z.infer<typeof overlaySchema>;

export const planSchema = z.object({
	title: z.string(),
	video: z.string().describe("File name inside the video folder"),
	source: z.object({ width: z.number(), height: z.number(), fps: z.number(), durationInSeconds: z.number() }),
	output: z.object({ width: z.number(), height: z.number(), fps: z.number() }),
	captions: z.object({
		enabled: z.boolean(),
		file: z.string(),
		combineWithinMs: z.number().optional().describe("Unused since word-by-word captions; kept for old plans"),
		// Phrases shown up to 4 words at a time with the spoken word on a bronze
		// plate. Everything else is shown one word at a time. Source-footage seconds.
		emphasis: z.array(z.object({ from: z.number(), to: z.number() })).optional(),
		// "word": one word at a time at the bottom (calm videos).
		// "keyword": short phrases mid-frame, small connector words + one huge
		// keyword (energetic videos). Point graphics and split screens switch
		// captions to "word" at the bottom while they are on screen.
		style: z.enum(["phrase", "word", "keyword"]).optional().describe('"word" is an old name for "phrase"'),
		keywords: z.array(z.string()).optional().describe("Words that must be the keyword of their phrase"),
		accentWords: z.array(z.string()).optional().describe("Keywords set in bronze instead of ivory"),
		tone: z.enum(["light", "dark"]).optional().describe("light = ivory text (default); dark = ink text for bright backdrops"),
		tracking: z.number().min(-6).max(6).optional().describe("Extra letter spacing for all captions in % (Figma units). Default -1 = tighter, fuller words"),
	}),
	trim: z.object({ startSeconds: z.number(), endSeconds: z.number().optional() }).optional(),
	// Slow zoom on plain stretches (no punch/cutaway/point graphic/split). On by default.
	pushIn: z
		.object({
			enabled: z.boolean().optional(),
			max: z.number().min(0).max(0.1).optional().describe("Max zoom, 0.10 = 10% (the cap)"),
			minSeconds: z.number().optional().describe("Shortest plain stretch that gets a push (default 2.5)"),
			focusY: z.number().min(0).max(100).optional().describe("Zoom centre height in %, at the face (default 35)"),
		})
		.optional(),
	overlays: z.array(overlaySchema),
	endCard: z.object({
		enabled: z.boolean(),
		seconds: z.number(),
		props: z.record(z.string(), z.unknown()).optional(),
	}),
});
export type Plan = z.infer<typeof planSchema>;
