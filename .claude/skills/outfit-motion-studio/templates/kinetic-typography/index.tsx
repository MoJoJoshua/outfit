import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { clamp, colors, ease, fitFontSize, fontFamily, isVertical, safeArea, type, unit } from "../_shared/brand";
import { FluteSurface, MeasureLine, PanelSlide, TypeSet } from "../_shared/primitives";

export const kineticTypographySchema = z.object({
	eyebrow: z.string().describe("Light uppercase line above the headline; empty to hide"),
	headline: z.string().describe("Headline; use \\n for line breaks (max 3 lines)"),
	accentWords: z.array(z.string()).describe("Words set in bronze (max 1-2)"),
	background: z.enum(["ink", "ivory", "charcoal"]).describe("Panel color"),
	fluted: z.boolean().describe("Fluted texture on the panel"),
	align: z.enum(["left", "center"]),
	size: z.enum(["display", "headline"]),
	underline: z.boolean().describe("Bronze measure line under the headline"),
	exit: z.boolean().describe("Animate out at the end (off when the next scene covers it)"),
});
export type KineticTypographyProps = z.infer<typeof kineticTypographySchema>;

export const kineticTypographyDefaults: KineticTypographyProps = {
	eyebrow: "We fit-out",
	headline: "Smarter\ndesigns.",
	accentWords: ["designs"],
	background: "ink",
	fluted: false,
	align: "left",
	size: "display",
	underline: true,
	exit: true,
};
export const kineticTypographyDurationSeconds = 3;

export const KineticTypography: React.FC<KineticTypographyProps> = ({ eyebrow, headline, accentWords, background, fluted, align, size, underline, exit }) => {
	const frame = useCurrentFrame();
	const { width, height, fps, durationInFrames } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const dark = background !== "ivory";
	const fg = dark ? colors.ivory : colors.ink;
	const fontSize = fitFontSize(headline, width - safe.left - safe.right, (size === "display" ? (isVertical(width, height) ? 150 : 130) : 88) * u);
	const words = headline.split(/\s+/).filter(Boolean).length;
	const exitAt = exit ? durationInFrames - Math.round(0.33 * fps) : undefined;
	const headlineStart = eyebrow ? 8 : 4;
	const lineStart = headlineStart + words * 3 + 6;
	const eyebrowIn = interpolate(frame, [4, 4 + Math.round(0.47 * fps)], [0, 1], { ...clamp, easing: ease.install });
	const eyebrowOut = exitAt === undefined ? 1 : interpolate(frame, [exitAt, exitAt + 8], [1, 0], clamp);
	const textBlockW = width - safe.left - safe.right;

	return (
		<AbsoluteFill>
			<PanelSlide from="left" duration={Math.round(0.5 * fps)}>
				{fluted && background !== "charcoal" ? <FluteSurface tone={background === "ink" ? "ink" : "ivory"} /> : <AbsoluteFill style={{ background: colors[background] }} />}
			</PanelSlide>
			<AbsoluteFill
				style={{
					paddingLeft: safe.left,
					paddingRight: safe.right,
					paddingTop: safe.top,
					paddingBottom: safe.bottom,
					justifyContent: "center",
					alignItems: align === "center" ? "center" : "flex-start",
					textAlign: align,
				}}
			>
				<div style={{ display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start", gap: 28 * u, maxWidth: textBlockW }}>
					{eyebrow ? (
						<div style={{ ...type.eyebrow, fontFamily, fontSize: 34 * u, color: fg, opacity: eyebrowIn * eyebrowOut, translate: `0 ${(1 - eyebrowIn) * 16}px` }}>{eyebrow}</div>
					) : null}
					<TypeSet
						text={headline}
						delay={headlineStart}
						stagger={3}
						exitAt={exitAt}
						accentWords={accentWords}
						style={{ ...(size === "display" ? type.display : type.headline), fontSize, color: fg }}
					/>
					{underline ? (
						<div style={{ position: "relative", height: 20 * u, width: 360 * u, opacity: exitAt === undefined ? 1 : interpolate(frame, [exitAt, exitAt + 8], [1, 0], clamp) }}>
							<MeasureLine x={0} y={10 * u} length={360 * u} thickness={4 * u} delay={lineStart} />
						</div>
					) : null}
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
