import React from "react";
import { AbsoluteFill, CalculateMetadataFunction, OffthreadVideo, Sequence, staticFile, useVideoConfig } from "remotion";
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
import { Plan, planSchema, Overlay } from "./plan";
import { BrandCaptions } from "./BrandCaptions";
import { Punch } from "./Punch";

export const talkingHeadSchema = z.object({
	slug: z.string().describe("Folder name in public/videos/"),
	plan: planSchema.optional(),
	captions: z.array(z.any()).optional(),
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

export const TalkingHead: React.FC<TalkingHeadProps> = ({ slug, plan, captions }) => {
	const { fps } = useVideoConfig();
	if (!plan) return null;
	const start = plan.trim?.startSeconds ?? 0;
	const end = plan.trim?.endSeconds ?? plan.source.durationInSeconds;
	const footageFrames = Math.round((end - start) * fps);
	const f = (seconds: number) => Math.round((seconds - start) * fps);
	const lowerThirds = plan.overlays.filter((o) => o.type === "lowerThird").map((o) => [f(o.from), f(o.to)] as const);
	const cutaways = plan.overlays.filter((o) => o.type === "cutaway").map((o) => [f(o.from), f(o.to)] as const);

	return (
		<AbsoluteFill style={{ backgroundColor: colors.ink }}>
			<Sequence durationInFrames={footageFrames} name="Footage">
				<OffthreadVideo
					src={staticFile(`videos/${slug}/${plan.video}`)}
					trimBefore={Math.round(start * fps)}
					style={{ width: "100%", height: "100%", objectFit: "cover" }}
				/>
			</Sequence>

			{plan.overlays.map((o, i) => (
				<Sequence key={i} from={Math.max(0, f(o.from))} durationInFrames={Math.max(1, f(o.to) - f(o.from))} name={`${o.type} ${i + 1}`}>
					<OverlayView overlay={o} />
				</Sequence>
			))}

			{plan.captions.enabled && captions && captions.length > 0 ? (
				<Sequence durationInFrames={footageFrames} name="Captions">
					<BrandCaptions captions={captions as Caption[]} offsetMs={start * 1000} hiddenRanges={cutaways} raisedRanges={lowerThirds} combineWithinMs={plan.captions.combineWithinMs ?? 900} />
				</Sequence>
			) : null}

			{plan.endCard.enabled ? (
				<Sequence from={footageFrames} durationInFrames={Math.round(plan.endCard.seconds * fps)} name="End card">
					<EndCard {...endCardDefaults} {...(plan.endCard.props as object)} />
				</Sequence>
			) : null}
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
	const [Component, defaults] = TEMPLATES[overlay.template];
	const C = Component as React.FC<Record<string, unknown>>;
	return <C {...(defaults as object)} {...(overlay.props ?? {})} />;
};
