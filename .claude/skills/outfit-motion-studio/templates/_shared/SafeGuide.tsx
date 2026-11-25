import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { fontFamily, isVertical, reelsZone, safeArea } from "./brand";

/* Debug overlay: shades everything outside the safe zone and draws the true
   and lower-zone centrelines. For previews only (stills --guides), never in a render. */
export const SafeGuide: React.FC = () => {
	const { width, height } = useVideoConfig();
	const s = safeArea(width, height);
	const z = reelsZone(width, height);
	const vertical = isVertical(width, height);
	const shade = "rgba(214, 40, 150, 0.38)";
	const line = (x: number, color: string, label: string) => (
		<div style={{ position: "absolute", left: x, top: 0, bottom: 0, borderLeft: `2px dashed ${color}` }}>
			<div style={{ position: "absolute", top: height * 0.45, left: 6, color, fontFamily, fontSize: 20, writingMode: "vertical-rl" }}>{label}</div>
		</div>
	);
	// safe area polygon (with notch) cut out of a full-frame shade
	const L = s.left, T = s.top, R = width - s.right, B = height - s.bottom, NR = width - z.notchRight, NT = z.notchTop;
	const poly = vertical
		? `polygon(evenodd, 0 0, ${width}px 0, ${width}px ${height}px, 0 ${height}px, 0 0, ${L}px ${T}px, ${R}px ${T}px, ${R}px ${NT}px, ${NR}px ${NT}px, ${NR}px ${B}px, ${L}px ${B}px, ${L}px ${T}px)`
		: `polygon(evenodd, 0 0, ${width}px 0, ${width}px ${height}px, 0 ${height}px, 0 0, ${L}px ${T}px, ${R}px ${T}px, ${R}px ${B}px, ${L}px ${B}px, ${L}px ${T}px)`;
	return (
		<AbsoluteFill style={{ pointerEvents: "none" }}>
			<AbsoluteFill style={{ background: shade, clipPath: poly }} />
			{vertical ? (
				<>
					<div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: z.crop, background: "rgba(214,40,150,0.35)" }} />
					<div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: z.crop, background: "rgba(214,40,150,0.35)" }} />
					{line(width / 2, "#5fd3e6", "true centre")}
					{line(z.centerX, "#e6dc4a", "lower-zone centre")}
				</>
			) : null}
		</AbsoluteFill>
	);
};
