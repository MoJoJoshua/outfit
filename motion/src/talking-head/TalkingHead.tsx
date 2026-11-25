import React from "react";
import { AbsoluteFill, CalculateMetadataFunction, Sequence, staticFile, useVideoConfig } from "remotion";
import { z } from "zod";
import type { Caption } from "@remotion/captions";
import { colors } from "@outfit/_shared/brand";
import { KineticTypography, kineticTypographyDefaults } from "@outfit/kinetic-typography";
import { MaterialRanking, materialRankingDefaults } from "@outfit/material-ranking";
import { TierList, tierListDefaults } from "@outfit/tier-list";
import { ArchitecturalDiagram, architecturalDiagramDefaults } from "@outfit/architectural-diagram";
import { BeforeAfter, beforeAfterDefaults } from "@outfit/before-after";
import { LogoReveal, logoRevealDefaults } from "@outfit/logo-reveal";
import { LowerThird, lowerThirdDefaults } from "@outfit/lower-third";
import { EndCard, endCardDefaults } from "@outfit/end-card";
import { planSchema, Overlay, pointGraphicTypes } from "./plan";
import { BrandCaptions } from "./BrandCaptions";
import { Punch } from "./Punch";
import { SafeGuide } from "@outfit/_shared/SafeGuide";
import { Photos, Questions, Steps, Strike } from "./PointGraphics";
import { Footage, PushIn, SplitRange, SplitTop } from "./Split";

export const talkingHeadSchema = z.object({
	slug: z.string().describe("Folder name in public/videos/"),
	plan: planSchema.optional(),
	captions: z.array(z.any()).optional(),
	showGuides: z.boolean().optional().describe("Overlay the Reels safe zone (previews only)"),
});
export type TalkingHeadProps = z.infer<typeof talkingHeadSchema>;

// Loads public/videos/<slug>/plan.json and its captions, and sizes the composition from them.
export const calculateTalkingHeadMetadata: CalculateMetadataFunction<TalkingHeadProps> = async ({ props }) => {
	const base = `videos/${props.slug}`;
	const res = await fetch(staticFile(`${base}/plan.json`));
	if (!res.ok) {
		throw new Error(`No video "${props.slug}" yet. Import one with: npm run new -- <path/to/video> ${props.slug}`);
	}
	const plan = planSchema.parse(await res.json());
	let captions: Caption[] = [];
	if (plan.captions.enabled) {
		const res = await fetch(staticFile(`${base}/${plan.captions.file}`));
		if (res.ok) captions = await res.json();
	}
	const start = plan.trim?.startSeconds ?? 0;
	const end = plan.trim?.endSeconds ?? plan.source.durationInSeconds;
	const fps = plan.output.fps;
	const footage = Math.round((end - start) * fps);
	const endCard = plan.endCard.enabled ? Math.round(plan.endCard.seconds * fps) : 0;
	return {
		durationInFrames: footage + endCard,
		fps,
		width: plan.output.width,
		height: plan.output.height,
		props: { ...props, plan, captions },
	};
};

const TEMPLATES = {
	"kinetic-typography": [KineticTypography, kineticTypographyDefaults],
	"material-ranking": [MaterialRanking, materialRankingDefaults],
	"tier-list": [TierList, tierListDefaults],
	"architectural-diagram": [ArchitecturalDiagram, architecturalDiagramDefaults],
	"before-after": [BeforeAfter, beforeAfterDefaults],
	"logo-reveal": [LogoReveal, logoRevealDefaults],
} as const;

