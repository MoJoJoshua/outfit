import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { clamp, colors, ease, fontFamily, safeArea, type, unit, src } from "../_shared/brand";
import { FluteReveal, FluteSurface, PushIn } from "../_shared/primitives";

export const beforeAfterSchema = z.object({
	beforeImage: z.string().describe("staticFile path or URL; empty shows a placeholder"),
	afterImage: z.string().describe("staticFile path or URL; empty shows a placeholder"),
	beforeLabel: z.string(),
	afterLabel: z.string(),
	projectName: z.string().describe("e.g. 'Kitchen renovation · Cebu City'; empty to hide"),
	revealAtSeconds: z.number().min(0.8).describe("When the after image starts wiping in"),
});
export type BeforeAfterProps = z.infer<typeof beforeAfterSchema>;

export const beforeAfterDefaults: BeforeAfterProps = {
	beforeImage: "",
	afterImage: "",
	beforeLabel: "Before",
	afterLabel: "After",
	projectName: "Condo fit-out · Cebu City",
	revealAtSeconds: 1.6,
};
export const beforeAfterDurationSeconds = 5;

const Photo: React.FC<{ path: string; tone: "ink" | "ivory"; placeholder: string }> = ({ path, tone, placeholder }) => {
	const { width, height } = useVideoConfig();
	const u = unit(width, height);
	if (path) return <Img src={src(path)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
	return (
		<AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
			<FluteSurface tone={tone} />
			<div style={{ ...type.label, fontFamily, fontSize: 28 * u, color: tone === "ink" ? colors.ivory : colors.ink, background: tone === "ink" ? colors.ink : colors.ivory, padding: 12 * u }}>
				{placeholder}
			</div>
		</AbsoluteFill>
	);
};

export const BeforeAfter: React.FC<BeforeAfterProps> = ({ beforeImage, afterImage, beforeLabel, afterLabel, projectName, revealAtSeconds }) => {
	const frame = useCurrentFrame();
	const { width, height, fps, durationInFrames } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const reveal = Math.round(revealAtSeconds * fps);
	const stagger = 1;
	const strips = Math.ceil(width / Math.round((48 * width) / 1080));
	const wipeEnd = reveal + strips * stagger + Math.round(0.4 * fps);

	const tag = (label: string, inAt: number, outAt: number | null, accent: boolean) => {
		const v = interpolate(frame, [inAt, inAt + Math.round(0.47 * fps)], [0, 1], { ...clamp, easing: ease.install });
		const o = outAt === null ? 1 : interpolate(frame, [outAt, outAt + 8], [1, 0], clamp);
		return (
			<div
				style={{
					position: "absolute",
					left: safe.left,
					top: safe.top,
					overflow: "hidden",
					opacity: o,
				}}
			>
				<div
					style={{
						...type.headline,
						fontFamily,
						fontSize: 64 * u,
						color: colors.ivory,
						background: accent ? colors.bronze : colors.charcoal,
						padding: `${14 * u}px ${26 * u}px`,
						translate: `${(v - 1) * 110}% 0`,
					}}
				>
					{label}
				</div>
			</div>
		);
	};

	const nameIn = interpolate(frame, [wipeEnd, wipeEnd + Math.round(0.5 * fps)], [0, 1], { ...clamp, easing: ease.install });

	return (
		<AbsoluteFill style={{ backgroundColor: colors.ink }}>
			<PushIn durationInFrames={durationInFrames}>
				<Photo path={beforeImage} tone="ink" placeholder="Before image" />
			</PushIn>
			<FluteReveal delay={reveal} stagger={stagger} direction="ltr">
				<PushIn durationInFrames={durationInFrames}>
					<Photo path={afterImage} tone="ivory" placeholder="After image" />
				</PushIn>
			</FluteReveal>

			{tag(beforeLabel, 4, reveal - 6, false)}
			{tag(afterLabel, wipeEnd - 6, null, true)}

			{projectName ? (
				<div style={{ position: "absolute", left: safe.left, right: safe.right, bottom: safe.bottom, overflow: "hidden" }}>
					<div
						style={{
							...type.eyebrow,
							fontFamily,
							fontSize: 30 * u,
							color: colors.ivory,
							background: colors.scrim,
							padding: `${12 * u}px ${20 * u}px`,
							display: "inline-block",
							translate: `0 ${(1 - nameIn) * 100}%`,
						}}
					>
						{projectName}
					</div>
				</div>
			) : null}
		</AbsoluteFill>
	);
};
