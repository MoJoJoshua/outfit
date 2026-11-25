import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { fontFamily, isVertical, layoutBands, reelsZone, safeArea } from "./brand";

/* Debug overlay for previews only (stills --guides), never in a final render.
   Red shade = outside the safe zone; green box = safe zone; white grid = the
   layout thirds (TEXT HOOK / EYES / CAPTIONS) with their column lines. */
export const SafeGuide: React.FC = () => {
	const { width, height } = useVideoConfig();
	const s = safeArea(width, height);
	const b = layoutBands(width, height);
	const z = reelsZone(width, height);
	const vertical = isVertical(width, height);
	const L = s.left;
	const T = s.top;
	const R = width - s.right;
	const B = height - s.bottom;
	const shade = `polygon(evenodd, 0 0, ${width}px 0, ${width}px ${height}px, 0 ${height}px, 0 0, ${L}px ${T}px, ${R}px ${T}px, ${R}px ${B}px, ${L}px ${B}px, ${L}px ${T}px)`;
	const gridL = vertical ? 149 * (width / 1080) : L;
	const gridR = vertical ? 931 * (width / 1080) : R;
	const rows = [b.hook[0], b.eyes[0], b.captions[0], b.captions[1]];
	const line: React.CSSProperties = { position: "absolute", background: "rgba(255,255,255,0.9)" };
	const label = (text: string, [y0, y1]: readonly number[]) => (
		<div
			style={{
				position: "absolute",
				left: gridL,
				width: gridR - gridL,
				top: y0,
				height: y1 - y0,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontFamily,
				fontWeight: 700,
				fontSize: 30 * (width / 1080),
				letterSpacing: "0.2em",
				color: "rgba(255,255,255,0.85)",
				textShadow: "0 2px 6px rgba(0,0,0,0.6)",
			}}
		>
			<span style={{ background: "rgba(230,214,90,0.28)", padding: "6px 18px" }}>{text}</span>
		</div>
	);
	return (
		<AbsoluteFill style={{ pointerEvents: "none" }}>
			<AbsoluteFill style={{ background: "rgba(220,30,40,0.35)", clipPath: shade }} />
			<div style={{ position: "absolute", left: L, top: T, width: R - L, height: B - T, border: "4px solid #22d35a", boxSizing: "border-box" }} />
			{rows.map((y, i) => (
				<div key={`r${i}`} style={{ ...line, left: gridL, width: gridR - gridL, top: y - 1, height: 2 }} />
			))}
			{b.cols.map((x, i) => (
				<div key={`c${i}`} style={{ ...line, top: rows[0], height: rows[3] - rows[0], left: x - 1, width: 2 }} />
			))}
			{label("TEXT HOOK", b.hook)}
			{label("EYES", b.eyes)}
			{label("CAPTIONS", b.captions)}
			{vertical ? (
				<>
					<div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: z.crop, background: "rgba(220,30,40,0.3)" }} />
					<div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: z.crop, background: "rgba(220,30,40,0.3)" }} />
				</>
			) : null}
		</AbsoluteFill>
	);
};
