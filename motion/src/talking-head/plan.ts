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

export const overlaySchema = z.discriminatedUnion("type", [punch, lowerThird, cutaway]);
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
	}),
	trim: z.object({ startSeconds: z.number(), endSeconds: z.number().optional() }).optional(),
	overlays: z.array(overlaySchema),
	endCard: z.object({
		enabled: z.boolean(),
		seconds: z.number(),
		props: z.record(z.string(), z.unknown()).optional(),
	}),
});
export type Plan = z.infer<typeof planSchema>;
