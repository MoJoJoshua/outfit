import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { clamp, colors, ease, fontFamily, isVertical, safeArea, type, unit } from "../_shared/brand";

export const lowerThirdSchema = z.object({
	name: z.string().describe("Person, project or place"),
	role: z.string().describe("Role / location line; empty to hide"),
	tone: z.enum(["charcoal", "ivory"]),
	holdSeconds: z.number().min(1.5),
});
export type LowerThirdProps = z.infer<typeof lowerThirdSchema>;

export const lowerThirdDefaults: LowerThirdProps = {
	name: "Kitchen renovation",
	role: "Banawa · Cebu City",
	tone: "charcoal",
	holdSeconds: 3,
};
export const lowerThirdDuration = (p: LowerThirdProps, fps: number) => Math.round((p.holdSeconds + 1.4) * fps);

/** Transparent background: render as ProRes 4444 to overlay on footage (see rendering-standards.md). */
export const LowerThird: React.FC<LowerThirdProps> = ({ name, role, tone }) => {
	const frame = useCurrentFrame();
	const { width, height, fps, durationInFrames } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const vertical = isVertical(width, height);

	const lineD = Math.round(0.4 * fps);
	const panelStart = lineD - 4;
	const panel = interpolate(frame, [panelStart, panelStart + Math.round(0.5 * fps)], [0, 1], { ...clamp, easing: ease.install });
	const nameIn = interpolate(frame, [panelStart + 6, panelStart + 6 + Math.round(0.47 * fps)], [1, 0], { ...clamp, easing: ease.install });
	const roleIn = interpolate(frame, [panelStart + 10, panelStart + 10 + Math.round(0.47 * fps)], [1, 0], { ...clamp, easing: ease.install });
	const line = interpolate(frame, [0, lineD], [0, 1], { ...clamp, easing: ease.draw });
	const exitAt = durationInFrames - Math.round(0.4 * fps);
	const out = interpolate(frame, [exitAt, exitAt + Math.round(0.33 * fps)], [0, 1], { ...clamp, easing: ease.remove });

	const bg = tone === "charcoal" ? colors.charcoal : colors.ivory;
	const fg = tone === "charcoal" ? colors.ivory : colors.ink;
	const bottom = vertical ? safe.bottom + 40 * u : safe.bottom;

	return (
		<AbsoluteFill style={{ fontFamily }}>
			<div style={{ position: "absolute", left: safe.left, bottom, display: "flex", alignItems: "stretch", translate: `${-out * 110}% 0` }}>
				{/* bronze post: the measured edge the panel slides along */}
				<div style={{ width: 8 * u, background: colors.bronze, transformOrigin: "bottom", scale: `1 ${line}` }} />
				<div style={{ overflow: "hidden" }}>
					<div style={{ background: bg, padding: `${20 * u}px ${34 * u}px ${22 * u}px`, translate: `${(panel - 1) * 101}% 0` }}>
						<div style={{ overflow: "hidden" }}>
							<div style={{ ...type.subhead, fontSize: 50 * u, color: fg, translate: `0 ${nameIn * 110}%`, whiteSpace: "nowrap" }}>{name}</div>
						</div>
						{role ? (
							<div style={{ overflow: "hidden", marginTop: 6 * u }}>
								<div style={{ ...type.eyebrow, fontSize: 28 * u, color: tone === "charcoal" ? colors.copper : colors.bronze, translate: `0 ${roleIn * 110}%`, whiteSpace: "nowrap" }}>{role}</div>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
