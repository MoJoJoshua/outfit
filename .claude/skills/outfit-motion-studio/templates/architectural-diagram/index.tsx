import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { clamp, colors, ease, fitFontSize, fontFamily, isVertical, reelsZone, safeArea, type, unit } from "../_shared/brand";
import { MeasureLine, PanelSlide, TypeSet } from "../_shared/primitives";

const room = z.object({
	label: z.string(),
	x: z.number().describe("meters from the plan's left edge"),
	y: z.number().describe("meters from the plan's top edge"),
	w: z.number(),
	h: z.number(),
	highlight: z.boolean().describe("Bronze fill: the room the video is about"),
});

export const architecturalDiagramSchema = z.object({
	eyebrow: z.string(),
	title: z.string().describe("Use \\n to break lines"),
	planWidthM: z.number().positive(),
	planDepthM: z.number().positive(),
	rooms: z.array(room),
	caption: z.string().describe("One line under the plan; empty to hide"),
});
export type ArchitecturalDiagramProps = z.infer<typeof architecturalDiagramSchema>;

// SAMPLE plan: a 1-bedroom condo layout for layout only. Replace with real measurements.
export const architecturalDiagramDefaults: ArchitecturalDiagramProps = {
	eyebrow: "Sample layout",
	title: "1BR condo\nfit-out",
	planWidthM: 8,
	planDepthM: 5,
	rooms: [
		{ label: "Living / dining", x: 0, y: 0, w: 4.5, h: 5, highlight: false },
		{ label: "Kitchen", x: 4.5, y: 0, w: 3.5, h: 2, highlight: true },
		{ label: "Bedroom", x: 4.5, y: 2, w: 3.5, h: 3, highlight: false },
	],
	caption: "Measurements shown are illustrative",
};
export const architecturalDiagramDurationSeconds = 7;

export const ArchitecturalDiagram: React.FC<ArchitecturalDiagramProps> = ({ eyebrow, title, planWidthM, planDepthM, rooms, caption }) => {
	const frame = useCurrentFrame();
	const { width, height, fps } = useVideoConfig();
	const u = unit(width, height);
	const safe = safeArea(width, height);
	const vertical = isVertical(width, height);

	// plan area
	const areaLeft = vertical ? safe.left + 40 * u : width * 0.5;
	const areaRight = width - reelsZone(width, height).notchRight - 20 * u;
	const areaTop = vertical ? safe.top + 330 * u : safe.top + 80 * u;
	const areaBottom = height - safe.bottom - 70 * u;
	const scale = Math.min((areaRight - areaLeft) / planWidthM, (areaBottom - areaTop) / planDepthM);
	const pw = planWidthM * scale;
	const ph = planDepthM * scale;
	const px = areaLeft + (areaRight - areaLeft - pw) / 2;
	const py = areaTop + (areaBottom - areaTop - ph) / 2;
	const wall = 8 * u;

	// timeline (frames)
	const tWalls = 12;
	const wallDur = Math.round(1.2 * fps);
	const tDims = tWalls + wallDur;
	const tRooms = tDims + Math.round(0.6 * fps);

	const outline = interpolate(frame, [tWalls, tWalls + wallDur], [0, 1], { ...clamp, easing: ease.draw });
	const perim = 2 * (pw + ph);

	return (
		<AbsoluteFill style={{ fontFamily }}>
			<PanelSlide from="left">
				<AbsoluteFill
					style={{
						backgroundColor: colors.ivory,
						// faint 0.5 m drafting grid
						backgroundImage: `linear-gradient(rgba(32,31,29,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(32,31,29,0.06) 1px, transparent 1px)`,
						backgroundSize: `${scale / 2}px ${scale / 2}px`,
						backgroundPosition: `${px}px ${py}px`,
					}}
				/>
			</PanelSlide>

			<div style={{ position: "absolute", left: safe.left, top: safe.top, width: vertical ? width - safe.left - safe.right : width * 0.5 - safe.left - 140 * u }}>
				<div style={{ ...type.eyebrow, fontSize: 30 * u, color: colors.bronze, marginBottom: 16 * u }}>{eyebrow}</div>
				<TypeSet text={title.toUpperCase()} delay={6} style={{ ...type.headline, fontSize: fitFontSize(title, vertical ? width - safe.left - safe.right : width * 0.5 - safe.left - 140 * u, (vertical ? 96 : 72) * u), color: colors.ink }} />
			</div>

			{/* rooms: fill and labels */}
			{rooms.map((r, i) => {
				const start = tRooms + i * 6;
				const v = interpolate(frame, [start, start + Math.round(0.47 * fps)], [0, 1], { ...clamp, easing: ease.install });
				return (
					<div
						key={i}
						style={{
							position: "absolute",
							left: px + r.x * scale,
							top: py + r.y * scale,
							width: r.w * scale,
							height: r.h * scale,
							background: r.highlight ? `rgba(138,98,56,${0.22 * v})` : "transparent",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							gap: 6 * u,
							opacity: v,
							translate: `0 ${(1 - v) * 14}px`,
						}}
					>
						<div style={{ ...type.label, fontWeight: 700, fontSize: 26 * u, color: r.highlight ? colors.bronze : colors.ink, textAlign: "center" }}>{r.label}</div>
						<div style={{ ...type.label, fontSize: 22 * u, color: colors.stone }}>
							{r.w} × {r.h} m
						</div>
					</div>
				);
			})}

			{/* walls: outer outline draws on, then interior partitions */}
			<svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
				<rect x={px} y={py} width={pw} height={ph} fill="none" stroke={colors.ink} strokeWidth={wall} strokeDasharray={perim} strokeDashoffset={perim * (1 - outline)} />
				{rooms.map((r, i) => {
					const start = tWalls + wallDur * 0.6 + i * 4;
					const v = interpolate(frame, [start, start + Math.round(0.5 * fps)], [0, 1], { ...clamp, easing: ease.draw });
					const p = 2 * (r.w + r.h) * scale;
					return (
						<rect
							key={i}
							x={px + r.x * scale}
							y={py + r.y * scale}
							width={r.w * scale}
							height={r.h * scale}
							fill="none"
							stroke={colors.ink}
							strokeWidth={wall * 0.5}
							strokeDasharray={p}
							strokeDashoffset={p * (1 - v)}
						/>
					);
				})}
			</svg>

			{/* overall dimensions */}
			<MeasureLine x={px} y={py - 50 * u} length={pw} delay={tDims} thickness={3 * u} label={`${planWidthM} m`} fontSize={26 * u} labelColor={colors.ink} />
			<MeasureLine x={px - 50 * u} y={py} length={ph} orientation="vertical" delay={tDims + 4} thickness={3 * u} label={`${planDepthM} m`} fontSize={26 * u} labelColor={colors.ink} />

			{caption ? (
				<div
					style={{
						position: "absolute",
						left: px,
						top: py + ph + 40 * u,
						...type.body,
						fontSize: 28 * u,
						color: colors.stone,
						opacity: interpolate(frame, [tRooms + 20, tRooms + 34], [0, 1], clamp),
					}}
				>
					{caption}
				</div>
			) : null}
		</AbsoluteFill>
	);
};