export const TalkingHead: React.FC<TalkingHeadProps> = ({ slug, plan, captions, showGuides }) => {
	const { fps } = useVideoConfig();
	if (!plan) return null;
	const start = plan.trim?.startSeconds ?? 0;
	const end = plan.trim?.endSeconds ?? plan.source.durationInSeconds;
	const footageFrames = Math.round((end - start) * fps);
	const f = (seconds: number) => Math.round((seconds - start) * fps);
	const lowerThirds = plan.overlays.filter((o) => o.type === "lowerThird").map((o) => [f(o.from), f(o.to)] as const);
	const cutaways = plan.overlays.filter((o) => o.type === "cutaway").map((o) => [f(o.from), f(o.to)] as const);
	// while a point graphic or split is on screen, captions drop to one word at the bottom
	const compact = plan.overlays.filter((o) => (pointGraphicTypes as readonly string[]).includes(o.type)).map((o) => [f(o.from), f(o.to)] as const);
	// plain stretches for the push-in: footage not covered by any big overlay (lower thirds don't count)
	const busy = plan.overlays
		.filter((o) => o.type !== "lowerThird")
		.map((o) => [f(o.from) - Math.round(0.2 * fps), f(o.to) + Math.round(0.2 * fps)] as const)
		.sort((x, y) => x[0] - y[0]);
	const calm: Array<readonly [number, number]> = [];
	let cursor = 0;
	for (const [a, b] of [...busy, [footageFrames, footageFrames] as const]) {
		if (a - cursor >= Math.round((plan.pushIn?.minSeconds ?? 2.5) * fps)) calm.push([cursor, Math.min(a, footageFrames)]);
		cursor = Math.max(cursor, b);
	}
	const push: PushIn | undefined =
		plan.pushIn?.enabled === false ? undefined : { max: Math.min(0.1, plan.pushIn?.max ?? 0.1), focusY: plan.pushIn?.focusY ?? 35, calm };
	const splits: SplitRange[] = plan.overlays.flatMap((o) => (o.type === "split" ? [{ fromFrame: f(o.from), toFrame: f(o.to), ratio: o.ratio ?? 0.5, focusY: o.focusY ?? 8 }] : []));

	return (
		<AbsoluteFill style={{ backgroundColor: colors.ink }}>
			<Sequence durationInFrames={footageFrames} name="Footage">
				<Footage src={staticFile(`videos/${slug}/${plan.video}`)} trimBefore={Math.round(start * fps)} splits={splits} push={push} />
			</Sequence>

			{plan.overlays.map((o, i) => (
				<Sequence key={i} from={Math.max(0, f(o.from))} durationInFrames={Math.max(1, f(o.to) - f(o.from))} name={`${o.type} ${i + 1}`}>
					<OverlayView overlay={o} />
				</Sequence>
			))}

			{plan.captions.enabled && captions && captions.length > 0 ? (
				<Sequence durationInFrames={footageFrames} name="Captions">
					<BrandCaptions
						captions={captions as Caption[]}
						offsetMs={start * 1000}
						hiddenRanges={cutaways}
						raisedRanges={lowerThirds}
						compactRanges={compact}
						splits={splits}
						emphasisMs={(plan.captions.emphasis ?? []).map((e) => [e.from * 1000, e.to * 1000] as const)}
						style={plan.captions.style ?? "phrase"}
						keywords={plan.captions.keywords ?? []}
						accentWords={plan.captions.accentWords ?? []}
						tone={plan.captions.tone ?? "light"}
						tracking={plan.captions.tracking ?? -1}
					/>
				</Sequence>
			) : null}

			{plan.endCard.enabled ? (
				<Sequence from={footageFrames} durationInFrames={Math.round(plan.endCard.seconds * fps)} name="End card">
					<EndCard {...endCardDefaults} {...(plan.endCard.props as object)} />
				</Sequence>
			) : null}

			{showGuides ? <SafeGuide /> : null}
		</AbsoluteFill>
	);
};

const OverlayView: React.FC<{ overlay: Overlay }> = ({ overlay }) => {
	if (overlay.type === "punch") {
		return <Punch text={overlay.text} eyebrow={overlay.eyebrow} accentWords={overlay.accentWords ?? []} position={overlay.position ?? "top"} />;
	}
	if (overlay.type === "lowerThird") {
		return <LowerThird {...lowerThirdDefaults} name={overlay.name} role={overlay.role ?? ""} tone={overlay.tone ?? "charcoal"} />;
	}
	// item times are absolute in the plan; the Sequence starts at overlay.from
	const rel = (t: number) => t - overlay.from;
	if (overlay.type === "steps") return <Steps title={overlay.title} items={overlay.items.map((it) => ({ ...it, at: rel(it.at) }))} />;
	if (overlay.type === "question") return <Questions place={overlay.place} items={overlay.items.map((it) => ({ ...it, at: rel(it.at) }))} />;
	if (overlay.type === "photos") return <Photos place={overlay.place} items={overlay.items.map((it) => ({ ...it, at: rel(it.at) }))} />;
	if (overlay.type === "split") return <SplitTop ratio={overlay.ratio ?? 0.5} items={overlay.items.map((it) => ({ ...it, at: rel(it.at) }))} />;
	if (overlay.type === "strike") {
		return (
			<Strike
				text={overlay.text}
				replacement={overlay.replacement}
				strikeAt={overlay.strikeAt !== undefined ? rel(overlay.strikeAt) : undefined}
				replaceAt={overlay.replaceAt !== undefined ? rel(overlay.replaceAt) : undefined}
				place={overlay.place}
			/>
		);
	}
	const [Component, defaults] = TEMPLATES[overlay.template];
	const C = Component as React.FC<Record<string, unknown>>;
	return <C {...(defaults as object)} {...(overlay.props ?? {})} />;
};
