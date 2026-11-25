import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, colors, ease, fitFontSize, fontFamily, isVertical, safeArea, type, unit } from "@outfit/_shared/brand";
import { MeasureLine, TypeSet } from "@outfit/_shared/primitives";

// Big brand text over the speaker (hook lines, key claims). A charcoal
// gradient scrim keeps it readable; the speaker stays visible below.
export const Punch: React.FC<{ text: string; eyebrow?: string; accentWords: string[]; position: "top" | "center" }> = ({ text, eyebrow, accentWords, position }) => {
	const frame = useCurrentFrame();
	const { width, height, fps, durationInFrames } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const vertical = isVertical(width, height);
	const exitAt = durationInFrames - Math.round(0.33 * fps);
	const scrimIn = interpolate(frame, [0, 8], [0, 1], clamp);
	const scrimOut = interpolate(frame, [exitAt, exitAt + 10], [1, 0], clamp);
	const words = text.split(/\s+/).filter(Boolean).length;
	const eyebrowIn = interpolate(frame, [2, 2 + Math.round(0.47 * fps)], [0, 1], { ...clamp, easing: ease.install });
	const fontSize = fitFontSize(text, width - safe.left - safe.right, (vertical ? 112 : 96) * u);

	return (
		<AbsoluteFill>
			<AbsoluteFill
				style={{
					opacity: scrimIn * scrimOut,
					background:
						position === "top"
							? "linear-gradient(180deg, rgba(32,31,29,0.88) 0%, rgba(32,31,29,0.6) 45%, rgba(32,31,29,0) 70%)"
							: "rgba(32,31,29,0.62)",
				}}
			/>
			<AbsoluteFill
				style={{
					paddingTop: safe.top,
					paddingLeft: safe.left,
					paddingRight: safe.right,
					justifyContent: position === "top" ? "flex-start" : "center",
					alignItems: "flex-start",
				}}
			>
				{eyebrow ? (
					<div style={{ ...type.eyebrow, fontFamily, fontSize: 32 * u, color: colors.ivory, marginBottom: 20 * u, opacity: eyebrowIn * scrimOut }}>{eyebrow}</div>
				) : null}
				<TypeSet text={text.toUpperCase()} delay={eyebrow ? 6 : 2} accentWords={accentWords} exitAt={exitAt} style={{ ...type.display, fontSize, color: colors.ivory }} />
				<div style={{ position: "relative", height: 30 * u, width: 300 * u, marginTop: 24 * u, opacity: scrimOut }}>
					<MeasureLine x={0} y={10 * u} length={300 * u} thickness={4 * u} delay={(eyebrow ? 6 : 2) + words * 3 + 4} />
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
